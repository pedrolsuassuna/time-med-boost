import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const payload = await req.json();
    console.log('Cakto webhook received:', payload);

    const { event, data } = payload;
    
    // Extract user email from Cakto data
    const userEmail = data?.customer?.email || data?.email;
    
    if (!userEmail) {
      console.error('No email found in webhook payload');
      return new Response(
        JSON.stringify({ error: 'Email not found in payload' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Find user by email
    const { data: { users }, error: userError } = await supabase.auth.admin.listUsers();
    
    if (userError) {
      console.error('Error fetching users:', userError);
      throw userError;
    }

    const user = users?.find(u => u.email === userEmail);
    
    if (!user) {
      console.error('User not found for email:', userEmail);
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Determine plan type based on product/price
    const productUrl = data?.product_url || data?.checkout_url || '';
    let planType: 'starter' | 'pro' = 'starter';
    let quotaTotal: number | null = 10;

    if (productUrl.includes('u95r4cv_607505') || productUrl.toLowerCase().includes('pro')) {
      planType = 'pro';
      quotaTotal = null; // unlimited
    } else if (productUrl.includes('3bsu2vi_607441') || productUrl.toLowerCase().includes('starter')) {
      planType = 'starter';
      quotaTotal = 10;
    }

    switch (event) {
      case 'subscription_created':
      case 'payment_confirmed': {
        const renewsAt = data?.next_billing_date || data?.renews_at;
        
        // Upsert subscription
        const { data: subscription, error: subError } = await supabase
          .from('plan_subscriptions')
          .upsert({
            user_id: user.id,
            plan: planType,
            status: 'active',
            quota_total: quotaTotal,
            quota_used: 0,
            cakto_subscription_id: data?.subscription_id || data?.id,
            cakto_customer_id: data?.customer_id || data?.customer?.id,
            renews_at: renewsAt ? new Date(renewsAt).toISOString() : null,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'user_id' })
          .select()
          .single();

        if (subError) {
          console.error('Error creating/updating subscription:', subError);
          throw subError;
        }

        // Log billing event
        await supabase.from('billing_events').insert({
          subscription_id: subscription.id,
          event_type: event,
          event_data: data,
        });

        console.log(`Subscription ${event} for user ${user.id}, plan: ${planType}`);
        break;
      }

      case 'subscription_canceled': {
        const { data: subscription, error: subError } = await supabase
          .from('plan_subscriptions')
          .update({
            status: 'canceled',
            canceled_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', user.id)
          .select()
          .single();

        if (subError) {
          console.error('Error canceling subscription:', subError);
          throw subError;
        }

        // Log billing event
        if (subscription) {
          await supabase.from('billing_events').insert({
            subscription_id: subscription.id,
            event_type: event,
            event_data: data,
          });
        }

        console.log(`Subscription canceled for user ${user.id}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event}`);
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Webhook processed' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing webhook:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

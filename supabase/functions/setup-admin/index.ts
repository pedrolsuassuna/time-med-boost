import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, password, fullName } = await req.json();

    // Use service role key to create user
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Create user
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
      },
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('Failed to create user');

    console.log('User created:', authData.user.id);

    // Create user profile
    const { error: profileError } = await supabaseAdmin
      .from('user_profiles')
      .insert({
        user_id: authData.user.id,
        full_name: fullName,
      });

    if (profileError) throw profileError;

    console.log('Profile created for user:', authData.user.id);

    // Create Pro subscription (unlimited)
    const { error: subError } = await supabaseAdmin
      .from('plan_subscriptions')
      .insert({
        user_id: authData.user.id,
        plan: 'pro',
        status: 'active',
        quota_total: null, // null = unlimited
        quota_used: 0,
      });

    if (subError) throw subError;

    console.log('Pro subscription created for user:', authData.user.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'User created with Pro plan',
        user_id: authData.user.id 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in setup-admin:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

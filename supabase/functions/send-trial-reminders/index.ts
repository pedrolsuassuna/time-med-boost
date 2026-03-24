import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const REMINDER_MESSAGES: Record<number, { subject: string; body: string }> = {
  10: {
    subject: "⏳ Restam 5 dias do seu período gratuito MindMed PRO!",
    body: "Seu teste gratuito MindMed PRO expira em 5 dias. Não perca acesso a laudos automáticos, análise de imagens, receituário inteligente e muito mais. Assine agora e continue evoluindo sua prática médica!",
  },
  11: {
    subject: "📋 Restam 4 dias — não perca seus laudos automáticos",
    body: "Em 4 dias seu acesso PRO expira. Continue gerando laudos completos com CID, diagnóstico, conduta e embasamento teórico em segundos. Assine o Plano PRO!",
  },
  12: {
    subject: "🔔 Restam 3 dias — garanta seu Plano PRO",
    body: "Faltam apenas 3 dias para o fim do seu período gratuito. Garanta receituário automático, análise de imagens e relatório evolutivo. Assine agora!",
  },
  13: {
    subject: "⚠️ Restam 2 dias — última chance de manter os benefícios PRO",
    body: "Seu acesso PRO expira em 2 dias! Não perca a assinatura digital, upload ilimitado de imagens e prescrição automática. Assine o Plano PRO hoje!",
  },
  14: {
    subject: "🚨 Último dia! Amanhã seu acesso PRO expira",
    body: "HOJE é o último dia do seu período gratuito MindMed PRO. Amanhã você perderá acesso a todos os recursos premium. Assine agora para continuar!",
  },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Get all active trials
    const { data: trials, error } = await supabase
      .from("free_trials")
      .select("*")
      .eq("converted", false)
      .gt("expires_at", new Date().toISOString());

    if (error) throw error;
    if (!trials || trials.length === 0) {
      return new Response(JSON.stringify({ message: "No trials to process" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const results: string[] = [];

    for (const trial of trials) {
      const activatedAt = new Date(trial.activated_at);
      const now = new Date();
      const daysElapsed = Math.floor((now.getTime() - activatedAt.getTime()) / (1000 * 60 * 60 * 24));

      for (const [dayStr, message] of Object.entries(REMINDER_MESSAGES)) {
        const day = parseInt(dayStr);
        const flagKey = `notified_day_${day}` as keyof typeof trial;

        if (daysElapsed >= day && !trial[flagKey]) {
          // Log the reminder (email sending requires email infrastructure)
          console.log(`Would send reminder to ${trial.email}: Day ${day} - ${message.subject}`);

          // Update flag
          await supabase
            .from("free_trials")
            .update({ [flagKey]: true })
            .eq("id", trial.id);

          results.push(`Notified ${trial.email} for day ${day}`);
        }
      }
    }

    return new Response(JSON.stringify({ processed: results.length, details: results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

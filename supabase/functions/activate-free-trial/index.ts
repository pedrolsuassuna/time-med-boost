import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string" || !email.includes("@")) {
      throw new Error("Email válido é obrigatório");
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Check if trial already exists
    const { data: existing } = await supabase
      .from("free_trials")
      .select("id, expires_at")
      .eq("email", email.trim().toLowerCase())
      .maybeSingle();

    if (existing) {
      const expiresAt = new Date(existing.expires_at);
      if (expiresAt > new Date()) {
        return new Response(JSON.stringify({ 
          success: true, 
          message: "Você já possui um período de teste ativo!",
          already_active: true 
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      } else {
        return new Response(JSON.stringify({ 
          success: false, 
          message: "Seu período de teste já expirou. Assine o Plano PRO para continuar!",
          expired: true 
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }
    }

    // Create new trial
    const { error } = await supabase
      .from("free_trials")
      .insert({ email: email.trim().toLowerCase() });

    if (error) throw error;

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Período de teste de 15 dias ativado com sucesso!" 
    }), {
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

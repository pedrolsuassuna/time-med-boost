import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.0";
import { PDFDocument, rgb, StandardFonts } from "https://esm.sh/pdf-lib@1.17.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

interface PrescriptionRequest {
  patient_name: string;
  patient_age?: string;
  medications: Medication[];
  observations?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    const body: PrescriptionRequest = await req.json();

    // Check active subscription
    const { data: subscription, error: subError } = await supabase
      .from('plan_subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single();

    if (subError || !subscription) {
      throw new Error('No active subscription found');
    }

    // Check quota for Starter plan
    if (subscription.plan === 'starter') {
      if (subscription.quota_used >= subscription.quota_total) {
        throw new Error('Quota exceeded. Please upgrade your plan.');
      }
    }

    // Fetch user profile
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (profileError || !profile) {
      throw new Error('Profile not found');
    }

    console.log('Generating prescription for user:', user.id);

    // Create PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4 size
    const { width, height } = page.getSize();
    
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    let yPos = height - 50;
    const margin = 50;
    const lineHeight = 15;

    // Header - Clinic/Doctor Info
    if (profile.clinic_name) {
      page.drawText(profile.clinic_name, {
        x: width / 2 - (font.widthOfTextAtSize(profile.clinic_name, 14) / 2),
        y: yPos,
        size: 14,
        font: fontBold,
        color: rgb(0, 0, 0),
      });
      yPos -= lineHeight;
    }
    
    const doctorName = profile.full_name;
    page.drawText(doctorName, {
      x: width / 2 - (font.widthOfTextAtSize(doctorName, 12) / 2),
      y: yPos,
      size: 12,
      font: fontBold,
      color: rgb(0, 0, 0),
    });
    yPos -= lineHeight;
    
    const specialty = `${profile.specialty || 'Medicina'} | CRM ${profile.crm}/${profile.crm_uf}`;
    page.drawText(specialty, {
      x: width / 2 - (font.widthOfTextAtSize(specialty, 10) / 2),
      y: yPos,
      size: 10,
      font,
      color: rgb(0, 0, 0),
    });
    yPos -= lineHeight;
    
    if (profile.address) {
      page.drawText(profile.address, {
        x: width / 2 - (font.widthOfTextAtSize(profile.address, 9) / 2),
        y: yPos,
        size: 9,
        font,
        color: rgb(0, 0, 0),
      });
      yPos -= lineHeight;
    }
    
    if (profile.phone) {
      const phone = `Tel: ${profile.phone}`;
      page.drawText(phone, {
        x: width / 2 - (font.widthOfTextAtSize(phone, 9) / 2),
        y: yPos,
        size: 9,
        font,
        color: rgb(0, 0, 0),
      });
      yPos -= lineHeight;
    }

    yPos -= 10;

    // Line separator
    page.drawLine({
      start: { x: margin, y: yPos },
      end: { x: width - margin, y: yPos },
      thickness: 1,
      color: rgb(0, 0, 0),
    });
    yPos -= 20;

    // Date
    const today = new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
    page.drawText(`Data: ${today}`, {
      x: margin,
      y: yPos,
      size: 10,
      font,
      color: rgb(0, 0, 0),
    });
    yPos -= 20;

    // Patient info
    const title = 'RECEITUÁRIO';
    page.drawText(title, {
      x: width / 2 - (fontBold.widthOfTextAtSize(title, 14) / 2),
      y: yPos,
      size: 14,
      font: fontBold,
      color: rgb(0, 0, 0),
    });
    yPos -= 20;
    
    let patientInfo = `Paciente: ${body.patient_name}`;
    if (body.patient_age) {
      patientInfo += ` | Idade: ${body.patient_age}`;
    }
    page.drawText(patientInfo, {
      x: margin,
      y: yPos,
      size: 11,
      font,
      color: rgb(0, 0, 0),
    });
    yPos -= 25;

    // Medications
    page.drawText('Prescrição:', {
      x: margin,
      y: yPos,
      size: 12,
      font: fontBold,
      color: rgb(0, 0, 0),
    });
    yPos -= 20;

    body.medications.forEach((med, index) => {
      page.drawText(`${index + 1}. ${med.name}`, {
        x: margin,
        y: yPos,
        size: 11,
        font: fontBold,
        color: rgb(0, 0, 0),
      });
      yPos -= lineHeight;
      
      const details: string[] = [];
      if (med.dosage) details.push(med.dosage);
      if (med.frequency) details.push(med.frequency);
      if (med.duration) details.push(`por ${med.duration}`);
      
      if (details.length > 0) {
        page.drawText(`   ${details.join(', ')}`, {
          x: margin,
          y: yPos,
          size: 10,
          font,
          color: rgb(0, 0, 0),
        });
        yPos -= lineHeight;
      }
      
      yPos -= 5;
    });

    // Observations
    if (body.observations) {
      yPos -= 15;
      page.drawText('Observações:', {
        x: margin,
        y: yPos,
        size: 11,
        font: fontBold,
        color: rgb(0, 0, 0),
      });
      yPos -= lineHeight;
      
      // Simple text wrapping
      const maxWidth = width - margin * 2;
      const words = body.observations.split(' ');
      let line = '';
      
      for (const word of words) {
        const testLine = line + word + ' ';
        const testWidth = font.widthOfTextAtSize(testLine, 10);
        
        if (testWidth > maxWidth && line !== '') {
          page.drawText(line, {
            x: margin,
            y: yPos,
            size: 10,
            font,
            color: rgb(0, 0, 0),
          });
          yPos -= lineHeight;
          line = word + ' ';
        } else {
          line = testLine;
        }
      }
      
      if (line !== '') {
        page.drawText(line, {
          x: margin,
          y: yPos,
          size: 10,
          font,
          color: rgb(0, 0, 0),
        });
        yPos -= lineHeight;
      }
    }

    // Footer text
    if (profile.prescription_footer_text) {
      const footerY = 100;
      page.drawText(profile.prescription_footer_text, {
        x: width / 2 - (font.widthOfTextAtSize(profile.prescription_footer_text, 9) / 2),
        y: footerY,
        size: 9,
        font,
        color: rgb(0.3, 0.3, 0.3),
      });
    }

    // Signature area
    const sigY = 60;
    page.drawLine({
      start: { x: width / 2 - 80, y: sigY },
      end: { x: width / 2 + 80, y: sigY },
      thickness: 0.5,
      color: rgb(0, 0, 0),
    });
    
    page.drawText(profile.full_name, {
      x: width / 2 - (font.widthOfTextAtSize(profile.full_name, 9) / 2),
      y: sigY - 15,
      size: 9,
      font,
      color: rgb(0, 0, 0),
    });
    
    const crm = `CRM ${profile.crm}/${profile.crm_uf}`;
    page.drawText(crm, {
      x: width / 2 - (font.widthOfTextAtSize(crm, 9) / 2),
      y: sigY - 28,
      size: 9,
      font,
      color: rgb(0, 0, 0),
    });

    // Generate PDF as base64
    const pdfBytes = await pdfDoc.save();
    const pdfBase64 = btoa(String.fromCharCode(...pdfBytes));

    // Save prescription to history
    const { error: historyError } = await supabase
      .from('prescriptions')
      .insert({
        user_id: user.id,
        patient_name: body.patient_name,
        patient_age: body.patient_age,
        medications: body.medications,
        observations: body.observations,
      });

    if (historyError) {
      console.error('Error saving prescription history:', historyError);
    }

    // Increment quota for Starter plan
    if (subscription.plan === 'starter') {
      await supabase
        .from('plan_subscriptions')
        .update({ quota_used: subscription.quota_used + 1 })
        .eq('id', subscription.id);
    }

    console.log('Prescription generated successfully for user:', user.id);

    return new Response(
      JSON.stringify({ pdf: pdfBase64 }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error generating prescription:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

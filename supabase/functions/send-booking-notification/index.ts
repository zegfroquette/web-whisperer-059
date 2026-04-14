const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface BookingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContact: string;
  returningCustomer: boolean;
  pickupAddress: string;
  pickupPostcode: string;
  pickupFloor?: string;
  pickupDate: string;
  pickupSlot: string;
  deliveryAddress: string;
  deliveryPostcode: string;
  deliveryFloor?: string;
  deliveryDate: string;
  deliverySlot: string;
  sameDeliveryAddress: boolean;
  services: Record<string, unknown>;
  antiAllergic: boolean;
  contactBeforeProceed: boolean;
  notes?: string;
  nif?: string;
}

function buildServicesSummary(services: Record<string, unknown>): string {
  const lines: string[] = [];

  const wf = services.washFold as { standardBags?: number; largeBags?: number } | undefined;
  if (wf?.standardBags) lines.push(`Lavar & Dobrar – ${wf.standardBags} bolsa(s) Standard`);
  if (wf?.largeBags) lines.push(`Lavar & Dobrar – ${wf.largeBags} bolsa(s) Grande`);

  const wi = services.washIron as { pieces?: number } | undefined;
  if (wi?.pieces) lines.push(`Lavar & Engomar – ${wi.pieces} peça(s)`);

  const io = services.ironingOnly as { pieces?: number } | undefined;
  if (io?.pieces) lines.push(`Só Engomar – ${io.pieces} peça(s)`);

  const dc = services.dryCleaning as { pieces?: number } | undefined;
  if (dc?.pieces) lines.push(`Limpeza a Seco – ${dc.pieces} peça(s)`);

  const othersText = services.othersText as string | undefined;
  if (othersText) lines.push(`Outros: ${othersText}`);

  const serviceNotes = services.serviceNotes as string | undefined;
  if (serviceNotes) lines.push(`Notas serviços: ${serviceNotes}`);

  return lines.length > 0 ? lines.join('<br/>') : 'Nenhum serviço selecionado';
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const booking: BookingData = await req.json();

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY not configured');
    }

    const servicesSummary = buildServicesSummary(booking.services || {});

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">🧺 Nova Reserva GLOAT</h2>
        
        <h3 style="border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">👤 Dados do Cliente</h3>
        <p><strong>Nome:</strong> ${booking.firstName} ${booking.lastName}</p>
        <p><strong>Email:</strong> ${booking.email}</p>
        <p><strong>Telefone:</strong> ${booking.phone}</p>
        <p><strong>Contacto preferido:</strong> ${booking.preferredContact}</p>
        <p><strong>Cliente habitual:</strong> ${booking.returningCustomer ? 'Sim' : 'Não'}</p>
        ${booking.nif ? `<p><strong>NIF:</strong> ${booking.nif}</p>` : ''}

        <h3 style="border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">📦 Serviços</h3>
        <p>${servicesSummary}</p>

        <h3 style="border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">⚙️ Preferências</h3>
        <p><strong>Anti-alérgico:</strong> ${booking.antiAllergic ? 'Sim' : 'Não'}</p>
        <p><strong>Contactar antes (preço):</strong> ${booking.contactBeforeProceed ? 'Sim' : 'Não'}</p>

        <h3 style="border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">🚐 Recolha</h3>
        <p><strong>Morada:</strong> ${booking.pickupAddress}, ${booking.pickupPostcode}</p>
        ${booking.pickupFloor ? `<p><strong>Andar:</strong> ${booking.pickupFloor}</p>` : ''}
        <p><strong>Data:</strong> ${booking.pickupDate}</p>
        <p><strong>Horário:</strong> ${booking.pickupSlot}</p>

        <h3 style="border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">📬 Entrega</h3>
        ${booking.sameDeliveryAddress 
          ? '<p><em>Mesmo endereço da recolha</em></p>' 
          : `<p><strong>Morada:</strong> ${booking.deliveryAddress}, ${booking.deliveryPostcode}</p>
             ${booking.deliveryFloor ? `<p><strong>Andar:</strong> ${booking.deliveryFloor}</p>` : ''}`
        }
        <p><strong>Data:</strong> ${booking.deliveryDate}</p>
        <p><strong>Horário:</strong> ${booking.deliverySlot}</p>

        ${booking.notes ? `
        <h3 style="border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">📝 Notas</h3>
        <p>${booking.notes}</p>
        ` : ''}

        <hr style="margin-top: 24px;" />
        <p style="color: #6b7280; font-size: 12px;">Este email foi gerado automaticamente pelo site GLOAT.</p>
      </div>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'GLOAT Reservas <noreply@contactform.gloatlaundry.com>',
        to: ['gloatlaundry@gmail.com', 'gloatcarol@gmail.com'],
        subject: `Nova Reserva – ${booking.firstName} ${booking.lastName} – ${booking.pickupDate}`,
        html,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Resend error:', data);
      return new Response(JSON.stringify({ error: data }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending booking notification:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

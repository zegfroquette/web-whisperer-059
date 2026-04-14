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

function buildServicesList(services: Record<string, unknown>): string {
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
  if (serviceNotes) lines.push(`Notas: ${serviceNotes}`);

  return lines.map(l => `<p style="margin:2px 0;">${l}</p>`).join('');
}

function formatPickupDate(dateStr: string): string {
  const months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  const [year, month, day] = dateStr.split('-').map(Number);
  return `${day} de ${months[month - 1]} de ${year}`;
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

    const servicesList = buildServicesList(booking.services || {});
    const pickupDateFormatted = formatPickupDate(booking.pickupDate);
    const deliveryDateFormatted = formatPickupDate(booking.deliveryDate);

    const pickupSlotParts = booking.pickupSlot.split('–').map(s => s.trim());
    const subjectSlot = pickupSlotParts.length === 2
      ? `entre as ${pickupSlotParts[0]} e as ${pickupSlotParts[1]}`
      : booking.pickupSlot;

    const subject = `Nova Reserva (Recolha no dia ${pickupDateFormatted} ${subjectSlot})`;

    const deliveryAddress = booking.sameDeliveryAddress
      ? `${booking.pickupAddress}, ${booking.pickupPostcode}${booking.pickupFloor ? ` – ${booking.pickupFloor}` : ''}`
      : `${booking.deliveryAddress}, ${booking.deliveryPostcode}${booking.deliveryFloor ? ` – ${booking.deliveryFloor}` : ''}`;

    const pickupAddress = `${booking.pickupAddress}, ${booking.pickupPostcode}${booking.pickupFloor ? ` – ${booking.pickupFloor}` : ''}`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #222;">

        <h3 style="margin-bottom:4px;">DADOS DO CLIENTE</h3>
        <p style="margin:2px 0;"><strong>Cliente GLOAT?:</strong> ${booking.returningCustomer ? 'Sim' : 'Não'}</p>
        <p style="margin:2px 0;"><strong>Nome:</strong> ${booking.firstName} ${booking.lastName}</p>
        <p style="margin:2px 0;"><strong>Telefone:</strong> ${booking.phone}</p>
        <p style="margin:2px 0;"><strong>Método de contacto preferido:</strong> ${booking.preferredContact}</p>
        ${booking.nif ? `<p style="margin:2px 0;"><strong>NIF:</strong> ${booking.nif}</p>` : ''}

        <h3 style="margin-top:20px; margin-bottom:4px;">SERVIÇOS</h3>
        ${servicesList}

        <h3 style="margin-top:20px; margin-bottom:4px;">PREFERÊNCIAS</h3>
        <p style="margin:2px 0;"><strong>Detergente anti-alérgico?</strong> ${booking.antiAllergic ? 'Sim' : 'Não'}</p>
        <p style="margin:2px 0;"><strong>Contactar com preço final antes de prosseguir?</strong> ${booking.contactBeforeProceed ? 'Sim' : 'Não'}</p>

        <h3 style="margin-top:20px; margin-bottom:4px;">DADOS DA RECOLHA</h3>
        <p style="margin:2px 0;"><strong>Morada:</strong> ${pickupAddress}</p>
        <p style="margin:2px 0;"><strong>Data e hora:</strong> ${pickupDateFormatted}, ${booking.pickupSlot}</p>

        <h3 style="margin-top:20px; margin-bottom:4px;">DADOS DA ENTREGA</h3>
        <p style="margin:2px 0;"><strong>Morada:</strong> ${deliveryAddress}</p>
        <p style="margin:2px 0;"><strong>Data e hora:</strong> ${deliveryDateFormatted}, ${booking.deliverySlot}</p>

        ${booking.notes ? `
        <h3 style="margin-top:20px; margin-bottom:4px;">NOTAS</h3>
        <p style="margin:2px 0;">${booking.notes}</p>
        ` : ''}

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
        subject,
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

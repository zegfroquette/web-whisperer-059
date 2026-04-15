const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// HTML escape helper to prevent injection
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

// Simple in-memory rate limiter by IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

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
  pickupInstructions?: string;
  pickupDate: string;
  pickupSlot: string;
  deliveryAddress: string;
  deliveryPostcode: string;
  deliveryFloor?: string;
  deliveryInstructions?: string;
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

  const wf = services.washFold as { standardBags?: number; maxBags?: number; pieces?: number } | undefined;
  if (wf?.standardBags) lines.push(`Lavar & Dobrar – ${esc(String(wf.standardBags))} bolsa(s) Standard`);
  if (wf?.maxBags) lines.push(`Lavar & Dobrar – ${esc(String(wf.maxBags))} bolsa(s) Max`);
  if (wf?.pieces) lines.push(`Lavar & Dobrar – ${esc(String(wf.pieces))} peça(s)`);

  const wi = services.washIron as { pieces?: number } | undefined;
  if (wi?.pieces) lines.push(`Lavar & Engomar – ${esc(String(wi.pieces))} peça(s)`);

  const io = services.ironingOnly as { pieces?: number } | undefined;
  if (io?.pieces) lines.push(`Só Engomar – ${esc(String(io.pieces))} peça(s)`);

  const dc = services.dryCleaning as { pieces?: number } | undefined;
  if (dc?.pieces) lines.push(`Limpeza a Seco – ${esc(String(dc.pieces))} peça(s)`);

  const othersText = services.othersText as string | undefined;
  if (othersText) lines.push(`Outros: ${esc(String(othersText))}`);

  const serviceNotes = services.serviceNotes as string | undefined;
  if (serviceNotes) lines.push(`Notas: ${esc(String(serviceNotes))}`);

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
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (isRateLimited(clientIp)) {
      return new Response(JSON.stringify({ error: 'Too many requests. Please try again later.' }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const booking: BookingData = await req.json();

    // Basic input validation
    if (!booking.firstName || typeof booking.firstName !== 'string' || booking.firstName.length > 200) {
      return new Response(JSON.stringify({ error: 'Invalid booking data.' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    if (!booking.email || typeof booking.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email)) {
      return new Response(JSON.stringify({ error: 'Invalid booking data.' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    if (!booking.pickupDate || typeof booking.pickupDate !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(booking.pickupDate)) {
      return new Response(JSON.stringify({ error: 'Invalid booking data.' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    if (!booking.deliveryDate || typeof booking.deliveryDate !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(booking.deliveryDate)) {
      return new Response(JSON.stringify({ error: 'Invalid booking data.' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return new Response(JSON.stringify({ error: 'Service temporarily unavailable.' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const servicesList = buildServicesList(booking.services || {});
    const pickupDateFormatted = formatPickupDate(booking.pickupDate);
    const deliveryDateFormatted = formatPickupDate(booking.deliveryDate);

    const pickupSlotParts = (booking.pickupSlot || '').split('–').map(s => s.trim());
    const subjectSlot = pickupSlotParts.length === 2
      ? `entre as ${esc(pickupSlotParts[0])} e as ${esc(pickupSlotParts[1])}`
      : esc(booking.pickupSlot || '');

    const subject = `Nova Reserva (Recolha no dia ${pickupDateFormatted} ${subjectSlot})`;

    const deliveryAddress = booking.sameDeliveryAddress
      ? `${esc(booking.pickupAddress)}, ${esc(booking.pickupPostcode)}${booking.pickupFloor ? ` – ${esc(booking.pickupFloor)}` : ''}`
      : `${esc(booking.deliveryAddress || '')}, ${esc(booking.deliveryPostcode || '')}${booking.deliveryFloor ? ` – ${esc(booking.deliveryFloor)}` : ''}`;

    const pickupAddress = `${esc(booking.pickupAddress)}, ${esc(booking.pickupPostcode)}${booking.pickupFloor ? ` – ${esc(booking.pickupFloor)}` : ''}`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #222;">

        <h3 style="margin-bottom:4px;">DADOS DO CLIENTE</h3>
        <p style="margin:2px 0;"><strong>Cliente GLOAT?:</strong> ${booking.returningCustomer ? 'Sim' : 'Não'}</p>
        <p style="margin:2px 0;"><strong>Nome:</strong> ${esc(booking.firstName)} ${esc(booking.lastName)}</p>
        <p style="margin:2px 0;"><strong>Email:</strong> ${esc(booking.email)}</p>
        <p style="margin:2px 0;"><strong>Telefone:</strong> ${esc(booking.phone)}</p>
        <p style="margin:2px 0;"><strong>Método de contacto preferido:</strong> ${esc(booking.preferredContact)}</p>
        ${booking.nif ? `<p style="margin:2px 0;"><strong>NIF:</strong> ${esc(booking.nif)}</p>` : ''}

        <h3 style="margin-top:20px; margin-bottom:4px;">SERVIÇOS</h3>
        ${servicesList}

        <h3 style="margin-top:20px; margin-bottom:4px;">PREFERÊNCIAS</h3>
        <p style="margin:2px 0;"><strong>Detergente anti-alérgico?</strong> ${booking.antiAllergic ? 'Sim' : 'Não'}</p>
        <p style="margin:2px 0;"><strong>Contactar com preço final antes de prosseguir?</strong> ${booking.contactBeforeProceed ? 'Sim' : 'Não'}</p>

        <h3 style="margin-top:20px; margin-bottom:4px;">DADOS DA RECOLHA</h3>
        <p style="margin:2px 0;"><strong>Morada:</strong> ${pickupAddress}</p>
        ${booking.pickupInstructions ? `<p style="margin:2px 0;"><strong>Instruções:</strong> ${esc(booking.pickupInstructions)}</p>` : ''}
        <p style="margin:2px 0;"><strong>Data e hora:</strong> ${pickupDateFormatted}, ${esc(booking.pickupSlot)}</p>

        <h3 style="margin-top:20px; margin-bottom:4px;">DADOS DA ENTREGA</h3>
        <p style="margin:2px 0;"><strong>Morada:</strong> ${deliveryAddress}</p>
        ${booking.deliveryInstructions ? `<p style="margin:2px 0;"><strong>Instruções:</strong> ${esc(booking.deliveryInstructions)}</p>` : ''}
        <p style="margin:2px 0;"><strong>Data e hora:</strong> ${deliveryDateFormatted}, ${esc(booking.deliverySlot)}</p>

        ${booking.notes ? `
        <h3 style="margin-top:20px; margin-bottom:4px;">NOTAS</h3>
        <p style="margin:2px 0;">${esc(booking.notes)}</p>
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
        to: ['gloatlaundry@gmail.com', 'jogfroquette@gmail.com', 'gloatcarol@gmail.com'],
        subject,
        html,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Resend error:', data);
      return new Response(JSON.stringify({ error: 'Failed to send notification.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending booking notification:', error);
    return new Response(JSON.stringify({ error: 'An unexpected error occurred.' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

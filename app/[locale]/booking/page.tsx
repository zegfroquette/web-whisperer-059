import type { Metadata } from 'next';
import BookingContent from '@/components/pages/BookingContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt
      ? 'Agendar Recolha de Roupa em Lisboa | GLOAT'
      : 'Book a Laundry Pickup in Lisbon | GLOAT',
    description: pt
      ? 'Agende uma recolha de roupa ao domicílio em Lisboa com a GLOAT. Recolhemos, lavamos e entregamos em 48 horas. Cobertura em Lisboa e arredores.'
      : 'Book a home laundry pickup in Lisbon with GLOAT. We collect, wash and deliver in 48 hours. Coverage across Lisbon.',
    alternates: {
      canonical: pt ? 'https://gloatlaundry.com/pt/booking' : 'https://gloatlaundry.com/en/booking',
      languages: {
        pt: 'https://gloatlaundry.com/pt/booking',
        en: 'https://gloatlaundry.com/en/booking',
        'x-default': 'https://gloatlaundry.com/pt/booking',
      },
    },
    openGraph: {
      title: pt ? 'Agendar Recolha | GLOAT Laundry Lisboa' : 'Book a Pickup | GLOAT Laundry Lisbon',
      description: pt
        ? 'Agende uma recolha de roupa ao domicílio em Lisboa com a GLOAT. Entrega em 48 horas.'
        : 'Book a home laundry pickup in Lisbon with GLOAT. Delivered in 48 hours.',
      url: pt ? 'https://gloatlaundry.com/pt/booking' : 'https://gloatlaundry.com/en/booking',
    },
  };
}

export default function BookingPage() {
  return <BookingContent />;
}

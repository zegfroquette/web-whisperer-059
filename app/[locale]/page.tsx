import type { Metadata } from 'next';
import HomeContent from '@/components/pages/HomeContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt ? 'Lavandaria Lisboa | GLOAT — Recolha e Entrega em 48h' : 'Lisbon Laundry Service | GLOAT — Pickup & Delivery in 48h',
    description: pt
      ? 'GLOAT — Lavandaria profissional em Lisboa. Lavar, dobrar, engomar e limpeza a seco. Recolha e entrega em casa em 48 horas. Planos mensais a partir de 60€.'
      : 'GLOAT — Professional laundry in Lisbon. Wash & fold, ironing, dry cleaning. Home pickup and delivery in 48 hours. Monthly plans from €60.',
    alternates: {
      canonical: pt ? 'https://gloatlaundry.com/pt' : 'https://gloatlaundry.com/en',
      languages: {
        pt: 'https://gloatlaundry.com/pt',
        en: 'https://gloatlaundry.com/en',
        'x-default': 'https://gloatlaundry.com/pt',
      },
    },
    openGraph: {
      title: pt ? 'Lavandaria Lisboa | GLOAT — Recolha e Entrega em 48h' : 'Lisbon Laundry Service | GLOAT — Pickup & Delivery in 48h',
      description: pt
        ? 'GLOAT — Lavandaria profissional em Lisboa. Recolha e entrega em casa em 48 horas.'
        : 'GLOAT — Professional laundry in Lisbon. Home pickup and delivery in 48 hours.',
      url: pt ? 'https://gloatlaundry.com/pt' : 'https://gloatlaundry.com/en',
    },
  };
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'GLOAT — The Greatest Laundry',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rua Artilharia 1, Nº 1',
    postalCode: '1250-036',
    addressLocality: 'Lisboa',
    addressCountry: 'PT',
  },
  telephone: '+351935479900',
  email: 'gloatlaundry@gmail.com',
  url: 'https://gloatlaundry.com',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '10:00',
      closes: '13:00',
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <HomeContent />
    </>
  );
}

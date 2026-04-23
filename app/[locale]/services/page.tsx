import type { Metadata } from 'next';
import ServicesContent from '@/components/pages/ServicesContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt
      ? 'Serviços de Lavandaria em Lisboa | GLOAT — Lavar, Engomar, Limpeza a Seco'
      : 'Laundry Services in Lisbon | GLOAT — Wash, Iron, Dry Cleaning',
    description: pt
      ? 'Serviços de lavandaria GLOAT em Lisboa: lavar e dobrar, engomar, limpeza a seco, serviço expresso 24h e recolha e entrega ao domicílio.'
      : 'GLOAT laundry services in Lisbon: wash & fold, ironing, dry cleaning, 24h express service and home pickup & delivery.',
    alternates: {
      canonical: pt ? 'https://gloatlaundry.com/pt/services' : 'https://gloatlaundry.com/en/services',
      languages: {
        pt: 'https://gloatlaundry.com/pt/services',
        en: 'https://gloatlaundry.com/en/services',
        'x-default': 'https://gloatlaundry.com/pt/services',
      },
    },
    openGraph: {
      title: pt ? 'Serviços de Lavandaria em Lisboa | GLOAT' : 'Laundry Services in Lisbon | GLOAT',
      description: pt
        ? 'Serviços de lavandaria GLOAT em Lisboa: lavar e dobrar, engomar, limpeza a seco, serviço expresso 24h.'
        : 'GLOAT laundry services in Lisbon: wash & fold, ironing, dry cleaning, 24h express service.',
      url: pt ? 'https://gloatlaundry.com/pt/services' : 'https://gloatlaundry.com/en/services',
    },
  };
}

export default function ServicesPage() {
  return <ServicesContent />;
}

import type { Metadata } from 'next';
import PricingContent from '@/components/pages/PricingContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt
      ? 'Preços e Planos de Lavandaria em Lisboa | GLOAT'
      : 'Laundry Prices & Plans in Lisbon | GLOAT',
    description: pt
      ? 'Preços e planos mensais GLOAT em Lisboa. Planos a partir de 60€ por 4 semanas. Preços por peça para lavar, engomar e limpeza a seco.'
      : 'GLOAT laundry prices and monthly plans in Lisbon. Plans from €60 per 4 weeks. Per-item pricing for wash, iron and dry cleaning.',
    alternates: {
      canonical: pt ? 'https://gloatlaundry.com/pt/pricing' : 'https://gloatlaundry.com/en/pricing',
      languages: {
        pt: 'https://gloatlaundry.com/pt/pricing',
        en: 'https://gloatlaundry.com/en/pricing',
        'x-default': 'https://gloatlaundry.com/pt/pricing',
      },
    },
    openGraph: {
      title: pt ? 'Preços e Planos | GLOAT Laundry Lisboa' : 'Prices & Plans | GLOAT Laundry Lisbon',
      description: pt
        ? 'Preços e planos mensais GLOAT em Lisboa. Planos a partir de 60€ por 4 semanas.'
        : 'GLOAT monthly plans from €60 per 4 weeks. Individual service pricing available.',
      url: pt ? 'https://gloatlaundry.com/pt/pricing' : 'https://gloatlaundry.com/en/pricing',
    },
  };
}

export default function PricingPage() {
  return <PricingContent />;
}

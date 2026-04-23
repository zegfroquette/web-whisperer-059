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
    title: 'GLOAT — The Greatest Laundry | Lavandaria em Lisboa',
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
      title: 'GLOAT — The Greatest Laundry | Lavandaria em Lisboa',
      description: pt
        ? 'GLOAT — Lavandaria profissional em Lisboa. Recolha e entrega em casa em 48 horas.'
        : 'GLOAT — Professional laundry in Lisbon. Home pickup and delivery in 48 hours.',
      url: pt ? 'https://gloatlaundry.com/pt' : 'https://gloatlaundry.com/en',
    },
  };
}

export default function HomePage() {
  return <HomeContent />;
}

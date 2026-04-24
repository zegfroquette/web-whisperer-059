import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import EveningWearContent from '@/components/pages/EveningWearContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt ? 'Limpeza de Roupa de Cerimónia Lisboa | GLOAT — Limpeza de Vestidos Formais' : 'Evening Wear Cleaning Lisboa | GLOAT — Formal Dress & Gown Cleaning',
    description: pt ? 'Limpeza profissional de roupa de cerimónia em Lisboa. Vestidos de baile, cocktail, smokings. Prazo 5–7 dias.' : 'Professional evening wear cleaning in Lisboa. Ball gowns, cocktail dresses, tuxedos. 5–7 day turnaround.',
    alternates: {
      canonical: pt ? 'https://gloatlaundry.com/pt/limpeza-roupa-cerimonia-lisboa' : 'https://gloatlaundry.com/en/evening-wear-cleaning-lisboa',
      languages: {
        pt: 'https://gloatlaundry.com/pt/limpeza-roupa-cerimonia-lisboa',
        en: 'https://gloatlaundry.com/en/evening-wear-cleaning-lisboa',
        'x-default': 'https://gloatlaundry.com/pt/limpeza-roupa-cerimonia-lisboa',
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === 'en') redirect('/en/evening-wear-cleaning-lisboa');
  return <EveningWearContent />;
}

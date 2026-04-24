import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import LeatherJacketContent from '@/components/pages/LeatherJacketContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt ? 'Limpeza de Casacos de Cabedal Lisboa | GLOAT — Cuidados Profissionais com Cabedal' : 'Leather Jacket Cleaning Lisboa | GLOAT — Professional Leather Care',
    description: pt ? 'Limpeza profissional de casacos de cabedal em Lisboa. Remove sujidade e manchas, condiciona cabedal. Até 10 dias.' : 'Professional leather jacket cleaning in Lisboa. Remove dirt and stains, condition leather. Up to 10 days.',
    alternates: {
      canonical: pt ? 'https://gloatlaundry.com/pt/limpeza-casaco-cabedal-lisboa' : 'https://gloatlaundry.com/en/leather-jacket-cleaning-lisboa',
      languages: {
        pt: 'https://gloatlaundry.com/pt/limpeza-casaco-cabedal-lisboa',
        en: 'https://gloatlaundry.com/en/leather-jacket-cleaning-lisboa',
        'x-default': 'https://gloatlaundry.com/pt/limpeza-casaco-cabedal-lisboa',
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === 'en') redirect('/en/leather-jacket-cleaning-lisboa');
  return <LeatherJacketContent />;
}

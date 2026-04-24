import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import LeatherShoeContent from '@/components/pages/LeatherShoeContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt ? 'Limpeza de Sapatos de Cabedal Lisboa | GLOAT — Cuidados Profissionais com Sapatos' : 'Leather Shoe Cleaning Lisboa | GLOAT — Professional Shoe Care',
    description: pt ? 'Limpeza profissional de sapatos de cabedal em Lisboa. Remove sujidade e riscos, condiciona cabedal.' : 'Professional leather shoe cleaning in Lisboa. Remove dirt and scuffs, condition leather. Up to 10 days.',
    alternates: {
      canonical: pt ? 'https://gloatlaundry.com/pt/limpeza-sapatos-cabedal-lisboa' : 'https://gloatlaundry.com/en/leather-shoe-cleaning-lisboa',
      languages: {
        pt: 'https://gloatlaundry.com/pt/limpeza-sapatos-cabedal-lisboa',
        en: 'https://gloatlaundry.com/en/leather-shoe-cleaning-lisboa',
        'x-default': 'https://gloatlaundry.com/pt/limpeza-sapatos-cabedal-lisboa',
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === 'en') redirect('/en/leather-shoe-cleaning-lisboa');
  return <LeatherShoeContent />;
}

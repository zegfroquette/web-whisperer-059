import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import LeatherSofaContent from '@/components/pages/LeatherSofaContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt ? 'Limpeza de Sofás de Cabedal Lisboa | GLOAT — Cuidados Profissionais com Sofás de Cabedal' : 'Leather Sofa Cleaning Lisboa | GLOAT — Professional Leather Sofa Care',
    description: pt ? 'Limpeza profissional de sofás de cabedal em Lisboa. Limpeza profunda, remove sujidade, condiciona cabedal.' : 'Professional leather sofa cleaning in Lisboa. Deep clean, remove grime, condition leather. Up to 10 days.',
    alternates: {
      canonical: pt ? 'https://gloatlaundry.com/pt/limpeza-sofa-cabedal-lisboa' : 'https://gloatlaundry.com/en/leather-sofa-cleaning-lisboa',
      languages: {
        pt: 'https://gloatlaundry.com/pt/limpeza-sofa-cabedal-lisboa',
        en: 'https://gloatlaundry.com/en/leather-sofa-cleaning-lisboa',
        'x-default': 'https://gloatlaundry.com/pt/limpeza-sofa-cabedal-lisboa',
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === 'en') redirect('/en/leather-sofa-cleaning-lisboa');
  return <LeatherSofaContent />;
}

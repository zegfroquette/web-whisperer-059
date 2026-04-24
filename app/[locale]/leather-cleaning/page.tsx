import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import LeatherCleaningContent from '@/components/pages/LeatherCleaningContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt ? 'Limpeza de Cabedal Lisboa | GLOAT — Casacos, Malas e Sapatos' : 'Leather Cleaning Lisboa | GLOAT — Jackets, Bags & Shoes',
    description: pt ? 'Limpeza profissional de cabedal em Lisboa. Casacos, malas, sofás e sapatos. Técnicas especializadas, até 10 dias.' : 'Professional leather cleaning in Lisboa. Jackets, handbags, sofas and shoes. Specialist care, up to 10 days.',
    alternates: {
      canonical: pt ? 'https://gloatlaundry.com/pt/limpeza-cabedal-lisboa' : 'https://gloatlaundry.com/en/leather-cleaning',
      languages: {
        pt: 'https://gloatlaundry.com/pt/limpeza-cabedal-lisboa',
        en: 'https://gloatlaundry.com/en/leather-cleaning',
        'x-default': 'https://gloatlaundry.com/pt/limpeza-cabedal-lisboa',
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === 'pt') redirect('/pt/limpeza-cabedal-lisboa');
  return <LeatherCleaningContent />;
}

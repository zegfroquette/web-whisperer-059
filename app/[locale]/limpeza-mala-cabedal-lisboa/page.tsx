import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import LeatherHandbagContent from '@/components/pages/LeatherHandbagContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt ? 'Limpeza de Malas de Cabedal Lisboa | GLOAT — Limpeza e Condicionamento de Malas' : 'Leather Handbag Cleaning Lisboa | GLOAT — Bag Cleaning & Conditioning',
    description: pt ? 'Limpeza profissional de malas de cabedal em Lisboa. Marcas removidas, cabedal condicionado. Até 10 dias.' : 'Professional leather handbag cleaning in Lisboa. Marks removed, leather conditioned. Up to 10 days.',
    alternates: {
      canonical: pt ? 'https://gloatlaundry.com/pt/limpeza-mala-cabedal-lisboa' : 'https://gloatlaundry.com/en/leather-handbag-cleaning-lisboa',
      languages: {
        pt: 'https://gloatlaundry.com/pt/limpeza-mala-cabedal-lisboa',
        en: 'https://gloatlaundry.com/en/leather-handbag-cleaning-lisboa',
        'x-default': 'https://gloatlaundry.com/pt/limpeza-mala-cabedal-lisboa',
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === 'en') redirect('/en/leather-handbag-cleaning-lisboa');
  return <LeatherHandbagContent />;
}

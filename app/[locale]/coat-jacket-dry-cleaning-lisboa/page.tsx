import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import CoatJacketContent from '@/components/pages/CoatJacketContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt ? 'Lavagem a Seco de Casacos Lisboa | GLOAT — Limpeza de Casacos e Blusões' : 'Coat & Jacket Dry Cleaning Lisboa | GLOAT — Outerwear Cleaning',
    description: pt ? 'Lavagem a seco profissional de casacos em Lisboa. Lã, gabardines, blazers. Prazo de 5–7 dias.' : 'Professional coat and jacket dry cleaning in Lisboa. Wool, trench coats, blazers. 5–7 day turnaround.',
    alternates: {
      canonical: pt ? 'https://gloatlaundry.com/pt/lavagem-seco-casacos-lisboa' : 'https://gloatlaundry.com/en/coat-jacket-dry-cleaning-lisboa',
      languages: {
        pt: 'https://gloatlaundry.com/pt/lavagem-seco-casacos-lisboa',
        en: 'https://gloatlaundry.com/en/coat-jacket-dry-cleaning-lisboa',
        'x-default': 'https://gloatlaundry.com/pt/lavagem-seco-casacos-lisboa',
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === 'pt') redirect('/pt/lavagem-seco-casacos-lisboa');
  return <CoatJacketContent />;
}

import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import BeddingLinenContent from '@/components/pages/BeddingLinenContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt ? 'Lavagem de Roupa de Cama Lisboa | GLOAT — Limpeza de Lençóis' : 'Bedding & Linen Washing Lisboa | GLOAT — Sheet Cleaning Service',
    description: pt ? 'Lavagem profissional de roupa de cama em Lisboa. Lençóis, fronhas, capas de edredão. Prazo 48h.' : 'Professional bedding and linen washing in Lisboa. Sheets, pillowcases, duvet covers. 48h turnaround.',
    alternates: {
      canonical: pt ? 'https://gloatlaundry.com/pt/roupa-cama-lisboa' : 'https://gloatlaundry.com/en/bedding-linen-lisboa',
      languages: {
        pt: 'https://gloatlaundry.com/pt/roupa-cama-lisboa',
        en: 'https://gloatlaundry.com/en/bedding-linen-lisboa',
        'x-default': 'https://gloatlaundry.com/pt/roupa-cama-lisboa',
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === 'pt') redirect('/pt/roupa-cama-lisboa');
  return <BeddingLinenContent />;
}

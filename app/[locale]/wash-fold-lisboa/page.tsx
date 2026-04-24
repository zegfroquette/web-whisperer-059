import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import WashFoldContent from '@/components/pages/WashFoldContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt ? 'Lavagem e Dobra Lisboa | GLOAT — Lavandaria' : 'Wash & Fold Lisboa | GLOAT — Laundry Service',
    description: pt ? 'Serviço de lavagem e dobra em Lisboa. Entregue ou recolha. Prazo 48h, lavagem profissional e dobra cuidada.' : 'Wash and fold laundry service in Lisboa. Drop off or pickup. 48h turnaround, professional wash and neat folding.',
    alternates: {
      canonical: pt ? 'https://gloatlaundry.com/pt/lavagem-dobra-lisboa' : 'https://gloatlaundry.com/en/wash-fold-lisboa',
      languages: {
        pt: 'https://gloatlaundry.com/pt/lavagem-dobra-lisboa',
        en: 'https://gloatlaundry.com/en/wash-fold-lisboa',
        'x-default': 'https://gloatlaundry.com/pt/lavagem-dobra-lisboa',
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === 'pt') redirect('/pt/lavagem-dobra-lisboa');
  return <WashFoldContent />;
}

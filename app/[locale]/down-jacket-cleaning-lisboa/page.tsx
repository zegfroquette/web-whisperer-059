import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import DownJacketContent from '@/components/pages/DownJacketContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt ? 'Limpeza de Casacos de Penas Lisboa | GLOAT — Cuidados Profissionais com Casacos de Penas' : 'Down Jacket Cleaning Lisboa | GLOAT — Professional Down Jacket Care',
    description: pt ? 'Limpeza profissional de casacos de penas em Lisboa. Restaura isolamento e forma. Todas as marcas. Prazo 5–7 dias.' : 'Professional down jacket cleaning in Lisboa. Restore insulation and shape. All brands. 5–7 day turnaround.',
    alternates: {
      canonical: pt ? 'https://gloatlaundry.com/pt/limpeza-casacos-penas-lisboa' : 'https://gloatlaundry.com/en/down-jacket-cleaning-lisboa',
      languages: {
        pt: 'https://gloatlaundry.com/pt/limpeza-casacos-penas-lisboa',
        en: 'https://gloatlaundry.com/en/down-jacket-cleaning-lisboa',
        'x-default': 'https://gloatlaundry.com/pt/limpeza-casacos-penas-lisboa',
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === 'pt') redirect('/pt/limpeza-casacos-penas-lisboa');
  return <DownJacketContent />;
}

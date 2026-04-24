import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import AreaRugContent from '@/components/pages/AreaRugContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt ? 'Limpeza de Tapetes Lisboa | GLOAT — Serviço Profissional de Limpeza de Tapetes' : 'Area Rug Cleaning Lisboa | GLOAT — Professional Rug Cleaning Service',
    description: pt ? 'Limpeza profissional de tapetes de área em Lisboa. Todos os tamanhos, materiais e estilos. Recolha disponível.' : 'Professional area rug cleaning in Lisboa. All sizes, materials and styles. Wool, kilim, hand-woven. Pickup available.',
    alternates: {
      canonical: pt ? 'https://gloatlaundry.com/pt/limpeza-tapetes-area-lisboa' : 'https://gloatlaundry.com/en/area-rug-cleaning-lisboa',
      languages: {
        pt: 'https://gloatlaundry.com/pt/limpeza-tapetes-area-lisboa',
        en: 'https://gloatlaundry.com/en/area-rug-cleaning-lisboa',
        'x-default': 'https://gloatlaundry.com/pt/limpeza-tapetes-area-lisboa',
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === 'pt') redirect('/pt/limpeza-tapetes-area-lisboa');
  return <AreaRugContent />;
}

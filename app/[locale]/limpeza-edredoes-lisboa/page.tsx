import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import DuvetCleaningContent from '@/components/pages/DuvetCleaningContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt ? 'Limpeza de Edredões Lisboa | GLOAT — Serviço de Limpeza de Edredões' : 'Duvet Cleaning Lisboa | GLOAT — Comforter Cleaning Service',
    description: pt ? 'Limpeza profissional de edredões em Lisboa. Todos os tamanhos e materiais. Recolha disponível por Lisboa.' : 'Professional duvet and comforter cleaning in Lisboa. All sizes and materials. Pickup available across Lisbon.',
    alternates: {
      canonical: pt ? 'https://gloatlaundry.com/pt/limpeza-edredoes-lisboa' : 'https://gloatlaundry.com/en/duvet-cleaning-lisboa',
      languages: {
        pt: 'https://gloatlaundry.com/pt/limpeza-edredoes-lisboa',
        en: 'https://gloatlaundry.com/en/duvet-cleaning-lisboa',
        'x-default': 'https://gloatlaundry.com/pt/limpeza-edredoes-lisboa',
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === 'en') redirect('/en/duvet-cleaning-lisboa');
  return <DuvetCleaningContent />;
}

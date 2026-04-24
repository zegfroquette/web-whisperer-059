import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import CarpetCleaningContent from '@/components/pages/CarpetCleaningContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt ? 'Limpeza de Tapetes Lisboa | GLOAT — Tapetes e Remoção de Manchas' : 'Carpet Cleaning Lisboa | GLOAT — Rugs & Stain Removal',
    description: pt ? 'Limpeza profissional de tapetes e carpetes em Lisboa. Todos os tamanhos e materiais, remoção de manchas.' : 'Professional carpet and rug cleaning in Lisboa. Deep clean all sizes and materials, stain removal. Pickup available.',
    alternates: {
      canonical: pt ? 'https://gloatlaundry.com/pt/limpeza-tapetes-lisboa' : 'https://gloatlaundry.com/en/carpet-cleaning',
      languages: {
        pt: 'https://gloatlaundry.com/pt/limpeza-tapetes-lisboa',
        en: 'https://gloatlaundry.com/en/carpet-cleaning',
        'x-default': 'https://gloatlaundry.com/pt/limpeza-tapetes-lisboa',
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === 'pt') redirect('/pt/limpeza-tapetes-lisboa');
  return <CarpetCleaningContent />;
}

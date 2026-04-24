import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import CurtainWashingContent from '@/components/pages/CurtainWashingContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt ? 'Lavagem de Cortinas Lisboa | GLOAT — Limpeza Profissional de Cortinas' : 'Curtain Washing Lisboa | GLOAT — Professional Curtain Cleaning',
    description: pt ? 'Lavagem profissional de cortinas em Lisboa. Todos os tamanhos, tecidos e estilos. Recolha disponível.' : 'Professional curtain washing in Lisboa. All sizes, fabrics and styles. Pickup available across Lisbon.',
    alternates: {
      canonical: pt ? 'https://gloatlaundry.com/pt/lavagem-cortinas-lisboa' : 'https://gloatlaundry.com/en/curtain-washing-lisboa',
      languages: {
        pt: 'https://gloatlaundry.com/pt/lavagem-cortinas-lisboa',
        en: 'https://gloatlaundry.com/en/curtain-washing-lisboa',
        'x-default': 'https://gloatlaundry.com/pt/lavagem-cortinas-lisboa',
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === 'en') redirect('/en/curtain-washing-lisboa');
  return <CurtainWashingContent />;
}

import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import MattressCleaningContent from '@/components/pages/MattressCleaningContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt ? 'Limpeza de Colchões Lisboa | GLOAT — Serviço Profissional de Limpeza de Colchões' : 'Mattress Cleaning Lisboa | GLOAT — Professional Mattress Cleaning Service',
    description: pt ? 'Limpeza profissional de colchões em Lisboa. Remove pó, suor e manchas. Todos os tamanhos. Frescos e higiénicos.' : 'Professional mattress cleaning in Lisboa. Remove dust, sweat and stains. All sizes. Fresh and hygienic.',
    alternates: {
      canonical: pt ? 'https://gloatlaundry.com/pt/limpeza-colchoes-lisboa' : 'https://gloatlaundry.com/en/mattress-cleaning-lisboa',
      languages: {
        pt: 'https://gloatlaundry.com/pt/limpeza-colchoes-lisboa',
        en: 'https://gloatlaundry.com/en/mattress-cleaning-lisboa',
        'x-default': 'https://gloatlaundry.com/pt/limpeza-colchoes-lisboa',
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === 'en') redirect('/en/mattress-cleaning-lisboa');
  return <MattressCleaningContent />;
}

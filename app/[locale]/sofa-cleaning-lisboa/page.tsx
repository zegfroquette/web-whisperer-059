import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import SofaCleaningContent from '@/components/pages/SofaCleaningContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt ? 'Limpeza de Sofás Lisboa | GLOAT — Limpeza Profissional de Sofás e Canapés' : 'Sofa Cleaning Lisboa | GLOAT — Professional Sofa & Couch Cleaning',
    description: pt ? 'Limpeza profissional de sofás em Lisboa. Limpeza profunda de estofos de tecido, remove manchas e odores.' : 'Professional sofa and couch cleaning in Lisboa. Deep clean fabric upholstery, remove stains and odours.',
    alternates: {
      canonical: pt ? 'https://gloatlaundry.com/pt/limpeza-sofas-lisboa' : 'https://gloatlaundry.com/en/sofa-cleaning-lisboa',
      languages: {
        pt: 'https://gloatlaundry.com/pt/limpeza-sofas-lisboa',
        en: 'https://gloatlaundry.com/en/sofa-cleaning-lisboa',
        'x-default': 'https://gloatlaundry.com/pt/limpeza-sofas-lisboa',
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === 'pt') redirect('/pt/limpeza-sofas-lisboa');
  return <SofaCleaningContent />;
}

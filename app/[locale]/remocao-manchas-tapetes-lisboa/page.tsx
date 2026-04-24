import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import CarpetStainContent from '@/components/pages/CarpetStainContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt ? 'Remoção de Manchas em Tapetes Lisboa | GLOAT — Tratamento Profissional de Manchas' : 'Carpet Stain Removal Lisboa | GLOAT — Professional Stain Treatment',
    description: pt ? 'Remoção especializada de manchas em tapetes em Lisboa. Vinho, café, gordura, manchas de animais.' : 'Specialist carpet stain removal in Lisboa. Wine, coffee, grease, pet stains treated professionally.',
    alternates: {
      canonical: pt ? 'https://gloatlaundry.com/pt/remocao-manchas-tapetes-lisboa' : 'https://gloatlaundry.com/en/carpet-stain-removal-lisboa',
      languages: {
        pt: 'https://gloatlaundry.com/pt/remocao-manchas-tapetes-lisboa',
        en: 'https://gloatlaundry.com/en/carpet-stain-removal-lisboa',
        'x-default': 'https://gloatlaundry.com/pt/remocao-manchas-tapetes-lisboa',
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === 'en') redirect('/en/carpet-stain-removal-lisboa');
  return <CarpetStainContent />;
}

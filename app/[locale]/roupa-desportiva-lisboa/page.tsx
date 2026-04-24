import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import SportsClothingContent from '@/components/pages/SportsClothingContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt ? 'Lavagem de Roupa Desportiva Lisboa | GLOAT — Lavandaria de Sportswear' : 'Sports Clothing Washing Lisboa | GLOAT — Sportswear Laundry Service',
    description: pt ? 'Lavagem profissional de roupa desportiva em Lisboa. Remove suor, odores e manchas preservando as propriedades técnicas.' : 'Professional sportswear washing in Lisboa. Remove sweat, odour and stains while preserving technical properties.',
    alternates: {
      canonical: pt ? 'https://gloatlaundry.com/pt/roupa-desportiva-lisboa' : 'https://gloatlaundry.com/en/sports-clothing-lisboa',
      languages: {
        pt: 'https://gloatlaundry.com/pt/roupa-desportiva-lisboa',
        en: 'https://gloatlaundry.com/en/sports-clothing-lisboa',
        'x-default': 'https://gloatlaundry.com/pt/roupa-desportiva-lisboa',
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === 'en') redirect('/en/sports-clothing-lisboa');
  return <SportsClothingContent />;
}

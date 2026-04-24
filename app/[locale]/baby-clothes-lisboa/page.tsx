import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import BabyClothesContent from '@/components/pages/BabyClothesContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt ? 'Lavagem de Roupa de Bebé Lisboa | GLOAT — Lavandaria Delicada para Bebés' : 'Baby Clothes Washing Lisboa | GLOAT — Gentle Baby Laundry Service',
    description: pt ? 'Lavagem delicada de roupa de bebé em Lisboa. Métodos seguros que removem manchas mantendo os tecidos suaves.' : 'Gentle baby clothes washing in Lisboa. Safe methods that remove stains while keeping fabrics soft and safe.',
    alternates: {
      canonical: pt ? 'https://gloatlaundry.com/pt/roupa-bebe-lisboa' : 'https://gloatlaundry.com/en/baby-clothes-lisboa',
      languages: {
        pt: 'https://gloatlaundry.com/pt/roupa-bebe-lisboa',
        en: 'https://gloatlaundry.com/en/baby-clothes-lisboa',
        'x-default': 'https://gloatlaundry.com/pt/roupa-bebe-lisboa',
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === 'pt') redirect('/pt/roupa-bebe-lisboa');
  return <BabyClothesContent />;
}

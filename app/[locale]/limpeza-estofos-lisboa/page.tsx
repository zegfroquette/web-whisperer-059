import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import UpholsteryCleaningContent from '@/components/pages/UpholsteryCleaningContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt ? 'Limpeza de Estofos Lisboa | GLOAT — Sofás, Cadeiras e Colchões' : 'Upholstery Cleaning Lisboa | GLOAT — Sofas, Chairs & Mattresses',
    description: pt ? 'Limpeza profissional de estofos em Lisboa. Sofás, cadeiras e colchões limpos a fundo. Recolha disponível.' : 'Professional upholstery cleaning in Lisboa. Sofas, chairs and mattresses deep cleaned. Pickup available.',
    alternates: {
      canonical: pt ? 'https://gloatlaundry.com/pt/limpeza-estofos-lisboa' : 'https://gloatlaundry.com/en/upholstery-cleaning',
      languages: {
        pt: 'https://gloatlaundry.com/pt/limpeza-estofos-lisboa',
        en: 'https://gloatlaundry.com/en/upholstery-cleaning',
        'x-default': 'https://gloatlaundry.com/pt/limpeza-estofos-lisboa',
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === 'en') redirect('/en/upholstery-cleaning');
  return <UpholsteryCleaningContent />;
}

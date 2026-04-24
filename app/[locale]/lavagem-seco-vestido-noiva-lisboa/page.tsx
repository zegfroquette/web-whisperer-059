import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import WeddingDressContent from '@/components/pages/WeddingDressContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt ? 'Lavagem a Seco de Vestidos de Noiva Lisboa | GLOAT — Limpeza de Vestidos de Noiva' : 'Wedding Dress Dry Cleaning Lisboa | GLOAT — Bridal Gown Cleaning',
    description: pt ? 'Lavagem a seco especializada de vestidos de noiva em Lisboa. Remoção manchas, proteção adornos. Prazo 5–7 dias.' : 'Specialist wedding dress dry cleaning in Lisboa. Stain removal, embellishment protection. 5–7 day turnaround.',
    alternates: {
      canonical: pt ? 'https://gloatlaundry.com/pt/lavagem-seco-vestido-noiva-lisboa' : 'https://gloatlaundry.com/en/wedding-dress-dry-cleaning-lisboa',
      languages: {
        pt: 'https://gloatlaundry.com/pt/lavagem-seco-vestido-noiva-lisboa',
        en: 'https://gloatlaundry.com/en/wedding-dress-dry-cleaning-lisboa',
        'x-default': 'https://gloatlaundry.com/pt/lavagem-seco-vestido-noiva-lisboa',
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === 'en') redirect('/en/wedding-dress-dry-cleaning-lisboa');
  return <WeddingDressContent />;
}

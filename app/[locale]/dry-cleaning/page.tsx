import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import DryCleaningContent from '@/components/pages/DryCleaningContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt ? 'Lavagem a Seco Lisboa | GLOAT — Fatos, Vestidos e Delicados' : 'Dry Cleaning Lisboa | GLOAT — Suits, Dresses & Delicates',
    description: pt ? 'Lavagem a seco profissional em Lisboa. Fatos, vestidos, casacos e peças delicadas. Prazo 5–7 dias. Recolha disponível.' : 'Professional dry cleaning in Lisboa. Suits, dresses, coats and delicate garments. 5–7 day turnaround. Pickup available.',
    alternates: {
      canonical: pt ? 'https://gloatlaundry.com/pt/lavagem-a-seco-lisboa' : 'https://gloatlaundry.com/en/dry-cleaning',
      languages: {
        pt: 'https://gloatlaundry.com/pt/lavagem-a-seco-lisboa',
        en: 'https://gloatlaundry.com/en/dry-cleaning',
        'x-default': 'https://gloatlaundry.com/pt/lavagem-a-seco-lisboa',
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === 'pt') redirect('/pt/lavagem-a-seco-lisboa');
  return <DryCleaningContent />;
}

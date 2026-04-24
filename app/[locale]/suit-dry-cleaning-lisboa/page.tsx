import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import SuitDryCleaningContent from '@/components/pages/SuitDryCleaningContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt ? 'Lavagem a Seco de Fatos Lisboa | GLOAT — Limpeza Profissional de Fatos' : 'Suit Dry Cleaning Lisboa | GLOAT — Professional Suit Cleaning',
    description: pt ? 'Lavagem a seco profissional de fatos em Lisboa. Todos os estilos e tecidos. Prazo 5–7 dias, prensagem incluída.' : 'Professional suit dry cleaning in Lisboa. All styles and fabrics. 5–7 day turnaround, pressing included.',
    alternates: {
      canonical: pt ? 'https://gloatlaundry.com/pt/lavagem-seco-fatos-lisboa' : 'https://gloatlaundry.com/en/suit-dry-cleaning-lisboa',
      languages: {
        pt: 'https://gloatlaundry.com/pt/lavagem-seco-fatos-lisboa',
        en: 'https://gloatlaundry.com/en/suit-dry-cleaning-lisboa',
        'x-default': 'https://gloatlaundry.com/pt/lavagem-seco-fatos-lisboa',
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === 'pt') redirect('/pt/lavagem-seco-fatos-lisboa');
  return <SuitDryCleaningContent />;
}

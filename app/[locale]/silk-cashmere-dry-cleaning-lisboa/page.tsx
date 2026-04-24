import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import SilkCashmereContent from '@/components/pages/SilkCashmereContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt ? 'Lavagem a Seco de Seda e Cashmere Lisboa | GLOAT — Cuidados com Tecidos de Luxo' : 'Silk & Cashmere Dry Cleaning Lisboa | GLOAT — Luxury Fabric Care',
    description: pt ? 'Lavagem a seco especializada de seda e cashmere em Lisboa. Preserve suavidade, cor e estrutura. 5–7 dias.' : 'Specialist silk and cashmere dry cleaning in Lisboa. Preserve softness, colour and structure. 5–7 days.',
    alternates: {
      canonical: pt ? 'https://gloatlaundry.com/pt/lavagem-seco-seda-cashmere-lisboa' : 'https://gloatlaundry.com/en/silk-cashmere-dry-cleaning-lisboa',
      languages: {
        pt: 'https://gloatlaundry.com/pt/lavagem-seco-seda-cashmere-lisboa',
        en: 'https://gloatlaundry.com/en/silk-cashmere-dry-cleaning-lisboa',
        'x-default': 'https://gloatlaundry.com/pt/lavagem-seco-seda-cashmere-lisboa',
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === 'pt') redirect('/pt/lavagem-seco-seda-cashmere-lisboa');
  return <SilkCashmereContent />;
}

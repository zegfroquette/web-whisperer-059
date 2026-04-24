import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import LaundryServiceContent from '@/components/pages/LaundryServiceContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt ? 'Lavandaria Lisboa | GLOAT — Lavagem, Dobra e Recolha' : 'Laundry Service Lisboa | GLOAT — Wash, Fold & Pickup',
    description: pt ? 'Lavandaria profissional em Lisboa. Lavagem e dobra, engomadoria, expresso e recolha e entrega. GLOAT junto às Amoreiras.' : 'Professional laundry service in Lisboa. Wash & fold, ironing, express and pickup & delivery across Lisbon. GLOAT near Amoreiras.',
    alternates: {
      canonical: pt ? 'https://gloatlaundry.com/pt/servico-lavandaria' : 'https://gloatlaundry.com/en/laundry-service',
      languages: {
        pt: 'https://gloatlaundry.com/pt/servico-lavandaria',
        en: 'https://gloatlaundry.com/en/laundry-service',
        'x-default': 'https://gloatlaundry.com/pt/servico-lavandaria',
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === 'pt') redirect('/pt/servico-lavandaria');
  return <LaundryServiceContent />;
}

import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import ShirtLaundryContent from '@/components/pages/ShirtLaundryContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt ? 'Lavagem de Camisas Lisboa | GLOAT — Lavagem Profissional de Camisas' : 'Shirt Laundry Service Lisboa | GLOAT — Professional Shirt Washing',
    description: pt ? 'Lavagem profissional de camisas em Lisboa. Manchas tratadas, colarinhos firmes, prontas em 48 horas.' : 'Professional shirt laundry in Lisboa. Stains treated, collars crisp, ready to wear in 48 hours.',
    alternates: {
      canonical: pt ? 'https://gloatlaundry.com/pt/lavagem-camisas-lisboa' : 'https://gloatlaundry.com/en/shirt-laundry-lisboa',
      languages: {
        pt: 'https://gloatlaundry.com/pt/lavagem-camisas-lisboa',
        en: 'https://gloatlaundry.com/en/shirt-laundry-lisboa',
        'x-default': 'https://gloatlaundry.com/pt/lavagem-camisas-lisboa',
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === 'pt') redirect('/pt/lavagem-camisas-lisboa');
  return <ShirtLaundryContent />;
}

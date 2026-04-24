import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import ExpressLaundryContent from '@/components/pages/ExpressLaundryContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt ? 'Lavandaria Expresso Lisboa | GLOAT — Serviço de Lavandaria em 24 Horas' : 'Express Laundry Lisboa | GLOAT — 24 Hour Laundry Service',
    description: pt ? 'Serviço de lavandaria expresso em Lisboa. Roupa lavada, seca e pronta em 24 horas. Traga ou recolha expresso.' : 'Express laundry service in Lisboa. Clothes washed, dried and ready within 24 hours. Drop off or express pickup.',
    alternates: {
      canonical: pt ? 'https://gloatlaundry.com/pt/lavandaria-expresso-lisboa' : 'https://gloatlaundry.com/en/express-laundry-lisboa',
      languages: {
        pt: 'https://gloatlaundry.com/pt/lavandaria-expresso-lisboa',
        en: 'https://gloatlaundry.com/en/express-laundry-lisboa',
        'x-default': 'https://gloatlaundry.com/pt/lavandaria-expresso-lisboa',
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === 'en') redirect('/en/express-laundry-lisboa');
  return <ExpressLaundryContent />;
}

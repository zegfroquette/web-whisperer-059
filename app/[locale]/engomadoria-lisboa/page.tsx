import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import IroningServiceContent from '@/components/pages/IroningServiceContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt ? 'Serviço de Engomadoria Lisboa | GLOAT — Engomadoria Profissional' : 'Ironing Service Lisboa | GLOAT — Professional Ironing & Finishing',
    description: pt ? 'Serviço profissional de engomadoria em Lisboa. Camisas, calças, vestidos e mais com acabamento rigoroso.' : 'Professional ironing service in Lisboa. Shirts, trousers, dresses and more finished sharply in 48 hours.',
    alternates: {
      canonical: pt ? 'https://gloatlaundry.com/pt/engomadoria-lisboa' : 'https://gloatlaundry.com/en/ironing-service-lisboa',
      languages: {
        pt: 'https://gloatlaundry.com/pt/engomadoria-lisboa',
        en: 'https://gloatlaundry.com/en/ironing-service-lisboa',
        'x-default': 'https://gloatlaundry.com/pt/engomadoria-lisboa',
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === 'en') redirect('/en/ironing-service-lisboa');
  return <IroningServiceContent />;
}

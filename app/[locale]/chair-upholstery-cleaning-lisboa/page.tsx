import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import ChairUpholsteryContent from '@/components/pages/ChairUpholsteryContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt ? 'Limpeza de Cadeiras Estofadas Lisboa | GLOAT — Limpeza de Estofos de Cadeiras' : 'Chair Upholstery Cleaning Lisboa | GLOAT — Upholstered Chair Cleaning',
    description: pt ? 'Limpeza profissional de cadeiras estofadas em Lisboa. Cadeiras de jantar, poltronas, cadeiras de escritório.' : 'Professional upholstered chair cleaning in Lisboa. Dining chairs, armchairs, office chairs cleaned thoroughly.',
    alternates: {
      canonical: pt ? 'https://gloatlaundry.com/pt/limpeza-cadeiras-estofadas-lisboa' : 'https://gloatlaundry.com/en/chair-upholstery-cleaning-lisboa',
      languages: {
        pt: 'https://gloatlaundry.com/pt/limpeza-cadeiras-estofadas-lisboa',
        en: 'https://gloatlaundry.com/en/chair-upholstery-cleaning-lisboa',
        'x-default': 'https://gloatlaundry.com/pt/limpeza-cadeiras-estofadas-lisboa',
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === 'pt') redirect('/pt/limpeza-cadeiras-estofadas-lisboa');
  return <ChairUpholsteryContent />;
}

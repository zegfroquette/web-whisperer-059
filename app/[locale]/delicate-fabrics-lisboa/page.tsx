import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import DelicateFabricsContent from '@/components/pages/DelicateFabricsContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt ? 'Lavagem de Tecidos Delicados Lisboa | GLOAT — Seda, Lã e Renda' : 'Delicate Fabrics Washing Lisboa | GLOAT — Silk, Wool & Lace Care',
    description: pt ? 'Lavagem especializada de tecidos delicados em Lisboa. Seda, lã, renda e malhas finas com cuidado especializado.' : 'Specialist washing for delicate fabrics in Lisboa. Silk, wool, lace and fine knitwear with expert care.',
    alternates: {
      canonical: pt ? 'https://gloatlaundry.com/pt/tecidos-delicados-lisboa' : 'https://gloatlaundry.com/en/delicate-fabrics-lisboa',
      languages: {
        pt: 'https://gloatlaundry.com/pt/tecidos-delicados-lisboa',
        en: 'https://gloatlaundry.com/en/delicate-fabrics-lisboa',
        'x-default': 'https://gloatlaundry.com/pt/tecidos-delicados-lisboa',
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === 'pt') redirect('/pt/tecidos-delicados-lisboa');
  return <DelicateFabricsContent />;
}

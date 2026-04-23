import type { Metadata } from 'next';
import TermsConditionsContent from '@/components/pages/TermsConditionsContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt ? 'Termos e Condições | GLOAT Laundry' : 'Terms & Conditions | GLOAT Laundry',
    description: pt
      ? 'Termos e condições da GLOAT — The Greatest Laundry.'
      : 'Terms and conditions of GLOAT — The Greatest Laundry.',
    alternates: {
      canonical: pt
        ? 'https://gloatlaundry.com/pt/terms-and-conditions'
        : 'https://gloatlaundry.com/en/terms-and-conditions',
      languages: {
        pt: 'https://gloatlaundry.com/pt/terms-and-conditions',
        en: 'https://gloatlaundry.com/en/terms-and-conditions',
        'x-default': 'https://gloatlaundry.com/pt/terms-and-conditions',
      },
    },
  };
}

export default function TermsConditionsPage() {
  return <TermsConditionsContent />;
}

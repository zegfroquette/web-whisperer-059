import type { Metadata } from 'next';
import PrivacyPolicyContent from '@/components/pages/PrivacyPolicyContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt ? 'Política de Privacidade | GLOAT Laundry' : 'Privacy Policy | GLOAT Laundry',
    description: pt
      ? 'Política de privacidade da GLOAT — The Greatest Laundry.'
      : 'Privacy policy of GLOAT — The Greatest Laundry.',
    alternates: {
      canonical: pt
        ? 'https://gloatlaundry.com/pt/privacy-policy'
        : 'https://gloatlaundry.com/en/privacy-policy',
      languages: {
        pt: 'https://gloatlaundry.com/pt/privacy-policy',
        en: 'https://gloatlaundry.com/en/privacy-policy',
        'x-default': 'https://gloatlaundry.com/pt/privacy-policy',
      },
    },
  };
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />;
}

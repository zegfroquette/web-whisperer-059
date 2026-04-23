import type { Metadata } from 'next';
import ContactContent from '@/components/pages/ContactContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt
      ? 'Contacto GLOAT Lisboa — Morada, Telefone e Horários'
      : 'Contact GLOAT Lisbon — Address, Phone & Hours',
    description: pt
      ? 'Contacte a GLOAT em Lisboa. Rua Artilharia 1, Nº 1, 1250-036 Lisboa. Telefone (+351) 935 479 900. Seg-Sex 9h-18h, Sáb 10h-13h.'
      : 'Contact GLOAT in Lisbon. Rua Artilharia 1, No. 1, 1250-036 Lisbon. Phone (+351) 935 479 900. Mon-Fri 9am-6pm, Sat 10am-1pm.',
    alternates: {
      canonical: pt ? 'https://gloatlaundry.com/pt/contact' : 'https://gloatlaundry.com/en/contact',
      languages: {
        pt: 'https://gloatlaundry.com/pt/contact',
        en: 'https://gloatlaundry.com/en/contact',
        'x-default': 'https://gloatlaundry.com/pt/contact',
      },
    },
    openGraph: {
      title: pt ? 'Contacto | GLOAT Laundry Lisboa' : 'Contact | GLOAT Laundry Lisbon',
      description: pt
        ? 'Contacte a GLOAT em Lisboa. Rua Artilharia 1, Nº 1, 1250-036 Lisboa.'
        : 'Contact GLOAT in Lisbon. Rua Artilharia 1, No. 1, 1250-036 Lisbon.',
      url: pt ? 'https://gloatlaundry.com/pt/contact' : 'https://gloatlaundry.com/en/contact',
    },
  };
}

export default function ContactPage() {
  return <ContactContent />;
}

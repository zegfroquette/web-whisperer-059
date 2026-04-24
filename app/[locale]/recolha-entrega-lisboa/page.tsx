import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import PickupDeliveryContent from '@/components/pages/PickupDeliveryContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt ? 'Recolha e Entrega de Roupa Lisboa | GLOAT — Serviço Porta a Porta' : 'Laundry Pickup & Delivery Lisboa | GLOAT — Door to Door Service',
    description: pt ? 'Recolha e entrega de roupa em Lisboa. Recolhemos na sua porta e entregamos limpa em 48 horas.' : 'Laundry pickup and delivery in Lisboa. We collect from your door and deliver back clean in 48 hours.',
    alternates: {
      canonical: pt ? 'https://gloatlaundry.com/pt/recolha-entrega-lisboa' : 'https://gloatlaundry.com/en/laundry-pickup-delivery-lisboa',
      languages: {
        pt: 'https://gloatlaundry.com/pt/recolha-entrega-lisboa',
        en: 'https://gloatlaundry.com/en/laundry-pickup-delivery-lisboa',
        'x-default': 'https://gloatlaundry.com/pt/recolha-entrega-lisboa',
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === 'en') redirect('/en/laundry-pickup-delivery-lisboa');
  return <PickupDeliveryContent />;
}

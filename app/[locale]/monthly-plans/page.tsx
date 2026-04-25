import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import MonthlyPlansContent from '@/components/pages/MonthlyPlansContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const pt = locale === 'pt';
  return {
    title: pt ? 'Planos Mensais Lisboa | GLOAT — Planos de Subscrição de Lavandaria' : 'Monthly Plans Lisboa | GLOAT — Laundry Subscription Plans',
    description: pt ? 'Planos mensais de lavandaria em Lisboa. Escolha o plano ideal para o seu dia-a-dia. Recolha e entrega incluídas.' : 'Monthly laundry subscription plans in Lisboa. Choose the plan that fits your routine. Pickup and delivery included.',
    alternates: {
      canonical: pt ? 'https://gloatlaundry.com/pt/planos-mensais' : 'https://gloatlaundry.com/en/monthly-plans',
      languages: {
        pt: 'https://gloatlaundry.com/pt/planos-mensais',
        en: 'https://gloatlaundry.com/en/monthly-plans',
        'x-default': 'https://gloatlaundry.com/pt/planos-mensais',
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === 'pt') redirect('/pt/planos-mensais');
  return <MonthlyPlansContent />;
}

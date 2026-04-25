'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionHeader } from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const MonthlyPlansContent = () => {
  const { language } = useLanguage();
  const pt = language === 'pt';

  const plans = [
    {
      name: pt ? 'Plano Lite' : 'Lite Plan',
      price: '65,00€',
      period: pt ? '4 semanas' : '4 weeks',
      desc: pt ? '4 bolsas STANDARD (aprox. 5kg) de roupa do dia-a-dia lavada e dobrada' : '4 STANDARD bags (approx. 5kg) of washed & folded everyday clothes',
      benefits: pt
        ? ['4 Bolsas STANDARD (aprox. 5kg) por mês', '1 recolha e entrega semanal', 'Lavagem profissional', 'Roupa dobrada e pronta a guardar', 'Entrega em 48h']
        : ['4 STANDARD bags (approx. 5kg) per month', '1 weekly pickup and delivery', 'Professional wash', 'Neatly folded & ready to store', 'Delivery in 48h'],
    },
    {
      name: pt ? 'Plano Max' : 'Max Plan',
      price: '85,00€',
      period: pt ? '4 semanas' : '4 weeks',
      desc: pt ? '4 bolsas GRANDE (aprox. 10kg) de roupa do dia-a-dia lavada e dobrada' : '4 MAX bags (approx. 10kg) of washed & folded everyday clothes',
      benefits: pt
        ? ['4 Bolsas GRANDE (aprox. 10kg) por mês', '1 recolha e entrega semanal', 'Lavagem profissional', 'Roupa dobrada e pronta a guardar', 'Entrega em 48h']
        : ['4 MAX bags (approx. 10kg) per month', '1 weekly pickup and delivery', 'Professional wash', 'Neatly folded & ready to store', 'Delivery in 48h'],
    },
    {
      name: pt ? 'Plano Engomadoria' : 'Ironing Plan',
      price: '60,00€',
      period: pt ? '4 semanas' : '4 weeks',
      desc: pt ? '24 peças apenas engomadas' : '24 pieces ironed only',
      benefits: pt
        ? ['24 peças por mês', '1 recolha e entrega semanal', 'Engomadoria profissional', 'Entregue em cabides', 'Entregue em 48 horas']
        : ['24 pieces per month', '1 weekly pickup and delivery', 'Professional ironing', 'Delivered on hangers', 'Delivered in 48 hours'],
    },
    {
      name: pt ? 'Plano Lavar e Engomar' : 'Wash & Iron Plan',
      price: '80,00€',
      period: pt ? '4 semanas' : '4 weeks',
      desc: pt ? '24 peças lavadas e engomadas' : '24 pieces washed & ironed',
      benefits: pt
        ? ['24 peças por mês', '1 recolha e entrega semanal', 'Lavagem + engomadoria', 'Serviço completo', 'Entregue em cabides', 'Entregue em 48 horas']
        : ['24 pieces per month', '1 weekly pickup and delivery', 'Wash + ironing', 'Full service', 'Delivered on hangers', 'Delivered in 48 hours'],
    },
  ];

  return (
    <>
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            as="h1"
            title={pt ? 'Planos Mensais' : 'Monthly Plans'}
            subtitle={pt
              ? 'Escolha o plano que melhor se adapta ao seu dia-a-dia e poupe todos os meses. Items adicionais ao plano a preços reduzidos. Delivery incluído.'
              : 'Choose the plan that best fits your routine and save every month. Additional items at reduced prices. Delivery included.'}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="relative flex flex-col rounded-2xl p-6 border border-border/50 bg-card shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-5">
                  <h2 className="text-base font-bold mb-3 text-foreground">{plan.name}</h2>
                  <div className="text-3xl font-extrabold text-gradient leading-none">{plan.price}</div>
                  <p className="text-xs text-muted-foreground mt-1">/ {plan.period}</p>
                  <p className="text-sm text-muted-foreground mt-3 leading-snug">{plan.desc}</p>
                </div>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.benefits.map((b, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full rounded-full mt-auto" variant="outline">
                  <Link href={`/${language}/contact`}>{pt ? 'Escolher Plano' : 'Choose Plan'}</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="gradient-primary rounded-3xl p-10 md:p-16"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {pt ? 'Pronto para experimentar a GLOAT?' : 'Ready to try GLOAT?'}
            </h2>
            <p className="text-white/80 mb-8 text-lg">{pt ? 'Agende uma recolha em 60 segundos.' : 'Book a pickup in 60 seconds.'}</p>
            <div className="flex justify-center">
              <Button asChild size="lg" className="rounded-full px-8 bg-white text-foreground hover:bg-white/90 font-semibold shadow-lg">
                <Link href={`/${language}/booking`}>{pt ? 'Agendar Recolha' : 'Book a Pickup'}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default MonthlyPlansContent;

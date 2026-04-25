'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionHeader } from '@/components/SectionHeader';
import { Shirt, Wind, Gem, Droplets, Zap, Truck } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' as const },
  }),
};

const services = [
  {
    icon: Shirt,
    color: 'bg-blue-500/10 text-blue-600',
    enTitle: 'Laundry Service',
    ptTitle: 'Serviço de Lavandaria',
    enDesc: 'Wash & fold, shirts, ironing, bedding, and more. Everything washed, dried, and returned ready.',
    ptDesc: 'Lavagem e dobra, camisas, engomadoria, roupa de cama e mais. Tudo lavado, seco e pronto.',
    enSlug: 'laundry-service',
    ptSlug: 'servico-lavandaria',
  },
  {
    icon: Wind,
    color: 'bg-purple-500/10 text-purple-600',
    enTitle: 'Dry Cleaning',
    ptTitle: 'Lavagem a Seco',
    enDesc: 'Specialist care for suits, dresses, coats, silk, cashmere, and formal wear. Turnaround 5–7 days.',
    ptDesc: 'Cuidados especializados para fatos, vestidos, casacos, seda, cashmere e roupa formal. Prazo 5–7 dias.',
    enSlug: 'dry-cleaning',
    ptSlug: 'lavagem-a-seco-lisboa',
  },
  {
    icon: Gem,
    color: 'bg-amber-500/10 text-amber-600',
    enTitle: 'Leather Cleaning',
    ptTitle: 'Limpeza de Cabedal',
    enDesc: 'Jackets, bags, sofas, and shoes cleaned and conditioned with specialist techniques. Up to 10 days.',
    ptDesc: 'Casacos, malas, sofás e sapatos limpos e condicionados com técnicas especializadas. Até 10 dias.',
    enSlug: 'leather-cleaning',
    ptSlug: 'limpeza-cabedal-lisboa',
  },
  {
    icon: Droplets,
    color: 'bg-teal-500/10 text-teal-600',
    enTitle: 'Upholstery Cleaning',
    ptTitle: 'Limpeza de Estofos',
    enDesc: 'Sofas and chairs deep cleaned, removing dirt, stains, and odours from all upholstered furniture.',
    ptDesc: 'Sofás e cadeiras limpos em profundidade, removendo sujidade, manchas e odores de todos os estofos.',
    enSlug: 'upholstery-cleaning',
    ptSlug: 'limpeza-estofos-lisboa',
  },
  {
    icon: Zap,
    color: 'bg-red-500/10 text-red-600',
    enTitle: 'Express Service',
    ptTitle: 'Serviço Expresso',
    enDesc: 'Need it back fast? Your laundry washed, dried, and ready within 24 hours.',
    ptDesc: 'Precisa a tempo? A sua roupa lavada, seca e pronta em 24 horas.',
    enSlug: 'express-laundry-lisboa',
    ptSlug: 'lavandaria-expresso-lisboa',
  },
  {
    icon: Truck,
    color: 'bg-green-500/10 text-green-600',
    enTitle: 'Pickup & Delivery',
    ptTitle: 'Recolha e Entrega',
    enDesc: 'We collect from your door across Lisboa and return everything clean, folded, and ready.',
    ptDesc: 'Recolhemos na sua porta em toda a Lisboa e devolvemos tudo limpo, dobrado e pronto.',
    enSlug: 'laundry-pickup-delivery-lisboa',
    ptSlug: 'recolha-entrega-lisboa',
  },
];

export default function ServicesContent() {
  const { language } = useLanguage();
  const pt = language === 'pt';

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionHeader as="h1" title={pt ? 'Os Nossos Serviços' : 'Our Services'} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm hover:shadow-md transition-all"
            >
              <Link href={`/${language}/${pt ? s.ptSlug : s.enSlug}`} className="block h-full">
                <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center mb-4`}>
                  <s.icon className="w-6 h-6" />
                </div>
                <h2
                  className="text-lg font-bold mb-2"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {pt ? s.ptTitle : s.enTitle}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {pt ? s.ptDesc : s.enDesc}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

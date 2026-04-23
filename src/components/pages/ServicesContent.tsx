'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionHeader } from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { Shirt, Wind, Droplets, Gem, Zap, Truck } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' as const },
  }),
};

const ServicesContent = () => {
  const { t, language } = useLanguage();
  const pt = language === 'pt';

  const services = [
    { icon: Shirt, title: t('services', 'washFold'), desc: t('services', 'washFoldDesc'), color: 'bg-blue-500/10 text-blue-600' },
    { icon: Wind, title: t('services', 'ironing'), desc: t('services', 'ironingDesc'), color: 'bg-teal-500/10 text-teal-600' },
    { icon: Droplets, title: t('services', 'dryCleaning'), desc: t('services', 'dryCleaningDesc'), color: 'bg-purple-500/10 text-purple-600' },
    { icon: Gem, title: t('services', 'specialItems'), desc: t('services', 'specialItemsDesc'), color: 'bg-amber-500/10 text-amber-600' },
    { icon: Zap, title: t('services', 'expressService'), desc: t('services', 'expressServiceDesc'), color: 'bg-red-500/10 text-red-600' },
    { icon: Truck, title: t('services', 'delivery'), desc: t('services', 'deliveryDesc'), color: 'bg-green-500/10 text-green-600' },
  ];

  const faqs = pt ? [
    { q: 'Lavam sapatos?', a: 'Sim. Agende uma recolha ou traga-os à loja. Tratamos do resto.' },
    { q: 'A roupa é devolvida em cabides ou dobrada?', a: 'As peças engomadas são devolvidas em cabides. As peças do serviço lavar e dobrar são devolvidas cuidadosamente dobradas.' },
    { q: 'Fazem lavagem à mão para peças delicadas?', a: 'Sim, a lavagem à mão está disponível para peças delicadas.' },
    { q: 'Posso engomar apenas algumas peças?', a: 'Sim, pode pedir o serviço de engomadoria sem subscrição. Peças individuais a partir de 2,50€ por peça.' },
    { q: 'Como funciona a limpeza a seco?', a: 'Entregue as suas peças na loja ou agende uma recolha. Tratamos com processos especializados de limpeza a seco e devolvemos em 5 dias.' },
  ] : [
    { q: 'Do you wash shoes?', a: 'Yes, absolutely. Schedule a pickup or bring them to the store. We handle the rest.' },
    { q: 'Is clothing returned on hangers or folded?', a: 'Ironed items are returned on hangers. Wash & fold items are returned neatly folded.' },
    { q: 'Do you hand wash delicate items?', a: 'Yes, hand washing is available for delicate items.' },
    { q: 'Can you iron just a few items (shirts, pants, etc)?', a: 'Yes, you can order ironing without a subscription. Individual items start from €2.50 per piece.' },
    { q: 'How does dry cleaning work?', a: 'Drop off your items or schedule a pickup. We treat them with specialist dry cleaning processes and return them within 5 days.' },
  ];

  return (
    <>
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <SectionHeader as="h1" title={t('services', 'title')} subtitle={t('services', 'subtitle')} />
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
                <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center mb-4`}>
                  <s.icon className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-bold mb-2">{s.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
              {t('home', 'ctaTitle')}
            </h2>
            <p className="text-white/80 mb-8 text-lg">{t('home', 'ctaSubtitle')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full px-8 bg-white text-foreground hover:bg-white/90 font-semibold shadow-lg">
                <Link href={`/${language}/pricing`}>{t('home', 'viewPlans')}</Link>
              </Button>
              <Button asChild size="lg" className="rounded-full px-8 bg-foreground/20 border-2 border-white text-white hover:bg-white/20 font-semibold backdrop-blur-sm">
                <Link href={`/${language}/booking`}>{t('home', 'bookPickup')}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">
            {pt ? 'Perguntas Frequentes' : 'Frequently Asked Questions'}
          </h2>
          <Accordion type="multiple" defaultValue={faqs.map((_, i) => `faq-${i}`)} className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border border-border/50 px-6">
                <AccordionTrigger className="text-left font-medium">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
};

export default ServicesContent;

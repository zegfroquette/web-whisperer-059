import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
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

const Services = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const pt = language === 'pt';

  const goToPlans = () => {
    navigate('/precos');
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 0);
  };

  const services = [
    { icon: Shirt, title: t('services', 'washFold'), desc: t('services', 'washFoldDesc'), color: 'bg-blue-500/10 text-blue-600' },
    { icon: Wind, title: t('services', 'ironing'), desc: t('services', 'ironingDesc'), color: 'bg-teal-500/10 text-teal-600' },
    { icon: Droplets, title: t('services', 'dryCleaning'), desc: t('services', 'dryCleaningDesc'), color: 'bg-purple-500/10 text-purple-600' },
    { icon: Gem, title: t('services', 'specialItems'), desc: t('services', 'specialItemsDesc'), color: 'bg-amber-500/10 text-amber-600' },
    { icon: Zap, title: t('services', 'expressService'), desc: t('services', 'expressServiceDesc'), color: 'bg-red-500/10 text-red-600' },
    { icon: Truck, title: t('services', 'delivery'), desc: t('services', 'deliveryDesc'), color: 'bg-green-500/10 text-green-600' },
  ];

  const faqs = pt ? [
    {
      q: 'Como funciona o serviço de recolha e entrega?',
      a: 'Agende a sua recolha online ou contacte-nos pelo WhatsApp. O nosso motorista recolhe a sua roupa na hora combinada e entrega-a no horário agendado.',
    },
    {
      q: 'Com quanto tempo de antecedência devo fazer a reserva?',
      a: 'Recomendamos que reserve com pelo menos 24 horas de antecedência para garantir o horário preferido.',
    },
    {
      q: 'Posso reagendar ou cancelar a minha reserva?',
      a: 'Sim. Contacte-nos pelo WhatsApp o mais rapidamente possível e iremos ajudá-lo com qualquer alteração.',
    },
    {
      q: 'Quanto tempo demora o serviço?',
      a: 'Lavar e/ou engomar demora aproximadamente 48 horas. A limpeza a seco demora aproximadamente 4 a 5 dias, dependendo do artigo.',
    },
    {
      q: 'Qual é o horário de recolhas e entregas?',
      a: 'As recolhas e entregas são realizadas entre as 9h00 e as 15h00.',
    },
    {
      q: 'Oferecem serviço expresso?',
      a: 'Sim. Para lavagem e engomadoria, oferecemos uma opção expresso em 24 horas mediante um custo adicional.',
    },
    {
      q: 'Qual é a forma mais rápida de contactar o suporte?',
      a: 'Recomendamos que nos ligue ou contacte pelo WhatsApp para uma resposta mais rápida.',
    },
  ] : [
    {
      q: 'How does the pickup and delivery service work?',
      a: 'Schedule your pickup online or contact us on WhatsApp. Our driver collects your laundry at the agreed time and returns it at the scheduled delivery time.',
    },
    {
      q: 'How far in advance should I book?',
      a: 'We recommend booking at least 24 hours in advance to secure your preferred time slot.',
    },
    {
      q: 'Can I reschedule or cancel my booking?',
      a: 'Yes. Please contact us on WhatsApp as soon as possible and we will assist you with any changes.',
    },
    {
      q: 'How long does the service take?',
      a: 'Washing and/or ironing takes approximately 48 hours. Dry cleaning takes approximately 4 to 5 days, depending on the item.',
    },
    {
      q: 'What are your pickup and delivery hours?',
      a: 'Pickups and deliveries are made between 9:00 AM and 3:00 PM.',
    },
    {
      q: 'Do you offer express service?',
      a: 'Yes. For washing and ironing, we offer a 24-hour express option for an additional fee.',
    },
    {
      q: 'What is the fastest way to reach support?',
      a: 'We recommend calling us or contacting us on WhatsApp for the quickest response.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Serviços | GLOAT Laundry Lisboa</title>
        <meta name="description" content="Conheça os serviços da GLOAT: lavar e dobrar, engomar, limpeza a seco, tratamento de nódoas e recolha ao domicílio em Lisboa." />
        <link rel="canonical" href="https://gloatlaundry.com/servicos" />
        <link rel="alternate" hrefLang="pt" href="https://gloatlaundry.com/servicos" />
        <link rel="alternate" hrefLang="en" href="https://gloatlaundry.com/services" />
        <link rel="alternate" hrefLang="x-default" href="https://gloatlaundry.com/servicos" />
        <meta property="og:title" content="Serviços | GLOAT Laundry Lisboa" />
        <meta property="og:description" content="Conheça os serviços da GLOAT: lavar e dobrar, engomar, limpeza a seco, tratamento de nódoas e recolha ao domicílio em Lisboa." />
        <meta property="og:url" content="https://gloatlaundry.com/servicos" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a }
          }))
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": services.map((s, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "item": {
              "@type": "Service",
              "name": s.title,
              "description": s.desc,
              "provider": {
                "@type": "LocalBusiness",
                "name": "GLOAT — The Greatest Laundry",
                "url": "https://gloatlaundry.com"
              }
            }
          }))
        })}</script>
      </Helmet>
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
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
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
            className="gradient-primary rounded-3xl p-10 md:p-16">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {t('home', 'ctaTitle')}
            </h2>
            <p className="text-white/80 mb-8 text-lg">{t('home', 'ctaSubtitle')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={goToPlans} className="rounded-full px-8 bg-white text-foreground hover:bg-white/90 font-semibold shadow-lg">
                {t('home', 'viewPlans')}
              </Button>
              <Button size="lg" onClick={() => { navigate('/reserva'); setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 0); }} className="rounded-full px-8 bg-foreground/20 border-2 border-white text-white hover:bg-white/20 font-semibold backdrop-blur-sm">
                {t('home', 'bookPickup')}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">
            {pt ? 'Perguntas Frequentes' : 'Frequently Asked Questions'}
          </h3>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card rounded-xl border border-border/50 px-6"
              >
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

export default Services;

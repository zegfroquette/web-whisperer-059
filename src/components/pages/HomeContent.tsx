'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionHeader } from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Zap, Award, Tag, ShieldCheck, Package, Sparkles, Truck } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' as const }
  })
};

const HomeContent = () => {
  const { t, language } = useLanguage();
  const pt = language === 'pt';

  const faqs = pt ? [
    { q: 'Posso entregar sem agendar?', a: 'Sim, pode entregar diretamente na nossa loja na Rua de Artilharia 1 em Lisboa durante o horário de funcionamento. Não é necessário agendar para entregas na loja.' },
    { q: 'Qual é o horário de funcionamento?', a: 'A GLOAT está aberta de segunda a sexta das 9h às 18h, e ao sábado das 10h às 13h.' },
    { q: 'Só operam em Lisboa?', a: 'Sim, a GLOAT está localizada em Lisboa, perto do Jardim das Amoreiras. Fazemos recolha e entrega em vários bairros de Lisboa, incluindo Campo de Ourique, Estrela, Chiado e muito mais.' },
    { q: 'A GLOAT é uma lavandaria self-service?', a: 'Não. A GLOAT é uma lavandaria de serviço completo. Entrega na loja ou nós recolhemos, e tratamos de tudo.' },
    { q: 'Falam inglês?', a: 'Sim, a nossa equipa fala Inglês.' },
    { q: 'Oferecem serviço expresso?', a: 'Sim. Para lavagem e engomadoria, oferecemos uma opção expresso em 24 horas mediante um custo adicional.' },
    { q: 'Qual é a forma mais rápida de contactar o suporte?', a: 'Recomendamos que nos ligue ou contacte pelo WhatsApp para uma resposta mais rápida.' },
  ] : [
    { q: 'Can I drop off without booking?', a: 'Yes, you can drop off directly at our store on Rua de Artilharia 1 in Lisboa during opening hours. No booking needed for drop-offs.' },
    { q: 'What are your opening hours?', a: 'GLOAT is opened Monday through Friday from 9am to 6pm, and on Saturday from 10am to 1pm.' },
    { q: 'Are you only in Lisbon?', a: 'Yes, GLOAT is based in Lisbon, near Jardim das Amoreiras. We offer pickup and delivery across several Lisbon neighbourhoods including Campo de Ourique, Estrela, Chiado and much more.' },
    { q: 'Is GLOAT a self-service laundromat?', a: 'No. GLOAT is a full-service laundry. You drop off or we collect, and we take care of everything.' },
    { q: 'Do you speak English?', a: 'Yes, we\'re fully bilingual in Portuguese and English.' },
    { q: 'Do you offer express service?', a: 'Yes. For washing and ironing, we offer a 24-hour express option for an additional fee.' },
    { q: 'What is the fastest way to reach support?', a: 'We recommend calling us or contacting us on WhatsApp for the quickest response.' },
  ];

  const steps = [
    { icon: Package, title: t('home', 'step1Title'), desc: t('home', 'step1Desc') },
    { icon: Sparkles, title: t('home', 'step2Title'), desc: t('home', 'step2Desc') },
    { icon: Truck, title: t('home', 'step3Title'), desc: t('home', 'step3Desc') },
  ];

  const reasons = [
    { icon: Zap, title: t('home', 'speed'), desc: t('home', 'speedDesc') },
    { icon: Award, title: t('home', 'quality'), desc: t('home', 'qualityDesc') },
    { icon: ShieldCheck, title: t('home', 'reliable'), desc: t('home', 'reliableDesc') },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-14 md:py-20 px-4">
        <div className="absolute inset-0 gradient-primary opacity-[0.03] my-0" />
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 right-[15%] w-16 h-16 rounded-2xl bg-primary/10 hidden md:block"
        />
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-32 left-[10%] w-12 h-12 rounded-full bg-accent/10 hidden md:block"
        />
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-40 left-[20%] w-8 h-8 rounded-lg bg-primary/5 hidden md:block"
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-[fadeSlideUp_0.6s_ease-out_both]">
            <span className="block" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '-0.04em', wordSpacing: '0.1em' }}>
              {t('home', 'heroTitleLine1')}
            </span>
            <span className="block" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '-0.04em', wordSpacing: '0.1em' }}>
              {t('home', 'heroTitleLine2')}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-2 max-w-2xl mx-auto animate-[fadeSlideUp_0.6s_ease-out_0.2s_both]">
            {t('home', 'heroSubtitleLine1')}
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-14 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title={t('home', 'howItWorks')} />
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-5">
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-sm font-bold text-primary mb-2">0{i + 1}</div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose GLOAT */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title={t('home', 'whyChoose')} />
          <div className="flex flex-wrap justify-center gap-6">
            {reasons.map((r, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm hover:shadow-md transition-shadow text-center w-full sm:w-72 lg:w-80"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <r.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">{r.title}</h3>
                <p className="text-muted-foreground text-sm">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Laundry Service */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {pt ? 'Serviço de Lavandaria' : 'Laundry Service'}
            </h2>
            <p className="text-muted-foreground text-lg text-center mb-5">
              {pt
                ? 'Entregue ou agende uma recolha — nós tratamos do resto. Na GLOAT, cada peça é lavada e tratada profissionalmente, depois devolvida dobrada ou passada a ferro, exatamente como prefere. Entrega rápida, qualidade consistente, e uma equipa que realmente se preocupa com a sua roupa. Seja para a lavagem semanal ou para uma limpeza pontual, estamos aqui para si.'
                : "Drop off or schedule a pickup — we handle the rest. At GLOAT, every item is washed and treated professionally, then returned folded or ironed, exactly how you like it. Fast turnaround, consistent quality, and a team that actually cares about your clothes. Whether it's your weekly wash or a one-off refresh, we've got you covered."}
            </p>
            <Link href={`/${language}/laundry-service`} className="text-primary font-semibold hover:underline block text-center">
              {pt ? 'Saber mais →' : 'Learn more →'}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Dry Cleaning */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {pt ? 'Lavagem a Seco' : 'Dry Cleaning'}
            </h2>
            <p className="text-muted-foreground text-lg text-center mb-5">
              {pt
                ? 'Algumas peças precisam de mais do que uma lavagem normal. Na GLOAT, fazemos lavagem a seco de fatos, vestidos, casacos e peças delicadas com o cuidado que merecem. Cada peça é inspecionada, tratada e devolvida impecável. Traga até nós ou agende uma recolha — nós tratamos do resto.'
                : 'Some clothes need more than a regular wash. At GLOAT, we dry clean suits, dresses, coats and delicate pieces with the care they deserve. Each garment is inspected, treated and returned looking sharp and feeling fresh. Bring it in or schedule a pickup — we take it from there.'}
            </p>
            <Link href={`/${language}/dry-cleaning`} className="text-primary font-semibold hover:underline block text-center">
              {pt ? 'Saber mais →' : 'Learn more →'}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Carpet Cleaning */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {pt ? 'Limpeza de Tapetes' : 'Carpet Cleaning'}
            </h2>
            <p className="text-muted-foreground text-lg text-center mb-5">
              {pt
                ? 'Os tapetes acumulam mais do que parece. Na GLOAT, fazemos limpeza profunda de tapetes e carpetes de todos os tamanhos, removendo sujidade e manchas que o aspirador não consegue eliminar. Traga até nós ou deixe-nos tratar da recolha — o seu tapete volta limpo e pronto a usar.'
                : 'Carpets collect more than you think. At GLOAT, we deep clean rugs and carpets of all sizes, removing dirt and stains that regular vacuuming leaves behind. Drop it off or let us handle the pickup — your carpet comes back fresh, clean and ready to use.'}
            </p>
            <Link href={`/${language}/carpet-cleaning`} className="text-primary font-semibold hover:underline block text-center">
              {pt ? 'Saber mais →' : 'Learn more →'}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Leather Cleaning */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {pt ? 'Limpeza de Cabedal' : 'Leather Cleaning'}
            </h2>
            <p className="text-muted-foreground text-lg text-center mb-5">
              {pt
                ? 'O cabedal precisa de cuidados especializados — o produto errado pode causar mais dano do que a própria mancha. Na GLOAT, limpamos e tratamos casacos, malas, sapatos e acessórios em cabedal com a atenção que merecem. Traga até nós ou agende uma recolha e nós tratamos do resto.'
                : "Leather needs specialist care — the wrong product can do more damage than the stain itself. At GLOAT, we clean and treat leather jackets, bags, shoes and accessories with the attention they require. Drop it off or schedule a pickup and we'll take it from there."}
            </p>
            <Link href={`/${language}/leather-cleaning`} className="text-primary font-semibold hover:underline block text-center">
              {pt ? 'Saber mais →' : 'Learn more →'}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Upholstery Cleaning */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {pt ? 'Limpeza de Estofos' : 'Upholstery Cleaning'}
            </h2>
            <p className="text-muted-foreground text-lg text-center mb-5">
              {pt
                ? 'Sofás e cadeiras acumulam muito uso diário — e nota-se. Na GLOAT, limpamos estofos e tecidos a fundo, removendo sujidade e manchas que se acumulam com o tempo. Traga até nós ou agende uma recolha — nós tratamos do resto e damos uma limpeza a sério aos seus estofos.'
                : "Sofas and chairs take a lot of daily use — and it shows. At GLOAT, we clean upholstered furniture and fabrics thoroughly, removing dirt and stains that build up over time. Bring it in or schedule a pickup — we'll handle the heavy lifting and give your furniture a proper refresh."}
            </p>
            <Link href={`/${language}/upholstery-cleaning`} className="text-primary font-semibold hover:underline block text-center">
              {pt ? 'Saber mais →' : 'Learn more →'}
            </Link>
          </motion.div>
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
            <p className="text-white/80 mb-8 text-lg">{t('home', 'ctaSubtitleHome')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full px-8 bg-white text-foreground hover:bg-white/90 font-semibold shadow-lg">
                <Link href={`/${language}/services`}>{t('home', 'viewServices')}</Link>
              </Button>
              <Button asChild size="lg" className="rounded-full px-8 bg-foreground/20 border-2 border-white text-white hover:bg-white/20 font-semibold backdrop-blur-sm">
                <Link href={`/${language}/booking`}>{t('home', 'bookPickup')}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Onde nos encontrar
          </h2>
          <div className="w-full rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3112.7743418909113!2d-9.156994023885145!3d38.72298957176183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd193366a73fe193%3A0xb1595037ca30056c!2sGLOAT%20-%20THE%20GREATEST%20LAUNDRY!5e0!3m2!1sen!2spt!4v1776787954618!5m2!1sen!2spt"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              title="GLOAT Lavandaria - Localização em Lisboa"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            {pt ? 'O que os nossos Clientes dizem' : 'What our customers are saying'}
          </h2>
          <div id="featurable-6be54eb1-348a-4aa6-a7a5-8e8a8f554ba3" data-featurable-async></div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
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

export default HomeContent;

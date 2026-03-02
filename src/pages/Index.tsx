import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionHeader } from '@/components/SectionHeader';

import { TestimonialsCarousel } from '@/components/TestimonialsCarousel';
import { Button } from '@/components/ui/button';
import { Zap, Award, Tag, ShieldCheck, Package, Sparkles, Truck } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' as const }
  })
};

const Index = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const goToPlans = () => {
    navigate('/precos');
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 0);
  };


  const steps = [
  { icon: Package, title: t('home', 'step1Title'), desc: t('home', 'step1Desc') },
  { icon: Sparkles, title: t('home', 'step2Title'), desc: t('home', 'step2Desc') },
  { icon: Truck, title: t('home', 'step3Title'), desc: t('home', 'step3Desc') }];


  const reasons = [
  { icon: Zap, title: t('home', 'speed'), desc: t('home', 'speedDesc') },
  { icon: Award, title: t('home', 'quality'), desc: t('home', 'qualityDesc') },
  { icon: ShieldCheck, title: t('home', 'reliable'), desc: t('home', 'reliableDesc') }];




  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-32 px-4">
        <div className="absolute inset-0 gradient-primary opacity-[0.03] my-0" />
        {/* Floating shapes */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 right-[15%] w-16 h-16 rounded-2xl bg-primary/10 hidden md:block" />

        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-32 left-[10%] w-12 h-12 rounded-full bg-accent/10 hidden md:block" />

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-40 left-[20%] w-8 h-8 rounded-lg bg-primary/5 hidden md:block" />


        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
            style={{ fontFamily: 'Plus Jakarta Sans' }}>

            {t('home', 'heroTitle')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">

            {t('home', 'heroSubtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">

            <Button size="lg" onClick={goToPlans} className="rounded-full px-8 text-base gradient-primary border-0 hover:opacity-90 transition-opacity">
              {t('home', 'viewPlans')}
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 text-base">
              <Link to="/servicos">{t('home', 'viewServices')}</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title={t('home', 'howItWorks')} />
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) =>
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center">

                <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-5">
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-sm font-bold text-primary mb-2">0{i + 1}</div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose GLOAT */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title={t('home', 'whyChoose')} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((r, i) =>
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm hover:shadow-md transition-shadow text-center">

                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <r.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">{r.title}</h3>
                <p className="text-muted-foreground text-sm">{r.desc}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsCarousel />

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="gradient-primary rounded-3xl p-10 md:p-16">

            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              {t('home', 'ctaTitle')}
            </h2>
            <p className="text-white/80 mb-8 text-lg">{t('home', 'ctaSubtitle')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={goToPlans} className="rounded-full px-8 bg-white text-foreground hover:bg-white/90 font-semibold shadow-lg">
                {t('home', 'viewPlans')}
              </Button>
              <Button asChild size="lg" className="rounded-full px-8 bg-foreground/20 border-2 border-white text-white hover:bg-white/20 font-semibold backdrop-blur-sm">
                <Link to="/contacto">{t('home', 'contactUs')}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>);

};

export default Index;
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function LeatherJacketContent() {
  const { language } = useLanguage();
  const pt = language === 'pt';

  const included = pt
    ? [
        'Limpeza completa do exterior do cabedal',
        'Tratamento de manchas e marcas',
        'Condicionamento para restaurar a maleabilidade',
      ]
    : [
        'Full clean of exterior leather',
        'Stain and mark treatment',
        'Conditioning to restore suppleness',
      ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.h1
          {...fadeUp}
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {pt ? 'Limpeza de Casacos de Cabedal em Lisboa' : 'Leather Jacket Cleaning in Lisboa'}
        </motion.h1>

        <motion.div {...fadeUp} className="mb-8 space-y-4">
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Um bom casaco de cabedal dura anos — mas só com os cuidados certos. Os invernos chuvosos e o calor do verão em Lisboa exigem muito do cabedal. Manchas de sal da chuva, óleos corporais do uso regular, riscos superficiais do uso diário — tudo isso acumula e afeta tanto o aspeto como o estado do cabedal.'
              : "A good leather jacket lasts for years — but only with the right care. Lisboa's rainy winters and summer heat put leather through a lot. Salt stains from rain, body oils from regular wear, surface scuffs from daily use — all of this builds up and affects both the look and the condition of the leather."}
          </p>
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Na GLOAT, limpamos e condicionamos casacos de cabedal para remover sujidade, manchas e desgaste superficial. O cabedal é tratado após a limpeza para restaurar a sua maleabilidade e mantê-lo em bom estado por mais tempo. O prazo é de até 10 dias.'
              : 'At GLOAT, we clean and condition leather jackets to remove dirt, stains, and surface wear. The leather is treated after cleaning to restore its suppleness and keep it in good condition for longer. Turnaround is up to 10 days.'}
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          <motion.div
            {...fadeUp}
            className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm"
          >
            <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {pt ? 'O que está incluído:' : "What's included:"}
            </h2>
            <ul className="space-y-2 list-none">
              {included.map((item, i) => (
                <li key={i} className="text-muted-foreground text-lg flex items-start gap-2">
                  <span className="text-primary mt-1 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm"
          >
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {pt ? 'Entrega ou recolha em Lisboa' : 'Drop off or pickup in Lisboa'}
            </h2>
            <p className="text-muted-foreground text-lg">
              {pt
                ? 'Traga à nossa loja junto às Amoreiras ou contacte-nos para agendar recolha.'
                : 'Bring to our store near Amoreiras or contact us to arrange collection.'}
            </p>
          </motion.div>
        </div>

        <motion.div {...fadeUp} className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href={`/${language}/booking`}>
              {pt ? 'Reservar Recolha' : 'Book a Pickup'}
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

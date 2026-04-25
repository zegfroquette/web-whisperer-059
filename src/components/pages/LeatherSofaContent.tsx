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

export default function LeatherSofaContent() {
  const { language } = useLanguage();
  const pt = language === 'pt';

  const included = pt
    ? [
        'Limpeza profunda de todas as superfícies de cabedal',
        'Remoção de sujidade e resíduos acumulados',
        'Condicionamento para proteger e manter o cabedal',
      ]
    : [
        'Deep clean of all leather surfaces',
        'Removal of built-up grime and residue',
        'Conditioning to protect and maintain the leather',
      ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.h1
          {...fadeUp}
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {pt ? 'Limpeza de Sofás de Cabedal em Lisboa' : 'Leather Sofa Cleaning in Lisboa'}
        </motion.h1>

        <motion.div {...fadeUp} className="mb-8 space-y-4">
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Um sofá de cabedal usado diariamente absorve mais do que a maioria das pessoas percebe. Óleos corporais, pó, resíduos de comida e o uso geral deixam uma camada de sujidade que se acumula gradualmente — muitas vezes invisível até limpar uma secção e comparar com o resto. Nos apartamentos de Lisboa, onde os sofás têm muito uso diário, isto acontece mais depressa do que se esperaria.'
              : "A leather sofa used daily absorbs more than most people realise. Body oils, dust, food residue, and general use leave a layer of grime that builds up gradually — often invisible until you clean one section and compare it to the rest. In Lisboa apartments, where sofas see a lot of daily life, this happens faster than you'd expect."}
          </p>
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Na GLOAT, fazemos uma limpeza profunda de sofás de cabedal, removendo resíduos acumulados e condicionando o cabedal para o manter suave e em bom estado. O prazo é de até 10 dias.'
              : 'At GLOAT, we deep clean leather sofas, removing built-up residue and conditioning the leather to keep it soft and in good condition. Turnaround is up to 10 days.'}
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
              {pt ? 'Recolha disponível por Lisboa' : 'Pickup available across Lisboa'}
            </h2>
            <p className="text-muted-foreground text-lg">
              {pt
                ? 'Recolhemos peças maiores de mobiliário de cabedal em casas por toda a Lisboa. Contacte-nos para agendar.'
                : 'We collect larger leather furniture pieces from homes across Lisboa. Contact us to arrange.'}
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

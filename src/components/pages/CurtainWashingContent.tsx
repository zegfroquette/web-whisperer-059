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

export default function CurtainWashingContent() {
  const { language } = useLanguage();
  const pt = language === 'pt';

  const items = pt
    ? [
        'Cortinas leves e de voile',
        'Cortinas forradas pesadas',
        'Cortinas blackout',
        'Painéis de voile',
        'Estilos com ilhós, pregas e argolas',
      ]
    : [
        'Lightweight and sheer curtains',
        'Heavy lined curtains',
        'Blackout curtains',
        'Voile panels',
        'Tab top, eyelet, and pinch pleat styles',
      ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.h1
          {...fadeUp}
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {pt ? 'Lavagem de Cortinas em Lisboa' : 'Curtain Washing in Lisboa'}
        </motion.h1>

        <motion.div {...fadeUp} className="mb-8 space-y-4">
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'As cortinas são fáceis de esquecer. Ficam no mesmo sítio, dia após dia, a acumular pó, fumo, cheiros de cozinha e tudo o mais que flutua por um apartamento em Lisboa. A maioria das pessoas só se apercebe quando finalmente as tira — e percebe quanto acumulou.'
              : 'Curtains are easy to forget about. They hang in the same place, day after day, quietly collecting dust, smoke, cooking smells, and everything else that floats through a Lisboa apartment. Most people only notice when they finally take them down — and realise how much has built up.'}
          </p>
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Na GLOAT, lavamos cortinas de todos os tamanhos, tecidos e estilos. Voile leve, cortinas forradas pesadas, painéis blackout — tratamos de tudo com cuidado, sem encolher nem deformar o tecido.'
              : 'At GLOAT, we wash curtains of all sizes, fabrics, and styles. Lightweight sheers, heavy lined curtains, blackout panels — we handle them all carefully, without shrinking or distorting the fabric.'}
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          <motion.div
            {...fadeUp}
            className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm"
          >
            <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {pt ? 'O que tratamos:' : 'What we handle:'}
            </h2>
            <ul className="space-y-2 list-none">
              {items.map((item, i) => (
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
              {pt ? 'Prazo' : 'Turnaround'}
            </h2>
            <p className="text-muted-foreground text-lg">
              {pt
                ? 'Contacte-nos para prazo dependendo do tamanho e material.'
                : 'Contact us for timing depending on size and material.'}
            </p>
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
                ? 'As cortinas são difíceis de transportar. Recolhemos em casas por toda a Lisboa — Campo de Ourique, Estrela, Chiado, Lapa e mais.'
                : "Curtains are awkward to transport. We collect from homes across Lisboa — Campo de Ourique, Estrela, Chiado, Lapa, and more."}
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

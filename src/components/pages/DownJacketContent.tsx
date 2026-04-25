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

export default function DownJacketContent() {
  const { language } = useLanguage();
  const pt = language === 'pt';

  const items = pt
    ? [
        'Casacos de penas de todas as marcas e estilos',
        'Casacos acolchoados com enchimento sintético',
        'Coletes e gilets de penas',
      ]
    : [
        'Down-fill jackets of all brands and styles',
        'Synthetic-fill puffer jackets',
        'Down gilets and vests',
      ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.h1
          {...fadeUp}
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {pt ? 'Limpeza de Casacos de Penas em Lisboa' : 'Down Jacket Cleaning in Lisboa'}
        </motion.h1>

        <motion.div {...fadeUp} className="mb-8 space-y-4">
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Os casacos de penas são um dos problemas de limpeza mais comuns que as pessoas nos trazem. São difíceis de lavar em casa — o enchimento encaroça, o casaco perde o volume e nunca recupera completamente. A limpeza profissional restaura o isolamento e mantém o casaco a funcionar como deve.'
              : "Down jackets are one of the most common cleaning problems people bring to us. They're tricky at home — the filling clumps, the jacket loses its loft, and it never quite recovers. Professional cleaning restores the insulation and keeps the jacket performing as it should."}
          </p>
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Na GLOAT, limpamos casacos de penas de forma cuidada e rigorosa. Após a limpeza, as penas são restauradas para que o casaco mantenha o calor e a forma. O prazo é de 5 a 7 dias.'
              : 'At GLOAT, we clean down jackets thoroughly and carefully. After cleaning, the down is restored so the jacket keeps its warmth and shape. Turnaround is 5 to 7 days.'}
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
              {pt ? 'Recolha disponível por Lisboa' : 'Pickup available across Lisboa'}
            </h2>
            <p className="text-muted-foreground text-lg">
              {pt
                ? 'Traga à nossa loja junto às Amoreiras ou agende uma recolha em sua casa.'
                : 'Drop off at our store near Amoreiras or schedule a pickup from your home.'}
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

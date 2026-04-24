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

export default function LeatherHandbagContent() {
  const { language } = useLanguage();
  const pt = language === 'pt';

  const items = pt
    ? [
        'Malas de cabedal do dia a dia',
        'Malas de designer e luxo',
        'Clutches e carteiras de cabedal',
        'Estilos estruturados e de cabedal mole',
      ]
    : [
        'Everyday leather handbags',
        'Designer and luxury bags',
        'Leather clutches and purses',
        'Structured and soft leather styles',
      ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.h1
          {...fadeUp}
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {pt ? 'Limpeza de Malas de Cabedal em Lisboa' : 'Leather Handbag Cleaning in Lisboa'}
        </motion.h1>

        <motion.div {...fadeUp} className="mb-8 space-y-4">
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Uma mala usa-se todos os dias. Vai a todo o lado — nos transportes públicos, a restaurantes, pelas calçadas de Lisboa e pelos seus montes acima. Com o tempo, as malas de cabedal desenvolvem marcas, manchas e desgaste que se acumula gradualmente. Uma limpeza adequada faz uma diferença visível.'
              : "A handbag gets used every day. It goes everywhere — on public transport, into restaurants, across Lisboa's cobblestones and up its hills. Over time, leather bags develop marks, stains, and wear that builds up gradually. A proper clean makes a visible difference."}
          </p>
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Na GLOAT, limpamos e tratamos malas de cabedal com cuidado. As marcas são removidas, a ferragem e as costuras são protegidas, e o cabedal é condicionado para restaurar o seu acabamento. O prazo é de até 10 dias.'
              : "At GLOAT, we clean and treat leather handbags carefully. Marks are removed, hardware and stitching are protected, and the leather is conditioned to restore its finish. Turnaround is up to 10 days."}
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
            <ul className="space-y-2">
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

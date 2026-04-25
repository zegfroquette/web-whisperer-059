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

export default function LeatherShoeContent() {
  const { language } = useLanguage();
  const pt = language === 'pt';

  const included = pt
    ? [
        'Limpeza completa do cabedal',
        'Tratamento de riscos e marcas',
        'Condicionamento para proteger o cabedal',
      ]
    : [
        'Full clean of leather uppers',
        'Scuff and mark treatment',
        'Conditioning to protect the leather',
      ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.h1
          {...fadeUp}
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {pt ? 'Limpeza de Sapatos de Cabedal em Lisboa' : 'Leather Shoe Cleaning in Lisboa'}
        </motion.h1>

        <motion.div {...fadeUp} className="mb-8 space-y-4">
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Lisboa é uma cidade de calçada. A calçada portuguesa é bonita — mas é dura para os sapatos de cabedal. Riscos, manchas de sal da chuva de inverno, pó das ruas no verão — os sapatos de cabedal em Lisboa sofrem muito no dia a dia. A limpeza e o condicionamento regulares mantêm-nos em muito melhor estado durante muito mais tempo.'
              : "Lisboa is a city of cobblestones. The calçada portuguesa is beautiful — but it's hard on leather shoes. Scuffs, salt marks from winter rain, dust from summer streets — leather shoes in Lisboa take a lot of daily punishment. Regular cleaning and conditioning keeps them in much better shape for much longer."}
          </p>
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Na GLOAT, limpamos sapatos de cabedal devidamente, removendo sujidade, riscos e marcas, e tratando o cabedal para o proteger do desgaste futuro. O prazo é de até 10 dias.'
              : 'At GLOAT, we clean leather shoes properly, removing dirt, scuffs, and marks, and treating the leather to protect it from future wear. Turnaround is up to 10 days.'}
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
              {pt ? 'Traga à nossa loja' : 'Drop off at our store'}
            </h2>
            <p className="text-muted-foreground text-lg">
              {pt
                ? 'Traga os seus sapatos à nossa loja junto às Amoreiras. Contacte-nos sobre opções de recolha para quantidades maiores.'
                : 'Bring your shoes to our store near Amoreiras. Contact us about pickup options for larger quantities.'}
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

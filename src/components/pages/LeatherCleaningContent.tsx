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

const services = [
  {
    enTitle: 'Leather Jacket Cleaning',
    ptTitle: 'Limpeza de Casacos de Cabedal',
    enText:
      "We clean and condition leather jackets to remove dirt, stains, and surface wear. The leather is treated to restore its suppleness and keep it looking its best for longer.",
    ptText:
      'Limpamos e condicionamos casacos de cabedal para remover sujidade, manchas e desgaste superficial. O cabedal é tratado para restaurar a sua maleabilidade e mantê-lo com o melhor aspeto por mais tempo.',
    enSlug: 'leather-jacket-cleaning-lisboa',
    ptSlug: 'limpeza-casaco-cabedal-lisboa',
  },
  {
    enTitle: 'Leather Handbag Cleaning',
    ptTitle: 'Limpeza de Malas de Cabedal',
    enText:
      "Handbags go everywhere and take daily wear. We clean and treat leather handbags carefully, removing marks and restoring the leather's finish without damaging hardware or stitching.",
    ptText:
      'As malas vão a todo o lado e sofrem um uso diário intenso. Limpamos e tratamos malas de cabedal com cuidado, removendo marcas e restaurando o acabamento do cabedal sem danificar ferragens ou costuras.',
    enSlug: 'leather-handbag-cleaning-lisboa',
    ptSlug: 'limpeza-mala-cabedal-lisboa',
  },
  {
    enTitle: 'Leather Sofa Cleaning',
    ptTitle: 'Limpeza de Sofás de Cabedal',
    enText:
      'A leather sofa used daily absorbs body oils, dust, and grime over time. We deep clean leather sofas, removing built-up residue and conditioning the leather to keep it soft and in good condition.',
    ptText:
      'Um sofá de cabedal usado diariamente absorve óleos corporais, pó e sujidade ao longo do tempo. Fazemos uma limpeza profunda de sofás de cabedal, removendo resíduos acumulados e condicionando o cabedal para o manter suave e em bom estado.',
    enSlug: 'leather-sofa-cleaning-lisboa',
    ptSlug: 'limpeza-sofa-cabedal-lisboa',
  },
  {
    enTitle: 'Leather Shoe Cleaning',
    ptTitle: 'Limpeza de Sapatos de Cabedal',
    enText:
      'We clean leather shoes properly, removing dirt and scuffs and treating the leather to protect it from future wear and damage.',
    ptText:
      'Limpamos sapatos de cabedal devidamente, removendo sujidade e riscos e tratando o cabedal para o proteger de desgaste futuro.',
    enSlug: 'leather-shoe-cleaning-lisboa',
    ptSlug: 'limpeza-sapatos-cabedal-lisboa',
  },
];

export default function LeatherCleaningContent() {
  const { language } = useLanguage();
  const pt = language === 'pt';

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.h1
          {...fadeUp}
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {pt ? 'Limpeza de Cabedal em Lisboa' : 'Leather Cleaning in Lisboa'}
        </motion.h1>

        <motion.div {...fadeUp} className="mb-10 space-y-4">
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'O cabedal é um daqueles materiais que ou envelhece lindamente ou deteriora — dependendo inteiramente de como é tratado. Em Lisboa, com as suas calçadas de pedra, o sol e a chuva ocasional intensa, os artigos de cabedal sofrem muito. Um casaco usado durante um inverno em Lisboa, uma mala carregada diariamente pela Baixa, sapatos de cabedal riscados na calçada portuguesa — todos precisam de atenção especializada a certa altura.'
              : "Leather is one of those materials that either ages beautifully or falls apart — depending entirely on how it's cared for. In Lisboa, with its cobblestone streets, sun, and occasional heavy rain, leather items take a beating. A jacket worn through a Lisbon winter, a bag carried daily through the Baixa, leather shoes scuffed on the calçada portuguesa — they all need proper attention at some point."}
          </p>
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Na GLOAT, limpamos e tratamos casacos, malas, sapatos e acessórios de cabedal com os cuidados que merecem. A limpeza de cabedal demora até 10 dias. Traga à nossa loja junto às Amoreiras ou agende uma recolha.'
              : 'At GLOAT, we clean and treat leather jackets, bags, shoes, and accessories with the care they require. Leather cleaning takes up to 10 days. Drop off at our store near Amoreiras or schedule a pickup.'}
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {services.map((s, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-md transition-shadow"
            >
              <h2
                className="text-xl font-bold mb-3"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {pt ? s.ptTitle : s.enTitle}
              </h2>
              <p className="text-muted-foreground text-lg mb-4">{pt ? s.ptText : s.enText}</p>
              <Link
                href={`/${language}/${pt ? s.ptSlug : s.enSlug}`}
                className="text-primary font-semibold hover:underline"
              >
                {pt ? 'Saber mais →' : 'Learn more →'}
              </Link>
            </motion.div>
          ))}
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

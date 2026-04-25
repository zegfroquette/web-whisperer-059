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

export default function DelicateFabricsContent() {
  const { language } = useLanguage();
  const pt = language === 'pt';

  const items = pt
    ? [
        'Blusas e vestidos de seda',
        'Malhas de lã e cashmere',
        'Peças de renda e lingerie',
        'Malhas finas e peças bordadas',
      ]
    : [
        'Silk blouses and dresses',
        'Wool and cashmere knitwear',
        'Lace garments and lingerie',
        'Fine knits and embroidered pieces',
      ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.h1
          {...fadeUp}
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {pt ? 'Lavagem de Tecidos Delicados em Lisboa' : 'Delicate Fabrics Washing in Lisboa'}
        </motion.h1>

        <motion.div {...fadeUp} className="mb-8 space-y-4">
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'As peças delicadas precisam de um cuidado diferente. Blusas de seda, camisolas de lã, peças de renda, malhas finas — estes tecidos não perdoam erros. Um programa de lavagem errado, água demasiado quente ou manuseamento brusco podem danificar permanentemente a textura, a forma ou a cor de uma peça que pode ter há anos.'
              : "Delicate garments need a different kind of attention. Silk blouses, wool jumpers, lace pieces, fine knitwear — these fabrics don't forgive mistakes. A wrong wash cycle, water that's too hot, or rough handling can permanently damage the texture, shape, or colour of a garment you might have had for years."}
          </p>
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Na GLOAT, tratamos seda, lã, renda e outros tecidos delicados com cuidados especializados. Cada peça é avaliada individualmente e limpa com o método certo para aquele tecido específico.'
              : 'At GLOAT, we handle silk, wool, lace, and other delicate fabrics with specialist care. Every piece is assessed individually and cleaned using the right method for that specific fabric.'}
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
                ? 'Contacte-nos para prazo dependendo da peça.'
                : 'Contact us for timing depending on the garment.'}
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm"
          >
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {pt ? 'Disponível por Lisboa' : 'Available across Lisboa'}
            </h2>
            <p className="text-muted-foreground text-lg">
              {pt
                ? 'Traga à nossa loja junto às Amoreiras ou agende uma recolha no Campo de Ourique, Estrela, Chiado, Lapa e zonas envolventes.'
                : 'Drop off at our store near Amoreiras or schedule a pickup from Campo de Ourique, Estrela, Chiado, Lapa, and surrounding areas.'}
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

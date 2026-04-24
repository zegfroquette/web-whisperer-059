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

export default function SilkCashmereContent() {
  const { language } = useLanguage();
  const pt = language === 'pt';

  const items = pt
    ? [
        'Blusas, vestidos e lenços de seda',
        'Camisolas e casacos de malha de cashmere',
        'Casacos e xailes de cashmere',
        'Peças mistas de seda e cashmere',
      ]
    : [
        'Silk blouses, dresses, and scarves',
        'Cashmere jumpers and cardigans',
        'Cashmere coats and wraps',
        'Mixed silk and cashmere garments',
      ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.h1
          {...fadeUp}
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {pt ? 'Lavagem a Seco de Seda e Cashmere em Lisboa' : 'Silk & Cashmere Dry Cleaning in Lisboa'}
        </motion.h1>

        <motion.div {...fadeUp} className="mb-8 space-y-4">
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'A seda e o cashmere são dois dos tecidos mais agradáveis de usar — e dois dos mais implacáveis de limpar. A seda perde o brilho com a lavagem errada. O cashmere encolhe, forma borboto ou perde a suavidade com cuidados inadequados. Não são peças para experimentar.'
              : "Silk and cashmere are two of the most rewarding fabrics to wear — and two of the most unforgiving to clean. Silk loses its sheen in the wrong wash. Cashmere shrinks, pills, or loses its softness with improper care. These aren't garments you can experiment with."}
          </p>
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Na GLOAT, fazemos lavagem a seco de peças de seda e cashmere com técnicas especializadas que protegem as suas propriedades naturais. Cada peça é avaliada e tratada individualmente. O prazo é de 5 a 7 dias.'
              : 'At GLOAT, we dry clean silk and cashmere garments using specialist techniques that protect their natural properties. Every piece is assessed and handled individually. Turnaround is 5 to 7 days.'}
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
              {pt ? 'Recolha disponível por Lisboa' : 'Pickup available across Lisboa'}
            </h2>
            <p className="text-muted-foreground text-lg">
              {pt
                ? 'Traga à nossa loja junto às Amoreiras ou agende uma recolha em sua casa por toda a Lisboa.'
                : 'Drop off at our store near Amoreiras or schedule a pickup from your home across Lisboa.'}
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

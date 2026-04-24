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

export default function DuvetCleaningContent() {
  const { language } = useLanguage();
  const pt = language === 'pt';

  const items = pt
    ? [
        'Edredões solteiro e casal',
        'Edredões king e super-king',
        'Edredões sintéticos e de penas',
        'Edredões de plumas',
      ]
    : [
        'Single and double duvets',
        'King and super-king comforters',
        'Synthetic and feather-fill duvets',
        'Down comforters',
      ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.h1
          {...fadeUp}
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {pt ? 'Limpeza de Edredões em Lisboa' : 'Duvet & Comforter Cleaning in Lisboa'}
        </motion.h1>

        <motion.div {...fadeUp} className="mb-8 space-y-4">
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Os edredões são das peças mais usadas em qualquer casa e das menos lavadas. A maioria das pessoas lava os lençóis com regularidade, mas o edredão em si? Muitas vezes passa meses — às vezes anos — sem uma limpeza a fundo. Nos invernos húmidos de Lisboa, um edredão que nunca foi devidamente lavado retém humidade, odores e pó que se acumulam ao longo do tempo.'
              : "Duvets are one of the most used items in any home and one of the least cleaned. Most people wash their sheets regularly but the duvet itself? That often goes months — sometimes years — without a proper clean. In Lisboa's damp winters, a duvet that hasn't been properly washed holds moisture, odours, and dust that build up over time."}
          </p>
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Na GLOAT, limpamos edredões de todos os tamanhos e materiais — solteiro, casal, king, sintético, pena ou plumas. Removemos sujidade e odores acumulados e devolvemos o seu edredão fresco e pronto.'
              : 'At GLOAT, we clean duvets and comforters of all sizes and materials — single, double, king, synthetic, feather, or down. We remove deep-seated dirt and odours and return your duvet fresh and ready.'}
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          <motion.div
            {...fadeUp}
            className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm"
          >
            <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {pt ? 'O que limpamos:' : 'What we clean:'}
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
              {pt ? 'Recolha e entrega disponíveis' : 'Pickup & delivery available'}
            </h2>
            <p className="text-muted-foreground text-lg">
              {pt
                ? 'Os edredões são volumosos. Recolhemos em casas por toda a Lisboa — Campo de Ourique, Estrela, Chiado, Lapa, Marquês de Pombal, Saldanha, Areeiro, Alvalade, Restelo, Bairro Alto, Baixa e mais — para não ter de os carregar até à loja.'
                : "Duvets are bulky. We collect from homes across Lisboa — Campo de Ourique, Estrela, Chiado, Lapa, Marquês de Pombal, Saldanha, Areeiro, Alvalade, Restelo, Bairro Alto, Baixa, and more — so you don't have to carry them to the store."}
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm"
          >
            <p className="text-muted-foreground text-lg">
              {pt
                ? 'Um edredão limpo faz uma diferença real na qualidade do sono. A maioria dos clientes que trazem um dizem que gostariam de o ter feito antes.'
                : 'A clean duvet makes a real difference to how you sleep. Most customers who bring one in say they wish they had done it sooner.'}
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

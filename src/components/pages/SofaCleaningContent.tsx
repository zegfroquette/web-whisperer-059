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

export default function SofaCleaningContent() {
  const { language } = useLanguage();
  const pt = language === 'pt';

  const items = pt
    ? [
        'Sofás de tecido e sectionals',
        'Canapés e sofás de dois lugares',
        'Sofás de canto',
        'Sofás-cama',
      ]
    : [
        'Fabric sofas and sectionals',
        'Upholstered couches and loveseats',
        'Corner sofas',
        'Pull-out sofa beds',
      ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.h1
          {...fadeUp}
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {pt ? 'Limpeza de Sofás em Lisboa' : 'Sofa & Couch Cleaning in Lisboa'}
        </motion.h1>

        <motion.div {...fadeUp} className="mb-8 space-y-4">
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Um sofá recebe mais uso diário do que quase qualquer outro móvel numa casa. Sentar, comer, dormir, crianças, animais de estimação — tudo se acumula. Os sofás de tecido absorvem odores, manchas e pó que se acumulam invisivelmente ao longo do tempo. Nos apartamentos de Lisboa, onde o espaço de vida é muitas vezes compacto e os sofás têm uso constante, uma limpeza profissional faz uma diferença real.'
              : 'A sofa takes more daily use than almost any other piece of furniture in a home. Sitting, eating, sleeping, children, pets — it all adds up. Fabric sofas absorb odours, stains, and dust that build up invisibly over time. In Lisboa apartments, where living space is often compact and sofas see constant use, a professional clean can make a meaningful difference.'}
          </p>
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Na GLOAT, fazemos uma limpeza profunda de sofás e estofos de tecido, removendo sujidade acumulada, manchas e odores. A diferença depois de uma limpeza a fundo costuma notar-se de imediato.'
              : 'At GLOAT, we deep clean fabric and upholstered sofas, removing built-up dirt, stains, and odours. The difference after a thorough clean is usually noticeable straight away.'}
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
                ? 'Recolhemos peças de mobiliário maiores em casas no Campo de Ourique, Estrela, Chiado, Lapa, Marquês de Pombal, Saldanha, Areeiro, Alvalade, Restelo, Bairro Alto, Baixa e mais. Contacte-nos para agendar.'
                : 'We collect larger furniture items from homes in Campo de Ourique, Estrela, Chiado, Lapa, Marquês de Pombal, Saldanha, Areeiro, Alvalade, Restelo, Bairro Alto, Baixa, and more. Contact us to arrange.'}
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

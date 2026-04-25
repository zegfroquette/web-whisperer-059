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

export default function SportsClothingContent() {
  const { language } = useLanguage();
  const pt = language === 'pt';

  const items = pt
    ? [
        'Roupa de corrida e ginásio',
        'Equipamentos de futebol e desporto coletivo',
        'Roupa de ciclismo',
        'Roupa de yoga e treino',
        'Meias desportivas e camisolas de base',
      ]
    : [
        'Running and gym clothes',
        'Football and team kit',
        'Cycling gear',
        'Yoga and training wear',
        'Sports socks and base layers',
      ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.h1
          {...fadeUp}
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {pt ? 'Lavagem de Roupa Desportiva em Lisboa' : 'Sports Clothing Washing in Lisboa'}
        </motion.h1>

        <motion.div {...fadeUp} className="mb-8 space-y-4">
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Os verões em Lisboa são quentes e longos. De junho a setembro, a cidade aquece e quem treina, corre ou pratica desporto gasta roupa desportiva a um ritmo acelerado. O suor e os odores acumulam-se rapidamente nos tecidos técnicos, e lavar roupa desportiva de forma errada — temperatura alta, programa errado, detergente inadequado — pode danificar as propriedades de desempenho do tecido.'
              : 'Lisboa summers are hot and long. From June through September, the city heats up and anyone who trains, runs, or plays sport goes through sportswear fast. Sweat and odour build up quickly in technical fabrics, and washing sportswear wrong — too hot, wrong cycle, wrong detergent — can damage the fabric\'s performance properties.'}
          </p>
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Na GLOAT, lavamos todo o tipo de roupa desportiva devidamente. Removemos suor, odores e manchas preservando as propriedades técnicas do tecido para que o seu equipamento se mantenha em bom estado.'
              : 'At GLOAT, we wash all types of sports clothing properly. We remove sweat, odour, and stains while preserving the technical properties of the fabric so your kit stays in good condition.'}
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
                ? '48 horas. Serviço expresso de 24 horas disponível.'
                : '48 hours. Express 24-hour service available.'}
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm"
          >
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {pt ? 'Recolha por Lisboa' : 'Pickup across Lisboa'}
            </h2>
            <p className="text-muted-foreground text-lg">
              {pt
                ? 'Recolhemos em casas no Campo de Ourique, Estrela, Chiado, Lapa, Marquês de Pombal, Saldanha, Areeiro, Alvalade, Restelo, Bairro Alto, Baixa e mais.'
                : 'We collect from homes in Campo de Ourique, Estrela, Chiado, Lapa, Marquês de Pombal, Saldanha, Areeiro, Alvalade, Restelo, Bairro Alto, Baixa, and more.'}
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

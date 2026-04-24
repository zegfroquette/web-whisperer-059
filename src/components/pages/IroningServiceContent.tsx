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

export default function IroningServiceContent() {
  const { language } = useLanguage();
  const pt = language === 'pt';

  const items = pt
    ? [
        'Camisas e blusas',
        'Calças e chinos',
        'Vestidos e saias',
        'Casacos e blazers',
        'Roupa de cama e têxteis para o lar',
      ]
    : [
        'Shirts and blouses',
        'Trousers and chinos',
        'Dresses and skirts',
        'Jackets and blazers',
        'Bedding and household linens',
      ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.h1
          {...fadeUp}
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {pt ? 'Serviço de Engomadoria em Lisboa' : 'Ironing Service in Lisboa'}
        </motion.h1>

        <motion.div {...fadeUp} className="mb-8 space-y-4">
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Passar a ferro é uma daquelas tarefas que quase toda a gente adia. Leva tempo, exige atenção, e uma pilha de roupa por passar tem uma forma de crescer mais depressa do que diminui. Para quem vive e trabalha em Lisboa, é muitas vezes a última coisa que alguém quer fazer depois de um dia longo.'
              : "Ironing is one of those tasks that almost everyone puts off. It takes time, it requires attention, and a pile of unironed clothes has a way of growing faster than it shrinks. For people living and working in Lisboa, it's often the last thing anyone wants to do after a long day."}
          </p>
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Na GLOAT, passamos camisas, calças, vestidos e o que mais precisar a um acabamento limpo e rigoroso. Deixe uma pilha e venha buscá-la como se tivesse saído de um acabamento profissional.'
              : 'At GLOAT, we iron shirts, trousers, dresses, and anything else in your wardrobe to a clean, sharp finish. Drop off a pile and collect it looking like it just came from a professional finisher.'}
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          <motion.div
            {...fadeUp}
            className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm"
          >
            <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {pt ? 'O que passamos a ferro:' : 'What we iron:'}
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

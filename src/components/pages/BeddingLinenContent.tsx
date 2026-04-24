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

export default function BeddingLinenContent() {
  const { language } = useLanguage();
  const pt = language === 'pt';

  const items = pt
    ? [
        'Lençóis de elástico e lençóis planos',
        'Fronhas',
        'Capas de edredão',
        'Protetores de colchão',
        'Toalhas de mesa de cabeceira e roupas de cama decorativas',
      ]
    : [
        'Fitted sheets and flat sheets',
        'Pillowcases',
        'Duvet covers',
        'Mattress protectors',
        'Bedside table runners and decorative linens',
      ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.h1
          {...fadeUp}
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {pt ? 'Lavagem de Roupa de Cama em Lisboa' : 'Bedding & Linen Washing in Lisboa'}
        </motion.h1>

        <motion.div {...fadeUp} className="mb-8 space-y-4">
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'A roupa de cama limpa importa mais do que a maioria das pessoas reconhece. Os lençóis absorvem suor, células de pele e pó todas as noites — e nos verões quentes de Lisboa, isso acontece mais depressa. Lavá-los regularmente à temperatura certa é uma das coisas mais simples que pode fazer para dormir melhor e ter uma casa mais saudável.'
              : "Clean bedding matters more than most people give it credit for. Sheets absorb sweat, skin cells, and dust every night — and in Lisboa's warm summers, that happens faster. Washing them regularly at the right temperature is one of the simplest things you can do for better sleep and a healthier home."}
          </p>
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Na GLOAT, lavamos todos os artigos de roupa de cama devidamente — lençóis, fronhas, capas de edredão e mais. Tudo é lavado à temperatura correta para o tecido, seco e devolvido fresco e suave.'
              : 'At GLOAT, we wash all bedroom linens properly — sheets, pillowcases, duvet covers, and more. Everything is washed at the correct temperature for the fabric, dried, and returned fresh and soft.'}
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
              {pt ? 'Prazo' : 'Turnaround'}
            </h2>
            <p className="text-muted-foreground text-lg">
              {pt
                ? '48 horas normal. Serviço expresso de 24 horas disponível.'
                : '48 hours standard. Express 24-hour service available.'}
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm"
          >
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {pt ? 'Recolha e entrega por Lisboa' : 'Pickup & delivery across Lisboa'}
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

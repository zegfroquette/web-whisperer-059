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

export default function BabyClothesContent() {
  const { language } = useLanguage();
  const pt = language === 'pt';

  const items = pt
    ? [
        'Macacões e pijamas de bebé',
        'Babetes e fraldas de pano',
        'Roupa de cama e cobertores de bebé',
        'Peças pequenas de todos os tipos',
      ]
    : [
        'Babygrows and sleep suits',
        'Bibs and muslins',
        'Baby bedding and blankets',
        'Small garments of all types',
      ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.h1
          {...fadeUp}
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {pt ? 'Lavagem de Roupa de Bebé em Lisboa' : 'Baby Clothes Washing in Lisboa'}
        </motion.h1>

        <motion.div {...fadeUp} className="mb-8 space-y-4">
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Ter um bebé significa muita roupa para lavar. Roupinhas pequenas, babetes, fraldas de pano, macacões — gastam-se depressa, e precisam de ser lavados devidamente. A pele dos bebés é sensível, por isso o método de lavagem importa. Temperatura errada, detergente inadequado ou enxaguamento deficiente podem deixar irritantes no tecido.'
              : 'Having a baby means a lot of laundry. Small clothes, bibs, muslins, sleep suits — they get through them fast, and they need to be washed properly. Baby skin is sensitive, so the washing method matters. Too hot, the wrong detergent, or poor rinsing can leave irritants on the fabric.'}
          </p>
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Na GLOAT, lavamos roupa e peças de bebé com métodos seguros e eficazes que removem manchas e bactérias, mantendo os tecidos delicados suaves e seguros para peles sensíveis.'
              : 'At GLOAT, we wash baby clothes and garments using safe, effective methods that remove stains and bacteria while keeping delicate fabrics soft and safe for sensitive skin.'}
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
                ? '48 horas. Serviço expresso de 24 horas disponível.'
                : '48 hours. Express 24-hour service available.'}
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

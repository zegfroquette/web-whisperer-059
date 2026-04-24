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

export default function CoatJacketContent() {
  const { language } = useLanguage();
  const pt = language === 'pt';

  const items = pt
    ? [
        'Sobretudos de lã e cashmere',
        'Gabardines',
        'Casacos de corte e blazers',
        'Casacos acolchoados e matelassê',
        'Impermeáveis e casacos técnicos',
      ]
    : [
        'Wool and cashmere overcoats',
        'Trench coats',
        'Tailored jackets and blazers',
        'Padded and quilted jackets',
        'Raincoats and technical outerwear',
      ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.h1
          {...fadeUp}
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {pt ? 'Lavagem a Seco de Casacos em Lisboa' : 'Coat & Jacket Dry Cleaning in Lisboa'}
        </motion.h1>

        <motion.div {...fadeUp} className="mb-8 space-y-4">
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Os casacos carregam uma estação inteira. Quando a primavera chega a Lisboa — normalmente por volta de março — um casaco de inverno já passou meses de uso diário, chuva e tudo o que a cidade traz. Lavar um casaco em casa arrisca encolhimento, perda de forma e danos no forro. A lavagem a seco é a forma certa de o fazer.'
              : 'Coats carry a full season. By the time spring arrives in Lisboa — usually around March — a winter coat has been through months of daily wear, rain, and everything the city throws at it. Washing a coat at home risks shrinkage, loss of shape, and damage to the lining. Dry cleaning is the right way to do it.'}
          </p>
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Na GLOAT, fazemos lavagem a seco de casacos e blusões de todos os estilos e tecidos — sobretudos de lã, gabardines, casacos de corte e mais. O prazo é de 5 a 7 dias.'
              : 'At GLOAT, we dry clean coats and jackets of all styles and fabrics — wool overcoats, trench coats, tailored jackets, and more. Turnaround is 5 to 7 days.'}
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

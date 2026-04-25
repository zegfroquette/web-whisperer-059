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

export default function EveningWearContent() {
  const { language } = useLanguage();
  const pt = language === 'pt';

  const items = pt
    ? [
        'Vestidos de baile e noite',
        'Vestidos de cocktail e ocasião',
        'Smokings e fatos formais',
        'Peças com adornos e missangas',
      ]
    : [
        'Ball gowns and evening dresses',
        'Cocktail and occasion dresses',
        'Tuxedos and formal suits',
        'Embellished and beaded garments',
      ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.h1
          {...fadeUp}
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {pt ? 'Limpeza de Roupa de Cerimónia em Lisboa' : 'Evening Wear & Formal Dress Cleaning in Lisboa'}
        </motion.h1>

        <motion.div {...fadeUp} className="mb-8 space-y-4">
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'A roupa de cerimónia não se usa com frequência — mas quando se usa, precisa de voltar com o aspeto certo. Vestidos de baile, cocktail, smokings e fatos formais ficam com as marcas da ocasião — maquilhagem, suor, comida e mais — e a lavagem normal não é adequada para a maioria destas peças.'
              : "Evening wear doesn't get worn often — but when it does, it needs to come back looking right. Ball gowns, cocktail dresses, tuxedos, and formal suits carry the marks of the occasion — makeup, sweat, food, and more — and standard washing isn't appropriate for most of these garments."}
          </p>
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Na GLOAT, limpamos e acabamos roupa de cerimónia e formalwear ao nível que merece. Cada peça é avaliada individualmente, as manchas são tratadas e os tecidos e adornos delicados são protegidos. O prazo é de 5 a 7 dias.'
              : 'At GLOAT, we clean and finish evening wear and formal dress to the standard it deserves. Every piece is assessed individually, stains are treated, and delicate fabrics and embellishments are protected. Turnaround is 5 to 7 days.'}
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
              {pt ? 'Entrega ou recolha em Lisboa' : 'Drop off or pickup in Lisboa'}
            </h2>
            <p className="text-muted-foreground text-lg">
              {pt
                ? 'Traga à nossa loja junto às Amoreiras ou contacte-nos para agendar recolha.'
                : 'Bring to our store near Amoreiras or contact us to arrange collection.'}
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

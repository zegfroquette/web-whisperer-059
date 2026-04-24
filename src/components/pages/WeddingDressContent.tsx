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

export default function WeddingDressContent() {
  const { language } = useLanguage();
  const pt = language === 'pt';

  const items = pt
    ? [
        'Todos os estilos e tecidos de vestidos de noiva',
        'Remoção de manchas — comida, vinho, maquilhagem, erva',
        'Limpeza suave para proteger adornos, missangas e renda',
        'Acabamento profissional',
      ]
    : [
        'All wedding dress styles and fabrics',
        'Stain removal — food, wine, makeup, grass',
        'Gentle cleaning to protect embellishments, beading, and lace',
        'Professional finishing',
      ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.h1
          {...fadeUp}
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {pt ? 'Lavagem a Seco de Vestidos de Noiva em Lisboa' : 'Wedding Dress Dry Cleaning in Lisboa'}
        </motion.h1>

        <motion.div {...fadeUp} className="mb-8 space-y-4">
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Um vestido de noiva é uma das peças mais importantes que alguma vez vai ter. Depois do dia, muitas vezes traz marcas — maquilhagem, comida, erva, vinho — e quanto mais tempo as manchas ficam, mais difícil é removê-las. Limpar e preservar um vestido de noiva exige manuseamento especializado.'
              : "A wedding dress is one of the most important garments you'll ever own. After the day, it often carries marks — makeup, food, grass, wine — and the longer those stains sit, the harder they are to remove. Cleaning and preserving a wedding dress needs specialist handling."}
          </p>
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Na GLOAT, tratamos os vestidos de noiva com os cuidados que merecem. Cada vestido é avaliado individualmente. As manchas são tratadas, os adornos e tecidos delicados são protegidos, e o vestido é devolvido limpo e acabado.'
              : 'At GLOAT, we treat wedding gowns with the care they require. Every dress is assessed individually. Stains are treated, delicate embellishments and fabric are protected, and the gown is returned cleaned and finished.'}
          </p>
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'O prazo é de 5 a 7 dias. Recomendamos trazer o vestido o mais cedo possível após o casamento para os melhores resultados.'
              : 'Turnaround is 5 to 7 days. We recommend bringing your dress in as soon as possible after the wedding for the best results.'}
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
              {pt ? 'Entrega ou recolha em Lisboa' : 'Drop off or pickup in Lisboa'}
            </h2>
            <p className="text-muted-foreground text-lg">
              {pt
                ? 'Traga o seu vestido à nossa loja junto às Amoreiras, ou contacte-nos para agendar uma recolha.'
                : 'Bring your dress to our store near Amoreiras, or contact us to arrange a pickup.'}
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

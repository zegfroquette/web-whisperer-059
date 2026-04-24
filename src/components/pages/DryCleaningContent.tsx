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

const services = [
  {
    enTitle: 'Suit Dry Cleaning',
    ptTitle: 'Lavagem a Seco de Fatos',
    enText:
      'A suit is an investment. It needs proper care to hold its shape, remove stains, and stay looking sharp over time. We dry clean all suit styles and fabrics — single or double-breasted, wool or linen — with the precision they require.',
    ptText:
      'Um fato é um investimento. Precisa de cuidados adequados para manter a forma, remover manchas e continuar impecável ao longo do tempo. Fazemos lavagem a seco de todos os estilos e tecidos de fatos — trespassado ou clássico, lã ou linho — com a precisão que merecem.',
    enSlug: 'suit-dry-cleaning-lisboa',
    ptSlug: 'lavagem-seco-fatos-lisboa',
  },
  {
    enTitle: 'Wedding Dress Dry Cleaning',
    ptTitle: 'Lavagem a Seco de Vestidos de Noiva',
    enText:
      "Your wedding dress is one of the most important garments you'll ever own. We clean and preserve wedding gowns with exceptional care, treating stains, protecting embellishments, and returning the dress in the condition it deserves.",
    ptText:
      'O seu vestido de noiva é uma das peças mais importantes que alguma vez vai ter. Limpamos e preservamos vestidos de noiva com cuidados excecionais, tratando manchas, protegendo adornos e devolvendo o vestido nas condições que merece.',
    enSlug: 'wedding-dress-dry-cleaning-lisboa',
    ptSlug: 'lavagem-seco-vestido-noiva-lisboa',
  },
  {
    enTitle: 'Coat & Jacket Dry Cleaning',
    ptTitle: 'Lavagem a Seco de Casacos e Blusões',
    enText:
      'Coats take a full season of wear. By spring, they need a proper clean before going back into storage. We dry clean coats and jackets of all styles and fabrics, restoring their appearance and extending their life.',
    ptText:
      'Os casacos acumulam uma estação inteira de uso. Na primavera, precisam de uma limpeza a fundo antes de voltarem ao armário. Fazemos lavagem a seco de casacos e blusões de todos os estilos e tecidos, restaurando o seu aspeto e prolongando a sua vida.',
    enSlug: 'coat-jacket-dry-cleaning-lisboa',
    ptSlug: 'lavagem-seco-casacos-lisboa',
  },
  {
    enTitle: 'Silk & Cashmere Dry Cleaning',
    ptTitle: 'Lavagem a Seco de Seda e Cashmere',
    enText:
      'Silk and cashmere are unforgiving — one wrong wash and they\'re ruined. We use specialist dry cleaning techniques that preserve their softness, colour, and structure so your luxury garments stay in excellent condition.',
    ptText:
      'A seda e o cashmere não perdoam — uma lavagem errada e estão arruinados. Usamos técnicas especializadas de lavagem a seco que preservam a suavidade, a cor e a estrutura para que as suas peças de luxo se mantenham em excelente estado.',
    enSlug: 'silk-cashmere-dry-cleaning-lisboa',
    ptSlug: 'lavagem-seco-seda-cashmere-lisboa',
  },
  {
    enTitle: 'Down Jacket Cleaning',
    ptTitle: 'Limpeza de Casacos de Penas',
    enText:
      "Down jackets are tricky to clean at home — the filling can clump and the jacket loses its loft and warmth. We clean them properly and restore their insulation so they're ready for the next cold season.",
    ptText:
      'Os casacos de penas são difíceis de lavar em casa — o enchimento pode encaroçar e o casaco perde o volume e o calor. Limpamo-los como deve ser e restauramos o isolamento para que estejam prontos para a próxima estação fria.',
    enSlug: 'down-jacket-cleaning-lisboa',
    ptSlug: 'limpeza-casacos-penas-lisboa',
  },
  {
    enTitle: 'Evening Wear & Formal Dress Cleaning',
    ptTitle: 'Limpeza de Roupa de Cerimónia e Formal',
    enText:
      'Ball gowns, cocktail dresses, and formal wear need specialist attention after an event. We clean and finish evening wear to the highest standard, ready for your next occasion.',
    ptText:
      'Vestidos de cerimónia, cocktail e roupa formal precisam de cuidados especializados depois de um evento. Limpamos e acabamos a roupa de cerimónia ao mais alto nível, pronta para a próxima ocasião.',
    enSlug: 'evening-wear-cleaning-lisboa',
    ptSlug: 'limpeza-roupa-cerimonia-lisboa',
  },
];

export default function DryCleaningContent() {
  const { language } = useLanguage();
  const pt = language === 'pt';

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.h1
          {...fadeUp}
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {pt ? 'Lavagem a Seco em Lisboa' : 'Dry Cleaning in Lisboa'}
        </motion.h1>

        <motion.div {...fadeUp} className="mb-10 space-y-4">
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Há peças que simplesmente não podem ir à máquina. Um fato que sai deformado, um vestido de noiva que perde a estrutura, uma camisola de cashmere que encolhe metade do tamanho — estes são erros que não têm volta. Em Lisboa, onde as pessoas se vestem bem e as ocasiões pedem roupa cuidada durante todo o ano, ter uma lavandaria de confiança faz toda a diferença.'
              : "Some clothes can't go in a washing machine. A suit that comes out misshapen, a wedding dress that loses its structure, a cashmere jumper that comes out half the size — these are the kinds of mistakes that can't be undone. In Lisboa, where people dress well and occasions call for sharp clothing year-round, having a reliable dry cleaner matters."}
          </p>
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Na GLOAT, fazemos lavagem a seco de fatos, vestidos, casacos e peças delicadas com técnicas especializadas que protegem o tecido, preservam a estrutura e devolvem a sua roupa com o aspeto certo. A lavagem a seco demora entre 5 a 7 dias. Traga à nossa loja junto às Amoreiras ou agende uma recolha.'
              : 'At GLOAT, we dry clean suits, dresses, coats, and delicate garments using specialist techniques that protect the fabric, preserve the structure, and return your clothing looking right. Dry cleaning takes between 5 and 7 days. Drop it off at our store near Amoreiras or schedule a pickup.'}
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {services.map((s, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-md transition-shadow"
            >
              <h2
                className="text-xl font-bold mb-3"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {pt ? s.ptTitle : s.enTitle}
              </h2>
              <p className="text-muted-foreground text-lg mb-4">{pt ? s.ptText : s.enText}</p>
              <Link
                href={`/${language}/${pt ? s.ptSlug : s.enSlug}`}
                className="text-primary font-semibold hover:underline"
              >
                {pt ? 'Saber mais →' : 'Learn more →'}
              </Link>
            </motion.div>
          ))}
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

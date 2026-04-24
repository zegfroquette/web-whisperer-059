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
    enTitle: 'Sofa & Couch Cleaning',
    ptTitle: 'Limpeza de Sofás e Canapés',
    enText:
      'We deep clean fabric and upholstered sofas, removing dirt, stains, and odours that build up with regular use. The difference after a proper clean is usually noticeable right away.',
    ptText:
      'Fazemos uma limpeza profunda de sofás e estofos de tecido, removendo sujidade, manchas e odores que se acumulam com o uso regular. A diferença depois de uma limpeza a fundo costuma notar-se de imediato.',
    enSlug: 'sofa-cleaning-lisboa',
    ptSlug: 'limpeza-sofas-lisboa',
  },
  {
    enTitle: 'Chair Upholstery Cleaning',
    ptTitle: 'Limpeza de Estofos de Cadeiras',
    enText:
      'From dining chairs to armchairs, we clean all types of upholstered seating carefully and thoroughly, leaving them fresh, stain-free, and looking their best.',
    ptText:
      'De cadeiras de jantar a poltronas, limpamos todo o tipo de assentos estofados com cuidado e rigor, deixando-os frescos, sem manchas e com o melhor aspeto.',
    enSlug: 'chair-upholstery-cleaning-lisboa',
    ptSlug: 'limpeza-cadeiras-estofadas-lisboa',
  },
  {
    enTitle: 'Mattress Cleaning',
    ptTitle: 'Limpeza de Colchões',
    enText:
      'A clean mattress matters more than most people think. We deep clean mattresses to remove dust, sweat, and stains, leaving them hygienic and fresh for better sleep.',
    ptText:
      'Um colchão limpo importa mais do que a maioria das pessoas pensa. Fazemos uma limpeza profunda de colchões para remover pó, suor e manchas, deixando-os higiénicos e frescos para um descanso melhor.',
    enSlug: 'mattress-cleaning-lisboa',
    ptSlug: 'limpeza-colchoes-lisboa',
  },
];

export default function UpholsteryCleaningContent() {
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
          {pt ? 'Limpeza de Estofos em Lisboa' : 'Upholstery Cleaning in Lisboa'}
        </motion.h1>

        <motion.div {...fadeUp} className="mb-10 space-y-4">
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Os estofos absorvem tudo o que acontece numa casa. Anos de uso diário, refeições, sono e simplesmente viver deixam marca — mesmo quando não se vê à primeira vista. Nos apartamentos mais antigos de Lisboa, sofás e cadeiras recebem um uso intenso e constante com pouco espaço para substituição. Uma limpeza profissional faz uma diferença visível e real.'
              : "Upholstered furniture absorbs everything that happens in a home. Years of sitting, eating, sleeping, and just living leave a mark — even when you can't immediately see it. In Lisboa's older apartments, sofas and chairs often get heavy daily use with limited space for replacement. A professional clean can make a visible, meaningful difference."}
          </p>
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Na GLOAT, limpamos estofos de sofás, cadeiras e colchões a fundo, removendo sujidade acumulada, manchas e odores. Traga peças mais pequenas à nossa loja junto às Amoreiras ou agende uma recolha para peças maiores.'
              : 'At GLOAT, we clean upholstered sofas, chairs, and mattresses thoroughly, removing built-up dirt, stains, and odours. Drop off smaller items at our store near Amoreiras or schedule a pickup for larger pieces.'}
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

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
    enTitle: 'Area Rug Cleaning',
    ptTitle: 'Limpeza de Tapetes de Área',
    enText:
      'We deep clean area rugs of all sizes, materials, and styles — wool, synthetic, hand-woven, or flatweave. We remove embedded dirt, stains, and built-up grime, restoring the colour and texture of your rug.',
    ptText:
      'Fazemos limpeza profunda de tapetes de área de todos os tamanhos, materiais e estilos — lã, sintético, tecido à mão ou de pelo raso. Removemos sujidade acumulada, manchas e detritos, restaurando a cor e a textura do seu tapete.',
    enSlug: 'area-rug-cleaning-lisboa',
    ptSlug: 'limpeza-tapetes-area-lisboa',
  },
  {
    enTitle: 'Carpet Stain Removal',
    ptTitle: 'Remoção de Manchas em Tapetes',
    enText:
      'Stains happen. Wine, coffee, grease, mud — we treat and remove all types of stubborn carpet stains with specialist products and techniques.',
    ptText:
      'As manchas acontecem. Vinho, café, gordura, lama — tratamos e removemos todo o tipo de manchas teimosas em tapetes com produtos e técnicas especializadas.',
    enSlug: 'carpet-stain-removal-lisboa',
    ptSlug: 'remocao-manchas-tapetes-lisboa',
  },
];

export default function CarpetCleaningContent() {
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
          {pt ? 'Limpeza de Tapetes em Lisboa' : 'Carpet Cleaning in Lisboa'}
        </motion.h1>

        <motion.div {...fadeUp} className="mb-10 space-y-4">
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Os apartamentos de Lisboa estão cheios de tapetes bonitos. De peças tradicionais tecidas à mão a tapetes modernos de área, cobrem os chãos de casas por todo o Chiado, Estrela, Campo de Ourique e outros bairros. Mas os tapetes acumulam tudo — pó, sujidade, comida, derrames — e um aspirador normal só chega até certo ponto. A certa altura, precisam de uma limpeza a fundo.'
              : 'Lisboa apartments are full of beautiful rugs. From traditional hand-woven pieces to modern area rugs, they cover floors in homes across Chiado, Estrela, Campo de Ourique, and beyond. But carpets and rugs collect everything — dust, dirt, food, spills — and a regular vacuum only gets so far. At some point, they need a proper clean.'}
          </p>
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Na GLOAT, fazemos limpeza profunda de tapetes e carpetes de todos os tamanhos e materiais. Traga à nossa loja junto às Amoreiras ou agende uma recolha e tratamos do trabalho pesado.'
              : 'At GLOAT, we deep clean rugs and carpets of all sizes and materials. Drop it off at our store near Amoreiras or schedule a pickup and we\'ll handle the heavy lifting.'}
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

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

export default function AreaRugContent() {
  const { language } = useLanguage();
  const pt = language === 'pt';

  const items = pt
    ? [
        'Tapetes de lã',
        'Tapetes sintéticos e de pelo raso',
        'Tapetes tecidos à mão e kilim',
        'Tapetes de área grandes e extra-grandes',
      ]
    : [
        'Wool rugs',
        'Synthetic and flatweave rugs',
        'Hand-woven and kilim rugs',
        'Large and oversized area rugs',
      ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.h1
          {...fadeUp}
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {pt ? 'Limpeza de Tapetes de Área em Lisboa' : 'Area Rug Cleaning in Lisboa'}
        </motion.h1>

        <motion.div {...fadeUp} className="mb-8 space-y-4">
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Os apartamentos de Lisboa são conhecidos pelos seus tapetes. De peças antigas tecidas à mão passadas de geração em geração a tapetes modernos trazidos de viagens, são uma das coisas mais pessoais de uma casa. São também uma das mais difíceis de limpar devidamente — demasiado grandes para a máquina de lavar, demasiado pesados para transportar quando molhados, e demasiado valiosos para arriscar com o método errado.'
              : "Lisboa apartments are known for their rugs. From antique hand-woven pieces passed down through families to modern rugs brought back from travels, they're one of the most personal things in a home. They're also one of the hardest to clean properly — too big for a washing machine, too heavy to carry when wet, and too valuable to risk with the wrong method."}
          </p>
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Na GLOAT, fazemos limpeza profunda de tapetes de área de todos os tamanhos, materiais e estilos. Removemos sujidade acumulada, manchas e detritos, restaurando a cor e a textura do seu tapete.'
              : 'At GLOAT, we deep clean area rugs of all sizes, materials, and styles. We remove embedded dirt, stains, and built-up grime, restoring the colour and texture of your rug.'}
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
                ? 'Os tapetes são pesados. Recolhemos em casas no Campo de Ourique, Estrela, Chiado, Lapa, Marquês de Pombal, Saldanha, Areeiro, Alvalade, Restelo, Bairro Alto, Baixa e mais.'
                : "Rugs are heavy. We collect from homes in Campo de Ourique, Estrela, Chiado, Lapa, Marquês de Pombal, Saldanha, Areeiro, Alvalade, Restelo, Bairro Alto, Baixa, and more."}
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

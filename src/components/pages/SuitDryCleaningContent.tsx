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

export default function SuitDryCleaningContent() {
  const { language } = useLanguage();
  const pt = language === 'pt';

  const included = pt
    ? [
        'Lavagem a seco completa do casaco e das calças',
        'Tratamento de manchas',
        'Acabamento e prensagem profissional',
      ]
    : [
        'Full dry clean of jacket and trousers',
        'Stain treatment',
        'Professional pressing and finishing',
      ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.h1
          {...fadeUp}
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {pt ? 'Lavagem a Seco de Fatos em Lisboa' : 'Suit Dry Cleaning in Lisboa'}
        </motion.h1>

        <motion.div {...fadeUp} className="mb-8 space-y-4">
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Um fato que não fica bem depois da limpeza, ou que perde a estrutura depois de uma lavagem em casa, é um problema frustrante — e caro. Os fatos são construídos com estrutura interna — entretela, enchimento e costuras cuidadas — que a água e o calor podem distorcer. A lavagem a seco preserva tudo isso.'
              : "A suit that doesn't fit right after cleaning, or loses its structure after a wash at home, is a frustrating — and expensive — problem. Suits are built with internal structure — canvas, padding, and careful stitching — that water and heat can distort. Dry cleaning preserves all of that."}
          </p>
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Em Lisboa, onde a formalidade é comum nas áreas de finanças, direito e negócios, manter um fato em bom estado importa. Seja um fato de uso diário no trabalho ou uma peça para ocasiões especiais, a lavagem a seco prolonga a sua vida e mantém-no com o aspeto certo.'
              : "In Lisboa, where formal dress is common in finance, law, and business, keeping a suit in proper shape matters. Whether it's a daily work suit or a piece worn for special occasions, dry cleaning extends its life and keeps it looking right."}
          </p>
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Na GLOAT, fazemos lavagem a seco de todos os estilos e tecidos de fatos — lã, linho, misturas de seda, simples ou trespassado. O prazo é de 5 a 7 dias. Traga à nossa loja junto às Amoreiras ou agende uma recolha.'
              : 'At GLOAT, we dry clean all suit styles and fabrics — wool, linen, silk blends, single or double-breasted. Turnaround is 5 to 7 days. Drop off at our store near Amoreiras or schedule a pickup.'}
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          <motion.div
            {...fadeUp}
            className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm"
          >
            <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {pt ? 'O que está incluído:' : "What's included:"}
            </h2>
            <ul className="space-y-2">
              {included.map((item, i) => (
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

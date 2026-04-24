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

export default function ShirtLaundryContent() {
  const { language } = useLanguage();
  const pt = language === 'pt';

  const included = pt
    ? [
        'Lavagem profissional à temperatura correta',
        'Tratamento de manchas quando necessário',
        'Acabamento profissional — passada a ferro e pronta a usar',
      ]
    : [
        'Professional wash at the correct temperature',
        'Stain treatment where needed',
        'Professional finish — ironed and ready to wear',
      ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.h1
          {...fadeUp}
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {pt ? 'Serviço de Lavagem de Camisas em Lisboa' : 'Shirt Laundry Service in Lisboa'}
        </motion.h1>

        <motion.div {...fadeUp} className="mb-8 space-y-4">
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Uma camisa amarrotada ou mal lavada nota-se pelas razões erradas. Para quem usa camisas regularmente — para o trabalho, reuniões ou no dia a dia em Lisboa — mantê-las impecáveis leva tempo e exige a técnica certa. A maioria das lavagens domésticas deixa as camisas a precisar de ser passadas a ferro, e passar camisas a ferro devidamente demora mais do que a maioria das pessoas quer gastar.'
              : "A crumpled or poorly washed shirt stands out for all the wrong reasons. For anyone who wears shirts regularly — for work, meetings, or day-to-day in Lisboa — keeping them looking sharp takes time and the right technique. Most home washing leaves shirts needing ironing, and ironing shirts properly takes longer than most people want to spend."}
          </p>
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Na GLOAT, lavamos e acabamos camisas com rigor profissional. As manchas são tratadas, os colarinhos ficam firmes e as camisas voltam prontas a usar de imediato.'
              : 'At GLOAT, we wash and finish shirts to a professional standard. Stains are treated, collars are crisp, and shirts come back ready to wear straight away.'}
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
              {pt ? 'Recolha por Lisboa' : 'Pickup across Lisboa'}
            </h2>
            <p className="text-muted-foreground text-lg">
              {pt
                ? 'Recolhemos camisas e roupa em casas por todo o Campo de Ourique, Estrela, Chiado, Lapa, Marquês de Pombal, Saldanha, Areeiro, Alvalade, Restelo, Bairro Alto, Baixa e mais.'
                : 'We collect shirts and clothing from homes across Campo de Ourique, Estrela, Chiado, Lapa, Marquês de Pombal, Saldanha, Areeiro, Alvalade, Restelo, Bairro Alto, Baixa, and more.'}
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

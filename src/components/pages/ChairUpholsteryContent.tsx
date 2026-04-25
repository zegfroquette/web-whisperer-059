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

export default function ChairUpholsteryContent() {
  const { language } = useLanguage();
  const pt = language === 'pt';

  const items = pt
    ? [
        'Cadeiras de jantar com assento e costas estofadas',
        'Poltronas e cadeiras de leitura',
        'Cadeiras de escritório com estofos de tecido',
        'Cadeiras decorativas e de acento',
      ]
    : [
        'Dining chairs with upholstered seats and backs',
        'Armchairs and reading chairs',
        'Office chairs with fabric upholstery',
        'Accent and occasional chairs',
      ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.h1
          {...fadeUp}
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {pt ? 'Limpeza de Estofos de Cadeiras em Lisboa' : 'Chair Upholstery Cleaning in Lisboa'}
        </motion.h1>

        <motion.div {...fadeUp} className="mb-8 space-y-4">
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'As cadeiras estofadas usam-se todos os dias e limpam-se raramente. Cadeiras de jantar, poltronas e cadeiras decorativas absorvem uso ao longo do tempo — resíduos de comida, pó, óleos da pele e desgaste geral. Quando o tecido parece visivelmente sujo, já se acumulou muito antes.'
              : 'Upholstered chairs get used daily and cleaned rarely. Dining chairs, armchairs, and accent chairs all absorb use over time — food residue, dust, skin oils, and general wear. By the time the fabric looks visibly dirty, a significant amount has already built up.'}
          </p>
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Na GLOAT, limpamos todo o tipo de assentos estofados com cuidado e rigor. Tudo volta com um aspeto mais fresco e mais limpo, sem qualquer risco para o tecido ou a estrutura.'
              : 'At GLOAT, we clean all types of upholstered seating carefully and thoroughly. Everything comes back looking fresher and cleaner, without any risk to the fabric or structure.'}
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
              {pt ? 'Recolha disponível por Lisboa' : 'Pickup available across Lisboa'}
            </h2>
            <p className="text-muted-foreground text-lg">
              {pt
                ? 'Recolhemos em casas no Campo de Ourique, Estrela, Chiado, Lapa, Marquês de Pombal e zonas envolventes. Contacte-nos para agendar.'
                : 'We collect from homes in Campo de Ourique, Estrela, Chiado, Lapa, Marquês de Pombal, and surrounding areas. Contact us to arrange.'}
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

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

export default function ExpressLaundryContent() {
  const { language } = useLanguage();
  const pt = language === 'pt';

  const howItWorks = pt
    ? [
        'Traga ou agende uma recolha expresso',
        'Lavamos, secamos e dobramos tudo em 24 horas',
        'Venha buscar à loja ou peça entrega na sua porta',
      ]
    : [
        'Drop off or schedule an express pickup',
        'We wash, dry, and fold everything within 24 hours',
        'Collect in-store or request delivery back to your door',
      ];

  const availableFor = pt
    ? ['Lavagem e dobra', 'Camisas e roupa do dia a dia', 'Roupa de cama e lençóis']
    : ['Wash & fold', 'Shirts and everyday clothing', 'Bedding and linens'];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.h1
          {...fadeUp}
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {pt ? 'Serviço de Lavandaria Expresso em Lisboa' : 'Express Laundry Service in Lisboa'}
        </motion.h1>

        <motion.div {...fadeUp} className="mb-8 space-y-4">
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Às vezes precisa da roupa de volta a tempo. Uma viagem de última hora, uma reunião importante, um guarda-roupa que ficou sem opções — seja qual for o motivo, o nosso serviço de lavandaria expresso em Lisboa devolve-lhe a roupa lavada, seca e pronta em 24 horas.'
              : 'Sometimes you need your laundry back fast. A last-minute trip, an important meeting, a wardrobe that ran out of options — whatever the reason, our express laundry service in Lisboa gets your clothes washed, dried, and ready within 24 hours.'}
          </p>
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Na GLOAT, o nosso serviço expresso funciona da mesma forma que o serviço normal — a mesma lavagem profissional, o mesmo cuidado — só mais rápido. Traga à nossa loja junto às Amoreiras ou contacte-nos pelo WhatsApp para agendar uma recolha expresso.'
              : 'At GLOAT, our express service works the same way as our standard service — same professional wash, same care — just faster. Drop off at our store near Amoreiras or contact us via WhatsApp to arrange an express pickup.'}
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          <motion.div
            {...fadeUp}
            className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm"
          >
            <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {pt ? 'Como funciona:' : 'How it works:'}
            </h2>
            <ul className="space-y-2 list-none">
              {howItWorks.map((item, i) => (
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
            <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {pt ? 'Disponível para:' : 'Available for:'}
            </h2>
            <ul className="space-y-2 list-none">
              {availableFor.map((item, i) => (
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
              {pt ? 'Nota' : 'Note'}
            </h2>
            <p className="text-muted-foreground text-lg">
              {pt
                ? 'A disponibilidade do serviço expresso depende do volume. Contacte-nos pelo WhatsApp para confirmar antes de trazer a roupa.'
                : 'Express service availability depends on volume. Contact us via WhatsApp to confirm before dropping off.'}
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm"
          >
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {pt ? 'Disponível por Lisboa' : 'Available across Lisboa'}
            </h2>
            <p className="text-muted-foreground text-lg">
              {pt
                ? 'Recolha expresso disponível no Campo de Ourique, Estrela, Chiado, Lapa, Marquês de Pombal, Saldanha, Areeiro, Alvalade, Restelo, Bairro Alto, Baixa e mais.'
                : 'Express pickup available in Campo de Ourique, Estrela, Chiado, Lapa, Marquês de Pombal, Saldanha, Areeiro, Alvalade, Restelo, Bairro Alto, Baixa, and more.'}
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

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

export default function PickupDeliveryContent() {
  const { language } = useLanguage();
  const pt = language === 'pt';

  const howItWorks = pt
    ? [
        'Agende uma recolha pelo WhatsApp ou telefone',
        'Recolhemos na sua porta à hora combinada',
        'A sua roupa é lavada, seca e dobrada',
        'Entregamos de volta na sua porta em 48 horas',
      ]
    : [
        'Schedule a pickup via WhatsApp or phone',
        'We collect from your door at the agreed time',
        'Your laundry is cleaned, dried, and folded',
        'We deliver it back to your door within 48 hours',
      ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.h1
          {...fadeUp}
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {pt ? 'Recolha e Entrega de Roupa em Lisboa' : 'Laundry Pickup & Delivery in Lisboa'}
        </motion.h1>

        <motion.div {...fadeUp} className="mb-8 space-y-4">
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Nem toda a gente tem tempo para ir a uma lavandaria. Entre o trabalho, a família e tudo o mais, ir à loja é mais uma coisa numa lista que já está demasiado longa. O nosso serviço de recolha e entrega tira isso completamente da lista.'
              : "Not everyone has time to visit a laundry. Between work, family, and everything else, getting to the store is one more thing on a list that's already too long. Our pickup and delivery service takes that off the list entirely."}
          </p>
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Na GLOAT, recolhemos a sua roupa na sua porta, lavamo-la profissionalmente e entregamo-la de volta dobrada e fresca — tudo sem precisar de sair de casa. Cobrimos uma vasta área de Lisboa.'
              : 'At GLOAT, we collect your laundry from your door, clean it professionally, and deliver it back folded and fresh — all without you having to leave home. We cover a wide area across Lisboa.'}
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
            <ul className="space-y-2">
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
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {pt ? 'Zonas que cobrimos:' : 'Areas we cover:'}
            </h2>
            <p className="text-muted-foreground text-lg">
              {pt
                ? 'Campo de Ourique, Estrela, Chiado, Lapa, Marquês de Pombal, Saldanha, Areeiro, Alvalade, Restelo, Bairro Alto, Baixa e bairros envolventes por toda a Lisboa.'
                : 'Campo de Ourique, Estrela, Chiado, Lapa, Marquês de Pombal, Saldanha, Areeiro, Alvalade, Restelo, Bairro Alto, Baixa, and surrounding neighbourhoods across Lisboa.'}
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm"
          >
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {pt ? 'Quem usa este serviço?' : 'Who uses this service?'}
            </h2>
            <p className="text-muted-foreground text-lg">
              {pt
                ? 'Profissionais a trabalhar sem tempo livre, famílias a gerir múltiplos horários, pessoas com limitações de mobilidade e qualquer pessoa que simplesmente quer a roupa tratada sem ter de ir a lado nenhum.'
                : 'Working professionals with no time to spare, families managing multiple schedules, people with mobility limitations, and anyone who simply wants their laundry handled without having to go anywhere.'}
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

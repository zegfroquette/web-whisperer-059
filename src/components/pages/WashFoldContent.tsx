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

export default function WashFoldContent() {
  const { language } = useLanguage();
  const pt = language === 'pt';

  const included = pt
    ? [
        'Lavagem à temperatura correta para cada tipo de tecido',
        'Secagem',
        'Dobra cuidada, pronta a arrumar diretamente no roupeiro',
        'Engomadoria disponível a pedido',
      ]
    : [
        'Washing at the correct temperature for each fabric type',
        'Drying',
        'Neat folding, ready to put straight into the wardrobe',
        'Optional ironing available on request',
      ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.h1
          {...fadeUp}
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {pt ? 'Lavagem e Dobra em Lisboa' : 'Wash & Fold in Lisboa'}
        </motion.h1>

        <motion.div {...fadeUp} className="mb-8 space-y-4">
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'A maioria das casas em Lisboa não tem secador. Durante os meses húmidos de outono e inverno — de outubro a fevereiro — ter roupa pendurada pelo apartamento a secar torna-se um problema real. O espaço acaba rapidamente, a roupa demora uma eternidade a secar e a pilha não para de crescer. Um serviço de lavagem e dobra é a forma mais simples de resolver isso.'
              : "Most homes in Lisboa don't have a tumble dryer. During the wet autumn and winter months — October through February — hanging clothes around the apartment to dry becomes a real problem. Space runs out fast, drying takes forever, and the pile just keeps growing. A wash and fold service is the simplest way to fix that."}
          </p>
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Na GLOAT, tratamos da sua roupa do início ao fim. Traga-a à nossa loja junto às Amoreiras, ou agende uma recolha e vamos buscá-la a sua casa. Lavamos tudo à temperatura certa, secamos devidamente, dobramos com cuidado e devolvemos em 48 horas.'
              : 'At GLOAT, we take care of your laundry from start to finish. You drop it off at our store near Amoreiras, or schedule a pickup and we collect from your door. We wash everything at the right temperature, dry it properly, fold it neatly, and have it back to you within 48 hours.'}
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
              {pt ? 'Quanto tempo demora?' : 'How long does it take?'}
            </h2>
            <p className="text-muted-foreground text-lg">
              {pt
                ? 'O prazo normal é de 48 horas. Precisa antes? O nosso serviço expresso devolve-lhe a roupa em 24 horas.'
                : 'Standard turnaround is 48 hours. Need it sooner? Our express service returns your laundry within 24 hours.'}
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm"
          >
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {pt ? 'Recolha e entrega disponíveis' : 'Pickup & delivery available'}
            </h2>
            <p className="text-muted-foreground text-lg">
              {pt
                ? 'Recolhemos em casas e apartamentos por toda a Lisboa — Campo de Ourique, Estrela, Chiado, Lapa, Marquês de Pombal, Saldanha, Areeiro, Alvalade, Restelo, Bairro Alto, Baixa e mais.'
                : 'We collect from homes and apartments across Lisboa — Campo de Ourique, Estrela, Chiado, Lapa, Marquês de Pombal, Saldanha, Areeiro, Alvalade, Restelo, Bairro Alto, Baixa, and more.'}
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
                ? 'Profissionais ocupados, famílias com crianças pequenas, pessoas sem secador em casa e qualquer pessoa que prefira passar o seu tempo noutras coisas que não a roupa. É um dos serviços mais pedidos na GLOAT, e o feedback dos clientes em Lisboa é sempre o mesmo — depois de experimentar, não se volta atrás.'
                : "Busy professionals, families with young children, people without a dryer at home, and anyone who'd rather spend their time on something other than laundry. It's one of the most common things we do at GLOAT, and the feedback from customers in Lisboa is always the same — once you try it, you don't go back."}
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

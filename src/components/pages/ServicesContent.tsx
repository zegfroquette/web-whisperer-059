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

const categories = [
  {
    enTitle: 'Laundry Service',
    ptTitle: 'Serviço de Lavandaria',
    enText:
      'Your everyday washing, handled professionally. We offer wash & fold, shirt cleaning, ironing, express service, bedding, baby clothes, sports clothing, delicate fabrics, curtains, duvets, and door-to-door pickup and delivery across Lisboa.',
    ptText:
      'A sua lavagem do dia a dia, tratada profissionalmente. Oferecemos lavagem e dobra, lavagem de camisas, engomadoria, serviço expresso, roupa de cama, roupa de bebé, roupa desportiva, tecidos delicados, cortinas, edredões e recolha e entrega porta a porta por toda a Lisboa.',
    enLinkText: 'See all laundry services →',
    ptLinkText: 'Ver todos os serviços de lavandaria →',
    enSlug: 'laundry-service',
    ptSlug: 'servico-lavandaria',
  },
  {
    enTitle: 'Dry Cleaning',
    ptTitle: 'Lavagem a Seco',
    enText:
      'For garments that need specialist care. Suits, wedding dresses, coats, silk, cashmere, down jackets, and formal wear — all cleaned properly and returned in the condition they deserve. Turnaround 5 to 7 days.',
    ptText:
      'Para peças que precisam de cuidados especializados. Fatos, vestidos de noiva, casacos, seda, cashmere, casacos de penas e roupa de cerimónia — tudo limpo devidamente e devolvido nas condições que merece. Prazo de 5 a 7 dias.',
    enLinkText: 'See all dry cleaning services →',
    ptLinkText: 'Ver todos os serviços de lavagem a seco →',
    enSlug: 'dry-cleaning',
    ptSlug: 'lavagem-a-seco-lisboa',
  },
  {
    enTitle: 'Carpet Cleaning',
    ptTitle: 'Limpeza de Tapetes',
    enText:
      'Deep cleaning for area rugs of all sizes and materials. We collect from your home — no need to transport them yourself.',
    ptText:
      'Limpeza profunda de tapetes de área de todos os tamanhos e materiais. Recolhemos em sua casa — não precisa de os transportar.',
    enLinkText: 'See all carpet cleaning services →',
    ptLinkText: 'Ver todos os serviços de limpeza de tapetes →',
    enSlug: 'carpet-cleaning',
    ptSlug: 'limpeza-tapetes-lisboa',
  },
  {
    enTitle: 'Leather Cleaning',
    ptTitle: 'Limpeza de Cabedal',
    enText:
      'Jackets, handbags, sofas, and shoes — we clean and condition all types of leather items with specialist techniques. Turnaround up to 10 days.',
    ptText:
      'Casacos, malas, sofás e sapatos — limpamos e condicionamos todo o tipo de artigos de cabedal com técnicas especializadas. Prazo até 10 dias.',
    enLinkText: 'See all leather cleaning services →',
    ptLinkText: 'Ver todos os serviços de limpeza de cabedal →',
    enSlug: 'leather-cleaning',
    ptSlug: 'limpeza-cabedal-lisboa',
  },
  {
    enTitle: 'Upholstery Cleaning',
    ptTitle: 'Limpeza de Estofos',
    enText:
      'Sofas, chairs, and mattresses cleaned thoroughly and carefully. We remove built-up dirt, stains, and odours from all types of upholstered furniture.',
    ptText:
      'Sofás, cadeiras e colchões limpos com cuidado e rigor. Removemos sujidade acumulada, manchas e odores de todo o tipo de móveis estofados.',
    enLinkText: 'See all upholstery cleaning services →',
    ptLinkText: 'Ver todos os serviços de limpeza de estofos →',
    enSlug: 'upholstery-cleaning',
    ptSlug: 'limpeza-estofos-lisboa',
  },
];

export default function ServicesContent() {
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
          {pt ? 'Serviços de Lavandaria em Lisboa' : 'Laundry Services in Lisboa'}
        </motion.h1>

        <motion.div {...fadeUp} className="mb-10 space-y-4">
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Viver em Lisboa significa gerir a roupa sem o luxo que a maioria das pessoas noutras cidades tem — a maioria das casas aqui não tem secador, os edifícios são verticais e a vida move-se a um ritmo acelerado. Na GLOAT, construímos uma lavandaria de serviço completo no coração da cidade para tratar de tudo.'
              : "Living in Lisboa means managing laundry without the luxury most people in other cities take for granted — most homes here don't have a tumble dryer, buildings are vertical, and life moves fast. At GLOAT, we've built a full-service laundry in the heart of the city to take care of everything."}
          </p>
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Abaixo encontra todos os serviços que oferecemos, organizados por categoria. Clique para saber mais sobre qualquer serviço específico.'
              : "Below you'll find every service we offer, organised by category. Click through to learn more about any specific service."}
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-md transition-shadow"
            >
              <h2
                className="text-xl font-bold mb-3"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {pt ? cat.ptTitle : cat.enTitle}
              </h2>
              <p className="text-muted-foreground text-lg mb-4">
                {pt ? cat.ptText : cat.enText}
              </p>
              <Link
                href={`/${language}/${pt ? cat.ptSlug : cat.enSlug}`}
                className="text-primary font-semibold hover:underline"
              >
                {pt ? cat.ptLinkText : cat.enLinkText}
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

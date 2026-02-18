import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionHeader } from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Pricing = () => {
  const { t, language } = useLanguage();
  const pt = language === 'pt';

  // ─── Subscription Plans ──────────────────────────────────────────────────────
  const plans = [
    {
      name: pt ? 'Plano Lite' : 'Lite Plan',
      price: '65,00€',
      period: pt ? '4 semanas' : '4 weeks',
      highlight: false,
      desc: pt ? '4 bolsas STANDARD de roupa lavada e dobrada' : '4 STANDARD bags of washed & folded clothes',
      benefits: pt
        ? ['Bolsa STANDARD (~5-6 kg)', 'Lavagem profissional', 'Roupa dobrada e pronta a guardar', 'Entrega em 48h']
        : ['STANDARD bag (~5-6 kg)', 'Professional wash', 'Neatly folded & ready to store', 'Delivery in 48h'],
    },
    {
      name: pt ? 'Plano Max' : 'Max Plan',
      price: '85,00€',
      period: pt ? '4 semanas' : '4 weeks',
      highlight: true,
      desc: pt ? '4 bolsas GRANDE de roupa lavada e dobrada' : '4 LARGE bags of washed & folded clothes',
      benefits: pt
        ? ['Bolsa GRANDE (~8-10 kg)', 'Lavagem profissional', 'Roupa dobrada e pronta a guardar', 'Entrega em 48h', 'Melhor valor por kg']
        : ['LARGE bag (~8-10 kg)', 'Professional wash', 'Neatly folded & ready to store', 'Delivery in 48h', 'Best value per kg'],
    },
    {
      name: pt ? 'Plano Engomadoria' : 'Ironing Plan',
      price: '60,00€',
      period: pt ? '4 semanas' : '4 weeks',
      highlight: false,
      desc: pt ? '24 peças apenas engomadas' : '24 pieces ironed only',
      benefits: pt
        ? ['24 peças por mês', 'Engomadoria profissional', 'Camisas, calças, vestidos', 'Entregue em cabides']
        : ['24 pieces per month', 'Professional ironing', 'Shirts, trousers, dresses', 'Delivered on hangers'],
    },
    {
      name: pt ? 'Plano Lavar e Engomar' : 'Wash & Iron Plan',
      price: '80,00€',
      period: pt ? '4 semanas' : '4 weeks',
      highlight: false,
      desc: pt ? '24 peças lavadas e engomadas' : '24 pieces washed & ironed',
      benefits: pt
        ? ['24 peças por mês', 'Lavagem + engomadoria', 'Serviço completo', 'Entregue em cabides']
        : ['24 pieces per month', 'Wash + ironing', 'Full service', 'Delivered on hangers'],
    },
  ];

  // ─── Individual / One-off Pricing ────────────────────────────────────────────
  const categories = pt ? [
    {
      id: 'lavar-dobrar',
      title: '🧺 Lavar & Dobrar',
      subtitle: 'Roupa lavada com produtos profissionais e cuidadosamente dobrada, pronta a guardar.',
      note: undefined,
      items: [
        { label: 'Bolsa STANDARD (~5-6 kg) — com subscrição', price: '14,90€' },
        { label: 'Bolsa STANDARD (~5-6 kg) — sem subscrição', price: '18,00€' },
        { label: 'Bolsa GRANDE (~8-10 kg) — com subscrição', price: '19,90€' },
        { label: 'Bolsa GRANDE (~8-10 kg) — sem subscrição', price: '24,00€' },
      ],
    },
    {
      id: 'lavar-engomar',
      title: '👔 Lavar & Engomar',
      subtitle: 'Peças lavadas e engomadas — prontas a vestir.',
      note: undefined,
      items: [
        { label: '1 peça — com subscrição', price: '2,90€' },
        { label: '1 peça — sem subscrição', price: '3,90€' },
        { label: '1 peça — lavagem à mão', price: '8,50€' },
        { label: 'Pack 5 camisas (de uma vez)', price: '16,00€' },
      ],
    },
    {
      id: 'engomar-apenas',
      title: '🌬️ Engomar Apenas',
      subtitle: 'Já lavou em casa? Tratamos da engomadoria.',
      note: 'Packs válidos por 30 dias. Camisas/blusas contam como 2 peças; capas de edredão como 3 peças.',
      items: [
        { label: 'Pack 5 camisas', price: '10,50€' },
        { label: 'Pack 12 peças', price: '28,00€' },
        { label: 'Pack 50 peças (1 mês)', price: '80,00€' },
        { label: '1 peça — com subscrição', price: '2,00€' },
        { label: '1 peça — sem subscrição', price: '2,50€' },
        { label: 'Capa edredão casal', price: '5,90€' },
        { label: 'Capa edredão solteiro', price: '4,80€' },
      ],
    },
    {
      id: 'limpeza-seco',
      title: '✨ Limpeza a Seco',
      subtitle: 'Tratamento especializado para peças delicadas, fatos e artigos especiais.',
      note: undefined,
      items: [
        { label: 'Camisa / Blusa', price: '7,90€' },
        { label: 'Camisa / Blusa de Seda', price: '8,90€' },
        { label: 'Gravata', price: '7,90€' },
        { label: 'Calças / Saia', price: 'a partir de 11,00€' },
        { label: 'Camisola / Pullover', price: 'a partir de 11,60€' },
        { label: 'Blazer', price: 'a partir de 16,00€' },
        { label: 'Blusão', price: 'a partir de 17,90€' },
        { label: 'Casaco / Sobretudo', price: '21,90€' },
        { label: 'Fato (2 peças)', price: 'a partir de 20,90€' },
        { label: 'Vestido Simples', price: 'a partir de 14,40€' },
        { label: 'Vestido Seda/Linho Curto', price: '20,30€' },
        { label: 'Vestido de Festa (Seda/Linho comprido)', price: 'a partir de 22,40€' },
        { label: 'Ténis de Tecido ou Sintético', price: '23,00€' },
      ],
    },
    {
      id: 'casa',
      title: '🛏️ Artigos de Casa',
      subtitle: 'Edredões, cobertores, cortinas e artigos de grande dimensão.',
      note: undefined,
      items: [
        { label: 'Edredão Solteiro', price: '22,40€' },
        { label: 'Edredão Solteiro de Penas/Acolchoado', price: '28,00€' },
        { label: 'Edredão Casal', price: '28,60€' },
        { label: 'Edredão Casal de Penas/Acolchoado', price: '33,60€' },
        { label: 'Capa Edredão Solteiro', price: '11,40€' },
        { label: 'Capa Edredão Casal', price: '12,60€' },
        { label: 'Colcha Simples Solteiro', price: 'a partir de 15,90€' },
        { label: 'Resguardo Simples Solteiro', price: '10,30€' },
        { label: 'Almofada / Travesseiro Sintético', price: '12,90€' },
        { label: 'Cortina', price: '17,90€/m' },
        { label: 'Tapete', price: '17,90€/m²' },
        { label: 'Toalha de Mesa', price: '13,90€/m²' },
      ],
    },
  ] : [
    {
      id: 'wash-fold',
      title: '🧺 Wash & Fold',
      subtitle: 'Clothes washed with professional products, neatly folded and ready to store.',
      note: undefined,
      items: [
        { label: 'STANDARD bag (~5-6 kg) — with subscription', price: '€14.90' },
        { label: 'STANDARD bag (~5-6 kg) — without subscription', price: '€18.00' },
        { label: 'LARGE bag (~8-10 kg) — with subscription', price: '€19.90' },
        { label: 'LARGE bag (~8-10 kg) — without subscription', price: '€24.00' },
      ],
    },
    {
      id: 'wash-iron',
      title: '👔 Wash & Iron',
      subtitle: 'Washed and ironed — ready to wear.',
      note: undefined,
      items: [
        { label: '1 item — with subscription', price: '€2.90' },
        { label: '1 item — without subscription', price: '€3.90' },
        { label: '1 item — hand wash', price: '€8.50' },
        { label: 'Pack 5 shirts (at once)', price: '€16.00' },
      ],
    },
    {
      id: 'iron-only',
      title: '🌬️ Iron Only',
      subtitle: 'Already washed at home? We take care of the ironing.',
      note: 'Packs valid for 30 days. Shirts/blouses count as 2 items; duvet covers count as 3 items.',
      items: [
        { label: 'Pack 5 shirts', price: '€10.50' },
        { label: 'Pack 12 items', price: '€28.00' },
        { label: 'Pack 50 items (1 month)', price: '€80.00' },
        { label: '1 item — with subscription', price: '€2.00' },
        { label: '1 item — without subscription', price: '€2.50' },
        { label: 'Double duvet cover', price: '€5.90' },
        { label: 'Single duvet cover', price: '€4.80' },
      ],
    },
    {
      id: 'dry-cleaning',
      title: '✨ Dry Cleaning',
      subtitle: 'Specialized treatment for delicate fabrics, suits and special garments.',
      note: undefined,
      items: [
        { label: 'Shirt / Blouse', price: '€7.90' },
        { label: 'Silk Shirt / Blouse', price: '€8.90' },
        { label: 'Tie', price: '€7.90' },
        { label: 'Pants / Skirt', price: 'From €11.00' },
        { label: 'Sweater / Pullover', price: 'From €11.60' },
        { label: 'Blazer', price: 'From €16.00' },
        { label: 'Jacket', price: 'From €17.90' },
        { label: 'Coat / Overcoat', price: '€21.90' },
        { label: 'Suit (2 pieces)', price: 'From €20.90' },
        { label: 'Simple Dress', price: 'From €14.40' },
        { label: 'Short Silk / Linen Dress', price: '€20.30' },
        { label: 'Long Silk / Linen Evening Dress', price: 'From €22.40' },
        { label: 'Fabric or Synthetic Sneakers', price: '€23.00' },
      ],
    },
    {
      id: 'household',
      title: '🛏️ Household Items',
      subtitle: 'Duvets, blankets, curtains and large household items.',
      note: undefined,
      items: [
        { label: 'Single Duvet', price: '€22.40' },
        { label: 'Feather/Quilted Single Duvet', price: '€28.00' },
        { label: 'Double Duvet', price: '€28.60' },
        { label: 'Feather/Quilted Double Duvet', price: '€33.60' },
        { label: 'Single Duvet Cover', price: '€11.40' },
        { label: 'Double Duvet Cover', price: '€12.60' },
        { label: 'Simple Single Bedspread', price: 'From €15.90' },
        { label: 'Simple Single Mattress Protector', price: '€10.30' },
        { label: 'Synthetic Pillow', price: '€12.90' },
        { label: 'Curtain', price: '€17.90/m' },
        { label: 'Rug', price: '€17.90/m²' },
        { label: 'Tablecloth', price: '€13.90/m²' },
      ],
    },
  ];

  const faqs = [
    { q: t('pricing', 'faqDeliveryQ'), a: t('pricing', 'faqDeliveryA') },
    { q: t('pricing', 'faqBagQ'), a: t('pricing', 'faqBagA') },
    { q: t('pricing', 'faqPaymentQ'), a: t('pricing', 'faqPaymentA') },
    { q: t('pricing', 'faqHoursQ'), a: t('pricing', 'faqHoursA') },
  ];

  return (
    <>
      {/* ── Section 1: Monthly Subscriptions ── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title={pt ? 'Subscrições Mensais' : 'Monthly Subscriptions'}
            subtitle={pt
              ? 'Escolha o plano que melhor se adapta ao seu dia-a-dia e poupe todos os meses.'
              : 'Choose the plan that best fits your routine and save every month.'}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className={`relative flex flex-col rounded-2xl p-6 border transition-shadow ${
                  plan.highlight
                    ? 'border-primary shadow-lg shadow-primary/10 bg-card'
                    : 'border-border/50 bg-card shadow-sm hover:shadow-md'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 gradient-primary rounded-full text-white text-xs font-bold whitespace-nowrap">
                    {pt ? 'Melhor Valor' : 'Best Value'}
                  </div>
                )}

                <div className="mb-5">
                  <h3 className="text-base font-bold mb-3 text-foreground">{plan.name}</h3>
                  <div className="text-3xl font-extrabold text-gradient leading-none">{plan.price}</div>
                  <p className="text-xs text-muted-foreground mt-1">/ {plan.period}</p>
                  <p className="text-sm text-muted-foreground mt-3 leading-snug">{plan.desc}</p>
                </div>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.benefits.map((b, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={`w-full rounded-full mt-auto ${
                    plan.highlight ? 'gradient-primary border-0 text-white hover:opacity-90' : ''
                  }`}
                  variant={plan.highlight ? 'default' : 'outline'}
                >
                  <Link to="/contacto">{pt ? 'Escolher Plano' : 'Choose Plan'}</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="border-t border-border/50" />
      </div>

      {/* ── Section 2: Individual Pricing ── */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            title={pt ? 'Serviços Individuais' : 'Individual Services'}
            subtitle={pt
              ? 'Preços unitários e packs para serviços pontuais. Expanda cada categoria para ver os detalhes.'
              : 'Per-item prices and packs for one-off services. Expand each category to see details.'}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {categories.map((cat) => (
                <AccordionItem
                  key={cat.id}
                  value={cat.id}
                  className="bg-card rounded-2xl border border-border/50 px-6 shadow-sm"
                >
                  <AccordionTrigger className="text-left py-5 hover:no-underline">
                    <div>
                      <div className="font-semibold text-base text-foreground">{cat.title}</div>
                      {cat.subtitle && (
                        <div className="text-xs text-muted-foreground mt-0.5 font-normal">{cat.subtitle}</div>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    {cat.note && (
                      <p className="text-xs text-muted-foreground mb-4 italic bg-muted/40 rounded-lg px-3 py-2">{cat.note}</p>
                    )}
                    <div className="space-y-1">
                      {cat.items.map((item, idx) => {
                        const withSub = item.label.includes('com subscrição') || item.label.includes('with subscription');
                        const withoutSub = item.label.includes('sem subscrição') || item.label.includes('without subscription');
                        return (
                          <div
                            key={idx}
                            className={`flex items-center justify-between gap-4 py-2.5 border-b border-border/30 last:border-0 ${withSub ? 'bg-accent/5 -mx-2 px-2 rounded-lg' : ''}`}
                          >
                            <span className={`text-sm ${withSub ? 'text-foreground font-medium' : withoutSub ? 'text-foreground/70' : 'text-foreground/80'}`}>
                              {item.label}
                            </span>
                            <span className={`text-sm font-semibold shrink-0 ${withSub ? 'text-accent' : 'text-foreground'}`}>{item.price}</span>
                          </div>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          <p className="text-xs text-muted-foreground text-center mt-6">
            {pt
              ? '* Os preços apresentados são valores de base e podem variar consoante o estado da peça.'
              : '* Prices shown are base values and may vary depending on the condition of the item.'}
          </p>
        </div>
      </section>

      {/* ── Section 3: FAQs ── */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">{t('pricing', 'faq')}</h3>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card rounded-xl border border-border/50 px-6"
              >
                <AccordionTrigger className="text-left font-medium">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
};

export default Pricing;

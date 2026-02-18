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
      id: 'engomadoria',
      title: 'Engomadoria',
      items: [
        { label: 'Peça lavada e engomada — com subscrição', price: '2,90€' },
        { label: 'Peça lavada e engomada — sem subscrição', price: '3,90€' },
        { label: 'Peça lavada e engomada — lavagem à mão', price: '8,50€' },
        { label: '5 camisas lavadas e engomadas (de uma vez)', price: '16,00€' },
        { label: 'Peça apenas engomada — com subscrição', price: '2,00€' },
        { label: 'Peça apenas engomada — sem subscrição', price: '2,50€' },
        { label: 'Capa edredão casal (engomar)', price: '5,90€' },
        { label: 'Capa edredão solteiro (engomar)', price: '4,80€' },
      ],
    },
    {
      id: 'packs-engomadoria',
      title: 'Packs Engomadoria',
      note: pt ? 'Packs válidos por 30 dias. Camisas/blusas contam como 2 peças; capas de edredão como 3 peças.' : '',
      items: [
        { label: '5 camisas (de uma vez)', price: '10,50€' },
        { label: '12 peças (de uma vez)', price: '28,00€' },
        { label: '50 peças (1 mês)', price: '80,00€' },
      ],
    },
    {
      id: 'limpeza-seco',
      title: 'Limpeza a Seco',
      items: [
        { label: 'Blazer', price: 'a partir de 16,00€' },
        { label: 'Blusão', price: 'a partir de 17,90€' },
        { label: 'Calças / Saia', price: 'a partir de 11,00€' },
        { label: 'Camisa / Blusa', price: '7,90€' },
        { label: 'Camisa / Blusa de Seda', price: '8,90€' },
        { label: 'Camisola / Pullover', price: 'a partir de 11,60€' },
        { label: 'Casaco / Sobretudo', price: '21,90€' },
        { label: 'Fato (2 peças)', price: 'a partir de 20,90€' },
        { label: 'Gravata', price: '7,90€' },
        { label: 'Ténis de Tecido ou Sintético', price: '23,00€' },
        { label: 'Vestido Simples', price: 'a partir de 14,40€' },
        { label: 'Vestido Seda/Linho Curto', price: '20,30€' },
        { label: 'Vestido de Festa (Seda/Linho comprido)', price: 'a partir de 22,40€' },
      ],
    },
    {
      id: 'casa',
      title: 'Artigos de Casa',
      items: [
        { label: 'Colcha Simples Solteiro', price: 'a partir de 15,90€' },
        { label: 'Cortina', price: '17,90€/m' },
        { label: 'Edredão Solteiro', price: '22,40€' },
        { label: 'Edredão Solteiro de Penas/Acolchoado', price: '28,00€' },
        { label: 'Edredão Casal', price: '28,60€' },
        { label: 'Edredão Casal de Penas/Acolchoado', price: '33,60€' },
        { label: 'Capa Edredão Solteiro', price: '11,40€' },
        { label: 'Capa Edredão Casal', price: '12,60€' },
        { label: 'Resguardo Simples Solteiro', price: '10,30€' },
        { label: 'Almofada / Travesseiro Sintético', price: '12,90€' },
        { label: 'Tapete', price: '17,90€/m²' },
        { label: 'Toalha de Mesa', price: '13,90€/m²' },
      ],
    },
  ] : [
    {
      id: 'ironing',
      title: 'Ironing',
      items: [
        { label: 'Washed & ironed item — with subscription', price: '2,90€' },
        { label: 'Washed & ironed item — without subscription', price: '3,90€' },
        { label: 'Washed & ironed item — hand wash', price: '8,50€' },
        { label: '5 shirts washed & ironed (at once)', price: '16,00€' },
        { label: 'Ironing only — with subscription', price: '2,00€' },
        { label: 'Ironing only — without subscription', price: '2,50€' },
        { label: 'Double duvet cover (ironing)', price: '5,90€' },
        { label: 'Single duvet cover (ironing)', price: '4,80€' },
      ],
    },
    {
      id: 'ironing-packs',
      title: 'Ironing Packs',
      note: 'Packs valid for 30 days. Shirts/blouses count as 2 items; duvet covers count as 3 items.',
      items: [
        { label: '5 shirts (at once)', price: '10,50€' },
        { label: '12 items (at once)', price: '28,00€' },
        { label: '50 items (1 month)', price: '80,00€' },
      ],
    },
    {
      id: 'dry-cleaning',
      title: 'Dry Cleaning',
      items: [
        { label: 'Blazer', price: 'From €16.00' },
        { label: 'Jacket', price: 'From €17.90' },
        { label: 'Pants / Skirt', price: 'From €11.00' },
        { label: 'Shirt / Blouse', price: '€7.90' },
        { label: 'Silk Shirt / Blouse', price: '€8.90' },
        { label: 'Sweater / Pullover', price: 'From €11.60' },
        { label: 'Coat / Overcoat', price: '€21.90' },
        { label: 'Suit (2 pieces)', price: 'From €20.90' },
        { label: 'Tie', price: '€7.90' },
        { label: 'Fabric or Synthetic Sneakers', price: '€23.00' },
        { label: 'Simple Dress', price: 'From €14.40' },
        { label: 'Short Silk / Linen Dress', price: '€20.30' },
        { label: 'Long Silk / Linen Evening Dress', price: 'From €22.40' },
      ],
    },
    {
      id: 'household',
      title: 'Household Items',
      items: [
        { label: 'Simple Single Bedspread', price: 'From €15.90' },
        { label: 'Curtain', price: '€17.90/m' },
        { label: 'Single Duvet', price: '€22.40' },
        { label: 'Feather/Quilted Single Duvet', price: '€28.00' },
        { label: 'Double Duvet', price: '€28.60' },
        { label: 'Feather/Quilted Double Duvet', price: '€33.60' },
        { label: 'Single Duvet Cover', price: '€11.40' },
        { label: 'Double Duvet Cover', price: '€12.60' },
        { label: 'Simple Single Mattress Protector', price: '€10.30' },
        { label: 'Synthetic Pillow', price: '€12.90' },
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
                  <AccordionTrigger className="text-left font-semibold text-base py-5">
                    {cat.title}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    {cat.note && (
                      <p className="text-xs text-muted-foreground mb-4 italic">{cat.note}</p>
                    )}
                    <div className="space-y-2">
                      {cat.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between gap-4 py-2 border-b border-border/30 last:border-0"
                        >
                          <span className="text-sm text-foreground/80">{item.label}</span>
                          <span className="text-sm font-semibold text-foreground shrink-0">{item.price}</span>
                        </div>
                      ))}
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

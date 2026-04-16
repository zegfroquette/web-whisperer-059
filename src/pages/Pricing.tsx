import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
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
      desc: pt ? '4 bolsas STANDARD (aprox. 5kg) de roupa do dia-a-dia lavada e dobrada' : '4 STANDARD bags (approx. 5kg) of washed & folded everyday clothes',
      benefits: pt
        ? ['4 Bolsas STANDARD (aprox. 5kg) por mês', '1 recolha e entrega semanal', 'Lavagem profissional', 'Roupa dobrada e pronta a guardar', 'Entrega em 48h']
        : ['4 STANDARD bags (approx. 5kg) per month', '1 weekly pickup and delivery', 'Professional wash', 'Neatly folded & ready to store', 'Delivery in 48h'],
    },
    {
      name: pt ? 'Plano Max' : 'Max Plan',
      price: '85,00€',
      period: pt ? '4 semanas' : '4 weeks',
      highlight: false,
      desc: pt ? '4 bolsas GRANDE (aprox. 10kg) de roupa do dia-a-dia lavada e dobrada' : '4 MAX bags (approx. 10kg) of washed & folded everyday clothes',
      benefits: pt
        ? ['4 Bolsas GRANDE (aprox. 10kg) por mês', '1 recolha e entrega semanal', 'Lavagem profissional', 'Roupa dobrada e pronta a guardar', 'Entrega em 48h']
        : ['4 MAX bags (approx. 10kg) per month', '1 weekly pickup and delivery', 'Professional wash', 'Neatly folded & ready to store', 'Delivery in 48h'],
    },
    {
      name: pt ? 'Plano Engomadoria' : 'Ironing Plan',
      price: '60,00€',
      period: pt ? '4 semanas' : '4 weeks',
      highlight: false,
      desc: pt ? '24 peças apenas engomadas' : '24 pieces ironed only',
      benefits: pt
        ? ['24 peças por mês', '1 recolha e entrega semanal', 'Engomadoria profissional', 'Entregue em cabides', 'Entregue em 48 horas']
        : ['24 pieces per month', '1 weekly pickup and delivery', 'Professional ironing', 'Delivered on hangers', 'Delivered in 48 hours'],
    },
    {
      name: pt ? 'Plano Lavar e Engomar' : 'Wash & Iron Plan',
      price: '80,00€',
      period: pt ? '4 semanas' : '4 weeks',
      highlight: false,
      desc: pt ? '24 peças lavadas e engomadas' : '24 pieces washed & ironed',
      benefits: pt
        ? ['24 peças por mês', '1 recolha e entrega semanal', 'Lavagem + engomadoria', 'Serviço completo', 'Entregue em cabides', 'Entregue em 48 horas']
        : ['24 pieces per month', '1 weekly pickup and delivery', 'Wash + ironing', 'Full service', 'Delivered on hangers', 'Delivered in 48 hours'],
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
          { label: 'Bolsa STANDARD (aprox. 5kg) — com plano', price: '15,00€' },
          { label: 'Bolsa STANDARD (aprox. 5kg) — sem plano', price: '19,00€' },
          { label: 'Bolsa GRANDE (aprox. 10kg) — com plano', price: '20,00€' },
          { label: 'Bolsa GRANDE (aprox. 10kg) — sem plano', price: '26,00€' },
        ],
    },
    {
      id: 'lavar-engomar',
      title: '👔 Lavar & Engomar',
      subtitle: 'Peças lavadas e engomadas — prontas a vestir.',
      note: undefined,
        items: [
          { label: '1 peça — com plano', price: '2,90€' },
          { label: '1 peça — sem plano', price: '3,90€' },
          { label: '1 peça — lavagem à mão', price: '8,50€' },
          { label: 'Pack 5 camisas (de uma vez)', price: '16,00€' },
        ],
    },
    {
      id: 'engomar-apenas',
      title: '🌬️ Engomar Apenas',
      subtitle: 'Já lavou em casa? Tratamos da engomadoria.',
      note: 'Packs válidos por 30 dias. Camisas/blusas contam como 2 peças; capas de edredon como 3 peças.',
      items: [
          { label: 'Pack 50 peças (1 mês)', price: '80,00€' },
          { label: '5 camisas (de uma vez)', price: '10,50€' },
          { label: '12 peças (de uma vez)', price: '28,00€' },
          { label: '1 peça — com plano', price: '2,00€' },
          { label: '1 peça — sem plano', price: '2,50€' },
        { label: 'Capa edredon casal', price: '5,90€' },
        { label: 'Capa edredon solteiro', price: '4,80€' },
      ],
    },
    {
      id: 'limpeza-seco',
      title: '✨ Limpeza a Seco',
      subtitle: 'Tratamento especializado para peças delicadas, fatos e artigos especiais.',
      note: 'Os preços indicados podem sofrer acréscimo em casos especiais. O cliente será consultado antes de avançar.',
      items: [
        { label: 'Camisa / Blusa', price: '7,90€' },
        { label: 'Camisa / Blusa de Seda', price: '8,90€' },
        { label: 'Gravata', price: '7,90€' },
        { label: 'Calças / Saia', price: '11,00€' },
        { label: 'Camisola / Pullover', price: '11,60€' },
        { label: 'Blazer', price: '16,00€' },
        { label: 'Blusão', price: '17,90€' },
        { label: 'Casaco / Sobretudo', price: '21,90€' },
        { label: 'Fato (2 peças)', price: '20,90€' },
        { label: 'Vestido Simples', price: '14,40€' },
        { label: 'Vestido Seda/Linho Curto', price: '20,30€' },
        { label: 'Vestido de Festa (Seda/Linho comprido)', price: '22,40€' },
        { label: 'Ténis de Tecido ou Sintético', price: '23,00€' },
      ],
    },
    {
      id: 'casa',
      title: '🛏️ Artigos de Casa',
      subtitle: 'Edredons, cobertores, cortinas e artigos de grande dimensão.',
      note: 'Os preços indicados podem sofrer acréscimo em casos especiais. O cliente será consultado antes de avançar.',
      items: [
        { label: 'Edredon Solteiro', price: '22,40€' },
        { label: 'Edredon Solteiro de Penas/Acolchoado', price: '28,00€' },
        { label: 'Edredon Casal', price: '28,60€' },
        { label: 'Edredon Casal de Penas/Acolchoado', price: '33,60€' },
        { label: 'Capa Edredon Solteiro', price: '11,40€' },
        { label: 'Capa Edredon Casal', price: '12,60€' },
        { label: 'Colcha Simples Solteiro', price: '15,90€' },
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
          { label: 'STANDARD bag (approx. 5kg) — with plan', price: '€15.00' },
          { label: 'STANDARD bag (approx. 5kg) — without plan', price: '€19.00' },
          { label: 'MAX bag (approx. 10kg) — with plan', price: '€20.00' },
          { label: 'MAX bag (approx. 10kg) — without plan', price: '€26.00' },
        ],
    },
    {
      id: 'wash-iron',
      title: '👔 Wash & Iron',
      subtitle: 'Washed and ironed — ready to wear.',
      note: undefined,
        items: [
          { label: '1 item — with plan', price: '€2.90' },
          { label: '1 item — without plan', price: '€3.90' },
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
          { label: 'Pack 50 items (1 month)', price: '€80.00' },
          { label: '5 shirts (at once)', price: '€10.50' },
          { label: '12 items (at once)', price: '€28.00' },
          { label: '1 item — with plan', price: '€2.00' },
          { label: '1 item — without plan', price: '€2.50' },
        { label: 'Double duvet cover', price: '€5.90' },
        { label: 'Single duvet cover', price: '€4.80' },
      ],
    },
    {
      id: 'dry-cleaning',
      title: '✨ Dry Cleaning',
      subtitle: 'Specialized treatment for delicate fabrics, suits and special garments.',
      note: 'Prices shown may increase in special cases. The customer will be consulted before proceeding.',
      items: [
        { label: 'Shirt / Blouse', price: '€7.90' },
        { label: 'Silk Shirt / Blouse', price: '€8.90' },
        { label: 'Tie', price: '€7.90' },
        { label: 'Pants / Skirt', price: '€11.00' },
        { label: 'Sweater / Pullover', price: '€11.60' },
        { label: 'Blazer', price: '€16.00' },
        { label: 'Jacket', price: '€17.90' },
        { label: 'Coat / Overcoat', price: '€21.90' },
        { label: 'Suit (2 pieces)', price: '€20.90' },
        { label: 'Simple Dress', price: '€14.40' },
        { label: 'Short Silk / Linen Dress', price: '€20.30' },
        { label: 'Long Silk / Linen Evening Dress', price: '€22.40' },
        { label: 'Fabric or Synthetic Sneakers', price: '€23.00' },
      ],
    },
    {
      id: 'household',
      title: '🛏️ Household Items',
      subtitle: 'Duvets, blankets, curtains and large household items.',
      note: 'Prices shown may increase in special cases. The customer will be consulted before proceeding.',
      items: [
        { label: 'Single Duvet', price: '€22.40' },
        { label: 'Feather/Quilted Single Duvet', price: '€28.00' },
        { label: 'Double Duvet', price: '€28.60' },
        { label: 'Feather/Quilted Double Duvet', price: '€33.60' },
        { label: 'Single Duvet Cover', price: '€11.40' },
        { label: 'Double Duvet Cover', price: '€12.60' },
        { label: 'Simple Single Bedspread', price: '€15.90' },
        { label: 'Simple Single Mattress Protector', price: '€10.30' },
        { label: 'Synthetic Pillow', price: '€12.90' },
        { label: 'Curtain', price: '€17.90/m' },
        { label: 'Rug', price: '€17.90/m²' },
        { label: 'Tablecloth', price: '€13.90/m²' },
      ],
    },
  ];

  const faqs = pt ? [
    {
      q: 'Como funciona o serviço de recolha e entrega?',
      a: 'Agende a sua recolha online ou contacte-nos pelo WhatsApp. O nosso motorista recolhe a sua roupa na hora combinada e entrega-a no horário agendado.',
    },
    {
      q: 'Com quanto tempo de antecedência devo fazer a reserva?',
      a: 'Recomendamos que reserve com pelo menos 24 horas de antecedência para garantir o horário preferido.',
    },
    {
      q: 'Posso reagendar ou cancelar a minha reserva?',
      a: 'Sim. Contacte-nos pelo WhatsApp o mais rapidamente possível e iremos ajudá-lo com qualquer alteração.',
    },
    {
      q: 'Existe compromisso mínimo nos planos?',
      a: 'Não, não existe compromisso mínimo.',
    },
    {
      q: 'Quanto tempo demora o serviço?',
      a: 'Lavar e/ou engomar demora aproximadamente 48 horas. A limpeza a seco demora aproximadamente 4 a 5 dias, dependendo do artigo.',
    },
    {
      q: 'Qual é o horário de recolhas e entregas?',
      a: 'As recolhas e entregas são realizadas entre as 9h00 e as 15h00.',
    },
    {
      q: 'Oferecem serviço expresso?',
      a: 'Sim. Para lavagem e engomadoria, oferecemos uma opção expresso em 24 horas mediante um custo adicional.',
    },
    {
      q: 'Qual é a forma mais rápida de contactar o suporte?',
      a: 'Recomendamos que nos ligue ou contacte pelo WhatsApp para uma resposta mais rápida.',
    },
  ] : [
    {
      q: 'How does the pickup and delivery service work?',
      a: 'Schedule your pickup online or contact us on WhatsApp. Our driver collects your laundry at the agreed time and returns it at the scheduled delivery time.',
    },
    {
      q: 'How far in advance should I book?',
      a: 'We recommend booking at least 24 hours in advance to secure your preferred time slot.',
    },
    {
      q: 'Can I reschedule or cancel my booking?',
      a: 'Yes. Please contact us on WhatsApp as soon as possible and we will assist you with any changes.',
    },
    {
      q: 'Is there a minimum commitment for plans?',
      a: 'No, there is no minimum commitment.',
    },
    {
      q: 'How long does the service take?',
      a: 'Washing and/or ironing takes approximately 48 hours. Dry cleaning takes approximately 4 to 5 days, depending on the item.',
    },
    {
      q: 'What are your pickup and delivery hours?',
      a: 'Pickups and deliveries are made between 9:00 AM and 3:00 PM.',
    },
    {
      q: 'Do you offer express service?',
      a: 'Yes. For washing and ironing, we offer a 24-hour express option for an additional fee.',
    },
    {
      q: 'What is the fastest way to reach support?',
      a: 'We recommend calling us or contacting us on WhatsApp for the quickest response.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Preços e Planos | GLOAT Laundry Lisboa</title>
        <meta name="description" content="Conheça os planos mensais e preços por peça da GLOAT. Lavandaria acessível em Lisboa com planos a partir de 29,90€/mês." />
        <link rel="canonical" href="https://gloatlaundry.com/precos" />
        <link rel="alternate" hrefLang="pt" href="https://gloatlaundry.com/precos" />
        <link rel="alternate" hrefLang="en" href="https://gloatlaundry.com/pricing" />
        <link rel="alternate" hrefLang="x-default" href="https://gloatlaundry.com/precos" />
        <meta property="og:title" content="Preços e Planos | GLOAT Laundry Lisboa" />
        <meta property="og:description" content="Conheça os planos mensais e preços por peça da GLOAT. Lavandaria acessível em Lisboa com planos a partir de 29,90€/mês." />
        <meta property="og:url" content="https://gloatlaundry.com/precos" />
      </Helmet>
      {/* ── Section 1: Monthly Subscriptions ── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            as="h1"
            title={pt ? 'Planos Mensais' : 'Monthly Plans'}
            subtitle={pt
              ? 'Escolha o plano que melhor se adapta ao seu dia-a-dia e poupe todos os meses. Items adicionais ao plano a preços reduzidos. Delivery incluído.'
              : 'Choose the plan that best fits your routine and save every month. Additional items at reduced prices. Delivery included.'}
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
                {/* No highlight badge */}

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
                      {cat.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between gap-4 py-2.5 border-b border-border/30 last:border-0"
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

        </div>
      </section>

      {/* ── Section 3: FAQs ── */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">{t('pricing', 'faq')}</h2>
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

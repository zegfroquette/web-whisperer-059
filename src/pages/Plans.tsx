import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionHeader } from '@/components/SectionHeader';
import { TestimonialCard } from '@/components/TestimonialCard';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Plans = () => {
  const { t, language } = useLanguage();

  const plans = [
    {
      name: 'Plano Lite',
      price: '65,00€',
      highlight: false,
      desc: language === 'pt'
        ? '4 bolsas STANDARD (aprox. 5kg) de roupa do dia-a-dia lavada e dobrada'
        : '4 STANDARD bags (approx. 5kg) of washed & folded everyday clothes',
      benefits: language === 'pt'
        ? ['4 Bolsas STANDARD (aprox. 5kg) por mês', 'Lavagem profissional', 'Roupa dobrada', 'Entrega em 48h']
        : ['4 STANDARD bags (approx. 5kg) per month', 'Professional wash', 'Folded clothes', 'Delivery in 48h'],
    },
    {
      name: 'Plano Max',
      price: '85,00€',
      highlight: false,
      desc: language === 'pt'
        ? '4 bolsas GRANDE (aprox. 10kg) de roupa do dia-a-dia lavada e dobrada'
        : '4 MAX bags (approx. 10kg) of washed & folded everyday clothes',
      benefits: language === 'pt'
        ? ['4 Bolsas GRANDE (aprox. 10kg) por mês', 'Lavagem profissional', 'Roupa dobrada', 'Entrega em 48h']
        : ['4 MAX bags (approx. 10kg) per month', 'Professional wash', 'Folded clothes', 'Delivery in 48h'],
    },
    {
      name: 'Plano Engomadoria',
      price: '60,00€',
      highlight: false,
      desc: language === 'pt'
        ? '24 peças apenas engomadas'
        : '24 pieces ironed only',
      benefits: language === 'pt'
        ? ['24 peças por mês', 'Engomadoria profissional', 'Entrega em cabides', 'Entregue em 48 horas']
        : ['24 pieces per month', 'Professional ironing', 'Delivered on hangers', 'Delivered in 48 hours'],
    },
    {
      name: 'Plano Lavar e Engomar',
      price: '80,00€',
      highlight: false,
      desc: language === 'pt'
        ? '24 peças lavadas e engomadas'
        : '24 pieces washed & ironed',
      benefits: language === 'pt'
        ? ['24 peças por mês', 'Lavagem + engomadoria', 'Serviço completo', 'Entrega em cabides', 'Entregue em 48 horas']
        : ['24 pieces per month', 'Wash + ironing', 'Full service', 'Delivered on hangers', 'Delivered in 48 hours'],
    },
  ];

  const comparisonData = [
    {
      feature: t('plans', 'itemCount'),
      values: [
        `4 ${t('plans', 'bags')} (STANDARD)`,
        `4 ${t('plans', 'bags')} (MAX)`,
        `24 ${t('plans', 'pieces')}`,
        `24 ${t('plans', 'pieces')}`,
      ],
    },
    {
      feature: t('plans', 'serviceType'),
      values: [t('plans', 'washed'), t('plans', 'washed'), t('plans', 'ironed'), t('plans', 'washedIroned')],
    },
    {
      feature: t('plans', 'monthlyPrice'),
      values: ['65,00€', '85,00€', '60,00€', '80,00€'],
    },
  ];

  const testimonials = language === 'pt' ? [
    { name: 'Sofia Mendes', role: 'Subscritora há 6 meses', text: 'O plano mensal é incrível. Nunca mais me preocupei com a roupa. Entrego e recebo tudo perfeito!', rating: 5 },
    { name: 'João Pereira', role: 'Subscritor há 1 ano', text: 'Excelente relação qualidade-preço. O Plano Max é perfeito para a minha família. Super recomendo.', rating: 5 },
    { name: 'Laura Costa', role: 'Subscritora há 3 meses', text: 'A engomadoria é de outro nível. As minhas camisas ficam sempre impecáveis para o trabalho.', rating: 5 },
  ] : [
    { name: 'Sofia Mendes', role: 'Subscriber for 6 months', text: 'The monthly plan is amazing. I never worry about laundry anymore. I drop off and get everything back perfect!', rating: 5 },
    { name: 'João Pereira', role: 'Subscriber for 1 year', text: 'Excellent value for money. The Max Plan is perfect for my family. Highly recommend.', rating: 5 },
    { name: 'Laura Costa', role: 'Subscriber for 3 months', text: 'The ironing is next level. My shirts always come back perfect for work.', rating: 5 },
  ];

  return (
    <>
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader as="h1" title={t('plans', 'title')} subtitle={t('plans', 'subtitle')} />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className={`relative rounded-2xl p-6 border transition-shadow ${
                  plan.highlight
                    ? 'border-primary shadow-lg shadow-primary/10 bg-card'
                    : 'border-border/50 bg-card shadow-sm hover:shadow-md'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 gradient-primary rounded-full text-white text-xs font-bold">
                    {t('plans', 'bestValue')}
                  </div>
                )}
                <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
                <div className="text-3xl font-extrabold text-gradient mb-1">{plan.price}</div>
                <p className="text-xs text-muted-foreground mb-4">/{language === 'pt' ? 'mês' : 'month'}</p>
                <p className="text-sm text-muted-foreground mb-5">{plan.desc}</p>
                <ul className="space-y-2 mb-6">
                  {plan.benefits.map((b, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={`w-full rounded-full ${
                    plan.highlight ? 'gradient-primary border-0 text-white hover:opacity-90' : ''
                  }`}
                  variant={plan.highlight ? 'default' : 'outline'}
                >
                  <Link to="/contacto">{t('plans', 'choosePlan')}</Link>
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h3 className="text-2xl font-bold text-center mb-8">{t('plans', 'comparison')}</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">{t('plans', 'feature')}</TableHead>
                    {plans.map((p, i) => (
                      <TableHead key={i} className="text-center">{p.name}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonData.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{row.feature}</TableCell>
                      {row.values.map((v, j) => (
                        <TableCell key={j} className="text-center text-sm">{v}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title={t('plans', 'customerStories')} />
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((test, i) => (
              <TestimonialCard key={i} {...test} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Plans;

import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionHeader } from '@/components/SectionHeader';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Pricing = () => {
  const { t, language } = useLanguage();

  const pricingData = language === 'pt' ? [
    { service: 'Lavar & Dobrar (bolsa Standard)', price: 'Desde 12,99€' },
    { service: 'Lavar & Dobrar (bolsa Grande)', price: 'Desde 16,99€' },
    { service: 'Engomadoria (por peça)', price: 'Desde 2,00€' },
    { service: 'Lavar e Engomar (por peça)', price: 'Desde 2,50€' },
    { service: 'Limpeza a Seco (por peça)', price: 'Desde 5,00€' },
    { service: 'Edredão (single)', price: 'Desde 12,00€' },
    { service: 'Edredão (casal)', price: 'Desde 15,00€' },
    { service: 'Cortinas (por m²)', price: 'Desde 4,00€' },
    { service: 'Serviço Expresso (+50%)', price: 'Consultar' },
  ] : [
    { service: 'Wash & Fold (Standard bag)', price: 'From €12.99' },
    { service: 'Wash & Fold (Large bag)', price: 'From €16.99' },
    { service: 'Ironing (per piece)', price: 'From €2.00' },
    { service: 'Wash & Iron (per piece)', price: 'From €2.50' },
    { service: 'Dry Cleaning (per piece)', price: 'From €5.00' },
    { service: 'Duvet (single)', price: 'From €12.00' },
    { service: 'Duvet (double)', price: 'From €15.00' },
    { service: 'Curtains (per m²)', price: 'From €4.00' },
    { service: 'Express Service (+50%)', price: 'Enquire' },
  ];

  const faqs = [
    { q: t('pricing', 'faqDeliveryQ'), a: t('pricing', 'faqDeliveryA') },
    { q: t('pricing', 'faqBagQ'), a: t('pricing', 'faqBagA') },
    { q: t('pricing', 'faqPaymentQ'), a: t('pricing', 'faqPaymentA') },
    { q: t('pricing', 'faqHoursQ'), a: t('pricing', 'faqHoursA') },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionHeader title={t('pricing', 'title')} subtitle={t('pricing', 'subtitle')} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-base">{t('pricing', 'service')}</TableHead>
                <TableHead className="text-right text-base">{t('pricing', 'price')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pricingData.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.service}</TableCell>
                  <TableCell className="text-right font-semibold">{row.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-center mb-8">{t('pricing', 'faq')}</h3>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border border-border/50 px-6">
                <AccordionTrigger className="text-left font-medium">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;

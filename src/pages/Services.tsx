import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionHeader } from '@/components/SectionHeader';
import { Shirt, Wind, Droplets, Gem, Zap, Truck } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' as const },
  }),
};

const Services = () => {
  const { t } = useLanguage();

  const services = [
    { icon: Shirt, title: t('services', 'washFold'), desc: t('services', 'washFoldDesc'), color: 'bg-blue-500/10 text-blue-600' },
    { icon: Wind, title: t('services', 'ironing'), desc: t('services', 'ironingDesc'), color: 'bg-teal-500/10 text-teal-600' },
    { icon: Droplets, title: t('services', 'dryCleaning'), desc: t('services', 'dryCleaningDesc'), color: 'bg-purple-500/10 text-purple-600' },
    { icon: Gem, title: t('services', 'specialItems'), desc: t('services', 'specialItemsDesc'), color: 'bg-amber-500/10 text-amber-600' },
    { icon: Zap, title: t('services', 'expressService'), desc: t('services', 'expressServiceDesc'), color: 'bg-red-500/10 text-red-600' },
    { icon: Truck, title: t('services', 'delivery'), desc: t('services', 'deliveryDesc'), color: 'bg-green-500/10 text-green-600' },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionHeader title={t('services', 'title')} subtitle={t('services', 'subtitle')} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm hover:shadow-md transition-all"
            >
              <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center mb-4`}>
                <s.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

interface Review {
  name: string;
  city?: string;
  text: string;
  lang: 'en' | 'pt';
}

const reviews: Review[] = [
  {
    name: 'Carol Anne Bisoni',
    city: 'Lisboa',
    text: 'Gloat offers a great efficient laundry service, they\'re punctual, and laundry is returned in tip top condition. The employees are very friendly and go out of their way to help. Highly recommended service in Lisbon!',
    lang: 'en',
  },
  {
    name: 'David Charlton',
    text: 'Traveler. Took a load of laundry to wash and fold. Done on time. Reasonably priced. Would go back to this location, any time. Staff was super helpful.',
    lang: 'en',
  },
  {
    name: 'Lee Lessack',
    text: 'We have been using GLOAT (formerly JEFF) since moving from Los Angeles to Lisbon about 18 months ago. Their service is always prompt and well done. Mostly we used them for dry cleaning and they do a very good job. Recently we started a weekly service and they pick up our bedding and wash/press everything and it\'s really excellent. Communication is always quick and easy. Miguel always texts if he is running late (which is rare) to let us know what time he will arrive etc. I highly recommend GLOAT!',
    lang: 'en',
  },
  {
    name: 'Mariana Guedes de Sousa',
    text: 'Se pudesse dava 10 estrelas. A atenção, a prontidão, o serviço. Tudo muito bom. Mas o melhor é a Carolina uma profissional de mão cheia e muito, muito atenta e sempre com um sorriso na cara.',
    lang: 'pt',
  },
  {
    name: 'Afonso Castro Nunes',
    text: 'Gloat agora (antes MR Jeff) é sem dúvida alguma o sítio a quem confiar a roupa. Único sítio que resolveu todos os meus problemas relacionados à roupa e que há um vasto tipo de procedimentos que não só lavar, todos eles excecionais. Muito rápido e eficaz nas entregas e o staff é todo impecável e preocupado com o cliente.',
    lang: 'pt',
  },
  {
    name: 'Patrícia Guimarães',
    text: 'A melhor lavandaria de Lisboa.',
    lang: 'pt',
  },
];

const StarRating = () => (
  <div className="flex gap-1 mb-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
    ))}
  </div>
);

const VISIBLE = 3;

export const TestimonialsCarousel = () => {
  const { language, t } = useLanguage();

  // Sort: primary language first, secondary after
  const sorted = [
    ...reviews.filter((r) => r.lang === language),
    ...reviews.filter((r) => r.lang !== language),
  ];

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  // Reset index when language changes
  useEffect(() => {
    setIndex(0);
  }, [language]);

  const total = sorted.length;
  const maxIndex = total - VISIBLE;

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => Math.min(maxIndex, i + 1));
  }, [maxIndex]);

  const visible = sorted.slice(index, index + VISIBLE);

  const sectionTitle = language === 'pt' ? 'O Que Os Nossos Clientes Dizem' : 'What Our Clients Say';

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            {sectionTitle}
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Cards */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {visible.map((review, i) => (
                  <div
                    key={review.name}
                    className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm flex flex-col"
                  >
                    <StarRating />
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">
                      "{review.text}"
                    </p>
                    <div>
                      <p className="font-semibold text-sm">{review.name}</p>
                      {review.city && (
                        <p className="text-xs text-muted-foreground mt-0.5">{review.city}</p>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              disabled={index === 0}
              className="w-10 h-10 rounded-full border border-border/60 bg-card flex items-center justify-center shadow-sm hover:shadow-md transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === index ? 'bg-primary w-5' : 'bg-border'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              disabled={index >= maxIndex}
              className="w-10 h-10 rounded-full border border-border/60 bg-card flex items-center justify-center shadow-sm hover:shadow-md transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next reviews"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

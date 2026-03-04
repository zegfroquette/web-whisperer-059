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
    text: "Gloat offers a great efficient laundry service, they're punctual, and laundry is returned in tip top condition. The employees are very friendly and go out of their way to help. Highly recommended service in Lisbon!",
    lang: 'en',
  },
  {
    name: 'David Charlton',
    text: 'Traveler. Took a load of laundry to wash and fold. Done on time. Reasonably priced. Would go back to this location, any time. Staff was super helpful.',
    lang: 'en',
  },
  {
    name: 'Lee Lessack',
    text: "We have been using GLOAT (formerly JEFF) since moving from Los Angeles to Lisbon about 18 months ago. Their service is always prompt and well done. Mostly we used them for dry cleaning and they do a very good job. Recently we started a weekly service and they pick up our bedding and wash/press everything and it's really excellent. Communication is always quick and easy. Miguel always texts if he is running late (which is rare) to let us know what time he will arrive etc. I highly recommend GLOAT!",
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

const PAGE_SIZE = 3;

const StarRating = () => (
  <div className="flex gap-1 mb-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
    ))}
  </div>
);

export const TestimonialsCarousel = () => {
  const { language } = useLanguage();

  // Sort: primary language first, secondary after
  const sorted = [
    ...reviews.filter((r) => r.lang === language),
    ...reviews.filter((r) => r.lang !== language),
  ];

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  // Reset page when language changes
  useEffect(() => {
    setPage(0);
  }, [language]);

  const prev = useCallback(() => {
    setDirection(-1);
    setPage((p) => Math.max(0, p - 1));
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setPage((p) => Math.min(totalPages - 1, p + 1));
  }, [totalPages]);

  const visible = sorted.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
  const sectionTitle = language === 'pt' ? 'O que os nossos Clientes dizem' : 'What our Clients say';

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
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={page}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -50 }}
              transition={{ duration: 0.38, ease: 'easeInOut' }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {visible.map((review) => (
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
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              disabled={page === 0}
              className="w-10 h-10 rounded-full border border-border/60 bg-card flex items-center justify-center shadow-sm hover:shadow-md transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > page ? 1 : -1); setPage(i); }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === page ? 'bg-primary w-5' : 'bg-border w-2'
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              disabled={page >= totalPages - 1}
              className="w-10 h-10 rounded-full border border-border/60 bg-card flex items-center justify-center shadow-sm hover:shadow-md transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next reviews"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

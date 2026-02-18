import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const BookNow = () => {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current) return;
    scriptLoaded.current = true;

    // Load CleanCloud CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cleancloudapp.com/webapp/public/webapp/cleancloud.css';
    document.head.appendChild(link);

    // Load CleanCloud JS
    const script = document.createElement('script');
    script.src = 'https://cleancloudapp.com/webapp/public/webapp/cleancloud.js';
    script.type = 'text/javascript';
    script.onload = () => {
      if (typeof (window as unknown as Record<string, unknown>)['CleanCloudWebApp'] === 'function') {
        (window as unknown as Record<string, (...args: unknown[]) => void>)['CleanCloudWebApp']('#myStoreContainer', 27111, {
          width: 'auto',
          height: '100%',
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      // cleanup if needed
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/2 -right-32 w-80 h-80 rounded-full bg-accent/20 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-primary/15 blur-3xl"
        />
      </div>

      {/* Hero header */}
      <section className="relative z-10 pt-16 pb-10 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          {language === 'pt' ? 'Rápido · Simples · Profissional' : 'Fast · Simple · Professional'}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight"
          style={{ fontFamily: 'Plus Jakarta Sans' }}
        >
          {language === 'pt' ? (
            <>
              Agende a sua{' '}
              <span className="text-gradient">recolha de roupa</span>
            </>
          ) : (
            <>
              Schedule Your{' '}
              <span className="text-gradient">Laundry Pickup</span>
            </>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          {language === 'pt'
            ? 'Rápido, simples e profissional. O serviço de lavandaria ao seu alcance.'
            : 'Fast, simple, and professional laundry service at your fingertips.'}
        </motion.p>

        {/* Decorative dots */}
        <div className="flex justify-center gap-2 mt-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
              className="w-2 h-2 rounded-full bg-primary"
            />
          ))}
        </div>
      </section>

      {/* CleanCloud embed */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="relative z-10 w-full"
      >
        <div
          id="myStoreContainer"
          ref={containerRef}
          style={{ width: '100%', minHeight: '100vh' }}
        />
      </motion.section>
    </div>
  );
};

export default BookNow;

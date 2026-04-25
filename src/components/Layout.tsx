'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/i18n/LanguageContext';
import { Menu, X, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { WhatsAppWidget } from '@/components/WhatsAppWidget';

const navItems = [
  { key: 'home', slug: '' },
  { key: 'services', slug: 'services' },
  { key: 'monthlyPlans', slug: '', slugs: { en: 'monthly-plans', pt: 'planos-mensais' } },
  { key: 'pricing', slug: 'pricing' },
  { key: 'contact', slug: 'contact' },
  { key: 'booking', slug: 'booking', highlight: true },
];

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const getSlug = (item: typeof navItems[0]) =>
    'slugs' in item && item.slugs ? item.slugs[language as 'en' | 'pt'] : item.slug;
  const href = (item: typeof navItems[0]) => {
    const slug = getSlug(item);
    return slug ? `/${language}/${slug}` : `/${language}`;
  };
  const isActive = (item: typeof navItems[0]) => {
    const slug = getSlug(item);
    const target = slug ? `/${language}/${slug}` : `/${language}`;
    return pathname === target || (!slug && !('slugs' in item) && (pathname === `/${language}` || pathname === `/${language}/`));
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href={`/${language}`} className="flex items-center" aria-label="GLOAT – The Greatest Laundry">
              <img
                src="/images/gloat-logo.png"
                alt="GLOAT"
                className="h-10 w-auto object-contain"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={href(item)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    item.highlight
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : isActive(item)
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {t('nav', item.key)}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <Button
                  variant={language === 'pt' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setLanguage('pt')}
                  aria-label="Mudar para Português"
                  className="text-xs font-semibold tracking-wider min-w-[44px] min-h-[44px] px-2"
                >
                  PT
                </Button>
                <Button
                  variant={language === 'en' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setLanguage('en')}
                  aria-label="Switch to English"
                  className="text-xs font-semibold tracking-wider min-w-[44px] min-h-[44px] px-2"
                >
                  EN
                </Button>
              </div>
              <button
                className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-border/50"
            >
              <nav className="px-4 py-3 flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    href={href(item)}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item)
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {t('nav', item.key)}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img
                  alt="GLOAT"
                  width={84}
                  height={56}
                  className="h-8 w-auto object-contain brightness-0 invert"
                  src="/images/gloat-footer-logo.webp"
                  loading="lazy"
                />
              </div>
              <p className="text-sm opacity-80">{t('footer', 'tagline')}</p>
            </div>
            <div>
              <p className="font-semibold mb-3 text-sm uppercase tracking-wider opacity-80">Links</p>
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    href={href(item)}
                    className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                  >
                    {t('nav', item.key)}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="font-semibold mb-3 text-sm uppercase tracking-wider opacity-80">
                {t('contact', 'title')}
              </p>
              <div className="flex flex-col gap-2 text-sm opacity-80">
                <p>Rua Artilharia 1, Nº 1</p>
                <p>1250-036 Lisboa, Portugal</p>
                <p>(+351) 935 479 900</p>
                <a href="mailto:gloatlaundry@gmail.com" className="hover:opacity-100 transition-opacity">
                  gloatlaundry@gmail.com
                </a>
              </div>
              <p className="font-semibold mt-6 mb-3 text-sm uppercase tracking-wider opacity-80">
                {t('footer', 'hours')}
              </p>
              <div className="flex flex-col gap-1 text-sm opacity-80">
                <p>{t('footer', 'hoursWeekday')}</p>
                <p>{t('footer', 'hoursSaturday')}</p>
              </div>
            </div>
          </div>
          <div className="border-t border-background/10 mt-8 pt-8 flex flex-col items-center gap-4 text-sm opacity-50">
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
              <span>© {new Date().getFullYear()} GLOAT — The Greatest Laundry. {t('footer', 'rights')}</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/gloat.thegreatestlaundry/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-100 transition-opacity"
                  aria-label="GLOAT no Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.trustpilot.com/review/gloatlaundry.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-100 transition-opacity"
                  aria-label="GLOAT Lavandaria Lisboa - Avaliações no Trustpilot"
                  title="Ver avaliações da GLOAT no Trustpilot"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                    <polygon
                      fill="#00B67A"
                      points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={`/${language}/privacy-policy`}
                className="hover:opacity-100 transition-opacity"
              >
                {t('footer', 'privacyPolicy')}
              </Link>
              <span>·</span>
              <Link
                href={`/${language}/terms-and-conditions`}
                className="hover:opacity-100 transition-opacity"
              >
                {t('footer', 'termsConditions')}
              </Link>
              <span>·</span>
              <Link
                href={language === 'en' ? '/pt' : '/en'}
                hrefLang={language === 'en' ? 'pt' : 'en'}
                className="hover:opacity-100 transition-opacity"
              >
                {language === 'en' ? 'Português' : 'English'}
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <WhatsAppWidget />
    </div>
  );
};

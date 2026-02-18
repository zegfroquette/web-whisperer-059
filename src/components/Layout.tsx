import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import gloatLogo from '@/assets/gloat-logo.png';

const navItems = [
{ key: 'home', path: '/' },
{ key: 'plans', path: '/planos' },
{ key: 'services', path: '/servicos' },
{ key: 'pricing', path: '/precos' },
{ key: 'contact', path: '/contacto' },
{ key: 'bookNow', path: '/reservar' }];


export const Layout = ({ children }: {children: React.ReactNode;}) => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <img

                alt="GLOAT – The Greatest Laundry"
                className="h-9 w-auto object-contain"
                style={{ imageRendering: 'crisp-edges' }} src="/lovable-uploads/17fd049a-12dc-4e25-ad35-6092e41666ce.png" />

            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) =>
              <Link
                key={item.key}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.path ?
                'bg-primary/10 text-primary' :
                'text-muted-foreground hover:text-foreground hover:bg-muted'}`
                }>

                  {t('nav', item.key)}
                </Link>
              )}
            </nav>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
                className="gap-1.5 text-xs font-semibold tracking-wider">

                <span className="text-xs font-bold">{language.toUpperCase()}</span>
              </Button>
              <button
                className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}>

                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen &&
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border/50">

              <nav className="px-4 py-3 flex flex-col gap-1">
                {navItems.map((item) =>
              <Link
                key={item.key}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.path ?
                'bg-primary/10 text-primary' :
                'text-muted-foreground hover:text-foreground hover:bg-muted'}`
                }>

                    {t('nav', item.key)}
                  </Link>
              )}
              </nav>
            </motion.div>
          }
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
                  className="h-8 w-auto object-contain brightness-0 invert" src="/lovable-uploads/7bce9ded-b8ab-4fd5-9a4e-effcb5e4c80e.png" />

              </div>
              <p className="text-sm opacity-70">{t('footer', 'tagline')}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider opacity-60">Links</h4>
              <div className="flex flex-col gap-2">
                {navItems.map((item) =>
                <Link
                  key={item.key}
                  to={item.path}
                  className="text-sm opacity-70 hover:opacity-100 transition-opacity">

                    {t('nav', item.key)}
                  </Link>
                )}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider opacity-60">{t('contact', 'title')}</h4>
              <div className="flex flex-col gap-2 text-sm opacity-70">
                <p>Rua Artilharia 1, Nº 1</p>
                <p>1250-036 Lisboa, Portugal</p>
                <p>(+351) 935 479 900</p>
                <p>filipa.gferreira@outlook.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-background/10 mt-8 pt-8 text-center text-sm opacity-50">
            © {new Date().getFullYear()} GLOAT — The Greatest Laundry. {t('footer', 'rights')}
          </div>
        </div>
      </footer>
    </div>);

};
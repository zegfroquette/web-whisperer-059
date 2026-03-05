import { useLanguage } from '@/i18n/LanguageContext';
import { motion } from 'framer-motion';

const WHATSAPP_NUMBER = '351935479900';

export const WhatsAppWidget = () => {
  const { language } = useLanguage();
  const label = language === 'pt' ? 'Precisa de ajuda?' : 'Need help?';
  const ariaLabel = language === 'pt' ? 'Abrir chat no WhatsApp' : 'Open WhatsApp chat';

  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg hover:shadow-xl transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
    >
      <svg viewBox="0 0 32 32" className="w-6 h-6 shrink-0 fill-white">
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.128 6.744 3.046 9.378L1.054 31.4l6.256-1.96a15.932 15.932 0 008.694 2.564C24.826 32.004 32 24.826 32 16.004 32 7.176 24.826 0 16.004 0zm9.35 22.616c-.396 1.114-1.95 2.038-3.196 2.308-.854.182-1.968.326-5.72-1.23-4.802-1.99-7.892-6.862-8.132-7.182-.23-.32-1.934-2.576-1.934-4.914s1.224-3.484 1.66-3.962c.396-.434 1.054-.63 1.684-.63.204 0 .386.01.55.018.476.02.716.05 1.03.798.394.934 1.35 3.292 1.468 3.532.12.24.24.556.08.876-.148.326-.278.47-.518.746-.24.274-.468.484-.708.778-.22.258-.468.534-.198 1.01.27.468 1.2 1.978 2.576 3.204 1.77 1.578 3.26 2.068 3.726 2.296.354.172.776.14 1.058-.154.356-.372.796-.99 1.244-1.6.32-.434.722-.49 1.11-.33.394.148 2.494 1.176 2.922 1.392.426.214.712.326.816.5.104.176.104 1.016-.29 2.13z" />
      </svg>
      <span className="text-sm font-semibold hidden sm:inline">{label}</span>
    </motion.a>
  );
};

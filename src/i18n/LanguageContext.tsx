import React, { createContext, useContext, useState, useCallback } from 'react';
import { Language, translations } from './translations';

type TranslationValue = string | Record<string, unknown>;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (section: string, key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const EN_ONLY_PATHS = new Set([
  '/home',
  '/services',
  '/pricing',
  '/contact',
  '/booking',
  '/privacy-policy',
  '/terms-and-conditions',
]);

const detectInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'pt';
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  return EN_ONLY_PATHS.has(path) ? 'en' : 'pt';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(detectInitialLanguage);

  const t = useCallback((section: string, key: string): string => {
    const sectionData = (translations as Record<string, Record<string, Record<Language, string>>>)[section];
    if (!sectionData) return key;
    const entry = sectionData[key];
    if (!entry) return key;
    return entry[language] || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    // Return safe defaults during HMR transitions
    return {
      language: 'pt' as Language,
      setLanguage: (_lang: Language) => {},
      t: (_section: string, key: string) => key,
    };
  }
  return context;
};

'use client';

import React, { createContext, useContext, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Language, translations } from './translations';

type TranslationValue = string | Record<string, unknown>;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (section: string, key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode; initialLocale: Language }> = ({
  children,
  initialLocale,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const setLanguage = useCallback(
    (lang: Language) => {
      const newPath = pathname.replace(/^\/(pt|en)/, `/${lang}`);
      router.push(newPath);
    },
    [pathname, router],
  );

  const t = useCallback(
    (section: string, key: string): string => {
      const sectionData = (translations as Record<string, Record<string, Record<Language, string>>>)[section];
      if (!sectionData) return key;
      const entry = sectionData[key];
      if (!entry) return key;
      return entry[initialLocale] || key;
    },
    [initialLocale],
  );

  return (
    <LanguageContext.Provider value={{ language: initialLocale, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: 'pt' as Language,
      setLanguage: (_lang: Language) => {},
      t: (_section: string, key: string) => key,
    };
  }
  return context;
};

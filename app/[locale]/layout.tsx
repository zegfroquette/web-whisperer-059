import { notFound } from 'next/navigation';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClientProvider } from '@/components/QueryClientProvider';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { Layout } from '@/components/Layout';
import ScrollToTop from '@/components/ScrollToTop';
import type { Language } from '@/i18n/translations';

const locales = ['pt', 'en'] as const;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  return (
    <QueryClientProvider>
      <TooltipProvider>
        <LanguageProvider initialLocale={locale as Language}>
          <Toaster />
          <Sonner />
          <ScrollToTop />
          <Layout>{children}</Layout>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

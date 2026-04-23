import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Script from 'next/script';
import '../src/index.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://gloatlaundry.com'),
  title: 'GLOAT — The Greatest Laundry | Lavandaria em Lisboa',
  description:
    'GLOAT — Lavandaria profissional em Lisboa. Lavar, dobrar, engomar e limpeza a seco. Recolha e entrega em casa em 48 horas. Planos mensais a partir de 60€.',
  openGraph: {
    siteName: 'GLOAT — The Greatest Laundry',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Barlow+Condensed:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
        <Script
          src="https://featurable.com/assets/v2/carousel_default.min.js"
          strategy="afterInteractive"
          charSet="UTF-8"
        />
      </body>
    </html>
  );
}

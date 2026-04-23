import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const legacyRedirects: Record<string, string> = {
  '/home': '/en',
  '/servicos': '/pt/services',
  '/services': '/en/services',
  '/precos': '/pt/pricing',
  '/planos': '/pt/pricing',
  '/pricing': '/en/pricing',
  '/contacto': '/pt/contact',
  '/contact': '/en/contact',
  '/reserva': '/pt/booking',
  '/booking': '/en/booking',
  '/book': '/pt/booking',
  '/politica-de-privacidade': '/pt/privacy-policy',
  '/privacy-policy': '/en/privacy-policy',
  '/termos-e-condicoes': '/pt/terms-and-conditions',
  '/terms-and-conditions': '/en/terms-and-conditions',
};

const intraLocaleRedirects: Record<string, string> = {
  '/pt/servicos': '/pt/services',
  '/pt/precos': '/pt/pricing',
  '/pt/planos': '/pt/pricing',
  '/pt/contacto': '/pt/contact',
  '/pt/reserva': '/pt/booking',
  '/pt/politica-de-privacidade': '/pt/privacy-policy',
  '/pt/termos-e-condicoes': '/pt/terms-and-conditions',
  '/en/home': '/en',
};

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const legacy = legacyRedirects[pathname];
  if (legacy) {
    return NextResponse.redirect(new URL(legacy, request.url), { status: 301 });
  }

  const intra = intraLocaleRedirects[pathname];
  if (intra) {
    return NextResponse.redirect(new URL(intra, request.url), { status: 301 });
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};

import { Plugin } from 'vite';
import * as fs from 'fs';
import * as path from 'path';

interface RouteConfig {
  path: string;
  title: string;
  description: string;
  canonical: string;
  hreflangPt: string;
  hreflangEn: string;
  h1: string;
  content: string; // key visible text for crawlers
  jsonLd?: object;
}

const DOMAIN = 'https://gloatlaundry.com';

const routes: RouteConfig[] = [
  {
    path: '/',
    title: 'GLOAT — The Greatest Laundry | Lavandaria em Lisboa',
    description: 'GLOAT — Lavandaria profissional em Lisboa. Serviços de lavar, dobrar, engomar e limpeza a seco. Planos mensais acessíveis.',
    canonical: DOMAIN,
    hreflangPt: DOMAIN,
    hreflangEn: DOMAIN,
    h1: 'TRATAMOS DE TODA A SUA ROUPA!',
    content: `<p>Poupe tempo e confie na GLOAT. Lavamos, engomamos e entregamos. Com cuidado profissional e preços justos.</p>
<h2>Como Funciona</h2>
<p>Entrega a roupa — Traga a sua roupa à nossa loja ou agende uma recolha ao domicílio.</p>
<p>Lavamos e tratamos — Tratamos a sua roupa com produtos profissionais e todo o cuidado.</p>
<p>Roupa impecável e pronta — A sua roupa fica pronta, engomada ou só dobrada, conforme escolhido.</p>
<h2>Porquê a GLOAT?</h2>
<p>Rapidez, qualidade profissional, recolha e entrega, e preços acessíveis em Lisboa.</p>`,
  },
  {
    path: '/servicos',
    title: 'Serviços | GLOAT Laundry Lisboa',
    description: 'Serviços de lavandaria GLOAT: lavar e dobrar, engomar, limpeza a seco, lavagem express e planos mensais em Lisboa.',
    canonical: `${DOMAIN}/servicos`,
    hreflangPt: `${DOMAIN}/servicos`,
    hreflangEn: `${DOMAIN}/services`,
    h1: 'Os Nossos Serviços',
    content: `<p>Serviços profissionais de lavandaria em Lisboa.</p>
<h2>Lavar &amp; Dobrar</h2><p>Roupa lavada e dobrada com cuidado profissional.</p>
<h2>Engomar</h2><p>Engomadoria profissional para todas as peças.</p>
<h2>Limpeza a Seco</h2><p>Tratamento especializado para tecidos delicados.</p>
<h2>Lavagem Express</h2><p>Serviço rápido para quando precisa da roupa com urgência.</p>`,
  },
  {
    path: '/services',
    title: 'Services | GLOAT Laundry Lisbon',
    description: 'GLOAT laundry services: wash & fold, ironing, dry cleaning, express wash and monthly plans in Lisbon.',
    canonical: `${DOMAIN}/services`,
    hreflangPt: `${DOMAIN}/servicos`,
    hreflangEn: `${DOMAIN}/services`,
    h1: 'Our Services',
    content: `<p>Professional laundry services in Lisbon.</p>
<h2>Wash &amp; Fold</h2><p>Laundry washed and folded with professional care.</p>
<h2>Ironing</h2><p>Professional ironing for all garments.</p>
<h2>Dry Cleaning</h2><p>Specialized treatment for delicate fabrics.</p>
<h2>Express Wash</h2><p>Quick service when you need your clothes urgently.</p>`,
  },
  {
    path: '/precos',
    title: 'Preços & Planos | GLOAT Laundry Lisboa',
    description: 'Preços e planos mensais GLOAT. Planos Standard e Grande com recolha e entrega em Lisboa. Preços acessíveis.',
    canonical: `${DOMAIN}/precos`,
    hreflangPt: `${DOMAIN}/precos`,
    hreflangEn: `${DOMAIN}/pricing`,
    h1: 'Preços & Planos',
    content: `<p>Planos mensais de lavandaria com recolha e entrega em Lisboa.</p>
<h2>Plano Standard</h2><p>Saco ~5kg — ideal para uso regular.</p>
<h2>Plano Grande</h2><p>Saco ~10kg — para famílias ou maior volume.</p>`,
  },
  {
    path: '/pricing',
    title: 'Pricing & Plans | GLOAT Laundry Lisbon',
    description: 'GLOAT pricing and monthly plans. Standard and Large plans with pickup and delivery in Lisbon.',
    canonical: `${DOMAIN}/pricing`,
    hreflangPt: `${DOMAIN}/precos`,
    hreflangEn: `${DOMAIN}/pricing`,
    h1: 'Pricing & Plans',
    content: `<p>Monthly laundry plans with pickup and delivery in Lisbon.</p>
<h2>Standard Plan</h2><p>Bag ~5kg — ideal for regular use.</p>
<h2>Large Plan</h2><p>Bag ~10kg — for families or larger volumes.</p>`,
  },
  {
    path: '/planos',
    title: 'Planos | GLOAT Laundry Lisboa',
    description: 'Planos mensais GLOAT com recolha e entrega em Lisboa.',
    canonical: `${DOMAIN}/precos`,
    hreflangPt: `${DOMAIN}/precos`,
    hreflangEn: `${DOMAIN}/pricing`,
    h1: 'Planos',
    content: `<p>Planos mensais de lavandaria com recolha e entrega em Lisboa.</p>`,
  },
  {
    path: '/contacto',
    title: 'Contacto | GLOAT Laundry Lisboa',
    description: 'Contacte a GLOAT — lavandaria em Lisboa. Envie-nos uma mensagem, ligue ou visite-nos na Rua Artilharia 1.',
    canonical: `${DOMAIN}/contacto`,
    hreflangPt: `${DOMAIN}/contacto`,
    hreflangEn: `${DOMAIN}/contact`,
    h1: 'Contacte-nos',
    content: `<p>Envie-nos uma mensagem ou visite a nossa loja.</p>
<p>Morada: Rua Artilharia 1, Nº 1, 1250-036 Lisboa, Portugal</p>
<p>Telefone: (+351) 935 479 900</p>
<p>Horário: Segunda a Sexta 09:00–18:00, Sábado 10:00–13:00</p>`,
  },
  {
    path: '/contact',
    title: 'Contact | GLOAT Laundry Lisbon',
    description: 'Contact GLOAT — laundry in Lisbon. Send us a message, call or visit us at Rua Artilharia 1.',
    canonical: `${DOMAIN}/contact`,
    hreflangPt: `${DOMAIN}/contacto`,
    hreflangEn: `${DOMAIN}/contact`,
    h1: 'Contact Us',
    content: `<p>Send us a message or visit our store.</p>
<p>Address: Rua Artilharia 1, Nº 1, 1250-036 Lisbon, Portugal</p>
<p>Phone: (+351) 935 479 900</p>
<p>Hours: Monday to Friday 09:00–18:00, Saturday 10:00–13:00</p>`,
  },
  {
    path: '/reserva',
    title: 'Agendar Recolha | GLOAT Laundry Lisboa',
    description: 'Agende uma recolha de roupa ao domicílio com a GLOAT. Serviço de lavandaria com recolha e entrega em Lisboa.',
    canonical: `${DOMAIN}/reserva`,
    hreflangPt: `${DOMAIN}/reserva`,
    hreflangEn: `${DOMAIN}/booking`,
    h1: 'Agendar Recolha',
    content: `<p>Agende uma recolha de roupa ao domicílio em Lisboa. Recolhemos, lavamos e entregamos.</p>`,
  },
  {
    path: '/booking',
    title: 'Book Pickup | GLOAT Laundry Lisbon',
    description: 'Schedule a home laundry pickup with GLOAT. Laundry service with pickup and delivery in Lisbon.',
    canonical: `${DOMAIN}/booking`,
    hreflangPt: `${DOMAIN}/reserva`,
    hreflangEn: `${DOMAIN}/booking`,
    h1: 'Book Pickup',
    content: `<p>Schedule a home laundry pickup in Lisbon. We collect, wash and deliver.</p>`,
  },
  {
    path: '/politica-de-privacidade',
    title: 'Política de Privacidade | GLOAT Laundry',
    description: 'Política de privacidade da GLOAT Laundry. Como tratamos os seus dados pessoais em conformidade com o RGPD.',
    canonical: `${DOMAIN}/politica-de-privacidade`,
    hreflangPt: `${DOMAIN}/politica-de-privacidade`,
    hreflangEn: `${DOMAIN}/privacy-policy`,
    h1: 'Política de Privacidade',
    content: `<p>Como a GLOAT trata os seus dados pessoais em conformidade com o RGPD.</p>`,
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | GLOAT Laundry',
    description: 'GLOAT Laundry privacy policy. How we handle your personal data in compliance with GDPR.',
    canonical: `${DOMAIN}/privacy-policy`,
    hreflangPt: `${DOMAIN}/politica-de-privacidade`,
    hreflangEn: `${DOMAIN}/privacy-policy`,
    h1: 'Privacy Policy',
    content: `<p>How GLOAT handles your personal data in compliance with GDPR.</p>`,
  },
  {
    path: '/termos-e-condicoes',
    title: 'Termos e Condições | GLOAT Laundry',
    description: 'Termos e condições de utilização dos serviços da GLOAT Laundry em Lisboa.',
    canonical: `${DOMAIN}/termos-e-condicoes`,
    hreflangPt: `${DOMAIN}/termos-e-condicoes`,
    hreflangEn: `${DOMAIN}/terms-and-conditions`,
    h1: 'Termos e Condições',
    content: `<p>Termos e condições de utilização dos serviços da GLOAT Laundry.</p>`,
  },
  {
    path: '/terms-and-conditions',
    title: 'Terms & Conditions | GLOAT Laundry',
    description: 'Terms and conditions for GLOAT Laundry services in Lisbon.',
    canonical: `${DOMAIN}/terms-and-conditions`,
    hreflangPt: `${DOMAIN}/termos-e-condicoes`,
    hreflangEn: `${DOMAIN}/terms-and-conditions`,
    h1: 'Terms & Conditions',
    content: `<p>Terms and conditions for GLOAT Laundry services.</p>`,
  },
];

export function seoPrerender(): Plugin {
  return {
    name: 'vite-seo-prerender',
    apply: 'build',
    enforce: 'post',
    closeBundle() {
      const distDir = path.resolve(process.cwd(), 'dist');
      const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

      let generated = 0;
      for (const route of routes) {
        // Always start from the pristine template so per-route replacements
        // don't accumulate across iterations.
        const enhanced = injectSeoContent(indexHtml, route);

        if (route.path === '/') {
          fs.writeFileSync(path.join(distDir, 'index.html'), enhanced, 'utf-8');
        } else {
          // Support nested paths like /foo/bar — create the full directory tree.
          const routeDir = path.join(distDir, ...route.path.split('/').filter(Boolean));
          fs.mkdirSync(routeDir, { recursive: true });
          fs.writeFileSync(path.join(routeDir, 'index.html'), enhanced, 'utf-8');
        }
        generated++;
      }

      console.log(`[seo-prerender] Generated static HTML for ${generated} routes`);
    },
  };
}

function escapeAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function injectSeoContent(template: string, route: RouteConfig): string {
  // Defensive: explicitly create a fresh string copy per call so no caller
  // can ever share or mutate this working buffer across routes.
  let html = String(template);
  const title = escapeAttr(route.title);
  const description = escapeAttr(route.description);
  const canonical = escapeAttr(route.canonical);

  // <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${route.title}</title>`);

  // <meta name="description" ...>
  html = html.replace(
    /<meta\s+name=["']description["'][^>]*>/i,
    `<meta name="description" content="${description}">`
  );

  // <link rel="canonical" ...>
  html = html.replace(
    /<link\s+rel=["']canonical["'][^>]*>/i,
    `<link rel="canonical" href="${canonical}" />`
  );

  // OG / Twitter tags — flexible matching, replace if present otherwise inject before </head>
  const replaceOrInject = (regex: RegExp, replacement: string) => {
    if (regex.test(html)) {
      html = html.replace(regex, replacement);
    } else {
      html = html.replace('</head>', `    ${replacement}\n  </head>`);
    }
  };

  replaceOrInject(
    /<meta\s+property=["']og:title["'][^>]*>/i,
    `<meta property="og:title" content="${title}">`
  );
  replaceOrInject(
    /<meta\s+property=["']og:description["'][^>]*>/i,
    `<meta property="og:description" content="${description}">`
  );
  replaceOrInject(
    /<meta\s+property=["']og:url["'][^>]*>/i,
    `<meta property="og:url" content="${canonical}">`
  );
  replaceOrInject(
    /<meta\s+name=["']twitter:title["'][^>]*>/i,
    `<meta name="twitter:title" content="${title}">`
  );
  replaceOrInject(
    /<meta\s+name=["']twitter:description["'][^>]*>/i,
    `<meta name="twitter:description" content="${description}">`
  );

  // hreflang tags before </head>
  const hreflangTags = `    <link rel="alternate" hreflang="pt" href="${escapeAttr(route.hreflangPt)}" />
    <link rel="alternate" hreflang="en" href="${escapeAttr(route.hreflangEn)}" />
    <link rel="alternate" hreflang="x-default" href="${escapeAttr(route.hreflangPt)}" />`;
  html = html.replace('</head>', `${hreflangTags}\n  </head>`);

  // Inject visible SEO content inside <div id="root"> so crawlers see it.
  // React will replace this on hydration.
  const seoBlock = `<div id="root"><div id="seo-prerender"><h1>${route.h1}</h1>${route.content}</div>`;
  html = html.replace('<div id="root"></div>', `${seoBlock}</div>`);

  return html;
}

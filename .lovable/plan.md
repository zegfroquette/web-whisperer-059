

## Plan: Add Static Prerendering for SEO

**Goal:** Make your site's content visible to Google crawlers while keeping the visitor experience identical.

**The problem today:** When Google visits your site, it sees an empty `<div id="root"></div>`. All your text, headings, and meta tags only appear after JavaScript runs.

**The solution:** Generate a separate `.html` file for each page during the build process. Each file contains the full page content baked into the HTML. Lovable's hosting already serves real files when they exist, so crawlers will get the pre-rendered version. Visitors see no difference — the React app boots and takes over as usual.

---

### What changes

1. **Install `vite-plugin-prerender`** — a build-time plugin that renders each route to static HTML using a headless browser during `vite build`

2. **Update `vite.config.ts`** — add the prerender plugin with all 13 routes:
   `/`, `/servicos`, `/services`, `/precos`, `/pricing`, `/planos`, `/contacto`, `/contact`, `/reserva`, `/booking`, `/politica-de-privacidade`, `/privacy-policy`, `/termos-e-condicoes`, `/terms-and-conditions`

3. **No other files change** — your pages, components, styles, backend, emails, booking system all stay exactly the same

### What stays the same for visitors

- The website looks and behaves identically
- All animations, language switching, forms work as before
- Contact form emails and booking notifications keep working
- WhatsApp widget, maps, everything unchanged

### What improves

- Google sees full HTML content (headings, text, meta tags) on every page
- SEO indexing should improve within days of deployment
- Page load may feel slightly faster (HTML content appears before JS finishes loading)

### Risk & fallback

If the prerender plugin has issues in Lovable's build environment (it needs a headless browser), I'll fall back to a simpler approach: a custom Vite plugin that generates static HTML files with your SEO-critical content (meta tags, headings, key text) without needing a browser. Same result for crawlers, guaranteed to work.


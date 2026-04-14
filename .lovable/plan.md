

## Plan: SEO Improvements (No UX Impact)

### What's already done
- Per-page `<Helmet>` with title, description, canonical, and OG tags
- `sitemap.xml` and `robots.txt` with sitemap reference
- LocalBusiness JSON-LD schema in `index.html`
- FAQ content on Services page (good for FAQ schema)

### What I'll add

**1. `hreflang` tags on every page**
Link PT and EN route variants so Google treats them as language alternates instead of duplicates. Added via `<Helmet>` on each page.

**2. FAQ structured data (JSON-LD) on Services page**
The FAQs already exist in the component. I'll add a `<script type="application/ld+json">` FAQPage schema so Google can show them as rich results.

**3. Service structured data on Services page**
Add JSON-LD `Service` schema entries for each service (wash & fold, ironing, dry cleaning, etc.) to enable rich results.

**4. Enhance LocalBusiness schema in `index.html`**
Add `image`, `logo`, `sameAs` (Instagram link), and `geo` coordinates to the existing schema for richer Google knowledge panel results.

**5. Semantic HTML improvements**
- Use `<h1>` consistently as the main heading on each page (verify current usage)
- Ensure proper heading hierarchy (h1 → h2 → h3)
- No visual changes — only tag-level adjustments where needed

**6. Add `loading="lazy"` to below-fold images**
The Leaflet map and any non-critical images get lazy loading for better Core Web Vitals scores.

### Files changed
- `index.html` — enhanced LocalBusiness JSON-LD
- `src/pages/Index.tsx` — add hreflang tags
- `src/pages/Services.tsx` — add hreflang + FAQPage + Service JSON-LD
- `src/pages/Pricing.tsx` — add hreflang
- `src/pages/Booking.tsx` — add hreflang
- `src/pages/Contact.tsx` — add hreflang
- `src/pages/PrivacyPolicy.tsx` — add hreflang
- `src/pages/TermsConditions.tsx` — add hreflang
- `src/pages/NotFound.tsx` — minor meta tweaks
- `src/components/ServiceAreaMap.tsx` — lazy loading if applicable

### What this does NOT change
- No visual or layout changes
- No new pages or navigation changes
- No impact on existing user flows


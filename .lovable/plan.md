

## Plan: SEO Improvements — Per-Page Meta Tags + Sitemap

### Steps

**1. Install `react-helmet-async`**

**2. Wrap App with `<HelmetProvider>`** in `src/App.tsx`

**3. Add `<Helmet>` to each page** with unique title, description, and OG tags:
- Index, Services, Pricing, Booking, Contact, Privacy Policy, Terms & Conditions, NotFound
- Portuguese as default, with English variants where applicable

**4. Create `public/sitemap.xml`**
- All public routes for `https://gloatlaundry.com`
- Include both PT and EN route variants

**5. Update `public/robots.txt`**
- Add `Sitemap: https://gloatlaundry.com/sitemap.xml`

### Files changed
- `src/App.tsx` — add HelmetProvider
- `src/pages/Index.tsx` — add Helmet
- `src/pages/Services.tsx` — add Helmet
- `src/pages/Pricing.tsx` — add Helmet
- `src/pages/Booking.tsx` — add Helmet
- `src/pages/Contact.tsx` — add Helmet
- `src/pages/PrivacyPolicy.tsx` — add Helmet
- `src/pages/TermsConditions.tsx` — add Helmet
- `src/pages/NotFound.tsx` — add Helmet
- `public/sitemap.xml` — new
- `public/robots.txt` — updated


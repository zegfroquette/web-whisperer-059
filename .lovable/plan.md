

## PageSpeed Performance Fix Plan

**Current scores**: Performance 67, Accessibility 84, Best Practices 100, SEO 100

### Key findings from the report

Despite moving Leaflet CSS and Google Fonts to JS-based loading, Lighthouse still flags them as render-blocking (750ms each). This is because the `window.addEventListener('load', ...)` script in `<head>` is itself a **parser-blocking inline script** — it blocks HTML parsing while it's evaluated, and the browser may still discover those URLs during preload scanning of the script content.

The LCP element is a `<p>` text tag in the hero, with **3,410ms element render delay** — meaning the JS bundle must fully load and execute before any text appears.

---

### Plan

#### 1. Optimize logo images (~215KB savings)
- Resize `public/lovable-uploads/7bce9ded-...png` (footer logo, 612x408) to 168x112 (2x of 84x56 display) and convert to WebP
- Resize `src/assets/gloat-logo-new.png` (header logo, 1920x904) to 298x140 (2x of 149x70 display) and convert to WebP
- Update imports in `Layout.tsx` to reference the new WebP files

#### 2. Fix render-blocking Leaflet/Fonts (index.html)
The current inline `<script>` in `<head>` still gets flagged. Fix: move the entire deferred-loading script to the **end of `<body>`** (after `<div id="root">` but before the module script), so it doesn't block HTML parsing at all.

#### 3. Inline critical font-face CSS (index.html)
Add a `<style>` tag with `font-display: swap` declarations for the primary fonts (Barlow Condensed, Plus Jakarta Sans) using system font fallbacks. This prevents FOIT and lets text render immediately as the LCP element, eliminating the 3,410ms render delay for text.

#### 4. Accessibility fixes
- **Button without accessible name**: Add `aria-label` to the mobile hamburger menu button in `Layout.tsx` (line 91-96)
- **Heading order**: The `SectionHeader` component uses `<h2>` but the report flags "not sequentially descending". Check and fix any heading skips (e.g., if `<h4>` appears in footer without `<h3>` preceding it — change footer headings to appropriate level or use semantic non-heading elements)
- **Contrast**: Check the `opacity-60` / `opacity-70` text in the footer — these create low-contrast text. Increase to `opacity-80` where needed
- **Touch targets**: Check the PT/EN language toggle buttons (h-7 / px-2) — likely too small. Increase minimum touch target to 44x44px (or add padding)

#### 5. Cache headers
Cannot fix from code — this is controlled by the hosting platform. The `None` cache TTL on all assets is a Lovable hosting configuration. No action possible here.

#### 6. Unused JavaScript (GTM)
GTM is already deferred to `window.load`. The 170KB+ unused JS is inherent to Google Tag Manager and cannot be reduced without removing it entirely. No action — this is acceptable overhead for analytics.

---

### Summary of expected impact

| Change | Est. improvement |
|--------|-----------------|
| Logo optimization | ~215KB less to download, faster LCP |
| Move deferred script to body end | Eliminates ~1,180ms render-blocking |
| Critical font CSS inline | Reduces LCP render delay (3,410ms → near 0) |
| Accessibility fixes | Score 84 → 90+ |

### Files modified
- `index.html` — move script, add inline font CSS
- `src/components/Layout.tsx` — new image paths, aria-label on hamburger
- `src/components/SectionHeader.tsx` — no changes needed
- New optimized image files (WebP) replacing the PNGs

### No changes to
- Visual design, colors, layout, or UX
- Functional behavior
- Any page content or routing




## Fix: Convert CTA Buttons to Real Links

### Problem
The CTA buttons in the blue gradient boxes on the homepage and services page use `onClick={() => navigate('/path')}` on `<Button>` elements. These render as `<button>` tags without `href`, which Google's crawler cannot follow.

### Changes

**1. `src/pages/Index.tsx`** — Replace the two CTA `<Button onClick={navigate}>` with `<Link>` components styled as buttons (using `asChild` or direct className styling). The "Ver Serviços" button links to `/servicos` and "Agendar Recolha" links to `/reserva`.

**2. `src/pages/Services.tsx`** — Same treatment for the two CTA buttons in the blue box (one links to `/precos`, the other to `/reserva`).

The `ScrollToTop` component already handles scroll-to-top on route changes, so the `setTimeout(() => window.scrollTo(...))` calls can be removed.

### No visual change
The buttons will look and behave identically — same classes, same destinations. The only difference is they render as `<a href>` instead of `<button>`.


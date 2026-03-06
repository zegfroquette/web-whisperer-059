

## Scroll to Top on Route Change

### Problem
When navigating between pages, the browser keeps the previous scroll position instead of jumping to the top.

### Solution
Add a small `ScrollToTop` component that listens to route changes via `useLocation()` and calls `window.scrollTo(0, 0)` on every path change.

### Changes

1. **Create `src/components/ScrollToTop.tsx`** — A component that uses `useEffect` + `useLocation` to scroll to top on every route change.

2. **`src/App.tsx`** — Place `<ScrollToTop />` inside `<BrowserRouter>` so it has access to the router context.

No other files need changes. This covers all navigation methods (links, CTAs, footer links, browser back/forward).


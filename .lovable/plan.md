
## Change CleanCloud Widget Background to White

### Problem
The CleanCloud booking widget renders inside a `#myStoreContainer` div that inherits the site's background colour (`--background: 200 20% 98%` — a very light blue-grey). The widget also loads its own stylesheet from `cleancloudapp.com`, but some internal panels (especially post-login screens) may pick up the page background. The goal is to force a fully white (`#ffffff`) background for the widget container and all its descendant elements, both before and after login.

### Root Cause
The widget container `#myStoreContainer` and its wrapper `div` are inheriting the site's `--background` CSS variable, which is not pure white. After login, the widget may swap internal panels/views but the container background remains the same inherited colour.

### Approach
Since CleanCloud is a third-party embed loaded via script, we cannot control its internal styles directly. The reliable fix is to:

1. **In `BookNow.tsx`** — set `background: white` directly on both:
   - The `wrapperRef` div (the outer wrapper)
   - The `#myStoreContainer` div created imperatively in the `useEffect`

2. **In `src/index.css`** — add a targeted CSS override block that forces white background on `#myStoreContainer` and all its children, covering any post-login internal panels the widget renders:

```css
/* CleanCloud widget – force white background */
#myStoreContainer,
#myStoreContainer * {
  background-color: #ffffff !important;
}
```

   This catches any dynamically injected sub-elements (login forms, order panels, etc.) that appear after the user authenticates.

### Technical Details

**Files to change:**

1. `src/pages/BookNow.tsx`
   - Add `style={{ background: "#ffffff" }}` to the outer wrapper `div` (the one with `ref={wrapperRef}`)
   - In `useEffect`, add `container.style.background = "#ffffff"` after creating `#myStoreContainer`

2. `src/index.css`
   - Append a CSS rule targeting `#myStoreContainer` and its descendants to lock background to `#ffffff`

### What is NOT changing
- No pricing logic
- No layout or spacing
- No other pages
- No widget functionality or script loading logic

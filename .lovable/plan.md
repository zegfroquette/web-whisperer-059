
## Improve CleanCloud Widget Loading Speed

### Root Cause

Right now, the CleanCloud script (`cleancloud.js`) and stylesheet (`cleancloud.css`) are loaded **on demand** — only when the user lands on the `/reservar` page. This means the browser has to:

1. Parse React, render the page
2. Run `useEffect` (which only fires after the first render)
3. Then start downloading ~the CleanCloud script from an external server
4. Only after it finishes does the widget appear

This creates a noticeable loading gap.

### The Fix: Preload the Resources in `index.html`

The fastest improvement with zero risk is to add **resource hints** directly to `index.html`. These tell the browser to start fetching CleanCloud's assets in parallel with everything else, the moment the page loads — regardless of which route the user is on.

Two tags to add to the `<head>`:

```html
<!-- Preload CleanCloud script so it's ready when the user hits /reservar -->
<link rel="preload" href="https://cleancloudapp.com/webapp/public/webapp/cleancloud.js" as="script" crossorigin />

<!-- Prefetch the stylesheet -->
<link rel="preload" href="https://cleancloudapp.com/webapp/public/webapp/cleancloud.css" as="style" crossorigin />
```

### Additional Improvement: Remove the Hero Animation Delay

The "Start Booking" button only appears after a `0.28s` staggered animation. Since the widget is below the fold, this delay doesn't add perceived value and slightly delays user interaction. Reducing or removing the animation delays on the hero section will make the page feel snappier.

### What Will Change

| File | Change |
|---|---|
| `index.html` | Add 2 `<link rel="preload">` tags for CleanCloud JS and CSS |
| `src/pages/BookNow.tsx` | Reduce hero motion animation delays from `0.55s / 0.15s / 0.28s` to `0.3s / 0.08s / 0.15s` |

### What This Does NOT Change

- The widget initialization logic stays exactly the same — no risk of re-introducing the duplicate widget bug
- The logo setup is untouched
- The `cleanCloudInitialized` guard remains in place

### Expected Result

The browser begins downloading the CleanCloud script the moment the user opens the site (on any page). By the time they click "Reservar" and navigate to `/reservar`, the script is likely already cached — the widget will appear significantly faster.

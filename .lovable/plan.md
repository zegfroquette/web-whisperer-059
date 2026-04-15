

## Fix Heading Hierarchy Without Visual Changes

Yes — this is straightforward. The fix is purely semantic (changing HTML tags) while keeping all existing CSS classes and styles intact.

### What's wrong today
- `SectionHeader` always renders `<h2>`. Pages like Services, Pricing, Plans, Booking, and Contact use it for their main title, so they have **no `<h1>`**.
- Contact page jumps from `<h2>` to `<h4>` (skips `<h3>`).
- Services FAQ section uses `<h3>` when it should be `<h2>`.

### The fix

1. **`SectionHeader.tsx`** — Add an optional `as` prop (default `"h2"`). Render the chosen tag with the exact same classes and inline styles. Zero visual difference.

2. **Pages using SectionHeader as their main title** — Pass `as="h1"` on these pages:
   - Services, Pricing, Plans, Booking, Contact

3. **Contact page** — Change the `<h4>` elements to `<h3>` (same classes kept).

4. **Services page** — Change the FAQ `<h3>` to `<h2>` (same classes kept).

All changes are tag-only swaps with identical styling — the site will look exactly the same.




## WhatsApp Floating Widget

### What gets built
A floating WhatsApp button fixed to the bottom-right corner of every page, showing the WhatsApp icon plus a localized "Precisa de ajuda?" / "Need help?" label. Clicking it opens `wa.me/351935479900` in a new tab.

### Technical approach

1. **New component**: `src/components/WhatsAppWidget.tsx`
   - Uses `useLanguage()` for PT/EN text
   - Phone number stored as a constant: `const WHATSAPP_NUMBER = "351935479900"` (from footer: (+351) 935 479 900)
   - Fixed position bottom-right with high z-index
   - WhatsApp SVG icon (inline, green branded)
   - `a` tag with `href="https://wa.me/351935479900"`, `target="_blank"`, `rel="noopener noreferrer"`
   - ARIA label: "Abrir chat no WhatsApp" (PT) / "Open WhatsApp chat" (EN)
   - Compact pill shape with hover scale/shadow animation via Framer Motion
   - Responsive: on mobile, text may hide or shrink; icon always visible
   - Bottom margin ~24px, right margin ~24px to avoid safe area conflicts

2. **Layout integration**: Add `<WhatsAppWidget />` in `src/components/Layout.tsx` just before the closing `</div>`, so it renders on every page.

3. **No translation file changes needed** — text is minimal and handled inline in the component.




## Bilingual URL Routes

### What gets built
Each page will be accessible via both its Portuguese and English URL. Both paths render the same component.

### Current routes → New routes

| Page | Current | Added |
|------|---------|-------|
| Services | `/servicos` | `/services` |
| Pricing | `/precos` | `/pricing` |
| Contact | `/contacto` | `/contact` |
| Privacy | `/politica-de-privacidade` | `/privacy-policy` |
| Terms | `/termos-e-condicoes` | `/terms-and-conditions` |

### Technical approach

1. **`src/App.tsx`** — Add duplicate `<Route>` entries for each English path pointing to the same component. Simple and no redirects needed.

2. **`src/components/Layout.tsx`** — Update `navItems` to use language-aware paths so links switch between `/servicos` ↔ `/services` etc. based on selected language. Also update the `location.pathname` active-state check to match both variants.

3. **Footer links** — Same treatment for Privacy Policy and Terms links: use the correct language path.

No database or backend changes needed.


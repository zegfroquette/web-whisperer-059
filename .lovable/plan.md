## Privacy Policy and Terms & Conditions

### What We'll Build

Two new bilingual pages (Portuguese and English) accessible from the footer:

- **Privacy Policy** (`/politica-de-privacidade`)
- **Terms and Conditions** (`/termos-e-condicoes`)

### Legal Compliance

Both documents will comply with:

- **GDPR** (EU General Data Protection Regulation)
- **Portuguese Data Protection Law** (Lei n.o 58/2019)
- **Portuguese e-Commerce Law** (DL 7/2004)
- **Consumer Rights Directive** (Directive 2011/83/EU)
- **Cookie Law** (ePrivacy Directive 2002/58/EC)

### Company Details Used

- Legal name: Filipa Roquette Unipessoal Limitada
- NIF: 515700622
- Address: Rua Rodrigo da Fonseca, No 135, 1070-240 Lisboa, Portugal
- Contact: [gloatlaundry@gmail.com](mailto:gloatlaundry@gmail.com) / (+351) 935 479 900
- Data controller email: [gloatlaundry@gmail.com](mailto:gloatlaundry@gmail.com)

### Privacy Policy Content

Covers:

- Identity of data controller (company name, NIF, address)
- What personal data is collected (name, email, message via contact form)
- Purpose and legal basis for processing (legitimate interest / consent)
- No cookies or tracking beyond essential platform cookies
- Data retention periods
- Data subject rights (access, rectification, erasure, portability, objection)
- Right to lodge complaint with CNPD (Portuguese DPA)
- No international data transfers or third-party sharing beyond hosting
- Contact information for privacy requests

### Terms and Conditions Content

Covers:

- Service description (laundry services)
- Company identification (as required by Portuguese law)
- User obligations
- Liability limitations
- Intellectual property
- Governing law (Portuguese law, Lisbon courts)
- Complaints book reference (Livro de Reclamacoes)
- Changes to terms
- Contact information

### Technical Implementation

1. **Create `src/pages/PrivacyPolicy.tsx**` -- Full bilingual page with all privacy policy content, using `useLanguage()` hook to toggle PT/EN
2. **Create `src/pages/TermsConditions.tsx**` -- Full bilingual page with all terms content, same bilingual pattern
3. **Edit `src/App.tsx**` -- Add two new routes: `/politica-de-privacidade` and `/termos-e-condicoes`
4. **Edit `src/components/Layout.tsx**` -- Add "Privacy Policy" and "Terms & Conditions" links to the footer, below the existing content, styled consistently with the current footer design
5. **Edit `src/i18n/translations.ts**` -- Add footer link labels (`privacyPolicy` and `termsConditions`) in both languages

### Footer Changes

A new row will be added in the footer bottom bar (next to the copyright line) with two links:

- "Politica de Privacidade" / "Privacy Policy"
- "Termos e Condicoes" / "Terms & Conditions"

No changes to layout, spacing, typography, or design system.
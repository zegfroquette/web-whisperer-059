# GLOAT — The Greatest Laundry

Bilingual (EN/PT) marketing website for GLOAT laundry service in Lisboa, built with **Next.js 14 App Router**, **Tailwind CSS**, **shadcn/ui**, and **Supabase**.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, SSR) |
| Styling | Tailwind CSS + shadcn/ui |
| Animations | Framer Motion |
| i18n | next-intl (EN + PT, locale-prefix routing) |
| Forms / DB | Supabase (contact submissions, bookings) |
| Map | Leaflet.js |
| Deployment | Vercel |

## Project Structure

```
app/
  layout.tsx              # Root layout (fonts, analytics, scripts)
  [locale]/
    layout.tsx            # Locale layout wrapping nav + footer
    page.tsx              # Home page
    services/page.tsx
    pricing/page.tsx
    booking/page.tsx
    contact/page.tsx
    monthly-plans/page.tsx
    planos-mensais/page.tsx
    … (31 service sub-pages, EN + PT slugs)

src/
  components/
    Layout.tsx            # Nav + footer
    pages/                # Page content components (client)
    ui/                   # shadcn/ui primitives
  i18n/
    translations.ts       # All EN + PT strings
    LanguageContext.tsx
  data/
    serviceAreaGeoJson.ts # Leaflet delivery zone polygons

public/
  images/
    gloat-logo.png        # Nav logo
    gloat-footer-logo.webp
```

## Local Setup

### Prerequisites

- Node.js 18+
- npm 9+
- A [Supabase](https://supabase.com) project (free tier is fine)

### 1. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and fill in your Supabase credentials (find them in your Supabase dashboard under **Settings → API**):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the site redirects to `/pt` by default.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Production build |
| `npm run start` | Serve production build locally |
| `npm run lint` | Run ESLint |

## Bilingual Routing

- Portuguese: `/pt/...` (default locale)
- English: `/en/...`

EN and PT service pages use **different slugs** (e.g. `/en/laundry-service` vs `/pt/servico-lavandaria`). Each slug has its own `page.tsx` that cross-redirects visitors who arrive at the wrong locale.

## Deployment on Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo
3. Add environment variables in **Project Settings → Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click **Deploy** — Vercel auto-detects Next.js, no extra config needed
5. Every push to `main` triggers a production redeploy

## Supabase Tables

Create these two tables in your Supabase project (**SQL Editor → New query**):

```sql
-- Contact form submissions
create table contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  phone text,
  message text,
  created_at timestamptz default now()
);

-- Booking requests
create table bookings (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  phone text,
  address text,
  service text,
  pickup_date text,
  notes text,
  created_at timestamptz default now()
);
```



## Import Booking Page from Remix Project

### What gets built
The full "Agendar Recolha" (Book a Pickup) page from your Remix project will be brought into this project, including the multi-step booking form, the interactive service area map with Leaflet, and all bilingual translations.

### Files to create
1. **`src/pages/Booking.tsx`** — The full 1045-line booking form component (copied from the Remix project)
2. **`src/components/ServiceAreaMap.tsx`** — The Leaflet map showing green/yellow service zones
3. **`src/data/serviceAreaGeoJson.ts`** — GeoJSON polygon data for the service area boundaries

### Files to modify
4. **`src/App.tsx`** — Add routes: `/booking` and `/reserva` pointing to the Booking page
5. **`src/components/Layout.tsx`** — Add "Agendar Recolha" / "Schedule Pickup" nav item + path group for active state
6. **`src/pages/Booking.tsx`** — Update the page title font from "Plus Jakarta Sans" to "Barlow Condensed" to match the current project's style

### Dependencies to install
- **`leaflet`** + **`@types/leaflet`** — For the interactive service area map
- **`date-fns`** — For date manipulation in the booking form (may already be installed)

### Database migration
A `bookings` table needs to be created with columns for: customer info (name, phone, email, NIF), pickup/delivery addresses and scheduling, services selected (as JSON), preferences, notes, and consent. RLS will allow anonymous inserts (public booking form, no auth required) with no select/update/delete for anon users.

### Technical details
- The Booking page is a 9-step wizard form with animations (framer-motion), validation, and Supabase insert on submit
- The ServiceAreaMap uses raw Leaflet (not react-leaflet) with a lazy-loaded Suspense wrapper
- Leaflet CSS will need to be imported (via CDN link in index.html or CSS import)
- All text is already bilingual (PT/EN) using the same `useLanguage` hook pattern




## Save Contact Form Submissions to Database

### Overview

When someone submits the contact form, their information (name, email, phone, message) will be saved to a database table. Only you and anyone with access to this Lovable project can view the submissions — website visitors cannot see any data.

### What Changes

1. **Create a `contact_submissions` database table** with columns for name, email, phone, message, and timestamp
   - RLS enabled with no public SELECT policy — visitors can only INSERT, never read data
   - An INSERT policy allows anonymous submissions (no login required for the contact form)

2. **Update the contact form (`src/pages/Contact.tsx`)** to save the data to the database instead of just showing a toast
   - Add loading state on the submit button
   - Show success/error feedback

### Technical Details

**Database migration:**
```sql
CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit (no login required)
CREATE POLICY "Anyone can submit contact form"
  ON public.contact_submissions
  FOR INSERT
  WITH CHECK (true);

-- No SELECT/UPDATE/DELETE policies = no public read access
```

**Edit `src/pages/Contact.tsx`:**
- Import the database client
- Replace the current no-op `handleSubmit` with an actual insert into `contact_submissions`
- Add a loading/disabled state while submitting
- Show appropriate success or error toast messages

### Viewing Submissions

You can view all submissions by opening the backend panel in Lovable Cloud and browsing the `contact_submissions` table directly.


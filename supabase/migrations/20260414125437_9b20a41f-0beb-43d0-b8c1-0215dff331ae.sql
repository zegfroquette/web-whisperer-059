CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  returning_customer BOOLEAN NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  nif TEXT,
  preferred_contact TEXT NOT NULL,
  pickup_address TEXT NOT NULL,
  pickup_postcode TEXT NOT NULL,
  pickup_floor TEXT,
  pickup_instructions TEXT,
  pickup_date DATE NOT NULL,
  pickup_slot TEXT NOT NULL,
  same_delivery_address BOOLEAN NOT NULL DEFAULT true,
  delivery_address TEXT NOT NULL,
  delivery_postcode TEXT NOT NULL,
  delivery_floor TEXT,
  delivery_instructions TEXT,
  delivery_date DATE NOT NULL,
  delivery_slot TEXT NOT NULL,
  services JSONB NOT NULL DEFAULT '{}'::jsonb,
  anti_allergic BOOLEAN NOT NULL DEFAULT false,
  contact_before_proceed BOOLEAN NOT NULL DEFAULT false,
  notes TEXT,
  consent_accepted BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a booking"
ON public.bookings
FOR INSERT
TO public
WITH CHECK (true);
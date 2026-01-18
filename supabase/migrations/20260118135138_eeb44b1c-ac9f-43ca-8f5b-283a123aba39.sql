-- Create appointments table
CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Prevent duplicate bookings for same date/time
  UNIQUE (appointment_date, appointment_time, status) 
);

-- Enable Row Level Security
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous users to view active appointments
CREATE POLICY "Anyone can view active appointments"
ON public.appointments
FOR SELECT
USING (status = 'active');

-- Policy: Allow anonymous users to insert appointments
CREATE POLICY "Anyone can create appointments"
ON public.appointments
FOR INSERT
WITH CHECK (true);

-- Policy: Allow anonymous users to update status to cancelled
CREATE POLICY "Anyone can cancel appointments"
ON public.appointments
FOR UPDATE
USING (true)
WITH CHECK (status = 'cancelled');

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.appointments;

-- Create index for faster queries
CREATE INDEX idx_appointments_date_status ON public.appointments (appointment_date, status);
CREATE INDEX idx_appointments_client_lookup ON public.appointments (client_email, client_phone);
-- Drop the old UPDATE policy for cancellations
DROP POLICY IF EXISTS "Anyone can cancel appointments" ON public.appointments;

-- Create policy to allow anonymous users to DELETE appointments
CREATE POLICY "Anyone can delete appointments"
ON public.appointments
FOR DELETE
USING (true);

-- Enable pg_cron extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;

-- Create function to clean up old appointments (older than 2 weeks)
CREATE OR REPLACE FUNCTION public.cleanup_old_appointments()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.appointments
  WHERE appointment_date < CURRENT_DATE - INTERVAL '14 days';
END;
$$;

-- Schedule the cleanup to run every day at 3 AM (will clean appointments older than 2 weeks)
SELECT cron.schedule(
  'cleanup-old-appointments',
  '0 3 * * *',
  'SELECT public.cleanup_old_appointments()'
);
CREATE TABLE public.free_trials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  activated_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '15 days'),
  notified_day_10 boolean DEFAULT false,
  notified_day_11 boolean DEFAULT false,
  notified_day_12 boolean DEFAULT false,
  notified_day_13 boolean DEFAULT false,
  notified_day_14 boolean DEFAULT false,
  converted boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE(email)
);

ALTER TABLE public.free_trials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert free trials"
ON public.free_trials
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Anyone can read free trials by email"
ON public.free_trials
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Service role can update free trials"
ON public.free_trials
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);
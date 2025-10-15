-- Create UserProfile table
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  crm TEXT,
  crm_uf TEXT,
  specialty TEXT,
  clinic_name TEXT,
  address TEXT,
  phone TEXT,
  email_public TEXT,
  logo_url TEXT,
  signature_image_url TEXT,
  stamp_image_url TEXT,
  prescription_footer_text TEXT DEFAULT 'Uso conforme orientação médica. Mantenha fora do alcance de crianças.',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own profile"
  ON public.user_profiles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.user_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.user_profiles
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage buckets for medical files
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('medical-logos', 'medical-logos', true, 5242880, ARRAY['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp']),
  ('medical-signatures', 'medical-signatures', true, 5242880, ARRAY['image/png', 'image/jpeg', 'image/svg+xml']),
  ('medical-stamps', 'medical-stamps', true, 5242880, ARRAY['image/png', 'image/jpeg', 'image/svg+xml']);

-- Storage RLS policies for logos
CREATE POLICY "Users can view all logos"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'medical-logos');

CREATE POLICY "Users can upload their own logo"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'medical-logos' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own logo"
  ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'medical-logos' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own logo"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'medical-logos' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage RLS policies for signatures
CREATE POLICY "Users can view all signatures"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'medical-signatures');

CREATE POLICY "Users can upload their own signature"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'medical-signatures' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own signature"
  ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'medical-signatures' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own signature"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'medical-signatures' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage RLS policies for stamps
CREATE POLICY "Users can view all stamps"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'medical-stamps');

CREATE POLICY "Users can upload their own stamp"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'medical-stamps' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own stamp"
  ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'medical-stamps' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own stamp"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'medical-stamps' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
-- Create enum for plan types
CREATE TYPE public.plan_type AS ENUM ('starter', 'pro');

-- Create enum for subscription status
CREATE TYPE public.subscription_status AS ENUM ('active', 'canceled', 'expired', 'pending');

-- Create PlanSubscription table
CREATE TABLE public.plan_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan plan_type NOT NULL,
  status subscription_status NOT NULL DEFAULT 'pending',
  quota_total INTEGER, -- null for unlimited (pro)
  quota_used INTEGER DEFAULT 0,
  cakto_subscription_id TEXT,
  cakto_customer_id TEXT,
  renews_at TIMESTAMPTZ,
  canceled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.plan_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own subscription"
  ON public.plan_subscriptions
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subscription"
  ON public.plan_subscriptions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create BillingEvents table for audit trail
CREATE TABLE public.billing_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id UUID REFERENCES public.plan_subscriptions(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_data JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.billing_events ENABLE ROW LEVEL SECURITY;

-- RLS Policy - users can view events related to their subscriptions
CREATE POLICY "Users can view their billing events"
  ON public.billing_events
  FOR SELECT
  USING (
    subscription_id IN (
      SELECT id FROM public.plan_subscriptions WHERE user_id = auth.uid()
    )
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_plan_subscriptions_updated_at
  BEFORE UPDATE ON public.plan_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
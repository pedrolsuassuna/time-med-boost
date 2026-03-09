import { supabase } from "@/integrations/supabase/client";

export const STRIPE_PLANS = {
  starter: {
    price_id: "price_1T95efRpmClnFRZos0lGXwwj",
    product_id: "prod_U7KJ2V2HJKkJ14",
    name: "Starter",
  },
  pro: {
    price_id: "price_1T95fURpmClnFRZoFjoXAteA",
    product_id: "prod_U7KKGxZRigRnu6",
    name: "PRO",
  },
} as const;

export async function createCheckoutSession(priceId: string) {
  const { data, error } = await supabase.functions.invoke("create-checkout", {
    body: { priceId },
  });

  if (error) throw new Error(error.message);
  if (data?.url) {
    window.open(data.url, "_blank");
  }
  return data;
}

export async function checkSubscription() {
  const { data, error } = await supabase.functions.invoke("check-subscription");
  if (error) throw new Error(error.message);
  return data as {
    subscribed: boolean;
    product_id: string | null;
    subscription_end: string | null;
  };
}

export async function openCustomerPortal() {
  const { data, error } = await supabase.functions.invoke("customer-portal");
  if (error) throw new Error(error.message);
  if (data?.url) {
    window.open(data.url, "_blank");
  }
  return data;
}

/* ---------------------------------------------------------
   FiveM plans: add your plans here and the FiveM page AND
   the home page Pricing section both update by themselves.

   While this list is empty, the page shows a "Get a quote"
   card instead of fixed prices.

   Example (use your REAL numbers):

   {
     id: "starter",
     name: "Starter",
     slots: 32,        // player slots (optional)
     gb: 8,            // RAM in GB (optional)
     price: 3000,      // LKR per month, or null to show "Ask us"
     tagline: "A small roleplay community",   // optional
     popular: false,   // optional, shows the POPULAR ribbon
   },
--------------------------------------------------------- */

export type FiveMPlan = {
  id: string;
  name: string;
  slots?: number;
  gb?: number;
  price: number | null;
  accent?: string; // card colour (defaults to FiveM orange)
  tagline?: string;
  popular?: boolean;
};

export const FIVEM_ACCENT = "#ff7a1a";

export const FIVEM_PLANS: FiveMPlan[] = [];

export const fivemMinPrice = (() => {
  const prices = FIVEM_PLANS.map((p) => p.price).filter((p): p is number => p !== null);
  return prices.length ? Math.min(...prices) : null;
})();
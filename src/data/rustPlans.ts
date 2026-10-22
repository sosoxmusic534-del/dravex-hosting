/* ---------------------------------------------------------
   Rust plans: edit prices / details here and the Rust page
   AND the home page Pricing section both update.

   price: null  ->  shows "Ask us" and a "Get a quote" button.
   Put a number (LKR per month) to show the real price.
--------------------------------------------------------- */

export type RustPlan = {
  id: string;
  tier: "Budget" | "Prime";
  gb: number; // RAM in GB
  price: number | null; // LKR per month, or null until you add it
  icon: string; // image in /public/images/rust/plans
  accent: string; // card colour
  tagline?: string;
  popular?: boolean;
};

export const RUST_PLANS: RustPlan[] = [
  { id: "budget-6", tier: "Budget", gb: 6, price: null, icon: "/images/rust/plans/budget-6gb.png", accent: "#d2a55a" },
  { id: "budget-8", tier: "Budget", gb: 8, price: null, icon: "/images/rust/plans/budget-8gb.webp", accent: "#c4cad2" },
  { id: "prime-10", tier: "Prime", gb: 10, price: null, icon: "/images/rust/plans/prime-10gb.webp", accent: "#ff8a3d" },
  { id: "prime-12", tier: "Prime", gb: 12, price: null, icon: "/images/rust/plans/prime-12gb.webp", accent: "#ff5a6a" },
];

export const rustMinPrice = (() => {
  const prices = RUST_PLANS.map((p) => p.price).filter((p): p is number => p !== null);
  return prices.length ? Math.min(...prices) : null;
})();
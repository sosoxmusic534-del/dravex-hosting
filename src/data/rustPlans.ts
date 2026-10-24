
/* ---------------------------------------------------------
   Rust plans: edit prices / details here and the Rust page
   AND the home page Pricing section both update.
--------------------------------------------------------- */

export type RustPlan = {
  id: string;
  tier: "Budget" | "Prime";
  gb: number;
  price: number | null;
  icon: string;
  accent: string;
  tagline?: string;
  popular?: boolean;
};


export const RUST_PLANS: RustPlan[] = [
  {
    id: "budget-6",
    tier: "Budget",
    gb: 6,
    price: 2300,
    icon: "/images/rust/plans/budget-6gb.png",
    accent: "#d2a55a",
    tagline: "Enter the Island. Build Your Legacy. Survive the Chaos.",
  },
  {
    id: "budget-8",
    tier: "Budget",
    gb: 8,
    price: 3000,
    icon: "/images/rust/plans/budget-8gb.webp",
    accent: "#c4cad2",
    tagline: "More Power. Bigger Bases. No Limits to Your Ambition.",
  },
  {
    id: "prime-10",
    tier: "Prime",
    gb: 10,
    price: 3800,
    icon: "/images/rust/plans/prime-10gb.webp",
    accent: "#ff8a3d",
    tagline: "Unleash Extreme Performance. Dominate Every Wipe. Rule the Island.",
    popular: true,
  },
  {
    id: "prime-12",
    tier: "Prime",
    gb: 12,
    price: 4600,
    icon: "/images/rust/plans/prime-12gb.webp",
    accent: "#ff5a6a",
    tagline: "Built for Legends. Engineered for Massive Battles. Ready for Anything.",
  },
];


export const rustMinPrice = (() => {
  const prices = RUST_PLANS
    .map((p) => p.price)
    .filter((p): p is number => p !== null);

  return prices.length ? Math.min(...prices) : null;
})();

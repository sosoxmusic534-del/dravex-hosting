
/* ---------------------------------------------------------
   FiveM plans: update prices and details here.
--------------------------------------------------------- */

export type FiveMPlan = {
  id: string;
  name: string;
  slots?: number;
  gb?: number;
  price: number | null;
  accent?: string;
  tagline?: string;
  popular?: boolean;
};

export const FIVEM_ACCENT = "#ff7a1a";

export const FIVEM_PLANS: FiveMPlan[] = [
  {
    id: "starter-4",
    name: "Starter",
    gb: 4,
    price: 1600,
    accent: "#c4cad2",
    tagline: "Launch your FiveM roleplay community with reliable performance and the essential resources to get your city started.",
  },
  {
    id: "starter-6",
    name: "Starter Plus",
    gb: 6,
    price: 2400,
    accent: "#d2a55a",
    tagline: "Grow your city, welcome more players, and build your own roleplay experience on dependable AMD EPYC infrastructure.",
  },
  {
    id: "starter-8",
    name: "Advanced",
    gb: 8,
    price: 3200,
    accent: "#ff9a45",
    tagline: "More memory for custom scripts, additional resources, and a growing community ready to make your server stand out.",
  },
  {
    id: "prime-10",
    name: "Prime",
    gb: 10,
    price: 4000,
    accent: "#ff7a1a",
    tagline: "Take your roleplay to the next level with expanded resources for custom systems, immersive gameplay, and an ambitious city.",
  },
  {
    id: "prime-12",
    name: "Prime Plus",
    gb: 12,
    price: 4800,
    accent: "#ff5a6a",
    tagline: "Built for expanding communities that demand more room for scripts, custom vehicles, roleplay systems, and player activity.",
  },
  {
    id: "prime-16",
    name: "Professional",
    gb: 16,
    price: 6400,
    accent: "#e85d75",
    tagline: "Power a serious roleplay experience with additional memory and resources for larger communities and complex server setups.",
  },
  {
    id: "prime-20",
    name: "Professional Plus",
    gb: 20,
    price: 8000,
    accent: "#b76cff",
    tagline: "Scale your FiveM city with room for extensive custom content, advanced scripts, and a growing population of dedicated players.",
  },
  {
    id: "extreme-24",
    name: "Extreme",
    gb: 24,
    price: 9600,
    accent: "#ff4545",
    tagline: "Build a city without limits. Designed for ambitious roleplay projects, extensive customization, and communities ready to scale.",
    popular: true,
  },
  {
    id: "extreme-32",
    name: "Extreme Plus",
    gb: 32,
    price: 12800,
    accent: "#9b6bff",
    tagline: "Go bigger with substantial memory for demanding roleplay environments, extensive resources, and large-scale community projects.",
  },
];

export const fivemMinPrice = (() => {
  const prices = FIVEM_PLANS
    .map((p) => p.price)
    .filter((p): p is number => p !== null);

  return prices.length ? Math.min(...prices) : null;
})();

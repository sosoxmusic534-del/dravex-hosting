/* ---------------------------------------------------------
   Hytale plans. The Hytale page reads from this list.
   Prices are LKR per month. These are starter proposals:
   change any number to match what you really offer.
--------------------------------------------------------- */

export type HytalePlan = {
  id: string;
  name: string;
  price: number | null;
  cpu?: string; // defaults to AMD EPYC
  vcores?: number;
  ram?: string;
  storageGb?: number;
  ports?: number;
  accent?: string;
  tagline?: string;
  popular?: boolean;
};

export const HYTALE_ACCENT = "#3d8bff";
export const HYTALE_CPU = "AMD EPYC™ CPU";

export const HYTALE_PLANS: HytalePlan[] = [
  { id: "starter", name: "Starter", price: 2000, vcores: 1, ram: "4GB", storageGb: 30, ports: 2, tagline: "For you and your friends" },
  { id: "explorer", name: "Explorer", price: 3600, vcores: 2, ram: "8GB", storageGb: 60, ports: 3, tagline: "A growing community", popular: true },
  { id: "adventurer", name: "Adventurer", price: 5000, vcores: 3, ram: "12GB", storageGb: 100, ports: 5, tagline: "Big worlds and mods" },
  { id: "legend", name: "Legend", price: 6400, vcores: 4, ram: "16GB", storageGb: 150, ports: 6, tagline: "Our biggest Hytale server" },
];

export const hytaleMinPrice = (() => {
  const prices = HYTALE_PLANS.map((p) => p.price).filter((p): p is number => p !== null);
  return prices.length ? Math.min(...prices) : null;
})();
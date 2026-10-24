/* ---------------------------------------------------------
   Node.js & Python plans. The Node.js page AND the home page
   Pricing tab both read from this list.
--------------------------------------------------------- */

export type NodePlan = {
  id: string;
  name: string;
  price: number | null; // LKR per month, or null to show "Ask us"
  vcores?: number;
  ram?: string; // e.g. "512MB", "1GB"
  storageGb?: number;
  ports?: number;
  accent?: string; // card colour (defaults to Node green)
  tagline?: string;
  popular?: boolean;
};

export const NODE_ACCENT = "#5fd068";

export const NODE_PLANS: NodePlan[] = [
  { id: "starter", name: "Developer Starter", price: 300, vcores: 0.25, ram: "512MB", storageGb: 2, ports: 1 },
  { id: "basic", name: "Developer Basic", price: 500, vcores: 0.5, ram: "1GB", storageGb: 5, ports: 2 },
  { id: "plus", name: "Developer Plus", price: 900, vcores: 1, ram: "2GB", storageGb: 10, ports: 3, popular: true },
  // TODO: the specs for this plan were cut off when pasted. Add vcores, ram, storageGb and ports.
];

export const nodeMinPrice = (() => {
  const prices = NODE_PLANS.map((p) => p.price).filter((p): p is number => p !== null);
  return prices.length ? Math.min(...prices) : null;
})();
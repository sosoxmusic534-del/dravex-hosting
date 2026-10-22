/* ---------------------------------------------------------
   Minecraft plans: edit prices / specs here and the home page
   Pricing section AND the Minecraft page both update.
--------------------------------------------------------- */

export const DISCORD_URL = "https://discord.gg/4D9mUWBB78";
export const SUPPORT_EMAIL = "support@dravexhost.xyz";

export type McPlan = {
  id: string;
  name: string;
  gb: number; // RAM in GB
  price: number; // LKR per month
  icon: string; // image in /public/images/minecraft/plans
  accent: string; // card colour
  storage?: number; // NVMe GB
  vcores?: number;
  tagline?: string;
  popular?: boolean;
};

/*
  TODO: Premium and Ultimate have no storage / vCores yet.
  Add  storage: 100, vcores: 4  (your real numbers) and they will show up.
*/
export const MC_PLANS: McPlan[] = [
  {
    id: "starter",
    name: "Starter",
    gb: 2,
    price: 500,
    icon: "/images/minecraft/plans/starter.webp",
    accent: "#9aa3ad",
    storage: 20,
    vcores: 1,
    tagline: "Small vanilla worlds with friends",
  },
  {
    id: "basic",
    name: "Basic",
    gb: 4,
    price: 1000,
    icon: "/images/minecraft/plans/basic.webp",
    accent: "#d5dae1",
    storage: 30,
    vcores: 1,
    tagline: "Vanilla or a handful of plugins",
  },
  {
    id: "pro",
    name: "Pro",
    gb: 6,
    price: 1500,
    icon: "/images/minecraft/plans/pro.webp",
    accent: "#f5b82e",
    storage: 50,
    vcores: 2,
    tagline: "Plugin servers and light modpacks",
    popular: true,
  },
  {
    id: "advanced",
    name: "Advanced",
    gb: 8,
    price: 2000,
    icon: "/images/minecraft/plans/advanced.webp",
    accent: "#2ee08a",
    storage: 70,
    vcores: 2,
    tagline: "Growing communities and modded worlds",
  },
  {
    id: "premium",
    name: "Premium",
    gb: 12,
    price: 3000,
    icon: "/images/minecraft/plans/premium.webp",
    accent: "#35e0ea",
    tagline: "Large communities and big modpacks",
  },
  {
    id: "ultimate",
    name: "Ultimate",
    gb: 16,
    price: 4000,
    icon: "/images/minecraft/plans/ultimate.webp",
    accent: "#ff5a6a",
    tagline: "Maximum power for the biggest servers",
  },
];

export const MC_MAX_GB = Math.max(...MC_PLANS.map((p) => p.gb));
export const fmtLkr = (n: number) => n.toLocaleString("en-US");
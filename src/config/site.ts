/**
 * Site-wide links. Change them here once and every page picks them up.
 */
export const DISCORD_URL = "https://discord.gg/6Nrwkh7pAc";
export const STATUS_URL = "https://status.dravexhost.xyz";

/**
 * Where the "Deploy now" buttons send people.
 * Orders currently go through a Discord ticket. When you have a billing
 * panel, return something like `https://billing.dravexhost.xyz/order/${planId}`.
 */
export function getOrderUrl(planId: string): string {
  void planId;
  return DISCORD_URL;
}

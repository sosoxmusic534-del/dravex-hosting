/**
 * Site-wide links. Change them here once and every page picks them up.
 */
export const DISCORD_URL = "https://discord.gg/6Nrwkh7pAc";
export const STATUS_URL = "https://status.dravexhost.xyz";
export const SUPPORT_EMAIL = "support@dravexhost.xyz";
export const TRUSTPILOT_PAGE = "https://www.trustpilot.com/review/dravexhost.xyz";
export const TRUSTPILOT_WRITE = "https://www.trustpilot.com/evaluate/dravexhost.xyz";
export const TRUSTPILOT_URL = TRUSTPILOT_PAGE;

/**
 * Where the "Deploy now" buttons send people.
 * Orders currently go through a Discord ticket. When you have a billing
 * panel, return something like `https://billing.dravexhost.xyz/order/${planId}`.
 */
export function getOrderUrl(planId: string): string {
  void planId;
  return DISCORD_URL;
}

import { SITE_URL } from '../theme';

export function portalSignupUrl(email?: string): string {
  const url = new URL(`${SITE_URL}/`);
  url.hash = email
    ? `/portal/signup?email=${encodeURIComponent(email.trim())}`
    : '/portal/signup';
  return url.toString();
}

export function sitePath(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Ghost’s members magic-link endpoint is portal-gated from this client.
 * The authentic subscribe path is the same Ghost portal the website uses.
 */
export async function requestDailyBrief(email: string): Promise<{ ok: true; url: string }> {
  return { ok: true, url: portalSignupUrl(email) };
}

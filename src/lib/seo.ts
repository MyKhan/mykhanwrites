/**
 * seo.ts — Centralized SEO utilities
 *
 * Provides builders for title, description, canonical URL, OG, and Twitter
 * meta. All absolute URLs derive from Astro.site (= https://www.mykhanwrites.com)
 * so the www-correct behavior is preserved site-wide.
 *
 * Used by Head.astro; also exported for any component that needs raw SEO values.
 */

/** Default OG image path (relative to site root) */
export const OG_DEFAULT_PATH = '/og/placeholder-1200x630.png';

/** OG image dimensions */
export const OG_IMAGE_WIDTH = '1200';
export const OG_IMAGE_HEIGHT = '630';

/**
 * Resolve an OG image path to an absolute URL.
 * If the path is already absolute (starts with http/https) it is returned as-is.
 * Otherwise it is resolved against the siteOrigin.
 */
export function resolveAbsoluteUrl(path: string, siteOrigin: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  return new URL(path, siteOrigin).href;
}

/**
 * Build the canonical URL for a page.
 * Derives the absolute URL from Astro.site origin + the current pathname.
 */
export function buildCanonicalUrl(pathname: string, siteOrigin: string): string {
  return new URL(pathname, siteOrigin).href;
}

/**
 * Resolve the OG image to an absolute URL, falling back to the default.
 */
export function resolveOgImage(ogImage: string | undefined, siteOrigin: string): string {
  const path = ogImage ?? OG_DEFAULT_PATH;
  return resolveAbsoluteUrl(path, siteOrigin);
}

/** All SEO values needed to render <head> meta tags */
export interface SeoMeta {
  title: string;
  description: string;
  canonicalUrl: string;
  absoluteOgImage: string;
}

/**
 * Build all SEO meta values for a page in one call.
 * siteOrigin should come from `Astro.site?.origin ?? 'https://www.mykhanwrites.com'`.
 */
export function buildSeoMeta(params: {
  title: string;
  description: string;
  pathname: string;
  siteOrigin: string;
  ogImage?: string | undefined;
}): SeoMeta {
  const { title, description, pathname, siteOrigin, ogImage } = params;

  return {
    title,
    description,
    canonicalUrl: buildCanonicalUrl(pathname, siteOrigin),
    absoluteOgImage: resolveOgImage(ogImage, siteOrigin),
  };
}

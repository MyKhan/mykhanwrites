/**
 * siteOrigin.ts — single source of truth for the production origin.
 *
 * The canonical www origin previously lived as three independent string
 * literals (astro.config.mjs `site:`, Head.astro fallback, jsonld.ts). They
 * could silently drift. This constant closes that DRY gap.
 *
 * Consumed by:
 *   - astro.config.mjs  → `site:` (drives Astro.site, canonical/OG, sitemap)
 *   - Head.astro        → fallback when Astro.site is somehow unset
 *   - jsonld.ts         → plain TS module; cannot read Astro.site, so it needs
 *                         the literal — now imported instead of re-declared.
 *
 * Keep this in sync with the deployed domain. If the domain ever changes,
 * this is the one place to edit.
 */
export const SITE_ORIGIN = 'https://www.mykhanwrites.com';

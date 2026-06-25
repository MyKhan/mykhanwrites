/**
 * jsonld.ts — JSON-LD structured data builders
 *
 * Provides build-time JSON-LD objects for Person and Book entities.
 * Each is emitted as a <script type="application/ld+json"> on the relevant page:
 *   - Person → /about
 *   - Book   → /novel
 *
 * Cross-linking: Book.author references Person by @id so crawlers can connect them.
 *
 * Notes:
 *   - image is OMITTED from Book until the cover/OG crop lands (T26).
 *   - genre is OMITTED (too broad for this novel).
 *   - sameAs contains only Instagram (tiktok/x are null in site.json).
 *   - @id values use fragment URLs (#person, #book) per Schema.org best practice.
 */

import { site, novel } from './data';

/** The canonical site origin — must match Astro.site in astro.config.mjs */
const SITE_ORIGIN = 'https://www.mykhanwrites.com';

/** Stable @id for the Person entity, referenced from Book */
export const PERSON_ID = `${SITE_ORIGIN}/#person`;

/** Stable @id for the Book entity */
export const BOOK_ID = `${SITE_ORIGIN}/#book`;

/** Schema.org Person JSON-LD for /about */
export function buildPersonJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Meher Yar Khan',
    url: SITE_ORIGIN,
    jobTitle: 'Writer',
    sameAs: [site.socials.instagram],
  };
}

/** Schema.org Book JSON-LD for /novel — cross-linked to Person by @id */
export function buildBookJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    '@id': BOOK_ID,
    name: novel.title,
    author: { '@id': PERSON_ID },
    inLanguage: 'en',
    datePublished: '2026-08',
    url: `${SITE_ORIGIN}/novel/`,
  };
}

/**
 * Serialize a JSON-LD object to a safe build-time string.
 * All data is static (from data.ts / JSON files) — no user input is involved.
 */
export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data);
}

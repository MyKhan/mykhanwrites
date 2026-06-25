/**
 * fonts.ts — Vite ?url resolution for critical font preload
 *
 * Resolves the hashed WOFF2 asset path at build time so Phase 4's Head.astro
 * can emit an accurate <link rel="preload"> for the critical Fraunces roman
 * latin variable font (the subset that covers the vast majority of users).
 *
 * PHASE 4 USAGE in Head.astro:
 *
 *   import { frauncesRomanLatinUrl } from '../lib/fonts';
 *
 *   <link
 *     rel="preload"
 *     as="font"
 *     type="font/woff2"
 *     crossorigin
 *     href={frauncesRomanLatinUrl}
 *   />
 *
 * Notes:
 * - Only the roman (upright) latin subset is preloaded — one face, one file.
 * - Do NOT preload the italic variant; it is not render-blocking on initial paint.
 * - The ?url suffix tells Vite to return the final hashed public URL of the
 *   asset rather than importing the binary content.
 */

import frauncesRomanLatinUrl from '@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2?url';

export { frauncesRomanLatinUrl };

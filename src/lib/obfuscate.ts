/**
 * obfuscate.ts — Email obfuscation utilities
 *
 * Splits the email address into HTML character entities so the raw address
 * string never appears verbatim in the built static HTML. The browser
 * reassembles it transparently; real users see and click a normal mailto link.
 * Screen readers read the decoded text correctly.
 *
 * Usage (in an Astro component .astro frontmatter / template):
 *
 *   import { obfuscateEmail, makeMailtoHref } from '../lib/obfuscate';
 *
 *   const encoded = obfuscateEmail('hello@mykhanwrites.com');
 *   const href    = makeMailtoHref('hello@mykhanwrites.com');
 *   // Then in template:  <a href={href} set:html={encoded} />
 *
 * Note: `set:html` in Astro renders HTML entities correctly in the browser.
 * The contact email is obfuscated this way in Footer.astro.
 * Phase 7's ContactForm uses the same helper.
 */

/**
 * Encode every character in a string as a decimal HTML entity (&#NN;).
 * The output is safe to use in `set:html` — no raw string visible to scrapers.
 */
export function obfuscateEmail(email: string): string {
  return email
    .split('')
    .map((ch) => `&#${ch.charCodeAt(0)};`)
    .join('');
}

/**
 * Return an encoded mailto: href string, safe for `href` attribute injection.
 * Example: "mailto:hello@mykhanwrites.com" → "&#109;&#97;&#105;&#108;&#116;&#111;&#58;…"
 */
export function makeMailtoHref(email: string): string {
  return obfuscateEmail(`mailto:${email}`);
}

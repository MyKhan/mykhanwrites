/**
 * analytics.ts — Umami event-name constants (single source of truth)
 *
 * Usage: add `data-umami-event={EVENTS.<name>}` to the matching element.
 * Umami reads data-umami-event attributes automatically via its hosted script.
 *
 * No import of this module at runtime — these are build-time string constants
 * embedded as attribute values in the static HTML.
 */

export const EVENTS = {
  /** Hero primary CTA — "Read the first pages" → #letters anchor */
  HERO_READ_FIRST_PAGES: 'hero-read-first-pages',

  /** LettersForm submit button (full, compact, and coming-soon variants) */
  NEWSLETTER_SUBMIT: 'newsletter-submit',

  /** Any "Enter the novel world →" link → onlywhenitrains.com */
  NOVEL_SITE_OUTBOUND: 'novel-site-outbound',

  /** ContactForm submit button */
  CONTACT_SUBMIT: 'contact-submit',

  /** Obfuscated hello@ email links (footer, /contact, /screen) */
  EMAIL_CLICK: 'email-click',

  /** "Compare My Drafts" links → comparemydrafts.com */
  WRITING_TOOL_OUTBOUND: 'writing-tool-outbound',

  /** ManTalksMedia links → mantalksmedia.com */
  MANTALKSMEDIA_OUTBOUND: 'mantalksmedia-outbound',
} as const;

export type EventName = (typeof EVENTS)[keyof typeof EVENTS];

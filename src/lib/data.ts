import { z } from 'zod';

import siteRaw from '../data/site.json';
import novelRaw from '../data/novel.json';
import writingRaw from '../data/writing.json';
import screenRaw from '../data/screen.json';

// ── site.json ────────────────────────────────────────────────────────────────

const NavItemSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const SiteSchema = z.object({
  wordmark: z.string(),
  nav: z.array(NavItemSchema),
  cta: z.object({
    heroPrimary: z.string(),
    novelWorld: z.string(),
    novelWorldUrl: z.url(),
    meetAuthor: z.string(),
    readAboutNovel: z.string(),
    readAboutNovelHref: z.string(),
    seeWriting: z.string(),
    seeWritingHref: z.string(),
    screenTeaser: z.string(),
    screenTeaserHref: z.string(),
  }),
  launch: z.string(),
  letters: z.object({
    heading: z.string(),
    body: z.string(),
    button: z.string(),
    microcopy: z.string(),
  }),
  footer: z.object({
    identityLine1: z.string(),
    identityLine2: z.string(),
    columns: z.object({
      read: z.array(z.object({ label: z.string(), href: z.string() })),
      elsewhere: z.array(z.object({ label: z.string(), href: z.string() })),
      follow: z.array(
        z.object({ label: z.string(), handle: z.string(), href: z.string() })
      ),
      contact: z.email(),
    }),
    compactSignup: z.object({
      lead: z.string(),
      button: z.string(),
      microcopy: z.string(),
    }),
  }),
  socials: z.object({
    instagram: z.url(),
    tiktok: z.url().nullable(),
    x: z.url().nullable(),
  }),
  contactEmail: z.email(),
  contactReasons: z.array(z.string()),
  states: z.object({
    newsletterSuccess: z.string(),
    newsletterError: z.string(),
    contactSuccess: z.string(),
    contactError: z.string(),
    notFound404: z.string(),
  }),
  pending: z.object({
    kitPending: z.string(),
    web3formsPending: z.string(),
  }),
  authorPhotoAlt: z.string(),
  comingSoon: z.object({
    note: z.string(),
  }),
  hero: z.object({
    lede: z.string(),
    novelCuePrefix: z.string(),
    novelCueSuffix: z.string(),
    rangeLine: z.string(),
  }),
  aboutPreview: z.object({
    teaser: z.string(),
  }),
});

// ── novel.json ───────────────────────────────────────────────────────────────

const NovelSchema = z.object({
  title: z.string(),
  premise: z.string(),
  launch: z.string(),
  epigraph: z.string(),
  whatItsAbout: z.string(),
  theFeeling: z.string(),
  comps: z.array(z.string()),
  atmosphere: z.array(z.string()),
  quotes: z.array(z.string()),
  contentNote: z.string(),
  heroAlt: z.string(),
  novelBridgeAlt: z.string(),
  novelWorldUrl: z.url(),
});

// ── writing.json ─────────────────────────────────────────────────────────────

const WritingBlockSchema = z.object({
  lead: z.string(),
  fiction: z.string(),
  screen: z.string(),
  otherWorlds: z.string(),
});

const WritingSchema = z.object({
  home: WritingBlockSchema,
  page: WritingBlockSchema.extend({
    heading: z.string(),
  }),
});

// ── screen.json ──────────────────────────────────────────────────────────────

const ScreenSchema = z.object({
  published: z.boolean(),
  selectedWorkLabel: z.string(),
  logline: z.string(),
  synopsis: z.string(),
  themes: z.array(z.string()),
  comps: z.array(z.string()),
  status: z.string(),
  imdbProUrl: z.url().nullable(),
  industryContact: z.object({
    email: z.email(),
    reason: z.string(),
  }),
  scriptOnRequest: z.boolean(),
});

// ── schema exports (single source of truth) ──────────────────────────────────

export { SiteSchema, NovelSchema, WritingSchema, ScreenSchema };

// ── parse at module load (build-time gate) ───────────────────────────────────

export const site = SiteSchema.parse(siteRaw);
export const novel = NovelSchema.parse(novelRaw);
export const writing = WritingSchema.parse(writingRaw);
export const screen = ScreenSchema.parse(screenRaw);

// ── inferred types ───────────────────────────────────────────────────────────

export type Site = z.infer<typeof SiteSchema>;
export type Novel = z.infer<typeof NovelSchema>;
export type Writing = z.infer<typeof WritingSchema>;
export type Screen = z.infer<typeof ScreenSchema>;

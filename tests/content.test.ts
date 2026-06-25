import { describe, it, expect } from 'vitest';

import { SiteSchema, NovelSchema, WritingSchema, ScreenSchema } from '../src/lib/data';

import siteRaw from '../src/data/site.json';
import novelRaw from '../src/data/novel.json';
import writingRaw from '../src/data/writing.json';
import screenRaw from '../src/data/screen.json';

// C1 locked strings
const C1_BODY =
  "I'm finishing my first novel. Subscribe and confirm, and I'll send you the opening pages — then the cover, the launch date, and the occasional letter from the desk where the next stories take shape.";
const C1_MICROCOPY = 'A few letters a year. No spam. Unsubscribe anytime.';

describe('JSON files parse against their schemas', () => {
  it('site.json is valid', () => {
    expect(() => SiteSchema.parse(siteRaw)).not.toThrow();
  });

  it('novel.json is valid', () => {
    expect(() => NovelSchema.parse(novelRaw)).not.toThrow();
  });

  it('writing.json is valid', () => {
    expect(() => WritingSchema.parse(writingRaw)).not.toThrow();
  });

  it('screen.json is valid', () => {
    expect(() => ScreenSchema.parse(screenRaw)).not.toThrow();
  });
});

describe('novel.quotes is empty', () => {
  it('quotes array has length 0', () => {
    const novel = NovelSchema.parse(novelRaw);
    expect(novel.quotes).toEqual([]);
  });
});

describe('Letters C1 locked strings', () => {
  it('letters.body matches C1 override', () => {
    const site = SiteSchema.parse(siteRaw);
    expect(site.letters.body).toBe(C1_BODY);
  });

  it('letters.microcopy matches C1 override', () => {
    const site = SiteSchema.parse(siteRaw);
    expect(site.letters.microcopy).toBe(C1_MICROCOPY);
  });

  it('footer compactSignup.microcopy matches C1 override', () => {
    const site = SiteSchema.parse(siteRaw);
    expect(site.footer.compactSignup.microcopy).toBe(C1_MICROCOPY);
  });
});

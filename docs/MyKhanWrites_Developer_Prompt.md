# MyKhanWrites.com — Developer Build Prompt

**Hand this to a developer (or an AI builder).** It specifies a launch-minimum, CMS-ready author hub.
Pair it with **`MyKhanWrites_Final_Website_Copy.md`** (all copy) and the strategy/source-of-truth docs
(`..._Filled_Guide_V2.md`, `TOCWIR_Website_Brief_PUBLIC.md`).

---

## 0. The one-paragraph brief

Build **www.mykhanwrites.com**, the author hub for **Meher Yar Khan**, debut novelist of *They Only
Came When It Rained* (coming August 2026). It must feel **calm, literary, human, and fast** — warm
dusk with a quiet shadow beneath, typographic restraint over spectacle — and must **not look
AI-generated or templated**. **Primary goal:** newsletter signups (Kit), book-led entry. **Secondary:**
send visitors to the immersive novel site and establish author credibility. Keep the build **minimal
at launch** but **structured so a CMS/admin panel and an on-site "Letters" section can be added later
without a rewrite.**

---

## 1. Stack & non-negotiables

- **Framework:** Astro (latest), **Tailwind CSS**. TypeScript preferred. Mostly static HTML, **minimal
  JS**, **CSS-first animation**.
- **Output:** static `astro build` → `dist/`. Build locally or in CI — **never on Hostinger**.
- **Hosting:** Hostinger — upload `dist/` to `public_html` (SFTP/SSH, or Hostinger Git deploy).
  Serve over HTTPS; static asset caching on.
- **Version control:** GitHub.
- **Analytics:** **Umami Cloud** (hosted free tier) — script + custom events. **No cookie banner.**
- **Newsletter:** **Kit** (one audience + tags). **Forms:** **Web3Forms** for contact.
- **No at launch:** CMS/admin panel, on-site blog/MDX feed, cookie banner, heavy JS frameworks,
  Goodreads/Amazon links, "part two."
- **Accessibility/perf:** mobile-first, WCAG **AA** contrast, keyboard nav, visible focus,
  `prefers-reduced-motion`, Lighthouse **≥ 90** all categories.

---

## 2. CMS-ready architecture (important — even though no CMS ships now)

Structure content so a **Git-based headless CMS (Decap / Sveltia / TinaCMS)** can be added later by
pointing it at these files — no refactor:

- Put **all editable text** in Astro **content collections** and/or `src/data/*.json|yaml`, not
  hard-coded in components. Suggested:
  - `src/content/pages/` (home, novel, writing, about, contact) as Markdown/MDX with frontmatter.
  - `src/data/site.json` — global: nav, footer links, social URLs, contact email, launch wording,
    CTA labels, Kit/Web3Forms/Umami IDs (non-secret display config).
  - `src/data/novel.json` — title, premise, description, launch line, epigraph, atmosphere fragments,
    quotes[] (empty array for now).
  - `src/content/letters/` — **create the empty collection + a routable `/letters` slot, but don't
    build/link it.** This is the future blog home on your own domain.
- Keep components presentational; they read from collections/data. Document a short "to add a CMS
  later: install Decap/Sveltia, map it to `src/content` + `src/data`, add a build webhook" note in the
  repo README.

---

## 3. Information architecture

- **Nav (header):** Home · Novel · Writing · About.  *(Contact + Letters live in footer / in-page,
  not nav.)*
- **Routes:** `/`, `/novel`, `/writing`, `/about`, `/contact`, `/404`, plus a reserved (unlinked)
  `/letters`.
- **Header:** wordmark "Meher Yar Khan". **Footer:** identity line, link columns, obfuscated email,
  socials. (See copy doc §1.1, §1.7.)

All page text comes verbatim from **`MyKhanWrites_Final_Website_Copy.md`** — do not rewrite copy.

---

## 4. Design system

> **Locked tokens live in `MyKhanWrites_UI_Kit.md` — treat that as the source of truth** (dusk palette,
> Fraunces + Inter, amber accent, sharp edges, film grain, refined motion + page crossfades + gentle
> hero parallax, warm-duotone imagery). The summary below is the quick reference.

**Mood:** dreamlike semi-realism, cinematic warmth, quiet noir beneath; typographic restraint.

**Palette (starting point — verify AA contrast, adjust as needed):**
- Ink / background: `#15120F` (warm near-black) and a slightly lifted `#1E1A16`
- Parchment / primary text: `#ECE3D2`
- Muted brown: `#7A6650`
- Soft gold / amber accent (links, focus, small marks): `#C9A24B`
- Rain-grey (secondary text): `#9AA0A6`
- **Novel-only** subtle raincoat-yellow accent: `#E8C547` (used sparingly, novel page only)
- Avoid: neon, harsh red, corporate blue, sweet pastels, generic café-brown clichés.

**Type:**
- Headings — a literary serif with character: **Fraunces** (or Cormorant / EB Garamond).
- Body — clean, readable sans: **Inter** (or Source Sans 3) — or a readable text serif if preferred.
- **Self-host fonts via Fontsource** (not the Google Fonts CDN) for speed + privacy consistency
  (no third-party calls → keeps the no-banner promise honest). Preload the heading weight.
- Optional handwritten accent only for tiny details (never body).

**Motion (strict ceiling):** soft fades, gentle reveals on scroll, restrained hover. **No** parallax,
scroll-jacking, glitch, animated cursor, autoplay video, typewriter effects, or mug-steam hero motion.
Full `prefers-reduced-motion` fallback.

**Imagery & marks:**
- **Homepage (author) hero = typographic & spacious:** dark charcoal field, name + slogan + range +
  novel cue + CTAs, generous negative space, **one** restrained detail (a single lit window OR one
  small paper crane in a corner). No writer's-desk photo. `[PENDING final texture/background asset]`
- **Novel hero = the rich scene:** cinematic rainy **Japanese commuter-station/café at dusk**, warm
  interior light vs. rain-grey, hint of platform, doubling reflections. `[PENDING final image — render
  in the Japanese register; portrait 4:5 + landscape 16:9 crops; also a 1200×630 OG share crop.]`
- **Paper crane:** one small mark, used sparingly (e.g., a section divider or favicon) — not in header
  + hero + dividers + newsletter all at once. **Mug:** incidental only. **Raincoat-yellow:** novel
  page only.
- **Mobile hero (~380px):** text-first; atmospheric image as low-contrast background or below the
  fold. Verify the slogan and CTAs are legible and tappable.

---

## 5. Page/section build notes (copy = the copy doc)

- **Home (6 blocks):** Hero (typographic; primary CTA "Read the first pages", secondary "Enter the
  novel world →" → onlywhenitrains.com, tertiary "Meet the author") → Current Novel bridge (one image,
  link to /novel) → Writing Range (**weighted layout:** Fiction large, Screen smaller, Other Worlds a
  single line) → About preview (+ photo slot + the shipped-tool trust fact) → Letters (Kit form) →
  Footer.
- **/novel:** rich hero image + title + launch + epigraph; description; "the feeling" (comps, no
  genre label); atmosphere fragments (surface motifs only); reader-quote slot (empty); CTAs (Kit +
  immersive). **Spoiler-safe — render only what's in the copy doc.**
- **/writing:** weighted Fiction / Screen / Other Worlds; "Other worlds" links to onlywhenitrains.com.
  No project titles.
- **/about:** photo slot; fact-first bio; first-person "A note from me"; tool mention (Compare My
  Drafts → comparemydrafts.com); CTAs.
- **/contact:** confident copy; Web3Forms form (Name · Email · Reason select · Message); obfuscated
  `hello@mykhanwrites.com`. Success/error microcopy from copy doc §7.
- **404 + states:** use microcopy from copy doc §7.

---

## 6. Newsletter — Kit integration

- **One Kit account, one audience + tags** (Kit's native model). Every form on this site applies tag
  **`source: mykhanwrites`** (the immersive site will use `source: novel-site`). Also tag
  `interest: novel-launch`.
- Implement the signup as a **Kit embedded form or a custom form posting to Kit** (Forms API), styled
  to match the site. **Double opt-in** recommended for deliverability.
- **Welcome automation = the incentive:** on confirm, send the welcome email (copy doc §1.6.1)
  delivering **Chapter 1 ("The Night It Started")**. `[PENDING: Chapter 1 PDF/asset + hosted link]`
- Newsletter blocks appear on: Home (Letters), /novel, /about.

---

## 7. Contact — Web3Forms integration

- Static-friendly: POST to Web3Forms with your **access key**. Fields: name, email, reason (select:
  Reader note · Publishing/rights · Film/screen · Collaboration · Media/commercial · Other), message.
- **Spam protection:** honeypot field + Web3Forms built-in; optional hCaptcha.
- Show obfuscated email (JS/entity encode `hello@mykhanwrites.com`). Success/error states per copy doc.
- `[PENDING: hello@mykhanwrites.com inbox live before launch]`. (Reader notes may later route to Kit.)

---

## 8. Analytics — Umami Cloud

- Add the Umami script (with `website-id`) site-wide. **No cookie banner.**
- **Track custom events** (Umami `data-umami-event="..."`):
  `hero-read-first-pages`, `newsletter-submit`, `novel-site-outbound`, `contact-submit`,
  `email-click`, `writing-tool-outbound`, `mantalksmedia-outbound`.

---

## 9. Maintenance mode (the "easy" version — no admin panel)

- Ship an on-brand **`maintenance.html`** (static, inline CSS, "back soon" + the crane mark).
- Provide an **`.htaccess`** toggle in `public_html` that, when enabled, serves maintenance to everyone
  **except the owner's IP**, returning HTTP **503 + Retry-After**. Example to include and document:

```apache
# --- MAINTENANCE MODE: uncomment the block to enable ---
# RewriteEngine On
# RewriteCond %{REMOTE_ADDR} !^123\.45\.67\.89   # <- your IP
# RewriteCond %{REQUEST_URI} !^/maintenance\.html$
# RewriteCond %{REQUEST_URI} !\.(css|js|png|jpe?g|svg|woff2?)$
# RewriteRule ^(.*)$ /maintenance.html [R=503,L]
# ErrorDocument 503 /maintenance.html
# Header always set Retry-After "3600"
```

Document the one-line toggle (comment/uncomment) in the README.

---

## 10. SEO / metadata / structured data

- Per-page `<title>` + `<meta name="description">` from copy doc §6.
- **Open Graph + Twitter** (`summary_large_image`) using the 1200×630 novel-hero share image.
  `[PENDING share image]`
- Canonical URLs; **`@astrojs/sitemap`** → `sitemap.xml`; `robots.txt`; favicon from the crane mark.
- **JSON-LD:** `Person` (author) on /about and `Book` on /novel (`name`, `author`, `inLanguage`,
  `datePublished` 2026-08, `genre` left general/omitted). Helps search + AI surfaces.
- Keep SEO light — a debut author's discovery is social/direct, not search.

---

## 11. Performance & accessibility

- Use `astro:assets` / `<Image>` for responsive AVIF/WebP, lazy-loaded; compress the hero images.
- Self-hosted, preloaded fonts; no render-blocking third-party calls.
- Mobile-first; AA contrast on the warm/dark palette (verify text-on-image); keyboard nav; visible
  focus rings (amber); meaningful alt text (e.g., novel-hero alt in copy doc §7); reduced-motion.
- Target Lighthouse ≥ 90 (Perf/A11y/Best-Practices/SEO).

---

## 12. Secrets & config

- `.env` (untracked): `WEB3FORMS_KEY`, `KIT_FORM_ID` / `KIT_API_KEY`, `UMAMI_WEBSITE_ID`.
- Non-secret display config (nav, links, labels) in `src/data/site.json`.

---

## 13. Deployment runbook

1. `npm install` → `npm run build` (local or GitHub Actions).
2. Upload `dist/` → Hostinger `public_html` (SFTP/SSH or Hostinger Git).
3. Ensure HTTPS, pretty URLs, caching headers for `/_astro/*` and images, custom 404.
4. Place `maintenance.html` + the `.htaccess` block (disabled by default).
5. *(Optional later)* GitHub Action to build + deploy on push; or migrate to Cloudflare Pages/Netlify
   if/when the CMS admin panel is added (auto-rebuild on content save).

---

## 14. Acceptance checklist

- [ ] All five pages + 404 build and match the copy doc verbatim.
- [ ] Slogan "Warm stories with cold corners." appears **once** (home hero), nowhere else on-page.
- [ ] **Spoiler-safe:** no twist, cranes' meaning, girl's identity, ending, or "Platform 9" anywhere.
- [ ] Kit signup works end-to-end; `source: mykhanwrites` tag applied; welcome email delivers Ch. 1.
- [ ] Contact form delivers to inbox; spam protection on; obfuscated email renders.
- [ ] Umami loads; all custom events fire (verify in dashboard); no cookie banner.
- [ ] Maintenance toggle works (503 for public, owner IP passes).
- [ ] Typographic author hero (no desk photo); rich novel hero; crane used sparingly; raincoat
      novel-page only; mobile hero text-first at 380px.
- [ ] AA contrast; keyboard nav; reduced-motion; Lighthouse ≥ 90.
- [ ] SEO tags, OG/Twitter image, sitemap, robots, favicon, JSON-LD present.
- [ ] Content lives in collections/data (CMS-ready); empty `/letters` slot reserved, unlinked.
- [ ] All `[PENDING]` assets clearly stubbed (no broken links/images at launch).

---

## 15. Inputs & pending assets (hand off with this prompt)

**Confirmed:** immersive site **onlywhenitrains.com** · tool **Compare My Drafts /
comparemydrafts.com** · **mantalksmedia.com** · email **hello@mykhanwrites.com** · socials all
**@mykhanwrites** (Instagram link now; TikTok when live; **X reserved — do not link yet**) ·
analytics **Umami Cloud** · forms **Web3Forms** · launch **"Coming August 2026."**

**`[PENDING]` before publish:** author photo (window-lit, muted) · final novel hero image (Japanese
register) + OG share crop · author-hero texture/background · Chapter 1 PDF + hosted link ·
`hello@` inbox live · genuine early-reader quote(s) · TikTok link when live · Kit/Web3Forms/Umami
account IDs.

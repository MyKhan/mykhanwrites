# Pending Assets Register + Pre-Publish Checklist

This document lists every asset or account that is **PENDING** at build time,
and the checklist that gates the launch flip. Nothing goes live until every
gated item below is checked off.

---

## Pending asset register

Each item has a reference ID matching the phase reports and copy doc.

| # | Asset | Status | Where used | Notes |
|---|-------|--------|------------|-------|
| 1 | **Author photo** (window-lit, muted, authentic) | PENDING | `/about` hero photo slot, homepage About preview | Specs: warm/dark palette, window-lit. No corporate headshot, no dark-room, no desk. |
| 2 | **Final novel-hero image** (Japanese commuter-station/café at dusk, cinematic rainy) | PENDING | `/novel` hero, Novel bridge on home | Portrait 4:5 + landscape 16:9 crops. Japanese register. Warm interior light vs rain-grey. Platform, doubling reflections. |
| 3 | **OG share image crop** — 1200×630 from novel-hero | PENDING (T20) | `<meta property="og:image">` on all pages | Crop swap: current placeholder OG image in `public/og/` to be replaced. Must be 1200×630 px. |
| 4 | **Chapter 1 PDF + hosted link** ("The Night It Started") | PENDING | Kit welcome automation; LettersForm success flow | PDF hosted on Kit or CDN. URL goes into the Kit welcome email (copy doc §1.6.1). |
| 5 | **`hello@mykhanwrites.com` inbox live** | PENDING | Contact form delivery, obfuscated email links in footer + /contact + /screen | Inbox must be live and tested before launch flip. Web3Forms delivers to this address. |
| 6 | **Genuine early-reader quotes** | PENDING | `/novel` reader-quote slot (empty array in `src/data/novel.json`) | Add to `novel.json` quotes[] when available. Do not launch with placeholder or AI quotes. |
| 7 | **TikTok link** (`@mykhanwrites`) | PENDING | Footer social links, `src/data/site.json` | Add URL when account is live. X is reserved — do NOT link. |
| 8 | **Kit account ID / form ID** (`PUBLIC_KIT_FORM_ID`) | PENDING | LettersForm action, Kit embed | Set in `.env` and CI build env when Kit account is live. Tag: `source: mykhanwrites`, `interest: novel-launch`. |
| 9 | **Web3Forms access key** (`PUBLIC_WEB3FORMS_ACCESS_KEY`) | PENDING | ContactForm POST target | Set in `.env` and CI build env when Web3Forms account is live. |
| 10 | **Umami website ID** (`PUBLIC_UMAMI_ID`) | PENDING | Analytics script injection in `<Head>` | Set in `.env` and CI build env. Umami Cloud free tier. Verify all 7 custom events fire. |
| 11 | **Book cover** (final) | PENDING | `/novel` cover image slot; future OG image secondary use | Replace placeholder when final cover art is delivered. |
| 12 | **Crane redesign sign-off** (#10) | PENDING | Favicon (`public/favicon.svg`), Footer, `maintenance.html` | Current crane SVG in `src/components/Crane.astro` is a functional improvement but awaits explicit design sign-off before Phase 5/6 ship. |
| 13 | **`/screen` specifics** — screenplay title, logline, format details | PENDING | `/screen` page content (`src/content/pages/screen.md`, `src/data/screen.json`) | Do not populate until C4 (copyright) is filed. |
| 14 | **US Copyright registration** for the screenplay (C4) | PENDING — HARD BLOCKER | `SCREEN_PUBLISHED` build flag; `.htaccess` `/screen` gate | Gate: do not rebuild with `SCREEN_PUBLISHED=true` or remove the Basic-Auth gate for `/screen` until the Copyright Office confirmation is in hand. |
| 15 | **Author-hero texture / background asset** | PENDING | Homepage hero dark background | Spec: dark charcoal field, optional film-grain texture, warm but restrained. No writer's-desk photo. |

---

## Pre-publish checklist

This checklist **gates the launch flip**. Every item must be checked before proceeding.

### Hard blockers — do not flip without these

- [ ] **C4 — US Copyright for /screen filed** — confirmation in hand; `SCREEN_PUBLISHED` may now be set to `true` in the scoped post-launch `.htaccess` gate.
- [ ] **C5 — Anti-template sign-off** — a human reviewer has confirmed the site does not look AI-generated or templated. Copy is from the copy doc (verbatim, not paraphrased). Design is the locked dusk palette. No generic café-brown clichés, no corporate blue, no placeholder lorem ipsum.
- [ ] **`/screen` Basic-Auth gate** remains active at launch flip (even if the rest of the Basic-Auth gate is removed); restored as a scoped gate protecting `/screen` only. Use the snippet below (copy-paste into `public_html/.htaccess` after C4):

  ```apache
  # ── /screen GATE (post-launch) — password-protect /screen ONLY ──────────────
  # Apply this in public_html/.htaccess AFTER the launch flip, once /screen is
  # built (SCREEN_PUBLISHED=true) and you want it visible to industry contacts
  # only. US Copyright must be filed first (C4 — hard gate).
  # Auth* lines configure the provider; auth only fires where a Require applies,
  # so only /screen (and below) prompts for the password.
  AuthType Basic
  AuthName "MyKhanWrites — /screen preview"
  AuthUserFile "/home/REPLACE_ME/.htpasswd"
  <If "%{REQUEST_URI} =~ m#^/screen(/|$)#">
    Require valid-user
  </If>
  ```

  Alternative: a dedicated `.htaccess` inside the `/screen/` directory on the server with just `AuthType Basic`, `AuthName`, `AuthUserFile`, and `Require valid-user` — no `<If>` needed.

### Pending assets — swap in before launch

- [ ] Author photo swapped in (item #1) — replace placeholder in about page + about preview
- [ ] Novel-hero image swapped in (item #2) — portrait + landscape crops in `/novel` hero
- [ ] OG share image crop (1200×630) swapped in (item #3) — replace `public/og/` placeholder
- [ ] Chapter 1 PDF hosted and Kit welcome email configured (item #4)
- [ ] `hello@mykhanwrites.com` inbox live and tested (item #5)
- [ ] Early-reader quotes added to `src/data/novel.json` quotes[] (item #6) — or explicitly omit the slot at launch
- [ ] TikTok link added to `src/data/site.json` social URLs (item #7) — or omit until account is live
- [ ] `PUBLIC_KIT_FORM_ID` set in build env (item #8); LettersForm tested end-to-end
- [ ] `PUBLIC_WEB3FORMS_ACCESS_KEY` set in build env (item #9); ContactForm tested end-to-end
- [ ] `PUBLIC_UMAMI_ID` set in build env (item #10); all 7 Umami events verified in dashboard
- [ ] Book cover image added (item #11) — or confirm slot is correctly stubbed
- [ ] Crane redesign sign-off received (item #12) — or confirm current crane is approved
- [ ] Crane sign-off on `maintenance.html` SVG (uses same paths as `Crane.astro`)
- [ ] `/screen` content populated (item #13) — only after C4

### Functional checks

- [ ] `npm run check` → 0 errors, 0 warnings
- [ ] `PRELAUNCH=false npm run build` → 0 errors; all 7 pages + 404 emitted; no `dist/screen/`
- [ ] `PRELAUNCH=false SCREEN_PUBLISHED=true npm run build` (post-C4 only) → `dist/screen/` present
- [ ] All 5 routes + 404 match copy doc verbatim (no placeholder text remaining)
- [ ] Slogan "Warm stories with cold corners." appears **once** — home hero only
- [ ] Spoiler-safe: no twist, crane meaning, girl's identity, ending, or "Platform 9" anywhere on site
- [ ] Kit signup tested end-to-end: tag `source: mykhanwrites` applied; welcome email delivers Ch. 1
- [ ] Contact form delivers to `hello@mykhanwrites.com`; spam protection on; obfuscated email renders
- [ ] Umami loads; all 7 custom events fire (verify in Umami dashboard); no cookie banner
- [ ] Maintenance toggle: 503 for public, owner IP passes through
- [ ] `npm run verify:contrast` → passing
- [ ] `axe` run against full-site build (all 5 routes + 404): 0 violations
- [ ] Lighthouse ≥ 90 (Perf / A11y / Best-Practices / SEO) on home + novel
- [ ] `npm run verify:links` → 0 dead internal links
- [ ] SEO tags, OG/Twitter image, sitemap, robots, favicon, JSON-LD present on all pages
- [ ] `sitemap-index.xml` submitted to Google Search Console after launch flip
- [ ] Content lives in `src/content/` + `src/data/` (CMS-ready); empty `/letters` slot reserved, unlinked
- [ ] `robots.txt` swapped to launch version (Allow: / + Sitemap line) at launch flip
- [ ] All `[PENDING]` asset slots are either filled or explicitly stubbed with no broken img/links

### Deployment checks

- [ ] Hostinger SSH access confirmed; upload method (SFTP/Git deploy) tested
- [ ] `.htaccess` at `public_html/.htaccess` includes clean-URL config + caching headers
- [ ] `.htpasswd` lives above `public_html/` (never inside web root)
- [ ] Basic-Auth gate commented out in `.htaccess` after launch flip (except `/screen` scoped gate)
- [ ] HTTPS confirmed (Hostinger SSL active)
- [ ] `maintenance.html` at `public_html/maintenance.html`; 503 toggle tested (enable → disable cycle)
- [ ] Post-deploy spot-checks: `/`, `/novel/`, `/about/`, `/writing/`, `/contact/`, `/404`

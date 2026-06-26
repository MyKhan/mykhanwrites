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

---

<!-- BOARD:START — auto-generated by board/server.mjs from board/tasks.json. Do not edit this section by hand. -->
## 🗂️ Launch board status

_Live mirror of the kanban board · last updated 2026-06-26T09:56:19.493Z · move cards in the board (`node board/server.mjs`) or edit `board/tasks.json` to change this._

**Progress: 2 / 24 done**

### ⬜ To Do (22)
- [ ] **Hostinger access + deploy method** · _Credentials (Decision E)_ — Confirm SSH/SFTP or Git-deploy access and test the upload path for dist/. This is the deploy target. _(Deployment checks — `docs/PENDING_ASSETS.md`)_
- [ ] **Live hello@mykhanwrites.com inbox** · _Credentials (Decision E)_ — Mailbox created, live, and tested. Web3Forms delivers contact submissions here; it's also the obfuscated address shown on /contact, /screen, and the footer. _(asset #5 — `docs/PENDING_ASSETS.md`)_
- [ ] **Kit form id (PUBLIC_KIT_FORM_ID)** · _Credentials (Decision E)_ — Create the Kit account + signup form, set double opt-in, and tags source:mykhanwrites / interest:novel-launch. Put the form id in .env / CI. LettersForm degrades to a disabled 'pending' state until set. _(asset #8 — `docs/PENDING_ASSETS.md`)_
- [ ] **Web3Forms access key (PUBLIC_WEB3FORMS_ACCESS_KEY)** · _Credentials (Decision E)_ — Create the Web3Forms account, point it at the hello@ inbox, set the access key in .env / CI. ContactForm shows a graceful fallback until set. _(asset #9 — `docs/PENDING_ASSETS.md`)_
- [ ] **Umami website id (PUBLIC_UMAMI_ID)** · _Credentials (Decision E)_ — Umami Cloud free tier; add the site, set the id in .env / CI, then verify all 7 custom events fire. Analytics is simply absent until set (no breakage). _(asset #10 — `docs/PENDING_ASSETS.md`)_
- [ ] **File US Copyright for the screenplay (C4)** · _Hard gate_ ⛔ **HARD GATE** — HARD BLOCKER. Do NOT rebuild with SCREEN_PUBLISHED=true or un-gate /screen until the Copyright Office confirmation is in hand. _(asset #14 / Hard blockers — `docs/PENDING_ASSETS.md`)_
- [ ] **Fill /screen specifics (after C4 only)** · _Hard gate_ — Once C4 is filed: fill screen.json logline/synopsis/themes/comps (honest [PENDING] now), screen.md SEO title+description, imdbProUrl, and review screen.bio. Then SCREEN_PUBLISHED=true. _(asset #13 — `docs/PENDING_ASSETS.md`)_
- [ ] **Anti-template visual sign-off (C5)** · _Sign-off_ ⛔ **HARD GATE** — HARD BLOCKER. Eyes-on review at 380 / 768 / 1440 / large widths vs mockups/styleguide.html. Confirm it doesn't look templated/AI-generated; locked dusk palette; copy verbatim. _(C5 / Hard blockers — `docs/PENDING_ASSETS.md`)_
- [ ] **Crane + favicon redesign sign-off** · _Sign-off_ — Approve (or replace) the current crane SVG used in the favicon, footer, and maintenance.html. Functional improvement awaiting your explicit go/no-go. _(asset #12 — `docs/PENDING_ASSETS.md`)_
- [ ] **Live external-link smoke test** · _Pre-launch check_ — Internal links pass (`npm run verify:links`). Before launch, click through the real external links (Instagram, comparemydrafts.com, onlywhenitrains.com, ManTalksMedia) against the live site. _(Functional checks — `docs/PENDING_ASSETS.md`)_
- [ ] **JSON-LD Rich Results validation** · _Pre-launch check_ — Validate the Person (/about) and Book (/novel) JSON-LD with Google's Rich Results Test once the site is reachable. _(phase-12 report — `.superpowers/sdd/phase-12-report.md`)_
- [ ] **/contact?reason=screen browser smoke test** · _Pre-launch check_ — The reason-preselect (I1) fix is code-correct but unverified in a real browser. With a configured Web3Forms key, open /contact?reason=screen and confirm 'Film / screen' is pre-selected after the form hydrates. _(final review — Important #1 — `.superpowers/sdd/final-review-report.md`)_
- [ ] **Author photo** · _Asset_ — Window-lit, muted, authentic. Warm/dark palette. No corporate headshot, no dark-room, no desk. Used on /about hero + homepage About preview. _(asset #1 — `docs/PENDING_ASSETS.md`)_
- [ ] **Novel-hero image (4:5 + 16:9 crops)** · _Asset_ — Japanese commuter-station/café at dusk, cinematic rainy. Portrait 4:5 + landscape 16:9. Warm interior light vs rain-grey; platform, doubling reflections. Used on /novel hero + home Novel bridge. _(asset #2 — `docs/PENDING_ASSETS.md`)_
- [ ] **OG share image crop (1200×630)** · _Asset_ — Crop from the final novel-hero. Replaces the on-brand placeholder in public/og/. Must be exactly 1200×630. _(asset #3 (T20) — `docs/PENDING_ASSETS.md`)_
- [ ] **Chapter 1 PDF + Kit welcome wiring** · _Asset_ — 'The Night It Started' PDF hosted on Kit or a CDN; the URL goes into the Kit welcome automation that delivers on signup. _(asset #4 — `docs/PENDING_ASSETS.md`)_
- [ ] **Early-reader quotes** · _Asset_ — Genuine early-reader quotes only — never placeholder or AI. Add to src/data/novel.json quotes[]; the slot stays empty (no fabrication) until then. _(asset #6 — `docs/PENDING_ASSETS.md`)_
- [ ] **TikTok link (@mykhanwrites)** · _Asset_ — Add the URL to src/data/site.json social links when the account is live. X stays reserved — do NOT link. _(asset #7 — `docs/PENDING_ASSETS.md`)_
- [ ] **Final book cover** · _Asset_ — Replace the placeholder cover slot on /novel when the final cover art is delivered. Possible secondary OG use. _(asset #11 — `docs/PENDING_ASSETS.md`)_
- [ ] **Author-hero texture / background** · _Asset_ — Dark charcoal field, optional restrained film-grain, warm. No writer's-desk photo. Homepage hero dark background. _(asset #15 — `docs/PENDING_ASSETS.md`)_
- [ ] **Decide: plaintext hello@ in fallback copy** · _Decision (deferred minor)_ — site.json web3formsPending / newsletterError embed the raw hello@ address (only shown in the degraded no-key state). Deliberately public, but defeats obfuscation there. Keep as-is, or have me render it obfuscated? _(final review — Minor — `.superpowers/sdd/final-review-report.md`)_
- [ ] **Decide: normalize short label literals** · _Decision (deferred minor)_ — A few short labels live in components rather than data (eyebrow 'Meher Yar Khan · Writer', H1s 'About'/'Contact'/'For industry'). Reviewer: arguably acceptable structural labels. Leave, or move into data for strict all-copy-in-data? _(final review — Minor — `.superpowers/sdd/final-review-report.md`)_

### 🔄 In Progress (0)

_(none)_

### ✅ Done (2)
- [x] **axe accessibility scan — 0 violations** · _Pre-launch check_ — ✅ DONE this session (commit 8be2740): axe ran on all routes + 404 + coming-soon → 0 violations, after fixing 3 real issues (landmark-unique, missing h1 ×2, .ap-photo-label contrast). Re-run: `npm run verify:a11y` (needs a chromedriver matching your Chrome version). _(phase-12 report (axe commands) — `.superpowers/sdd/phase-12-report.md`)_
- [x] **Lighthouse ≥ 90 (Perf / A11y / BP / SEO)** · _Pre-launch check_ — ✅ DONE this session: Lighthouse CI (.lighthouserc.json) → Performance 99, Accessibility 100, Best-Practices 100 on all pages. SEO 100 at launch (66 in prelaunch is ONLY the robots.txt Disallow:/ block — recovers automatically on the launch flip; proven). Re-run: `npm run verify:lh`. _(phase-12 report (Lighthouse) — `.superpowers/sdd/phase-12-report.md`)_

<!-- BOARD:END -->

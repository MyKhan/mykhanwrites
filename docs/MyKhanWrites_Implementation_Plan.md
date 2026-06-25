# MyKhanWrites.com — Implementation Plan

> **For agentic workers:** Steps use checkbox (`- [ ]`) syntax for tracking. Build phase-by-phase, commit at each phase boundary, and verify against the locked design as you go. This plan is the execution contract; the source-of-truth docs (`PRODUCT.md`, `DESIGN.md`, `.impeccable/design.json`, `docs/MyKhanWrites_UI_Kit.md`, `docs/MyKhanWrites_Final_Website_Copy.md`, `docs/MyKhanWrites_Developer_Prompt.md`, `docs/MyKhanWrites_Screenwriting_Roadmap.md`) remain authoritative for anything not spelled out here.

> ⚠️ **Read "Review Triage v1" (below, before the file map) before executing any phase — it contains binding amendments from the independent review (Opus×2 + Sonnet). Where a phase conflicts with a Triage item, the Triage item wins.**

**Goal:** Build `www.mykhanwrites.com` — a calm, literary, fast, *non-templated* author hub for debut novelist Meher Yar Khan whose single job is newsletter signups, with a secondary industry-facing `/screen` brochure.

**Architecture:** Astro (static output) + Tailwind + TypeScript. All copy lives in Astro content collections + `src/data/*.json` (CMS-ready, no rewrite later). Presentational `.astro` components read from that data. Self-hosted Fontsource fonts, CSS-first motion, one tiny IntersectionObserver, Astro View Transitions. Integrations (Kit, Web3Forms, Umami) are wired to read non-secret IDs from `src/data/site.json` and secrets from `.env`, degrading gracefully until real keys land. Output is a static `dist/` uploaded to Hostinger.

**Tech Stack:** Astro (latest) · Tailwind CSS · TypeScript · `@fontsource-variable/fraunces` + `@fontsource/inter` · `@astrojs/sitemap` · Astro `<ClientRouter />` (View Transitions) · Kit Forms · Web3Forms · Umami Cloud.

---

## Global Constraints (every task inherits these — copied from the locked decisions)

- **Stack/output:** Astro + Tailwind + TS; static `astro build` → `dist/`; never build on Hostinger; GitHub for VCS. Minimal JS, CSS-first animation.
- **CMS-ready:** all editable text in `src/content/*` + `src/data/*.json`, never hard-coded in components. Reserve an empty, unlinked `/letters` collection + route.
- **Fonts:** self-host Fraunces + Inter via Fontsource; **no Google Fonts CDN**; preload the display weight.
- **No cookie banner. No exit-intent popups. No pushy interrupts.** The calm is the trust signal.
- **Slogan-Once Rule:** "Warm stories with cold corners." appears exactly once (home hero H1), nowhere else.
- **Spoiler-safe everywhere:** never reveal the twist, the cranes' meaning, the girl's identity, the ending, or "Platform 9."
- **One-Amber Rule:** `#C9A24B` is accent only (links, marks, focus ring, the single primary button per view) — never a large fill. **Raincoat-yellow `#E8C547` is `/novel`-only** — never on the homepage or author surfaces.
- **One primary CTA per view** ("Read the first pages"); everything else is a quiet link.
- **Hero (locked, exact, STATIC — no parallax):** warm light source at **x 16% / y 23%**, warmth reach **93%**, cold shadow occupying the right **~34%**; low vignette + full-screen grain. Primary CTA "Read the first pages" smooth-scrolls to the Letters signup and focuses the email field (option B); "Enter the novel world →" and "Meet the author" are quiet links, not buttons. No book cover in the hero.
- **Homepage IA (locked order):** Header → Hero → Novel bridge → **Letters** → About → **Writing (weighted, CTA-free)** → Footer. Newsletter is the spine — same offer in hero + mid-page + footer.
- **Newsletter:** email-only field; locked microcopy **"A few letters a year. No spam. Unsubscribe anytime."** (see Reconciliation R9).
- **Layout — "calm margins done well":** ~1280px frame, fluid gutters; **text measure capped ~34em (65–75ch)**; **full-bleed atmosphere**; **scale type/spacing up on large screens**; mobile-first.
- **Elevation:** flat — hairlines + tonal layering + grain; hover lifts 2–3px and warms the border. Never pair a 1px border with a soft wide drop shadow (ghost-card tell). Radius 2px (3px images) — no over-rounding. No `border-left/right` >1px colored stripes.
- **A11y/perf:** WCAG **AA** contrast on every new text/bg pair; full keyboard nav; visible **amber focus ring (2px / 3px offset)**; full `prefers-reduced-motion`; ≥44px tap targets; meaningful alt text; **Lighthouse ≥ 90** all four categories.
- **Banned outright:** anything that reads AI-generated/templated; café-brown/coffee-shop clichés; neon/corporate-blue/pastels; cookie banner; exit-intent popups; editorial-magazine costume (drop-caps + broadsheet grid); diagonal repeating-linear-gradient "rain"; glitch/scroll-jacking/typewriter/custom cursor; gradient text; mug-steam hero motion.
- **Copy is verbatim** from `MyKhanWrites_Final_Website_Copy.md` — do **not** rewrite it (exceptions: the two flagged in Open Decisions).
- **`/screen` legal gate:** the page must **not** go live until the screenplay's US Copyright registration is filed. Script is shared on request only — **never a public PDF/download.**

---

## Source-of-truth reconciliations (conflicts I found and how the plan resolves them)

| # | Conflict | Resolution (locked decision wins) |
|---|---|---|
| R1 | UI Kit §3 says container `max-width:1080px`; DESIGN.md §5 + UI Kit §9 say ~**1280** frame with text measure ~34em. | **1280px frame**, full-bleed atmosphere, text column capped **~34em / 65–75ch**. Mockups' 1080 is preview-only. (UI Kit itself: "where they differ, DESIGN.md wins.") |
| R2 | `mockups/homepage.html` uses the **banned** diagonal `repeating-linear-gradient` "rain" (`.ph .rain`). | **Do not use.** Novel scene = real image (pending) over a warm-duotone gradient placeholder; no stripes. |
| R3 | `homepage.html` hero is an **older** version (glow at 78%/18%, faux-parallax `::after`). `styleguide.html` "HERO (locked)" has the exact locked composition. | Port the **styleguide locked hero** (x16%/y23%, reach 93%, cold right ~34%, vignette), full-bleed, static, no parallax. |
| R4 | `homepage.html` puts a **raincoat-yellow** dot in the homepage novel bridge. DESIGN.md Raincoat Rule forbids raincoat-yellow on homepage/author surfaces. | **No raincoat-yellow on the homepage.** Reserve it strictly for `/novel`. |
| R5 | Mockups load **Google Fonts CDN**; spec mandates self-hosted Fontsource (privacy → honest no-banner). | **Fontsource** variable Fraunces + Inter, preload display weight; zero third-party font calls. |
| R6 | Copy doc §1 orders homepage **Writing before About/Letters**; §9 locks **Letters → About → Writing**. | Follow **§9 locked order**: Novel → Letters → About → Writing. |
| R7 | No verbatim `/screen` copy exists in the copy doc (roadmap gives structure only); homepage "Screen — for industry →" teaser is also a new element. | Draft **proposed spoiler-safe copy** with the screenplay's real logline/synopsis/comps left as clearly-marked `[PENDING]` slots (see Open Decision A). |
| R8 | Styleguide `:root` references `--brown` (#8A7358) but doesn't define it; DESIGN.md defines it for eyebrows. | **Define `--brown` token**; hero eyebrow uses brown, section eyebrows use amber (per component). |
| R9 | Copy doc §1.6 microcopy "No spam. Leave whenever you like." vs §9 + build prompt + this session's brief "**A few letters a year. No spam. Unsubscribe anytime.**" | Use the **locked** microcopy "A few letters a year. No spam. Unsubscribe anytime." (confirm — Open Decision C). |
| R10 | Acceptance checklist says "all five pages + 404"; scope now includes **`/screen`** (6 content pages + 404 + reserved `/letters`). | Build all of `/`, `/novel`, `/writing`, `/about`, `/contact`, `/screen`, `/404`, reserved-unlinked `/letters`. |

---

## Review Triage v1 — binding amendments (2026-06-25, from independent Opus×2 + Sonnet review)

**Precedence:** where any phase below conflicts with a Triage item here, **the Triage item wins.** Items marked **(confirm: Meher)** need the author's sign-off before that task ships. A second triage pass will fold in the external Codex review when received. All findings accepted (no rejections; overlaps deduped).

### CRITICAL
- **T1 — Enforce the `/screen` legal gate *technically*, not just in docs (Phase 8/11/13).** A plain `dist/` upload would make `/screen` live immediately. Until US Copyright is filed: (a) `/screen` carries `<meta name="robots" content="noindex,nofollow">`; (b) prefer **not emitting** the page at all behind a `screen.json` `published:false` flag (cleanest), with an `.htaccess` 404 rule (`RewriteRule ^screen/?$ - [R=404,L]`) as belt-and-suspenders; (c) exclude `/screen` from the sitemap until live; (d) render the homepage "Screen — for industry →" teaser conditionally from `screen.json.published`. Pre-publish checklist lifts the gate **only** after copyright is confirmed filed. **(confirm: Meher — copyright filed)**
- **T2 — Add a human "anti-template" review gate (Phase 12).** The cardinal "must not look AI-made/templated" rule currently has zero verification. Add: a designated human (Meher) views the built site at ~380px and ~1280px and explicitly signs off against the DESIGN.md §1/§6 anti-reference list before the Phase 12 commit; record it in the pre-publish checklist. **(confirm: Meher — sign-off)**

### HIGH
- **T3 — Kit uses the hosted form *action*, not a client `fetch` (Phase 10; supersedes "Forms API or styled embed").** Browser `fetch` to Kit from Hostinger static = CORS-blocked, no serverless layer exists. Use a native `<form method="POST" action="https://app.kit.com/forms/{KIT_FORM_ID}/subscriptions">`, styled to match (email-only, locked microcopy), preserving double opt-in. **No Kit key ships** — only `KIT_FORM_ID` in the action URL.
- **T4 — Remove `KIT_API_KEY` from `.env`/config (Phase 0/10).** Unneeded with the form-action path and wrong for static. Keep only `KIT_FORM_ID`. Reassert: secrets via `astro:env/server`; only `PUBLIC_`-prefixed vars reach the client (`PUBLIC_UMAMI_ID` correct; Web3Forms access key is a *public* key, safe client-side).
- **T5 — Tailwind v4 is CSS-first `@theme`, not JS `theme.extend` (Phase 0/1; file map).** v4 + `@tailwindcss/vite` ignores `tailwind.config.mjs` by default. Define tokens in `@theme {}` inside `src/styles/global.css` (after `@import "tailwindcss";`). This **collapses `tokens.css` + `tailwind.config.mjs` into one source** (the `@theme` properties ARE the CSS vars). Drop `tailwind.config.mjs` unless a legacy plugin forces `@config`.
- **T6 — Specify the Kit degraded-UX (Phase 10).** With `KIT_FORM_ID` absent/placeholder, `LettersForm` renders submit **disabled + a visible note** ("Newsletter signup launching soon — check back shortly."), no JS error, no silent dead button. Store the pending-state microcopy in `site.json` (voice-consistent with copy §7); guard via a build-time check on `PUBLIC_KIT_FORM_ID`.
- **T7 — `--brown` (#8A7358) fails AA for eyebrows (Phase 1).** Measured ≈4.18:1 on ink (lower on ink-2/3); the 0.74rem eyebrow does NOT qualify as WCAG "large text." Add a distinct **`--eyebrow`** token (≈`#9A8B7A`+, verify ≥4.5:1 on ink/ink-2/ink-3) for all eyebrows; keep `--brown` only where a pair genuinely clears 4.5:1. Pin in Phase 1; re-verify exact value in Phase 12.
- **T8 — Implement `/contact?reason=screen` pre-selection (Phase 7/8).** Decision D needs a client script: read `new URLSearchParams(location.search).get('reason')` on load and pre-select the matching Reason `<option>`; verify it survives static output and degrades with no param. Without it the "separate industry path" lands a blank form.
- **T9 — Two verbatim-copy exceptions, both explicitly flagged (Phase 3/6).** (1) Microcopy → "A few letters a year. No spam. Unsubscribe anytime." (R9/Decision C). (2) Copy §1.6 body "send you the opening pages **now**" → confirmation-flow wording (Kit double opt-in delivers on confirm, not instantly). Add a Phase 3 task: **override copy §1.6 with these; do NOT use the doc's strings, and do NOT silently edit the copy doc.** (Decision A's `/screen` text is *new copy*, not a verbatim exception.) **(confirm: Meher — both copy changes)**
- **T10 — Render the full Letters spine on `/novel` and `/about` (Phase 7).** The "same offer everywhere" rule means both reuse the `LettersForm` component (email-only + locked microcopy), not a bare "Read the first pages →" link.
- **T11 — Umami acceptance fallback (Phase 13).** §14 "events fire (verify in dashboard)" is untestable pre-account. Substitute: `grep -r 'data-umami-event' dist/` matches `analytics.ts`; mark §14 item 5 "wired, untestable pre-account."

### MEDIUM
- **T12 — Fonts: import roman AND italic (Phase 2).** `@fontsource-variable/fraunces/wght.css` + `…/wght-italic.css` (italic is a separate file; roman-only ⇒ fake synthesized italics = a templated tell). Add `font-optical-sizing: auto` (`opsz` axis); confirm `font-display: swap`.
- **T13 — Precise font preload (Phase 2).** Preload exactly one woff2 (the roman variable face used by the H1) with `rel="preload" as="font" type="font/woff2" crossorigin`; resolve the hashed path at build (import the asset URL); don't preload italic; verify one request per face in the network panel.
- **T14 — Pin clean-URL config for Apache (Phase 0/11/13).** `build: { format: 'directory' }` + `trailingSlash: 'never'`; make `seo.ts` canonicals and `@astrojs/sitemap` agree; `.htaccess` adds `Options -MultiViews`/`DirectoryIndex` and `ErrorDocument 404 /404/index.html` (path per build format).
- **T15 — Lighthouse risk is scroll-repaint/INP, not network (Phase 12; Risks).** The fixed `mix-blend-mode:overlay` grain repaints full-screen on scroll and `blur(26px)` is expensive paint. Mitigate: `pointer-events:none` (planned) + measure mobile INP; consider a baked base64 raster grain if paint is high; consider baking the glow into the gradient stack; set explicit `width`/`height`/`aspect-ratio` on `<Image>` slots (CLS). H1 is LCP (font-bound → reinforces T13).
- **T16 — Concrete spoiler audit (Phase 11).** Alongside the slogan grep, grep built HTML for a `spoiler-banned-strings.txt` set ("Platform 9", "Platform Nine", + the novel's known spoiler terms). Add an explicit spoiler review of `screen.md`: the thriller's details must not echo/decode the novel's unrevealed twist.
- **T17 — Void the styleguide parallax row (Phase 5/9).** `mockups/styleguide.html` §07 still lists "Hero parallax ~12%"; annotate/strike it ("REMOVED — hero is static, R3") so "styleguide is the visual contract" can't be read as licensing parallax.
- **T18 — Concrete link-check (Phase 12).** `linkinator dist/ --recurse` (or `lychee`) against built output; internal 404 = hard fail, external offline = warning.
- **T19 — Specify alt text for all image slots (Phase 3/6/7).** Define homepage NovelBridge placeholder alt and author-photo placeholder alt in `novel.json`/`site.json`, plus the verbatim `/novel` hero alt from copy §7. No empty/placeholder alts in production.
- **T20 — Bind the OG stub to the novel-hero crop (Phase 11; pending #2).** The 1200×630 OG/Twitter image is the rainy-station novel-hero crop (copy §6); mark the stub a temporary stand-in and a hard pre-publish swap.
- **T21 — Footer two-line identity lockup (Phase 4).** Render copy §1.7 as two lines ("© Meher Yar Khan · MyKhanWrites.com" / "Fiction · Screen · Other Worlds"), not a run-on.
- **T22 — Hero vignette uses the design.json full-bleed value (Phase 6).** Use `inset 0 0 240px 72px rgba(4,3,2,.6)` (design.json) for the real full-bleed hero, not the styleguide preview's framed `200px 56px /.5`; keep the styleguide warm/cold percentages. Capture all as named values.
- **T23 — Single-source the 1280 container (Phase 1).** Define container=1280 / measure=34em as one token with an explicit "ignore the 1080 in UI Kit §3 + mockups" note (prevents regression from copying mockups).
- **T24 — Name the `/screen` contact as a deliberate read of "separate" (Phase 8).** It reuses `hello@` + the pre-set form; add a distinct reply-to or Kit-tag suppression so the industry route is operationally separable, and confirm the shared inbox is acceptable. **(confirm: Meher — shared inbox)**

### LOW
- **T25 — Exclude `/letters` (and gated `/screen`) from the sitemap (Phase 11);** keep `robots.txt` + sitemap in agreement.
- **T26 — Cross-link JSON-LD (Phase 11).** Link `Book` ↔ `Person` by `@id`; add `image` once the cover/OG lands; validate via Rich Results in Phase 12.
- **T27 — Add `@astrojs/check` + `typescript` devDeps (Phase 0)** so `astro check` runs on a clean install.
- **T28 — Name the verify toolchain (Phase 12; Decision B).** `@lhci/cli` (Lighthouse vs `dist/` preview), `@axe-core/cli`/`axe-playwright` (a11y), `linkinator`/`lychee` (links), `vitest` (zod schema/content unit checks) — run against built `dist/`.
- **T29 — Extend Lighthouse to `/contact` + `/writing` (Phase 12)**, not just `/ /novel /about /screen`.
- **T30 — Clarify `ScreenTeaser` (Phase 6; file map).** It is a sub-component used inside `WritingRange.astro`; fold it in or mark it as such (no dead file).
- **T31 — Add "Selected Work" framing + IMDbPro to `/screen` (Phase 8)** per Roadmap Phase 2 (growth-oriented container; IMDbPro a pending-but-expected element).

### Needs Meher's confirmation before the relevant task ships
US Copyright filed before `/screen` goes live (T1) · anti-template visual sign-off (T2) · the two copy changes — microcopy + the §1.6 "now"→confirmation body (T9) · acceptance of the shared `hello@` inbox for industry contact (T24).

---

## Review Triage v2 — external Codex pass folded in (2026-06-25)

**Precedence:** v2 supersedes v1 and the phases where they overlap. Codex returned NEEDS-REVISION (12 findings); ~8 reinforce Triage v1 (Kit/CORS T3–T4 — Codex rates CRITICAL; Tailwind `@theme` T5; anti-template gate T2; brown-AA T7; font preload T13; clean URLs T14; grain T15; `/screen` gate T1). Net-new items and conflict resolutions below; all accepted.

### Net-new (V-items)
- **V1 — Footer newsletter spine was MISSED (amends T10).** The locked spine is hero + mid-page + **footer**; v1 only fixed `/novel`+`/about`. Add a **compact, email-only newsletter offer to the site-wide `Footer.astro`** (locked microcopy, same gift framing) so the "same offer, three placements" rule holds. **Suppress it on `/screen`** — the industry funnel must never carry the reader CTA. The small footer heading/label is a copy addition beyond copy §1.7. **(confirm: Meher — footer signup + its wording)**
- **V2 — Content collections need explicit loaders + a real JSON-validation path (amends Phase 3 / `src/content.config.ts`).** Current Astro requires a `loader` per collection and does NOT validate arbitrary JSON just because a schema sits nearby. Specify `glob()` loaders for `src/content/pages` + `letters`; for `src/data/*.json` use either `file()`-loader collections OR a `src/lib/data.ts` that imports each JSON and `z.parse()`s it at build (fail the build on invalid data).
- **V3 — Web3Forms key is PUBLIC build config, not a secret (amends Phase 0/7/10).** The access key is placed in a hidden form field by design. Rename/document as **`WEB3FORMS_ACCESS_KEY`** (public-at-build), not a `.env` secret; when absent, disable submit + show a pending state (mirror the Kit T6 fallback); test the missing-key path.
- **V4 — `<ClientRouter/>` lifecycle + form/scroll edge cases (amends Phase 4/6/9/10).** With View Transitions, inline scripts don't re-run on SPA navigation — reveals, Umami events, and the hero scroll-to-focus will silently break after the first navigation unless bound to **`astro:page-load`**. Initialize ALL client listeners on `astro:page-load`; the hero CTA must work as a **plain `<a href="#letters">` (no-JS fallback)**, JS only enhancing scroll+focus; add `data-astro-reload` (or explicit full-reload handling) on the external Kit/Web3Forms `<form>` posts so the router doesn't hijack submissions; test reduced-motion, focus target, no-JS, and back/forward.

### Conflict resolution + sharpenings
- **T14 RESOLVED → `trailingSlash: 'always'` (not the v1 'never').** With `build.format:'directory'` the served URL is `/about/` and Apache's `DirectorySlash` 301-redirects `/about`→`/about/`; 'always' keeps canonicals + sitemap + Apache all consistent without fragile slash-stripping. Custom 404: Astro special-cases `404.astro` to **`/404.html`** even in directory format → `.htaccess` `ErrorDocument 404 /404.html`; add `Options -MultiViews` + `DirectoryIndex index.html`; deploy-test `/about/`, `/about`, and a missing route.
- **T1 sharpened.** Gate behind a release flag (`screen.json.published`/`SCREEN_PUBLISHED`); add an **acceptance check that `dist/screen/` is NOT emitted while gated** (and `/screen` absent from sitemap + all links).
- **T2 sharpened.** Visual QA at **380 / 768 / 1440 / large**, side-by-side vs `styleguide.html`, running an explicit banned-pattern checklist (ghost-card, café-brown, gradient text, side-stripes, over-round, templated scaffolding) before sign-off.
- **T5 sharpened.** Concrete: `vite: { plugins: [tailwindcss()] }` + `@import "tailwindcss";` + `@theme` tokens; no `tailwind.config.mjs` unless pinning v3.
- **T13 sharpened.** Import the critical Fraunces WOFF2 via Vite **`?url`** (not a hard-coded package path) so the hashed asset is the one preloaded.
- **T15 sharpened.** Prefer a **pre-rendered tiled noise data-URI/raster from the start** (identical opacity/blend) over live `feTurbulence`; gate acceptance on a **mobile Lighthouse trace budget**.
- **T7 sharpened.** Add **automated contrast checks for all token pairs** to the verify suite (T28).

### Updated "needs Meher's confirmation" (adds to the v1 list)
Footer newsletter offer + its wording (V1).

---

## Confirmations locked (2026-06-25, with Meher)

All five open confirmations resolved; binding (supersede any phase/Triage text they touch).

- **C1 — Newsletter copy (T9): APPROVED as proposed.** The two — and only two — verbatim-copy exceptions:
  - **Microcopy** (every newsletter placement): "A few letters a year. No spam. Unsubscribe anytime."
  - **Letters body** (replaces copy §1.6 body): "I'm finishing my first novel. Subscribe and confirm, and I'll send you the opening pages — then the cover, the launch date, and the occasional letter from the desk where the next stories take shape."
  - Unchanged: heading "Read the first pages of *They Only Came When It Rained*"; button "Send me the first pages".
- **C2 — Footer newsletter (V1): COMPACT EMAIL FORM.** Site-wide footer carries a quiet compact signup — lead line "Read the first pages of the novel." + email-only field + "Send me the first pages" button + the locked microcopy. **Rendered on every page EXCEPT `/screen`.** Reuse a `compact` variant of `LettersForm` (same Kit form-action + degraded/pending state).
- **C3 — `/screen` industry contact (T24): SHARED `hello@`.** `/screen` routes to `/contact?reason=screen` (Reason pre-selected) + displays `hello@mykhanwrites.com`; no newsletter on `/screen`; add a distinct reply context/tag so industry mail is separable in the one inbox.
- **C4 — `/screen` gate (T1): NOT FILED → BUILD GATED.** Build `/screen` fully but behind `screen.json.published:false` — not emitted to `dist/`, `noindex`, unlinked, excluded from sitemap, homepage teaser hidden. Acceptance: `dist/screen/` absent while gated. Un-gate only after Meher confirms US Copyright filed.
- **C5 — Anti-template sign-off (T2): Meher gives the final go/no-go at Phase 12** (380/768/1440/large, vs `styleguide.html` + banned-pattern checklist). I self-review each section against the styleguide as I build and flag anything templated. *(Default; tell me if you'd rather delegate the sign-off.)*
- **C6 — Pre-launch gating & coming-soon (locked): COMING-SOON WITH CAPTURE + FULL GIFT.** Pre-launch the public sees only an on-brand coming-soon page that captures signups using the **full gift offer** (Chapter 1 PDF confirmed ready before go-live). The full site is built behind a gate and previewed privately. Driven by a `PRELAUNCH` build flag; shipped as an early, independently-deployable milestone (**M1**) so list-building starts ASAP. Coexists with the C4 `/screen` copyright gate and the post-launch 503 maintenance toggle.

---

## Milestone M1 — Coming-soon, first public deploy (cross-phase)

**Goal:** put a public, on-brand, *capturing* coming-soon page at the domain as early as possible (start list-building — the #1 goal), with the full site built/previewed privately behind a gate. Reuses real components — no throwaway work.

**Bundles a subset of the phases:** Phase 0 (scaffold, `astro.config`, env incl. `PRELAUNCH` + `WEB3FORMS_ACCESS_KEY`) · 1 (tokens/`@theme`) · 2 (fonts) · 3 (`site.json`/`novel.json` + schemas) · 4 (BaseLayout, Head, Grain, footer identity) · 5 (primitives) · 6 (**Hero** + **LettersForm**) · 10 (**Kit** form-action + tags + degraded state) · 11 (minimal SEO: title/desc, OG stub, favicon, robots) · 13 (gate + deploy).

**Net-new tasks:**
- **`PRELAUNCH` flag** (env or `site.json`): `index.astro` branches — `true` → render `ComingSoon.astro`; `false` (launch) → the full homepage. `ComingSoon.astro` = the locked **Hero** + **LettersForm** (full gift copy, C1) + a quiet "The full site is on its way." + footer identity. No nav, no inner sections. Reuses components; nothing discarded.
- **Capture = full gift offer** (Ch.1 PDF confirmed ready): "Subscribe and confirm, and I'll send you the opening pages…" + locked microcopy; Kit double opt-in; tags `source: mykhanwrites` + `interest: novel-launch`. If the PDF ever slips, the Kit degraded/pending state (T6) + a soft welcome line cover it.
- **Gate (`public/.htaccess`).** Recommended single-host model: **the root domain serves only the coming-soon publicly; the rest of the site is Basic-Auth-gated** — allowlist the coming-soon `/` + shared assets (`/_astro/*`, `/fonts/*`, favicon, OG, `robots.txt`); everything else requires the password. `.htpasswd` stored **above** `public_html`, **never committed** (`.htpasswd.example` + README steps). Pre-launch `robots.txt` disallows all + `noindex` so nothing thin gets indexed. *Optional alternative:* put the full site on a Basic-Auth **staging subdomain** (`staging.mykhanwrites.com`) with the coming-soon alone at the root — use this only if you want to show people the full site remotely.
- **Private full-site preview:** `npm run preview` locally throughout the build (the gate doesn't apply locally); staging subdomain optional.
- **Launch flip (one move):** set `PRELAUNCH=false` → rebuild → deploy full `dist/` to root → comment out the Basic-Auth block → add `/coming-soon` → `/` redirect → allow indexing + submit sitemap. Keep the 503 maintenance block (disabled) for future windows.

**Acceptance:** public sees the coming-soon + a working signup (Kit double opt-in); no other route is publicly reachable or indexable; `npm run preview` shows the full site; staging (if used) prompts for the password; the launch flip is verified on a dry run.

---

## File / module map (what gets created and why)

```
mykhanwrites/
├── astro.config.mjs          # site URL, integrations (tailwind, sitemap), ClientRouter
├── tailwind.config.mjs       # theme.extend mirrors the tokens (colors/fonts/spacing/radius/timing/screens)
├── tsconfig.json
├── package.json
├── .env.example              # WEB3FORMS_KEY, KIT_FORM_ID/KIT_API_KEY, PUBLIC_UMAMI_ID (documented, non-live)
├── .gitignore                # node_modules, dist, .env, .astro
├── README.md                 # build/deploy/CMS-later/maintenance/env/events/pending-asset docs
├── public/
│   ├── favicon.svg           # redesigned origami crane
│   ├── favicon.ico
│   ├── robots.txt
│   ├── maintenance.html      # on-brand, inline CSS, crane
│   ├── .htaccess             # maintenance toggle (503 + Retry-After, owner-IP bypass) + caching headers
│   └── og/placeholder-1200x630.png  # PENDING share image stub
├── src/
│   ├── styles/
│   │   ├── tokens.css        # canonical CSS variables (DESIGN.md tokens)
│   │   └── global.css        # base, grain, focus ring, measure cap, reduced-motion, container/section utils
│   ├── data/
│   │   ├── site.json         # nav, footer cols, socials, contact email, CTA labels, integration IDs, launch wording
│   │   ├── novel.json        # title, premise, description, launch, epigraph, atmosphere[], quotes[] (empty)
│   │   ├── writing.json      # fiction/screen/otherworlds blocks
│   │   └── screen.json       # logline, synopsis, themes[], comps[], status, industryContact (PENDING specifics)
│   ├── content.config.ts     # collections: pages (zod), letters (reserved); data schemas via zod
│   ├── content/
│   │   ├── pages/            # home.md, novel.md, writing.md, about.md, contact.md, screen.md (frontmatter + body)
│   │   └── letters/          # reserved empty collection (future on-site blog)
│   ├── lib/
│   │   ├── seo.ts            # title/desc/canonical/OG/Twitter builders
│   │   ├── jsonld.ts         # Person (/about) + Book (/novel) builders
│   │   ├── obfuscate.ts      # email entity/JS obfuscation
│   │   └── analytics.ts      # Umami event-name constants
│   ├── components/
│   │   ├── Head.astro         ├── Header.astro        ├── Footer.astro
│   │   ├── Grain.astro        ├── Crane.astro         ├── Container.astro
│   │   ├── Section.astro      ├── Eyebrow.astro       ├── Reveal.astro
│   │   ├── PrimaryButton.astro├── GhostButton.astro   ├── ArrowLink.astro
│   │   ├── QuietLink.astro    ├── UnderlineLink.astro ├── Card.astro
│   │   ├── Epigraph.astro     ├── Hero.astro          ├── NovelBridge.astro
│   │   ├── LettersForm.astro  (the reused spine)       ├── AboutPreview.astro
│   │   ├── WritingRange.astro ├── ScreenTeaser.astro  ├── AtmosphereStrip.astro
│   │   └── ContactForm.astro
│   ├── layouts/
│   │   └── BaseLayout.astro   # head, ClientRouter, Header, <slot/>, Footer, Grain, Umami
│   └── pages/
│       ├── index.astro  novel.astro  writing.astro  about.astro
│       ├── contact.astro  screen.astro  404.astro  letters.astro (reserved, noindex)
└── tests/                    # data-schema + content unit checks; a11y/Lighthouse run via scripts (see Phase 12)
```

**Component discipline:** many small focused files (high cohesion, low coupling); one responsibility each; the locked CSS from `styleguide.html` is the visual contract for primitives.

---

## Phase 0 — Repo scaffold & tooling

**Depends on:** nothing. **Files:** `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`, `.env.example`, `README.md` (skeleton).

- [ ] Verify current Astro + Tailwind integration approach via official docs (Tailwind v4 is now wired via `@tailwindcss/vite`, not the legacy `@astrojs/tailwind` integration — confirm before installing). Note exact versions used.
- [ ] Scaffold a minimal/empty Astro project in-place (preserve existing `docs/`, `mockups/`, `images/`, `.git`). Add TypeScript (`strict`).
- [ ] Install: Tailwind (current approach), `@astrojs/sitemap`, `@fontsource-variable/fraunces`, `@fontsource/inter`, and dev tooling (`prettier`, `prettier-plugin-astro`).
- [ ] `astro.config.mjs`: set `site: 'https://www.mykhanwrites.com'`, output static, integrations `[sitemap()]` + Tailwind, and import the View Transitions router in the layout (Phase 4).
- [ ] `.gitignore`: `node_modules/`, `dist/`, `.env`, `.astro/`. `.env.example` with all keys (commented, non-live).
- [ ] Confirm `npm run build` produces an empty-but-valid `dist/`. **Commit:** `chore: scaffold Astro + Tailwind + TS project`.

**Acceptance:** clean install, `astro check` + `astro build` succeed; no app code yet beyond the scaffold.
**Risk:** Tailwind v4/v3 + Astro integration churn → resolve by reading current docs first (mitigation above).

---

## Phase 1 — Design tokens (CSS vars + Tailwind theme)

**Depends on:** Phase 0. **Files:** `src/styles/tokens.css`, `src/styles/global.css`, `tailwind.config.mjs`.

- [ ] `tokens.css`: every DESIGN.md token as a CSS variable — surfaces (`--ink`…`--ink-deep`), text (`--parchment`, `--parchment-dim`, `--muted`, `--brown`), accent (`--amber`, `--amber-bright`, `--amber-deep`, `--yellow`), lines (`--line`, `--line-strong`), states (`--success`, `--error`), type (`--serif`, `--sans`), motion (`--ease-out`, `--ease-soft`, `--t-fast/--t/--t-slow/--t-reveal`), `--radius:2px`. (R8: include `--brown`.)
- [ ] `tailwind.config.mjs` → `theme.extend`: colors, `fontFamily` (serif/sans), `fontSize` (display/headline/title/body/lede/label/epigraph clamps from `design.json`), `spacing` (4·8·12·16·24·32·48·64·96·128), `borderRadius` (sm 2px, img 3px, pill 30px), `transitionTimingFunction` (ease-out/ease-soft), `screens` (sm 640 / md 820 / lg 1280).
- [ ] `global.css`: base body (ink bg, parchment text, Inter 300, lh 1.65, antialiased); `.measure { max-width: 34em }`; full-bleed `.atmosphere` helper; `*:focus-visible` amber ring (2px / 3px offset, never removed); `@media (prefers-reduced-motion: reduce)` global resets; `html { scroll-behavior: smooth }` (disabled under reduced-motion).
- [ ] **Commit:** `feat: design tokens + Tailwind theme + global base`.

**Acceptance:** a throwaway test route renders color swatches + the type scale matching `styleguide.html`. **Risk:** AA contrast of `--muted`/`--brown` on `--ink` — measure now; treat eyebrows as large/tracked or bump tone if any pair is <4.5:1 (full audit in Phase 12).

---

## Phase 2 — Fonts (self-hosted Fontsource)

**Depends on:** Phase 0–1. **Files:** `BaseLayout.astro` (font imports), token wiring.

- [ ] Import `@fontsource-variable/fraunces` (with italic axis) + `@fontsource/inter` (300/400/500). `font-display: swap`.
- [ ] Preload the Fraunces variable display weight via `<link rel="preload" as="font" crossorigin>` in `<head>`.
- [ ] Verify **zero** `fonts.googleapis.com` / `gstatic.com` references anywhere (grep the build output).
- [ ] **Commit:** `feat: self-hosted Fraunces + Inter via Fontsource`.

**Acceptance:** fonts render offline; network panel shows no third-party font calls.

---

## Phase 3 — Content model (collections + data)

**Depends on:** Phase 0. **Files:** `src/content.config.ts`, `src/data/*.json`, `src/content/pages/*.md`, `src/content/letters/` (empty).

- [ ] `content.config.ts`: define a `pages` collection (zod: `title`, `description`, `ogImage?`, optional structured fields) and a reserved `letters` collection. Define zod schemas validating `site.json`, `novel.json`, `writing.json`, `screen.json`.
- [ ] Populate `site.json` (nav: Home/Novel/Writing/About; footer Read/Elsewhere/Follow/Contact columns; socials — Instagram linked, **TikTok + X stubbed/unlinked**; `hello@mykhanwrites.com`; CTA labels; launch "Coming August 2026."; integration IDs as empty/placeholder).
- [ ] Populate `novel.json`, `writing.json` with **verbatim** copy (copy doc §2–3). `novel.quotes: []` (empty — never fabricate).
- [ ] Populate `screen.json` per Open Decision A (structure now; specifics `[PENDING]`).
- [ ] Author page bodies in `src/content/pages/*.md` (verbatim copy) so a future CMS edits these files directly.
- [ ] **Commit:** `feat: CMS-ready content collections + site/novel/writing/screen data`.

**Acceptance:** schema validation passes; copy in data matches the copy doc exactly (Slogan-Once preserved; locked microcopy R9).

---

## Phase 4 — Base layout & chrome

**Depends on:** Phase 1–3. **Files:** `BaseLayout.astro`, `Head.astro`, `Header.astro`, `Footer.astro`, `Grain.astro`, `Crane.astro`, `Container.astro`, `Section.astro`, `Eyebrow.astro`.

- [ ] `BaseLayout.astro`: `<head>` via `Head.astro`; `<ClientRouter />` for View Transitions; Umami script (reads `PUBLIC_UMAMI_ID`, **no cookie banner**); slots Header / page / Footer / Grain.
- [ ] `Header.astro`: sticky blurred ink, hairline bottom, wordmark "Meher Yar Khan", nav (Home · Novel · Writing · About), underline-draw hover, mobile collapse <640px, keyboard-accessible.
- [ ] `Footer.astro`: deepest ink `#100D0B`, hairline top, identity line "© Meher Yar Khan · MyKhanWrites.com / Fiction · Screen · Other Worlds", columns (Read / Elsewhere / Follow / Contact), **obfuscated** email, crane mark. Instagram linked; TikTok/X not linked.
- [ ] `Grain.astro`: fixed full-screen `feTurbulence` overlay, opacity ~.06, `mix-blend:overlay`, `pointer-events:none`.
- [ ] `Crane.astro`: redesigned **clean origami crane** mark (replace the unclear placeholder path) — favicon + footer only, never hero. Flag as `[PENDING redesign sign-off]` but ship a recognizable improvement.
- [ ] `Container.astro` (1280 frame, fluid gutters, capped measure), `Section.astro` (padding clamp(72px,10vh,132px), hairline top), `Eyebrow.astro`.
- [ ] **Commit:** `feat: base layout, header, footer, grain, crane, View Transitions`.

**Acceptance:** every route inherits consistent chrome; nav is keyboard-navigable with visible amber focus; footer links resolve or are honestly stubbed.

---

## Phase 5 — Primitive components

**Depends on:** Phase 1, 4. **Files:** `PrimaryButton`, `GhostButton`, `ArrowLink`, `QuietLink`, `UnderlineLink`, `Card`, `Epigraph`, `Reveal`.

- [ ] Port the locked CSS from `styleguide.html` for each primitive (button lift+brighten, underline-draw 280ms, card hover warm-border+lift, epigraph amber left-rule). Enforce **one primary button per view** by convention/prop.
- [ ] `Reveal.astro`: wrapper applying the `.reveal`→`.in` IntersectionObserver pattern (once, 900ms, translateY 18px→0); no-ops under reduced-motion.
- [ ] **Commit:** `feat: button/link/card/epigraph/reveal primitives`.

**Acceptance:** a primitives preview route visually matches `styleguide.html`.

---

## Phase 6 — Homepage (locked hero + sections, IA order)

**Depends on:** Phase 4–5. **Files:** `pages/index.astro`, `Hero.astro`, `NovelBridge.astro`, `LettersForm.astro`, `AboutPreview.astro`, `WritingRange.astro`, `ScreenTeaser.astro`.

- [ ] `Hero.astro`: **exact** locked gradient stack ported from `styleguide.html` (layered `linear-gradient` cold-right + `radial-gradient` warm at 16%/23% reach 93% + vignette `inset` shadow + blurred warm glow node), **full-bleed** atmosphere. Content: eyebrow "Meher Yar Khan · Writer" (brown) → H1 "Warm stories with cold corners." (the only slogan instance) → lede → italic novel cue (amber novel title) → range line → CTA row: **primary** "Read the first pages" (smooth-scroll to `#letters` + focus the email field, JS guarded by reduced-motion), **quiet** "Enter the novel world →" (→ onlywhenitrains.com), **quiet** "Meet the author" (→ /about). Static — **no parallax**. No book cover.
- [ ] `NovelBridge.astro`: label "The first novel", italic title, verbatim premise, "Coming August 2026", "Read about the novel →" (→ /novel). Image slot = warm-duotone gradient placeholder (**no rain stripes — R2; no raincoat-yellow — R4**), with a reserved **cover slot** for later.
- [ ] `LettersForm.astro` (the spine): heading + body verbatim; **email-only** field; button "Send me the first pages"; locked microcopy "A few letters a year. No spam. Unsubscribe anytime." `id="letters"`; field is the hero's focus target. (Kit wiring in Phase 10.)
- [ ] `AboutPreview.astro`: label "The author", photo slot `[PENDING]`, verbatim teaser (carries the shipped-tool trust fact), "Meet the author →".
- [ ] `WritingRange.astro` (**weighted, CTA-free**): Fiction large, Screen smaller, "Other worlds" single line; "See the writing →" link; plus the quiet **"Screen — for industry →"** teaser (→ /screen) tied to the duality theme — never a competing button.
- [ ] `index.astro` assembles **locked IA**: Header → Hero → NovelBridge → **LettersForm** → AboutPreview → **WritingRange** → Footer (R6).
- [ ] **Commit:** `feat: homepage — locked hero + novel/letters/about/writing sections`.

**Acceptance:** matches the locked hero composition; slogan appears once; IA order correct; primary-CTA scroll-and-focus works; mobile hero text-first and legible at ~380px.

---

## Phase 7 — Remaining content pages

**Depends on:** Phase 4–6. **Files:** `pages/novel.astro`, `writing.astro`, `about.astro`, `contact.astro`, `404.astro`, `letters.astro`; `AtmosphereStrip.astro`, `ContactForm.astro`.

- [ ] `/novel`: rich hero (PENDING Japanese-register image → duotone gradient + vignette placeholder; **raincoat-yellow tiny accent allowed here only**), title/launch/epigraph (verbatim), "What it's about", "The feeling" (comps, **no genre label**), `AtmosphereStrip` (the 5 fragments, surface-only), empty reader-quote slot (no fabrication), CTAs (Letters + "Enter the novel world →"), content note. Reserved cover slot. **Book** JSON-LD.
- [ ] `/writing`: weighted Fiction / Screen / Other worlds (verbatim); "Other worlds" links to onlywhenitrains.com; no project titles.
- [ ] `/about`: photo slot `[PENDING]`, fact-first bio + first-person "A note from me" (verbatim), tool mention → comparemydrafts.com, CTAs (Letters + "Read about the novel →"). **Person** JSON-LD.
- [ ] `/contact`: confident copy; `ContactForm.astro` (Name · Email · Reason select [Reader note · Publishing/rights · **Film/screen** · Collaboration · Media/commercial · Other] · Message); honeypot; obfuscated email; success/error microcopy (copy doc §7). (Web3Forms POST in Phase 10.)
- [ ] `/404`: "This page took the last train out. Head back home →".
- [ ] `/letters`: reserved route, `noindex`, **unlinked**, minimal placeholder (future on-site blog home).
- [ ] **Commit:** `feat: novel, writing, about, contact, 404, reserved letters pages`.

**Acceptance:** all pages spoiler-safe; raincoat-yellow only on `/novel`; reason select includes Film/screen; reserved `/letters` is unlinked + noindex.

---

## Phase 8 — `/screen` (industry brochure, separate funnel)

**Depends on:** Phase 4–5, 7; Open Decision A. **Files:** `pages/screen.astro`, `src/data/screen.json`, `src/content/pages/screen.md`.

- [ ] Build the topic-based brochure: logline · short synopsis · themes · comparables ("in the vein of X meets Y") · status "completed feature — seeking representation" · bio **leading with the novel credential** · IMDbPro link slot · a **separate industry contact path** (Open Decision D). **Script on request — never a public PDF/download.**
- [ ] **No newsletter CTA** here (reader and industry funnels never compete on one surface).
- [ ] Copy per Open Decision A: proposed spoiler-safe draft with the screenplay's real logline/synopsis/comps as clearly-marked `[PENDING]` slots for Meher.
- [ ] Add a prominent **launch gate** note in README + pending register: `/screen` must not be published live until **US Copyright registration is filed** (Roadmap Phase 0).
- [ ] **Commit:** `feat: /screen industry brochure (gated, script-on-request)`.

**Acceptance:** no public script link; separate contact path; bio leads with the novel; homepage teaser already points here; copyright gate documented.

---

## Phase 9 — Motion

**Depends on:** Phase 5–8. **Files:** `Reveal.astro`, `global.css`, hero intro CSS, `BaseLayout.astro`.

- [ ] Scroll reveals (IntersectionObserver, once, 900ms, translateY 18px). Hero intro staggered fade-settle (eyebrow→H1→lede→cue→CTAs, ~80ms apart, CSS). Link underline-draw 280ms. Button hover lift 2px + brighten. View Transitions crossfade (~320ms) via `<ClientRouter />`.
- [ ] **No parallax** anywhere. Full `prefers-reduced-motion`: disable reveals/intro/transitions/smooth-scroll → final states.
- [ ] **Commit:** `feat: refined CSS-first motion + reduced-motion fallbacks`.

**Acceptance:** motion is "felt more than noticed"; reduced-motion shows complete final states with no animation.

---

## Phase 10 — Integrations (Kit · Web3Forms · Umami)

**Depends on:** Phase 6–7. **Files:** `LettersForm.astro`, `ContactForm.astro`, `BaseLayout.astro`, `src/lib/analytics.ts`, `.env.example`, `src/data/site.json`.

- [ ] **Kit:** email-only signup posting to Kit (Forms API or styled embed), tags `source: mykhanwrites` + `interest: novel-launch`, **double opt-in**. Document that the welcome automation = the Chapter 1 gift, with the confirmation email's button framed as the gift ("Get my first pages"). Reads `KIT_FORM_ID`; degrades gracefully (clearly "pending") with no real key. Success/error states from copy doc §7.
- [ ] **Web3Forms:** contact POST with access key (env) + honeypot; success/error microcopy.
- [ ] **Umami:** site-wide script (no banner) + `data-umami-event` on: `hero-read-first-pages`, `newsletter-submit`, `novel-site-outbound`, `contact-submit`, `email-click`, `writing-tool-outbound`, `mantalksmedia-outbound`.
- [ ] **Commit:** `feat: Kit + Web3Forms + Umami wiring (env-driven, graceful without keys)`.

**Acceptance:** forms render and submit-path is wired; events tagged; build succeeds with placeholder keys; no cookie banner. (Full live E2E deferred until real accounts — see Risks.)

---

## Phase 11 — SEO / structured data / favicon / share

**Depends on:** Phase 4, 6–8. **Files:** `Head.astro`, `src/lib/seo.ts`, `src/lib/jsonld.ts`, `public/robots.txt`, `public/favicon.svg`, `public/og/*`.

- [ ] Per-page `<title>` + meta description (verbatim copy doc §6); canonical URLs; OG + Twitter `summary_large_image` (PENDING share image → 1200×630 stub with note). Sitemap via `@astrojs/sitemap`; `robots.txt`; favicon from the crane mark.
- [ ] JSON-LD: **Person** on `/about`, **Book** on `/novel` (`name`, `author`, `inLanguage`, `datePublished` 2026-08, genre omitted/general).
- [ ] Slogan-Once audit: grep the built HTML to confirm the slogan string appears only on the home hero.
- [ ] **Commit:** `feat: SEO meta, OG/Twitter, sitemap, robots, favicon, JSON-LD`.

**Acceptance:** valid structured data; sitemap/robots present; share tags reference the stub; slogan grep passes.

---

## Phase 12 — Accessibility + performance pass (verification)

**Depends on:** all prior. **Files:** as needed for fixes; `tests/` + CI scripts.

- [ ] Run axe (zero violations). Verify full keyboard nav + visible amber focus ring on every interactive element.
- [ ] **AA contrast audit** of every text/bg pair (including text-over-image scrims, `--muted`/`--brown` eyebrows, parchment-dim ledes). Fix any <4.5:1 (or treat as large text only where genuinely large).
- [ ] Verify `prefers-reduced-motion`, ≥44px tap targets, meaningful alt text (novel-hero alt from copy §7), responsive from 380px → large screens (type/spacing scale up; measure stays capped).
- [ ] Build, then run Lighthouse on the preview for `/`, `/novel`, `/about`, `/screen`; achieve **≥90** in all four categories. Watch LCP/CLS with the grain overlay + large gradients; keep effects CSS, lazy-load images.
- [ ] Data-schema + key content unit checks per Open Decision B.
- [ ] **Commit:** `test: a11y + Lighthouse pass + fixes`.

**Acceptance:** axe clean; AA verified; Lighthouse ≥90×4; reduced-motion correct.

---

## Phase 13 — Deploy runbook + maintenance + README

**Depends on:** Phase 12. **Files:** `README.md`, `public/maintenance.html`, `public/.htaccess`, optional `.github/workflows/`.

- [ ] README: build (`npm install` → `npm run build` → `dist/`); Hostinger upload (SFTP/SSH or Git deploy) to `public_html`; HTTPS, pretty URLs, caching headers for `/_astro/*` + images, custom 404; env setup; the Umami event list; **CMS-later** note (point Decap/Sveltia/Tina at `src/content` + `src/data`, add build webhook).
- [ ] `maintenance.html` (on-brand, inline CSS, crane) + `.htaccess` maintenance toggle (503 + Retry-After, owner-IP bypass), **disabled by default**, + caching headers.
- [ ] Pending-asset register + pre-publish checklist (including the `/screen` copyright gate). Optional GitHub Action to build (deploy step left manual until creds exist).
- [ ] Run the Developer Prompt §14 acceptance checklist end-to-end; record results.
- [ ] **Commit:** `docs: deploy runbook, maintenance toggle, README, acceptance checklist`.

**Acceptance:** a fresh reader can build + deploy from the README; maintenance toggle documented; acceptance checklist passes (minus genuinely pending assets, which are listed).

---

## Dependencies (critical path)

Phase 0 → 1 → (2, 3 parallel) → 4 → 5 → 6 → (7, 8 parallel) → 9 → 10 → 11 → 12 → 13. Tokens (1) gate everything visual; content model (3) gates pages; primitives (5) gate sections; integrations (10) and SEO (11) can overlap once pages exist.

## Risks & mitigations

- **Tailwind/Astro integration churn** → read current official docs before installing; pin versions.
- **Astro Content Layer (v5) syntax** for collections/data → verify against current docs in Phase 3.
- **Kit Forms API / double opt-in** can't be fully E2E-tested without a live account → wire env-driven, document the dashboard automation, defer live verification to when keys land.
- **Lighthouse ≥90 with grain + large gradients** (paint/LCP cost) → CSS-only effects, lazy images, measure on real preview, trim gradient layers if needed.
- **AA contrast** of muted/brown eyebrows on ink → audit early (Phase 1) and at Phase 12; adjust tone or size.
- **`/screen` legal gate** → page stays unpublished until US Copyright filed; documented as a hard launch blocker.
- **No real assets/keys at build time** → every PENDING item stubs gracefully with **no broken links/images**.

## Pending-asset register (stub honestly — no broken links at launch)

1. Author photo (window-lit, muted) → `/about` + homepage About preview.
2. Final novel hero image (Japanese register) + 4:5, 16:9, and 1200×630 OG crops → `/novel` + share.
3. Author-hero texture/background (hero is typographic; optional).
4. Chapter 1 PDF ("The Night It Started") + hosted link → Kit welcome email. **Confirmed ready before coming-soon go-live (C6) → coming-soon uses the full gift offer.**
5. `hello@mykhanwrites.com` inbox live → contact + Kit reply-to.
6. Early-reader quote(s) → `/novel` slot (leave empty; never fabricate).
7. TikTok link → footer (X reserved — do not link).
8. Account IDs: Kit form/API, Web3Forms key, Umami website-id.
9. Book cover (subscriber reward) → reserved cover slot only — never the hero.
10. Crane mark redesign sign-off (clean origami) → favicon/footer.
11. `/screen` copy specifics (logline/synopsis/comps) **and** US Copyright registration filed before `/screen` goes live.
12. CONFIRM: tool name "Compare My Drafts"; launch wording "Coming August 2026"; Letters microcopy variant (R9).

## Confirmed decisions (resolved with Meher, 2026-06-25)

- **A — `/screen` copy → CONFIRMED:** I draft proposed, spoiler-safe `/screen` copy (logline/synopsis/themes/comps/status) for review, with the screenplay's real specifics left as clearly-marked `[PENDING]` slots Meher fills.
- **B — Verification rigor → CONFIRMED:** pragmatic for a static content site — build/`astro check` + axe a11y + Lighthouse ≥90 + link-check + zod data-schema tests + a few content/JSON-LD unit checks. **Not** blanket 80% unit coverage on presentational `.astro` (YAGNI; supersedes the standing global testing rule for this project).
- **C — Letters microcopy (R9) → CONFIRMED:** use the locked **"A few letters a year. No spam. Unsubscribe anytime."** everywhere the newsletter appears.
- **D — `/screen` industry contact → CONFIRMED:** reuse the contact form pre-set to "Film/screen" (`/contact?reason=screen`, Reason dropdown pre-selected) + the displayed `hello@`.
- **E — Scope endpoint (assumed):** deliver a production-ready static build + full deploy runbook + maintenance toggle. An actual live Hostinger push is **out of scope** until Meher provides credentials, a live `hello@` inbox, and the Kit/Web3Forms/Umami account IDs.

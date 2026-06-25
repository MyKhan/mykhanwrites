# mykhanwrites.com

A calm, literary author hub for Meher Yar Khan — debut novelist of *They Only Came When It Rained* (August 2026).

**Stack:** Astro (static) · Tailwind CSS v4 · TypeScript · Deployed to Hostinger (Apache)

---

## Quick start

```bash
npm install
npm run dev        # Vite dev server — hot reload; .htaccess NOT enforced locally
npm run preview    # Preview the production build locally (Basic-Auth gate does not apply)
npm run check      # TypeScript + Astro type-check (0 errors/warnings required)
npm run test       # Vitest unit tests
```

---

## Environment variables

All environment variables are set at **build time** — they are baked into the static HTML and never exposed at runtime beyond what appears in the page source.

| Variable                        | Required    | Default    | What it does |
|---------------------------------|-------------|------------|--------------|
| `PRELAUNCH`                     | Yes         | `true`     | `true` → homepage renders the coming-soon/capture page. `false` → homepage renders the full author home. **Safe default: always `true` unless you're doing a launch flip.** |
| `SCREEN_PUBLISHED`              | No          | `false`    | `true` → the `/screen` route is built into `dist/` and publicly accessible. `false` → the route is suppressed at build time (no `dist/screen/` directory emitted). **Do NOT set to `true` until US Copyright is filed (C4 — hard blocker).** |
| `PUBLIC_KIT_FORM_ID`            | No          | _(empty)_  | Kit (ConvertKit) form ID. When absent, the LettersForm submit button is disabled and a "coming soon" notice renders instead. |
| `PUBLIC_WEB3FORMS_ACCESS_KEY`   | No          | _(empty)_  | Web3Forms access key for the contact form. When absent, the ContactForm shows a "pending" state — the form fields render but submission is disabled. |
| `PUBLIC_UMAMI_ID`               | No          | _(empty)_  | Umami site ID (website UUID). When absent, the Umami analytics script is omitted from the HTML entirely — no tracking. |

**Store in `.env` (never commit):**

```bash
# .env — gitignored
PRELAUNCH=true
SCREEN_PUBLISHED=false
PUBLIC_KIT_FORM_ID=your_kit_form_id_here
PUBLIC_WEB3FORMS_ACCESS_KEY=your_web3forms_key_here
PUBLIC_UMAMI_ID=your_umami_website_uuid_here
```

A `.env.example` is committed showing variable names with empty values. Copy it to `.env` and fill in the real values.

---

## Analytics — Umami events

Umami is used for **cookieless, privacy-preserving** analytics (no cookie banner required). The Umami script is injected when `PUBLIC_UMAMI_ID` is set.

Custom events are tracked via `data-umami-event` attributes in the static HTML. The full event list (single source of truth: `src/lib/analytics.ts`):

| Event name                  | Where it fires |
|-----------------------------|----------------|
| `hero-read-first-pages`     | Hero primary CTA → "Read the first pages" (anchors to #letters) |
| `newsletter-submit`         | LettersForm submit button (all variants: full, compact, coming-soon) |
| `novel-site-outbound`       | Any "Enter the novel world →" link → onlywhenitrains.com |
| `contact-submit`            | ContactForm submit button |
| `email-click`               | Obfuscated hello@ email links (footer, /contact, /screen) |
| `writing-tool-outbound`     | "Compare My Drafts" links → comparemydrafts.com |
| `mantalksmedia-outbound`    | ManTalksMedia links → mantalksmedia.com |

No cookie banner needed. Umami Cloud's free tier is used. Verify events fire by watching the Umami dashboard in real time.

---

## Build

```bash
# Prelaunch build (coming-soon only):
PRELAUNCH=true npm run build

# Full-site build (after launch flip):
PRELAUNCH=false npm run build

# Full site + /screen visible (only after C4 copyright filed):
PRELAUNCH=false SCREEN_PUBLISHED=true npm run build
```

Output: `dist/` — upload the entire contents to `public_html/`.

The **gated prelaunch build** (default) emits **no `dist/screen/`** directory — confirmed by `ls dist/screen/` returning nothing. `SCREEN_PUBLISHED` defaults to `false`.

---

## M1 Deploy Runbook — Prelaunch

This runbook deploys the **prelaunch state**: only `/` (coming-soon) is publicly visible. Everything else is password-protected by the Apache Basic-Auth gate in `.htaccess`.

### 1. Set env vars and build

```bash
npm install
PRELAUNCH=true npm run build
# Emits static site to dist/
```

### 2. Upload dist/ to Hostinger

Upload the entire contents of `dist/` to `public_html/` on the Hostinger server.
Method: SFTP, SSH, or Hostinger's Git deploy integration.

The `.htaccess` file in `dist/` must be present at `public_html/.htaccess`.
(Some FTP clients hide dotfiles — confirm the upload includes `.htaccess`.)

### 3. Gate setup — create .htpasswd ABOVE public_html

The `.htpasswd` file MUST live above `public_html`. It must NEVER be inside the web root (it would be publicly downloadable). NEVER commit `.htpasswd` to git.

```bash
# SSH into the Hostinger server, then:
htpasswd -c /home/YOUR_USERNAME/.htpasswd preview
# Enter a strong password when prompted.
```

Then update the `AuthUserFile` line in `public_html/.htaccess` with the real absolute path:

```apache
AuthUserFile "/home/YOUR_USERNAME/.htpasswd"
```

See `public/.htpasswd.example` for the file format and generation instructions.

### 4. Verify post-deploy

- Visit `https://www.mykhanwrites.com/` — the coming-soon page loads without a password.
- Visit `https://www.mykhanwrites.com/about/` — browser prompts for the password.
- Visit `https://www.mykhanwrites.com/_astro/` — assets load (they render `/`).
- Visit `https://www.mykhanwrites.com/robots.txt` — returns the Disallow-all prelaunch version.
- `npm run preview` locally shows the coming-soon at `/` (`.htaccess` is Apache-only — not enforced locally; that is expected).

---

## Clean URLs / pretty URLs

The build uses `format: 'directory'` + `trailingSlash: 'always'`:

- `/about` → served from `/about/index.html`
- Apache's `DirectorySlash` module auto-301s `/about` → `/about/` (no manual slash-stripping rules — they fight `DirectorySlash` and break SEO)
- The `ErrorDocument 404 /404.html` directive serves the flat 404 page (Astro emits `404.html`, not `/404/index.html`)

No extra rewrite rules are needed beyond what is in `public/.htaccess`.

---

## Caching headers

Configured in `public/.htaccess` via `mod_expires` + `mod_headers`:

| Asset type | Cache-Control | Rationale |
|------------|---------------|-----------|
| `/_astro/*.js`, `*.css`, `*.woff2` | `public, max-age=31536000, immutable` (1 year) | Content-hashed — filename changes on rebuild |
| `*.png`, `*.jpg`, `*.webp`, `*.avif`, `*.svg` | `public, max-age=2592000` (30 days) | OG images + static assets change rarely |
| `*.html` | `no-cache, no-store, must-revalidate` | HTML pages re-fetched on every visit so deploys propagate instantly |

Both modules are guarded with `<IfModule>` — the site works without them, just without caching optimisation.

---

## Custom 404

Astro emits `/404.html` (flat, not a directory). Apache is configured with:

```apache
ErrorDocument 404 /404.html
```

The 404 page uses the full site layout and the on-brand 404 copy from the copy doc §7.

---

## Launch-Flip Runbook

Run this checklist when ready to go fully public. Do NOT flip until all hard blockers are satisfied.

### Hard blockers before flip

- [ ] Hostinger creds + SSH access configured
- [ ] Live `hello@mykhanwrites.com` inbox confirmed and tested
- [ ] Kit form ID confirmed (`PUBLIC_KIT_FORM_ID`)
- [ ] Web3Forms access key confirmed (`PUBLIC_WEB3FORMS_ACCESS_KEY`)
- [ ] Umami site ID confirmed (`PUBLIC_UMAMI_ID`)
- [ ] **`/screen` US Copyright filed (C4) — HARD BLOCKER** — see section below
- [ ] Anti-template sign-off complete (C5) — no AI-generated or templated feel
- [ ] All PENDING assets from the register below swapped in
- [ ] `axe` + Lighthouse ≥ 90 run against the full-site build
- [ ] `npm run verify:contrast` passing

### Flip steps

1. Set `PRELAUNCH=false` in your build environment.
2. Run `npm run build` — the full site is emitted to `dist/`.
3. Upload the new `dist/` to Hostinger `public_html/` (overwrite).
4. In `public_html/.htaccess`, **comment out the entire Basic-Auth gate block** — from `AuthType Basic` through the last `SetEnvIf` line. The caching and clean-URL blocks stay active.
5. **Swap `robots.txt`** to the launch version:
   ```
   User-agent: *
   Allow: /

   Sitemap: https://www.mykhanwrites.com/sitemap-index.xml
   ```
   (The launch version is shown as a comment in `public/robots.txt`.)
6. Submit the sitemap to Google Search Console: `https://www.mykhanwrites.com/sitemap-index.xml`

### /screen — Hard Blocker (C4)

**`/screen` must NOT be publicly accessible until the US Copyright registration for the screenplay is filed (Confirmation C4).** This is a hard blocker — do not remove the Basic-Auth gate for `/screen` at launch flip.

After C4 is complete: restore a scoped `.htaccess` gate protecting `/screen` only, rebuild with `SCREEN_PUBLISHED=true`, then make the rest of the site public.

**Copy-pasteable snippet — paste into `public_html/.htaccess` after C4:**

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

Alternative: place a dedicated `.htaccess` inside the `/screen/` directory on the server containing just `AuthType Basic`, `AuthName`, `AuthUserFile`, and `Require valid-user` — no `<If>` needed since a directory `.htaccess` already scopes to that directory and below.

---

## Maintenance mode

An on-brand `maintenance.html` lives at `public/maintenance.html` (copied to `public_html/maintenance.html` on deploy). It is **fully self-contained** — inline CSS only, no external assets — so it renders correctly during a 503 when the rest of the site is unavailable.

The `.htaccess` 503 toggle is in `public/.htaccess` under the "MAINTENANCE MODE" section. It is **commented out (DISABLED) by default** — the site serves normally until you explicitly enable it.

**To enable maintenance mode:**

1. Open `public_html/.htaccess` on the server (or `public/.htaccess` before your next build).
2. Find the `--- MAINTENANCE MODE ---` block.
3. Uncomment every line in the block (remove the leading `#`).
4. Replace `0\.0\.0\.0` with your real public IP (find it: `curl https://checkip.amazonaws.com`).
5. Upload the updated `.htaccess` — maintenance mode is immediately active.

**To disable maintenance mode:** re-comment the block (add `#` back) and re-upload `.htaccess`.

When enabled, all visitors receive `maintenance.html` with HTTP 503 + `Retry-After: 3600`. Your IP bypasses the redirect and sees the live site. The Basic-Auth gate remains independent and intact.

---

## HTTPS

Hostinger provides a free Let's Encrypt SSL certificate. Enable it in the hPanel under **SSL/TLS** — it takes effect within a few minutes.

Force HTTPS site-wide using Hostinger's built-in **Force HTTPS** toggle (recommended, found in hPanel → Hosting → Manage → Security). Alternatively, add a redirect in `public_html/.htaccess`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTPS} off
  RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>
```

Confirm HTTPS is active in the post-deploy spot-checks (see Deployment Checks in `docs/PENDING_ASSETS.md`).

---

## Verify toolchain

```bash
npm run verify:contrast    # Colour contrast audit (automated; no browser needed)
npm run verify:links       # Dead-link scan of dist/ (needs npm run build first)
npm run verify:lh          # Lighthouse CI (needs a headless Chrome / CI environment)
npm run verify:a11y        # axe accessibility scan (needs: build + npm run preview running)
npm run verify:a11y:screen # axe against /screen (needs SCREEN_PUBLISHED=true build + preview)
```

`verify:lh` and `verify:a11y` require a headless browser. Run them in CI (GitHub Actions) or locally with Chrome installed and `npm run preview` active in a separate terminal.

Minimum targets: Lighthouse ≥ 90 (Perf/A11y/Best-Practices/SEO) · WCAG AA contrast on all text.

---

## CMS-later note

The site is already CMS-shaped — no refactor needed to add a headless CMS later:

- **All editable text** lives in `src/content/pages/*.md` (Astro content collections) and `src/data/*.json`.
- **Global config** (nav, footer, CTA labels, social URLs, IDs): `src/data/site.json`
- **Novel data** (title, premise, description, epigraph, atmosphere, quotes[]): `src/data/novel.json`
- **Writing range** (fiction/screen/other descriptions): `src/data/writing.json`
- **Screen/screenplay** content: `src/data/screen.json`
- **Letters (future blog):** `src/content/letters/` — collection is defined, route is reserved at `/letters`, not linked from nav or footer.

**To add a CMS (Decap CMS / Sveltia / TinaCMS):**

1. Install the CMS package and add the admin entry point (usually `public/admin/`).
2. Map the CMS config to `src/content/` and `src/data/` — the schema is already CMS-shaped.
3. Add a build webhook on the hosting platform so content saves trigger a rebuild + deploy.
4. If migrating to Netlify or Cloudflare Pages for auto-rebuild: the Astro config and content structure require no changes.

---

## Build Reference

```bash
npm run build          # Production build (reads env vars from environment)
npm run check          # TypeScript + Astro type-check
npm run test           # Vitest unit tests
npm run preview        # Preview dist/ locally (serves on localhost:4321)
```

---

## Pending assets — register and pre-publish checklist

See [docs/PENDING_ASSETS.md](docs/PENDING_ASSETS.md) for the full register and the gated pre-publish checklist that must be complete before launch flip.

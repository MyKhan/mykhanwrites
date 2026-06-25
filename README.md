# mykhanwrites.com

A calm, literary author hub for Meher Yar Khan.

**Stack:** Astro (static) · Tailwind CSS v4 · TypeScript · Deployed to Hostinger (Apache)

---

## Local Development

```bash
npm install
npm run dev        # Vite dev server — hot reload, no .htaccess enforcement
npm run preview    # Preview the production build locally (gate does NOT apply locally)
```

---

## M1 Deploy Runbook — Prelaunch (coming-soon only)

This runbook deploys the **prelaunch state**: only `/` (coming-soon) is publicly
visible. Everything else is password-protected by the Apache Basic-Auth gate in
`.htaccess`.

### 1. Environment variables

Set these before building. For Hostinger, configure them in the CI/CD panel or in
your `.env` on the server (never commit real values to git):

| Variable                    | Required | Description                              |
|-----------------------------|----------|------------------------------------------|
| `PRELAUNCH`                 | Yes      | Set to `true` for the coming-soon build  |
| `PUBLIC_KIT_FORM_ID`        | No       | ConvertKit form ID for LettersForm       |
| `PUBLIC_WEB3FORMS_ACCESS_KEY` | No     | Web3Forms access key for LettersForm     |
| `PUBLIC_UMAMI_ID`           | No       | Umami site ID for cookieless analytics   |

LettersForm degrades gracefully when Kit/Web3Forms keys are absent — the signup
input still renders with a visible "pending" notice.

### 2. Build

```bash
npm install
PRELAUNCH=true npm run build
# Emits static site to dist/
```

### 3. Upload dist/ to Hostinger

Upload the entire contents of `dist/` to `public_html/` on the Hostinger server.
Method: SFTP, SSH, or Hostinger's Git deploy integration.

The `.htaccess` file in `dist/` must be present at `public_html/.htaccess`.
(Some FTP clients hide dotfiles — confirm the upload includes `.htaccess`.)

### 4. Gate setup — create .htpasswd ABOVE public_html

The `.htpasswd` file MUST live above `public_html`. It must NEVER be inside the
web root (it would be publicly downloadable). NEVER commit `.htpasswd` to git.

```bash
# SSH into the Hostinger server, then:
htpasswd -c /home/YOUR_USERNAME/.htpasswd preview
# Enter a strong password when prompted.
```

Then update the `AuthUserFile` line in `public_html/.htaccess` (or in `public/.htaccess`
before your next build) with the real absolute path:

```apache
AuthUserFile "/home/YOUR_USERNAME/.htpasswd"
```

See `public/.htpasswd.example` for the file format and generation instructions.

### 5. Verify post-deploy

- Visit `https://www.mykhanwrites.com/` — the coming-soon page loads with no password.
- Visit `https://www.mykhanwrites.com/about/` — browser prompts for the password.
- Visit `https://www.mykhanwrites.com/_astro/` — assets load (they render `/`).
- Visit `https://www.mykhanwrites.com/robots.txt` — returns the Disallow-all version.
- `npm run preview` locally shows the coming-soon at `/` (`.htaccess` is not enforced
  locally — that is expected; the gate is Apache-only and applies only when deployed).

---

## Launch-Flip Runbook

Run this checklist when ready to go fully public. Do NOT do this until all items
are satisfied.

**Hard blockers before flip:**

- [ ] Hostinger creds + SSH access (Decision E)
- [ ] Live hello@ inbox configured and tested
- [ ] ConvertKit form ID confirmed (`PUBLIC_KIT_FORM_ID`)
- [ ] Web3Forms access key confirmed (`PUBLIC_WEB3FORMS_ACCESS_KEY`)
- [ ] Umami site ID confirmed (`PUBLIC_UMAMI_ID`)
- [ ] **`/screen` US Copyright filed (C4) — HARD BLOCKER** — see note below

**Flip steps:**

1. Set `PRELAUNCH=false` in your build environment.
2. Run `npm run build` to emit the full site to `dist/`.
3. Upload the new `dist/` to Hostinger `public_html/` (overwrite).
4. In `public_html/.htaccess` (or `public/.htaccess` pre-build), **comment out the
   entire Basic-Auth gate block** — from `AuthType Basic` through the last `SetEnvIf`
   line. The caching and clean-URL blocks stay active.
5. **Swap `robots.txt`** to the launch version:
   ```
   User-agent: *
   Allow: /

   Sitemap: https://www.mykhanwrites.com/sitemap-index.xml
   ```
   (The launch version is already shown as a comment in `public/robots.txt`.)
6. Submit the sitemap to Google Search Console:
   `https://www.mykhanwrites.com/sitemap-index.xml`

### /screen — Hard Blocker (C4)

**`/screen` must NOT be publicly accessible until the US Copyright registration for
the screenplay is filed (Confirmation C4).** This is a hard blocker — do not remove
the Basic-Auth gate for `/screen` at launch flip. After C4 is complete, restore
a scoped gate in `.htaccess` protecting `/screen` only, then make the rest of the
site public.

---

## Build Reference

```bash
npm run build          # production build (reads PRELAUNCH from env)
npm run astro check    # TypeScript + Astro type-check
npm run test           # Vitest unit tests
```

Full infrastructure deploy (Hostinger SSH, DNS, CDN) is finalized in Phase 13.

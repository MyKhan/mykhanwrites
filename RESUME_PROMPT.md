# Resume prompt — paste the block below into a fresh Claude session

Edit the **"WHAT I'VE DONE"** checklist so it reflects reality, then paste everything
from the `---` line down.

---

Resume work on www.mykhanwrites.com — the author hub for debut novelist Meher Yar Khan.
Working dir: /Users/apunm4macmini/Documents/Programming/Claude Projects/mykhanwrites
(git repo, branch `master`, built directly on master per Meher — NO feature branch; pushed to origin).

THE WEBSITE BUILD IS COMPLETE AND VERIFIED. Every phase + Milestone M1 is implemented, reviewed,
and the final-review + deferred-minor + a11y/Lighthouse passes are all done. Do NOT rebuild or
re-review anything. This session is GO-LIVE EXECUTION (deploy + launch), not development.

STEP 1 — READ FIRST, IN FULL:
  • .superpowers/sdd/progress.md  — the durable ledger (source of truth; read the SESSION blocks at top)
  • The launch board: run `node board/server.mjs` → http://localhost:5050, or read board/tasks.json /
    docs/PENDING_ASSETS.md (the "Launch board status" section). It tracks every go-live item + status.
  • README.md — the full deploy + launch-flip runbook, HTTPS section, maintenance toggle, and the
    /screen-only Basic-Auth snippet.
TRUST the ledger + `git log` + the board over any assumption.

KEY FACTS:
  • Site mode is controlled by SETTINGS.md (root): `PRELAUNCH` (true = Coming Soon, false = full site)
    and `SCREEN_PUBLISHED` (false = /screen hidden). Edit the true/false values — a build-time env var
    of the same name overrides for one-off builds. A bad value fails the build loudly.
  • Creds go in `.env` (gitignored): PUBLIC_KIT_FORM_ID, PUBLIC_WEB3FORMS_ACCESS_KEY, PUBLIC_UMAMI_ID.
    Forms/analytics degrade gracefully (no breakage) until set.
  • /screen is build-gated and MUST stay hidden until the US Copyright (C4) is filed.
  • Verification standard = Decision B (pragmatic for a static site): `npx astro check` + `npm run build`
    + vitest + contrast/links; axe + Lighthouse can be re-run with `npm run verify:a11y` / `verify:lh`
    (axe needs a chromedriver matching the installed Chrome major — see the ledger SESSION 4 note).

WHAT I'VE DONE (edit this to match reality — leave blank/✗ what's still pending):
  • Hostinger access ready:            [ yes / no ]   (deploy target + method: SFTP / SSH / Git deploy)
  • Live hello@mykhanwrites.com inbox:  [ yes / no ]
  • Kit form id:                        [ paste id, or "not yet" ]
  • Web3Forms access key:               [ have it / not yet ]
  • Umami website id:                   [ have it / not yet ]
  • US Copyright (C4) filed:            [ yes / no ]   ← gates /screen ONLY
  • Visual sign-off (C5) done:          [ yes / no ]
  • Crane + favicon approved:           [ yes / no ]
  • Assets ready to drop in:            [ list any: author photo / novel-hero / OG crop / Ch.1 PDF /
                                          reader quotes / TikTok link / book cover / hero texture ]

THE TASK (do only what my checklist above unlocks; ask me if anything's ambiguous):
  1. If I have Hostinger (+ ideally Kit): help me deploy the M1 COMING SOON page behind the Basic-Auth
     gate per the README runbook (set creds, `npm run build`, upload dist/, configure .htaccess/.htpasswd,
     confirm HTTPS), then smoke-test the live coming-soon + email capture.
  2. When I'm ready for the FULL LAUNCH FLIP: set PRELAUNCH=false in SETTINGS.md, rebuild, redeploy,
     comment out the Basic-Auth gate, swap robots.txt to the launch version, submit the sitemap, and
     run the live post-deploy checks (axe/Lighthouse on the real URL, JSON-LD Rich Results, external
     links, /contact + newsletter end-to-end).
  3. /screen: only after C4 — set SCREEN_PUBLISHED=true, fill the [PENDING] screen.json/screen.md
     fields, rebuild, and restore the scoped /screen-only Basic-Auth gate.
  Update the board (board/tasks.json → `--sync`) and the ledger as items complete. Surface any decision
  that's mine to make. Don't deploy or push anything outward without confirming with me first.

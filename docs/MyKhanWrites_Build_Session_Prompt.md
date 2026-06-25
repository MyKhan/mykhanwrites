# Next-session kickoff prompt — implementation plan + build

Copy everything in the box below into a fresh session (after clearing context) to continue.

---

I'm building **www.mykhanwrites.com**, the author hub for debut novelist **Meher Yar Khan** (novel *They Only Came When It Rained*, August 2026). The design direction and all strategic decisions are already **locked and captured in this repo**. Do two things, in order: **(1) FIRST write a phased implementation plan and get my approval; (2) THEN build it.** Do not scaffold or write app code before I approve the plan.

**Read these first — they are the source of truth, in priority order:**
- `PRODUCT.md` — strategy, register, principles, information architecture, anti-references.
- `DESIGN.md` + `.impeccable/design.json` — the canonical visual system (tokens, type, components, the locked hero spec).
- `docs/MyKhanWrites_UI_Kit.md` — detailed tokens + **§9 "Locked session decisions"** (read §9 carefully).
- `docs/MyKhanWrites_Final_Website_Copy.md` — **verbatim copy; do not rewrite it.**
- `docs/MyKhanWrites_Developer_Prompt.md` — the build brief (stack, integrations, deploy runbook, acceptance checklist).
- `docs/MyKhanWrites_Screenwriting_Roadmap.md` — context for the new `/screen` page (in scope).
- `mockups/styleguide.html` + `mockups/homepage*.html` — the rendered look to match.

**Locked decisions to honor (do not re-litigate):**
- **Stack:** Astro (latest) + Tailwind + TypeScript; static build → `dist/`; **CMS-ready** (Astro content collections + `src/data/*.json`); **self-hosted Fontsource fonts** (Fraunces + Inter, preload the display weight); Astro **View Transitions**. **No cookie banner.**
- **Brand:** "warm stories with cold corners" — dusk dark, one rationed **amber** accent, flat/hairline elevation, film grain, warm-duotone imagery. Calm, literary, **must not look templated or AI-made.**
- **Hero (locked, exact):** a *static* light/gradient composition — warm light source at **x 16% / y 23%**, warmth reach **93%**, cold shadow occupying the right **~34%**; low vignette + full-screen grain; **NO parallax.** One primary CTA **"Read the first pages"** (option B: smooth-scroll to the Letters signup + focus the field); "Enter the novel world →" and "Meet the author" are **quiet links, not buttons.** Slogan appears **once**.
- **Homepage IA (research-backed order):** Header → Hero → The first novel (bridge) → **Letters / newsletter (surfaced early)** → The author → The writing (weighted, CTA-free) → Footer. Newsletter is the page's spine, repeated as the **same** offer in hero + mid-page + footer. **Email-only** field; microcopy "A few letters a year. No spam. Unsubscribe anytime."
- **Layout — "calm margins done well":** ~1280px frame with fluid gutters; **text measure capped ~34em (65–75ch)**; **full-bleed atmosphere**; **scale type/spacing up on large screens** so wide displays read deliberate, not empty. Mobile-first.
- **Pages:** `/`, `/novel`, `/writing`, `/about`, `/contact`, `/404`, reserved-unlinked `/letters`, and **NEW `/screen`** — an industry-facing screenplay brochure (logline · synopsis · themes · comparables · status "completed feature — seeking representation" · bio leading with the novel credential · a **separate** industry contact path; **script on request, never a public PDF**). The homepage "Screen" block is only a quiet **"Screen — for industry →"** teaser tied to the duality theme — never a competing CTA.
- **Integrations:** Kit (newsletter; double opt-in, gift = opening pages, frame the confirmation email's CTA as the gift); Web3Forms (contact, with a "Film / screen" reason option); Umami (analytics + custom events; no cookie banner).
- **Crane mark:** redesign into a **clean, recognizable origami crane** for favicon/footer only (current SVG is a placeholder; not in the hero).
- **Accessibility/perf:** WCAG **AA** contrast, full keyboard nav, visible **amber** focus ring (2px/3px offset), full `prefers-reduced-motion`, ≥44px targets, **Lighthouse ≥ 90** all categories.
- **Pending assets — stub honestly, no broken links:** author photo, final novel hero image (Japanese register) + 1200×630 OG crop, author-hero texture, Chapter 1 PDF + hosted link, `hello@mykhanwrites.com` inbox, early-reader quotes, TikTok link, account IDs (Kit/Web3Forms/Umami). **No book cover in the hero** (it's a subscriber incentive; keep the reserved "cover slot" in the novel bridge / novel page).
- **Banned:** AI/templated look, café-brown clichés, neon/corporate-blue/pastels, cookie banner, exit-intent popups, editorial-magazine costume, diagonal repeating-linear-gradient "rain", ghost-card (1px border + soft wide shadow), over-rounding (cards stay 2–3px), gradient text, side-stripe borders.

**The plan should phase the work** (suggested): scaffold → tokens → Tailwind theme + CSS vars → fonts → content collections + `src/data` → base layout (header, footer, grain, View Transitions) → homepage sections (locked hero → novel → letters → about → writing) → `/screen` + remaining pages → motion (reveals, reduced-motion) → integrations (Kit, Web3Forms, Umami) → SEO/JSON-LD/OG/sitemap/robots/favicon → a11y + Lighthouse pass → deploy runbook (Hostinger) + maintenance toggle. Include dependencies, risks, and the pending-asset list. **Present the plan for my approval before writing any code.** Build mobile-first and verify against the locked design as you go.

---

*(Also handy in a fresh session: `docs/MyKhanWrites_Next_Session_Pack.md` if present.)*

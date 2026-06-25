# Product

## Register

brand

## Users

**Primary — literary-fiction readers.** People who lose themselves in quiet, character-driven novels — the *Before the Coffee Gets Cold* / *What You Are Looking For Is in the Library* reader. They arrive curious about a debut author, usually late, usually on a phone or laptop, deciding in seconds whether this writer is worth their attention (and their email). They value emotional complexity over comfort; a little darkness reads to them as honesty, not as a warning.

**Secondary — industry & adjacent.** Publishing, film/screen, rights, and media contacts who may land here to assess credibility. They need facts and proof of follow-through, not hype.

**The job to be done:** "Show me, in a few seconds, whether this writer's world is one I want to step into — and if it is, give me an easy, low-risk way to stay close to it."

## Product Purpose

The author hub for **Meher Yar Khan**, debut novelist of *They Only Came When It Rained* (August 2026). It exists to:

1. **Grow the newsletter list (the #1 goal).** Every page is in service of one conversion: a reader exchanging their email for the novel's opening pages (via Kit). The list is the asset being built ~14 months ahead of launch.
2. **Hand off to the wider world** — the immersive novel site (onlywhenitrains.com) and, quietly, the author's tools and range.
3. **Establish credibility** — a real, shipping, human writer with range, not a template.
4. **Support screen representation (secondary funnel).** Serve as a professional credibility backstop for the author's screenwriting — a dedicated `/screen` page presenting the completed feature as a *pitch* (logline, synopsis, comparables, status), with a separate industry contact path. The site *supports* the real representation paths (referrals, contests/fellowships, the Black List, targeted manager queries) — it does not replace them, and reps are not discovered via a website.

Launch-minimal but **CMS-ready**: content lives in collections/data so an editor (Decap/Sveltia/Tina) and a future on-site "Letters" section can be added later without a rewrite. Success = subscribers, not page views.

**Homepage information architecture (locked, research-backed):** Header → Hero → The first novel → **Letters (newsletter, surfaced early at peak interest)** → The author → The writing (weighted, CTA-free) → Footer. The newsletter is the page's spine, repeated as the *same* offer in the hero, mid-page, and footer — never as competing offers.

**Screen / representation (secondary funnel, kept separate).** The completed feature screenplay lives on a dedicated **`/screen`** page (topic-based, never an audience fork): logline, synopsis, themes, comparables, status ("completed feature — seeking representation"), bio leading with the novel credential, and a *separate* industry contact path — the script itself is shared on request, never a public download. The homepage's Writing block carries only a quiet "Screen — for industry →" teaser tied to the shared duality theme. The reader funnel (newsletter) and the industry funnel (representation) never compete on the same surface. Protect the script with US Copyright registration before `/screen` goes live.

**Stack & integrations:** Astro + Tailwind (static, CMS-ready) — chosen for bespoke non-templated design, speed (Lighthouse ≥90), privacy (no cookie banner), and native SEO/structured-data control. Kit (newsletter; double opt-in, with the gift framed as the confirmation step), Web3Forms (contact), Umami (analytics, no cookie banner).

## Brand Personality

**Calm · literary · human · cinematic-at-dusk.** Warmth with a cold corner.

The defining idea, and the through-line that unifies everything Meher writes, is **duality — the two selves, the warm and the cold, the light and the shadow living in one person.** A lonely barista on a rainy platform (the novel) and a fractured mind in a psychological thriller (the screenplay, inspired by Ren's *"Hi Ren"*, itself a dialogue between a self and its shadow) are the same theme at different volumes. The brand's signature line — **"Warm stories with cold corners"** — *is* that duality. It is the brand's strength, not a tension to resolve.

Voice: concrete and human, never polished-abstract. Quietly confident; owns the self-publishing path without apology. Describes, never labels (the book is never called "cozy"). Spoiler-safe always.

## Anti-references

- **Must NOT look AI-generated or templated.** This is the single hardest requirement. If a visitor could say "an AI made this," it has failed.
- No generic **café-brown / coffee-shop clichés**, no neon, no corporate blue, no sweet pastels.
- No **aggressive conversion tactics** — no cookie banner, no exit-intent popups, no pushy interrupts. The calm is the trust signal; betraying it betrays the brand. (Proven-but-pushy CRO tactics are deliberately declined here.)
- No **editorial-magazine-by-reflex** (display-serif + drop-caps + broadsheet grid as a default costume). The literary feel comes from restraint and atmosphere, not magazine pastiche.
- No **spoilers** — the twist, the cranes' meaning, the girl's identity, the ending, "Platform 9" never appear.
- No cheap effects: no diagonal-stripe "rain", no glitch, no scroll-jacking, no typewriter, no custom cursor.

## Design Principles

1. **Warmth with one cold corner.** Every surface holds both: a warm, inviting light *and* a deliberate shadow at the edge. The shadow creates intrigue (the curiosity gap); the warmth creates trust (a lowered guard). One without the other fails — pure warmth is bland, pure dark is unwelcoming.
2. **The list is the spine.** A single primary call-to-action ("Read the first pages") runs through the whole page — above the fold, again at peak interest after the story hook, and in the footer. Secondary paths are quiet links, never competing buttons. Everything serves the email.
3. **Lead with the novel; show the range quietly.** Consistency of *voice*, variety of *treatment*: the novel leads (it's launching, it's the hook), while screen and "other worlds" appear as subordinate, CTA-free range — proof of a serious working writer, not a second ask.
4. **Calm is confidence — done well.** Restraint, negative space, and a hushed palette read as assured, not empty — *provided* the atmosphere is full-bleed and the type scales up on large screens so the calm never tips into void. Restraint with intent, never restraint as timidity.
5. **Human, not templated; honest, not hyped.** Bespoke craft that is unmistakably *his*. Describe don't label, fact before flourish, the self-publishing path owned with confidence.

## Accessibility & Inclusion

- **WCAG AA** contrast on all text against the dark surfaces (verify any new combination; never let muted gray body text drift below 4.5:1).
- Full **keyboard navigation**; a visible **amber focus ring** (2px, 3px offset).
- **`prefers-reduced-motion`** fully honored — reveals and page transitions resolve to final states.
- **Mobile-first**; ≥44px tap targets; legible text-over-image (scrim where needed); meaningful alt text.
- Performance is an accessibility concern: target **Lighthouse ≥ 90** across the board; self-hosted fonts, no render-blocking third-party calls.

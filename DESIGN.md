---
name: MyKhanWrites
description: The author hub for Meher Yar Khan — warm stories with cold corners, lit at dusk.
colors:
  ink: "#14110F"
  ink-2: "#1B1714"
  ink-3: "#221D18"
  ink-4: "#2A241E"
  ink-deep: "#100D0B"
  parchment: "#ECE3D2"
  parchment-dim: "#C7BCA8"
  muted: "#A49A88"
  brown: "#8A7358"
  amber: "#C9A24B"
  amber-bright: "#E0B15E"
  amber-deep: "#A8812F"
  cold-shadow: "#5B6B78"
  raincoat: "#E8C547"
  success: "#8FB08A"
  error: "#C97A6A"
typography:
  display:
    fontFamily: "Fraunces, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2.7rem, 6vw, 5rem)"
    fontWeight: 430
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(1.9rem, 3.4vw, 2.6rem)"
    fontWeight: 430
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "1.6rem"
    fontWeight: 430
    lineHeight: 1.15
  body:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 300
    lineHeight: 1.65
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.74rem"
    fontWeight: 500
    letterSpacing: "0.22em"
  epigraph:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  sm: "2px"
  img: "3px"
  pill: "30px"
spacing:
  space-4: "4px"
  space-8: "8px"
  space-12: "12px"
  space-16: "16px"
  space-24: "24px"
  space-32: "32px"
  space-48: "48px"
  space-64: "64px"
  space-96: "96px"
  space-128: "128px"
components:
  button-primary:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0.95em 1.8em"
  button-primary-hover:
    backgroundColor: "{colors.amber-bright}"
    textColor: "{colors.ink}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.amber}"
    rounded: "{rounded.sm}"
    padding: "0.95em 1.8em"
  card:
    backgroundColor: "{colors.ink-3}"
    textColor: "{colors.parchment-dim}"
    rounded: "{rounded.sm}"
    padding: "34px"
  input:
    backgroundColor: "{colors.ink-3}"
    textColor: "{colors.parchment}"
    rounded: "{rounded.sm}"
    padding: "0.95em 1.2em"
---

# Design System: MyKhanWrites

## 1. Overview

**Creative North Star: "The Lit Window at Dusk"**

Stand outside a small station café on a rainy night. The world is cold, grey, and going dark — but one window glows warm and gold, and you want to step inside. That single image is the whole system: a warm-near-black world, lit by one amber light, with the cold pressing at the edges. It is cinematic without being loud, literary without being a magazine pastiche, and intimate without being precious. The design serves a debut novelist whose signature is *warmth with a cold corner* — and whose deeper theme, across novel and screenplay alike, is the duality of two selves, the light and the shadow living in one person.

The system is **restrained on purpose, but never timid.** It earns its negative space the way a fine hardback earns wide margins — as confidence, not emptiness. Surfaces are flat and dark, defined by hairlines rather than shadows; a single amber accent does all the emotional work and is rationed so its rarity stays meaningful; type carries the personality through one characterful serif and one clean sans. Atmosphere — a faint film grain, a warm-to-cold gradient, a low vignette — is full-bleed across the whole device, so even on a large display the page reads as composed, while the *text* stays in a calm, readable column.

This system explicitly rejects anything that reads as **AI-generated or templated** — the single hardest requirement. It refuses generic café-brown/coffee-shop clichés, neon, corporate blue, and sweet pastels; it refuses aggressive conversion theatre (no cookie banner, no exit-intent popups); it refuses editorial-magazine-by-reflex (drop-caps and broadsheet grids as costume); and it refuses cheap effects (diagonal-stripe "rain", glitch, scroll-jacking, typewriter, custom cursors).

**Key Characteristics:**
- Warm near-black surfaces; one rationed amber accent; the cold kept to the corners.
- One characterful serif (Fraunces) + one clean sans (Inter); slogan stated once.
- Flat by default — depth from hairlines, tonal layering, grain, and one warm light source.
- Full-bleed atmosphere, calm capped text column; restraint that reads as confidence.
- Refined, barely-there motion; reduced-motion fully honored.

## 2. Colors

A warm near-black world lit by a single amber, with cold reserved for the shadowed edges.

### Primary
- **Lamplight Amber** (#C9A24B): the one accent. Links, marks, focus rings, and the single primary button per view. **Bright Amber** (#E0B15E) is its hover/highlight; **Deep Amber** (#A8812F) its pressed/deep-border state. Amber is rationed — accent only, never a large fill beyond the one primary button.

### Secondary
- **Raincoat Yellow** (#E8C547): a tiny, high-emotion accent reserved exclusively for the novel — a single lit dot, a small mark. Never appears outside novel-specific contexts.
- **Cold-Shadow Blue-Grey** (#5B6B78): not a fill but an *atmosphere* — the cold pressing in at the right and top of the hero, mixed dark so it swallows light rather than glowing. It is the "cold corner" made visible.

### Neutral
- **Ink** (#14110F): the warm near-black page background. **Ink-2** (#1B1714) for alternate section bands, **Ink-3** (#221D18) for cards, **Ink-4** (#2A241E) for inputs/hover surfaces, **Ink-Deep** (#100D0B) for the footer.
- **Parchment** (#ECE3D2): primary text. **Parchment-Dim** (#C7BCA8): secondary/lede text. **Muted** (#A49A88) and **Brown** (#8A7358): labels, captions, tertiary text and eyebrows.
- **Hairline** (rgba(236,227,210,.12)) and **Hairline-Strong** (rgba(236,227,210,.22)): borders and dividers.
- **Sage Success** (#8FB08A) and **Clay Error** (#C97A6A): desaturated, on-palette form states.

### Named Rules
**The One Amber Rule.** Amber is an accent, never a surface. It appears on the single primary button, links, marks, and focus rings — never as a large fill. Its rarity is the point.

**The Cold-Corner Rule.** The cold blue-grey is darker than the room it sits in. It is a shadow that eats light, confined to a corner or edge — never a glowing wash, never a stripe, never the whole field.

**The Raincoat Rule.** #E8C547 is forbidden anywhere except the novel's own contexts. Do not let the novel's yellow leak onto the homepage or author surfaces.

## 3. Typography

**Display Font:** Fraunces (with Georgia, 'Times New Roman', serif)
**Body Font:** Inter (with system-ui, -apple-system, sans-serif)

**Character:** A characterful, slightly old-style serif with optical sizing (Fraunces) carries all the warmth and literary voice; a clean, quiet grotesque (Inter) keeps body and UI crisp and legible on dark. Contrast on a true axis — serif against sans — never two similar families. Italic Fraunces is the voice of intimacy: epigraphs and the novel cue.

### Hierarchy
- **Display** (Fraunces 430, clamp(2.7rem,6vw,5rem), lh 1.02, ls −0.025em): the hero headline only.
- **Headline** (Fraunces 430, clamp(1.9rem,3.4vw,2.6rem), lh 1.1): section titles, often italic.
- **Title** (Fraunces 430, ~1.6rem): card and sub-section headings.
- **Body** (Inter 300, 1rem, lh 1.65): running text. Capped at **65–75 characters per line (~34em)** for readability, regardless of how wide the frame grows.
- **Lede** (Inter 300, 1.2–1.32rem, parchment-dim): intro lines.
- **Label / Eyebrow** (Inter 500, 0.74rem, ls 0.22em, uppercase, brown/amber): section kickers.
- **Epigraph** (Fraunces italic, 1.5rem): the novel's pull-quotes.

### Named Rules
**The Slogan-Once Rule.** "Warm stories with cold corners." is the hero H1 and appears *nowhere else* on the site. Stated once, it lands hard.

**The Italic-Intimacy Rule.** Reserve Fraunces italic for the moments that whisper — epigraphs, the novel title in-line, the novel cue — not for general emphasis.

**The Readable-Measure Rule.** The frame may breathe wide on large screens, but a text column never exceeds ~75 characters. The frame scales; the measure does not.

## 4. Elevation

**Flat by default.** This system uses almost no drop shadows. Depth comes from four sources instead: **hairline borders** (1px translucent parchment), **tonal layering** of the ink ramp (ink → ink-2 → ink-3 → ink-4), the **film-grain overlay** that unifies every surface, and — uniquely — the hero's **one warm light source and its opposing cold shadow**, which is the only real "lighting" in the system. Hover states lift an element 2–3px and warm its border; they never drop a heavy shadow.

### Named Rules
**The Flat-by-Default / Hairline Rule.** Surfaces are flat at rest, separated by hairlines and tonal steps. If you reach for a `box-shadow`, stop — use a border, a tonal step, or the light/shadow gradient instead. Never pair a 1px border with a soft wide drop shadow (the "ghost card" tell).

**The Focus-Ring Exception.** The one always-visible "elevation" is the keyboard focus ring: amber, 2px, 3px offset. It is never removed.

## 5. Components

### Buttons
- **Shape:** sharp, near-square (2px radius). Editorial, not rounded.
- **Primary:** amber fill, ink text, uppercase, letter-spacing 0.13em (#C9A24B → #E0B15E on hover, with a 2px lift). **One per view** — it carries the page's single goal ("Read the first pages").
- **Ghost / Secondary:** transparent with amber text + border; a faint amber wash on hover. For secondary actions only.

### Links
- **Underline-draw:** an amber underline that scales in from the left on hover (280ms). Default for nav and feature links.
- **Arrow link:** parchment with a hairline underline → amber on hover.
- **Quiet link:** muted → parchment on hover. The tertiary, near-silent action.
- **Inline link:** amber with a soft underline, inside running text.

### Cards / Containers
- **Corner Style:** 2px (3px for images). Never over-rounded.
- **Background:** ink-3 on ink/ink-2 bands; **Border:** 1px hairline.
- **Shadow Strategy:** none at rest (see Elevation). Hover warms the border toward amber and lifts 2–3px.
- **Internal Padding:** 34–38px. **Rule:** cards are used only when they are genuinely the best affordance; nested cards are forbidden.

### Inputs / Fields
- **Style:** ink-3 background, 1px hairline-strong border, 2px radius.
- **Focus:** amber border + amber focus ring. **States:** sage success (#8FB08A), clay error (#C97A6A).
- **Rule:** the newsletter form is **email-only** — one field, one goal.

### Navigation
- **Style:** sticky, blurred ink, hairline bottom; uppercase tracked links; underline-draw on hover. Collapses on mobile (<640px). Contact and Letters live in-page/footer, not in the nav.

### Signature: The Hero
A typographic, atmospheric hero — no book cover (a reserved "cover slot" awaits one later). The lighting is **locked**: a warm light source at **x 16% / y 23%**, warmth reaching **93%**, the cold shadow occupying the right **~34%**. Warm light falls from the upper-left so text never sits on the hotspot (preserving contrast); the cold presses in from the right; a low vignette and full-screen grain complete it. One primary CTA; the other two beats are quiet links. The primary CTA ("Read the first pages") glides to the Letters signup and focuses the field (option B — no separate above-the-fold form), keeping the hero uncluttered.

### Signature: The Letters block
The newsletter section — the page's spine. Warm, centered, gift-led copy; email-only field; primary button "Send me the first pages"; reassurance microcopy ("A few letters a year. No spam. Unsubscribe anytime."). Repeated as the same offer in the hero (above the fold), here at peak interest, and once more in the footer — never as competing offers.

### The Crane Mark
A small origami-crane line mark in amber, for tiny supporting spots only (favicon, footer). **Pending redesign** — the current path reads as unclear and must be replaced with a recognizable origami crane before use. Used sparingly; never in header + hero + dividers at once.

### Imagery
Warm duotone: shadows → ink (#14110F), highlights → warm gold (#E8D6B0), low saturation so it reads cinematic, not orange. Dusted with the same grain. **When a brief implies imagery, ship real imagery** — never a flat colored block where a photo belongs (placeholders are clearly marked "pending" only in mockups).

### Layout & Responsive (folded here per spec)
Container max ~1280px with fluid gutters; the **text measure stays ~34em** no matter how wide the frame. 8px spacing rhythm (4·8·12·16·24·32·48·64·96·128). Section padding clamp(72px,10vh,132px). **Calm-Margins-Done-Well Rule:** on large displays, keep the capped reading column but (a) run the dusk atmosphere full-bleed edge-to-edge and (b) scale type and spacing up — so wide screens read as deliberate, never empty. Mobile-first; single-column reflow.

## 6. Do's and Don'ts

### Do:
- **Do** light every key surface with one warm source and one cold corner — warmth for trust, shadow for intrigue.
- **Do** keep one primary CTA ("Read the first pages") and thread it through hero, mid-page, and footer; demote everything else to quiet links.
- **Do** ration amber to accent only (#C9A24B); carry warmth with type, light, and imagery instead.
- **Do** cap body text at 65–75 characters even as the frame widens; run atmosphere full-bleed and scale up type/spacing on large screens.
- **Do** keep elevation flat — hairlines, tonal layering, grain; lift 2–3px and warm the border on hover.
- **Do** describe, never label; keep everything spoiler-safe; state the slogan exactly once.
- **Do** honor `prefers-reduced-motion` for every animation, and verify WCAG AA contrast on every new text/background pair.

### Don't:
- **Don't** ship anything that could read as **AI-generated or templated** — the cardinal sin.
- **Don't** use generic **café-brown/coffee-shop** browns, neon, corporate blue, or sweet pastels.
- **Don't** add a **cookie banner, exit-intent popup, or any pushy interrupt** — the calm is the trust signal.
- **Don't** default to **editorial-magazine** costume (drop-caps + broadsheet grid) on a brief that isn't a magazine.
- **Don't** fake rain or texture with **diagonal repeating-linear-gradient stripes** — they read as cheap lines, not weather. No glitch, scroll-jacking, typewriter, or custom cursor.
- **Don't** pair a 1px border with a soft wide drop shadow (the ghost-card tell); don't over-round (cards stay at 2–3px); don't use `border-left`/`right` >1px as a colored stripe.
- **Don't** let the **raincoat yellow** (#E8C547) appear outside novel contexts; don't let amber become a large fill.
- **Don't** put the unrevealed book cover on the homepage — it's a subscriber reward, not free homepage decoration.

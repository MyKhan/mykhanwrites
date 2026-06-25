# MyKhanWrites.com — UI Kit / Design System (Dusk)

**Companion to:** `MyKhanWrites_Developer_Prompt.md` (fold this into §4 Design system).
**Preview:** `mockups/styleguide.html` (living visual), `mockups/homepage.html` (applied).
**Status:** locked design direction (2026-06-25).

## Direction (locked)
Dusk / dark · single **amber** accent · **sharp editorial** edges · subtle **film grain** ·
**Fraunces** headings + **Inter** body · **refined & subtle** motion + **page crossfades** + **gentle
hero parallax** (no custom cursor, no image clip-reveals) · **warm-duotone** imagery.

---

## 1. Colour tokens
All text tiers meet WCAG **AA** on the dark surfaces; verify any new combination.

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#14110F` | page background (warm near-black) |
| `--ink-2` | `#1B1714` | alt section bands |
| `--ink-3` | `#221D18` | cards |
| `--ink-4` | `#2A241E` | inputs, hover surfaces |
| `--parchment` | `#ECE3D2` | primary text |
| `--parchment-dim` | `#C7BCA8` | secondary text |
| `--muted` | `#A49A88` | labels, captions, tertiary |
| `--amber` | `#C9A24B` | accent: links, marks, primary button |
| `--amber-bright` | `#E0B15E` | hover/highlight |
| `--amber-deep` | `#A8812F` | pressed, deep borders |
| `--yellow` | `#E8C547` | **novel pages only** — raincoat accent, tiny |
| `--line` | `rgba(236,227,210,.12)` | hairline borders/dividers |
| `--line-strong` | `rgba(236,227,210,.22)` | emphasised rule |
| `--success` | `#8FB08A` | form success (desaturated sage) |
| `--error` | `#C97A6A` | form error (muted clay) |

Amber is used **sparingly** — accent only, never large fills beyond the one primary button.

## 2. Typography
- **Display/Headings:** `Fraunces` (variable; optical sizing). Weights 400–460 for large, italic for
  epigraphs + the novel cue.
- **Body/UI:** `Inter`. Weights 300 (body), 400, 500 (labels/buttons).
- **Self-host** both via **Fontsource** (no Google CDN — privacy + perf). Preload the display weight.

| Style | Font / size | Notes |
|---|---|---|
| Display / H1 | Fraunces, `clamp(2.7rem,6.4vw,4.7rem)`, w440, lh1.02, ls −.02em | hero only |
| H2 | Fraunces, `clamp(1.9rem,3.4vw,2.6rem)`, lh1.1 | section titles (often italic) |
| H3 | Fraunces, `1.5–1.65rem` | cards, sub-sections |
| Eyebrow | Inter 500, `.74rem`, ls .22em, uppercase, amber | section kickers |
| Lede | Inter 300, `1.2–1.32rem`, parchment-dim | intro lines |
| Body | Inter 300, `1rem`, lh1.65 | running text |
| Caption | Inter, `.8rem`, muted | image labels |
| Epigraph | Fraunces italic, `1.5rem`, amber left-rule | pull-quotes |

## 3. Spacing, layout, shape
- **8-px rhythm:** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128.
- **Container:** max-width `1080px`; gutter 28–32px. **Section padding:** 96px desktop / 64px mobile.
- **Radius:** `2px` (buttons/cards/inputs), `3px` images. Sharp, editorial.
- **Borders:** 1px `--line`; sections separated by a top hairline. **Elevation:** flat — define with
  borders + a few-px hover lift, **not** heavy shadows. Focus ring: amber 2px, offset 3px.

## 4. Motion spec (refined & subtle)
- **Durations:** `--t-fast 180ms · --t 280ms · --t-slow 450ms · --t-reveal 900ms`.
- **Easing:** `--ease-out cubic-bezier(.22,.61,.36,1)` (reveals/hover); `--ease-soft cubic-bezier(.4,0,.2,1)`.
- **Scroll reveal:** opacity 0→1 + translateY 18px→0, 900ms ease-out, IntersectionObserver, once.
- **Hero intro:** on load, staggered fade-settle of eyebrow → H1 → lede → cue → CTAs (~80ms apart).
- **Link underline:** `::after` scaleX 0→1 from left, 280ms.
- **Button hover:** translateY −2px + background → amber-bright, 280ms.
- **Page transitions:** **Astro View Transitions**, ~320ms crossfade between pages.
- **Hero parallax:** hero image/texture drifts ~12% slower than scroll (transform translateY).
  **Disabled** on mobile and under reduced-motion.
- **`prefers-reduced-motion`:** disable reveals, parallax, transitions; show final states.

## 5. Imagery — warm duotone + grain
- **Duotone target:** shadows → `#14110F`, highlights → `#E8D6B0` (warm gold). Apply via SVG
  `feColorMatrix`/duotone map or a Tailwind/CSS layer (grayscale → warm gradient map). Keep saturation
  low so it reads cinematic, not orange.
- **Grain:** site-wide fixed overlay, `feTurbulence` fractal noise, opacity ~.06, `mix-blend:overlay`,
  `pointer-events:none`. Also dust images with the same grain.
- **Novel hero:** the rich rainy Japanese-station scene gets the strongest treatment + a faint vignette.

## 6. Components
- **Primary button:** amber fill, ink text, uppercase, ls .13em, radius 2px; hover lift + amber-bright.
  *(One per view.)*
- **Ghost button:** transparent, amber text + border; hover faint amber wash. (Secondary CTAs.)
- **Arrow link:** parchment + hairline underline; hover amber. **Quiet link:** muted → parchment.
  **Inline link:** amber with soft underline. **Underline-draw** on nav/feature links.
- **Card:** ink-3, hairline border, 30px pad; hover border-amber + lift 3px.
- **Other-worlds row:** full-width hairline-bordered band with a faint left-gradient (the weighting cue).
- **Input:** ink-3 bg, hairline; focus → amber border. **States:** success sage, error clay.
- **Nav:** sticky, blurred ink, hairline bottom; uppercase tracked links; underline-draw on hover.
- **Footer:** deepest ink (`#100D0B`), hairline top, columned links, identity + `Fiction · Screen ·
  Other Worlds`.
- **Crane mark:** small amber line-art origami crane — favicon, one hero corner, footer. **Used
  sparingly** (never header + hero + dividers + newsletter at once). Mug incidental; raincoat-yellow
  novel-page only.

## 7. Accessibility
AA contrast on all text; visible amber focus rings; full keyboard nav; reduced-motion fallback;
alt text on all imagery; ≥44px tap targets; legible text-over-image (scrim where needed).

## 8. Implementation notes
- Map tokens into **Tailwind `theme.extend`** (colors, fontFamily, fontSize, spacing, borderRadius,
  transitionTimingFunction) so utilities stay on-system; expose the same as CSS variables for raw CSS.
- Fonts via `@fontsource-variable/fraunces` + `@fontsource/inter`, self-hosted; preload display.
- Motion: CSS-first; one tiny IntersectionObserver for reveals; small parallax script (guard
  mobile + reduced-motion); Astro `<ViewTransitions />` in the layout head.
- Grain + duotone are CSS/SVG — no images required for the effects themselves.

#!/usr/bin/env node
/**
 * contrast-audit.mjs — WCAG AA contrast ratio audit for mykhanwrites.com tokens
 *
 * Checks every meaningful text/background token pair against WCAG AA:
 *   - Normal text: ≥4.5:1
 *   - Large text (≥18pt / ≥14pt bold, or explicitly justified): ≥3:1
 *
 * Uses the W3C relative luminance formula (IEC 61966-2-1 sRGB):
 *   L = 0.2126·R + 0.7152·G + 0.0722·B  (linearised)
 *   Contrast = (L_lighter + 0.05) / (L_darker + 0.05)
 *
 * Token source: parsed live from src/styles/global.css @theme block — single
 *   source of truth, no frozen copy that can silently drift from the real tokens.
 * Run: node scripts/contrast-audit.mjs
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

// ---------------------------------------------------------------------------
// Color tokens — parsed live from src/styles/global.css @theme block.
// Matches `--color-<name>: #RRGGBB;`; rgba()/non-hex tokens (e.g. lines) are
// skipped (the audit only references hex tokens). This keeps the AA gate
// honest: if a token's hex changes in global.css, the audit re-reads it.
// ---------------------------------------------------------------------------
const __dirname = dirname(fileURLToPath(import.meta.url));
const GLOBAL_CSS = resolve(__dirname, '../src/styles/global.css');

function parseColorTokens(cssPath) {
  const css = readFileSync(cssPath, 'utf8');
  const tokens = {};
  const re = /--color-([a-z0-9-]+)\s*:\s*(#[0-9a-fA-F]{6})\b/g;
  let m;
  while ((m = re.exec(css)) !== null) {
    tokens[m[1]] = m[2].toUpperCase();
  }
  if (Object.keys(tokens).length === 0) {
    throw new Error(`No --color-* hex tokens found in ${cssPath}`);
  }
  return tokens;
}

const TOKENS = parseColorTokens(GLOBAL_CSS);

// ---------------------------------------------------------------------------
// Relative luminance (W3C formula)
// ---------------------------------------------------------------------------
function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255,
  };
}

function linearise(c) {
  // 0.04045 per IEC 61966-2-1 (sRGB); WCAG 2.0 text says 0.03928 — differs only at channel byte 10, which none of our tokens use.
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  return 0.2126 * linearise(r) + 0.7152 * linearise(g) + 0.0722 * linearise(b);
}

function contrastRatio(hex1, hex2) {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker  = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// ---------------------------------------------------------------------------
// Pairs to audit — (text token, background token, textRole, isLarge?)
//
// isLarge = true only when the design ALWAYS renders this pair at ≥18pt (24px)
// or bold ≥14pt (18.67px). Normal text pairs use isLarge=false (4.5:1 required).
// Label eyebrow text is 0.74rem (~11.8px, letter-spaced): NOT large → 4.5:1.
// Display/Headline/Title/Epigraph text is large → 3:1 accepted.
// ---------------------------------------------------------------------------
const PAIRS = [
  // --- Parchment on ink surfaces (body text) ---
  { text: 'parchment',     bg: 'ink',      role: 'Body text',          isLarge: false },
  { text: 'parchment',     bg: 'ink-2',    role: 'Body / alt section', isLarge: false },
  { text: 'parchment',     bg: 'ink-3',    role: 'Body / card',        isLarge: false },
  { text: 'parchment',     bg: 'ink-4',    role: 'Body / input',       isLarge: false },
  { text: 'parchment',     bg: 'ink-deep', role: 'Body / footer',      isLarge: false },

  // --- Parchment-dim on ink surfaces (lede / secondary text) ---
  { text: 'parchment-dim', bg: 'ink',      role: 'Lede text',          isLarge: false },
  { text: 'parchment-dim', bg: 'ink-2',    role: 'Lede / alt section', isLarge: false },
  { text: 'parchment-dim', bg: 'ink-3',    role: 'Lede / card',        isLarge: false },
  { text: 'parchment-dim', bg: 'ink-deep', role: 'Lede / footer',      isLarge: false },

  // --- Muted text on ink surfaces (captions, tertiary) ---
  { text: 'muted',         bg: 'ink',      role: 'Muted / caption',    isLarge: false },
  { text: 'muted',         bg: 'ink-2',    role: 'Muted / alt section',isLarge: false },
  { text: 'muted',         bg: 'ink-3',    role: 'Muted / card',       isLarge: false },
  { text: 'muted',         bg: 'ink-deep', role: 'Muted / footer',     isLarge: false },

  // --- Eyebrow on ink surfaces (label/eyebrow — 0.74rem, NOT large) ---
  { text: 'eyebrow',       bg: 'ink',      role: 'Eyebrow label',      isLarge: false },
  { text: 'eyebrow',       bg: 'ink-2',    role: 'Eyebrow / alt sec',  isLarge: false },
  { text: 'eyebrow',       bg: 'ink-3',    role: 'Eyebrow / card',     isLarge: false },
  { text: 'eyebrow',       bg: 'ink-deep', role: 'Eyebrow / footer',   isLarge: false },

  // --- Amber on ink surfaces (accent links, focus, CTA text) ---
  { text: 'amber',         bg: 'ink',      role: 'Amber accent / link',isLarge: false },
  { text: 'amber',         bg: 'ink-2',    role: 'Amber / alt section',isLarge: false },
  { text: 'amber',         bg: 'ink-3',    role: 'Amber / card',       isLarge: false },
  { text: 'amber',         bg: 'ink-deep', role: 'Amber / footer',     isLarge: false },

  // --- Amber-bright on ink surfaces (hover state) ---
  { text: 'amber-bright',  bg: 'ink',      role: 'Amber-bright hover', isLarge: false },
  { text: 'amber-bright',  bg: 'ink-2',    role: 'Amber-bright / alt', isLarge: false },

  // --- Display / Headline / Title / Epigraph (large text pairs, ≥24px / ≥18px bold) ---
  { text: 'parchment',     bg: 'ink',      role: 'Display heading',    isLarge: true  },
  { text: 'parchment',     bg: 'ink-2',    role: 'Headline / alt sec', isLarge: true  },
  { text: 'parchment',     bg: 'ink-3',    role: 'Title / card',       isLarge: true  },
  { text: 'amber',         bg: 'ink',      role: 'Novel-hero eyebrow (large amber)', isLarge: true },

  // --- Primary button: ink text on amber background ---
  { text: 'ink',           bg: 'amber',    role: 'CTA button label',   isLarge: false },
  { text: 'ink',           bg: 'amber-bright', role: 'CTA hover label',isLarge: false },

  // --- Success / error on ink-3 (form feedback) ---
  { text: 'success',       bg: 'ink-3',    role: 'Success msg / card', isLarge: false },
  { text: 'error',         bg: 'ink-3',    role: 'Error msg / card',   isLarge: false },
  { text: 'success',       bg: 'ink',      role: 'Success msg / page', isLarge: false },
  { text: 'error',         bg: 'ink',      role: 'Error msg / page',   isLarge: false },

  // --- Brown (NOT for small text — labelled as large-only) ---
  // DESIGN.md token comment: "≈4.18:1 on ink — NOT for small eyebrow text; AA fails"
  // We audit it here to record the ratio; usage is large-only or decorative.
  { text: 'brown',         bg: 'ink',      role: 'Brown (large-only)', isLarge: true  },
  { text: 'brown',         bg: 'ink-2',    role: 'Brown / alt (large)',isLarge: true  },

  // --- Raincoat yellow on novel-page backgrounds (novel-only) ---
  { text: 'yellow',        bg: 'ink',      role: 'Raincoat / novel hero (large)', isLarge: true },
];

// ---------------------------------------------------------------------------
// Deduplicate pairs that appear both as normal and large (keep one audit row)
// ---------------------------------------------------------------------------
const seen = new Set();
const dedupedPairs = PAIRS.filter(p => {
  const key = `${p.text}|${p.bg}|${p.isLarge}`;
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

// ---------------------------------------------------------------------------
// Drift guard — fail fast if the audit references a token that no longer
// exists in global.css (e.g. a token was renamed or removed at the source).
// ---------------------------------------------------------------------------
const referenced = new Set(PAIRS.flatMap(p => [p.text, p.bg]));
const missing = [...referenced].filter(t => !(t in TOKENS));
if (missing.length) {
  console.error(
    `\x1b[31m✗ Tokens referenced by the audit but missing from global.css: ${missing.join(', ')}\x1b[0m`,
  );
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Run the audit
// ---------------------------------------------------------------------------
const MIN_NORMAL = 4.5;
const MIN_LARGE  = 3.0;

const PASS = '\x1b[32m✓ PASS\x1b[0m';
const FAIL = '\x1b[31m✗ FAIL\x1b[0m';

let allPassed = true;
const results = [];

for (const pair of dedupedPairs) {
  const textHex = TOKENS[pair.text];
  const bgHex   = TOKENS[pair.bg];
  const ratio   = contrastRatio(textHex, bgHex);
  const required = pair.isLarge ? MIN_LARGE : MIN_NORMAL;
  const passed   = ratio >= required;

  if (!passed) allPassed = false;

  results.push({
    ...pair,
    textHex,
    bgHex,
    ratio,
    required,
    passed,
  });
}

// ---------------------------------------------------------------------------
// Print table
// ---------------------------------------------------------------------------
console.log('\n────────────────────────────────────────────────────────────────────────────');
console.log('  MyKhanWrites — WCAG AA Contrast Audit');
console.log('  Formula: (L_lighter + 0.05) / (L_darker + 0.05)');
console.log('  Normal text ≥4.5:1 | Large text (≥18pt/bold≥14pt) ≥3:1');
console.log('────────────────────────────────────────────────────────────────────────────');
console.log('');

const COL_W = 34;
const header = [
  'Text token / Background',
  'Ratio',
  'Req',
  'Result',
].join('  ');
console.log(header);
console.log('─'.repeat(80));

for (const r of results) {
  const label = `${r.text} on ${r.bg}`;
  const large = r.isLarge ? ' [L]' : '';
  const left  = `${label}${large}`.padEnd(COL_W);
  const ratio  = r.ratio.toFixed(2).padStart(5);
  const req    = r.required.toFixed(1).padStart(3);
  const result = r.passed ? PASS : FAIL;
  console.log(`${left}  ${ratio}:1  ≥${req}  ${result}  — ${r.role}`);
}

console.log('─'.repeat(80));
console.log('');

if (allPassed) {
  console.log('\x1b[32m✓ ALL PAIRS PASS WCAG AA\x1b[0m');
} else {
  const fails = results.filter(r => !r.passed);
  console.log(`\x1b[31m✗ ${fails.length} PAIR(S) FAIL — see above\x1b[0m`);
  for (const f of fails) {
    console.log(`  ✗ ${f.text} on ${f.bg}: ${f.ratio.toFixed(2)}:1 (need ${f.required}:1) — ${f.role}`);
  }
}

console.log('');

// Exit non-zero on failure so CI can catch it
if (!allPassed) process.exit(1);

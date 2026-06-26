/**
 * flags.ts — Build-time feature flags
 *
 * Source of truth is SETTINGS.md at the project root (edit the true/false
 * values there — no need to touch code). Resolution order per flag:
 *
 *   1. Build-time env var of the same name (PRELAUNCH / SCREEN_PUBLISHED) —
 *      lets CI and one-off `PRELAUNCH=false npm run build` still override.
 *   2. SETTINGS.md value.
 *   3. Safe default (PRELAUNCH=true, SCREEN_PUBLISHED=false).
 *
 * These run at build time only (static build / getStaticPaths); non-PUBLIC_
 * values are never exposed to the client bundle. A bad value in SETTINGS.md
 * throws (see parseSettings) so a typo fails the build loudly.
 */
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseSettings } from './parseSettings';

const KEYS = ['PRELAUNCH', 'SCREEN_PUBLISHED'] as const;
const DEFAULTS = { PRELAUNCH: true, SCREEN_PUBLISHED: false } as const;

// Resolve from the project root (where `astro build` / npm scripts run). Done
// via process.cwd() rather than import.meta.url because Astro bundles this
// module — a path relative to the bundled file would not find SETTINGS.md.
const SETTINGS_PATH = resolve(process.cwd(), 'SETTINGS.md');
const fromFile = existsSync(SETTINGS_PATH)
  ? parseSettings(readFileSync(SETTINGS_PATH, 'utf8'), KEYS)
  : {};

function envBool(value: unknown): boolean | undefined {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return undefined;
}

/** When true, the homepage renders the coming-soon capture page. */
export const PRELAUNCH: boolean =
  envBool(import.meta.env.PRELAUNCH) ?? fromFile.PRELAUNCH ?? DEFAULTS.PRELAUNCH;

/** When true, the /screen route is publicly visible. */
export const SCREEN_PUBLISHED: boolean =
  envBool(import.meta.env.SCREEN_PUBLISHED) ?? fromFile.SCREEN_PUBLISHED ?? DEFAULTS.SCREEN_PUBLISHED;

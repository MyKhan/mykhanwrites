/**
 * flags.ts — Build-time feature flags
 *
 * Read from import.meta.env at build time (Astro static build).
 * Non-PUBLIC_ vars are available server-side / at build time only;
 * they are NOT exposed to the client bundle.
 *
 * PRELAUNCH  — true by default (safe pre-launch state: coming-soon shows unless
 *              explicitly disabled with PRELAUNCH=false at build time).
 * SCREEN_PUBLISHED — false by default (Phase C4 gate; used in later phases).
 */

/** When true, the homepage renders the coming-soon capture page. */
export const PRELAUNCH: boolean = import.meta.env.PRELAUNCH !== 'false';

/** When true, the /screen route is publicly visible. */
export const SCREEN_PUBLISHED: boolean = import.meta.env.SCREEN_PUBLISHED === 'true';

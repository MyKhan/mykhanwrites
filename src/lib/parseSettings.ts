/**
 * parseSettings.ts — read boolean toggles out of SETTINGS.md.
 *
 * Pure and dependency-free (no fs, no import.meta) so it is trivially testable
 * and reusable. For each requested key it looks for a line like:
 *
 *   - PRELAUNCH: true
 *
 * Lines that don't match a known key are ignored, so prose around the toggles
 * can never break parsing. A recognised key whose value is not `true`/`false`
 * throws — fail loud rather than silently doing the wrong thing.
 */
export function parseSettings(
  text: string,
  keys: readonly string[],
): Record<string, boolean> {
  const result: Record<string, boolean> = {};
  for (const key of keys) {
    // Optional leading list marker, the key, a colon, then the first token.
    const match = text.match(new RegExp(`^\\s*[-*]?\\s*${key}\\s*:\\s*(\\S+)`, 'mi'));
    const captured = match?.[1];
    if (captured === undefined) continue;
    const raw = captured.toLowerCase().replace(/[.,;]+$/, '');
    if (raw !== 'true' && raw !== 'false') {
      throw new Error(
        `SETTINGS.md: "${key}" must be true or false (got "${captured}"). Fix the value and rebuild.`,
      );
    }
    result[key] = raw === 'true';
  }
  return result;
}

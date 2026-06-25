/**
 * inlineMarkdown — convert inline markdown emphasis to HTML.
 *
 * Used for build-time, Zod-validated author copy that contains
 * *italic* and **bold** markers (e.g. book/comp titles in JSON copy fields).
 *
 * Order of operations (intentional):
 *   1. Escape HTML entities in the raw string — neutralises any accidental
 *      raw HTML in copy before we inject our own tags.
 *   2. Convert **text** → <strong>text</strong>  (non-greedy)
 *   3. Convert *text*  → <em>text</em>            (non-greedy)
 *
 * The result is safe to render via `set:html` because:
 *   - The content is build-time author copy, not user input.
 *   - Step 1 ensures any raw < > & in the original are already escaped.
 */
export function inlineMarkdown(text: string): string {
  // Step 1 — escape HTML entities
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Step 2 — **bold** → <strong>
  const withStrong = escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Step 3 — *italic* → <em>  (must run after bold so ** is already consumed)
  const withEm = withStrong.replace(/\*(.+?)\*/g, '<em>$1</em>');

  return withEm;
}

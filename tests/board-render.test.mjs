import { describe, test, expect } from 'vitest';
import {
  validateBoard,
  applyMove,
  renderMarkdownSection,
  upsertSection,
  BOARD_START,
  BOARD_END,
} from '../board/board-render.mjs';

function fixture() {
  return {
    title: 'T',
    updatedAt: null,
    columns: [
      { id: 'todo', name: 'To Do', emoji: '⬜' },
      { id: 'done', name: 'Done', emoji: '✅' },
    ],
    tasks: [
      { id: 'a', title: 'Alpha', category: 'X', priority: 'high', gate: false, detail: 'd', column: 'todo' },
      { id: 'b', title: 'Beta', category: 'Y', priority: 'low', gate: true, detail: 'd', column: 'done' },
    ],
  };
}

describe('validateBoard', () => {
  test('accepts a well-formed board', () => {
    expect(() => validateBoard(fixture())).not.toThrow();
  });

  test('throws when a task references an unknown column', () => {
    const bad = fixture();
    bad.tasks[0].column = 'ghost';
    expect(() => validateBoard(bad)).toThrow(/unknown column/);
  });
});

describe('applyMove', () => {
  test('moves the task to the target column and stamps updatedAt', () => {
    const board = fixture();
    const next = applyMove(board, 'a', 'done', '2026-01-01T00:00:00Z');
    expect(next.tasks.find((t) => t.id === 'a').column).toBe('done');
    expect(next.updatedAt).toBe('2026-01-01T00:00:00Z');
  });

  test('does not mutate the input board (immutability)', () => {
    const board = fixture();
    applyMove(board, 'a', 'done', 'now');
    expect(board.tasks.find((t) => t.id === 'a').column).toBe('todo');
    expect(board.updatedAt).toBeNull();
  });

  test('throws on an unknown task or column', () => {
    const board = fixture();
    expect(() => applyMove(board, 'nope', 'done')).toThrow(/unknown task/);
    expect(() => applyMove(board, 'a', 'nope')).toThrow(/unknown column/);
  });
});

describe('renderMarkdownSection', () => {
  test('emits the markers, a progress count, and checkbox state', () => {
    const md = renderMarkdownSection(fixture());
    expect(md.startsWith(BOARD_START)).toBe(true);
    expect(md.trimEnd().endsWith(BOARD_END)).toBe(true);
    expect(md).toContain('**Progress: 1 / 2 done**');
    expect(md).toContain('- [x] **Beta**'); // done task is checked
    expect(md).toContain('- [ ] **Alpha**'); // todo task is unchecked
    expect(md).toContain('⛔ **HARD GATE**'); // gate badge on Beta
  });
});

describe('upsertSection', () => {
  test('appends the section when no markers exist', () => {
    const out = upsertSection('# Doc\n\nbody', 'SECTION');
    expect(out).toContain('# Doc');
    expect(out).toContain('SECTION');
  });

  test('replaces the existing block and is idempotent', () => {
    const original = `# Doc\n\n${BOARD_START}\nold\n${BOARD_END}\n`;
    const once = upsertSection(original, `${BOARD_START}\nnew\n${BOARD_END}`);
    expect(once).toContain('new');
    expect(once).not.toContain('old');
    // applying the same replacement again yields the same document
    const twice = upsertSection(once, `${BOARD_START}\nnew\n${BOARD_END}`);
    expect(twice).toBe(once);
  });
});

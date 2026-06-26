import { describe, test, expect } from 'vitest';
import { parseSettings } from '../src/lib/parseSettings.ts';

const KEYS = ['PRELAUNCH', 'SCREEN_PUBLISHED'];

describe('parseSettings', () => {
  test('reads true/false toggles from markdown list lines', () => {
    const md = '# Settings\n\n- PRELAUNCH: false\n- SCREEN_PUBLISHED: true\n';
    expect(parseSettings(md, KEYS)).toEqual({ PRELAUNCH: false, SCREEN_PUBLISHED: true });
  });

  test('ignores surrounding prose and only reads recognised keys', () => {
    const md = 'Intro text that mentions PRELAUNCH and must be ignored.\n\n- PRELAUNCH: true\n\nNotes.\n';
    expect(parseSettings(md, KEYS)).toEqual({ PRELAUNCH: true });
  });

  test('tolerates trailing punctuation, missing list marker, and casing', () => {
    const md = 'prelaunch: TRUE.\nSCREEN_PUBLISHED:false\n';
    expect(parseSettings(md, KEYS)).toEqual({ PRELAUNCH: true, SCREEN_PUBLISHED: false });
  });

  test('omits keys that are not present', () => {
    expect(parseSettings('- PRELAUNCH: true\n', KEYS)).toEqual({ PRELAUNCH: true });
  });

  test('throws a clear error on a non-boolean value (fail loud)', () => {
    expect(() => parseSettings('- PRELAUNCH: yes\n', KEYS)).toThrow(/must be true or false/);
  });
});

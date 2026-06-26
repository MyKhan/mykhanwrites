import { describe, test, expect } from 'vitest';
import { obfuscateEmail, makeMailtoHref } from '../src/lib/obfuscate';

const EMAIL = 'hello@mykhanwrites.com';

describe('obfuscateEmail', () => {
  test('raw address does not appear verbatim in obfuscated output', () => {
    // Arrange / Act
    const result = obfuscateEmail(EMAIL);
    // Assert
    expect(result).not.toContain(EMAIL);
  });

  test('encoding is reversible — decimal entities decode back to original address', () => {
    // Arrange
    const obfuscated = obfuscateEmail(EMAIL);
    // Act — decode all &#NN; decimal entities
    const decoded = obfuscated.replace(/&#(\d+);/g, (_: string, code: string) =>
      String.fromCharCode(Number(code))
    );
    // Assert
    expect(decoded).toBe(EMAIL);
  });

  test('output consists entirely of decimal HTML entities', () => {
    // Arrange / Act
    const result = obfuscateEmail(EMAIL);
    // Assert — every character becomes &#NN;
    // Split on '&#', drop the leading empty segment, each part must be "digits;"
    const parts = result.split('&#').filter((p) => p.length > 0);
    for (const part of parts) {
      expect(part).toMatch(/^\d+;/);
    }
  });
});

describe('makeMailtoHref', () => {
  test('raw email address does not appear verbatim in output', () => {
    // Arrange / Act
    const result = makeMailtoHref(EMAIL);
    // Assert
    expect(result).not.toContain(EMAIL);
  });

  test('decodes to a well-formed mailto: href', () => {
    // Arrange
    const result = makeMailtoHref(EMAIL);
    // Act — decode all &#NN; entities
    const decoded = result.replace(/&#(\d+);/g, (_: string, code: string) =>
      String.fromCharCode(Number(code))
    );
    // Assert
    expect(decoded).toBe(`mailto:${EMAIL}`);
    expect(decoded.startsWith('mailto:')).toBe(true);
  });
});

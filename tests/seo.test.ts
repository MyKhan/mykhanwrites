import { describe, test, expect } from 'vitest';
import { resolveAbsoluteUrl, buildCanonicalUrl, resolveOgImage } from '../src/lib/seo';

const SITE_ORIGIN = 'https://www.mykhanwrites.com';

describe('resolveAbsoluteUrl', () => {
  test('an already-absolute https URL passes through unchanged', () => {
    // Arrange
    const absolute = 'https://cdn.example.com/image.png';
    // Act
    const result = resolveAbsoluteUrl(absolute, SITE_ORIGIN);
    // Assert
    expect(result).toBe(absolute);
  });

  test('an already-absolute http URL passes through unchanged', () => {
    // Arrange
    const absolute = 'http://cdn.example.com/image.png';
    // Act
    const result = resolveAbsoluteUrl(absolute, SITE_ORIGIN);
    // Assert
    expect(result).toBe(absolute);
  });

  test('a relative path resolves to an absolute www URL', () => {
    // Arrange
    const relative = '/og/placeholder-1200x630.png';
    // Act
    const result = resolveAbsoluteUrl(relative, SITE_ORIGIN);
    // Assert
    expect(result).toBe('https://www.mykhanwrites.com/og/placeholder-1200x630.png');
    expect(result.startsWith('https://www.')).toBe(true);
  });
});

describe('buildCanonicalUrl', () => {
  test('root path produces a canonical URL with trailing slash', () => {
    // Arrange
    const pathname = '/';
    // Act
    const result = buildCanonicalUrl(pathname, SITE_ORIGIN);
    // Assert
    expect(result).toBe('https://www.mykhanwrites.com/');
    expect(result.endsWith('/')).toBe(true);
  });

  test('a trailing-slash pathname preserves the trailing slash in canonical URL', () => {
    // Arrange
    const pathname = '/novel/';
    // Act
    const result = buildCanonicalUrl(pathname, SITE_ORIGIN);
    // Assert
    expect(result).toBe('https://www.mykhanwrites.com/novel/');
    expect(result.endsWith('/')).toBe(true);
  });

  test('canonical URL uses the www site origin', () => {
    // Arrange
    const pathname = '/about/';
    // Act
    const result = buildCanonicalUrl(pathname, SITE_ORIGIN);
    // Assert
    expect(result.startsWith('https://www.mykhanwrites.com')).toBe(true);
  });
});

describe('resolveOgImage', () => {
  test('undefined ogImage falls back to default OG path resolved to absolute', () => {
    // Arrange / Act
    const result = resolveOgImage(undefined, SITE_ORIGIN);
    // Assert
    expect(result).toBe('https://www.mykhanwrites.com/og/placeholder-1200x630.png');
  });

  test('an absolute ogImage URL passes through unchanged', () => {
    // Arrange
    const absolute = 'https://cdn.example.com/og/custom.png';
    // Act
    const result = resolveOgImage(absolute, SITE_ORIGIN);
    // Assert
    expect(result).toBe(absolute);
  });

  test('a relative ogImage path resolves against the site origin', () => {
    // Arrange
    const relative = '/og/custom-1200x630.png';
    // Act
    const result = resolveOgImage(relative, SITE_ORIGIN);
    // Assert
    expect(result).toBe('https://www.mykhanwrites.com/og/custom-1200x630.png');
  });
});

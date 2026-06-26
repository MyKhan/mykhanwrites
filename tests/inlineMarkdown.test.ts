import { describe, test, expect } from 'vitest';
import { inlineMarkdown } from '../src/lib/inlineMarkdown';

describe('inlineMarkdown — HTML escaping', () => {
  test('escapes & in input before applying markup', () => {
    // Arrange
    const input = 'a & b';
    // Act
    const result = inlineMarkdown(input);
    // Assert
    expect(result).toBe('a &amp; b');
  });

  test('escapes < in input, preventing raw tag injection', () => {
    // Arrange
    const input = '<script>alert(1)</script>';
    // Act
    const result = inlineMarkdown(input);
    // Assert
    expect(result).toBe('&lt;script&gt;alert(1)&lt;/script&gt;');
  });

  test('escapes > in input', () => {
    // Arrange
    const input = 'a > b';
    // Act
    const result = inlineMarkdown(input);
    // Assert
    expect(result).toBe('a &gt; b');
  });

  test('escapes HTML entities before applying markup — no raw inline tags injected', () => {
    // Arrange — a literal HTML bold tag that must NOT become <b>
    const input = 'a <b>raw</b> tag';
    // Act
    const result = inlineMarkdown(input);
    // Assert
    expect(result).not.toContain('<b>');
    expect(result).toContain('&lt;b&gt;');
  });
});

describe('inlineMarkdown — emphasis conversion', () => {
  test('converts *text* to <em>text</em>', () => {
    // Arrange
    const input = '*italic*';
    // Act
    const result = inlineMarkdown(input);
    // Assert
    expect(result).toBe('<em>italic</em>');
  });

  test('converts **text** to <strong>text</strong>', () => {
    // Arrange
    const input = '**bold**';
    // Act
    const result = inlineMarkdown(input);
    // Assert
    expect(result).toBe('<strong>bold</strong>');
  });

  test('bold is resolved before italic so ** is not double-converted', () => {
    // Arrange — if bold ran after italic, **bold** would partly convert
    const input = '**bold** and *italic*';
    // Act
    const result = inlineMarkdown(input);
    // Assert
    expect(result).toBe('<strong>bold</strong> and <em>italic</em>');
  });

  test('plain text passes through unchanged', () => {
    // Arrange
    const input = 'Just plain text.';
    // Act
    const result = inlineMarkdown(input);
    // Assert
    expect(result).toBe('Just plain text.');
  });

  test('produces the heading HTML used in site.letters.heading', () => {
    // Arrange — the exact data field value from site.json
    const input = 'Read the first pages of *They Only Came When It Rained*';
    // Act
    const result = inlineMarkdown(input);
    // Assert — matches what the template previously rendered inline
    expect(result).toBe('Read the first pages of <em>They Only Came When It Rained</em>');
  });
});

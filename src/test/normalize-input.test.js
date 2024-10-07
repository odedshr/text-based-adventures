import normalizeInput from '../../docs/js/normalize-input.js';

describe('normalizeInput function', () => {
  it('should return input with no abbreviations unchanged', () => {
    const input = 'Hello World';
    const expectedOutput = 'Hello World';
    expect(normalizeInput(input)).toBe(expectedOutput);
  });

  it('should replace single abbreviation', () => {
    const input = "what's up";
    const expectedOutput = 'what is up';
    expect(normalizeInput(input)).toBe(expectedOutput);
  });

  it('should replace multiple abbreviations', () => {
    const input = "what's up, who's there?";
    const expectedOutput = 'what is up, who is there?';
    expect(normalizeInput(input)).toBe(expectedOutput);
  });

  it('should replace abbreviations in different cases', () => {
    const input = "What's Up, WHO'S THERE?";
    const expectedOutput = 'what is Up, who is THERE?';
    expect(normalizeInput(input)).toBe(expectedOutput);
  });

  it('should not replace non-abbreviation words', () => {
    const input = 'hello world';
    const expectedOutput = 'hello world';
    expect(normalizeInput(input)).toBe(expectedOutput);
  });

  it('should remove multiple spaces', () => {
    const input = 'hello   world';
    const expectedOutput = 'hello world';
    expect(normalizeInput(input)).toBe(expectedOutput);
  });

  it('should return empty string for empty input', () => {
    const input = '';
    const expectedOutput = '';
    expect(normalizeInput(input)).toBe(expectedOutput);
  });

  it('should throw error for null input', () => {
    const input = null;
    expect(() => normalizeInput(input)).toThrowError();
  });
});
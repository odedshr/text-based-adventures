import hasProfanity from '../../docs/js/profanity.js';

describe('hasProfanity function', () => {
  it('should return a message when input contains profanity', () => {
    const input = 'This is a damn test';
    expect(hasProfanity(input)).toBe(true);
  });

  it('should return undefined when input does not contain profanity', () => {
    const input = 'This is a clean test';
    expect(hasProfanity(input)).toBe(false);
  });

  it('should return undefined when input is empty', () => {
    const input = '';
    expect(hasProfanity(input)).toBe(false);
  });

  it('should return undefined when input is null', () => {
    const input = null;
    expect(hasProfanity(input)).toBe(false);
  });

  it('should return a message when input contains profanity in different case', () => {
    const input = 'This is a DAMN test';
    expect(hasProfanity(input)).toBe(true);
  });

  it('should return a message when input contains multiple profanity words', () => {
    const input = 'This is a damn hell test';
    expect(hasProfanity(input)).toBe(true);
  });
});
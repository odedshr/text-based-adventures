import handleProfanity from '../../docs/js/profanity.js';

const profanityMessage = `It's understandable to get frustrated, but getting upset won't help.
            Take a deep breath, and maybe try exploring your surroundings or interacting with items.`;

describe('handleProfanity function', () => {
  it('should return a message when input contains profanity', () => {
    const input = 'This is a damn test';
    const result = handleProfanity(input);
    expect(result).not.toBeUndefined();
    expect(result).toBe(profanityMessage);
  });

  it('should return undefined when input does not contain profanity', () => {
    const input = 'This is a clean test';
    const result = handleProfanity(input);
    expect(result).toBeUndefined();
  });

  it('should return undefined when input is empty', () => {
    const input = '';
    const result = handleProfanity(input);
    expect(result).toBeUndefined();
  });

  it('should return undefined when input is null', () => {
    const input = null;
    const result = handleProfanity(input);
    expect(result).toBeUndefined();
  });

  it('should return a message when input contains profanity in different case', () => {
    const input = 'This is a DAMN test';
    const result = handleProfanity(input);
    expect(result).not.toBeUndefined();
    expect(result).toBe(profanityMessage);
  });

  it('should return a message when input contains multiple profanity words', () => {
    const input = 'This is a damn hell test';
    const result = handleProfanity(input);
    expect(result).not.toBeUndefined();
    expect(result).toBe(profanityMessage);
  });
});
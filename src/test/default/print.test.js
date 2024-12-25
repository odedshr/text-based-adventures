import print from '../../../docs/js/default/print.js';

describe('print function', () => {
  it('should return the correct value when the textId is a string', () => {
    const gameDefinition = {
      strings: {
        'test-text-id': 'This is a test string',
      },
      variables: {
        console: { type: 'data', value: 'initial string' }
      },
    };
    const result = print(gameDefinition, 'test-text-id');
    expect(result).toBeUndefined(); // The function doesn't return anything, so we check that it doesn't throw an error
    expect(gameDefinition.variables.console).toEqual({ type: 'data', value: 'This is a test string' });
  });

  it('should call the GetStringMethod when the textId is a function', () => {
    const gameDefinition = {
      strings: {
        'test-text-id': (variables) => 'This is a test string',
      },
      variables: {
        console: { type: 'data', value: 'initial string' }
      },
    };
    const result = print(gameDefinition, 'test-text-id');
    expect(result).toBeUndefined(); // The function doesn't return anything, so we check that it doesn't throw an error
    expect(gameDefinition.variables.console).toEqual({ type: 'data', value: 'This is a test string' });
  });

  it('should replace the item and location placeholders with the correct values', () => {
    const gameDefinition = {
      strings: {
        'test-text-id': 'This is a test string with item and location',
      },
      variables: {
        console: { type: 'data', value: 'initial string' }
      },
    };
    const result = print(gameDefinition, 'test-text-id', 'my-item', 'my-location');
    expect(result).toBeUndefined(); // The function doesn't return anything, so we check that it doesn't throw an error
    expect(gameDefinition.variables.console).toEqual({ type: 'data', value: 'This is a test string with my-item and my-location' });
  });

  it('should set the console variable correctly', () => {
    const gameDefinition = {
      strings: {
        'test-text-id': 'This is a test string',
      },
      variables: {
        console: { type: 'data', value: 'initial string' }
      },
    };
    const result = print(gameDefinition, 'test-text-id');
    expect(result).toBeUndefined(); // The function doesn't return anything, so we check that it doesn't throw an error
    expect(gameDefinition.variables.console).toEqual({ type: 'data', value: 'This is a test string' });
  });

  // TODO: Add test for error handling
});
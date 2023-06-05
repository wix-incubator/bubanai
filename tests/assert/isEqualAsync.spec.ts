import { isEqualAsync } from '../../src';

describe('Assertions: isEqualAsync()', () => {
  it('should return true when actual and expected values are equal', async () => {
    const actual = async () => '';
    const expected = '';
    const result = await isEqualAsync(actual, expected);
    expect(result).toBe(true);
  });

  it('should return false when actual and expected values are not equal', async () => {
    const actual = async () => 'Hello';
    const expected = 'World';
    const result = await isEqualAsync(actual, expected);
    expect(result).toBe(false);
  });

  it('should return true when actual and expected promises resolve to equal values', async () => {
    const actual = async () => Promise.resolve({ name: 'John', age: 30 });
    const expected = Promise.resolve({ age: 30, name: 'John' });
    const result = await isEqualAsync(actual, expected);
    expect(result).toBe(true);
  });

  it('should return false when actual and expected promises resolve to different values', async () => {
    const actual = async () => Promise.resolve([1, 2, 3]);
    const expected = Promise.resolve([4, 5, 6]);
    const result = await isEqualAsync(actual, expected);
    expect(result).toBe(false);
  });

  it('should return false when actual promise rejects', async () => {
    const actual = async () => Promise.reject(new Error('Error'));
    const expected = 42;
    const result = await isEqualAsync(actual, expected);
    expect(result).toBe(false);
  });
});

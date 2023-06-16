import { findAsync } from '../../../src';

describe('Сollection async: findAsync()', () => {
  it('should find the first element that passes the async filter', async () => {
    const elements = [1, 2, 3, 4, 5];
    const asyncFilter = async (arg: number) => arg % 2 === 0;
    const result = await findAsync(elements, asyncFilter);

    expect(result).toBe(2);
  });

  it('should return undefined if no element passes the async filter', async () => {
    const elements = [1, 3, 5];
    const asyncFilter = async (arg: number) => arg % 2 === 0;
    const result = await findAsync(elements, asyncFilter);

    expect(result).toBeUndefined();
  });

  it('should handle an empty input array', async () => {
    const elements: number[] = [];
    const asyncFilter = async (arg: number) => !!arg;
    const result = await findAsync(elements, asyncFilter);

    expect(result).toBeUndefined();
  });

  it('should work with promises in the input array', async () => {
    const promises = [
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3),
    ];
    const asyncFilter = async (arg: number) => arg % 2 === 0;
    const result = await findAsync(promises, asyncFilter);

    expect(result).toBe(2);
  });
});

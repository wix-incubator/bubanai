import { filterAsync, wait } from '../../../src';

const wrapWithWait = async (item: any) => {
  wait(200);
  return item;
};

describe('Сollection async: filterAsync()', () => {
  it('should filter promises elements based on the async filter', async () => {
    const elements = [1, 2, 3, 4, 5].map((item) => wrapWithWait(item));
    const asyncFilter = async (arg: number) => arg % 2 !== 0;
    const result = await filterAsync(elements, asyncFilter);

    expect(result).toEqual([1, 3, 5]);
  });

  it('should maintain the order of filtered promises of elements', async () => {
    const elements = ['apple', 'banana', 'orange', 'mango'].map((item) =>
      wrapWithWait(item),
    );
    const asyncFilter = async (arg: string) => arg.length <= 5;
    const result = await filterAsync(elements, asyncFilter);

    expect(result).toEqual(['apple', 'mango']);
  });

  it('should maintain the order of filtered elements', async () => {
    const elements = ['apple', 'banana', 'orange', 'mango'];
    const asyncFilter = async (arg: string) => arg.length <= 5;
    const result = await filterAsync(elements, asyncFilter);

    expect(result).toEqual(['apple', 'mango']);
  });

  it('should return an empty array if no elements pass the async filter', async () => {
    const elements = [10, 20, 30, 40, 50];
    const asyncFilter = async (arg: number) => !arg;
    const result = await filterAsync(elements, asyncFilter);

    expect(result).toEqual([]);
  });

  it('should handle an empty input array', async () => {
    const elements: number[] = [];
    const asyncFilter = async (arg: number) => !!arg;
    const result = await filterAsync(elements, asyncFilter);

    expect(result).toEqual([]);
  });
});

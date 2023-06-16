import { mapAsync, wait } from '../../../src';

let waitTime = 350;
const wrapWithWait = async (item: number) => {
  wait(waitTime);
  waitTime -= 100;
  return item;
};

describe('Сollection async: mapAsync()', () => {
  it('should map the elements using the async mapper function', async () => {
    const elements = [1, 2, 3, 4, 5];
    const mapAction = async (arg: number) => arg * 2;

    const result = await mapAsync(elements, mapAction);

    expect(result).toEqual([2, 4, 6, 8, 10]);
  });

  it('should handle an empty input array', async () => {
    const elements: number[] = [];
    const mapAction = async (arg: number) => arg * 2;
    const result = await mapAsync(elements, mapAction);

    expect(result).toEqual([]);
  });

  it('should work with promises in the input array', async () => {
    const promises = [1, 2, 3].map((item) => wrapWithWait(item));
    const mapAction = async (arg: number) => arg * 2;
    const result = await mapAsync(promises, mapAction);

    expect(result).toEqual([2, 4, 6]);
  });
});

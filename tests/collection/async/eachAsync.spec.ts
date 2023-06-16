import { eachAsync } from '../../../src';

describe('Сollection async: eachAsync()', () => {
  const mockIteratee = jest.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    mockIteratee.mockClear();
  });

  it('should execute iteratee for each promise in the collection', async () => {
    const promises = [
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3),
    ];
    await eachAsync(promises, mockIteratee);

    expect(mockIteratee).toHaveBeenCalledTimes(promises.length);
    expect(mockIteratee).toHaveBeenCalledWith(1);
    expect(mockIteratee).toHaveBeenCalledWith(2);
    expect(mockIteratee).toHaveBeenCalledWith(3);
  });

  it('should execute iteratee in the correct order', async () => {
    const promises = [
      Promise.resolve('first'),
      Promise.resolve('second'),
      Promise.resolve('third'),
    ];
    const iterateeOrder: string[] = [];

    const iteratee = jest.fn().mockImplementation((item: string) => {
      iterateeOrder.push(item);
    });

    await eachAsync(promises, iteratee);

    expect(iterateeOrder).toEqual(['first', 'second', 'third']);
  });
});

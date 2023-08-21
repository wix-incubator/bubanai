import { createPromiseChain } from '../../../src';

describe('Сollection async: createPromiseChain()', () => {
  const mockAction = jest.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    mockAction.mockClear();
  });

  it('should execute action for each item in the array', async () => {
    const items = [1, 2, 3];
    await createPromiseChain(items, mockAction);

    expect(mockAction).toHaveBeenCalledTimes(items.length);
    expect(mockAction).toHaveBeenCalledWith(1);
    expect(mockAction).toHaveBeenCalledWith(2);
    expect(mockAction).toHaveBeenCalledWith(3);
  });

  it('should execute actions in the correct order', async () => {
    const items = [1, 2, 3];
    const actionOrder: number[] = [];

    const action = jest.fn().mockImplementation((item: number) => {
      actionOrder.push(item);
      return Promise.resolve();
    });

    await createPromiseChain(items, action);

    expect(actionOrder).toEqual(items);
  });

  it('should return a resolved promise when items array is empty', async () => {
    const items: number[] = [];
    const result = await createPromiseChain(items, mockAction);

    expect(result).toBeUndefined();
  });

  it('should handle rejected promises from action function', async () => {
    const items = [1, 2, 3];
    const errorMessage = 'Error occurred';

    const action = jest.fn().mockImplementation((item: number) => {
      if (item === 2) {
        return Promise.reject(new Error(errorMessage));
      }
      return Promise.resolve();
    });

    await expect(createPromiseChain(items, action)).rejects.toThrow(
      errorMessage,
    );
  });
});

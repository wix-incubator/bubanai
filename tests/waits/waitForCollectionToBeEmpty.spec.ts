import { wait, waitForCollectionToBeEmpty } from '../../src';

describe('Waits: waitForCollectionToBeEmpty()', () => {
  it('resolves if collection length is equal 0', async () => {
    const result = [1];
    const actionTimeout = 2000;
    const pollIntervalMs = 500;
    const popVarFunc = async () => {
      await wait(actionTimeout);
      result.pop();
      return result;
    };
    const collection = jest.fn(() => Promise.resolve(result));
    popVarFunc();
    await expect(
      waitForCollectionToBeEmpty(collection, {
        pollIntervalMs,
      }),
    ).resolves.toBeUndefined();
    expect(collection).toHaveBeenCalledTimes(
      actionTimeout / pollIntervalMs + 1,
    );
  });

  it('rejects if collection length is not equal 0', async () => {
    const array = [1];
    const collection = jest.fn(async () => array);
    const timeoutMs = 2000;
    const pollIntervalMs = 500;
    await expect(
      waitForCollectionToBeEmpty(collection, {
        timeoutMs,
        pollIntervalMs,
      }),
    ).rejects.toThrowError(
      `Collection is not empty after timeout ${timeoutMs / 1000} s.`,
    );
    expect(collection).toHaveBeenCalledTimes(timeoutMs / pollIntervalMs);
  });

  it('resolves simultaneously if collection length is equal 0', async () => {
    const array = [];
    const collection = jest.fn(async () => array);
    await expect(
      waitForCollectionToBeEmpty(collection),
    ).resolves.toBeUndefined();
    expect(collection).toHaveBeenCalledTimes(1);
  });
});

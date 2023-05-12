import { wait, waitForCollectionToBeNotEmpty } from '../../src';

describe('Waits: waitForCollectionToBeNotEmpty()', () => {
  it('resolves if collection length is NOT equal 0', async () => {
    const result: number[] = [];
    const actionTimeout = 2000;
    const pollIntervalMs = 500;
    const pushVarFunc = async () => {
      await wait(actionTimeout);
      result.push(1);
      return result;
    };
    const collection = jest.fn(() => Promise.resolve(result));
    pushVarFunc();
    await expect(
      waitForCollectionToBeNotEmpty(collection, {
        pollIntervalMs,
      }),
    ).resolves.toBeUndefined();
    expect(collection).toHaveBeenCalledTimes(
      actionTimeout / pollIntervalMs + 1,
    );
  });

  it('rejects if collection length is equal 0 after timeout', async () => {
    const array = [];
    const collection = jest.fn(async () => array);
    const timeoutMs = 2000;
    const pollIntervalMs = 500;
    await expect(
      waitForCollectionToBeNotEmpty(collection, {
        timeoutMs,
        pollIntervalMs,
      }),
    ).rejects.toThrowError(
      `Collection is left empty after timeout ${timeoutMs / 1000}.`,
    );
    expect(collection).toHaveBeenCalledTimes(timeoutMs / pollIntervalMs);
  });

  it('resolves simultaneously if collection length is NOT equal 0', async () => {
    const array = [1];
    const collection = jest.fn(async () => array);
    await expect(
      waitForCollectionToBeNotEmpty(collection),
    ).resolves.toBeUndefined();
    expect(collection).toHaveBeenCalledTimes(1);
  });
});

import { wait, waitForCollectionLengthToBe } from '../../src';

describe('Waits: waitForCollectionLengthToBe()', () => {
  it('resolves if collection length is equal to expected length', async () => {
    const result = [1, 2];
    const actionTimeout = 2000;
    const pollIntervalMs = 500;
    const pushVarFunc = async () => {
      await wait(actionTimeout);
      result.push(3);
      return result;
    };
    const expectedLength = result.length + 1;
    const collection = jest.fn(() => Promise.resolve(result));
    pushVarFunc();
    await expect(
      waitForCollectionLengthToBe(collection, expectedLength, {
        pollIntervalMs,
      }),
    ).resolves.toBeUndefined();
    expect(collection).toHaveBeenCalledTimes(
      actionTimeout / pollIntervalMs + 1,
    );
  });

  it('rejects if collection length is not equal to expected length after wait', async () => {
    const array = [1, 2, 3, 4];
    const collection = jest.fn(async () => array);
    const expectedLength = array.length - 1;
    const timeoutMs = 2000;
    const pollIntervalMs = 500;
    await expect(
      waitForCollectionLengthToBe(collection, expectedLength, {
        timeoutMs,
        pollIntervalMs,
      }),
    ).rejects.toThrowError(
      `Expected collection length: ${expectedLength}, but was: ${await collection().then(
        (c) => c.length,
      )}`,
    );
    expect(collection).toHaveBeenCalledTimes(timeoutMs / pollIntervalMs + 2);
  });

  it('resolves simultaneously if collection length is equal to expected length', async () => {
    const array = [];
    const collection = jest.fn(async () => array);
    const expectedLength = array.length;
    await expect(
      waitForCollectionLengthToBe(collection, expectedLength),
    ).resolves.toBeUndefined();
    expect(collection).toHaveBeenCalledTimes(1);
  });
});

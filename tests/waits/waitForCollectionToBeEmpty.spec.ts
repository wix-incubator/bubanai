import { TestError, wait, waitForCollectionToBeEmpty } from '../../src';
import { wrapError } from './waitUtils.testKit';

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
      wrapError(TestError.CollectionIsEmpty(timeoutMs), collection),
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

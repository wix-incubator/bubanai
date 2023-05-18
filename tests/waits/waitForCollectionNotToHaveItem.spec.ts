import { TestError, wait, waitForCollectionNotToHaveItem } from '../../src';
import { wrapError } from './waitUtils.testKit';

describe('Waits: waitForCollectionNotToHaveItem()', () => {
  it('resolves if collection does not have item after wait', async () => {
    const item = { a: 1 };
    const result = ['foo', item];
    const actionTimeout = 2000;
    const pollIntervalMs = 500;
    const pushVarFunc = async () => {
      await wait(actionTimeout);
      result.pop();
      return result;
    };
    const collection = jest.fn(() => Promise.resolve(result));
    pushVarFunc();
    await expect(
      waitForCollectionNotToHaveItem(collection, item, {
        pollIntervalMs,
      }),
    ).resolves.toBeUndefined();
    expect(collection).toHaveBeenCalledTimes(
      actionTimeout / pollIntervalMs + 1,
    );
  });

  it('rejects if collection has expected item after wait', async () => {
    const item = { a: 1 };
    const result = ['foo', item];
    const collection = jest.fn(async () => result);
    const timeoutMs = 2000;
    const pollIntervalMs = 500;
    await expect(
      waitForCollectionNotToHaveItem(collection, item, {
        timeoutMs,
        pollIntervalMs,
      }),
    ).rejects.toThrowError(
      wrapError(
        await TestError.CollectionNotToHaveItem(collection, item, timeoutMs),
        collection,
      ),
    );
    expect(collection).toHaveBeenCalledTimes(timeoutMs / pollIntervalMs + 2);
  });

  it('resolves simultaneously if collection does not have expected item', async () => {
    const result = [{ a: 1 }];
    const collection = jest.fn(async () => result);
    await expect(
      waitForCollectionNotToHaveItem(collection, { a: 2 }),
    ).resolves.toBeUndefined();
    expect(collection).toHaveBeenCalledTimes(1);
  });
});

import { TestError, wait, waitForCollectionToHaveItem } from '../../src';
import { wrapError } from '../utils';

describe('Waits: waitForCollectionToHaveItem()', () => {
  it('resolves if collection has item after wait', async () => {
    const item = { a: 1 };
    const result: any[] = ['foo'];
    const actionTimeout = 2000;
    const pollIntervalMs = 500;
    const pushVarFunc = async () => {
      await wait(actionTimeout);
      result.push(item);
      return result;
    };
    const collection = jest.fn(() => Promise.resolve(result));
    pushVarFunc();
    await expect(
      waitForCollectionToHaveItem(collection, item, {
        pollIntervalMs,
      }),
    ).resolves.toBeUndefined();
    expect(collection).toHaveBeenCalledTimes(
      actionTimeout / pollIntervalMs + 1,
    );
  });

  it('rejects if collection does not have expected item after wait', async () => {
    const item = { a: 1 };
    const result: any[] = ['foo'];
    const collection = jest.fn(async () => result);
    const timeoutMs = 2000;
    const pollIntervalMs = 500;
    await expect(
      waitForCollectionToHaveItem(collection, item, {
        timeoutMs,
        pollIntervalMs,
      }),
    ).rejects.toThrowError(
      wrapError(
        await TestError.CollectionToHaveItem(collection, item, timeoutMs),
        collection,
      ),
    );
    expect(collection).toHaveBeenCalledTimes(timeoutMs / pollIntervalMs + 2);
  });

  it('resolves simultaneously if collection has expected item', async () => {
    const item = ['foo'];
    const result = [item];
    const collection = jest.fn(async () => result);
    await expect(
      waitForCollectionToHaveItem(collection, item),
    ).resolves.toBeUndefined();
    expect(collection).toHaveBeenCalledTimes(1);
  });
});

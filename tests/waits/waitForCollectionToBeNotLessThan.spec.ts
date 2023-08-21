import {
  TestError,
  wait,
  waitForCollectionLengthToBeNotLessThan,
} from '../../src';
import { wrapError } from '../utils';

describe('Waits: waitForCollectionLengthToBeNotLessThan()', () => {
  it('resolves if collection length is not less than than to expected length', async () => {
    const result = [1, 2];
    const actionTimeout = 2000;
    const pollIntervalMs = 500;
    const pushVarFunc = async () => {
      await wait(actionTimeout);
      result.push(3);
      return result;
    };
    const notLessThan = result.length + 1;
    const collection = jest.fn(() => Promise.resolve(result));
    pushVarFunc();
    await expect(
      waitForCollectionLengthToBeNotLessThan(collection, notLessThan, {
        pollIntervalMs,
      }),
    ).resolves.toBeUndefined();
    expect(collection).toHaveBeenCalledTimes(
      actionTimeout / pollIntervalMs + 1,
    );
  });

  it('rejects if collection length is less than than expected length after wait', async () => {
    const result = [1, 2, 3, 4];
    const collection = jest.fn(async () => result);
    const notLessThan = result.length + 1;
    const timeoutMs = 2000;
    const pollIntervalMs = 500;
    await expect(
      waitForCollectionLengthToBeNotLessThan(collection, notLessThan, {
        timeoutMs,
        pollIntervalMs,
      }),
    ).rejects.toThrow(
      wrapError(
        await TestError.CollectionLengthToBeNotLessThan(
          notLessThan,
          collection,
          timeoutMs,
        ),
        collection,
      ),
    );
    expect(collection).toHaveBeenCalledTimes(timeoutMs / pollIntervalMs + 2);
  });

  it('resolves simultaneously if collection length is more than expected length', async () => {
    const collection = jest.fn(async () => [1, 2, 3, 4]);
    const moreThan = 1;
    await expect(
      waitForCollectionLengthToBeNotLessThan(collection, moreThan),
    ).resolves.toBeUndefined();
    expect(collection).toHaveBeenCalledTimes(1);
  });
});

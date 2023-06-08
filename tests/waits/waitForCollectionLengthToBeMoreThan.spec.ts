import {
  TestError,
  wait,
  waitForCollectionLengthToBeMoreThan,
} from '../../src';
import { wrapError } from '../utils';

describe('Waits: waitForCollectionLengthToBeMoreThan()', () => {
  it('resolves if collection length is more than to expected length', async () => {
    const result = [1, 2];
    const actionTimeout = 2000;
    const pollIntervalMs = 500;
    const pushVarFunc = async () => {
      await wait(actionTimeout);
      result.push(3);
      return result;
    };
    const moreThan = result.length;
    const collection = jest.fn(() => Promise.resolve(result));
    pushVarFunc();
    await expect(
      waitForCollectionLengthToBeMoreThan(collection, moreThan, {
        pollIntervalMs,
      }),
    ).resolves.toBeUndefined();
    expect(collection).toHaveBeenCalledTimes(
      actionTimeout / pollIntervalMs + 1,
    );
  });

  it('rejects if collection length is not more than expected length after wait', async () => {
    const result = [1, 2, 3, 4];
    const collection = jest.fn(async () => result);
    const moreThan = result.length;
    const timeoutMs = 2000;
    const pollIntervalMs = 500;
    await expect(
      waitForCollectionLengthToBeMoreThan(collection, moreThan, {
        timeoutMs,
        pollIntervalMs,
      }),
    ).rejects.toThrowError(
      wrapError(
        await TestError.CollectionLengthToBeMoreThan(
          moreThan,
          collection,
          timeoutMs,
        ),
        collection,
      ),
    );
    expect(collection).toHaveBeenCalledTimes(timeoutMs / pollIntervalMs + 2);
  });

  it('resolves simultaneously if collection length is more than expected length', async () => {
    const collection = jest.fn(async () => []);
    const moreThan = -1;
    await expect(
      waitForCollectionLengthToBeMoreThan(collection, moreThan),
    ).resolves.toBeUndefined();
    expect(collection).toHaveBeenCalledTimes(1);
  });
});

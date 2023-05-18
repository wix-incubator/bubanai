import { waitFor } from '../waitFor';
import { TestError, throwTestError } from '../error';
import { WaitOptions } from '../types';
import { ACTION_TIMEOUT } from '../settings';

/**
 * Waits for collection length to be equal defined number.
 * If it is not after timeout - throws exception.
 * @param collection Async function that returns array
 * @param expectedLength Expected collection length
 * @param waitOptions WaitOptions
 *
 * @category Waiters
 */
export function waitForCollectionLengthToBe(
  collection: () => Promise<any[]>,
  expectedLength: number,
  waitOptions?: WaitOptions,
) {
  return waitFor(
    async () => (await collection()).length === expectedLength,
    waitOptions,
  ).catch(async () =>
    throwTestError(
      await TestError.CollectionLengthToBe(
        expectedLength,
        collection,
        waitOptions?.timeoutMs ?? ACTION_TIMEOUT,
      ),
      collection,
    ),
  );
}

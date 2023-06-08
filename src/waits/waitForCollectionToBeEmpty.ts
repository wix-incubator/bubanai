import { DefaultWaitOptions, WaitOptions } from '../types';
import { waitFor } from '../waitFor';
import { TestError } from '../error';

/**
 * Waits for collection length to be 0.
 * If it is not after timeout - throws exception.
 * @param collection Async function that returns array
 * @param waitOptions WaitOptions
 *
 * @category Waiters
 */
export function waitForCollectionToBeEmpty(
  collection: () => Promise<any[]>,
  waitOptions?: WaitOptions,
) {
  return waitFor(
    async () => (await collection()).length === 0,
    waitOptions,
    TestError.CollectionIsEmpty(
      waitOptions?.timeoutMs ?? DefaultWaitOptions.timeoutMs,
    ),
    collection,
  );
}

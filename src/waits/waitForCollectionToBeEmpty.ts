import { DefaultWaitOptions, WaitOptions } from '../types';
import { waitFor } from '../waitFor';

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
    `Collection is not empty after timeout ${
      (waitOptions?.timeoutMs || DefaultWaitOptions.timeoutMs) / 1000
    } s.`,
    collection,
  );
}

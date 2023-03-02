import { waitFor } from '../waitFor';
import { DefaultWaitOptions, WaitOptions } from '../types';

/**
 * Waits for collection length to be NOT 0.
 * If it is after timeout - throws exception.
 * @param collection Async function that returns array
 * @param waitOptions WaitOptions
 *
 * @category Waiters
 */
export function waitForCollectionToBeNotEmpty(
  collection: () => Promise<any[]>,
  waitOptions?: WaitOptions,
) {
  return waitFor(
    async () => (await collection()).length > 0,
    waitOptions,
    `Collection is left empty after timeout ${
      waitOptions?.timeoutMs ?? DefaultWaitOptions.timeoutMs / 1000
    }.`,
    collection,
  );
}

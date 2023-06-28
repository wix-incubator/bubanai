import { waitFor } from '../waitFor';
import type { WaitOptions } from '../types';
import { DefaultWaitOptions } from '../types';
import { TestError } from '../error';

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
    TestError.CollectionIsNotEmpty(
      waitOptions?.timeoutMs ?? DefaultWaitOptions.timeoutMs,
    ),
    collection,
  );
}

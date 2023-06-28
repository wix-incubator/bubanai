import { waitFor } from '../waitFor';
import { TestError, throwTestError } from '../error';
import type { WaitOptions } from '../types';
import { DefaultWaitOptions } from '../types';

/**
 * Waits for collection length to be more than defined number.
 * If it is not after timeout - throws exception.
 * @param collection Async function that returns array
 * @param moreThan Min length - 1
 * @param waitOptions WaitOptions
 *
 * @category Waiters
 */
export function waitForCollectionLengthToBeMoreThan(
  collection: () => Promise<any[]>,
  moreThan: number,
  waitOptions?: WaitOptions,
) {
  return waitFor(
    () => collection().then((col) => col.length > moreThan),
    waitOptions,
  ).catch(async () =>
    throwTestError(
      await TestError.CollectionLengthToBeMoreThan(
        moreThan,
        collection,
        waitOptions?.timeoutMs ?? DefaultWaitOptions.timeoutMs,
      ),
      collection,
    ),
  );
}

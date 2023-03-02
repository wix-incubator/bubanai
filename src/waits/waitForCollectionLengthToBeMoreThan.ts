import { waitFor } from '../waitFor';
import { throwTestError } from '../error';
import { WaitOptions } from '../types';

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
      `Expected collection length is more than: ${moreThan}, but was: ${await collection().then(
        (c) => c.length,
      )}`,
      collection,
    ),
  );
}

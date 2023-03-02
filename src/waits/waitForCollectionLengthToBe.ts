import { waitFor } from '../waitFor';
import { throwTestError } from '../error';
import { WaitOptions } from '../types';

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
      `Expected collection length: ${expectedLength}, but was: ${await collection().then(
        (c) => c.length,
      )}`,
      collection,
    ),
  );
}

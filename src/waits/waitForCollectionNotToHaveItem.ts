import { TestError, throwTestError } from '../error';
import { waitFor } from '../waitFor';
import { WaitOptions } from '../types';
import { ACTION_TIMEOUT } from '../settings';

/**
 * Waits for collection NOT to have object with type.
 * If it is has after timeout - throws exception.
 * @param func Async function that returns array of objects with type
 * @param value Item of same type as collection item that expected NOT to exist in collection
 * @param waitOptions WaitOptions
 *
 * @category Waiters
 */
export async function waitForCollectionNotToHaveItem<T>(
  func: () => Promise<T[]>,
  value: T,
  waitOptions?: WaitOptions,
) {
  return waitFor(
    () => func().then((arr) => !arr.includes(value)),
    waitOptions,
  ).catch(async () =>
    throwTestError(
      await TestError.CollectionNotToHaveItem(
        func,
        value,
        waitOptions?.timeoutMs ?? ACTION_TIMEOUT,
      ),
      func,
    ),
  );
}

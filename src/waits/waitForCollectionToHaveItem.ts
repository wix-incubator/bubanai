import { waitFor } from '../waitFor';
import { TestError, throwTestError } from '../error';
import { DefaultWaitOptions, WaitOptions } from '../types';

/**
 * Waits for collection to have object with type.
 * If it is not after timeout - throws exception.
 * @param func Async function that returns array of objects with type
 * @param value Item of same type as collection item that expected to exist in collection
 * @param waitOptions WaitOptions
 *
 * @category Waiters
 */
export async function waitForCollectionToHaveItem<T>(
  func: () => Promise<T[]>,
  value: T,
  waitOptions?: WaitOptions,
) {
  return waitFor(
    () => func().then((arr) => arr.includes(value)),
    waitOptions,
  ).catch(async () =>
    throwTestError(
      await TestError.CollectionToHaveItem(
        func,
        value,
        waitOptions?.timeoutMs ?? DefaultWaitOptions.timeoutMs,
      ),
      func,
    ),
  );
}

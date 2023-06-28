import { waitForObjectsToBeEqual } from './waitForObjectsToBeEqual';
import type { WaitOptions } from '../types';

/**
 * Waits for async function value to be undefined.
 * If it is not after timeout - throws exception.
 * @param func Async function with type
 * @param waitOptions WaitOptions
 *
 * @category Waiters
 */
export async function waitForFunctionToBeUndefined<T>(
  func: () => Promise<T>,
  waitOptions?: WaitOptions,
) {
  return waitForObjectsToBeEqual(() => func(), undefined, func, waitOptions);
}

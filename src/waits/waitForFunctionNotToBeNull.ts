import type { WaitOptions } from '../types';
import { waitForObjectsNotToBeEqual } from './waitForObjectsNotToBeEqual';

/**
 * Waits for async function value NOT to be null.
 * If it is after timeout - throws exception.
 * @param func Async function with type
 * @param waitOptions WaitOptions
 *
 * @category Waiters
 */
export async function waitForFunctionNotToBeNull<T>(
  func: () => Promise<T>,
  waitOptions?: WaitOptions,
) {
  return waitForObjectsNotToBeEqual(() => func(), null, func, waitOptions);
}

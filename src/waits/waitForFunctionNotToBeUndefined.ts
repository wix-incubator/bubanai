import { WaitOptions } from '../types';
import { waitForObjectsNotToBeEqual } from './waitForObjectsNotToBeEqual';

/**
 * Waits for async function value NOT to be undefined.
 * If it is after timeout - throws exception.
 * @param func Async function with type
 * @param waitOptions WaitOptions
 *
 * @category Waiters
 */
export function waitForFunctionNotToBeUndefined<T>(
  func: () => Promise<T>,
  waitOptions?: WaitOptions,
) {
  return waitForObjectsNotToBeEqual(() => func(), undefined, func, waitOptions);
}

import { WaitOptions } from '../types';
import { waitForObjectsToBeEqual } from './waitForObjectsToBeEqual';

/**
 * Waits for async function value to be null.
 * If it is not after timeout - throws exception.
 * @param func Async function with type
 * @param waitOptions WaitOptions
 *
 * @category Waiters
 */
export async function waitForFunctionToBeNull<T>(
  func: () => Promise<T>,
  waitOptions?: WaitOptions,
) {
  return waitForObjectsToBeEqual(() => func(), null, func, waitOptions);
}

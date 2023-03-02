import { WaitOptions } from '../types';
import { waitForFunctionValueToBeChanged } from './waitForFunctionValueToBeChanged';
import { waitForValueToStopChanging } from './waitForValueToStopChanging';

/**
 * Waits for async function value to be changed and then not to change in some interval.
 * Useful when you expect that value you get would be changed after some action and then there would be several temp states (animation, for ex.).
 * If it is NOT after timeout - throws exception.
 * @param func Async function with type which value you expect to be changed
 * @param action Async function that represents action after which change is expected
 * @param waitOptions WaitOptions
 *
 * @category Waiters
 */
export async function waitForFunctionValueToBeChangedAndStabilized<T>(
  func: () => Promise<T>,
  action: () => Promise<any>,
  waitOptions?: WaitOptions,
) {
  await waitForFunctionValueToBeChanged(func, action, waitOptions);
  await waitForValueToStopChanging(func, waitOptions);
}

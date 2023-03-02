import { isEqualAsync } from '../assert';
import { waitFor } from '../waitFor';
import { WaitOptions } from '../types';

/**
 * Waits for async function value to be changed.
 * Useful when you expect that value you get would be changed after some action.
 * If it is NOT after timeout - throws exception.
 * @param func Async function with type which value you expect to be changed
 * @param action Async function that represents action after which change is expected
 * @param waitOptions WaitOptions
 *
 * @category Waiters
 */
export async function waitForFunctionValueToBeChanged<T>(
  func: () => Promise<T>,
  action: () => Promise<any>,
  waitOptions?: WaitOptions,
) {
  const funcValue = await func();
  await action();
  await waitFor(
    async () => {
      const result = await isEqualAsync(func, funcValue);
      return !result;
    },
    waitOptions,
    `Value expected to change after ${action.toString()} was called and not to equal ${JSON.stringify(
      funcValue,
    )} but it is still the same.`,
    func,
  );
}

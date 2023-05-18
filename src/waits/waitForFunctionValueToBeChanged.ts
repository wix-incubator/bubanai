import { isEqualAsync } from '../assert';
import { waitFor } from '../waitFor';
import { WaitOptions } from '../types';
import { ACTION_TIMEOUT } from '../settings';
import { TestError } from '../error';

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
    await TestError.FunctionValueToBeChanged(
      funcValue,
      action,
      waitOptions?.timeoutMs ?? ACTION_TIMEOUT,
    ),
    func,
  );
}

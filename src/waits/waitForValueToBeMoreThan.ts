import { waitFor } from '../waitFor';
import { WaitOptions } from '../types';
import { TestError, throwTestError } from '../error';
import { ACTION_TIMEOUT } from '../settings';

/**
 * Waits for async function numeric value is more than expected value
 * If it is not after timeout - throws exception.
 * @param func Async function with return type: number
 * @param value Number value that is more than to function
 * @param waitOptions WaitOptions
 *
 * @category Waiters
 */
export async function waitForValueToBeMoreThan(
  func: () => Promise<number>,
  value: number,
  waitOptions?: WaitOptions,
) {
  return waitFor(() => func().then((v) => v > value), waitOptions).catch(
    async () =>
      throwTestError(
        await TestError.ValueIsMoreThan(
          func,
          value,
          waitOptions?.timeoutMs ?? ACTION_TIMEOUT,
        ),
        func,
      ),
  );
}

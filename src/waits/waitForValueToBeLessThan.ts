import { TestError, throwTestError } from '../error';
import { WaitOptions } from '../types';
import { waitFor } from '../waitFor';
import { ACTION_TIMEOUT } from '../settings';

/**
 * Waits for async function numeric value is less than expected value.
 * If it is not after timeout - throws exception.
 * @param func Async function with return type: number
 * @param value Number value that is less than to function
 * @param waitOptions WaitOptions
 *
 * @category Waiters
 */
export async function waitForValueToBeLessThan(
  func: () => Promise<number>,
  value: number,
  waitOptions?: WaitOptions,
) {
  return waitFor(() => func().then((v) => v < value), waitOptions).catch(
    async () =>
      throwTestError(
        await TestError.ValueIsLessThan(
          func,
          value,
          waitOptions?.timeoutMs ?? ACTION_TIMEOUT,
        ),
        func,
      ),
  );
}

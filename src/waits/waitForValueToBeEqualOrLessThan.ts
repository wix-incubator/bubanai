import { TestError, throwTestError } from '../error';
import type { WaitOptions } from '../types';
import { DefaultWaitOptions } from '../types';
import { waitFor } from '../waitFor';

/**
 * Waits for async function numeric value is equal or less than expected value.
 * If it is not after timeout - throws exception.
 * @param func Async function with return type: number
 * @param value Number value that is equal or less than to function
 * @param waitOptions WaitOptions
 *
 * @category Waiters
 */
export async function waitForValueToBeEqualOrLessThan(
  func: () => Promise<number>,
  value: number,
  waitOptions?: WaitOptions,
) {
  return waitFor(() => func().then((v) => v <= value), waitOptions).catch(
    async () =>
      throwTestError(
        await TestError.ValueIsEqualOrLessThan(
          func,
          value,
          waitOptions?.timeoutMs ?? DefaultWaitOptions.timeoutMs,
        ),
        func,
      ),
  );
}

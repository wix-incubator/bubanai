import { waitFor } from '../waitFor';
import { WaitOptions } from '../types';
import { throwTestError } from '../error';

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
        `Function value should be more than ${value}, but actually it was: ${await func()}`,
        func,
      ),
  );
}

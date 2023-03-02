import { WaitOptions } from '../types';
import { waitFor } from '../waitFor';
import { throwTestError } from '../error';

/**
 * Waits for async function numeric value is equal or more than expected value.
 * If it is not after timeout - throws exception.
 * @param func Async function with return type: number
 * @param value Number value that is equal or more than to function
 * @param waitOptions WaitOptions
 *
 * @category Waiters
 */
export async function waitForValueToBeEqualOrMoreThan(
  func: () => Promise<number>,
  value: number,
  waitOptions?: WaitOptions,
) {
  return waitFor(() => func().then((v) => v >= value), waitOptions).catch(
    async () =>
      throwTestError(
        `Function value should be equal or more than ${value}, but actually it was: ${await func()}`,
        func,
      ),
  );
}

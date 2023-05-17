import { isEqualAsync } from '../assert';
import { throwTestError } from '../error';
import { waitFor } from '../waitFor';
import { WaitOptions } from '../types';
import { ACTION_TIMEOUT } from '../settings';

/**
 * Waits for async function value to be equal to another async value or value.
 * If it is NOT after timeout - throws exception.
 * @param actual Async function with type which value you check. Contains exception catch and returns void in that case.
 * @param expected Async value or value that you expect to be equal to function
 * @param withCallee Function that is called for wait for condition
 * (Needed for exception message, in case of when not highest level function is passed as 1st argument)
 * @param waitOptions WaitOptions
 *
 * @category Waiters
 */
export function waitForObjectsToBeEqual<T>(
  actual: () => Promise<T>,
  expected: Promise<T> | T,
  withCallee?: () => Promise<any>,
  waitOptions?: WaitOptions,
) {
  return waitFor(() => isEqualAsync(actual, expected), waitOptions).catch(
    async () =>
      throwTestError(
        `Actual result: '${await actual().then((r) =>
          JSON.stringify(r),
        )}' is not equal expected: '${JSON.stringify(
          expected,
        )}' within timeout ${
          (waitOptions?.timeoutMs ?? ACTION_TIMEOUT) / 1000
        } second(s)`,
        withCallee || actual,
      ),
  );
}

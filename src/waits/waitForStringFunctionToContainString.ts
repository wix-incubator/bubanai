import { waitFor } from '../waitFor';
import { TestError, throwTestError } from '../error';
import type { WaitOptions } from '../types';
import { DefaultWaitOptions } from '../types';

/**
 * Waits for async function string value to contain string value.
 * If it is not after timeout - throws exception.
 * @param func Async function with return type: string
 * @param value String value that function contains
 * @param waitOptions WaitOptions
 *
 * @category Waiters
 */
export async function waitForStringFunctionToContainString(
  func: () => Promise<string>,
  value: string,
  waitOptions?: WaitOptions,
) {
  return waitFor(
    () => func().then((str) => str.includes(value)),
    waitOptions,
  ).catch(async () =>
    throwTestError(
      await TestError.StringFunctionToContainString(
        func,
        value,
        waitOptions?.timeoutMs ?? DefaultWaitOptions.timeoutMs,
      ),
      func,
    ),
  );
}

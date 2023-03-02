import { waitFor } from '../waitFor';
import { throwTestError } from '../error';
import { WaitOptions } from '../types';

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
      `Function value should contain string ${value}, but actually it had not: ${await func()}`,
      func,
    ),
  );
}

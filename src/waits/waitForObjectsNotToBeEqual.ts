import { isEqualAsync } from '../assert';
import { waitFor, WaitOptions } from '../waitFor';

export async function waitForObjectsNotToBeEqual<T>(
  actual: () => Promise<T>,
  expected: Promise<T> | T,
  withCallee?: () => Promise<any>,
  waitOptions?: WaitOptions,
) {
  return waitFor(
    () => isEqualAsync(actual, expected).then((r) => !r),
    waitOptions,
    `Both objects are still equal '${await expected}' within timeout.`,
    withCallee || actual,
  );
}

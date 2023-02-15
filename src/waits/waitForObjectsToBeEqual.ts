import { isEqualAsync } from '../assert';
import { throwTestError } from '../error';
import { waitFor, WaitOptions } from '../waitFor';

export function waitForObjectsToBeEqual<T>(
  actual: () => Promise<T>,
  expected: Promise<T> | T,
  withCallee?: () => Promise<any>,
  waitOptions?: WaitOptions,
) {
  return waitFor(() => isEqualAsync(actual, expected), waitOptions).catch(
    async () =>
      throwTestError(
        `Actual result: ${await actual().then((r) =>
          JSON.stringify(r),
        )} is not equal expected: ${JSON.stringify(expected)}`,
        withCallee || actual,
      ),
  );
}

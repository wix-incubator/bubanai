import { WaitOptions } from '../types';
import { waitFor } from '../waitFor';
import { throwTestError } from '../error';

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

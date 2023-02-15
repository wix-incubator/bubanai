import { waitFor } from '../waitFor';
import { WaitOptions } from '../types';
import { throwTestError } from '../error';

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

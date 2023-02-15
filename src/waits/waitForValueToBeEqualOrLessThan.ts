import { throwTestError } from '../error';
import { WaitOptions } from '../types';
import { waitFor } from '../waitFor';

export async function waitForValueToBeEqualOrLessThan(
  func: () => Promise<number>,
  value: number,
  waitOptions?: WaitOptions,
) {
  return waitFor(() => func().then((v) => v <= value), waitOptions).catch(
    async () =>
      throwTestError(
        `Function value should be less or equal to ${value}, but actually it was: ${await func()}`,
        func,
      ),
  );
}

import { throwTestError } from '../error';
import { WaitOptions } from '../types';
import { waitFor } from '../waitFor';

export async function waitForValueToBeLessThan(
  func: () => Promise<number>,
  value: number,
  waitOptions?: WaitOptions,
) {
  return waitFor(() => func().then((v) => v < value), waitOptions).catch(
    async () =>
      throwTestError(
        `Function value should be less than ${value}, but actually it was: ${await func()}`,
        func,
      ),
  );
}

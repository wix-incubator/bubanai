import { throwTestError } from '../error';
import { waitFor } from '../waitFor';
import { WaitOptions } from '../types';

export async function waitForCollectionNotToHaveItem<T>(
  func: () => Promise<T[]>,
  value: T,
  waitOptions?: WaitOptions,
) {
  return waitFor(
    () => func().then((arr) => !arr.includes(value)),
    waitOptions,
  ).catch(async () =>
    throwTestError(
      `Returned array should NOT contain value ${JSON.stringify(
        value,
      )}, but actually it had: ${JSON.stringify(await func())}`,
      func,
    ),
  );
}

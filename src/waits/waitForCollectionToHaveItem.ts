import { waitFor } from '../waitFor';
import { throwTestError } from '../error';
import { WaitOptions } from '../types';

export async function waitForCollectionToHaveItem<T>(
  func: () => Promise<T[]>,
  value: T,
  waitOptions?: WaitOptions,
) {
  return waitFor(
    () => func().then((arr) => arr.includes(value)),
    waitOptions,
  ).catch(async () =>
    throwTestError(
      `Returned array should contain value ${JSON.stringify(
        value,
      )}, but actually it had not: ${JSON.stringify(await func())}`,
      func,
    ),
  );
}

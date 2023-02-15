import { waitFor } from '../waitFor';
import { DefaultWaitOptions, WaitOptions } from '../types';

export function waitForCollectionToBeNotEmpty(
  collection: () => Promise<any[]>,
  waitOptions?: WaitOptions,
) {
  return waitFor(
    async () => (await collection()).length > 0,
    waitOptions,
    `Collection is left empty after timeout ${
      waitOptions?.timeoutMs ?? DefaultWaitOptions.timeoutMs / 1000
    }.`,
    collection,
  );
}

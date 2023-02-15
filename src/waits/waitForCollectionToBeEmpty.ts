import { DefaultWaitOptions, WaitOptions } from '../types';
import { waitFor } from '../waitFor';

export function waitForCollectionToBeEmpty(
  collection: () => Promise<any[]>,
  waitOptions?: WaitOptions,
) {
  return waitFor(
    async () => (await collection()).length === 0,
    waitOptions,
    `Collection is not empty after timeout ${
      waitOptions?.timeoutMs || DefaultWaitOptions.timeoutMs
    } s.`,
    collection,
  );
}

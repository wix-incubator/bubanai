import { waitFor } from '../waitFor';
import { throwTestError } from '../error';
import { WaitOptions } from '../types';

export function waitForCollectionLengthToBe(
  collection: () => Promise<any[]>,
  expectedLength: number,
  waitOptions?: WaitOptions,
) {
  return waitFor(
    async () => (await collection()).length === expectedLength,
    waitOptions,
  ).catch(async () =>
    throwTestError(
      `Expected collection length: ${expectedLength}, but was: ${await collection().then(
        (c) => c.length,
      )}`,
      collection,
    ),
  );
}

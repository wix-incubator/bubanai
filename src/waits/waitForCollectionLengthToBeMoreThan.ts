import { waitFor } from '../waitFor';
import { throwTestError } from '../error';
import { WaitOptions } from '../types';

export function waitForCollectionLengthToBeMoreThan(
  collection: () => Promise<any[]>,
  minLength: number,
  waitOptions?: WaitOptions,
) {
  return waitFor(
    () => collection().then((col) => col.length > minLength),
    waitOptions,
  ).catch(async () =>
    throwTestError(
      `Expected collection length is more than: ${minLength}, but was: ${await collection().then(
        (c) => c.length,
      )}`,
      collection,
    ),
  );
}

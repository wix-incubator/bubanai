import { waitFor } from '../waitFor';
import { throwTestError } from '../error';
import { WaitOptions } from '../types';

export async function waitForStringFunctionToContainString(
  func: () => Promise<string>,
  value: string,
  waitOptions?: WaitOptions,
) {
  return waitFor(
    () => func().then((str) => str.includes(value)),
    waitOptions,
  ).catch(async () =>
    throwTestError(
      `Function value should contain string ${value}, but actually it had not: ${await func()}`,
      func,
    ),
  );
}

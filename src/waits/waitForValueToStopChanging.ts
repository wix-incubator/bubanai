import { wait } from '../waitFor';
import { throwTestError } from '../error';
import { isEqual, defaults } from 'lodash';
import { DefaultWaitOptions, WaitOptions } from '../types';
import { ACTION_TIMEOUT } from '../settings';

export async function waitForValueToStopChanging<T>(
  func: () => Promise<T>,
  waitOptions?: WaitOptions,
) {
  const mutatedOptions = defaults(waitOptions, DefaultWaitOptions);
  let isTimeout = false;
  setTimeout(() => (isTimeout = true), mutatedOptions.timeoutMs);
  let existingValue: T | undefined;
  let newValue: T | undefined;
  do {
    existingValue = await func().catch((e) => {
      console.warn(e);
      return undefined;
    });
    await wait(mutatedOptions.pollIntervalMs);
    newValue = await func().catch((e) => {
      console.warn(e);
      return undefined;
    });
  } while (!isTimeout && !isEqual(newValue, existingValue));
  if (isTimeout) {
    throwTestError(
      `Value ${JSON.stringify(existingValue)} -> ${JSON.stringify(
        newValue,
      )} did not stop changing for ${
        mutatedOptions.timeoutMs ?? ACTION_TIMEOUT / 1000
      } seconds.`,
      func,
    );
  }
}

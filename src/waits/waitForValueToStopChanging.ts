import { wait } from '../waitFor';
import { throwTestError } from '../error';
import { isEqual } from 'lodash';
import { DefaultWaitOptions, WaitOptions } from '../types';
import { ACTION_POLL_INTERVAL, ACTION_TIMEOUT } from '../settings';

export async function waitForValueToStopChanging<T>(
  func: () => Promise<T>,
  waitOptions: WaitOptions = DefaultWaitOptions,
) {
  let isTimeout = false;
  setTimeout(() => (isTimeout = true), waitOptions.timeoutMs);
  let existingValue: T | undefined;
  let newValue: T | undefined;
  do {
    existingValue = await func().catch((e) => {
      console.warn(e);
      return undefined;
    });
    await wait(waitOptions.pollIntervalMs ?? ACTION_POLL_INTERVAL);
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
        waitOptions.timeoutMs ?? ACTION_TIMEOUT / 1000
      } seconds.`,
      func,
    );
  }
}

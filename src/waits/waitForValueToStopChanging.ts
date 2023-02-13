import { wait } from '../waitFor';
import { ACTION_POLL_INTERVAL, ACTION_TIMEOUT } from '../settings';
import { throwTestError } from '../error';
import { isEqual } from 'lodash';

export async function waitForValueToStopChanging<T>(
  func: () => Promise<T>,
  timeout = ACTION_TIMEOUT,
  interval = ACTION_POLL_INTERVAL,
) {
  let isTimeout = false;
  setTimeout(() => (isTimeout = true), timeout);
  let existingValue: T | undefined;
  let newValue: T | undefined;
  do {
    existingValue = await func().catch((e) => {
      console.warn(e);
      return undefined;
    });
    await wait(interval);
    newValue = await func().catch((e) => {
      console.warn(e);
      return undefined;
    });
  } while (!isTimeout && !isEqual(newValue, existingValue));
  if (isTimeout) {
    throwTestError(
      `Value ${JSON.stringify(existingValue)} -> ${JSON.stringify(
        newValue,
      )} did not stop changing for ${timeout / 1000} seconds.`,
      func,
    );
  }
}

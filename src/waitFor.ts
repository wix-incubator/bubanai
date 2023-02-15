import { ACTION_POLL_INTERVAL, ACTION_TIMEOUT } from './settings';
import { promisify } from 'util';
import { throwTestError } from './error';

export interface WaitOptions {
  timeoutMs?: number;
  pollIntervalMs?: number;
}

export const wait = promisify(setTimeout);

/**
 * Generic wait function that receives the function
 * and polls it with the specific time interval until it will return true.
 */
export async function waitFor(
  action: () => Promise<boolean> | boolean,
  waitOptions?: WaitOptions,
  exceptionMessage?: string,
  withCallee?: () => any,
): Promise<void> {
  const timeoutMs =
    waitOptions && waitOptions.timeoutMs
      ? waitOptions.timeoutMs
      : ACTION_TIMEOUT;
  const pollIntervalMs =
    waitOptions && waitOptions.pollIntervalMs
      ? waitOptions.pollIntervalMs
      : ACTION_POLL_INTERVAL;

  let isTimeout = false;
  const timeoutId = setTimeout(() => {
    isTimeout = true;
  }, timeoutMs);

  while (!isTimeout && !(await action())) {
    await wait(pollIntervalMs);
  }

  clearTimeout(timeoutId);
  if (isTimeout) {
    throwTestError(
      exceptionMessage ||
        `Wait for condition haven't got true value for function after ${
          timeoutMs / 1000
        } seconds timeout`,
      withCallee || action,
    );
  }
}

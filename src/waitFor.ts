import { ACTION_POLL_INTERVAL, ACTION_TIMEOUT } from './settings';
import { promisify } from 'util';

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
    throw new Error(
      exceptionMessage ||
        `Wait for condition failed after ${timeoutMs / 1000} seconds timeout.`,
    );
  }
}

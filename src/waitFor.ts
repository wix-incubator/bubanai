import { promisify } from 'util';
import { throwTestError } from './error';
import { ActionReturnType, DefaultWaitOptions, WaitOptions } from './types';
import { defaults } from 'lodash';

/**
 * Causes your script to wait for the given number of milliseconds.
 *
 * @category Waiters
 */
export const wait = promisify(setTimeout);

/**
 * Generic wait function that receives the function
 * and polls it with the specific time interval until it will return true.
 *
 * @category Waiters
 */
export async function waitFor(
  action: () => ActionReturnType,
  waitOptions?: WaitOptions,
  exceptionMessage?: string,
  withCallee?: () => any,
): Promise<void> {
  const mutatedOptions = defaults(waitOptions, DefaultWaitOptions);
  const timeoutMs = mutatedOptions.timeoutMs;
  const pollIntervalMs = mutatedOptions.pollIntervalMs;
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

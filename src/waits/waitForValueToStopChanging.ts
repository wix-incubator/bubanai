import { wait } from '../waitFor';
import { TestError, throwTestError } from '../error';
import { isEqual, defaults } from 'lodash';
import type { WaitOptions } from '../types';
import { DefaultWaitOptions } from '../types';

/**
 * Waits for async function value is not changing during interval.
 * If function throws an exception both times - return undefined (it's meant that it stopped changing)
 * If it is still changing after timeout - throws exception.
 * @param func Async function with type
 * @param waitOptions WaitOptions
 *
 * @category Waiters
 */
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
      TestError.ValueToStopChanging(
        existingValue,
        newValue,
        mutatedOptions.timeoutMs ?? DefaultWaitOptions.timeoutMs,
      ),
      func,
    );
  }
}

import { DefaultAttemptWaitOptions, WaitWithAttemptsOptions } from './types';
import { throwTestError } from '../error';
import { wait } from '../waitFor';
import { isEqual } from 'lodash';

/**
 * Waits for function value is not equal undefined or custom value, using number of attempts.
 * Returns function value or throws an exception.
 * @param action Async function with type
 * @param options WaitWithAttemptsOptions
 * @param exceptionMessage Custom exception message that overrides default
 *
 * @category Waiters
 */
export async function waitWithAttempts<T>(
  action: (...args: any) => Promise<T> | T | undefined,
  options?: WaitWithAttemptsOptions,
  exceptionMessage?: any,
) {
  // eslint-disable-next-line prefer-const
  let { attempts, interval, assertCondition } =
    options ?? DefaultAttemptWaitOptions;
  while (attempts--) {
    const result = await action();
    if (!isEqual(result, assertCondition ?? undefined)) {
      return result as T;
    }
    await wait(interval);
  }
  throwTestError(
    exceptionMessage ??
      `Failed to receive true value after ${attempts} attempts`,
    action,
  );
  // this would never happen
  return action() as T;
}

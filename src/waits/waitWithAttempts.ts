import type { WaitWithAttemptsOptions } from './types';
import { DefaultAttemptWaitOptions } from './types';
import { TestError, throwTestError } from '../error';
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
  const defaultAttempts = { attempts };
  while (attempts--) {
    const result = await action();
    if (!isEqual(result, assertCondition ?? undefined)) {
      return result as T;
    }
    await wait(interval);
  }
  throwTestError(
    exceptionMessage ??
      TestError.WithAttempts(defaultAttempts.attempts, interval),
    action,
  );
  // this would never happen
  return action() as T;
}

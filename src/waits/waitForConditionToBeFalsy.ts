import { waitFor } from '../waitFor';
import { ActionReturnType, WaitOptions } from '../types';
import { ACTION_TIMEOUT } from '../settings';

/**
 * Waits for async function value to be falsy (no strict false, but undefined, null).
 * If it is truthy after timeout - throws exception.
 * @param action Async function that returns boolean or null or undefined
 * @param waitOptions WaitOptions
 * @param exceptionMessage Message in exception that would overrides default
 *
 * @category Waiters
 */
export function waitForConditionToBeFalsy(
  action: () => ActionReturnType,
  waitOptions?: WaitOptions,
  exceptionMessage?: string,
) {
  return waitFor(
    async () => !(await action()),
    waitOptions,
    exceptionMessage ||
      `Condition doesn't get false value after ${
        (waitOptions?.timeoutMs || ACTION_TIMEOUT) / 1000
      } seconds timeout`,
    action,
  );
}

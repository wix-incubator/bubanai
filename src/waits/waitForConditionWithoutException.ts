import { ACTION_SMALL_TIMEOUT } from '../settings';
import { waitFor } from '../waitFor';
import { ActionReturnType, WaitOptions } from '../types';

/**
 * Waits for async function value to be falsy true.
 * If it is not true after timeout - does nothing.
 * Useful when you need to wait that action is not happened along interval
 * (or you don't care it's happened or not, but you need to handle if it happened)
 * @param action Async function that returns boolean or null or undefined
 * @param options WaitOptions
 *
 * @category Waiters
 */
export async function waitForConditionWithoutException(
  action: () => ActionReturnType,
  options: WaitOptions = { timeoutMs: ACTION_SMALL_TIMEOUT },
) {
  return waitFor(action, options).catch(console.error);
}

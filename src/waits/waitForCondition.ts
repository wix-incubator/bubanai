import type { ActionReturnType, WaitOptions } from '../types';
import { waitFor } from '../waitFor';

/**
 * Similar method as waitFor, just another naming.
 * @param action Async function that returns true
 * @param waitOptions WaitOptions
 * @param exceptionMessage Message in exception that would overrides default
 * @param withCallee Function that is called for wait for condition
 * (Needed for exception message, in case of when not highest level function is passed as 1st argument)
 *
 * @category Waiters
 */
export async function waitForCondition(
  action: () => ActionReturnType,
  waitOptions?: WaitOptions,
  exceptionMessage?: string,
  withCallee?: () => any,
) {
  return waitFor(action, waitOptions, exceptionMessage, withCallee);
}

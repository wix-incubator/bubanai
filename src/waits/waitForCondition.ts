import { ActionReturnType, WaitOptions } from '../types';
import { waitFor } from '../waitFor';

export async function waitForCondition(
  action: () => ActionReturnType,
  waitOptions?: WaitOptions,
  exceptionMessage?: string,
  withCallee?: () => any,
) {
  return waitFor(action, waitOptions, exceptionMessage, withCallee);
}

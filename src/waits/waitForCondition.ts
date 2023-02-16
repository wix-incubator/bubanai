import { WaitOptions } from '../types';
import { waitFor } from '../waitFor';

export async function waitForCondition(
  action: () => Promise<boolean> | boolean,
  waitOptions?: WaitOptions,
  exceptionMessage?: string,
  withCallee?: () => any,
) {
  return waitFor(action, waitOptions, exceptionMessage, withCallee);
}

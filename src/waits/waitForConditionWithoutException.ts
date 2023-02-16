import { ACTION_SMALL_TIMEOUT } from '../settings';
import { waitFor } from '../waitFor';
import { ActionReturnType, WaitOptions } from '../types';

export async function waitForConditionWithoutException(
  action: () => ActionReturnType,
  options: WaitOptions = { timeoutMs: ACTION_SMALL_TIMEOUT },
) {
  return waitFor(action, options).catch(console.error);
}

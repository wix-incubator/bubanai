import { ACTION_SMALL_TIMEOUT } from '../settings';
import { waitFor } from '../waitFor';
import { WaitOptions } from '../types';

export async function waitForConditionWithoutException(
  action: () => Promise<boolean>,
  options: WaitOptions = { timeoutMs: ACTION_SMALL_TIMEOUT },
) {
  return waitFor(action, options).catch(console.error);
}

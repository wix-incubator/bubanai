import { ACTION_SMALL_TIMEOUT } from '../settings';
import { waitFor, WaitOptions } from '../waitFor';

export async function waitForConditionWithoutException(
  action: () => Promise<boolean>,
  options: WaitOptions = { timeoutMs: ACTION_SMALL_TIMEOUT },
) {
  return waitFor(action, options).catch(console.error);
}

import { waitFor } from '../waitFor';
import { WaitOptions } from '../types';

export function waitForConditionToBeFalsy(
  action: () => Promise<boolean>,
  waitOptions?: WaitOptions,
  exceptionMessage?: string,
) {
  return waitFor(
    async () => !(await action()),
    waitOptions,
    exceptionMessage || "Condition doesn't get false value after timeout.",
    action,
  );
}

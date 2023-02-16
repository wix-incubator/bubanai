import { waitFor } from '../waitFor';
import { ActionReturnType, WaitOptions } from '../types';

export function waitForConditionToBeFalsy(
  action: () => ActionReturnType,
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

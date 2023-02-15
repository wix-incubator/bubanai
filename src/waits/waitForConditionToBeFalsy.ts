import { waitFor, WaitOptions } from '../waitFor';

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

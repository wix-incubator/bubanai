import { isEqualAsync } from '../assert';
import { waitFor, WaitOptions } from '../waitFor';

export async function waitForFunctionValueToBeChanged<T>(
  func: () => Promise<T>,
  action: () => Promise<any>,
  waitOptions?: WaitOptions,
) {
  const funcValue = await func();
  await action();
  await waitFor(
    async () => {
      const result = await isEqualAsync(func, funcValue);
      return !result;
    },
    waitOptions,
    `Value expected to change after ${action.toString()} was called and not to equal ${JSON.stringify(
      funcValue,
    )} but it is still the same.`,
    func,
  );
}

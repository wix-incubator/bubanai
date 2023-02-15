import { WaitOptions } from '../types';
import { waitForFunctionValueToBeChanged } from './waitForFunctionValueToBeChanged';
import { waitForValueToStopChanging } from './waitForValueToStopChanging';

export async function waitForFunctionValueToBeChangedAndStabilized<T>(
  func: () => Promise<T>,
  action: () => Promise<any>,
  waitOptions?: WaitOptions,
) {
  await waitForFunctionValueToBeChanged(func, action, waitOptions);
  await waitForValueToStopChanging(func, waitOptions);
}

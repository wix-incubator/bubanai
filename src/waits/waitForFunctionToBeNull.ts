import { WaitOptions } from '../types';
import { waitForObjectsToBeEqual } from './waitForObjectsToBeEqual';

export async function waitForFunctionToBeNull<T>(
  func: () => Promise<T>,
  waitOptions?: WaitOptions,
) {
  return waitForObjectsToBeEqual(() => func(), null, func, waitOptions);
}

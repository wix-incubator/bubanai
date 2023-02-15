import { waitForObjectsToBeEqual } from './waitForObjectsToBeEqual';
import { WaitOptions } from '../types';

export async function waitForFunctionToBeUndefined<T>(
  func: () => Promise<T>,
  waitOptions?: WaitOptions,
) {
  return waitForObjectsToBeEqual(() => func(), undefined, func, waitOptions);
}

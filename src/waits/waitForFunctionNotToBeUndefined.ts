import { WaitOptions } from '../types';
import { waitForObjectsNotToBeEqual } from './waitForObjectsNotToBeEqual';

export function waitForFunctionNotToBeUndefined<T>(
  func: () => Promise<T>,
  waitOptions?: WaitOptions,
) {
  return waitForObjectsNotToBeEqual(() => func(), undefined, func, waitOptions);
}

import { TestError } from './testErrors';

/**
 * Throws error method for async function waiters.
 * Shows which actual highest level function call failed.
 * @param message
 * @param call
 *
 * @category Errors
 */
export function throwTestError(
  message: string,
  call: (...args: any) => Promise<any> | any,
) {
  throw new Error(TestError.Base(message, call));
}

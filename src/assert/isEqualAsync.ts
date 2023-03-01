import { isEqual } from 'lodash';

/**
 * Function checks if promise-like return function value is equal another promise value or value
 * @param actual async function
 * @param expected async param or param
 *
 * @category Assertions
 */
export async function isEqualAsync<T>(
  actual: () => Promise<T>,
  expected: Promise<T> | T,
) {
  const expectedResult = await expected;
  const actualResult = await actual().catch((e) => console.warn(e));
  return isEqual(actualResult, expectedResult);
}

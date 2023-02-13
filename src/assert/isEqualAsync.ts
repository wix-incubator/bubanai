import { isEqual } from 'lodash';

export async function isEqualAsync<T>(
  actual: () => Promise<T>,
  expected: Promise<T> | T,
) {
  const expectedResult = await expected;
  const actualResult = await actual().catch((e) => console.warn(e));
  return isEqual(actualResult, expectedResult);
}

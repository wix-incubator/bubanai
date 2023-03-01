/**
 * Finds first element in collection by async filter.
 * @param elements
 * @param asyncFilter
 *
 * @category Collections async
 */
export async function findAsync<T>(
  elements: T[],
  asyncFilter: (arg: T) => Promise<boolean>,
): Promise<T | undefined> {
  let result: T | undefined;
  for (const element of elements) {
    if (await asyncFilter(element)) {
      result = element;
      break;
    }
  }
  return result;
}

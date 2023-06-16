/**
 * Finds first element in collection by async filter.
 * @param elements
 * @param asyncFilter
 *
 * @category Collections async
 */
export async function findAsync<T>(
  elements: Promise<T>[] | T[],
  asyncFilter: (arg: T) => Promise<boolean>,
): Promise<T | undefined> {
  let result: T | undefined;
  for (const element of await Promise.all(elements)) {
    if (await asyncFilter(element)) {
      result = element;
      break;
    }
  }
  return result;
}

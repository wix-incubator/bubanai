/**
 * Filters async filter elements from collection. Guarantees order.
 * @param elements
 * @param asyncFilter
 *
 * @category Collections async
 */
export async function filterAsync<T>(
  elements: T[],
  asyncFilter: (arg: T) => Promise<boolean>,
): Promise<T[]> {
  const results: T[] = [];
  for (const element of elements) {
    if (await asyncFilter(element)) {
      results.push(element);
    }
  }
  return results;
}

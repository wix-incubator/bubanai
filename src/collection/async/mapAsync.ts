/**
 * Maps collection by async mapper. Guarantees order.
 * @param elements
 * @param mapAction
 *
 * @category Collections async
 */
export async function mapAsync<T, R>(
  elements: Promise<T>[] | T[],
  mapAction: (arg: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = [];
  for (const element of await Promise.all(elements)) {
    const mappedItem = await mapAction(element);
    results.push(mappedItem);
  }
  return results;
}

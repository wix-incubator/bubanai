/**
 * Maps collection by async mapper. Guarantees order.
 * @param elements
 * @param mapAction
 */
export async function mapAsync<T, R>(
  elements: T[],
  mapAction: (arg: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = [];
  for (const element of elements) {
    const mappedItem = await mapAction(element);
    results.push(mappedItem);
  }
  return results;
}

/**
 * Executes function for every promise in collection.
 * Awaits for each Promise in array. Guarantees order.
 * Useful when you have collection of Promises,
 * and after they would be resolved after some action,
 * order should be the same.
 * @param collection
 * @param iteratee
 *
 * @category Collections async
 */
export async function eachAsync<T>(
  collection: Promise<T>[],
  iteratee: (item: T) => Promise<any> | any,
) {
  for (const asyncResource of collection) {
    const result = iteratee(await asyncResource);
    if (result && result.then) {
      await result;
    }
  }
}

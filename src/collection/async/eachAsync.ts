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

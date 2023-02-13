export async function createPromiseChain<T>(
  items: T[],
  action: (item: T) => Promise<void>,
): Promise<void> {
  return items.reduce(
    (acc, item) => acc.then(() => action(item)),
    Promise.resolve(),
  );
}

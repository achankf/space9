/// either you get the item, or this function throws an error that you shouldn't catch
export function mustGet<K, V>(
  map: { get: (key: K) => V | undefined },
  key: K
): V {
  const item = map.get(key);

  if (!item) {
    throw new Error(`Unreachable - cannot get item`);
  }

  return item;
}

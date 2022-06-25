export function createGetter<K, V>(
  map: { get: (key: K) => V | undefined },
  what: string
): (key: K) => V {
  return (key) => {
    const item = map.get(key);

    if (!item) {
      throw new Error(`Unreachable - cannot find ${what}`);
    }

    return item;
  };
}

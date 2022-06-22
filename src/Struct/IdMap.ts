export class IdMap<T> {
  data = new Map<number, T>();

  #nextIdSource = 0;

  get nextId(): number {
    const ret = this.#nextIdSource;
    this.#nextIdSource += 1;
    return ret;
  }

  get size(): number {
    return this.data.size;
  }

  put(value: T): number {
    const { nextId, data } = this;
    data.set(nextId, value);
    return nextId;
  }

  get(key: number): T | undefined {
    return this.data.get(key);
  }

  entries(): IterableIterator<[number, T]> {
    return this.data.entries();
  }

  map<S>(f: (pair: [number, T]) => S): S[] {
    return [...this.data].map(f);
  }
}

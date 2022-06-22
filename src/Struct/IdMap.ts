export class IdMap<T> {
  public data = new Map<number, T>();

  private nextIdSource = 0;

  public get nextId(): number {
    const ret = this.nextIdSource;
    this.nextIdSource += 1;
    return ret;
  }

  public get size(): number {
    return this.data.size;
  }

  public put(value: T): number {
    const { nextId, data } = this;
    data.set(nextId, value);
    return nextId;
  }

  public get(key: number): T | undefined {
    return this.data.get(key);
  }

  public entries(): IterableIterator<[number, T]> {
    return this.data.entries();
  }

  public map<S>(f: (pair: [number, T]) => S): S[] {
    return [...this.data].map(f);
  }
}

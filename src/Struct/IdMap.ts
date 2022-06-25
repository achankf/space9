import { Id } from "../Id";
import { createGetter } from "../utils/createGetter";

export class IdMap<T> {
  data = new Map<Id, T>();

  #nextIdSource = 0;

  get nextId(): Id {
    const ret = this.#nextIdSource;
    this.#nextIdSource += 1;
    return ret;
  }

  get size(): number {
    return this.data.size;
  }

  createGetter(what: string): (id: Id) => T {
    return createGetter(this, what);
  }

  put(value: T): Id {
    const { nextId, data } = this;
    data.set(nextId, value);
    return nextId;
  }

  get(key: Id): T | undefined {
    return this.data.get(key);
  }

  entries(): IterableIterator<[Id, T]> {
    return this.data.entries();
  }

  map<S>(f: (pair: [Id, T]) => S): S[] {
    return [...this.data].map(f);
  }

  reserve(): { id: Id; set(item: T): void } {
    const id = this.nextId;

    const set = (item: T): void => {
      if (this.data.has(id)) {
        throw new Error(
          "Unreachable - inconsistent insert; item already exists"
        );
      }
      this.data.set(id, item);
    };

    return { id, set };
  }
}

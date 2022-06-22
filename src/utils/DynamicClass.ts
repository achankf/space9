export type DynamicClass<T> = { new (t: T): T };

// https://stackoverflow.com/a/64268823
export function DynamicClassFactory<T extends object>(): DynamicClass<T> {
  return class {
    constructor(t: T) {
      Object.assign(this, t);
    }
  } as DynamicClass<T>;
}

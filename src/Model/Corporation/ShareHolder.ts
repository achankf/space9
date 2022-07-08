import { Id } from "../../Id";

export enum ShareHolderKind {
  Personal,
  Corporate,
  Government,
  Mass,
}

export interface MajorShareHolder {
  type:
    | ShareHolderKind.Government
    | ShareHolderKind.Corporate
    | ShareHolderKind.Personal;
  id: Id;
}

export interface MassShareHolder {
  type: ShareHolderKind.Mass;
}

export type ShareHolder = MajorShareHolder | MassShareHolder;

export function isSameShareHolder(a: ShareHolder, b: ShareHolder): boolean {
  if (a.type === ShareHolderKind.Mass) {
    return a.type === b.type;
  }

  return a.type === b.type && a.id === b.id;
}

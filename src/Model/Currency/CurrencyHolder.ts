import { Id } from "../../Id";

export enum CurrencyHolderKind {
  Personal,
  Corporate,
  Government,
}

export interface CurrencyHolder {
  type: CurrencyHolderKind;
  id: number;
}

export function isSameHolder(a: CurrencyHolder, b: CurrencyHolder): boolean {
  return a.type === b.type && a.id === b.id;
}

/// mapping currency holder's Id to their processed amount
export type CurrencyHolderMap = Map<Id, number>;

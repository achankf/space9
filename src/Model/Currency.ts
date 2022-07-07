import { Id } from "../Id";

export enum CurrencyKind {
  /// One owner for the currency.
  /// Currency strength is based on the owner's faction, at the expense of everyone else.
  Sovereign,

  /// Maybe like eu4's papacy mechanic.
  /// Currency strength is based on aggregation of member factions.
  Bloc,
}

interface SovereignCurrencyData {
  type: CurrencyKind.Sovereign;
  name: string;
  owner: Id;
}

export interface SovereignCurrency extends SovereignCurrencyData {}

export class SovereignCurrency {
  constructor(data: SovereignCurrencyData) {
    Object.assign(this, data);
  }
}

interface BlocCurrencyData {
  type: CurrencyKind.Bloc;
  name: string;
}

export interface BlocCurrency extends BlocCurrencyData {}

export class BlocCurrency {
  constructor(data: BlocCurrencyData) {
    Object.assign(this, data);
  }
}

export type Currency = SovereignCurrency | BlocCurrency;

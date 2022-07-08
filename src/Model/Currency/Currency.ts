import { Id } from "../../Id";
import {
  CurrencyHolder,
  CurrencyHolderKind,
  CurrencyHolderMap,
} from "./CurrencyHolder";

interface CurrencyData {
  name: string;
  controller: Id;
  holders: {
    personal: CurrencyHolderMap;
    corporate: CurrencyHolderMap;
    government: CurrencyHolderMap;
  };
}

export interface Currency extends CurrencyData {}

export class Currency {
  constructor(data: CurrencyData) {
    Object.assign(this, data);
  }

  // eslint-disable-next-line class-methods-use-this
  get strengthRating(): number {
    return 1;
  }

  exchangeRateFrom(currency: Currency): number {
    const myRating = this.strengthRating;
    const theirRating = currency.strengthRating;
    return myRating / theirRating;
  }

  exchangeRateTo(currency: Currency): number {
    const myRating = this.strengthRating;
    const theirRating = currency.strengthRating;
    return theirRating / myRating;
  }

  calculateCurrencyFrom(currency: Currency, amount: number): number {
    const exchangeRate = this.exchangeRateFrom(currency);
    return amount * exchangeRate;
  }

  calculateCurrencyTo(currency: Currency, amount: number): number {
    const exchangeRate = this.exchangeRateTo(currency);
    return amount * exchangeRate;
  }

  #getHolderMap(type: CurrencyHolderKind): CurrencyHolderMap {
    const {
      holders: { corporate, personal, government },
    } = this;

    switch (type) {
      case CurrencyHolderKind.Corporate: {
        return corporate;
      }
      case CurrencyHolderKind.Government: {
        return government;
      }
      case CurrencyHolderKind.Personal: {
        return personal;
      }
      default:
        throw new Error("Unreachable - unknown currency holder type");
    }
  }

  #changeSaving(
    holder: CurrencyHolder,
    update: (prevValue: number) => number
  ): void {
    const prevValue = this.getHolderSaving(holder);
    const newValue = update(prevValue);
    const { type } = holder;

    if (prevValue === newValue) {
      throw new Error("Unreachable - no change");
    }

    const { id } = holder;
    const map = this.#getHolderMap(type);
    if (newValue === 0) {
      map.delete(id);
    } else {
      map.set(id, newValue);
    }
  }

  getHolderSaving({ type, id }: CurrencyHolder): number {
    return this.#getHolderMap(type).get(id) ?? 0;
  }

  giveMoneyTo(from: CurrencyHolder, to: CurrencyHolder, amount: number): void {
    const fromSaving = this.getHolderSaving(from);

    if (fromSaving < amount) {
      throw new Error(
        "Unreachable - holder doesn't have enough money to transfer"
      );
    }

    this.#changeSaving(from, (prev) => prev - amount);
    this.#changeSaving(to, (prev) => prev - amount);
  }
}

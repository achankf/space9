import { Id } from "../../Id";
import { sum } from "../../utils/sum";
import { isSameShareHolder, ShareHolder, ShareHolderKind } from "./ShareHolder";

type ShareHolderMap = Map<Id, number>;

interface CorporationData {
  issuedShares: number;
  ownership: {
    personal: ShareHolderMap;
    corporate: ShareHolderMap;
    government: ShareHolderMap;
  };
  hqNodeId: Id;
  isPublic: boolean;
}

export interface Corporation extends CorporationData {}

export class Corporation {
  constructor(data: CorporationData) {
    Object.assign(this, data);
  }

  get checkIsPublic(): boolean {
    return this.isPublic;
  }

  get totalCorporateOwnership(): number {
    return sum(this.ownership.corporate.values());
  }

  get totalPersonalOwnership(): number {
    return sum(this.ownership.personal.values());
  }

  get totalGovernementOwnership(): number {
    return sum(this.ownership.government.values());
  }

  get totalNonMassOnwership(): number {
    return (
      this.totalCorporateOwnership +
      this.totalPersonalOwnership +
      this.totalGovernementOwnership
    );
  }

  get totalMassOwnership(): number {
    return this.issuedShares - this.totalNonMassOnwership;
  }

  getShares(shareHolder: ShareHolder): number {
    const { type } = shareHolder;

    if (type !== ShareHolderKind.Mass) {
      const { id } = shareHolder;
      const map = this.#getShareMap(type);
      return map.get(id) ?? 0;
    }

    return this.totalMassOwnership;
  }

  #getShareMap(type: ShareHolderKind): ShareHolderMap {
    const {
      ownership: { corporate, government, personal },
    } = this;

    switch (type) {
      case ShareHolderKind.Corporate: {
        return corporate;
      }
      case ShareHolderKind.Government: {
        return government;
      }
      case ShareHolderKind.Personal: {
        return personal;
      }
      default:
        throw new Error("Unreachable - unknown shareholder type");
    }
  }

  #changeShares(
    shareHolder: ShareHolder,
    update: (prevValue: number) => number
  ): void {
    const prevValue = this.getShares(shareHolder);
    const newValue = update(prevValue);
    const { type } = shareHolder;

    if (prevValue === newValue) {
      throw new Error("Unreachable - no change");
    }

    if (type === ShareHolderKind.Mass) {
      throw new Error(
        "Unreachable - cannot change mass shareholders' share amount since it's a derived value"
      );
    }

    const { id } = shareHolder;
    const map = this.#getShareMap(type);
    if (newValue === 0) {
      map.delete(id);
    } else {
      map.set(id, newValue);
    }
  }

  transferShares(from: ShareHolder, to: ShareHolder, amount: number): void {
    if (isSameShareHolder(from, to)) {
      throw new Error(
        "Unreachable - cannot transfer shares for the same entity"
      );
    }

    const fromShares = this.getShares(from);

    if (!Number.isInteger(amount)) {
      throw new Error("Unreachable - share amount is not an integer");
    }

    if (fromShares < amount) {
      throw new Error("Unreachable - doesn't have enough shares to transfer");
    }

    this.#changeShares(from, (prevValue) => prevValue - amount);
    this.#changeShares(to, (prevValue) => prevValue + amount);
  }
}

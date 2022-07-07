import { Id } from "../Id";
import { sum } from "../utils/sum";

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

enum ShareHolderKind {
  Personal,
  Corporate,
  Government,
  Minor,
}

interface PersonalShareHolder {
  type: ShareHolderKind.Personal;
  id: Id;
}

interface CorporateShareHolder {
  type: ShareHolderKind.Corporate;
  id: Id;
}

interface GovernementShareHolder {
  type: ShareHolderKind.Government;
  id: Id;
}

interface MinorShareHolder {
  type: ShareHolderKind.Minor;
}

type ShareHolder =
  | PersonalShareHolder
  | CorporateShareHolder
  | GovernementShareHolder
  | MinorShareHolder;

function isSameShareHolder(a: ShareHolder, b: ShareHolder): boolean {
  if (a.type === ShareHolderKind.Minor || b.type === ShareHolderKind.Minor) {
    return a.type === b.type;
  }

  return a.type === b.type && a.id === b.id;
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

  get totalNonMinorOnwership(): number {
    return (
      this.totalCorporateOwnership +
      this.totalPersonalOwnership +
      this.totalGovernementOwnership
    );
  }

  get totalMinorOwnership(): number {
    return this.issuedShares - this.totalNonMinorOnwership;
  }

  getShares(shareHolder: ShareHolder): number {
    const { type } = shareHolder;

    if (type !== ShareHolderKind.Minor) {
      const { id } = shareHolder;
      const map = this.#getShareMap(type);
      return map.get(id) ?? 0;
    }

    return this.totalMinorOwnership;
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

    if (type === ShareHolderKind.Minor) {
      throw new Error(
        "Unreachable - cannot change minor shareholder amount since it's a derived value"
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

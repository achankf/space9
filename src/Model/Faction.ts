import { Id } from "../Id";

interface BankAccount {}

interface FactionData {
  name: string;
  ownedNodes: Set<Id>;
  capital: Id;

  currency: Id;
}

export interface Faction extends FactionData {}

export class Faction {
  constructor(data: FactionData) {
    Object.assign(this, data);
  }
}

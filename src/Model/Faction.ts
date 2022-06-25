import { Id } from "../Id";

export interface Faction {
  name: string;
  ownedNodes: Set<Id>;
}

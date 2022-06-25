import { Id } from "../Id";

export interface Dynasty {
  families: Set<Id>; // set of family ids
  singles: Set<Id>; // set of single characters' ids
}

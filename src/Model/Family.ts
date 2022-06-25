import { Id } from "../Id";

export interface Family {
  head: Id;
  partners: Set<Id>;
  children: Set<Id>;
}

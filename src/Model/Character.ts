import { Id } from "../Id";
import { DynamicClassFactory } from "../utils/DynamicClass";
import { Coor } from "./Coor";

export interface CharacterData {
  name: string;
  coor: Coor;
  attr: {
    physique: number;
    intelligence: number;
    mana: number;
    social: number;
    luck: number;
  };
  education: {
    literacy: number;
  };
  actionCapacity: number;
  stress: number;
  familyId: Id;
}

const BaseClass = DynamicClassFactory<CharacterData>();

export class Character extends BaseClass {}

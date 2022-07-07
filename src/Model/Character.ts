import { Id } from "../Id";
import { Coor } from "./Coor";

interface CharacterData {
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

export interface Character extends CharacterData {}

export class Character {
  constructor(data: CharacterData) {
    Object.assign(this, data);
  }
}

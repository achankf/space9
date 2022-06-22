import { Coor } from "./Coor";

export interface CharacterAttributes {
  physique: number;
  intelligence: number;
  mana: number;
  social: number;
  luck: number;
}

export interface Character {
  name: string;
  coor: Coor;
  attr: CharacterAttributes;
  education: {
    literacy: number;
  };
  actionCapacity: number;
  stress: number;
}

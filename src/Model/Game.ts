import { Id } from "../Id";
import { IdMap } from "../Struct/IdMap";
import { mustGet } from "../utils/mustGet";
import { Address } from "./Address";
import { Farmhouse } from "./Buildings/Farmhouse";
import { GuildHall } from "./Buildings/GuildHall";
import { Character } from "./Character";
import { Coor, CoorKind } from "./Coor";
import { Currency } from "./Currency/Currency";
import { Dungeon } from "./Dungeon/Dungeon";
import { Faction } from "./Faction";
import { Family } from "./Family";
import { Guild } from "./Guild";
import { LandNode } from "./Node";

interface GameData {
  characters: IdMap<Character>;
  families: IdMap<Family>; // not intended to store all parts of famliy tree, just the living ones
  guilds: IdMap<Guild>;

  addresses: Map<Id, Address>; // family id -> address

  landNodes: LandNode[];

  factions: IdMap<Faction>;

  currencies: IdMap<Currency>;

  landmarks: {
    farmhouses: IdMap<Farmhouse>;
    guildHalls: IdMap<GuildHall>;
    dungeons: IdMap<Dungeon>;
  };

  playerId: number;
}

export interface Game extends GameData {}

export class Game {
  constructor(data: GameData) {
    Object.assign(this, data);
  }

  get playerAddress(): Address {
    return this.getCharacterAddress(this.playerId);
  }

  getCharacter(id: Id): Character {
    return this.characters.mustGet(id);
  }

  getFamily(id: Id): Family {
    return this.families.mustGet(id);
  }

  getFaction(id: Id): Faction {
    return this.factions.mustGet(id);
  }

  getAddressByFamilyId(id: Id): Address {
    return mustGet(this.addresses, id);
  }

  getFamilyByCharacterId(id: Id): Family {
    const { familyId } = this.getCharacter(id);
    return this.getFamily(familyId);
  }

  getCharacterAddress(characterId: Id): Address {
    const { familyId } = this.getCharacter(characterId);
    return this.getAddressByFamilyId(familyId);
  }

  getCurrency(currencyId: Id): Currency {
    return this.currencies.mustGet(currencyId);
  }

  getNode(nodeId: Id): LandNode {
    const node = this.landNodes[nodeId];

    if (!node) {
      throw new Error("Unreachable - cannot get node");
    }

    return node;
  }

  isPlayer(characterId: Id): boolean {
    return characterId === this.playerId;
  }

  toCoorString(coor: Coor): string {
    switch (coor.type) {
      case CoorKind.Node: {
        const { nodeId } = coor;
        const { name } = this.getNode(nodeId);
        return name;
      }
      case CoorKind.Planet: {
        const { x, y } = coor;
        return `(${x},${y})`;
      }
      default:
        throw new Error("Unreachable");
    }
  }
}

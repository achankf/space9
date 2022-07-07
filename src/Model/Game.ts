import { Id } from "../Id";
import { IdMap } from "../Struct/IdMap";
import { createGetter } from "../utils/createGetter";
import { DynamicClassFactory } from "../utils/DynamicClass";
import { Address } from "./Address";
import { Farmhouse } from "./Buildings/Farmhouse";
import { GuildHall } from "./Buildings/GuildHall";
import { Character } from "./Character";
import { Coor, CoorKind } from "./Coor";
import { Dungeon } from "./Dungeon/Dungeon";
import { Faction } from "./Faction";
import { Family } from "./Family";
import { Guild } from "./Guild";
import { LandNode } from "./Node";

export interface GameData {
  characters: IdMap<Character>;
  families: IdMap<Family>; // not intended to store all parts of famliy tree, just the living ones
  guilds: IdMap<Guild>;

  addresses: Map<Id, Address>; // family id -> address

  landNodes: LandNode[];

  factions: IdMap<Faction>;

  landmarks: {
    farmhouses: IdMap<Farmhouse>;
    guildHalls: IdMap<GuildHall>;
    dungeons: IdMap<Dungeon>;
  };

  playerId: number;
}

const BaseClass = DynamicClassFactory<GameData>();

export class Game extends BaseClass {
  getCharacter = this.characters.createGetter("character");

  getFamily = this.families.createGetter("family");

  getFaction = this.factions.createGetter("faction");

  getAddressByFamilyId = createGetter(this.addresses, "address");

  get playerAddress(): Address {
    return this.getCharacterAddress(this.playerId);
  }

  getFamilyByCharacterId(id: Id): Family {
    const { familyId } = this.getCharacter(id);
    return this.getFamily(familyId);
  }

  getCharacterAddress(characterId: Id): Address {
    const { familyId } = this.getCharacter(characterId);
    return this.getAddressByFamilyId(familyId);
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

import { IdMap } from "../Struct/IdMap";
import { Farmhouse } from "./Buildings/Farmhouse";
import { GuildHall } from "./Buildings/GuildHall";
import { Character } from "./Character";
import { Dungeon } from "./Dungeon/Dungeon";
import { Family } from "./Family";
import { Guild } from "./Guild";
import { LandNode } from "./LandNode";

export interface Game {
  characters: IdMap<Character>;
  families: IdMap<Family>; // not intended to store all parts of famliy tree, just the living ones
  guilds: IdMap<Guild>;

  landNodes: LandNode[];

  landmarks: {
    farmhouses: IdMap<Farmhouse>;
    guildHalls: IdMap<GuildHall>;
    dungeons: IdMap<Dungeon>;
  };
}

import random from "lodash/random";

import { Farmhouse } from "./Model/Buildings/Farmhouse";
import { GuildHall } from "./Model/Buildings/GuildHall";
import { Character } from "./Model/Character";
import { CoorKind } from "./Model/Coor";
import { Dungeon } from "./Model/Dungeon/Dungeon";
import { Family } from "./Model/Family";
import { Game } from "./Model/Game";
import { Guild } from "./Model/Guild";
import { LandNode } from "./Model/LandNode";
import { IdMap } from "./Struct/IdMap";
import { createRandomName } from "./utils/createRandomName";

export function createGame(): Game {
  const characters = new IdMap<Character>();
  const distinctNames = new Set();
  while (characters.size < 10) {
    const name = createRandomName();

    if (!distinctNames.has(name)) {
      distinctNames.add(name);

      characters.put({
        name,
        coor: {
          type: CoorKind.Planet,
          x: 10,
          y: 10,
        },
        attr: {
          physique: 5,
          intelligence: 5,
          mana: 5,
          social: 5,
          luck: 5,
        },
        actionCapacity: 3,
        education: { literacy: 10 },
        stress: 0,
      });
    }
  }

  const guilds = new IdMap<Guild>();

  const families = new IdMap<Family>();

  const landNodes = Array<LandNode>();

  landNodes.push(
    new LandNode({
      name: "Airstrip One",
      coor: { type: CoorKind.Planet, x: 2, y: 3 },
      allUsableLand: random(6000, 15000),
      claimedLand: 1000,
      usedLand: 1000,
      population: 1000,
      farmhouses: new Set(),
      guildHalls: new Set(),
      dungeons: new Set(),
      shops: new Set(),
    })
  );

  return {
    characters,
    guilds,
    families,
    landNodes,
    landmarks: {
      farmhouses: new IdMap<Farmhouse>(),
      guildHalls: new IdMap<GuildHall>(),
      dungeons: new IdMap<Dungeon>(),
    },
  };
}

import { Farmhouse } from "./Model/Buildings/Farmhouse";
import { GuildHall } from "./Model/Buildings/GuildHall";
import { Character } from "./Model/Character";
import { CoorKind } from "./Model/Coor";
import { Dungeon } from "./Model/Dungeon/Dungeon";
import { Family } from "./Model/Family";
import { Game } from "./Model/Game";
import { Guild } from "./Model/Guild";
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
          type: CoorKind.Wild,
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

  return {
    characters,
    guilds,
    families,
    landNodes: [],
    landmarks: {
      farmhouses: new IdMap<Farmhouse>(),
      guildHalls: new IdMap<GuildHall>(),
      dungeons: new IdMap<Dungeon>(),
    },
  };
}

// eslint-disable-next-line max-classes-per-file
import { sample } from "lodash";
import { useState } from "react";

const nameParts1 = ["A", "Al", "Be", "Ca", "De", "Er", "Fr", "Ge"];
const nameParts2 = ["cius", "totle", "ious"];

function createRandomName(): string {
  return `${sample(nameParts1)}${sample(nameParts2)}`;
}

interface CharacterAttributes {
  physique: number;
  intelligence: number;
  mana: number;
  social: number;
  luck: number;
}

interface Character {
  name: string;
  coor: Coor;
  attr: CharacterAttributes;
  education: {
    literacy: number;
  };
  stress: number;
}

interface Family {
  parent1: number;
  parent2: number;
  children: Set<number>;
}

interface Dynasty {
  families: Set<number>;
}

class IdMap<T> {
  public data = new Map<number, T>();

  private nextIdSource = 0;

  public get nextId(): number {
    const ret = this.nextIdSource;
    this.nextIdSource += 1;
    return ret;
  }

  public get size(): number {
    return this.data.size;
  }

  public put(value: T): number {
    const { nextId, data } = this;
    data.set(nextId, value);
    return nextId;
  }

  public get(key: number): T | undefined {
    return this.data.get(key);
  }

  public entries(): IterableIterator<[number, T]> {
    return this.data.entries();
  }

  public map<S>(f: (pair: [number, T]) => S): S[] {
    return [...this.data].map(f);
  }
}

interface Game {
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

interface Farmhouse {
  scale: number;
}

const enum JobKind {
  Fetch,
}

interface FetchJob {
  type: JobKind.Fetch;
}

type Job = FetchJob;

const enum Rank {
  F,
  E,
  D,
  C,
  B,
  A,
  S,
}

// this kind of guild: https://youtu.be/C2nksqvmSRI
interface Guild {
  master: number; // always have a master, can appoint a successor and retire
  members: Set<number>;
}

class GuildHall {
  public constructor(
    public associatedGuild: number,
    public scale: number,
    public furnishing: number,
    public postedJobs: Job[],
    public clerks: Set<number>,
    public receptionists: Set<number>
  ) {}

  public calAttractiveness(): number {
    return this.scale; // TODO
  }
}

const enum DungeonTheme {
  Cave,
}

class Dungeon {
  public constructor(
    public theme: DungeonTheme,
    public stageSlots: number, // how many "stages" need to face before getting to the final boss
    public floorSize: number // how many encounters per floor
  ) {}

  public get size(): number {
    const { stageSlots, floorSize } = this;
    return stageSlots * floorSize;
  }
}

interface LandNode {
  allUsableLand: number;
  population: number;
  landmarks: {
    farmhouses: Set<number>;
    guildHalls: Set<number>;
    dungeons: Set<number>;
  };
}

const enum CoorKind {
  Landmark,
  Wild,
}

interface WildCoor {
  type: CoorKind.Wild;
  x: number;
  y: number;
}

interface CityCoor {
  type: CoorKind.Landmark;
  cityId: number;
}

type Coor = CityCoor | WildCoor;

function coorToString(coor: Coor): string {
  switch (coor.type) {
    case CoorKind.Landmark: {
      const { cityId } = coor;
      return `City ${cityId}`;
    }
    case CoorKind.Wild: {
      const { x, y } = coor;
      return `Wild (${x},${y})`;
    }
    default:
      throw new Error("Unreachable");
  }
}

function createGame(): Game {
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

const App: React.FC = () => {
  const [game] = useState(() => createGame());
  const { characters } = game;

  return (
    <div className="App">
      Characters (total: {characters.size}
      ):
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Int</th>
            <th>Mana</th>
            <th>Coor</th>
          </tr>
        </thead>
        {characters.map(([id, character]) => {
          const {
            name,
            coor,
            attr: { intelligence, mana },
          } = character;
          return (
            // eslint-disable-next-line react/no-array-index-key
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{intelligence}</td>
              <td>{mana}</td>
              <td>{coorToString(coor)}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default App;

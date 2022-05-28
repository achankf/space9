import { sample } from "lodash";

const nameParts1 = ["A", "Al", "Be", "Ca", "De", "Er", "Fr", "Ge"];
const nameParts2 = ["cius", "totle", "ious"];

function createRandomName() {
  return `${sample(nameParts1)}${sample(nameParts2)}`;
}

interface CharacterAttributes {
  physique: number;
  intelligence: number;
  mana: number;
  social: number;
  luck: number;
}

/*
interface CharacterSkills {

}
*/

interface Character {
  name: string;
  coor: Coor;
  attr: CharacterAttributes;
}

interface Game {
  characters: Character[];
}

interface City {
  allUsableLand: number;
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
  const characters: Character[] = [];
  const distinctNames = new Set();
  while (characters.length < 10) {
    const name = createRandomName();

    if (!distinctNames.has(name)) {
      distinctNames.add(name);

      characters.push({
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
      });
    }
  }

  return {
    characters,
  };
}

const game: Game = createGame();

function App() {
  const { characters } = game;

  return (
    <div className="App">
      Characters (total: {characters.length}
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
        {game.characters.map((character, id) => {
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
}

export default App;

import React, { useContext } from "react";

import { GameContext } from "../Context/Game";
import { Coor, CoorKind } from "../Model/Coor";

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

export const Default: React.FC = () => {
  const {
    game: { characters },
  } = useContext(GameContext);

  return (
    <>
      <div>
        Nodes
        <table>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Spaceport</th>
            <th>Hospitality</th>
            <th>Transit</th>
            <th>Welfare</th>
            <th>Shops</th>
            <th>Businesses</th>
            <th>Institution</th>
          </tr>
          <tr>
            <td>Airstrip One</td>
            <td>✓</td>
            <td>✓</td>
            <td>
              <button type="button">Go to</button>
            </td>
            <td>
              <button type="button">Go to</button>
            </td>
            <td>
              <button type="button">Go to</button>
            </td>
            <td>
              <button type="button">Go to</button>
            </td>
            <td>
              <button type="button">Go to</button>
            </td>
            <td>
              <button type="button">Go to</button>
            </td>
          </tr>
        </table>
      </div>
      <div className="App">
        Characters (total: {characters.size}
        ):
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>AC</th>
              <th>Phy</th>
              <th>Int</th>
              <th>Mana</th>
              <th>Soc</th>
              <th>Luc</th>
              <th>Total</th>
              <th>Coor</th>
            </tr>
          </thead>
          {characters.map(([id, character]) => {
            const {
              name,
              coor,
              attr: { intelligence, mana, physique, social, luck },
              actionCapacity,
            } = character;

            const attrSum = intelligence + mana + physique + social + luck;

            return (
              // eslint-disable-next-line react/no-array-index-key
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{actionCapacity}</td>
                <td>{physique}</td>
                <td>{intelligence}</td>
                <td>{mana}</td>
                <td>{social}</td>
                <td>{luck}</td>
                <td>{attrSum}</td>
                <td>{coorToString(coor)}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

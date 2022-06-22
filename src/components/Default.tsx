import React, { useContext } from "react";

import { GameContext } from "../Context/Game";
import { ViewContext } from "../Context/View";
import { Coor, CoorKind } from "../Model/Coor";

function coorToString(coor: Coor): string {
  switch (coor.type) {
    case CoorKind.Node: {
      const { nodeId } = coor;
      return `N${nodeId}`;
    }
    case CoorKind.Planet: {
      const { x, y } = coor;
      return `P(${x},${y})`;
    }
    default:
      throw new Error("Unreachable");
  }
}

export const Default: React.FC = () => {
  const {
    game: { characters, landNodes },
  } = useContext(GameContext);

  const viewContext = useContext(ViewContext);

  return (
    <>
      <div>
        Nodes
        <table>
          <tr>
            <th>Name</th>
            <th>Pop Scale</th>
            <th>Usable Land (Acre)</th>
            <th>Market</th>
            <th>Dungeons</th>
          </tr>
          {landNodes.map((node) => {
            const { name, popScale, allUsableLand, hasMarket, hasDungeons } =
              node;

            return (
              <tr>
                <td>{name}</td>
                <td>{popScale.toFixed(0)}</td>
                <td>{allUsableLand}</td>
                <td>
                  {hasMarket ? <button type="button">Go to</button> : "✗"}
                </td>
                <td>
                  {hasDungeons ? <button type="button">Go to</button> : "✗"}
                </td>
              </tr>
            );
          })}
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

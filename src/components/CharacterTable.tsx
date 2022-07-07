import React, { useContext } from "react";

import { GameContext } from "../Context/Game";
import { ViewContext, ViewKind } from "../Context/View";

export const CharacterTable: React.FC = () => {
  const { game } = useContext(GameContext);
  const { characters } = game;

  const { pushView } = useContext(ViewContext);

  return (
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
      <tbody>
        {characters.map(([id, character]) => {
          const {
            name,
            coor,
            attr: { intelligence, mana, physique, social, luck },
            actionCapacity,
          } = character;

          const attrSum = intelligence + mana + physique + social + luck;

          return (
            <tr
              className="clickable"
              key={id}
              onClick={() =>
                pushView({ type: ViewKind.Character, characterId: id })
              }
            >
              <td>{id}</td>
              <td>{name}</td>
              <td>{actionCapacity}</td>
              <td>{physique}</td>
              <td>{intelligence}</td>
              <td>{mana}</td>
              <td>{social}</td>
              <td>{luck}</td>
              <td>{attrSum}</td>
              <td>{game.toCoorString(coor)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

import React, { useContext } from "react";

import { GameContext } from "../Context/Game";
import { ViewContext, ViewKind } from "../Context/View";
import { coorToString } from "../Model/Coor";

export const CharacterTable: React.FC = () => {
  const {
    game: { characters },
  } = useContext(GameContext);

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
              onClick={(): void =>
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
              <td>{coorToString(coor)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

import React, { useContext } from "react";

import { GameContext } from "../Context/Game";

export const FactionTable: React.FC = () => {
  const { game } = useContext(GameContext);

  const rows = game.factions.map(([id, { name, capital: capitalId }]) => {
    const capital = game.getNode(capitalId);
    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{name}</td>
        <td>{capital.name}</td>
      </tr>
    );
  });
  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Capital Node</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

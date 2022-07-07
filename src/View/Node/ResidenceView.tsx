import React, { useContext } from "react";

import { GameContext } from "../../Context/Game";
import { ViewContext } from "../../Context/View";
import { Residence, ResidenceKind } from "../../Model/Buildings/Residence";
import { Game } from "../../Model/Game";

function createRows(game: Game, residences: Residence[]): React.ReactNode {
  return residences.map(
    ({ type, owner, name: residenceName, families }, index) => {
      const character = game.getCharacter(owner);

      const id = index;

      return (
        <tr key={id}>
          <td>{residenceName}</td>
          <td>
            {character.name} ({owner})
          </td>
          <td>{ResidenceKind[type]}</td>
          <td>{families.size}</td>
        </tr>
      );
    }
  );
}

interface Props {
  nodeId: number;
}

export const ResidenceView: React.FC<Props> = ({ nodeId }) => {
  const { game } = useContext(GameContext);

  const { popView } = useContext(ViewContext);

  const node = game.getNode(nodeId);

  const { name: nodeName, population, residences } = node;

  return (
    <div>
      <div>{nodeName}</div>
      <div>Population: {population}</div>

      <div>
        Residences
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Owner (Id)</th>
              <th>Residence type</th>
              <th>Families</th>
            </tr>
          </thead>
          <tbody>{createRows(game, residences)}</tbody>
        </table>
      </div>

      <button type="button" onClick={popView}>
        Back
      </button>
    </div>
  );
};

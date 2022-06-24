import { useContext } from "react";

import { GameContext } from "../../Context/Game";
import { ViewContext } from "../../Context/View";

interface Props {
  nodeId: number;
}

export const Residence: React.FC<Props> = ({ nodeId }) => {
  const {
    game: { landNodes },
  } = useContext(GameContext);

  const { popView } = useContext(ViewContext);

  const node = landNodes[nodeId];

  if (!node) {
    throw new Error("Unreachable - unknown node");
  }

  const { name, population } = node;

  return (
    <div>
      <div>{name}</div>
      <div>Population: {population}</div>
      <button type="button" onClick={popView}>
        Back
      </button>
    </div>
  );
};

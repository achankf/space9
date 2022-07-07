import React, { useContext } from "react";

import { GameContext } from "../../Context/Game";
import { ViewContext } from "../../Context/View";

interface Props {
  nodeId: number;
}

export const EmptyView: React.FC<Props> = ({ nodeId }) => {
  const { game } = useContext(GameContext);

  const { popView } = useContext(ViewContext);

  const { name } = game.getNode(nodeId);

  return (
    <div>
      Unimplemented!
      <div>{name}</div>
      <button type="button" onClick={popView}>
        Back
      </button>
    </div>
  );
};

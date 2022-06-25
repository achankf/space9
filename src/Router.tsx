import { useContext } from "react";

import { ViewContext, ViewKind } from "./Context/View";
import { Character } from "./View/Character/Character";
import { Default } from "./View/Default";
import { Empty } from "./View/Node/Empty";
import { ResidenceView } from "./View/Node/Residence";

export const Router: React.FC = () => {
  const { currentView } = useContext(ViewContext);

  switch (currentView.type) {
    case ViewKind.Default: {
      return <Default />;
    }
    case ViewKind.NodeResidence: {
      const { nodeId } = currentView;
      return <ResidenceView nodeId={nodeId} />;
    }
    case ViewKind.NodeDungeon:
    case ViewKind.NodeInstitution:
    case ViewKind.NodeMarket:
    case ViewKind.NodeProducer:
    case ViewKind.NodeService:
    case ViewKind.NodeWelfare: {
      const { nodeId } = currentView;
      return <Empty nodeId={nodeId} />;
    }
    case ViewKind.Character: {
      const { characterId } = currentView;
      return <Character characterId={characterId} />;
    }
    default:
      throw new Error("Unreachable - unknown view");
  }
};

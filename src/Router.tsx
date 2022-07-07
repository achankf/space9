import { useContext } from "react";

import { ViewContext, ViewKind } from "./Context/View";
import { CharacterView } from "./View/Character/Character";
import { Default } from "./View/Default";
import { EmptyView } from "./View/Node/EmptyView";
import { MarketView } from "./View/Node/Market";
import { ResidenceView } from "./View/Node/ResidenceView";

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
    case ViewKind.NodeMarket: {
      const { nodeId } = currentView;
      return <MarketView nodeId={nodeId} />;
    }
    case ViewKind.NodeDungeon:
    case ViewKind.NodeInstitution:
    case ViewKind.NodeProducer:
    case ViewKind.NodeService:
    case ViewKind.NodeWelfare: {
      const { nodeId } = currentView;
      return <EmptyView nodeId={nodeId} />;
    }
    case ViewKind.Character: {
      const { characterId } = currentView;
      return <CharacterView characterId={characterId} />;
    }
    default:
      throw new Error("Unreachable - unknown view");
  }
};

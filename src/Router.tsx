import { useContext } from "react";

import { ViewContext, ViewKind } from "./Context/View";
import { Default } from "./View/Default";
import { Residence } from "./View/Node/Residence";

export const Router: React.FC = () => {
  const { currentView } = useContext(ViewContext);

  switch (currentView.type) {
    case ViewKind.Default: {
      return <Default />;
    }
    case ViewKind.NodeResidence: {
      const { nodeId } = currentView;

      return <Residence nodeId={nodeId} />;
    }
    default:
      throw new Error("Unreachable - unknown view");
  }
};

import { useContext } from "react";

import { Default } from "./components/Default";
import { ViewContext, ViewKind } from "./Context/View";

export const Router: React.FC = () => {
  const { currentView } = useContext(ViewContext);

  switch (currentView.type) {
    case ViewKind.Default: {
      return <Default />;
    }
    default:
      throw new Error("Unreachable - unknown view");
  }
};

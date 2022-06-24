import { createContext, useMemo, useState } from "react";

export enum ViewKind {
  Default,
  Node,
  NodeResidence,
}

export interface DefaultView {
  type: ViewKind.Default;
}

export interface NodeResidenceView {
  type: ViewKind.NodeResidence;
  nodeId: number;
}

export type View = DefaultView | NodeResidenceView;

export interface ViewContextData {
  currentView: View;
  pushView(view: View): void;
  popView(): void;
  clearViews(): void;
}

export const ViewContext = createContext<ViewContextData>(
  {} as ViewContextData
);

export const ViewContextProvider: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  const [viewStack, setViewStack] = useState(Array<View>());

  const contextData: ViewContextData = useMemo(() => {
    const currentView = viewStack.at(-1) ?? { type: ViewKind.Default };

    const pushView = (view: View): void => {
      setViewStack(viewStack.concat(view));
    };

    const popView = (): void => {
      if (viewStack.length === 0) {
        throw new Error("Unreachable - cannot pop an empty view stack");
      }

      const copy = [...viewStack];
      copy.pop();
      setViewStack(copy);
    };

    const clearViews = (): void => {
      setViewStack([]);
    };

    return {
      currentView,
      pushView,
      popView,
      clearViews,
    };
  }, [viewStack]);

  return (
    <ViewContext.Provider value={contextData}>{children}</ViewContext.Provider>
  );
};

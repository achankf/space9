import { createContext, useMemo, useState } from "react";

import { Id } from "../Id";

export enum ViewKind {
  Default,
  Node,
  NodeResidence,
  NodeMarket,
  NodeWelfare,
  NodeService,
  NodeProducer,
  NodeDungeon,
  NodeInstitution,
  Character,
}

export interface DefaultView {
  type: ViewKind.Default;
}

export interface NodeCommonView {
  type:
    | ViewKind.NodeMarket
    | ViewKind.NodeWelfare
    | ViewKind.NodeWelfare
    | ViewKind.NodeService
    | ViewKind.NodeProducer
    | ViewKind.NodeDungeon
    | ViewKind.NodeInstitution;
  nodeId: Id;
}

export interface NodeResidenceView {
  type: ViewKind.NodeResidence;
  nodeId: Id;
}

export interface CharacterView {
  type: ViewKind.Character;
  characterId: Id;
}

export type View =
  | DefaultView
  | NodeResidenceView
  | NodeCommonView
  | CharacterView;

export interface ViewContextData {
  currentView: View;
  clearViews(): void;
  createPushView(view: View): () => void;
  popView(): void;
  pushView(view: View): void;
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

    const createPushView =
      (view: View): (() => void) =>
      () =>
        pushView(view);

    return {
      clearViews,
      createPushView,
      currentView,
      popView,
      pushView,
    };
  }, [viewStack]);

  return (
    <ViewContext.Provider value={contextData}>{children}</ViewContext.Provider>
  );
};

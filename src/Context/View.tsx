import { createContext, useMemo } from "react";

export enum ViewKind {
  Default,
  Node,
}

export interface DefaultView {
  type: ViewKind.Default;
}

export interface NodeView {
  type: ViewKind.Node;
}

export type View = DefaultView | NodeView;

export class ViewContextData {
  #viewStack: View[] = [];

  public get getCurrentView(): View {
    const view = this.#viewStack.at(-1);

    if (!view) {
      return { type: ViewKind.Default };
    }
    return view;
  }

  public pushView(view: View): void {
    this.#viewStack.push(view);
  }

  public popView(): void {
    if (this.#viewStack.length === 0) {
      throw new Error("Unreachable - cannot pop an empty view stack");
    }

    this.#viewStack.pop();
  }
}

export const ViewContext = createContext<ViewContextData>(
  new ViewContextData()
);

export const ViewContextProvider: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  const data = useMemo(() => new ViewContextData(), []);

  return <ViewContext.Provider value={data}>{children}</ViewContext.Provider>;
};

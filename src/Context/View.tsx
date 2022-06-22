import { createContext, useMemo } from "react";

export enum ViewKind {
  Default,
  Node,
}

export class DefaultView {
  type = ViewKind.Default;
}

export type View = DefaultView;

export class ViewContextData {
  #viewStack: View[] = [];

  get currentView(): View {
    return this.#viewStack.at(-1) ?? new DefaultView();
  }

  pushView(view: View): void {
    this.#viewStack.push(view);
  }

  popView(): void {
    if (this.#viewStack.length === 0) {
      throw new Error("Unreachable - cannot pop an empty view stack");
    }

    this.#viewStack.pop();
  }

  clearViews(): void {
    this.#viewStack.length = 0;
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

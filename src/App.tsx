import { GameContextProvider } from "./Context/Game";
import { ViewContextProvider } from "./Context/View";
import { Default } from "./View/default";

export const App: React.FC = () => (
  <ViewContextProvider>
    <GameContextProvider>
      <Default />
    </GameContextProvider>
  </ViewContextProvider>
);

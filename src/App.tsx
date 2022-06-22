import { GameContextProvider } from "./Context/Game";
import { ViewContextProvider } from "./Context/View";
import { Router } from "./Router";

export const App: React.FC = () => (
  <ViewContextProvider>
    <GameContextProvider>
      <Router />
    </GameContextProvider>
  </ViewContextProvider>
);

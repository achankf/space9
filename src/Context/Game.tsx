import React, { useMemo, useRef } from "react";

import { createGame } from "../createGame";
import { Game } from "../Model/Game";

interface ContextData {
  game: Game;
}

export const GameContext = React.createContext<ContextData>({} as ContextData);

export const GameContextProvider: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  const gameRef = useRef<Game>();

  const getGame = (): Game => {
    const { current } = gameRef;
    if (current) {
      return current;
    }
    gameRef.current = createGame();
    return gameRef.current;
  };

  const game = getGame();

  const data: ContextData = useMemo(() => ({ game }), []);

  return <GameContext.Provider value={data}>{children}</GameContext.Provider>;
};

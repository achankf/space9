import React, { useContext } from "react";

import { CharacterTable } from "../components/CharacterTable";
import { Container } from "../components/Container";
import { NodeTable } from "../components/NodeTable";
import { GameContext } from "../Context/Game";
import { ViewContext, ViewKind } from "../Context/View";

export const Default: React.FC = () => {
  const {
    game: { characters, playerId },
  } = useContext(GameContext);

  const { pushView } = useContext(ViewContext);

  return (
    <>
      <Container>
        <button
          type="button"
          onClick={(): void =>
            pushView({ type: ViewKind.Character, characterId: playerId })
          }
        >
          You
        </button>
      </Container>
      <Container>
        Nodes
        <NodeTable />
      </Container>
      <Container>
        Characters (total: {characters.size}):
        <CharacterTable />
      </Container>
    </>
  );
};

import React, { useContext } from "react";

import { CharacterTable } from "../components/CharacterTable";
import { Container } from "../components/Container";
import { NodeTable } from "../components/NodeTable";
import { GameContext } from "../Context/Game";

export const Default: React.FC = () => {
  const {
    game: { characters },
  } = useContext(GameContext);

  return (
    <>
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

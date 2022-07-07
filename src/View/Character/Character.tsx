import { useContext } from "react";

import { GameContext } from "../../Context/Game";
import { ViewContext } from "../../Context/View";
import { Id } from "../../Id";

interface Props {
  characterId: Id;
}

export const CharacterView: React.FC<Props> = ({ characterId }) => {
  const { game } = useContext(GameContext);
  const { popView } = useContext(ViewContext);

  const character = game.getCharacter(characterId);

  const {
    name,
    coor,
    attr: { intelligence, mana, physique, social, luck },
    actionCapacity,
  } = character;

  const isPlayer = game.isPlayer(characterId);

  return (
    <>
      <div>Character {isPlayer ? "(Player)" : ""}</div>

      <table>
        <tbody>
          <tr>
            <td>Id</td>
            <td>{characterId}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{name}</td>
          </tr>
          <tr>
            <td>Action Capacity</td>
            <td>{actionCapacity}</td>
          </tr>
          <tr>
            <td>Physique</td>
            <td>{physique}</td>
          </tr>
          <tr>
            <td>Intelligence</td>
            <td>{intelligence}</td>
          </tr>
          <tr>
            <td>Mana</td>
            <td>{mana}</td>
          </tr>
          <tr>
            <td>Social</td>
            <td>{social}</td>
          </tr>
          <tr>
            <td>Luck</td>
            <td>{luck}</td>
          </tr>
          <tr>
            <td>Location</td>
            <td>{game.toCoorString(coor)}</td>
          </tr>
        </tbody>
      </table>

      <button type="button" onClick={popView}>
        Back
      </button>
    </>
  );
};

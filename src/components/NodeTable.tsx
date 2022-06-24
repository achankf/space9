import { useContext } from "react";

import { GameContext } from "../Context/Game";
import { ViewContext, ViewKind } from "../Context/View";

export const NodeTable: React.FC = () => {
  const {
    game: { landNodes },
  } = useContext(GameContext);

  const viewContext = useContext(ViewContext);

  return (
    <table>
      <thead>
        <tr>
          <th colSpan={2}>Demographics</th>
          <th colSpan={3}>Land (Acre)</th>
          <th colSpan={5}>Establishment</th>
          <th colSpan={2}>Cultivation</th>
        </tr>
        <tr>
          <th>Name</th>
          <th>Pop Scale</th>
          <th>Usable</th>
          <th>Claimed</th>
          <th>Used</th>
          <th>Residence</th>
          <th>Market</th>
          <th>Welfare</th>
          <th>Service</th>
          <th>Producer</th>
          <th>Dungeon</th>
          <th>Institution</th>
        </tr>
      </thead>
      <tbody>
        {landNodes.map((node, index) => {
          const {
            allUsableLand,
            hasDungeons,
            hasServices,
            hasMarket,
            hasProducers,
            hasWelfare,
            hasInstitution,
            name,
            claimedLand,
            usedLand,
            popScale,
          } = node;

          const nodeId = index;

          return (
            <tr key={nodeId}>
              <td>{name}</td>
              <td>{popScale.toFixed(0)}</td>
              <td>{allUsableLand}</td>
              <td>{claimedLand}</td>
              <td>{usedLand}</td>
              <td>
                <button
                  type="button"
                  onClick={(): void =>
                    viewContext.pushView({
                      type: ViewKind.NodeResidence,
                      nodeId,
                    })
                  }
                >
                  Go to
                </button>
              </td>
              <td>{hasMarket ? <button type="button">Go to</button> : "✗"}</td>
              <td>{hasWelfare ? <button type="button">Go to</button> : "✗"}</td>
              <td>
                {hasServices ? <button type="button">Go to</button> : "✗"}
              </td>
              <td>
                {hasProducers ? <button type="button">Go to</button> : "✗"}
              </td>
              <td>
                {hasDungeons ? <button type="button">Go to</button> : "✗"}
              </td>
              <td>
                {hasInstitution ? <button type="button">Go to</button> : "✗"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

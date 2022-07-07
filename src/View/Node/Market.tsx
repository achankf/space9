import React, { useContext } from "react";

import { GameContext } from "../../Context/Game";
import { ViewContext } from "../../Context/View";
import { INVISIBLE_HAND } from "../../Model/Commodity";

interface Props {
  nodeId: number;
}

export const MarketView: React.FC<Props> = ({ nodeId }) => {
  const { game } = useContext(GameContext);

  const { popView } = useContext(ViewContext);

  const node = game.getNode(nodeId);
  const { name: nodeName } = node;

  const rows = Object.entries(INVISIBLE_HAND).map(([key, { name, type }]) => {
    const price = node.getPrice(type);
    const producerDemand = node.getDemand(type);
    const producerSupply = node.getSupply(type);

    const popDemand = node.getDemand(type);
    const popSupply = node.getSupply(type);

    const totalDemand = producerDemand + popDemand;
    const totalSupply = producerSupply + popSupply;

    return (
      <tr key={key}>
        <td>{name}</td>
        <td>${price}</td>
        <td>{producerDemand}</td>
        <td>{popDemand}</td>
        <td>{totalDemand}</td>
        <td>{producerSupply}</td>
        <td>{popSupply}</td>
        <td>{totalSupply}</td>
      </tr>
    );
  });
  return (
    <div>
      Market of {nodeName}
      <table>
        <thead>
          <tr>
            <th />
            <th />
            <th colSpan={3}>Demand</th>
            <th colSpan={3}>Supply</th>
          </tr>
          <tr>
            <th>Commodity</th>
            <th>Price</th>
            <th>Producer</th>
            <th>Pop</th>
            <th>Total</th>
            <th>Producer</th>
            <th>Pop</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      <button type="button" onClick={popView}>
        Back
      </button>
    </div>
  );
};

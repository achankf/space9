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

    const producerDemand = node.getProducerDemand(type);
    const popDemand = node.getPopDemand(type);

    const wholesaleSupply = node.getWholesaleSupply(type);
    const retailSupply = node.getRetailSupply(type);

    const totalDemand = producerDemand + popDemand;
    const totalSupply = wholesaleSupply + retailSupply;

    return (
      <tr key={key}>
        <td>{name}</td>
        <td>${price}</td>
        <td>{producerDemand}</td>
        <td>{popDemand}</td>
        <td>{totalDemand}</td>
        <td>{wholesaleSupply}</td>
        <td>{retailSupply}</td>
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
            <th>Wholesale</th>
            <th>Retail</th>
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

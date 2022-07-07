import { useContext } from "react";

import { GameContext } from "../Context/Game";
import { ViewContext, ViewKind } from "../Context/View";

const TableBody: React.FC = () => {
  const { game } = useContext(GameContext);

  const viewContext = useContext(ViewContext);

  const { landNodes } = game;

  const rows = landNodes.map((node, index) => {
    const { allUsableLand, name, claimedLand, usedLand, popScale, suzerain } =
      node;

    const suzerainFaction =
      suzerain !== undefined ? game.getFaction(suzerain) : undefined;

    const nodeId = index;

    const pushResidenceView = viewContext.createPushView({
      type: ViewKind.NodeResidence,
      nodeId,
    });

    const pushMarketView = viewContext.createPushView({
      type: ViewKind.NodeMarket,
      nodeId,
    });

    const pushWelfareView = viewContext.createPushView({
      type: ViewKind.NodeWelfare,
      nodeId,
    });

    const pushServiceView = viewContext.createPushView({
      type: ViewKind.NodeService,
      nodeId,
    });

    const pushProducerView = viewContext.createPushView({
      type: ViewKind.NodeProducer,
      nodeId,
    });

    const pushDungeonView = viewContext.createPushView({
      type: ViewKind.NodeDungeon,
      nodeId,
    });

    const pushInstitutionView = viewContext.createPushView({
      type: ViewKind.NodeInstitution,
      nodeId,
    });

    return (
      <tr key={nodeId}>
        <td>{name}</td>
        <td>{popScale.toFixed(0)}</td>
        <td>{suzerainFaction?.name ?? "None"}</td>
        <td>{allUsableLand}</td>
        <td>{claimedLand}</td>
        <td>{usedLand}</td>
        <td>
          <button type="button" onClick={pushResidenceView}>
            show
          </button>
        </td>
        <td>
          <button type="button" onClick={pushMarketView}>
            show
          </button>
        </td>
        <td>
          <button type="button" onClick={pushWelfareView}>
            show
          </button>
        </td>
        <td>
          <button type="button" onClick={pushServiceView}>
            show
          </button>
        </td>
        <td>
          <button type="button" onClick={pushProducerView}>
            show
          </button>
        </td>
        <td>
          <button type="button" onClick={pushDungeonView}>
            show
          </button>
        </td>
        <td>
          <button type="button" onClick={pushInstitutionView}>
            show
          </button>
        </td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

export const NodeTable: React.FC = () => (
  <table>
    <thead>
      <tr>
        <th colSpan={3}>Demographics</th>
        <th colSpan={3}>Land (Acre)</th>
        <th colSpan={5}>Establishment</th>
        <th colSpan={2}>Cultivation</th>
      </tr>
      <tr>
        <th>Name</th>
        <th>Pop Scale</th>
        <th>Allegiance</th>
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
    <TableBody />
  </table>
);

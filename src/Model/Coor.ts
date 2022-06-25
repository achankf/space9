export const enum CoorKind {
  Node,
  Planet,
}

export interface PlanetCoor {
  type: CoorKind.Planet;
  x: number;
  y: number;
}

export interface NodeCoor {
  type: CoorKind.Node;
  nodeId: number;
}

export type Coor = NodeCoor | PlanetCoor;

export function coorToString(coor: Coor): string {
  switch (coor.type) {
    case CoorKind.Node: {
      const { nodeId } = coor;
      return `N-${nodeId}`;
    }
    case CoorKind.Planet: {
      const { x, y } = coor;
      return `P(${x},${y})`;
    }
    default:
      throw new Error("Unreachable");
  }
}

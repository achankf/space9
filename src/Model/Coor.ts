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

export const enum CoorKind {
  Landmark,
  Wild,
}

export interface WildCoor {
  type: CoorKind.Wild;
  x: number;
  y: number;
}

export interface CityCoor {
  type: CoorKind.Landmark;
  cityId: number;
}

export type Coor = CityCoor | WildCoor;

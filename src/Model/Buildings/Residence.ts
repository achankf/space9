export enum ResidenceKind {
  Shack,
  House,
  Manor,
}

export interface Residence {
  name: string;
  type: ResidenceKind;
  owner: number;
  families: Set<number>;
}

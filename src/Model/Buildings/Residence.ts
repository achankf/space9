export enum ResidenceKind {
  Shack,
  House,
}

export enum UnitKind {
  Mass, // for unnamed population
  Family,
  Single, // for named & unmarried people who havn't formed a family yet
}

interface FamilyUnit {
  type: UnitKind.Family;
  family: number;
}

interface SingleUnit {
  type: UnitKind.Single;
  person: number;
}

interface MassUnit {
  type: UnitKind.Mass;
  inhabitants: number;
}

type Unit = FamilyUnit | SingleUnit | MassUnit;

export interface Residence {
  type: ResidenceKind;
  units: Unit[];
}

export enum Commodity {
  Grain,
  Fruit,
}

interface CommodityDetails {
  type: Commodity;
  name: string;

  /**
   * How much the commodity is worth at equilibrium, quantified at a macro scale (does it make any sense?),
   * before local factors and currency adjustments.
   */
  intrinsicValue: number;
  elasticity: number;
}

export const INVISIBLE_HAND: Record<Commodity, CommodityDetails> = {
  [Commodity.Grain]: {
    type: Commodity.Grain,
    name: "Grain",
    intrinsicValue: 10,
    elasticity: 1.4,
  },
  [Commodity.Fruit]: {
    type: Commodity.Fruit,
    name: "Fruit",
    intrinsicValue: 20,
    elasticity: 1.4,
  },
};

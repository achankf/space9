import clamp from "lodash/clamp";

import { Id } from "../Id";
import { DynamicClassFactory } from "../utils/DynamicClass";
import { Farmhouse } from "./Buildings/Farmhouse";
import { GuildHall } from "./Buildings/GuildHall";
import { Residence } from "./Buildings/Residence";
import { Shop } from "./Buildings/Shop";
import { Commodity, INVISIBLE_HAND } from "./Commodity";
import { PlanetCoor } from "./Coor";
import { Dungeon } from "./Dungeon/Dungeon";

// How many you're willing to pay on top of the base price?
// each level above "None" raises the fee by 5% per level.
export enum Fee {
  None,
  Low,
  Medium,
  High,
  VeryHigh,
}

// one-time purchase, at market price
interface Order {
  amount: number;
}

// recurring orders with fixed weekly quota
interface Contract {
  quota: number;
  fee: Fee;
}

export interface LandNodeData {
  name: string;
  allUsableLand: number;
  claimedLand: number;
  usedLand: number;
  population: number;
  coor: PlanetCoor;

  suzerain?: Id;

  // buildings
  farmhouses: Farmhouse[];
  guildHalls: GuildHall[];
  dungeons: Dungeon[];
  shops: Shop[];
  residences: Residence[];
}

const BaseClass = DynamicClassFactory<LandNodeData>();

export class LandNode extends BaseClass {
  get popScale(): number {
    return Math.log10(this.population);
  }

  get hasMarket(): boolean {
    return this.shops.length > 0;
  }

  get hasProducers(): boolean {
    return this.farmhouses.length > 0;
  }

  get hasDungeons(): boolean {
    return this.dungeons.length > 0;
  }

  // eslint-disable-next-line class-methods-use-this
  get hasWelfare(): boolean {
    return false; // TODO
  }

  // eslint-disable-next-line class-methods-use-this
  get hasServices(): boolean {
    return false; // TODO
  }

  get hasResidence(): boolean {
    return this.residences.length > 0;
  }

  // eslint-disable-next-line class-methods-use-this
  get hasInstitution(): boolean {
    return false; // TODO
  }

  // eslint-disable-next-line class-methods-use-this
  getProducerDemand(commodity: Commodity): number {
    return 100;
  }

  // eslint-disable-next-line class-methods-use-this
  getPopDemand(commodity: Commodity): number {
    return 100;
  }

  // eslint-disable-next-line class-methods-use-this
  getWholesaleSupply(commodity: Commodity): number {
    return 100;
  }

  // eslint-disable-next-line class-methods-use-this
  getRetailSupply(commodity: Commodity): number {
    return 100;
  }

  // eslint-disable-next-line class-methods-use-this
  getPerceivedValue(commodity: Commodity): number {
    const demand = this.getProducerDemand(commodity);
    const supply = this.getWholesaleSupply(commodity);
    const { intrinsicValue, elasticity } = INVISIBLE_HAND[commodity];

    const minValue = 1;
    const maxValueFactor = 2; // TODO?
    const maxValue = maxValueFactor * intrinsicValue;

    if (supply === 0) {
      return maxValue;
    }

    if (demand === 0) {
      return minValue;
    }

    if (demand === supply) {
      return intrinsicValue;
    }

    const logRate = (() => {
      if (demand > supply) {
        const rate = demand / supply;
        return 1 + Math.log(rate);
      }

      // else: supply > demand

      const rate = supply / demand; // note: rate > 1
      return 1 / (1 + Math.log(rate)); // note: logRate < 1, so the final value is going to be < intrinsicValue
    })();

    return clamp(intrinsicValue * logRate ** elasticity, 1, maxValue);
  }

  getPrice(commodity: Commodity): number {
    const perceivedValue = this.getPerceivedValue(commodity);
    return perceivedValue; // TODO
  }
}

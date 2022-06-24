import { DynamicClassFactory } from "../utils/DynamicClass";
import { PlanetCoor } from "./Coor";

export interface LandNodeData {
  name: string;
  allUsableLand: number;
  claimedLand: number;
  usedLand: number;
  population: number;
  farmhouses: Set<number>;
  guildHalls: Set<number>;
  dungeons: Set<number>;
  shops: Set<number>;
  coor: PlanetCoor;
}

const BaseClass = DynamicClassFactory<LandNodeData>();

export class LandNode extends BaseClass {
  get popScale(): number {
    return Math.log10(this.population);
  }

  get hasMarket(): boolean {
    return this.shops.size > 0;
  }

  get hasProducers(): boolean {
    return this.farmhouses.size > 0;
  }

  get hasDungeons(): boolean {
    return this.dungeons.size > 0;
  }

  // eslint-disable-next-line class-methods-use-this
  get hasWelfare(): boolean {
    return false; // TODO
  }

  // eslint-disable-next-line class-methods-use-this
  get hasServices(): boolean {
    return false; // TODO
  }

  // eslint-disable-next-line class-methods-use-this
  get hasResidence(): boolean {
    return false; // TODO
  }

  // eslint-disable-next-line class-methods-use-this
  get hasInstitution(): boolean {
    return false; // TODO
  }
}

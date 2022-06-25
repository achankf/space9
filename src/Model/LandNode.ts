import { DynamicClassFactory } from "../utils/DynamicClass";
import { Farmhouse } from "./Buildings/Farmhouse";
import { GuildHall } from "./Buildings/GuildHall";
import { Residence } from "./Buildings/Residence";
import { Shop } from "./Buildings/Shop";
import { PlanetCoor } from "./Coor";
import { Dungeon } from "./Dungeon/Dungeon";

export interface LandNodeData {
  name: string;
  allUsableLand: number;
  claimedLand: number;
  usedLand: number;
  population: number;
  coor: PlanetCoor;

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
}

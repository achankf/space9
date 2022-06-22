export interface LandNode {
  allUsableLand: number;
  population: number;
  landmarks: {
    farmhouses: Set<number>;
    guildHalls: Set<number>;
    dungeons: Set<number>;
  };
}

enum DungeonTheme {
  Cave,
}

export class Dungeon {
  public constructor(
    public theme: DungeonTheme,
    public stageSlots: number, // how many "stages" need to face before getting to the final boss
    public floorSize: number // how many encounters per floor
  ) {}

  public get size(): number {
    const { stageSlots, floorSize } = this;
    return stageSlots * floorSize;
  }
}

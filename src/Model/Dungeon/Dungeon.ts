enum DungeonTheme {
  Cave,
}

export class Dungeon {
  constructor(
    public theme: DungeonTheme,
    public stageSlots: number, // how many "stages" need to face before getting to the final boss
    public floorSize: number // how many encounters per floor
  ) {}

  get size(): number {
    const { stageSlots, floorSize } = this;
    return stageSlots * floorSize;
  }
}

export class GuildHall {
  constructor(
    public scale: number,
    public furnishing: number,
    public receptionists: Set<number>,
    public customers: Set<number>
  ) {}

  static default(): GuildHall {
    return new GuildHall(1, 0, new Set(), new Set());
  }

  calAttractiveness(): number {
    return this.scale; // TODO
  }
}

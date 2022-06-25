export class Shop {
  constructor(
    public scale: number,
    public furnishing: number,
    public receptionists: Set<number>,
    public customers: Set<number>
  ) {}

  static default(): Shop {
    return new Shop(1, 0, new Set(), new Set());
  }

  calAttractiveness(): number {
    return this.scale; // TODO
  }
}

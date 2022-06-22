import { Job } from "../Job";

export class GuildHall {
  public constructor(
    public associatedGuild: number,
    public scale: number,
    public furnishing: number,
    public postedJobs: Job[],
    public clerks: Set<number>,
    public receptionists: Set<number>
  ) {}

  public calAttractiveness(): number {
    return this.scale; // TODO
  }
}

import { Job } from "../Job";

export class GuildHall {
  constructor(
    public associatedGuild: number,
    public scale: number,
    public furnishing: number,
    public postedJobs: Job[],
    public clerks: Set<number>,
    public receptionists: Set<number>
  ) {}

  calAttractiveness(): number {
    return this.scale; // TODO
  }
}

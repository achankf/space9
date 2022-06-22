export enum GuildRank {
  F,
  E,
  D,
  C,
  B,
  A,
  S,
}

export interface GuildMember {
  rank: GuildRank;
  contribution: number;
}

// this kind of guild: https://youtu.be/C2nksqvmSRI
export interface Guild {
  master: number; // always have a master, can appoint a successor and retire
  members: Map<number, GuildMember>;
}

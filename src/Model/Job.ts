export const enum JobKind {
  Fetch,
}

interface FetchJob {
  type: JobKind.Fetch;
}

export type Job = FetchJob;

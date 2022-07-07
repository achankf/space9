import shuffle from "lodash/shuffle";

const nameParts1 = new Set(
  ["A", "Al", "Be", "Ca", "De", "Er", "Fr", "Fa", "Ne", "Ge", "Ze"].sort()
);
const nameParts2 = new Set(["cius", "totle", "ious", "on", "bian"].sort());

const allNames = [...nameParts1].flatMap((part1) =>
  [...nameParts2].map((part2) => part1 + part2)
);

export function createUniqueNames(count: number): Set<string> {
  return new Set(shuffle(allNames).slice(0, count));
}

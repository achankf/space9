import sample from "lodash/sample";

const nameParts1 = ["A", "Al", "Be", "Ca", "De", "Er", "Fr", "Ge"];
const nameParts2 = ["cius", "totle", "ious"];

export function createRandomName(): string {
  return `${sample(nameParts1)}${sample(nameParts2)}`;
}

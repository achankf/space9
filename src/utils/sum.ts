export function sum(numbers: IterableIterator<number>): number {
  let total = 0;

  for (const value of numbers) {
    total += value;
  }

  return total;
}

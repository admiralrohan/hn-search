/** Generate array with number between ranges */
export function getArrayRange(startAt: number, endAt: number): number[] {
  return [...Array(endAt - startAt + 1).keys()].map((i) => i + startAt);
}

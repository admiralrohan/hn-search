/** Generate array with number between ranges */
export function getArrayRange(startAt: number, endAt: number): number[] {
  const iterator = Array(endAt - startAt + 1).keys();
  const generatedArray: number[] = [];

  let isDone = false;
  while (!isDone) {
    const nextItem = iterator.next();
    if (nextItem.value !== undefined) generatedArray.push(nextItem.value);
    isDone = Boolean(nextItem.done);
  }

  return generatedArray.map((i) => i + startAt);
}

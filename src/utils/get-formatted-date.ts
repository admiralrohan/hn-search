export const getFormattedDate = (date: string): string => {
  return new Date(date)
    .toString()
    .split(" ")
    .filter((_, i) => i >= 1 && i <= 3)
    .join(" ");
};

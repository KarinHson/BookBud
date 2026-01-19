export const calcProgressPercent = (
  pagesRead: number,
  totalPages: number
): number => {
  if (totalPages === 0) return 0;
  //this way, the UI will never present more than 100% completion
  return Math.min(100, Math.floor((pagesRead / totalPages) * 100));
};
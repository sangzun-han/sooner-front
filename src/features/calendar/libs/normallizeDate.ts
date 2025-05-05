/**
 * 날짜 또는 timestamp를 00:00:00 으로 정규화합니다.
 */
export const normalizeDate = (date: Date | number): number => {
  const d = typeof date === "number" ? new Date(date) : date;
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
};

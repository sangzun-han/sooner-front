/**
 * 월 셀 배열을 생성합니다.
 *
 * @param month         기준 월
 * @param fixedSixRows  true → 42칸 고정, false → 필요한 만큼만
 */
export const generateMonthCells = (month: Date, fixedSixRows: boolean = true): (Date | null)[] => {
  const y = month.getFullYear();
  const m = month.getMonth();

  const first = new Date(y, m, 1);
  const last = new Date(y, m + 1, 0);

  const leadingNulls = Array(first.getDay()).fill(null);
  const monthDates = Array.from({ length: last.getDate() }, (_, i) => new Date(y, m, i + 1));

  const cells = [...leadingNulls, ...monthDates];

  if (fixedSixRows) {
    while (cells.length < 42) cells.push(null);
  }
  return cells;
};

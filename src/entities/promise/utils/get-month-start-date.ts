/**
 * 날짜에서 연월만 추출하여 해당 월의 첫날을 반환하는 함수
 *
 * @param date 날짜 객체
 * @returns 해당 월의 첫 날짜 객체
 */
export const getMonthStartDate = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

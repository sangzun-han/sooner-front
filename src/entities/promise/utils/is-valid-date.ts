/**
 * 날짜가 유효한지 확인하는 함수
 *
 * @param date 확인할 날짜 객체
 * @returns 유효한 날짜인지 여부 (boolean)
 */
export const isValidDate = (date: Date): boolean => {
  return date instanceof Date && !isNaN(date.getTime());
};

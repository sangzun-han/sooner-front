/**
 * 날짜 객체를 'YYYY-MM-01' 형식의 문자열로 변환하는 함수
 *
 * @param date 변환할 날짜 객체
 * @returns 'YYYY-MM-01' 형식의 문자열
 */
export const formatMonthKey = (date: Date): string => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-01`;
};

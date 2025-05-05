/**
 * 주어진 날짜를 `"MM/DD(요일)"` 형식의 문자열로 포맷합니다.
 *
 * @param date - 변환할 날짜 객체
 * @returns 포맷된 날짜 문자열 (예: "5/6(월)")
 */
export const formatDisplayDate = (date: Date): string => {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return `${date.getMonth() + 1}/${date.getDate()}(${days[date.getDay()]})`;
};

import { TIME_RANGE_OPTIONS } from "@/shared/constants";

/**
 * 주어진 날짜를 `"MM/DD(요일)"` 형식의 문자열로 포맷합니다.
 *
 * @param date - 변환할 날짜 객체
 * @returns 포맷된 날짜 문자열 (예: "5/6(월)")
 */
export const formatDateWithDay = (date: Date): string => {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return `${date.getMonth() + 1}/${date.getDate()}(${days[date.getDay()]})`;
};

/**
 * 주어진 시간대 문자열에 해당하는 이모지를 포함한 설명 문자열을 반환합니다.
 *
 * @param timeRange - 시간대 키 값 ("MORNING", "NOON", "EVENING")
 * @returns 시간대에 대한 설명 문자열 (예: "아침 시간대 🌤️")
 */
export const formatTimeRangeLabel = (timeRange: string): string => {
  const option = TIME_RANGE_OPTIONS.find((opt) => opt.key === timeRange);
  if (!option) return timeRange;
  return `${option.value} 시간대 ${option.emoji}`;
};

/**
 * 시작 날짜와 종료 날짜, 시간대를 조합해 사용자에게 보여줄 기간 설명 문자열을 반환합니다.
 *
 * @param start - 시작 날짜
 * @param end - 종료 날짜
 * @param timeRange - 시간대 ("아침", "낮", "저녁")
 * @returns 기간 + 시간대를 포함한 문자열 (예: "5/6(월) - 5/8(수) 저녁 시간대 🌙")
 */
export const formatPeriodDisplay = (start: Date, end: Date, timeRange: string): string => {
  return `${formatDateWithDay(start)} - ${formatDateWithDay(end)} ${formatTimeRangeLabel(timeRange)}`;
};

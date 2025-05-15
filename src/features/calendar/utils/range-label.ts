import { TIME_RANGE_OPTIONS } from "@/shared/constants";
import { formatDisplayDate } from "./format";

/**
 * 주어진 시간대 문자열에 해당하는 이모지를 포함한 설명 문자열을 반환합니다.
 *
 * @param timeRange - 시간대 키 값 ("MORNING", "NOON", "EVENING")
 * @returns 시간대에 대한 설명 문자열 (예: "아침 시간대 🌤️")
 */
export const getTimeRangeLabel = (timeRange: string): string => {
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
export const getPeriodDisplay = (start: Date, end: Date, timeRange: string): string => {
  return `${formatDisplayDate(start)} - ${formatDisplayDate(end)} ${getTimeRangeLabel(timeRange)}`;
};

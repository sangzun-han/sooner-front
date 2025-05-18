import { getMonthStartDate } from "../utils/get-month-start-date";

/**
 * 월 이동 제한 범위를 관리하는 커스텀 훅
 * 최소/최대 날짜 사이에서만 월 단위 이동을 허용
 *
 * @param minDate 이동 가능한 최소 월의 날짜
 * @param maxDate 이동 가능한 최대 월의 날짜
 * @returns
 *  - isWithinRange: 주어진 날짜가 유효 범위 내에 있는지 확인하는 함수
 *  - getMonthBoundaries: 현재 유효한 월 범위(최소/최대)를 반환하는 함수
 */

export const useMonthBoundaries = (minDate: Date, maxDate: Date) => {
  const minMonth = getMonthStartDate(minDate);
  const maxMonth = getMonthStartDate(maxDate);

  const isWithinRange = (date: Date): boolean => {
    const monthDate = getMonthStartDate(date);
    return monthDate >= minMonth && monthDate <= maxMonth;
  };

  const getMonthBoundaries = () => {
    return { minMonth, maxMonth };
  };

  return { isWithinRange, getMonthBoundaries };
};

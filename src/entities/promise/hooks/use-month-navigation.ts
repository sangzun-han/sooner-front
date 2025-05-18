import { useLocalStorage } from "@/shared/hooks/use-local-storage";
import { formatMonthKey } from "../utils/format-month-key";
import { isValidDate } from "../utils/is-valid-date";
import { useMonthBoundaries } from "./use-month-boundaries";

/**
 * 월 단위 캘린더 네비게이션을 관리하는 커스텀 훅
 * localStorage에 현재 월을 저장하고, 지정된 최소/최대 범위 내에서만 월 변경을 허용
 *
 * @param minDate 이동 가능한 최소 월의 날짜
 * @param maxDate 이동 가능한 최대 월의 날짜
 * @returns
 *  - currentMonth: 현재 표시 중인 월의 첫날
 *  - goToMonth: 범위 내에서만 월을 변경하는 함수
 *  - resetToInitialMonth: localStorage를 초기화하고 초기 월로 되돌리는 함수
 */

const STORAGE_KEY = "CALENDAR_MONTH";
export const useMonthNavigation = (minDate: Date, maxDate: Date) => {
  const { isWithinRange, getMonthBoundaries } = useMonthBoundaries(minDate, maxDate);

  const { minMonth } = getMonthBoundaries();

  const getInitialMonth = () => {
    const now = new Date();
    if (isValidDate(now) && isWithinRange(now)) {
      return formatMonthKey(now);
    }
    return formatMonthKey(minMonth);
  };

  const {
    value: monthKey,
    setValue: setMonthKey,
    resetValue: resetMonth,
  } = useLocalStorage<string>(STORAGE_KEY, getInitialMonth());
  const currentMonth = new Date(monthKey);

  const goToMonth = (newMonth: Date) => {
    if (!isWithinRange(newMonth)) return;

    setMonthKey(formatMonthKey(newMonth));
  };

  const resetToInitialMonth = () => {
    resetMonth();
  };

  return { currentMonth, goToMonth, resetToInitialMonth };
};

import { useEffect, useState } from "react";

/**
 * 월 단위로 현재 캘린더 상태를 관리하며,
 * 지정된 최소/최대 범위 내에서만 월 변경을 허용합니다.
 *
 * @param minDate 월 이동의 최소 날짜 (시작일)
 * @param maxDate 월 이동의 최대 날짜 (종료일)
 * @returns
 *  - currentMonth: 현재 표시 중인 월의 첫날
 *  - goToMonth: 범위 내에서만 월을 변경하는 함수
 *  - resetToInitialMonth: Next/Prev 시 LocalStorage를 초기화하고 초기 값으로 되돌림
 */

export const useLimitedMonthRange = (minDate: Date, maxDate: Date) => {
  const storageKey = "calendar-month";

  const storedMonth = localStorage.getItem(storageKey);

  const isValidDate = (date: Date) => !isNaN(date.getTime());

  const initialMonth = storedMonth ? new Date(storedMonth) : new Date(minDate.getFullYear(), minDate.getMonth());

  const [currentMonth, setCurrentMonth] = useState<Date>(
    isValidDate(initialMonth) ? initialMonth : new Date(minDate.getFullYear(), minDate.getMonth())
  );

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-01`;
  };

  useEffect(() => {
    localStorage.setItem(storageKey, formatDate(currentMonth));
  }, [currentMonth]);

  useEffect(() => {
    const min = new Date(minDate.getFullYear(), minDate.getMonth());
    const max = new Date(maxDate.getFullYear(), maxDate.getMonth());

    if (currentMonth < min) {
      setCurrentMonth(min);
    } else if (currentMonth > max) {
      setCurrentMonth(max);
    }
  }, [minDate, maxDate]);

  const goToMonth = (newMonth: Date) => {
    const min = new Date(minDate.getFullYear(), minDate.getMonth());
    const max = new Date(maxDate.getFullYear(), maxDate.getMonth());

    if (newMonth >= min && newMonth <= max) {
      setCurrentMonth(newMonth);
    }
  };

  const resetToInitialMonth = () => {
    localStorage.removeItem(storageKey);
    setCurrentMonth(new Date(minDate.getFullYear(), minDate.getMonth()));
  };

  return { currentMonth, goToMonth, resetToInitialMonth };
};

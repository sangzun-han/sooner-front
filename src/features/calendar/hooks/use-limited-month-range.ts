import { useState } from "react";

/**
 * 월 단위로 현재 캘린더 상태를 관리하며,
 * 지정된 최소/최대 범위 내에서만 월 변경을 허용합니다.
 *
 * @param minDate 월 이동의 최소 날짜 (시작일)
 * @param maxDate 월 이동의 최대 날짜 (종료일)
 * @returns
 *  - currentMonth: 현재 표시 중인 월의 첫날
 *  - goToMonth: 범위 내에서만 월을 변경하는 함수
 */

export const useLimitedMonthRange = (minDate: Date, maxDate: Date) => {
  const initialMonth = new Date(minDate.getFullYear(), minDate.getMonth());
  const [currentMonth, setCurrentMonth] = useState(initialMonth);

  const goToMonth = (newMonth: Date) => {
    const min = new Date(minDate.getFullYear(), minDate.getMonth());
    const max = new Date(maxDate.getFullYear(), maxDate.getMonth());

    if (newMonth >= min && newMonth <= max) {
      setCurrentMonth(newMonth);
    }
  };

  return { currentMonth, goToMonth };
};

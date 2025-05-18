import { useMemo } from "react";

/**
 * 오늘을 기준으로 약속 가능한 날짜 범위를 반환합니다.
 *
 * @param period 사용자가 선택할 수 있는 총 일수 (오늘 포함)
 * @returns
 *  - startDate: 오늘 날짜 (00:00:00 정규화됨)
 *  - endDate: 기간의 마지막 날짜
 *  - startTimestamp: 시작일의 timestamp (ms)
 *  - endTimestamp: 종료일의 timestamp (ms)
 */
export const useSelectableDateRange = (period: number) => {
  const startDate = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0); // 정규화
    return date;
  }, []);

  const endDate = useMemo(() => {
    const result = new Date(startDate);
    result.setDate(result.getDate() + period - 1);
    return result;
  }, [startDate, period]);

  const startTimestamp = startDate.getTime();
  const endTimestamp = endDate.getTime();

  return { startDate, endDate, startTimestamp, endTimestamp };
};

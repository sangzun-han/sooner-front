/**
 * 사용자가 클릭한 날짜를 기준으로 선택된 날짜 배열을 업데이트합니다.
 *
 * 이미 선택된 날짜인 경우 해당 날짜를 제거하고, 선택되지 않은 경우 추가합니다.
 * 이 함수는 불변성을 유지하며 새로운 배열을 반환합니다.
 *
 * @param selectedDates - 현재 선택된 날짜들의 타임스탬프 배열 (밀리초 단위)
 * @param target - 선택 혹은 해제할 대상 날짜 객체
 * @returns 업데이트된 날짜들의 타임스탬프 배열
 *
 * @example
 * const dates = [1714992000000]; // 예: 2025-05-06
 * const next = getUpdatedSelectedDates(dates, new Date("2025-05-07"));
 * // 결과: [1714992000000, 1715078400000]
 */
export const getUpdatedSelectedDates = (selectedDates: number[], target: Date): number[] => {
  const timestamp = target.getTime();
  const exists = selectedDates.includes(timestamp);

  return exists ? selectedDates.filter((d) => d !== timestamp) : [...selectedDates, timestamp];
};

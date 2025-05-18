import { useEffect, useState } from "react";

/**
 * localStorage에 상태를 저장하고 불러오는 커스텀 훅
 *
 * @param key localStorage에 저장할 키
 * @param initialValue 초기값
 * @returns
 *  - value: 현재 상태값
 *  - setValue: 상태를 업데이트하는 함수
 *  - resetValue: 상태를 초기값으로 리셋하는 함수
 */

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const getInitialValue = (): T => {
    const item = localStorage.getItem(key);
    if (!item) return initialValue;

    try {
      // ✅ JSON 파싱이 가능하면 파싱, 아니면 그냥 문자열
      return JSON.parse(item);
    } catch {
      return item as T;
    }
  };

  const [value, setValue] = useState<T>(getInitialValue);

  useEffect(() => {
    if (typeof value === "string") {
      localStorage.setItem(key, value);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  const resetValue = () => {
    localStorage.removeItem(key);
    setValue(initialValue);
  };

  return { value, setValue, resetValue };
};

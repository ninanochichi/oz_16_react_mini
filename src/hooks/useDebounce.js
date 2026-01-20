import { useState, useEffect } from "react";

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    /* 타이머 */
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    /* 재실행 */
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

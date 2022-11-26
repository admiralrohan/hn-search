import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, debounceDelay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timerID = setTimeout(() => {
      setDebouncedValue(value);
    }, debounceDelay);

    return () => clearTimeout(timerID);
  }, [debounceDelay, value]);

  return debouncedValue;
}

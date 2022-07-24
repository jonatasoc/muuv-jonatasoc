import { useState, useEffect, Dispatch, SetStateAction } from "react";

function getLocalStorageOrDefault(key: string, defaultValue: any) {
  if (typeof window === "undefined") {
    return defaultValue;
  }

  const stored = localStorage.getItem(key);
  if (!stored) {
    return defaultValue;
  }

  return JSON.parse(stored);
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T) | null
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(
    getLocalStorageOrDefault(key, initialValue)
  );

  useEffect(() => {
    if (value === initialValue) {
      return;
    }

    localStorage.setItem(
      key,
      JSON.stringify(typeof value !== "undefined" ? value : null)
    );
  }, [key, value, initialValue]);

  return [value, setValue];
}

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * SSR-safe localStorage hook.
 * Returns the stored value, a setter (value or updater), and a `hydrated` flag
 * that is false until the value has been read from the browser.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);
  const keyRef = useRef(key);
  keyRef.current = key;

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) setValue(JSON.parse(raw) as T);
    } catch {
      console.warn(`Failed to read localStorage key "${key}"`);
    }
    setHydrated(true);
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(keyRef.current, JSON.stringify(value));
    } catch {
      console.warn(`Failed to write localStorage key "${keyRef.current}"`);
    }
  }, [value, hydrated]);

  const set = useCallback((next: T | ((prev: T) => T)) => {
    setValue((prev) => (typeof next === "function" ? (next as (p: T) => T)(prev) : next));
  }, []);

  return [value, set, hydrated] as const;
}

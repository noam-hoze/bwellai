import { useState, useEffect } from "react";

/**
 * useDebounce
 * Delays updating a value until after a delay (in ms) has passed.
 *
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced value
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(handler); // Clear timeout if value changes
  }, [value, delay]);

  return debouncedValue;
}

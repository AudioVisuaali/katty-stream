import { useEffect, useState, useCallback } from 'react';

// Define a type for the dimensions of the window
type WindowSize = {
  width: number;
  height: number;
};

// Debounce function
function debounce(fn: (...args: any[]) => void, delay: number) {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: any[]) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...args);
      timeout = null;
    }, delay);
  };
}

// Create the custom hook
export function useWindowResize(debounceTime: number = 250): WindowSize {
  // Check if window object is available
  const isClient = typeof window === 'object';

  // Initial state
  const initialWindowSize: WindowSize = {
    width: isClient ? window.innerWidth : 0,
    height: isClient ? window.innerHeight : 0,
  };

  const [windowSize, setWindowSize] = useState<WindowSize>(initialWindowSize);

  const resizeHandler = useCallback(() => {
    if (isClient) {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
  }, [isClient]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedResizeHandler = useCallback(
    debounce(resizeHandler, debounceTime),
    [debounceTime, resizeHandler]
  );

  useEffect(() => {
    if (isClient) {
      // Add the event listener
      window.addEventListener('resize', debouncedResizeHandler);

      // Clean up the event listener when the component is unmounted
      return () => {
        window.removeEventListener('resize', debouncedResizeHandler);
      };
    }
  }, [isClient, debouncedResizeHandler]);

  return windowSize;
}

import {DebouncedFunction} from "../types";
import { debounce } from '../utils'
import {useCallback, useEffect, useRef} from "react";

export const useDebounce = <T extends (...args: any[]) => unknown>(callback: T, delay?: number) => {
  const createDebouncedCallback = useCallback(
    (function_: T): DebouncedFunction<T> => {
      return debounce(function_, delay);
    },
    [delay]
  );

  const debouncedCallbackRef = useRef<DebouncedFunction<T>>(createDebouncedCallback(callback));

  useEffect(() => {
    debouncedCallbackRef.current = createDebouncedCallback(callback);
  }, [callback, createDebouncedCallback]);

  return debouncedCallbackRef.current;
};

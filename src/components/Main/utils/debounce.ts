import {DebouncedFunction} from "../types";

export const debounce = <T extends (...args: any[]) => unknown>(
  callback: T,
  delay?: number
): DebouncedFunction<T> => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
};

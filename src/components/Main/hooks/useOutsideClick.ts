import type { MutableRefObject } from 'react';
import { useEffect, useRef, useCallback } from 'react';

export const useOutsideClick = (
  ref: MutableRefObject<HTMLElement | null>,
  handler: (event: MouseEvent) => any,
  when = true
) => {
  const savedHandler = useRef(handler);

  const memoizedCallback = useCallback((event: MouseEvent) => {
    if (ref && ref.current && !ref.current.contains(event.target as Element)) {
      savedHandler.current(event);
    }
  }, [ref]);

  useEffect(() => {
    savedHandler.current = handler;
  });

  useEffect(() => {
    if (when) {
      document.addEventListener('click', memoizedCallback, true);

      return () => {
        document.removeEventListener('click', memoizedCallback, true);
      };
    }
    return;
  }, [ref, handler, when, memoizedCallback]);
};

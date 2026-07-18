import { useEffect, RefObject } from 'react';

export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  handler: () => void,
  event: 'mousedown' | 'click' = 'mousedown',
) {
  useEffect(() => {
    function listener(e: MouseEvent) {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      handler();
    }
    document.addEventListener(event, listener);
    return () => document.removeEventListener(event, listener);
  }, [ref, handler, event]);
}

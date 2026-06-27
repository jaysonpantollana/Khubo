import { useRef, useEffect, useCallback } from 'react';

export function useFocusReturn() {
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const saveFocus = useCallback(() => {
    previousActiveElement.current = document.activeElement as HTMLElement;
  }, []);

  const restoreFocus = useCallback(() => {
    if (previousActiveElement.current && typeof previousActiveElement.current.focus === 'function') {
      previousActiveElement.current.focus();
    }
    previousActiveElement.current = null;
  }, []);

  return { saveFocus, restoreFocus };
}

export function useFocusTrap(
  isActive: boolean,
  containerRef: React.RefObject<HTMLElement | null>,
  onEscape?: () => void
) {
  const { saveFocus, restoreFocus } = useFocusReturn();

  useEffect(() => {
    if (!isActive) return;

    saveFocus();

    const container = containerRef.current;
    if (!container) return;

    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    firstElement?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
      if (e.key === 'Escape' && onEscape) {
        onEscape();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      restoreFocus();
    };
  }, [isActive, containerRef, onEscape, saveFocus, restoreFocus]);

  return { saveFocus, restoreFocus };
}
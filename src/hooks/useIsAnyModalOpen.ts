import { useState, useEffect } from 'react';

export function useIsAnyModalOpen(): boolean {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const check = () => {
      const hasModal = !!(
        document.querySelector('[role="dialog"]') ||
        document.querySelector('.fixed.inset-0.z-50') ||
        document.querySelector('.fixed.inset-0.z-modal-backdrop')
      );
      setIsOpen(hasModal);
    };

    check();

    const observer = new MutationObserver(check);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return isOpen;
}

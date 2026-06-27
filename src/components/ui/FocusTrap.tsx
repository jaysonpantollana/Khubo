import { useRef } from 'react';
import { useFocusTrap } from '../../hooks/useFocusTrap';

interface FocusTrapProps {
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
  ariaLabel?: string;
}

export function FocusTrap({ children, onClose, className = '', ariaLabel = 'Dialog' }: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(true, containerRef, onClose);

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </div>
  );
}

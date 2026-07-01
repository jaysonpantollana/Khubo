import { useRef, MouseEvent } from 'react';
import { useFocusTrap } from '../../hooks/useFocusTrap';

interface FocusTrapProps {
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
  ariaLabel?: string;
  onClick?: (e: MouseEvent) => void;
}

export function FocusTrap({ children, onClose, className = '', ariaLabel = 'Dialog', onClick }: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(true, containerRef, onClose);

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      className={className}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

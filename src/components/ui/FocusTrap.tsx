import { useFocusTrap } from '../../hooks/useFocusTrap';

interface FocusTrapProps {
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
  ariaLabel?: string;
}

export function FocusTrap({ children, onClose, className = '', ariaLabel = 'Dialog' }: FocusTrapProps) {
  const ref = useFocusTrap(true);

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      className={className}
      onKeyDown={(e) => {
        if (e.key === 'Escape' && onClose) {
          onClose();
        }
      }}
    >
      {children}
    </div>
  );
}

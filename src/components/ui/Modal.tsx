import { ReactNode, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useFocusTrap } from '../../hooks/useFocusTrap';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  maxWidth?: string;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  bodyClassName?: string;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  hideTitle?: boolean;
  portal?: boolean;
}

const sizeStyles = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-full mx-4',
};

export function Modal({
  isOpen,
  onClose,
  children,
  title,
  description,
  size = 'md',
  maxWidth,
  className = '',
  overlayClassName = '',
  contentClassName = '',
  bodyClassName = '',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  hideTitle = false,
  portal = true,
}: ModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useFocusTrap(isOpen, contentRef, closeOnEscape ? onClose : undefined);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  }, [closeOnOverlayClick, onClose]);

  const handleContentClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  if (!isOpen) return null;

  const modalContent = (
      <div
        className={cn(
          'fixed inset-0 flex items-center justify-center p-4',
          'bg-black/60 backdrop-blur-sm transition-opacity duration-200',
          overlayClassName
        )}
        style={{ zIndex: 300 }}
        onClick={handleOverlayClick}
        role="presentation"
      >
      <div
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title && !hideTitle ? `${title.replace(/\s+/g, '-').toLowerCase()}-title` : undefined}
        aria-describedby={description && title ? `${title.replace(/\s+/g, '-').toLowerCase()}-description` : undefined}
        onClick={handleContentClick}
        style={{ zIndex: 301 }}
        className={cn(
          'relative w-full bg-white rounded-modal shadow-modal',
          'transform transition-all duration-200',
          'animate-in fade-in-0 zoom-in-95',
          sizeStyles[size],
          maxWidth,
          contentClassName,
          className
        )}
      >
        {(title || showCloseButton) && (
          <div className="flex items-start justify-between p-6 border-b border-neutral-100">
            <div className="flex-1 pr-4">
              {title && !hideTitle && (
                <h2
                  id={`${title.replace(/\s+/g, '-').toLowerCase()}-title`}
                  className="text-xl font-bold text-neutral-900"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p
                  id={`${title?.replace(/\s+/g, '-').toLowerCase()}-description`}
                  className="mt-1 text-sm text-neutral-500"
                >
                  {description}
                </p>
              )}
            </div>
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="flex-shrink-0 p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-400 hover:text-neutral-600"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}
        <div className={cn("p-6 max-h-[calc(100vh-200px)] overflow-y-auto", bodyClassName)}>
          {children}
        </div>
      </div>
    </div>
  );

  return portal ? createPortal(modalContent, document.body) : modalContent;
}

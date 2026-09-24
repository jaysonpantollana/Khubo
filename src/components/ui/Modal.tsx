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

  // iOS Safari: overflow:hidden alone doesn't stop background rubber-band;
  // pin body with position:fixed and restore scroll position on close.
  useEffect(() => {
    if (!isOpen) return;
    const scrollY = window.scrollY;
    const body = document.body;
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.overflow = 'hidden';
    return () => {
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.overflow = '';
      window.scrollTo(0, scrollY);
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
          'fixed inset-0 flex items-center justify-center p-0 sm:p-4',
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
          // Mobile: full-screen sheet; sm+: centered card
          'relative w-full bg-white shadow-modal',
          'sm:rounded-modal sm:shadow-modal sm:max-h-[calc(100dvh-3rem)]',
          'h-[100dvh] sm:h-auto rounded-none sm:rounded-modal',
          'sm:w-auto sm:max-w-full',
          'transform transition-all duration-200',
          'flex flex-col overflow-hidden',
          sizeStyles[size],
          maxWidth,
          contentClassName,
          className
        )}
      >
        {(title || showCloseButton) && (
          <div className="flex items-start justify-between p-4 sm:p-6 border-b border-neutral-100 shrink-0">
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
                className="flex-shrink-0 p-2 min-h-11 min-w-11 flex items-center justify-center bg-neutral-100 rounded-full transition-colors text-neutral-400 hover:text-neutral-600"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}
        <div className={cn("p-4 sm:p-6 flex-1 overflow-y-auto", bodyClassName)}>
          {children}
        </div>
      </div>
    </div>
  );

  return portal ? createPortal(modalContent, document.body) : modalContent;
}

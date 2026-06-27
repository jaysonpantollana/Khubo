import { forwardRef, ReactNode, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useFocusReturn } from '../../hooks/useFocusTrap';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  hideTitle?: boolean;
  portal?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

const sizeStyles = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-full mx-4',
};

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      children,
      title,
      description,
      size = 'md',
      className = '',
      overlayClassName = '',
      contentClassName = '',
      closeOnOverlayClick = true,
      closeOnEscape = true,
      showCloseButton = true,
      hideTitle = false,
      portal = true,
      onOpenChange,
    },
    _ref
  ) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const { saveFocus, restoreFocus } = useFocusReturn();

    useFocusTrap(isOpen, contentRef, closeOnEscape ? onClose : undefined);

    useEffect(() => {
      if (isOpen) {
        saveFocus();
        document.body.style.overflow = 'hidden';
        onOpenChange?.(true);
      } else {
        restoreFocus();
        document.body.style.overflow = '';
        onOpenChange?.(false);
      }
      return () => {
        document.body.style.overflow = '';
      };
    }, [isOpen, saveFocus, restoreFocus, onOpenChange]);

    const handleOverlayClick = useCallback((e: React.MouseEvent) => {
      if (e.target === e.currentTarget && closeOnOverlayClick) {
        onClose();
      }
    }, [closeOnOverlayClick, onClose]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape) {
        onClose();
      }
    }, [closeOnEscape, onClose]);

    if (!isOpen) return null;

    const modalContent = (
      <div
        className={cn(
          'fixed inset-0 z-modal-backdrop flex items-center justify-center p-4',
          'bg-black/60 backdrop-blur-sm transition-opacity duration-200',
          overlayClassName
        )}
        onClick={handleOverlayClick}
        onKeyDown={handleKeyDown}
        role="presentation"
      >
        <div
          ref={contentRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title && !hideTitle ? `${title.replace(/\s+/g, '-').toLowerCase()}-title` : undefined}
          aria-describedby={description && title ? `${title.replace(/\s+/g, '-').toLowerCase()}-description` : undefined}
          className={cn(
            'relative w-full bg-white rounded-modal shadow-modal',
            'transform transition-all duration-200',
            'animate-in fade-in-0 zoom-in-95',
            sizeStyles[size],
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
                  className="flex-shrink-0 p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-400 hover:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-accent/40"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          )}
          <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    );

    return portal ? createPortal(modalContent, document.body) : modalContent;
  }
);

Modal.displayName = 'Modal';

export interface ModalFooterProps {
  children: ReactNode;
  className?: string;
}

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ children, className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-end gap-3 p-6 border-t border-neutral-100 bg-neutral-50/50 rounded-b-modal',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

ModalFooter.displayName = 'ModalFooter';

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'primary' | 'warning';
  isLoading?: boolean;
  showCancel?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'primary',
  isLoading = false,
  showCancel = true,
}: ConfirmModalProps) {
  const variantStyles = {
    danger: 'bg-semantic-error hover:bg-semantic-error-hover',
    primary: 'bg-primary hover:bg-primary-hover',
    warning: 'bg-semantic-warning hover:bg-semantic-warning-hover',
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      showCloseButton={showCancel}
    >
      <p className="text-neutral-600 mb-6">{message}</p>
      <ModalFooter>
        {showCancel && (
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2.5 text-sm font-semibold text-neutral-700 bg-white border border-neutral-300 rounded-button hover:bg-neutral-50 transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>
        )}
        <button
          type="button"
          onClick={onConfirm}
          disabled={isLoading}
          className={cn(
            'px-4 py-2.5 text-sm font-semibold text-white rounded-button transition-colors disabled:opacity-50',
            variantStyles[variant]
          )}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Confirming...
            </span>
          ) : (
            confirmText
          )}
        </button>
      </ModalFooter>
    </Modal>
  );
}

export interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  confirmText?: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
}

export function AlertModal({
  isOpen,
  onClose,
  title,
  message,
  confirmText = 'OK',
  variant = 'info',
}: AlertModalProps) {
  const variantIcons = {
    info: (
      <svg className="w-6 h-6 text-info" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    ),
    success: (
      <svg className="w-6 h-6 text-semantic-success" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    warning: (
      <svg className="w-6 h-6 text-semantic-warning" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
    error: (
      <svg className="w-6 h-6 text-semantic-error" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    ),
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      showCloseButton={false}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-0.5">{variantIcons[variant]}</div>
        <p className="text-neutral-600 flex-1">{message}</p>
      </div>
      <ModalFooter>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary-hover rounded-button w-full"
        >
          {confirmText}
        </button>
      </ModalFooter>
    </Modal>
  );
}

import { useRef } from 'react';
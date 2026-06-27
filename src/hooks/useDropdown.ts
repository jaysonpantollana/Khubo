import { useState, useRef, useCallback, useEffect } from 'react';
import { useClickOutside } from './useClickOutside';

export type DropdownPosition = 'bottom' | 'top' | 'left' | 'right';
export type DropdownAlign = 'start' | 'center' | 'end';

export interface UseDropdownOptions {
  position?: DropdownPosition;
  align?: DropdownAlign;
  offset?: number;
  closeOnEscape?: boolean;
  closeOnClickOutside?: boolean;
  closeOnScroll?: boolean;
  disabled?: boolean;
}

export interface UseDropdownReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  getTriggerProps: () => {
    'aria-expanded': boolean;
    'aria-haspopup': 'dialog' | 'listbox' | 'menu' | 'grid';
    'aria-controls': string | undefined;
    onKeyDown: (e: React.KeyboardEvent) => void;
    onClick: () => void;
  };
  getDropdownProps: () => {
    id: string;
    role: 'dialog' | 'listbox' | 'menu' | 'grid';
    'aria-orientation'?: 'vertical' | 'horizontal';
  };
}

export function useDropdown(options: UseDropdownOptions = {}): UseDropdownReturn {
  const {
    closeOnEscape = true,
    closeOnClickOutside = true,
    closeOnScroll = true,
    disabled = false,
  } = options;

  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownId = useRef(`dropdown-${Math.random().toString(36).slice(2)}`);

  const open = useCallback(() => {
    if (!disabled) setIsOpen(true);
  }, [disabled]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    if (!disabled) setIsOpen(prev => !prev);
  }, [disabled]);

  useClickOutside(
    dropdownRef,
    () => close(),
    isOpen && closeOnClickOutside
  );

  useEffect(() => {
    if (!isOpen || !closeOnScroll) return;
    const handleScroll = () => close();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen, closeOnScroll, close]);

  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEscape, close]);

  const getTriggerProps = useCallback(() => ({
    'aria-expanded': isOpen,
    'aria-haspopup': 'dialog' as const,
    'aria-controls': isOpen ? dropdownId.current : undefined,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
      if (e.key === 'Escape') close();
    },
    onClick: toggle,
  }), [isOpen, toggle, close]);

  const getDropdownProps = useCallback(() => ({
    id: dropdownId.current,
    role: 'dialog' as const,
  }), []);

  return {
    isOpen,
    open,
    close,
    toggle,
    triggerRef,
    dropdownRef,
    getTriggerProps,
    getDropdownProps,
  };
}
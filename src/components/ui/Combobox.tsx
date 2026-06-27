import { useState, useRef, useEffect, useCallback, useMemo, KeyboardEvent, ChangeEvent, ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { X, ChevronDown, Search } from 'lucide-react';

export interface ComboboxOption<T = string> {
  value: T;
  label: string;
  disabled?: boolean;
  description?: string;
  icon?: ReactNode;
  group?: string;
}

export interface ComboboxProps<T = string> {
  value: T | T[] | null;
  onChange: (value: T | T[]) => void;
  options: ComboboxOption<T>[];
  placeholder?: string;
  label?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  maxHeight?: number;
  id?: string;
  name?: string;
  required?: boolean;
  'aria-label'?: string;
  'aria-describedby'?: string;
  className?: string;
  inputClassName?: string;
  dropdownClassName?: string;
  optionClassName?: string;
  groupClassName?: string;
  renderOption?: (option: ComboboxOption<T>, isSelected: boolean, isHighlighted: boolean) => ReactNode;
  renderValue?: (option: ComboboxOption<T>) => ReactNode;
  onOpenChange?: (isOpen: boolean) => void;
  portal?: boolean;
}

interface ComboboxState<T> {
  isOpen: boolean;
  highlightedIndex: number;
  searchQuery: string;
  inputValue: string;
}

export function Combobox<T = string>({
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  label,
  error,
  hint,
  disabled = false,
  multiple = false,
  searchable = false,
  clearable = !multiple,
  maxHeight = 280,
  id,
  name,
  required = false,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  className = '',
  inputClassName = '',
  dropdownClassName = '',
  optionClassName = '',
  groupClassName = '',
  renderOption,
  renderValue,
  onOpenChange,
  portal = false,
}: ComboboxProps<T>) {
  const comboboxId = id || `combobox-${Math.random().toString(36).slice(2, 9)}`;
  const inputId = `${comboboxId}-input`;
  const listboxId = `${comboboxId}-listbox`;
  const errorId = error ? `${comboboxId}-error` : undefined;
  const hintId = hint ? `${comboboxId}-hint` : undefined;
  const describedBy = [errorId, hintId, ariaDescribedBy].filter(Boolean).join(' ') || undefined;

  const [state, setState] = useState<ComboboxState<T>>({
    isOpen: false,
    highlightedIndex: -1,
    searchQuery: '',
    inputValue: '',
  });

  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const selectedOptions = useMemo(() => {
    if (!value) return [];
    const values = multiple ? (value as T[]) : [value];
    return values.map(v => options.find(o => o.value === v)).filter(Boolean) as ComboboxOption<T>[];
  }, [value, options, multiple]);

  const filteredOptions = useMemo(() => {
    if (!state.searchQuery) return options;
    const query = state.searchQuery.toLowerCase();
    return options.filter(opt =>
      opt.label.toLowerCase().includes(query) ||
      opt.value.toString().toLowerCase().includes(query) ||
      opt.description?.toLowerCase().includes(query)
    );
  }, [options, state.searchQuery]);

  const groupedOptions = useMemo(() => {
    const groups: Record<string, ComboboxOption<T>[]> = {};
    filteredOptions.forEach(opt => {
      const group = opt.group || 'ungrouped';
      if (!groups[group]) groups[group] = [];
      groups[group].push(opt);
    });
    return groups;
  }, [filteredOptions]);

  const open = useCallback(() => {
    if (disabled) return;
    previousActiveElement.current = document.activeElement as HTMLElement;
    setState(prev => ({ ...prev, isOpen: true, highlightedIndex: -1, searchQuery: '' }));
    onOpenChange?.(true);
  }, [disabled, onOpenChange]);

  const close = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: false, highlightedIndex: -1, searchQuery: '' }));
    onOpenChange?.(false);
    triggerRef.current?.focus();
  }, [onOpenChange]);

  const toggle = useCallback(() => {
    if (state.isOpen) close(); else open();
  }, [state.isOpen, open, close]);

  useClickOutside(
    listboxRef,
    () => close(),
    state.isOpen
  );

  useFocusTrap(state.isOpen, listboxRef, close);

  useEffect(() => {
    if (!state.isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const visibleOptions = getVisibleOptions();
      if (visibleOptions.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setState(prev => ({
            ...prev,
            highlightedIndex: Math.min(prev.highlightedIndex + 1, visibleOptions.length - 1),
          }));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setState(prev => ({
            ...prev,
            highlightedIndex: Math.max(prev.highlightedIndex - 1, -1),
          }));
          break;
        case 'Enter':
          e.preventDefault();
          if (state.highlightedIndex >= 0) {
            selectOption(visibleOptions[state.highlightedIndex]);
          }
          break;
        case 'Escape':
          close();
          break;
        case 'Tab':
          close();
          break;
        case 'Home':
          e.preventDefault();
          setState(prev => ({ ...prev, highlightedIndex: 0 }));
          break;
        case 'End':
          e.preventDefault();
          setState(prev => ({ ...prev, highlightedIndex: visibleOptions.length - 1 }));
          break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [state.isOpen, state.highlightedIndex, close]);

  useEffect(() => {
    if (state.isOpen && state.highlightedIndex >= 0) {
      const optionEl = optionsRef.current?.querySelector(`[data-index="${state.highlightedIndex}"]`);
      optionEl?.scrollIntoView({ block: 'nearest' });
    }
  }, [state.highlightedIndex, state.isOpen]);

  useEffect(() => {
    if (state.isOpen && searchable) {
      setTimeout(() => searchInputRef.current?.focus(), 0);
    }
  }, [state.isOpen, searchable]);

  const getVisibleOptions = useCallback(() => {
    const visible: ComboboxOption<T>[] = [];
    Object.values(groupedOptions).forEach(group => {
      group.forEach((opt, idx) => {
        if (!opt.disabled) visible.push(opt);
      });
    });
    return visible;
  }, [groupedOptions]);

  const selectOption = useCallback((option: ComboboxOption<T>) => {
    if (option.disabled) return;

    if (multiple) {
      const currentValues = (value as T[]) || [];
      const isSelected = currentValues.some(v => v === option.value);
      const newValues = isSelected
        ? currentValues.filter(v => v !== option.value)
        : [...currentValues, option.value];
      onChange(newValues);
    } else {
      onChange(option.value);
      close();
    }

    if (searchable) {
      setState(prev => ({ ...prev, searchQuery: '' }));
    }
  }, [value, multiple, onChange, close, searchable]);

  const removeValue = useCallback((valueToRemove: T) => {
    if (multiple) {
      const currentValues = (value as T[]) || [];
      onChange(currentValues.filter(v => v !== valueToRemove));
    } else {
      onChange(null);
    }
  }, [value, multiple, onChange]);

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({ ...prev, searchQuery: e.target.value, highlightedIndex: -1 }));
  }, []);

  const handleInputClick = useCallback(() => {
    if (!state.isOpen) open();
  }, [state.isOpen, open]);

  const handleTriggerKeyDown = useCallback((e: KeyboardEvent<HTMLButtonElement>) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        toggle();
        break;
      case 'ArrowDown':
        e.preventDefault();
        open();
        break;
      case 'Escape':
        close();
        break;
    }
  }, [toggle, open, close]);

  const displayValue = multiple
    ? selectedOptions.map(opt => renderValue ? renderValue(opt) : opt.label).join(', ')
    : selectedOptions[0]
      ? renderValue
        ? renderValue(selectedOptions[0])
        : selectedOptions[0].label
      : '';

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-neutral-700 mb-1.5"
        >
          {label}
          {required && <span className="text-semantic-error ml-1" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="relative">
        <button
          ref={triggerRef}
          type="button"
          id={inputId}
          onClick={handleInputClick}
          onKeyDown={handleTriggerKeyDown}
          className={cn(
            'w-full bg-white border rounded-input transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            'disabled:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-70',
            'min-h-touch',
            'px-4 py-3 text-base text-left',
            'flex items-center justify-between',
            error
              ? 'border-semantic-error focus:ring-semantic-error/40 focus:border-semantic-error'
              : 'border-neutral-300 focus:ring-accent/40 focus:border-accent hover:border-neutral-400',
            inputClassName
          )}
          aria-haspopup="listbox"
          aria-expanded={state.isOpen}
          aria-controls={listboxId}
          aria-labelledby={label ? `${comboboxId}-label` : undefined}
          aria-describedby={describedBy}
          aria-invalid={error ? 'true' : 'false'}
          aria-required={required}
          disabled={disabled}
        >
          {multiple && selectedOptions.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
              {selectedOptions.map((opt, idx) => (
                <span
                  key={opt.value.toString()}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {opt.icon && <span>{opt.icon}</span>}
                  <span className="truncate max-w-[150px]">{opt.label}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeValue(opt.value);
                    }}
                    className="p-0.5 hover:bg-primary/20 rounded-full text-primary/70 hover:text-primary transition-colors"
                    aria-label={`Remove ${opt.label}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          ) : displayValue ? (
            <span className="text-neutral-900 truncate">{displayValue}</span>
          ) : (
            <span className="text-neutral-400 truncate">{placeholder}</span>
          )}
          {clearable && !multiple && displayValue && !disabled && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
                close();
              }}
              className="p-1 hover:bg-neutral-100 rounded-full text-neutral-400 hover:text-neutral-600 transition-colors ml-2 flex-shrink-0"
              aria-label="Clear selection"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <ChevronDown
            className={cn(
              'w-5 h-5 text-neutral-400 flex-shrink-0 ml-2 transition-transform duration-200',
              state.isOpen && 'rotate-180'
            )}
            aria-hidden="true"
          />
        </button>

        {state.isOpen && (
          <div
            ref={listboxRef}
            id={listboxId}
            role="listbox"
            aria-multiselectable={multiple}
            aria-label={ariaLabel}
            className={cn(
              'absolute z-dropdown w-full mt-1.5 bg-white border rounded-dropdown shadow-dropdown',
              'max-h-[280px] overflow-y-auto',
              dropdownClassName
            )}
            style={{ maxHeight: `${maxHeight}px` }}
          >
            {searchable && (
              <div className="p-2 border-b border-neutral-100 sticky top-0 bg-white z-10">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" aria-hidden="true" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={state.searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search options..."
                    className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-input text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
                    aria-label="Search options"
                    aria-controls={listboxId}
                  />
                </div>
              </div>
            )}

            <div ref={optionsRef} className="py-1" role="presentation">
              {Object.entries(groupedOptions).map(([groupName, groupOptions]) => (
                <div key={groupName} className={cn(groupClassName)}>
                  {groupName !== 'ungrouped' && (
                    <div className="px-3 py-2 text-xs font-bold text-neutral-500 uppercase tracking-wider text-neutral-400 border-b border-neutral-100">
                      {groupName}
                    </div>
                  )}
                  {groupOptions.map((option, groupIndex) => {
                    const globalIndex = filteredOptions.indexOf(option);
                    const isSelected = multiple
                      ? (value as T[])?.some(v => v === option.value)
                      : value === option.value;
                    const isHighlighted = state.highlightedIndex === globalIndex;

                    return (
                      <div
                        key={option.value.toString()}
                        role="option"
                        aria-selected={isSelected}
                        aria-disabled={option.disabled}
                        data-index={globalIndex}
                        className={cn(
                          'px-3 py-2.5 cursor-pointer transition-colors',
                          'hover:bg-neutral-50',
                          'focus:bg-neutral-50',
                          isSelected && 'bg-primary/5 text-primary',
                          isHighlighted && !isSelected && 'bg-neutral-50',
                          option.disabled && 'opacity-50 cursor-not-allowed',
                          optionClassName
                        )}
                        onClick={() => !option.disabled && selectOption(option)}
                        onMouseEnter={() => !option.disabled && setState(prev => ({ ...prev, highlightedIndex: globalIndex }))}
                      >
                        {renderOption ? (
                          renderOption(option, isSelected, isHighlighted)
                        ) : (
                          <div className="flex items-center gap-3">
                            {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
                            <div className="flex-1 min-w-0">
                              <span className={cn('font-medium truncate block', isSelected ? 'text-primary' : 'text-neutral-900')}>
                                {option.label}
                              </span>
                              {option.description && (
                                <span className="text-sm text-neutral-500 truncate block mt-0.5">
                                  {option.description}
                                </span>
                              )}
                            </div>
                            {isSelected && (
                              <svg
                                className="w-5 h-5 text-primary flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                              >
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}

              {filteredOptions.length === 0 && (
                <div className="px-3 py-6 text-center text-neutral-500 text-sm">
                  {state.searchQuery ? 'No options match your search' : 'No options available'}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-semantic-error flex items-center gap-1" role="alert">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-sm text-neutral-500">
          {hint}
        </p>
      )}

      {name && (
        <input
          type="hidden"
          name={name}
          value={multiple ? (value as T[])?.join(',') || '' : (value as string) || ''}
        />
      )}
    </div>
  );
}

export interface MultiSelectProps<T = string> extends Omit<ComboboxProps<T>, 'multiple'> {
  multiple?: true;
}

export const MultiSelect = <T = string>({
  multiple = true,
  ...props
}: MultiSelectProps<T>) => <Combobox<T> multiple={multiple} {...props} />;

export interface SingleSelectProps<T = string> extends Omit<ComboboxProps<T>, 'multiple'> {
  multiple?: false;
}

export const SingleSelect = <T = string>({
  multiple = false,
  ...props
}: SingleSelectProps<T>) => <Combobox<T> multiple={multiple} {...props} />;
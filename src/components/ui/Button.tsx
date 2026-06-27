import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'success';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center font-bold transition-all duration-200
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      active:scale-[0.98]
      min-h-touch min-w-touch
    `;

    const variantStyles = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary-hover shadow-card focus-visible:ring-primary',
      secondary: 'bg-khubo-surface text-neutral-900 hover:bg-khubo-surface-hover border border-khubo-border shadow-sm focus-visible:ring-neutral-400',
      outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary/5 focus-visible:ring-primary',
      ghost: 'bg-transparent text-primary hover:bg-primary/5 focus-visible:ring-primary',
      destructive: 'bg-semantic-error text-white hover:bg-semantic-error-hover shadow-card focus-visible:ring-semantic-error',
      success: 'bg-semantic-success text-white hover:bg-semantic-success-hover shadow-card focus-visible:ring-semantic-success',
    };

    const sizeStyles = {
      xs: 'px-2.5 py-1.5 text-xs rounded-button gap-1',
      sm: 'px-3 py-2 text-sm rounded-button gap-1.5',
      md: 'px-4 py-2.5 text-base rounded-button gap-2',
      lg: 'px-6 py-3 text-lg rounded-lg gap-2',
      xl: 'px-8 py-4 text-xl rounded-xl gap-2.5',
      icon: 'p-2.5 rounded-full',
    };

    const widthStyles = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], widthStyles, className)}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <>
            {leftIcon && !isLoading && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && !isLoading && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
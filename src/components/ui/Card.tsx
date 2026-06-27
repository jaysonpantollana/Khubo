import { forwardRef, ReactNode, HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated' | 'ghost';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  asChild?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      padding = 'md',
      hoverable = false,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      default: 'bg-white border border-neutral-200 shadow-card',
      outlined: 'bg-white border-2 border-neutral-200',
      elevated: 'bg-white border border-neutral-100 shadow-card-hover',
      ghost: 'bg-transparent border-none shadow-none',
    };

    const paddingStyles = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    const hoverStyles = hoverable
      ? 'transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 hover:border-neutral-300 cursor-pointer'
      : '';

    const Component = asChild ? 'div' : 'div';

    return (
      <Component
        ref={ref}
        className={cn(
          'rounded-card',
          variantStyles[variant],
          paddingStyles[padding],
          hoverStyles,
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  avatar?: ReactNode;
  avatarLabel?: string;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, title, subtitle, action, avatar, avatarLabel, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-start justify-between gap-4 mb-4', className)}
      {...props}
    >
      <div className="flex items-start gap-3 flex-1 min-w-0">
        {avatar && (
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              {avatar}
            </div>
            {avatarLabel && <span className="sr-only">{avatarLabel}</span>}
          </div>
        )}
        <div className="min-w-0">
          {title && (
            <h3 className="text-lg font-bold text-neutral-900 truncate">{title}</h3>
          )}
          {subtitle && (
            <p className="mt-0.5 text-sm text-neutral-500 truncate">{subtitle}</p>
          )}
          {children && !title && !subtitle && <div>{children}</div>}
        </div>
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props}>
      {children}
    </div>
  )
);

CardContent.displayName = 'CardContent';

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  divided?: boolean;
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, divided = true, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-end gap-3 pt-4',
        divided && 'border-t border-neutral-100',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

CardFooter.displayName = 'CardFooter';

export interface CardMediaProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  aspectRatio?: 'square' | 'video' | 'photo' | 'wide';
  fit?: 'cover' | 'contain' | 'fill';
}

export const CardMedia = forwardRef<HTMLDivElement, CardMediaProps>(
  ({ className, src, alt, aspectRatio = 'photo', fit = 'cover', children, ...props }, ref) => {
    const aspectStyles = {
      square: 'aspect-square',
      video: 'aspect-video',
      photo: 'aspect-[4/3]',
      wide: 'aspect-[16/9]',
    };

    if (src) {
      return (
        <div
          ref={ref}
          className={cn('relative overflow-hidden rounded-t-card', aspectStyles[aspectRatio], className)}
          {...props}
        >
          <img
            src={src}
            alt={alt || ''}
            className={cn('w-full h-full object-center transition-transform duration-500', fit === 'cover' && 'hover:scale-105')}
            loading="lazy"
          />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn('relative overflow-hidden rounded-t-card', aspectStyles[aspectRatio], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardMedia.displayName = 'CardMedia';

export interface ListingCardProps {
  image: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  category?: string;
  amenities?: string[];
  date?: string;
  verified?: boolean;
  onClick?: () => void;
  compact?: boolean;
  className?: string;
}

export function ListingCard({
  image,
  title,
  location,
  price,
  rating,
  category,
  amenities,
  date,
  verified = false,
  onClick,
  compact = false,
  className = '',
}: ListingCardProps) {
  const fallbackImage = 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800';

  if (compact) {
    return (
      <div
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${title} at ${location}. Price ₱${price} per month. Rating ${rating.toFixed(2)} stars.`}
        className={cn(
          'col-span-1 cursor-pointer bg-white rounded-xl p-2.5 shadow-sm border border-neutral-100 group',
          'outline-none focus-visible:ring-2 focus-visible:ring-primary',
          'flex flex-row gap-3 h-[96px] sm:h-[104px]',
          className
        )}
      >
        <div className="aspect-[4/3] h-full relative overflow-hidden rounded-lg flex-shrink-0">
          <img
            src={image}
            alt={title}
            loading="lazy"
            onError={(e) => { (e.target as HTMLImageElement).src = fallbackImage; }}
            className="object-cover h-full w-full"
          />
          {date && (
            <div aria-hidden="true" className="absolute bottom-1.5 left-1.5 z-10 px-2 py-0.5 bg-neutral-800 text-white text-[7px] font-bold rounded-full uppercase tracking-wider">
              {date}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 py-0.5 flex flex-col justify-between">
          <div>
            <h3 className="font-display font-extrabold text-[14px] sm:text-[15px] leading-tight truncate text-neutral-900 mb-0.5">{title}</h3>
            <div className="text-[11px] text-neutral-500 font-medium truncate">{location}</div>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex flex-col">
              <div className="font-display font-extrabold text-primary text-[14px]">₱{price.toLocaleString()}</div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1 bg-amber-50 px-1 py-0.5 rounded-md text-amber-700">
                <svg className="w-3.5 h-3.5 fill-amber-400 text-amber-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <span className="text-[9px] font-bold">{rating.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${title} at ${location}. Price ₱${price} per month. Rating ${rating.toFixed(2)} stars.`}
      className={cn(
        'col-span-1 cursor-pointer bg-white rounded-2xl p-2 sm:p-3 shadow-md border border-transparent hover:border-neutral-100 group',
        'outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        className
      )}
    >
      <div className="flex flex-col gap-2.5 sm:gap-3 w-full">
        <div className="aspect-[4/3] relative overflow-hidden rounded-xl">
          <img
            src={image}
            alt={title}
            loading="lazy"
            onError={(e) => { (e.target as HTMLImageElement).src = fallbackImage; }}
            className="object-cover h-full w-full"
          />
          <div aria-hidden="true" className="absolute top-2.5 right-2.5 z-10 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-[9px] sm:text-[10px] font-bold">
            {date}
          </div>
        </div>

        <div className="px-1.5 sm:px-1 flex flex-col gap-1">
          <h3 className="font-display font-extrabold text-[15px] sm:text-[16px] leading-tight truncate text-neutral-900">{title}</h3>

          <div className="flex items-center justify-between gap-1.5 mt-0.5">
            <div className="text-[11px] sm:text-[12px] text-neutral-500 font-medium truncate flex-1">{location}</div>
            {verified && (
              <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md border border-blue-100 flex-shrink-0">
                <svg className="w-3.5 h-3.5 fill-blue-600 text-white" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-tight">Verified</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-1 sm:mt-1.5">
            <div className="flex items-baseline gap-1">
              <div className="font-display font-extrabold text-primary text-[15px] sm:text-[17px]">₱{price.toLocaleString()}</div>
              <div className="text-[10px] sm:text-[11px] text-neutral-500 font-medium">/month</div>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 fill-amber-400 text-amber-400 sm:w-[13px] sm:h-[13px]" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <span className="text-[12px] sm:text-[13px] font-bold text-neutral-700">{rating.toFixed(2)}</span>
            </div>
          </div>

          {(amenities && amenities.length > 0) && (
            <div aria-hidden="true" className="flex items-center justify-end mt-2 pt-2 border-t border-neutral-100">
              <div className="flex gap-1.5 overflow-hidden">
                {amenities.slice(0, 2).map((amenity, i) => (
                  <span key={i} className="px-2 py-0.5 bg-neutral-50 rounded text-[8px] sm:text-[9px] text-neutral-500 border border-neutral-100 whitespace-nowrap font-medium">
                    {amenity}
                  </span>
                ))}
                {amenities.length > 2 && (
                  <span className="px-2 py-0.5 bg-neutral-50 rounded text-[8px] sm:text-[9px] text-neutral-400 border border-neutral-100 whitespace-nowrap font-medium">
                    +{amenities.length - 2}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  );
}
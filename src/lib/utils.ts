// @context: Tailwind class utility
// @purpose: Combines clsx + tailwind-merge for conditional className strings with conflict resolution
// @behavior: Usage: cn('base-class', condition && 'conditional-class', otherClass)
// @behavior: Later classes override earlier ones when Tailwind utilities conflict
// @performance: twMerge runs on every call; negligible overhead for typical usage
// @dependencies: clsx, tailwind-merge

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

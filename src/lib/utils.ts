// @context: Shared utility functions — class merging + async delay
// @purpose: cn() combines clsx + tailwind-merge for conditional className with conflict resolution
// @purpose: delay() provides a promisified setTimeout for simulating async operations
// @behavior: cn(): later classes override earlier Tailwind conflicts; handles conditionals, arrays, objects
// @behavior: delay(ms): returns Promise<void> that resolves after ms milliseconds
// @performance: twMerge runs regex-based Tailwind class resolution on every call — negligible for typical UI usage
// @performance: delay() is zero-CPU — just a timer-based Promise
// @tests: None — unit tests needed for: cn class conflict resolution order, delay resolves after exact ms
// @dependencies: clsx, tailwind-merge
// @owner: Core team
// @codegen-template: For new cn() calls, follow pattern: cn('base', condition && 'conditional', staticClass)

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

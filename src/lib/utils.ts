// @context: Utility functions — class merging and async delay
// @purpose: cn() merges Tailwind classes with conflict resolution; delay() returns a promise that resolves after ms
// @behavior: cn wraps clsx + twMerge; delay is a simple setTimeout wrapper
// @dependencies: clsx, tailwind-merge

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

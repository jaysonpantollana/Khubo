// @context: Unit tests for utility functions (cn, delay)
// @purpose: Tests class name merging (cn) and promise delay (delay)
// @behavior: cn tests: basic merge, conditional classes, tailwind conflict resolution
// @behavior: delay tests: resolves after specified ms
// @performance: Fast — synchronous for cn, async with timeout for delay
// @dependencies: vitest, cn, delay from utils.ts

import { describe, it, expect } from 'vitest';
import { cn, delay } from './utils';

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    const condition = false;
    expect(cn('base', condition && 'hidden', 'visible')).toBe('base visible');
  });

  it('resolves tailwind conflicts', () => {
    expect(cn('px-4', 'px-2')).toBe('px-2');
  });
});

describe('delay', () => {
  it('resolves after specified ms', async () => {
    const start = Date.now();
    await delay(50);
    expect(Date.now() - start).toBeGreaterThanOrEqual(45);
  });
});

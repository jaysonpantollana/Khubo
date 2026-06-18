// @context: Error propagation bridge to ErrorBoundary
// @purpose: Catches async errors and re-throws them during React's render phase so ErrorBoundary catches them
// @purpose: Bridges the gap between async error handling and React's error boundary mechanism
// @behavior: Usage: const handleError = useErrorHandler(); ... handleError(someError);
// @behavior: Normalizes caught value to Error instance: Error stays as-is, string wraps, unknown → generic message
// @behavior: Throws during render (not during event handler) → ErrorBoundary catches it
// @behavior: handleError is memoized via useCallback, stable across renders
// @performance: State setter triggers re-render; throw during render is intentional and fast
// @performance: handleError is useCallback stable — no re-creation on re-render
// @side-effects: Sets error state causing re-render with intentional throw
// @tests: None — unit tests needed for: Error passthrough, string→Error wrapping, unknown→generic fallback
// @dependencies: ErrorBoundary (components/errors/ErrorBoundary.tsx)
// @owner: Core team
// @known-issues: Once thrown, ErrorBoundary resets state on retry; this hook's error state persists across retry
// @debugging: If error doesn't surface, check: (1) ErrorBoundary wraps the component tree, (2) throw happens during render, not in event handler
import { useState, useCallback } from 'react';

export function useErrorHandler() {
  const [error, setError] = useState<Error | null>(null);

  if (error) {
    throw error;
  }

  const handleError = useCallback((err: unknown) => {
    if (err instanceof Error) {
      setError(err);
    } else if (typeof err === 'string') {
      setError(new Error(err));
    } else {
      setError(new Error('An unknown error occurred'));
    }
  }, []);

  return handleError;
}

export default useErrorHandler;

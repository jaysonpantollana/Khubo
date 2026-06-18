// @context: Error propagation to ErrorBoundary
// @purpose: Catches async errors and re-throws them during render phase so ErrorBoundary catches them
// @behavior: Usage: const handleError = useErrorHandler(); ... handleError(someError);
// @behavior: Normalizes caught value to Error instance: Error stays as-is, string wraps, unknown → generic message
// @behavior: Throws during render (not during event handler) → ErrorBoundary catches it
// @performance: State setter triggers re-render; throw during render is intentional
// @side-effects: Sets error state causing re-render with throw
// @dependencies: ErrorBoundary (components/errors/ErrorBoundary.tsx)
// @known-issues: Once thrown, the ErrorBoundary resets state on retry; this hook's error state persists across retry
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

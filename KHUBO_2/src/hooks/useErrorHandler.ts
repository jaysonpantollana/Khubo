// @context: Error handler hook — throws caught errors as render exceptions
// @purpose: Returns a handleError callback that stores the error in state and re-throws it during render
// @behavior: Sets error in useState; re-throws synchronously on next render to be caught by ErrorBoundary
// @dependencies: react (useState, useCallback)

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

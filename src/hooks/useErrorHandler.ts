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

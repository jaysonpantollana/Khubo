import { useState, useEffect } from 'react';
import { getListings } from '../lib/api/listings';
import { Listing } from '../types';

export function useListings(params?: {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const paramsKey = JSON.stringify(params);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    getListings(params).then(({ data, error: err }) => {
      if (cancelled) return;
      if (err) {
        setError(err);
      } else {
        setListings(data);
      }
      setLoading(false);
    });

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsKey]);

  return { listings, loading, error };
}

export function useAllListings() {
  return useListings();
}

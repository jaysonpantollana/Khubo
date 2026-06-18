// @context: Listing data hook — fetches filtered listings with loading/error states
// @purpose: Primary hook for listing data across Home, CategoryListings, and other listing pages
// @behavior: Input: {category?, search?, minPrice?, maxPrice?}
// @behavior: Output: {listings: Listing[], loading: boolean, error: string | null}
// @behavior: Cancels in-flight requests on dependency change via cancelled flag
// @behavior: Error surfaces as string → consumed by page-level error UI (not ErrorBoundary)
// @performance: Re-fetches on any param change; no caching beyond component state
// @performance: Mock: ~500ms delay; Real API: depends on network + backend response time
// @performance: Target: <500ms P95 response time for listing queries
// @tests: None — unit tests needed for filter logic edge cases (empty results, category 'ALL', price range boundaries)
// @side-effects: None (API calls are read-only; mock fallback also read-only on original data)
// @dependencies: lib/api/listings.ts, types.ts
// @owner: Core team
// @known-issues: Missing 'params' from useEffect deps (currently uses individual param fields)
// @debugging: If listing list is empty, check: (1) category filter excludes all, (2) search query matches nothing, (3) mock data array is populated
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

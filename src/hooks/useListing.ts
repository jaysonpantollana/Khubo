// @context: Single listing fetch hook
// @purpose: Fetches one listing by ID with simulated delay; no error state (returns null if not found)
// @behavior: Input: id (string | undefined) - when undefined, stays in loading state
// @behavior: Output: {listing: Listing | null, loading: boolean}
// @performance: Fixed 500ms delay simulated; no cancellation support
// @side-effects: None
// @dependencies: mocks/listings.ts, types.ts
// @known-issues: No error state (compare with useListings which has error); missing network adapter
import { useState, useEffect } from 'react';
import { LISTINGS as MOCK_LISTINGS } from '../mocks/listings';
import { Listing } from '../types';

export function useListing(id: string | undefined) {
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const mockListing = MOCK_LISTINGS.find(l => l.id === id);
      setListing(mockListing || null);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  return { listing, loading };
}

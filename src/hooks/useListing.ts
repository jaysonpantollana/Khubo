// @context: Single listing fetch hook
// @purpose: Fetches one listing by ID with simulated delay; no error state (returns null if not found)
// @behavior: Input: id (string | undefined) - when undefined, stays in loading state
// @behavior: Output: {listing: Listing | null, loading: boolean}
// @behavior: Returns null silently (no error) when ID not found — consumer must handle null state
// @performance: Fixed 500ms delay simulated; no cancellation support
// @performance: Target: <300ms for single listing load
// @tests: None — unit tests needed for: non-existent ID returns null, undefined ID stays loading, valid ID returns listing
// @side-effects: None
// @dependencies: mocks/listings.ts, types.ts
// @owner: Core team
// @known-issues: No error state (compare with useListings which has error); missing network adapter
// @debugging: If listing shows null, check: (1) ID in URL matches listing.id in mock data, (2) router param extraction is correct
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

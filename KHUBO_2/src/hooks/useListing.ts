// @context: Single listing data hook — fetches one listing by ID
// @purpose: Simulates API call with 500ms delay; finds listing from mock data
// @behavior: Returns { listing, loading } tuple; null listing + false loading = not found
// @dependencies: MOCK_LISTINGS, Listing type

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

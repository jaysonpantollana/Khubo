import { useState, useEffect } from 'react';
import { getListing } from '../lib/api/listings';
import { Listing } from '../types';

export function useListing(id: string | undefined) {
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setListing(null);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchListing() {
      setLoading(true);
      const { data } = await getListing(id!);
      if (!cancelled) {
        setListing(data);
        setLoading(false);
      }
    }

    fetchListing();
    return () => { cancelled = true; };
  }, [id]);

  return { listing, loading };
}

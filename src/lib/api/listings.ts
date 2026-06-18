// @context: Listings API — CRUD operations for property listings
// @purpose: getListings, getListing, createListing, updateListing, deleteListing with mock fallback
// @behavior: Attempts real API first; falls back to mock data with simulated delay on failure
// @dependencies: Listing type, apiGet/Put/Post/Delete (client), MOCK_LISTINGS

import { Listing } from '../../types';
import { apiGet, apiPost, apiPut, apiDelete } from './client';
import { PaginatedResponse, PaginationParams } from './types';
import { delay } from '../utils';

import { LISTINGS as MOCK_LISTINGS } from '../../mocks/listings';

export async function getListings(params?: PaginationParams & {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}) {
  const { data, error } = await apiGet<PaginatedResponse<Listing>>('/listings', params as Record<string, string>);
  if (error) {
    await delay(500);
    let filtered = [...MOCK_LISTINGS];
    if (params?.category && params.category !== 'ALL') {
      filtered = filtered.filter((l) => l.category === params.category);
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.location.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q),
      );
    }
    return { data: filtered, error: null };
  }
  return { data: data?.data || [], error };
}

export async function getListing(id: string) {
  const { data, error } = await apiGet<Listing>(`/listings/${id}`);
  if (error) {
    await delay(500);
    const listing = MOCK_LISTINGS.find((l) => l.id === id) || null;
    return { data: listing, error: null };
  }
  return { data, error };
}

export async function createListing(listing: Omit<Listing, 'id' | 'date' | 'reviews'>) {
  const { data, error } = await apiPost<Listing>('/listings', listing);
  if (error) {
    await delay(300);
    const newListing: Listing = {
      ...listing,
      id: 'mock_' + Date.now(),
      date: new Date().toISOString(),
      reviews: [],
    };
    return { data: newListing, error: null };
  }
  return { data, error };
}

export async function updateListing(id: string, updates: Partial<Listing>) {
  const { data, error } = await apiPut<Listing>(`/listings/${id}`, updates);
  if (error) {
    await delay(300);
    const index = MOCK_LISTINGS.findIndex((l) => l.id === id);
    if (index === -1) return { data: null, error: 'Listing not found' };
    return { data: { ...MOCK_LISTINGS[index], ...updates }, error: null };
  }
  return { data, error };
}

export async function deleteListing(id: string) {
  const { data, error } = await apiDelete<void>(`/listings/${id}`);
  if (error) {
    await delay(300);
    return { data: null, error: null };
  }
  return { data, error };
}

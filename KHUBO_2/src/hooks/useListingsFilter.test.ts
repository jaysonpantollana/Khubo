// @context: Unit tests for useListingsFilter hook
// @purpose: Tests filtering by category, price range, search query, and sorting by price/rating
// @behavior: Uses renderHook with mock listings; verifies filter/sort output counts and ordering
// @dependencies: vitest, @testing-library/react, useListingsFilter, Listing type

import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useListingsFilter } from './useListingsFilter';
import type { Listing } from '../types';

const mockListings: Listing[] = [
  { id: '1', title: 'Cheap Room', price: 1000, rating: 3, category: 'boarding', location: 'City', description: 'Small room', image: '', gallery: [], date: '', amenities: [], reviews: [] },
  { id: '2', title: 'Nice Apartment', price: 5000, rating: 4.5, category: 'apartment', location: 'Suburb', description: 'Spacious', image: '', gallery: [], date: '', amenities: [], reviews: [] },
  { id: '3', title: 'Luxury Pad', price: 15000, rating: 5, category: 'pad', location: 'City', description: 'Premium', image: '', gallery: [], date: '', amenities: [], reviews: [] },
];

const defaultFilters = { minPrice: 0, maxPrice: 50000, minRating: 0, sortBy: 'relevance' as const };

describe('useListingsFilter', () => {
  it('returns all listings with default filters', () => {
    const { result } = renderHook(() =>
      useListingsFilter(mockListings, defaultFilters)
    );
    expect(result.current).toHaveLength(3);
  });

  it('filters by category', () => {
    const { result } = renderHook(() =>
      useListingsFilter(mockListings, defaultFilters, '', 'apartment')
    );
    expect(result.current).toHaveLength(1);
    expect(result.current[0].title).toBe('Nice Apartment');
  });

  it('filters by price range', () => {
    const { result } = renderHook(() =>
      useListingsFilter(mockListings, { ...defaultFilters, minPrice: 4000, maxPrice: 10000 }, '', '')
    );
    expect(result.current).toHaveLength(1);
  });

  it('filters by search query', () => {
    const { result } = renderHook(() =>
      useListingsFilter(mockListings, defaultFilters, 'cheap')
    );
    expect(result.current).toHaveLength(1);
  });

  it('sorts by price ascending', () => {
    const { result } = renderHook(() =>
      useListingsFilter(mockListings, { ...defaultFilters, sortBy: 'price-low' })
    );
    expect(result.current[0].price).toBe(1000);
    expect(result.current[2].price).toBe(15000);
  });

  it('sorts by rating descending', () => {
    const { result } = renderHook(() =>
      useListingsFilter(mockListings, { ...defaultFilters, sortBy: 'rating' })
    );
    expect(result.current[0].rating).toBe(5);
  });

  it('handles empty listings', () => {
    const { result } = renderHook(() =>
      useListingsFilter([], defaultFilters)
    );
    expect(result.current).toHaveLength(0);
  });
});

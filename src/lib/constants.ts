export const BRAND_COLOR = '#17294F';
export const ACCENT_BLUE = '#2252D6';
export const MOBILE_BREAKPOINT = 768;
export const STICKY_SEARCH_HEIGHT = 70;

export const BUDGET_RANGES = [
  { min: 1500, max: 4000, label: '₱1k - ₱3k' },
  { min: 4000, max: 6000, label: '₱3k - ₱5k' },
  { min: 6000, max: Infinity, label: '₱5k+' },
];

export const POPULAR_LOCATIONS = ['Iligan City'];

export const FALLBACK_LISTING_IMAGE = 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800';

export const DEFAULT_FILTERS = {
  minPrice: 0,
  maxPrice: 50000,
  minRating: 0,
  sortBy: 'relevance' as const,
};

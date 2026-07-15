// @context: Shared TypeScript type definitions
// @purpose: Defines Listing, Category, Review, Roommate, and HostProfile interfaces used across the app
// @behavior: Pure type exports — no runtime code; includes amenity label/icon mapping
// @dependencies: None
//
// @typeflow: UI (string input) → Validation (none) → Hook params → API layer → Mock data → Component state → Render
// @typeflow: SearchDropdown string → useSearchHistory.storeSearch() → localStorage (JSON.stringify)
// @typeflow: URL param ":id" → useListing(id) → mockListings.find() → Listing | null → ListingCard
// @typeflow: API response (JSON) → ApiResponse<Listing> → {data, error} → component listings state → ListingCard[]
//
// @error-codes: ERR_LISTING_NOT_FOUND — listing ID not found in mock data (useListing returns null)
// @error-codes: ERR_API_GENERIC — any API call failure (returned as error string in ApiResponse)
// @error-codes: ERR_AUTH_CREDENTIALS — invalid email/password in mock auth (api/auth.ts)
// @error-codes: ERR_AUTH_DUPLICATE — email already registered (api/auth.ts signUp)
// @error-codes: ERR_MAP_MISSING_KEY — MAPTILER_API_KEY not set (MapTilerView console.warn)
// @error-codes: ERR_MEMORY_LEAK — URL.createObjectURL not revoked (messages.ts known issue)
// @error-codes: ERR_UPDATE_NOT_FOUND — listing to update not found (listings.ts returns 'Listing not found')
// @error-codes: ERR_RENDER_PURITY — Math.random() called during render (known issue)
//
// @migration-history: v0.0.0 — Initial scaffold (Staybnb → Khubo rename, mock data, React 19, Vite 6)

export interface Listing {
  id: string;
  title: string;
  location: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  gallery: string[];
  category: string;
  date: string;
  amenities: string[];
  advancePaymentMonths?: number;
  lat?: number;
  lng?: number;
  preContractualDoc?: string;
  reviews: Review[];
  host?: HostInfo;
  tenants?: TenantInfo[];
  isActive?: boolean;
}

export interface Review {
  id: string;
  userName: string;
  userImage: string;
  date: string;
  comment: string;
  rating: number;
}

export interface HostInfo {
  name: string;
  image: string;
  reviews: number;
  rating: number;
  hostingDuration: string;
  work: string;
  location: string;
  tenantCount?: number;
}

export interface TenantInfo {
  id: string;
  name: string;
  image: string;
  email: string;
  phone?: string;
  moveInDate: string;
  status: 'active' | 'leaving' | 'moved_out';
  paymentStatus: 'paid' | 'pending' | 'overdue';
}

// @context: Listing category
// @purpose: Browsing taxonomy for filtering listings by type (Boarding House, Solo Room, etc.)
// @behavior: "ALL" label is special-cased in Categories.tsx filtering logic
// @known-issues: "ALL" label is special-cased in filtering logic
export interface Category {
  label: string;
  icon: string;
  emoji: string;
}

// @context: Roommate seeker profile
// @purpose: Profiles for the roommate matching feature; used by RoommateCard, RoommateModal, and roommate search
// @dependencies: Mock data in mocks/roommates.ts
// @known-issues: No compatibility score algorithm implemented; matching is manual/exact-filter only
export interface Roommate {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  university: string;
  location: string;
  bio: string;
  image: string;
  tags: string[];
  budgetRange: string;
  preferredPlace: string;
  phone?: string;
  email?: string;
  hidePhone?: boolean;
  hideEmail?: boolean;
  hideSocialLinks?: boolean;
}

export interface FilterState {
  minPrice: number;
  maxPrice: number;
  minRating: number;
  sortBy: 'relevance' | 'price-low' | 'price-high' | 'rating';
}

// @context: Core domain models + error registry + type flow map
// @purpose: Defines all shared domain entities used across pages, components, API, and mocks
// @purpose: Serves as single source of truth for all data shapes in the application
// @security: None - no PII or secrets in these types
// @performance: All interfaces are plain objects, no runtime cost; erased at compile time
// @dependencies: None
// @owner: Core team
// @known-issues: No discriminated union for listing categories; category is free-text string
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
// @error-codes: ERR_RENDER_PURITY — Math.random() called during render (PropertiesModal known issue)
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
  lat?: number;
  lng?: number;
  reviews: Review[];
  host?: HostInfo;
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
}

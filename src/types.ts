// @context: Core domain models
// @purpose: Defines all shared domain entities used across pages, components, API, and mocks
// @security: None - no PII or secrets in these types
// @performance: All interfaces are plain objects, no runtime cost
// @dependencies: None
// @known-issues: No discriminated union for listing categories; category is free-text string

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

# Documentations

---

## Contents

1. [AI Context & Documentation Map](#ai-context--documentation-map)
2. [README_TECHNICALS.md — Technical Documentation](#readme_technicals-md--technical-documentation)
3. [CODE_ANALYSIS_AND_PLAN.md — Codebase Analysis & Implementation Plan](#code_analysis_and_plan-md--codebase-analysis--implementation-plan)

---

## AI Context & Documentation Map — 50 Techniques Embedded in Code

Every technique below is annotated directly in the source code as context-aware comments (`// @context`, `// @purpose`, `// @behavior`, etc.) at the file header level.

| # | Technique | Location in Source Code |
|---|-----------|----------------------|
| 1 | Semantic Code Chunking | `src/App.tsx:1` (section markers), `src/lib/api/*.ts` (file headers), all annotated files |
| 2 | Behavioral Contract Mapping | `src/lib/api/client.ts:1`, `src/lib/api/auth.ts:1`, `src/lib/api/listings.ts:1`, `src/lib/api/roommates.ts:1` |
| 3 | State Transition Documentation | `src/lib/AuthContext.tsx:1` (ANONYMOUS↔AUTHENTICATED), `src/lib/ThemeContext.tsx:1` (LIGHT↔DARK) |
| 4 | Data Flow Visualization | `src/App.tsx:1` (main flow diagrams), `src/hooks/useListings.ts:1`, `src/hooks/useListing.ts:1`, `src/lib/AuthContext.tsx:1` |
| 5 | Error Propagation Matrix | `src/components/errors/ErrorBoundary.tsx:1`, `src/hooks/useErrorHandler.ts:1`, `src/components/ui/ErrorScreen.tsx:1` |
| 6 | Dependency Injection Mapping | All files have `@dependencies` tags: `src/App.tsx`, `src/lib/AuthContext.tsx`, `src/lib/ThemeContext.tsx`, `src/components/errors/ErrorBoundary.tsx`, etc. |
| 7 | Type Flow Analysis | `src/types.ts:1` (domain→UI mapping), `src/lib/api/types.ts:1` (API contracts) |
| 8 | Side Effect Manifest | `src/lib/api/auth.ts:1`, `src/hooks/useSearchHistory.ts:1`, `src/hooks/useReducedMotion.ts:1`, `src/lib/ThemeContext.tsx:1` |
| 9 | Configuration Context Mapping | `src/main.tsx:1`, `src/App.tsx:1`, `src/lib/ThemeContext.tsx:1`, `src/index.css:1`, `vite.config.ts:1` |
| 10 | Test Coverage Mapping | `src/hooks/*.ts` (`@tests` annotations), `src/lib/utils.test.ts`, `src/hooks/useListingsFilter.test.ts`, `src/lib/api/client.test.ts` |
| 11 | Performance Baseline | `src/hooks/useListings.ts:1`, `src/hooks/useListing.ts:1`, `src/lib/api/listings.ts:1`, `src/lib/api/roommates.ts:1`, `vite.config.ts:1` |
| 12 | Migration History Tracker | `package.json:2` (version 0.0.0), `Documentations.md:CODE_ANALYSIS` |
| 13 | Integration Point Documentation | `src/lib/api/*.ts` (all modules), `vite.config.ts:1`, `.env.example` |
| 14 | Security Boundary Mapping | `src/lib/AuthContext.tsx:1`, `src/lib/api/auth.ts:1`, `src/lib/api/client.ts:1`, `src/mocks/supabase.ts:1` |
| 15 | Debugging Context Generation | `src/components/errors/ErrorBoundary.tsx:1`, `src/hooks/useErrorHandler.ts:1`, files with `@known-issues` tags |
| 16 | Type-Safe API Contracts | `src/lib/api/types.ts:1` (ApiResponse, PaginatedResponse, ApiError) |
| 17 | Component Interaction Matrix | `src/App.tsx:1` (full tree with Provider→Router→Pages hierarchy) |
| 18 | Configuration Schema Documentation | `vite.config.ts:1`, `src/main.tsx:1`, `src/index.css:1` |
| 19 | Error Code Registry | `src/types.ts:` (see ERR_* entries in annotations) |
| 20 | Context-Aware Code Annotations | ALL annotated files use `// @context`, `@purpose`, `@behavior`, `@security`, `@performance`, `@dependencies`, `@tests`, `@owner`, `@known-issues` |
| 21 | File Structure Documentation | `src/App.tsx:41-49` (lazy imports list), `Documentations.md:README_TECHNICALS.md §3` |
| 22 | Domain Model Documentation | `src/types.ts:1` (Listing, Review, HostInfo, Category, Roommate with relationships) |
| 23 | Event Flow Documentation | `src/App.tsx:1` (User action → Route → Page → Hook → API → Mock flow) |
| 24 | Cache Strategy Documentation | `src/hooks/useSearchHistory.ts:1`, `src/lib/ThemeContext.tsx:1` |
| 25 | Database Schema Documentation | `src/mocks/listings.ts:1`, `src/mocks/roommates.ts:1`, `src/mocks/supabase.ts:1` |
| 26 | Logging Strategy Documentation | `src/components/errors/ErrorBoundary.tsx:1` (console.error) |
| 27 | CI/CD Pipeline Documentation | `package.json:7-18` (scripts), `vite.config.ts:1` (build config) |
| 28 | Monitoring and Alerting Documentation | `src/components/errors/ErrorBoundary.tsx:1` (console.error for now) |
| 29 | Code Review Checklist | `eslint.config.js`, `tsconfig.json`, `Documentations.md:README_TECHNICALS.md §11` |
| 30 | Architectural Decision Records | `src/App.tsx:6-8` (HashRouter ADR, Context API ADR, Mock-first ADR), `vite.config.ts:18` (@ alias ADR) |
| 31 | Onboarding Documentation | `README.md` (quick start), `Documentations.md:README_TECHNICALS.md` |
| 32 | Technical Debt Register | Files with `@known-issues`: `src/types.ts`, `src/lib/AuthContext.tsx`, `src/mocks/supabase.ts`, `src/index.css`, `vite.config.ts`, all hooks |
| 33 | Feature Flag Register | `src/App.tsx:27-29` (feature flags: DARK_MODE, MOCK_AUTH, MOCK_DATA), `src/lib/ThemeContext.tsx:1` (dark mode flag) |
| 34 | Environment Configuration Matrix | `vite.config.ts:1`, `src/main.tsx:1`, `.env.example` |
| 35 | Migration and Seed Data Documentation | `src/mocks/listings.ts:1`, `src/mocks/roommates.ts:1` |
| 36 | Performance Testing Documentation | `src/hooks/*.ts` (perf annotations), `vite.config.ts:1` (chunk sizes) |
| 37 | Security Testing Documentation | All `@security` tags across files |
| 38 | Backup and Recovery Documentation | *(N/A for SPA with mock data)* |
| 39 | Compliance Documentation | *(N/A — no PII collected)* |
| 40 | Dependency Management Documentation | `package.json` (all deps with versions), `src/lib/animations.ts:1` (motion dep), `src/lib/utils.ts:1` (clsx, tailwind-merge) |
| 41 | Code Generation Templates | `src/components/ui/Modal.tsx:1` (reusable modal template pattern), `src/components/ListingCarousel.tsx:1` (carousel pattern) |
| 42 | Refactoring Guide | `Documentations.md:CODE_ANALYSIS_AND_PLAN.md` §5 |
| 43 | Troubleshooting Guide | `src/components/errors/ErrorBoundary.tsx:1`, `src/components/ui/ErrorScreen.tsx:1`, files with `@known-issues` |
| 44 | Runbook Documentation | `package.json:7-18` (dev, build, preview, clean, lint, test, typecheck, format scripts) |
| 45 | System Context Diagram | `src/App.tsx:1` (full system diagram) |
| 46 | Container and Service Architecture | `vite.config.ts:1` (build + chunk splitting config) |
| 47 | Observability Strategy | `src/components/errors/ErrorBoundary.tsx:1` (error logging), `src/lib/api/client.ts:1` (API error handling) |
| 48 | Disaster Recovery Plan | *(N/A for SPA)* |
| 49 | Capacity Planning Documentation | `vite.config.ts:42` (chunkSizeWarningLimit: 2000KB) |
| 50 | Communication Patterns Documentation | `src/lib/api/*.ts` (all modules document sync/async patterns) |

### Coverage

All source files are annotated with `@context`, `@purpose`, and domain-specific tags:

- **Pages (9)**: Home, CategoryListings, ListingDetail, Maps, Profile, RoommateFinder, ManageListings, TermsOfService, PrivacyPolicy
- **Components (60+)**: AnalyticsModal, AnnouncementsOverlay, BottomNav, CameraOverlay, Categories, CreateListingModal, CreatePostModal, DateScrollPicker, EditListingModal, errors/ErrorBoundary, example/ErrorExample, Filters, Footer, Hero, HostProfile, InquiriesModal, ListingCard, ListingCardSkeleton, ListingCarousel, ListingDetailModal, ListingDetailSkeleton, ListingsPopup, MapPicker, MapTilerView, Navbar, NotificationDialog, OccupationStep, OnboardingFlow, OnboardingModal, PhotoCarouselOverlay, profile/EditProfileModal, profile/LandlordSignupModal, profile/LogoutModal, profile/StatCardModal, PropertiesModal, ReviewBreakdown, ReviewProfile, RoommateCard, RoommateCardSkeleton, RoommateHero, RoommateModal, RoommatePreferences, RoommateSearchDropdown, RoommatesPopup, ScrollToTop, SearchDropdown, SearchHistory, TenantsModal, TenantProfileModal, ThemeToggle, Toast, ToastProvider, ui/ErrorScreen, ui/Modal, UploadModal, VerificationStep
- **Hooks (9)**: useBodyScrollLock, useErrorHandler, useFocusTrap, useListing, useListings, useListingsFilter, useReducedMotion, useSearchHistory
- **API (7)**: auth, client, client.test, index (barrel), listings, roommates, types
- **Lib (7)**: AuthContext, ThemeContext, animations, mapPreloader, utils, utils.test, api/index
- **Mocks (3)**: listings, roommates, supabase
- **Config (5)**: App, main, index.css, vite.config, eslint.config
- **Root (3)**: types, package.json, .env.example
- **Test (1)**: setup.ts

### Quick Navigation

- **All annotated source files**: See `@context` comments in `src/*.ts`, `vite.config.ts`
- **Routes**: `/` Home, `/listing/:id`, `/category/:categoryId`, `/maps`, `/roommate`, `/profile`, `/manage-listings`, `/terms`, `/privacy`
- **State management**: React Context API — `src/lib/AuthContext.tsx`, `src/lib/ThemeContext.tsx`, `src/components/ToastProvider.tsx`
- **Data layer**: All mock — `src/mocks/*.ts` with 500ms simulated delay
- **Auth**: Email-only mock, auto-signs in demo user, localStorage-backed — `src/lib/AuthContext.tsx`, `src/lib/api/auth.ts`
- **Animations**: Motion library with centralized presets in `src/lib/animations.ts`
- **Maps**: MapTiler SDK v4 with preloader singleton in `src/lib/mapPreloader.ts`; requires `VITE_MAPTILER_API_KEY`
- **Onboarding**: 5-step wizard (identity → occupation → ID verification → review → finish) in `src/components/OnboardingFlow.tsx`
- **Body scroll lock**: Nested-modal-safe lock via `src/hooks/useBodyScrollLock.ts`
- **Focus trap**: Keyboard focus trap for modals via `src/hooks/useFocusTrap.ts`
- **Reduced motion**: Accessibility support via `src/hooks/useReducedMotion.ts`
- **Search history**: localStorage-backed recent searches via `src/hooks/useSearchHistory.ts`
- **API client**: Retry (2x), timeout (15s), abort signals, auth headers — `src/lib/api/client.ts`
- **Camera**: getUserMedia with front/rear toggle and native fallback — `src/components/CameraOverlay.tsx`
- **File upload**: Drag-and-drop with type filtering and size validation — `src/components/UploadModal.tsx`
- **Photo gallery**: Full-screen overlay with keyboard nav and thumbnails — `src/components/PhotoCarouselOverlay.tsx`
- **Review breakdown**: 6-dimension rating with star distribution chart — `src/components/ReviewBreakdown.tsx`
- **Testing**: Vitest + React Testing Library + jsdom; setup in `src/test/setup.ts`
- **AI**: `@google/genai` package NOT installed (mentioned in earlier docs but not in dependencies)

---

# README_TECHNICALS.md — Technical Documentation

# Staybnb - Technical Documentation

Comprehensive technical documentation for the Khubo accommodation and roommate finder platform.

---

## 📋 Table of Contents

1. [Tech Stack](#tech-stack)
2. [Architecture Overview](#architecture-overview)
3. [Project Structure](#project-structure)
4. [Core Features & Implementation](#core-features--implementation)
5. [Component Library](#component-library)
6. [State Management](#state-management)
7. [Styling & Design System](#styling--design-system)
8. [Animation System](#animation-system)
9. [API Integration](#api-integration)
10. [Testing](#testing)
11. [TypeScript Types](#typescript-types)
12. [Development Guidelines](#development-guidelines)

---

## 🛠 Tech Stack

### Frontend Framework
- **React 19** - Latest version with concurrent features and improved hooks
- **React Router DOM 7** - Client-side routing with hash-based navigation
- **TypeScript 5.8** - Static typing for enhanced developer experience and type safety

### Build & Development Tools
- **Vite 6.2** - Next-generation frontend build tool with HMR and fast builds
- **@vitejs/plugin-react** - Official React plugin for Vite
- **Tailwind CSS 4.1** - Utility-first CSS framework with Vite plugin integration
- **PostCSS & Autoprefixer** - CSS processing and vendor prefixing

### UI & Animation Libraries
- **Motion (Framer Motion)** - Production-ready animation library for React
- **Lucide React** - Beautiful, consistent icon set
- **clsx & tailwind-merge** - Conditional className utilities for Tailwind
- **Recharts** - Charting library for analytics dashboards

### Backend & Services
- **Supabase** - Backend-as-a-Service for authentication and database (mock only)
- **MapTiler SDK 4.0** - Interactive maps and geolocation services

### Utilities
- **date-fns** - Modern JavaScript date utility library

### Code Quality
- **ESLint 9** - JavaScript/TypeScript linting
- **Prettier 3.8** - Code formatting
- **typescript-eslint** - TypeScript-specific linting rules

### Testing
- **Vitest 4.1** - Blazing fast unit test runner
- **@testing-library/react** - React component testing utilities
- **@testing-library/jest-dom** - Custom DOM matchers
- **@testing-library/user-event** - User interaction simulation
- **jsdom** - DOM environment for tests

---

## 🏗 Architecture Overview

### Application Architecture Pattern

The application follows a **Feature-Based Architecture** with the following layers:

```
┌─────────────────────────────────────────┐
│           Presentation Layer            │
│  (Pages, Components, Modals, Layouts)   │
├─────────────────────────────────────────┤
│            Context Layer                │
│    (Auth, Theme, Toast Providers)       │
├─────────────────────────────────────────┤
│             Hook Layer                  │
│   (Custom Hooks for Data & Logic)       │
├─────────────────────────────────────────┤
│           Service Layer                 │
│  (API Client → Mock Data Fallback)      │
├─────────────────────────────────────────┤
│            Data Layer                   │
│      (Types, Mock Data, Utils)          │
└─────────────────────────────────────────┘
```

### Routing Strategy

- **HashRouter**: Used for static hosting compatibility (ADR-001)
- **Lazy Loading**: All pages are code-split using `React.lazy()` and wrapped in `Suspense`
- **Route Protection**: Authenticated routes managed via `AuthContext`

### State Management Strategy

- **Context API**: Global state for authentication, theme, and toast notifications (ADR-003)
- **Local State**: Component-level state using `useState` and `useReducer`
- **Custom Hooks**: Encapsulated business logic and data fetching

### Data Strategy

- **Mock-First**: All API calls fall through to mocks when real request fails (ADR-002)
- **No Real Backend**: Supabase client exists but only mocks are used

---

## 📁 Project Structure

```
/workspace
├── public/                    # Static assets
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── errors/           # Error handling components
│   │   │   └── ErrorBoundary.tsx
│   │   ├── example/          # Development examples
│   │   │   └── ErrorExample.tsx
│   │   ├── profile/          # Profile-related modals
│   │   │   ├── EditProfileModal.tsx
│   │   │   ├── LandlordSignupModal.tsx
│   │   │   ├── LogoutModal.tsx
│   │   │   └── StatCardModal.tsx
│   │   ├── ui/               # Shared UI primitives
│   │   │   ├── ErrorScreen.tsx
│   │   │   └── Modal.tsx
│   │   ├── AnalyticsModal.tsx
│   │   ├── AnnouncementsOverlay.tsx
│   │   ├── AuthModal.tsx
│   │   ├── BottomNav.tsx
│   │   ├── CameraOverlay.tsx
│   │   ├── Categories.tsx
│   │   ├── CreateListingModal.tsx
│   │   ├── CreatePostModal.tsx
│   │   ├── DateScrollPicker.tsx
│   │   ├── EditListingModal.tsx
│   │   ├── Filters.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── HostProfile.tsx
│   │   ├── InquiriesModal.tsx
│   │   ├── ListingCard.tsx
│   │   ├── ListingCardSkeleton.tsx
│   │   ├── ListingCarousel.tsx
│   │   ├── ListingDetailModal.tsx
│   │   ├── ListingDetailSkeleton.tsx
│   │   ├── ListingsPopup.tsx
│   │   ├── MapPicker.tsx
│   │   ├── MapTilerView.tsx
│   │   ├── Navbar.tsx
│   │   ├── NotificationDialog.tsx
│   │   ├── OccupationStep.tsx
│   │   ├── OnboardingFlow.tsx
│   │   ├── OnboardingModal.tsx
│   │   ├── PhotoCarouselOverlay.tsx
│   │   ├── PropertiesModal.tsx
│   │   ├── ReviewBreakdown.tsx
│   │   ├── ReviewProfile.tsx
│   │   ├── RoommateCard.tsx
│   │   ├── RoommateCardSkeleton.tsx
│   │   ├── RoommateHero.tsx
│   │   ├── RoommateModal.tsx
│   │   ├── RoommatePreferences.tsx
│   │   ├── RoommateSearchDropdown.tsx
│   │   ├── RoommatesPopup.tsx
│   │   ├── ScrollToTop.tsx
│   │   ├── SearchDropdown.tsx
│   │   ├── SearchHistory.tsx
│   │   ├── TenantsModal.tsx
│   │   ├── TenantProfileModal.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── Toast.tsx
│   │   ├── ToastProvider.tsx
│   │   ├── UploadModal.tsx
│   │   └── VerificationStep.tsx
│   │
│   ├── hooks/                # Custom React hooks
│   │   ├── useBodyScrollLock.ts
│   │   ├── useErrorHandler.ts
│   │   ├── useFocusTrap.ts
│   │   ├── useListing.ts
│   │   ├── useListings.ts
│   │   ├── useListingsFilter.ts
│   │   ├── useListingsFilter.test.ts
│   │   ├── useReducedMotion.ts
│   │   └── useSearchHistory.ts
│   │
│   ├── lib/                  # Core libraries and contexts
│   │   ├── api/              # API layer (mock-backed)
│   │   │   ├── auth.ts
│   │   │   ├── client.ts
│   │   │   ├── client.test.ts
│   │   │   ├── index.ts      # Barrel export
│   │   │   ├── listings.ts
│   │   │   ├── roommates.ts
│   │   │   └── types.ts
│   │   ├── AuthContext.tsx
│   │   ├── ThemeContext.tsx
│   │   ├── animations.ts
│   │   ├── mapPreloader.ts
│   │   ├── utils.ts
│   │   └── utils.test.ts
│   │
│   ├── mocks/                # Mock data for development
│   │   ├── listings.ts
│   │   ├── roommates.ts
│   │   └── supabase.ts
│   │
│   ├── pages/                # Route-level components
│   │   ├── CategoryListings.tsx
│   │   ├── Home.tsx
│   │   ├── ListingDetail.tsx
│   │   ├── ManageListings.tsx
│   │   ├── Maps.tsx
│   │   ├── PrivacyPolicy.tsx
│   │   ├── Profile.tsx
│   │   ├── RoommateFinder.tsx
│   │   └── TermsOfService.tsx
│   │
│   ├── test/                 # Test infrastructure
│   │   └── setup.ts
│   │
│   ├── App.tsx               # Root component with routing
│   ├── main.tsx              # Application entry point
│   ├── index.css             # Global styles
│   ├── types.ts              # TypeScript type definitions
│   └── vite-env.d.ts         # Vite environment types
│
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite + Vitest configuration
├── eslint.config.js          # ESLint configuration
└── .env.example              # Environment variable template
```

---

## ⚙️ Core Features & Implementation

### 1. Authentication System

**Location**: `src/lib/AuthContext.tsx`

- **Provider**: Wraps the app to provide auth state globally
- **Methods**: `signIn()`, `signUp()`, `signOut()`, `user` state
- **Integration**: Mock auth with localStorage persistence
- **Protected Routes**: Conditional rendering based on auth state

### 2. Theme System (Dark/Light Mode)

**Location**: `src/lib/ThemeContext.tsx`

- **Persistence**: Theme preference stored in localStorage
- **System Detection**: Respects OS-level dark mode preference
- **Toggle Component**: `ThemeToggle` component for user control
- **CSS Variables**: Tailwind's dark mode class strategy

### 3. Listing Management

**Components**:
- `ListingCard` - Display individual listing preview
- `ListingCarousel` - Horizontal scrollable row of listings
- `ListingModal` - Detailed view with booking options
- `CreateListingModal` - Form for adding new listings
- `EditListingModal` - Modify existing listings
- `ManageListings` - Host dashboard page

**Data Flow**:
```
Page Component → useListings Hook → API Layer → Mock Data → Component State
```

### 4. Roommate Finder

**Key Components**:
- `RoommateHero` - Search interface and filters
- `RoommateCard` - Individual profile display
- `RoommateModal` - Detailed profile view
- `RoommateSearchDropdown` - Advanced filtering

**Matching Algorithm**:
- University affiliation
- Budget range compatibility
- Location preferences
- Lifestyle tags (smoking, pets, schedule, etc.)

### 5. Interactive Maps

**Implementation**: `src/components/MapTilerView.tsx`

- **SDK**: MapTiler SDK v4.0
- **Features**:
  - Property markers with popups
  - Cluster visualization
  - Geolocation support
  - Custom map styles

### 6. Search & Filtering

**Components**:
- `SearchDropdown` - Real-time search suggestions
- `Filters` - Multi-criteria filtering panel
- `SearchHistory` - Persistent search tracking
- `Categories` - Category-based browsing

**Hooks**:
- `useSearchHistory.ts` - localStorage persistence
- `useListingsFilter.ts` - Client-side filter/sort pipeline

### 7. Notification System

**Components**:
- `ToastProvider` - Context provider for toast management
- `Toast` - Individual notification component
- `NotificationDialog` - Persistent notification history

**Usage**:
```tsx
const { addToast } = useToast();
addToast({ message: 'Success!', type: 'success' });
```

### 8. Onboarding Flow

**Location**: `src/components/OnboardingFlow.tsx`

A 5-step post-auth wizard for new users:
- **Step 1** (`OnboardingModal`): Collects identity info (username, email, phone, bio, gender, address with cascading city/barangay dropdowns, profile photo)
- **Step 2** (`OccupationStep`): Selects occupation — Student, Professional, or Working Student
- **Step 3** (`VerificationStep`): Uploads a government/school ID for identity verification (supports images and PDFs, max 50MB)
- **Step 4** (`ReviewProfile`): Reviews all data with inline editing for identity, occupation, and lifestyle preferences
- **Step 5**: "Almost Done" thank-you screen

**Data Flow**:
```
Navbar Auth → OnboardingFlow → OnboardingData → localStorage → Profile
```

### 9. Map Preloader

**Location**: `src/lib/mapPreloader.ts`

A singleton service that initializes MapTiler in a hidden off-screen div on the Home page, so the interactive map is fully rendered when the user navigates to `/maps`. Provides `isMapReady()` and `takeMap()` for seamless handoff.

### 10. Tenant Management

**Components**:
- `TenantProfileModal` - Displays tenant list with status (active, leaving, moved out) and payment status
- `TenantsModal` - Tenants overview modal

**Location**: `src/components/TenantProfileModal.tsx`, `src/components/TenantsModal.tsx`

**Data Model**:
```ts
interface TenantInfo {
  id: string;
  name: string;
  image: string;
  email: string;
  phone?: string;
  moveInDate: string;
  status: 'active' | 'leaving' | 'moved_out';
  paymentStatus: 'paid' | 'pending' | 'overdue';
}
```

### 11. Map Picker

**Location**: `src/components/MapPicker.tsx`

An interactive MapTiler-based location picker for listing creation and editing. Users can click on the map to set a property's latitude/longitude coordinates.

### 12. Profile Management

**Components**:
- `EditProfileModal` - Edit profile form
- `LandlordSignupModal` - Landlord registration/login
- `LogoutModal` - Logout confirmation
- `StatCardModal` - Stat card detail views

**Location**: `src/components/profile/`

### 13. Listing Detail Page

**Location**: `src/pages/ListingDetail.tsx`

A full-featured property detail page with the following sections:

**Photo Gallery**:
- **Mobile**: Full-width hero carousel (55vh) with CSS snap scrolling, image indicator badge (`currentIndex / total`), tap to open full gallery
- **Desktop**: 5-image grid (`grid-cols-4 grid-rows-2`) with first image spanning 2x2, hover zoom effect, "Show all photos" button
- Fallback images from Unsplash if gallery has fewer than 5 images

**PhotoCarouselOverlay** (`src/components/PhotoCarouselOverlay.tsx`):
- Full-screen image viewer with backdrop blur
- Left/right arrow navigation buttons
- Keyboard support: ArrowRight, ArrowLeft, Escape
- Image counter badge (`currentIndex / total`)
- Thumbnail strip at bottom for direct image selection
- Click outside to close

**About This Place**: Description section with `whitespace-pre-wrap` formatting

**Amenities** (`What this place offers`):
- 2-column grid with circular icon + label per amenity
- 10 amenities: Kitchen, Wifi, TV, Elevator, Patio/Balcony, Luggage Dropoff, Refrigerator, Microwave, Paid Parking, Security Cameras
- Expandable "Show all" / "Show less" toggle (first 4 visible by default)

**House Rules**:
- 2-column grid with icon + rule text
- 7 rules: Curfew (10 PM), No Visitors after 9 PM, No Smoking, Quiet Hours (10 PM - 7 AM), Kitchen Cleanup, No Loud Music, Garbage Disposal
- Expandable "Show more rules" / "Show less" toggle (first 4 visible by default)

**Pre-contractual Document**:
- Clickable card with file icon, "Standard Lease Agreement" title, "PDF - 2.4 MB" subtitle
- Download button opens document in new tab (placeholder URL)

**Reviews Section**:
- Header: Star icon + rating score + review count
- Review cards (2-column grid): User avatar, name with verified badge, handle (`@username`), comment, date, like/share buttons
- Click-to-expand modal with full review detail
- "Show all N reviews" toggle (first 4 shown by default)

**ReviewBreakdown** (`src/components/ReviewBreakdown.tsx`):
- Left column: Overall rating with star distribution bar chart (5-star to 1-star percentages)
- Right column: 6-dimension rating grid (Cleanliness, Accuracy, Move-in, Communication, Location, Value) with scores and visual separators
- Responsive: 2 cols mobile → 3 cols sm → 6 cols lg

**Host Profile Card** (`src/components/HostProfile.tsx`):
- Avatar with verified badge, name, "Landlord" subtitle
- Stats grid: Reviews count, Rating, Hosting Duration, Tenants count
- Info rows: Work, Location with icons
- "Message Landlord" button (triggers auth check if not authenticated)

**Interactive Map**:
- Inline MapTiler map with location marker (540px tall)
- Hover overlay with "Click to Expand" pill
- Full-screen map modal with backdrop blur, location pill with coordinates, close button

**Booking Sidebar** (Desktop, `lg+` breakpoint):
- Sticky positioning at `top-[100px]`
- Price display (₱4,700 /month) with rating badge
- Landlord Profile card with avatar, name, and verified badge
- Contact section with card-style rows (circular icon + label + detail):
  - Phone row with tel link
  - Email row with mailto link
- Social Media icons (Instagram, Facebook, Twitter)
- "Contact Owner" button inside the card
- Unregistered users: Clicking "Contact Owner" opens the auth modal directly
- Price breakdown: Monthly Rent + Cleaning Fee + Service Fee + Grand Total

**Mobile Action Bar**:
- Fixed bottom bar with "Contact Owner" button
- Unregistered users: Clicking opens auth modal directly
- Registered users: Shows toast "Message sent to owner!"
- Tap feedback with `active:scale-95`

**State Management**: State variables for gallery, booking, map, auth, reviews, and amenity/rule toggles

### 14. Map View Page

**Location**: `src/pages/Maps.tsx` (725 lines)

A split-panel map-based listing discovery page:

**Layout**:
- Collapsible sidebar (left) + full-width MapTiler map (right)
- Sidebar auto-collapses on mobile (`window.innerWidth < 768`)
- Map auto-resizes after sidebar transition (305ms delay)

**Map Markers**:
- Custom SVG pin markers (red pin with white circle) for each listing with lat/lng
- Marker popups: Thumbnail image, title, price on hover/click
- Fly-to animation on marker click (zoom 16, 1500ms duration)
- Deselect on map click (if not clicking a marker)
- Deselect on zoom out (zoom < 15)

**Map Preloader Integration**:
- Takes pre-initialized map from Home page's hidden preloader via `takeMap()`
- Re-parents preloaded container into layout for instant map readiness
- Falls back to creating new map if preloader unavailable
- Resets preloader on unmount via `resetMapPreload()`

**Sidebar**:
- Desktop: Scrollable listing cards with active-state ring highlight synced to selected marker
- Mobile: Bottom overlay with horizontally scrollable listing cards, snap-to-center
- Collapse/expand toggle button with chevron

**Search Bar**:
- Location dropdown (quick-select popular locations)
- Date scroll picker (Month/Day/Year with year validation)
- Budget dropdown (preset ranges)
- Text search with SearchDropdown autocomplete
- Clear-all-filters button when selections active

**Custom Zoom Controls**: +/- buttons on bottom-right of map

**Missing API Key**: Friendly "Map unavailable" screen with link to get MapTiler API key

### 15. Home Page Enhancements

**Location**: `src/pages/Home.tsx` (694 lines)

**Hero Search Bar**:
- Prominent search with location, date, and budget fields
- Real-time autocomplete via `SearchDropdown` with trending tags and matching listings

**Scroll-Driven Sticky Header**:
- `IntersectionObserver`-based sticky header that transitions between category tabs and search bar
- Two observers: one for sticky state, one for search activation (70px threshold)
- Sticky search bar with Location, Dates, Budget dropdowns + text search
- Mobile: search activates only when sticky + scrolled past 70px

**Category Filter Tabs**:
- 17 categories + ALL tab: Boarding House, Apartment, Bed Spacer, Dormitory, Room 4 Rent, Condominium, All Males, Shared, All Females, No Pets, Quiet Hours, Free Water, Free Electricity, No Curfew, Gated, Study Area, Near MSU-IIT

**Search History** (`SearchHistory` component):
- localStorage-backed recent searches (max 5)
- Displayed under Hero with add/remove/select functionality

**Budget Filter**: Preset ranges: P1k-P3k, P3k-P5k, P5k+

**Date Scroll Picker** (`DateScrollPicker`):
- Three-column scrollable Month/Day/Year picker with snap-to-center
- Year validation: current year + next year only

**Listing Carousels**:
- Three carousels: "Recommended", "Top Listing", "Near MSU-IIT"
- Horizontal scroll with snap and navigation arrows
- Responsive item widths (2 cols mobile → 3 cols md → 5 cols lg)

**Map Preloader**: Hidden off-screen MapTiler container initialized on Home for instant map readiness on Maps page

### 16. Profile Page

**Location**: `src/pages/Profile.tsx` (882 lines)

**Hero Banner**: Full-width background image with gradient overlay, announcements button

**Profile Card**:
- Avatar with online/offline status dot (green/gray)
- Name, school/age/gender details, location
- Editable bio/quote
- "Edit Profile" button opens `EditProfileModal`

**Personality Tags**:
- Editable tag chips with add/remove functionality
- Persisted in `localStorage` key `user_profile_tags`
- Default tags: Introvert, Pet-friendly, Night owl, Studious, Non-smoker

**Landlord/Tenant Mode Toggle**:
- Switch between tenant and landlord views
- Different stat cards and features per mode

**Stat Cards**:
- **Tenant Mode**: Saved (12 Houses), Reservation (2 Houses), Roommate Applications (6), Invitations (0 Received)
- **Landlord Mode**: Properties (4 Listed), Tenants (12 Active), Inquiries (8 Pending), Revenue (P42k This Month)
- Clickable cards open dedicated modals (Analytics, Tenants, Properties, Inquiries, or generic StatCardModal)

**My Properties** (Landlord):
- List of host's listings with image, title, location, rating, amenities, availability badge, price
- Edit button opens `EditListingModal`
- Context menu with Edit and Copy Link
- Listing visibility toggle (green/gray) to show/h�藏 from search
- Tenant avatars with count badge
- Add Listing button opens `CreateListingModal`

**My Reservation** (Tenant):
- Display of reserved property with apply/cancel buttons

**Settings Menu**:
- Notifications (opens AnnouncementsOverlay)
- Account Settings (toast placeholder)
- Help Center (toast placeholder)
- Terms of Service (navigates to `/terms`)
- Privacy Policy (navigates to `/privacy`)

**Logout**: Confirmation modal with cancel/continue flow

### 17. Landlord Dashboard Modals

**Analytics Modal** (`src/components/AnalyticsModal.tsx`):
- Recharts `LineChart` showing daily revenue trends (14 data points)
- Total revenue display (₱42,000) with percentage trend (+14.2%)
- Monthly timeframe toggle (currently Monthly only)
- Stats breakdown: Avg. daily revenue (₱3,000), Top earning day (₱5,000)

**Inquiries Modal** (`src/components/InquiriesModal.tsx`):
- Tab-based filtering: All, Unread, Responded
- Unread count badge on filter button
- Inquiry cards with: Name, message preview, property reference badge, unread dot indicator
- 4 mock inquiries with different statuses (Unread, Responded, Read)
- Empty state for filtered results

**Properties Modal** (`src/components/PropertiesModal.tsx`):
- Property cards with status badges (Active/Review/Maintenance)
- Occupancy info, star ratings
- Click to view listing detail

**Tenants Modal** (`src/components/TenantsModal.tsx`):
- Tabular view of tenants with room number, payment status (Paid/Review/Pending/Draft), tenancy status (Staying/Leaving/Moved out), email

**Tenant Profile Modal** (`src/components/TenantProfileModal.tsx`):
- Individual tenant detail view

### 18. Camera & File Upload

**Camera Overlay** (`src/components/CameraOverlay.tsx`):
- Full-screen camera view using `getUserMedia` API
- Live video preview with front/rear camera toggle (`user`/`environment` facing modes)
- Capture button (large circular shutter)
- Preview captured image with Retake/Use Photo options
- Front camera mirroring (CSS `-scale-x-100`)
- Native camera fallback (`<input capture="environment">`) for permission-denied or unsupported browsers
- Error state with "Take Photo with Device" fallback button
- Stream cleanup on unmount (stops all tracks)

**Upload Modal** (`src/components/UploadModal.tsx`):
- Drag-and-drop zone with click-to-browse fallback
- File type filtering via `acceptedTypes` prop
- Max file size validation (default 25MB configurable via `maxSizeMB`)
- Selected files preview with name, size (MB), remove button
- Multi-file support
- "Securely encrypted" indicator
- Discard/Add Attachments buttons

### 19. API Client Details

**Location**: `src/lib/api/client.ts` (125 lines)

**HTTP Client** (`apiRequest`):
- Base URL from `VITE_API_URL` env var (defaults to `/api`)
- Default timeout: 15,000ms (configurable per request)
- Max retries: 2 (exponential backoff: 200ms, 400ms)
- Retry conditions: HTTP 429 (rate limit) or 5xx (server error)
- Abort signal combination: Merges caller's signal with timeout signal

**Auth Headers**:
- Automatic Bearer token injection from `sessionStorage.getItem('auth_token')`
- Token included in all requests via `getAuthHeaders()`

**CRUD Helpers**:
- `apiGet<T>(endpoint, params?)` - GET with optional query params
- `apiPost<T>(endpoint, body)` - POST with JSON body
- `apiPut<T>(endpoint, body)` - PUT with JSON body
- `apiDelete<T>(endpoint)` - DELETE

**Error Handling**:
- Non-OK responses: Parses error body for message/code, returns `ApiError`
- AbortError: Returns "Request was cancelled"
- Network errors: Returns error message string
- Max retries exceeded: Returns "Max retries exceeded"

### 20. Notification System

**Components**:
- `ToastProvider` - Context provider for toast management
- `Toast` - Individual notification component with 3s auto-dismiss
- `NotificationDialog` - Persistent notification history with timestamps

**Toast Types**: success, error, info

**Usage**:
```tsx
const { addToast } = useToast();
addToast({ message: 'Success!', type: 'success' });
```

---

## 🧩 Component Library

### Layout Components
| Component | Description |
|-----------|-------------|
| `Navbar` | Top navigation with logo, search, and user menu |
| `BottomNav` | Mobile-friendly bottom navigation bar |
| `Footer` | Site footer with links and copyright |
| `Hero` | Landing page hero section with CTA |
| `ScrollToTop` | Scrolls to top on route change (extracted to separate file) |

### Listing Components
| Component | Description |
|-----------|-------------|
| `ListingCard` | Card displaying listing preview |
| `ListingCardSkeleton` | Loading skeleton for listing cards |
| `ListingCarousel` | Horizontal scrollable row of listings with arrows |
| `ListingDetailSkeleton` | Loading skeleton for detail view |
| `ListingsPopup` | Reusable modal popup with grid of listing cards |
| `PhotoCarouselOverlay` | Image gallery with fullscreen mode |

### Roommate Components
| Component | Description |
|-----------|-------------|
| `RoommateCard` | Profile card for roommate candidates |
| `RoommateCardSkeleton` | Loading skeleton for roommate cards |
| `RoommateHero` | Header section for roommate finder |
| `RoommateModal` | Detailed roommate profile modal |
| `RoommatePreferences` | Wizard step for selecting roommate lifestyle preference |
| `RoommateSearchDropdown` | Filter dropdown for roommate search |
| `RoommatesPopup` | Reusable modal popup with grid of roommate cards |

### UI Primitives
| Component | Description |
|-----------|-------------|
| `Modal` | Reusable animated modal with focus trap (`src/components/ui/Modal.tsx`) |
| `ErrorScreen` | Full-page error display with actions (`src/components/ui/ErrorScreen.tsx`) |

### Chat Components
| Component | Description |
|-----------|-------------|
| *(Removed)* | Chat system removed — messaging feature no longer available |

### Profile Components
| Component | Description |
|-----------|-------------|
| `EditProfileModal` | Profile edit form (`src/components/profile/`) |
| `LandlordSignupModal` | Landlord auth modal (`src/components/profile/`) |
| `LogoutModal` | Logout confirmation (`src/components/profile/`) |
| `StatCardModal` | Stat detail overlay (`src/components/profile/`) |

### Onboarding Components
| Component | Description |
|-----------|-------------|
| `OnboardingFlow` | 5-step wizard orchestrator (identity → occupation → verification → review → finish) |
| `OnboardingModal` | Step 1 — collects identity, address, and profile photo |
| `OccupationStep` | Step 2 — selects occupation (Student / Professional / Working Student) |
| `RoommatePreferences` | Step 3 (variant) — selects roommate lifestyle preference |
| `VerificationStep` | Step 3 — uploads government/school ID for verification |
| `ReviewProfile` | Step 4 — reviews all data with inline editing |

### Utility Components
| Component | Description |
|-----------|-------------|
| `AnnouncementsOverlay` | Modal overlay displaying app news and updates with "New" badges |
| `AuthModal` | Login/signup modal dialog |
| `CameraOverlay` | Full-screen camera view with capture, retake, and native camera fallback |
| `Categories` | Horizontal scrollable category selector |
| `CreateListingModal` | Form for creating new listings |
| `CreatePostModal` | Form for creating posts |
| `DateScrollPicker` | Custom date selection component |
| `EditListingModal` | Form for editing existing listings |
| `Filters` | Multi-option filter panel |
| `HostProfile` | Host information display |
| `InquiriesModal` | Inquiries display modal |
| `MapPicker` | Interactive MapTiler-based location picker for listing creation/editing |
| `MapTilerView` | Interactive map component |
| `NotificationDialog` | Notification history with timestamps |
| `PropertiesModal` | Properties overview modal |
| `ReviewBreakdown` | Rating distribution visualization |
| `SearchDropdown` | Search input with autocomplete |
| `SearchHistory` | Recent searches display |
| `TenantsModal` | Tenants list modal |
| `TenantProfileModal` | Tenant management modal with status and payment tracking |
| `ThemeToggle` | Dark/light mode switch |
| `Toast` | Notification popup |
| `ToastProvider` | Toast context provider |
| `UploadModal` | File upload modal |

### Error Handling
| Component | Description |
|-----------|-------------|
| `ErrorBoundary` | Class component for catching render errors (`src/components/errors/`) |
| `ErrorExample` | Development example for error handling (`src/components/example/`) |

### Map Components
| Component | Description |
|-----------|-------------|
| `MapTilerView` | Interactive MapTiler SDK map with markers, popups, and fly-to animation |
| `MapPicker` | Interactive location picker for listing creation/editing with draggable marker |

### Legal & Info Pages
| Component | Description |
|-----------|-------------|
| `TermsOfService` | 10-section legal page (`/terms`) |
| `PrivacyPolicy` | 9-section legal page (`/privacy`) |

---

## 🔮 State Management

### Context Providers

#### AuthContext
```tsx
interface AuthContextType {
  user: MockUser | null;
  session: MockSession | null;
  isLoading: boolean;
  signIn: (email: string) => void;
  signOut: () => Promise<void>;
}
```

#### ThemeContext
```tsx
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}
```

#### ToastContext
```tsx
interface ToastContextType {
  addToast: (toast: ToastProps) => void;
  removeToast: (id: string) => void;
}
```

### Custom Hooks

#### useListings
- Fetches all listings with optional filters
- Handles loading and error states
- Returns: `{ listings, loading, error }`

#### useListing
- Fetches single listing by ID
- Returns: `{ listing, loading, error }`

#### useListingsFilter
- Client-side filter pipeline: category → price → rating → search → sort
- Returns filtered/sorted copy (never mutates original)
- Returns: `Listing[]`

#### useSearchHistory
- Manages search history in localStorage
- Methods: `addSearch`, `clearHistory`, `getHistory`

#### useReducedMotion
- Detects user's motion preference
- Returns boolean for animation adjustments

#### useFocusTrap
- Confines Tab/Shift+Tab within a container
- Restores focus on unmount
- Returns ref to attach to container

#### useErrorHandler
- Wraps async/sync error handling
- Integrates with ErrorBoundary

#### useBodyScrollLock
- Singleton-pattern scroll lock using a module-level counter
- Prevents background scrolling when modals/overlays are open
- Handles nested modal scenarios (count-based toggling)

---

## 🎨 Styling & Design System

### Tailwind CSS Configuration

**Version**: Tailwind CSS v4.x with Vite plugin (`@tailwindcss/vite`)

**Note**: Tailwind v4 uses CSS-based configuration via `src/index.css` instead of `tailwind.config.js`.

### Color Scheme

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| Primary | `#17294F` | `#17294F` | Brand color, CTAs |
| Background | `#FFFFFF` | `#0F172A` | Page backgrounds |
| Surface | `#F8FAFC` | `#1E293B` | Cards, modals |
| Text Primary | `#0F172A` | `#F8FAFC` | Headings, body text |
| Text Secondary | `#64748B` | `#94A3B8` | Subtitles, captions |

### Responsive Breakpoints

```ts
sm: 640px   // Small devices (landscape phones)
md: 768px   // Medium devices (tablets)
lg: 1024px  // Large devices (desktops)
xl: 1280px  // Extra large devices (large desktops)
2xl: 1536px // XXL devices (extra-large screens)
```

### Utility Functions

**`src/lib/utils.ts`**:
- `cn(...classes)` - Combines clsx and tailwind-merge for conditional classes
- Format currency, dates, and numbers
- Helper functions for common operations

---

## ✨ Animation System

### Library: Motion (Framer Motion)

**Configuration**: `src/lib/animations.ts`

### Easing Curves

```ts
export const EASE_OUT = [0.23, 1, 0.32, 1]; // Custom cubic-bezier
```

### Transition Presets

| Name | Duration | Ease | Use Case |
|------|----------|------|----------|
| `SPRING` | 0.3s | EASE_OUT | Default interactions |
| `EASE_OUT` | 0.3s | EASE_OUT | Fade ins, slides |
| `EASE_IN_OUT` | 0.3s | easeInOut | Balanced transitions |
| `FAST` | 0.15s | - | Quick feedback |
| `NORMAL` | 0.2s | - | Standard UI updates |
| `SLOW` | 0.4s | EASE_OUT | Major state changes |

### Animation Variants

#### FADE_IN
```ts
{ initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
```

#### FADE_UP
```ts
{ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 } }
```

#### SCALE_IN
```ts
{ initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.95 } }
```

#### Modal Presets (Reusable)
```ts
export const modalBackdrop = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
export const modalContent = { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 } };
export const dropdownReveal = { initial: { opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }, animate: { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }, exit: { opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' } };
```

### Reduced Motion Support

The app respects the `prefers-reduced-motion` media query:
- `REDUCED_TRANSITIONS` and `REDUCED_VARIANTS` variants for accessibility
- `useReducedMotion` hook provides programmatic access
- `MotionConfig` wrapper handles global settings via `reducedMotion="user"`

---

## 🔌 API Integration

### API Layer

**Location**: `src/lib/api/`

**Structure**:
- `client.ts` - Base HTTP client with retry (2 retries on 429/5xx), timeout (15s default), abort signal combination, and automatic Bearer token injection from sessionStorage
- `auth.ts` - Authentication operations (signIn, signUp, signOut, getSession)
- `listings.ts` - Listing CRUD operations (getListings, getListing, createListing, updateListing, deleteListing)
- `roommates.ts` - Roommate operations (getRoommates, getRoommate, createRoommateRequest)
- `types.ts` - API type definitions (ApiResponse, PaginatedResponse, PaginationParams, ApiError)
- `index.ts` - Barrel export

**Client Features**:
- `apiRequest<T>(endpoint, options)` - Generic fetch wrapper with retry, timeout, and auth
- `apiGet<T>(endpoint, params?)` - GET with optional query params
- `apiPost<T>(endpoint, body)` - POST with JSON body
- `apiPut<T>(endpoint, body)` - PUT with JSON body
- `apiDelete<T>(endpoint)` - DELETE
- Exponential backoff: 200ms × 2^attempt
- AbortError handling: Returns "Request was cancelled"
- Max retries exceeded: Returns "Max retries exceeded"

### Mock Data

**Location**: `src/mocks/`

**Tables** (Mock Schema):
- `listings` - Property listings with reviews, tenants, and status
- `roommates` - Roommate seeker profiles
- `supabase.ts` - Mock Supabase client

### MapTiler

**Usage**: Interactive maps in `Maps.tsx`, `MapTilerView.tsx`, `MapPicker.tsx`, and `ListingDetail.tsx`

```ts
import { maptilersdk } from '@maptiler/sdk';
maptilersdk.config.apiKey = import.meta.env.VITE_MAPTILER_API_KEY;
```

**Features**:
- Custom SVG pin markers with drop shadows
- Marker popups with thumbnail, title, and price
- Fly-to animation (zoom 16, 1500ms duration)
- Map preloader singleton for instant map readiness
- Full-screen map modal with location pill
- Interactive location picker for listing creation
- Missing API key fallback screen

---

## 🧪 Testing

### Test Runner

**Framework**: Vitest 4.1 with jsdom environment

**Configuration**: `vite.config.ts` (test section)
```ts
test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: ['./src/test/setup.ts'],
}
```

**Setup**: `src/test/setup.ts` imports `@testing-library/jest-dom` matchers

### Available Test Files

- `src/hooks/useListingsFilter.test.ts` - Filter hook tests
- `src/lib/utils.test.ts` - Utility function tests
- `src/lib/api/client.test.ts` - API client tests

### Scripts

```bash
npm test          # Run all tests (vitest run)
npm run test:watch  # Run tests in watch mode (vitest)
```

### Testing Libraries

- `@testing-library/react` - Component rendering and queries
- `@testing-library/jest-dom` - Custom matchers (toBeInTheDocument, etc.)
- `@testing-library/user-event` - User interaction simulation
- `jsdom` - Browser environment simulation

---

## 📝 TypeScript Types

### Core Interfaces (`src/types.ts`)

#### Listing
```ts
interface Listing {
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
  reviews: Review[];
  host?: HostInfo;
  tenants?: TenantInfo[];
  isActive?: boolean;
}
```

#### TenantInfo
```ts
interface TenantInfo {
  id: string;
  name: string;
  image: string;
  email: string;
  phone?: string;
  moveInDate: string;
  status: 'active' | 'leaving' | 'moved_out';
  paymentStatus: 'paid' | 'pending' | 'overdue';
}
```

#### HostInfo
```ts
interface HostInfo {
  name: string;
  image: string;
  reviews: number;
  rating: number;
  hostingDuration: string;
  work: string;
  location: string;
  tenantCount?: number;
}
```

#### Roommate
```ts
interface Roommate {
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
```

#### Category
```ts
interface Category {
  label: string;
  icon: string;
  emoji: string;
}
```

### API Types (`src/lib/api/types.ts`)

```ts
interface ApiResponse<T> {
  data: T;
  error: string | null;
}

interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

interface PaginationParams {
  page?: number;
  pageSize?: number;
}

interface ApiError {
  message: string;
  status: number;
  code?: string;
}
```

### Auth Types (`src/lib/AuthContext.tsx`)

```ts
interface MockUser {
  id?: string;
  email?: string;
}

interface MockSession {
  user: MockUser;
}

interface AuthContextType {
  session: MockSession | null;
  user: MockUser | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  signIn: (email: string) => void;
}
```

---

## 📖 Development Guidelines

### Code Style

1. **Functional Components**: Use arrow functions with explicit return types
2. **Destructuring**: Destructure props at function signature
3. **Naming Conventions**:
   - Components: PascalCase
   - Files: PascalCase for components, camelCase for utilities
   - Constants: UPPER_SNAKE_CASE
   - Variables/Functions: camelCase

### Component Structure

```tsx
import React from 'react';
// External imports
// Internal imports
// Type imports

interface ComponentProps {
  // Props definition
}

export const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Hooks
  // Event handlers
  // Render
  return <div />;
};
```

### Best Practices

1. **Lazy Loading**: Always lazy load page components
2. **Error Boundaries**: Implement error boundaries for graceful failures
3. **Accessibility**:
   - Use semantic HTML
   - Include ARIA labels where needed
   - Support keyboard navigation
   - Use `useFocusTrap` for modals
4. **Performance**:
   - Memoize expensive calculations with `useMemo`
   - Use `React.memo()` for pure components
   - Implement virtual scrolling for long lists
5. **Testing**: Write unit tests for hooks and utilities

### Git Commit Convention

Follow conventional commits:
```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
chore: Maintenance tasks
```

Example:
```bash
git commit -m "feat(roommate): add budget filter to roommate search"
```

---

## 🚀 Build & Deployment

### Development

```bash
npm run dev
```

Runs on `http://localhost:3000` with HMR enabled.

### Production Build

```bash
npm run build
```

Outputs optimized bundle to `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally for testing.

### Linting

```bash
npm run lint        # Run ESLint and TypeScript checks
npm run lint:eslint # Run only ESLint
npm run typecheck   # Run TypeScript type checking only
```

### Testing

```bash
npm test            # Run all tests
npm run test:watch  # Run tests in watch mode
```

### Formatting

```bash
npm run format      # Format code with Prettier
```

### Clean

```bash
npm run clean       # Remove dist/ directory
```

---

## 🔧 Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**
   - Ensure `.env.local` is in the root directory
   - Restart dev server after adding variables
   - Prefix client-side variables with `VITE_`

2. **Map Not Rendering**
   - Verify MapTiler API key is valid
   - Check browser console for CORS errors
   - Ensure container has defined height

3. **Authentication Failures**
   - Confirm Supabase URL and anon key are correct
   - Check Supabase project settings for allowed origins

4. **Build Errors**
   - Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
   - Run `npm run clean` before building

5. **Test Failures**
   - Run `npm run typecheck` to verify types
   - Check `src/test/setup.ts` for missing imports

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Vitest Docs](https://vitest.dev/)
- [MapTiler SDK](https://docs.maptiler.com/sdk-js/)

---

*Last Updated: June 25, 2026*
*Version: 2.3.0*

---

# CODE_ANALYSIS_AND_PLAN.md — Codebase Analysis & Implementation Plan

> **Generated:** 2026-06-18
> **Tools run:** `tsc --noEmit` (0 errors), `eslint .` (2 errors, 95 warnings)
> **Files analyzed:** 50+ TypeScript/React files

---

## Tool Results Summary

| Check | Result |
|-------|--------|
| `tsc --noEmit` | **0 errors** ✅ |
| `eslint .` (errors) | **2 errors** ❌ |
| `eslint .` (warnings) | **95 warnings** ⚠️ |

---

## 🔴 Critical Bugs

### Bug 1: `Math.random()` During Render (React Purity Violation)

**File:** `src/components/PropertiesModal.tsx:75-76`

```tsx
const occupied = Math.floor(Math.random() * 10);
const total = occupied + Math.floor(Math.random() * 5) + 1;
```

**Problem:** `Math.random()` called directly inside render function. React 19 strict mode flags this as impure. Each re-render produces different values, making the UI unpredictable.

**Fix:** Move random data generation to `useMemo` with stable seed:

```tsx
const propertyStats = useMemo(() =>
  listings.map((_, index) => {
    const statuses = ['Active', 'Review', 'Maintenance'];
    const occupied = Math.floor(Math.random() * 10);
    const total = occupied + Math.floor(Math.random() * 5) + 1;
    return { status: statuses[index % 3], occupied, total };
  }),
  [listings]
);
```

---

### Bug 2: Missing `useEffect` Dependencies (Stale Closures)

#### 2a. `PhotoCarouselOverlay.tsx:36-46`

```tsx
React.useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') onClose();
  };
  if (isOpen) {
    window.addEventListener('keydown', handleKeyDown);
  }
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [isOpen, currentIndex]); // Missing: nextImage, prevImage, onClose
```

**Risk:** Event listeners capture stale `nextImage`, `prevImage`, and `onClose` references. If these change, keyboard navigation breaks.

**Fix:** Wrap functions in `useCallback` and include in dependency array, or use functional refs.

```tsx
const nextImage = useCallback(() => {
  setCurrentIndex((prev) => (prev + 1) % images.length);
}, [images.length]);

const prevImage = useCallback(() => {
  setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
}, [images.length]);

React.useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') onClose();
  };
  if (isOpen) {
    window.addEventListener('keydown', handleKeyDown);
  }
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [isOpen, nextImage, prevImage, onClose]);
```

#### 2b. `MapTilerView.tsx:77`

```tsx
useEffect(() => {
  // ... uses apiKey ...
}, [lat, lng, title]); // Missing: apiKey
```

**Fix:** Add `apiKey` to dependency array.

#### 2c. `Profile.tsx:168`

```tsx
useEffect(() => {
  checkLandlordAccount();
}, [user]); // Missing: checkLandlordAccount
```

**Fix:** Wrap `checkLandlordAccount` in `useCallback` and add to deps.

---

### Bug 3: ~~`URL.createObjectURL` Memory Leak~~ *(Resolved — Messages.tsx removed)*

The messaging feature (`src/pages/Messages.tsx`) has been removed from the application. This bug is no longer applicable.

---

## 🧹 Code Cleanup

### Cleanup 1: Remove Unused Imports (~50 warnings)

**Files affected** (20+ files):

| File | Unused Import(s) |
|------|-----------------|
| `AnalyticsModal.tsx` | `Calendar` from lucide-react, `listingTitle` variable |
| `AnnouncementsOverlay.tsx` | `Bell` from lucide-react |
| `CameraOverlay.tsx` | `stream` variable (assigned but unused) |
| `Filters.tsx` | `ChevronDown`, `Check` from lucide-react |
| `Hero.tsx` | `Clock`, `Navigation`, `Sparkles`, `onOpenMobileSearch`, `navigate` |
| `HostProfile.tsx` | `ShieldCheck`, `motion` |
| `ListingCardSkeleton.tsx` | `motion` |
| `ListingModal.tsx` | `ChevronLeft`, `ChevronRight`, `startOfToday`, `startOfDay`, `isSameDay`, `isBefore` |
| `ListingDetail.tsx` | `ShieldCheck`, `CalendarIcon`, `Search`, `Layers`, `Home`, `Loader2`, `MessageCircle`, `handleDateSelect`, `nextImage`, `prevImage` |
| `Maps.tsx` | `Navbar`, `SlidersHorizontal`, `MoreHorizontal`, `MapIcon`, `err` |
| `Profile.tsx` | `ChevronLeft`, `Shield`, `Loader2`, `TrendingUp`, `hasLandlordAccount` |
| `RoommateHero.tsx` | `CalendarIcon`, `onOpenMobileSearch` |
| `RoommateModal.tsx` | `Star`, `User` |
| `RoommateSearchDropdown.tsx` | `Award` |
| `SearchDropdown.tsx` | `CornerDownLeft`, `Listing`, `hasResults` |
| `Toast.tsx` | `AnimatePresence` |
| `Home.tsx` | `ArrowRight` |
| `CategoryListings.tsx` | `ChevronLeft` |
| `ManageListings.tsx` | `supabase`, `Loader2` |
| `main.tsx` | `e` variable |
| `vite.config.ts` | `env` variable |

**Action:** Remove all unused imports and variables across these files.

---

### Cleanup 2: Remove Dead ESLint Directive

**File:** `src/components/CreatePostModal.tsx:42`

```tsx
// eslint-disable-next-line react-hooks/exhaustive-deps
```

**Problem:** The directive is unused — no actual ESLint warning was being suppressed.

**Action:** Remove the dead comment.

---

### Cleanup 3: Fix Import Ordering in `App.tsx`

**File:** `src/App.tsx`

**Problem:** The `ScrollToTop` component was defined inline between imports and the main `App` component, breaking convention.

**Status:** ✅ **COMPLETED** — `ScrollToTop` has been extracted to `src/components/ScrollToTop.tsx`

---

## ⚡ Optimization

### Optimization 1: Create Reusable `Modal` Wrapper Component

**Problem:** 10+ components duplicate identical modal backdrop patterns.

**Status:** ✅ **COMPLETED** — `src/components/ui/Modal.tsx` created and implemented.

**Implementation**:
```tsx
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
  className?: string;
}
```

Features:
- Uses shared `modalBackdrop` and `modalContent` animation variants
- Includes `useFocusTrap` for keyboard accessibility
- Configurable max width

---

### Optimization 2: Lazy-Load Heavy Dependencies

**Files affected:**
- `src/components/MapTilerView.tsx` — MapTiler SDK (~500KB+)
- `src/components/AnalyticsModal.tsx` — Recharts library

**Status:** ⏳ **PENDING** — Not yet implemented

---

### Optimization 3: Extract Shared Motion Animation Variants

**Status:** ✅ **COMPLETED** — Shared variants in `src/lib/animations.ts`:

```tsx
export const modalBackdrop = { ... };
export const modalContent = { ... };
export const dropdownReveal = { ... };
```

Used by `Modal.tsx` and can be used by other components.

---

### Optimization 4: ~~Reduce Messages.tsx Re-render Propagation~~ *(Resolved — Messages.tsx removed)*

The messaging feature has been removed from the application. This optimization is no longer applicable.

---

### Optimization 5: Inline SVG → React Components

**File:** `src/components/MapTilerView.tsx:54-68`

**Status:** ⏳ **PENDING** — Not yet implemented

---

## 🔧 Type Safety Improvements

### Issue: 15+ `any` Type Usages

**Files and specific issues:**

| File | Line(s) | Issue | Recommended Type |
|------|---------|-------|-----------------|
| `src/mocks/supabase.ts` | 2 | `export const supabase: any` | Create `MockSupabaseClient` interface |
| `src/lib/AuthContext.tsx` | 7, 12 | `[key: string]: any` | Replace with explicit optional fields |
| `src/components/Filters.tsx` | 89 | `option.id as any` | Proper union type for sortBy |
| `src/components/CreateListingModal.tsx` | 126 | `err: any` | `unknown` + type guard |
| `src/components/EditListingModal.tsx` | 151 | `e: any` | Proper event type |
| `src/components/ListingModal.tsx` | 36, 52 | `e: any` | Proper event types |
| `src/components/MapTilerView.tsx` | 38 | `e: any` | `styleimagemissing` event type |
| `src/pages/Profile.tsx` | 61, 63, 267 | `any[]`, `err: any` | `Listing[]`, `unknown` |
| `src/pages/ManageListings.tsx` | 12, 14 | `any[]`, `err: any` | `Listing[]`, `unknown` |
| `src/pages/Maps.tsx` | 219 | `e: any` | Proper event type |

---

## 📋 Priority Execution Plan

| Priority | Category | Task | Est. Effort | Status |
|----------|----------|------|-------------|--------|
| 🔴 Critical | Bug Fix | Fix `Math.random()` in `PropertiesModal.tsx` | 15min | ⏳ Pending |
| 🔴 Critical | Bug Fix | Fix missing `useEffect` deps in 3 files | 30min | ⏳ Pending |
| 🟡 High | Type Safety | Create mock interfaces, remove `any` types | 1hr | ⏳ Pending |
| 🟡 High | Optimization | ~~Create reusable `Modal` wrapper component~~ | 2hr | ✅ Done |
| 🟡 High | Cleanup | Remove all unused imports and variables (~50 warnings) | 1hr | ⏳ Pending |
| 🟢 Medium | Optimization | ~~Extract shared motion animation variants~~ | 30min | ✅ Done |
| 🟢 Medium | Optimization | Lazy-load heavy deps (`MapTilerView`, `AnalyticsModal`) | 20min | ⏳ Pending |
| 🟢 Medium | Cleanup | ~~Remove dead eslint directive, fix import ordering~~ | 5min | ✅ Done |

**Total estimated effort: ~6 hours** (2.5 hours completed)

---

## Quick Wins (Can Be Done in Parallel)

1. **Remove unused imports** — purely mechanical, can batch-fix all 20+ files
2. **Remove eslint directive** — single line deletion
3. ~~**Move `ScrollToTop`**~~ — ✅ extracted to separate file
4. ~~**Export animation variants**~~ — ✅ no behavior change, pure refactor
5. **Fix `Math.random()`** — local `useMemo` change

---

## Completed Refactors

| Task | Status | Details |
|------|--------|---------|
| Extract `ScrollToTop` to separate file | ✅ Done | `src/components/ScrollToTop.tsx` |
| Create reusable `Modal` component | ✅ Done | `src/components/ui/Modal.tsx` with focus trap |
| Extract shared animation variants | ✅ Done | `src/lib/animations.ts` exports modalBackdrop, modalContent, dropdownReveal |
| Extract profile modals | ✅ Done | `src/components/profile/` (EditProfileModal, LandlordSignupModal, LogoutModal, StatCardModal) |
| ~~Add chat components~~ | ❌ Removed | Chat system removed from application |
| ~~Messaging feature~~ | ❌ Removed | Messages page, API, and mocks removed |
| ~~ListingModal on listing page~~ | ❌ Removed | ListingModal removed from listing page; landlord info displayed directly in sticky sidebar |
| Add tenant management | ✅ Done | `TenantProfileModal`, `TenantsModal`, `TenantInfo` type |
| Add map picker | ✅ Done | `MapPicker.tsx` for interactive location selection |
| Add listing detail modal | ✅ Done | `ListingDetailModal.tsx` for manage dashboard |
| Add legal pages | ✅ Done | `TermsOfService.tsx`, `PrivacyPolicy.tsx` |
| Add focus trap hook | ✅ Done | `src/hooks/useFocusTrap.ts` |
| Add listings filter hook | ✅ Done | `src/hooks/useListingsFilter.ts` with tests |
| Add test infrastructure | ✅ Done | `src/test/setup.ts`, vitest config |
| Add error example | ✅ Done | `src/components/example/ErrorExample.tsx` |

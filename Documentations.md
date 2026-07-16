# Khubo — Comprehensive Project Documentation

**Accommodation & Roommate Finder Platform for Iligan City, Philippines**

> Last Updated: July 16, 2026
> Version: 2.6.0

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Architecture](#3-architecture)
4. [Project Structure](#4-project-structure)
5. [Routing](#5-routing)
6. [Pages](#6-pages)
7. [Components](#7-components)
8. [Custom Hooks](#8-custom-hooks)
9. [Context Providers](#9-context-providers)
10. [API Layer](#10-api-layer)
11. [Mock Data](#11-mock-data)
12. [TypeScript Types](#12-typescript-types)
13. [Styling & Design System](#13-styling--design-system)
14. [Animation System](#14-animation-system)
15. [Map Integration](#15-map-integration)
16. [State Management](#16-state-management)
17. [Testing](#17-testing)
18. [Configuration Files](#18-configuration-files)
19. [Docker Setup](#19-docker-setup)
20. [Environment Variables](#20-environment-variables)
21. [Build & Scripts](#21-build--scripts)
22. [Known Issues & Technical Debt](#22-known-issues--technical-debt)
23. [Development Guidelines](#23-development-guidelines)
24. [Troubleshooting](#24-troubleshooting)

---

## 1. Project Overview

**Khubo** is a full-featured web application designed to help users in Iligan City, Philippines find short-term accommodations, long-term rentals, and compatible roommates. The platform serves three user roles:

- **Travelers/Renters**: Browse and filter property listings, view detailed property information, interact with maps, and contact landlords.
- **Roommate Seekers**: Find compatible roommates based on university, budget, location, and lifestyle preferences. Create and manage roommate posts.
- **Hosts/Landlords**: Manage property listings, view analytics, manage tenants, respond to inquiries, and track reviews.

### Key Features

- 28 property listings across 17 categories specific to Iligan City
- Interactive MapTiler-powered maps with preloading for instant readiness
- 5-step onboarding wizard for new users (includes ID and pre-contractual document upload)
- Dark/light mode toggle with system preference detection
- Camera integration for profile photos and ID verification
- Drag-and-drop file upload with type filtering
- Full-screen photo galleries with keyboard navigation
- Review system with 6-dimension rating breakdowns
- Landlord dashboard with analytics, tenant management, and inquiry tracking
- Toast notification system with 4 severity levels
- Focus trap for accessible modal navigation
- Responsive design from mobile to ultra-wide desktop
- Docker deployment with multi-stage build

### Data Strategy

The application uses a **mock-first architecture** (ADR-002). All API calls fall through to mock data when real requests fail. There is no real backend — Supabase client code exists but only mocks are used. This allows full frontend development and testing without external dependencies.

---

## 2. Tech Stack

### Core

| Technology | Version | Purpose |
|---|---|---|
| React | 19.0 | UI framework with concurrent features and improved hooks |
| TypeScript | 5.8 | Static typing and developer experience |
| React Router DOM | 7.14 | Client-side routing with HashRouter |
| Vite | 6.2 | Build tool, dev server, and HMR |

### Styling

| Technology | Version | Purpose |
|---|---|---|
| Tailwind CSS | 4.1 | Utility-first CSS framework (Vite plugin mode) |
| clsx | 2.1 | Conditional className construction |
| tailwind-merge | 3.5 | Intelligent Tailwind class deduplication |

### UI & Animation

| Technology | Version | Purpose |
|---|---|---|
| Motion (Framer Motion) | 12.23 | Production-ready animation library |
| Lucide React | 0.546 | Consistent icon set |
| Recharts | 3.8 | Charting library for analytics dashboards |
| Zod | 4.4 | TypeScript-first schema validation |

### Maps

| Technology | Version | Purpose |
|---|---|---|
| MapTiler SDK | 4.0 | Interactive maps, markers, and geolocation |

### Code Quality

| Technology | Version | Purpose |
|---|---|---|
| ESLint | 9.39 | JavaScript/TypeScript linting |
| Prettier | 3.8 | Code formatting |
| typescript-eslint | 8.60 | TypeScript-specific linting rules |
| eslint-plugin-react | 7.37 | React-specific linting rules |
| eslint-plugin-react-hooks | 7.1 | React hooks dependency linting |

### Testing

| Technology | Version | Purpose |
|---|---|---|
| Vitest | 4.1 | Blazing fast unit test runner |
| @testing-library/react | 16.3 | React component testing utilities |
| @testing-library/jest-dom | 6.9 | Custom DOM matchers |
| @testing-library/user-event | 14.6 | User interaction simulation |
| jsdom | 29.1 | Browser environment simulation for tests |

### Deployment

| Technology | Version | Purpose |
|---|---|---|
| Docker | - | Multi-stage container build |
| nginx | 1.27 | Production web server with SPA fallback |

---

## 3. Architecture

### Application Architecture Pattern

The application follows a **Feature-Based Architecture** with clear layer separation:

```
┌─────────────────────────────────────────┐
│           Presentation Layer            │
│  (Pages, Components, Modals, Layouts)   │
├─────────────────────────────────────────┤
│            Context Layer                │
│    (Auth, Theme, Landlord, Toast)       │
├─────────────────────────────────────────┤
│             Hook Layer                  │
│   (Custom Hooks for Data & Logic)       │
├─────────────────────────────────────────┤
│           Service Layer                 │
│  (API Functions → Mock Data Fallback)   │
├─────────────────────────────────────────┤
│            Data Layer                   │
│      (Types, Mock Data, Utils)          │
└─────────────────────────────────────────┘
```

### Architectural Decision Records (ADRs)

| ADR | Decision | Rationale |
|---|---|---|
| ADR-001 | HashRouter over BrowserRouter | Static hosting compatibility — no server URL rewriting needed |
| ADR-002 | Mock-first data layer | All API calls fall through to mocks; no real backend needed for development |
| ADR-003 | Context API over Redux | Only 3 global concerns (auth, theme, landlord); no complex state interactions |
| ADR-005 | Vite `@` alias → project root | Intentional but mismatches tsconfig `@/*` → `src/*` — known inconsistency |

### Data Flow

```
User Action → Route Match → Lazy Load Page → Hook Fetch → API Layer → Mock Data → Render
```

Specific flows:
- **Listing Search**: `Home.tsx` → `useListings({search, category})` → `getListings()` → `MOCK_LISTINGS.filter()` → `ListingCard[]`
- **Auth Flow**: `AuthModal` → `AuthContext.signIn(email)` → `{user, session}` → Conditional UI render
- **Roommate Search**: `RoommateFinder` → client-side filter → `RoommateCard[]`
- **Map View**: `Maps.tsx` → `MapTilerView` with markers from mock listing coordinates
- **Booking**: `ListingCard` → `ListingModal` → Date selection → Toast notification (no real booking)

### Provider Hierarchy

```
<ThemeProvider>
  <AuthProvider>
    <LandlordProvider>
      <ToastProvider>
        <Router>
          <ErrorBoundary>
            <Suspense>
              <Routes>...</Routes>
            </Suspense>
          </ErrorBoundary>
        </Router>
      </ToastProvider>
    </LandlordProvider>
  </AuthProvider>
</ThemeProvider>
```

---

## 4. Project Structure

```
khubo/
├── public/                          # Static assets
│   ├── khubo Logo.png              # App favicon/logo
│   ├── homepage-screenshot.png     # OG image
│   ├── bg_1.png, bg_2.png, bg_3.png # Background images
│
├── src/
│   ├── components/                  # Reusable UI components (~45 files)
│   │   ├── errors/                  # Error handling
│   │   │   ├── ErrorBoundary.tsx    # Class component for catching render errors
│   │   │   └── ErrorExample.tsx     # Development example for error testing
│   │   │
│   │   ├── profile/                 # Profile-related modals
│   │   │   ├── EditProfileModal.tsx # Profile edit form
│   │   │   ├── LandlordSignupModal.tsx # Landlord registration/login
│   │   │   ├── LogoutModal.tsx      # Logout confirmation
│   │   │   └── StatCardModal.tsx    # Stat card detail views
│   │   │
│   │   ├── ui/                      # Shared UI primitives
│   │   │   ├── Modal.tsx            # Reusable animated modal with focus trap
│   │   │   └── ErrorScreen.tsx      # Full-page error display with actions
│   │   │
│   │   ├── AnalyticsModal.tsx       # Recharts line chart for revenue trends
│   │   ├── AnnouncementsOverlay.tsx # App news and updates overlay
│   │   ├── AuthModal.tsx            # Login/signup modal dialog
│   │   ├── BottomNav.tsx            # Mobile-friendly bottom navigation bar
│   │   ├── CameraOverlay.tsx        # Full-screen camera with capture and native fallback
│   │   ├── Categories.tsx           # Horizontal scrollable category selector
│   │   ├── CreateListingModal.tsx   # Form for creating new listings
│   │   ├── CreatePostModal.tsx      # Form for creating roommate posts
│   │   ├── DateScrollPicker.tsx     # Custom date selection (Month/Day/Year)
│   │   ├── EditListingModal.tsx     # Form for editing existing listings
│   │   ├── Filters.tsx              # Multi-option filter panel
│   │   ├── Footer.tsx               # Site footer with links
│   │   ├── Hero.tsx                 # Landing page hero section with CTA
│   │   ├── HostProfile.tsx          # Landlord info display card
│   │   ├── InquiriesModal.tsx       # Guest inquiries display
│   │   ├── ItemsPopup.tsx           # Reusable popup with item grid
│   │   ├── LandlordListingsModal.tsx # Landlord's other listings modal
│   │   ├── ListingCard.tsx          # Card displaying listing preview
│   │   ├── ListingCardSkeleton.tsx  # Loading skeleton for listing cards
│   │   ├── ListingCarousel.tsx      # Horizontal scrollable listing row
│   │   ├── ListingDetailModal.tsx   # Listing detail for manage dashboard
│   │   ├── ListingDetailSkeleton.tsx # Loading skeleton for detail view
│   │   ├── ListingModal.tsx         # Detailed view with booking options
│   │   ├── ListingsPopup.tsx        # Modal popup with grid of listing cards
│   │   ├── MapPicker.tsx            # Interactive location picker for listing creation
│   │   ├── MapTilerView.tsx         # Interactive MapTiler SDK map
│   │   ├── Navbar.tsx               # Top navigation with logo, search, user menu
│   │   ├── NotificationDialog.tsx   # Persistent notification history
│   │   ├── OccupationStep.tsx       # Onboarding step 2 — occupation selection
│   │   ├── OnboardingFlow.tsx       # 5-step wizard orchestrator
│   │   ├── OnboardingModal.tsx      # Onboarding step 1 — identity collection
│   │   ├── PhotoCarouselOverlay.tsx # Full-screen image gallery with keyboard nav
│   │   ├── PropertiesModal.tsx      # Properties overview modal
│   │   ├── ReviewBreakdown.tsx      # 6-dimension rating visualization
│   │   ├── ReviewProfile.tsx        # Profile review display
│   │   ├── RoommateCard.tsx         # Profile card for roommate candidates
│   │   ├── RoommateCardSkeleton.tsx # Loading skeleton for roommate cards
│   │   ├── RoommateHero.tsx         # Header section for roommate finder
│   │   ├── RoommateModal.tsx        # Detailed roommate profile modal
│   │   ├── RoommatePreferences.tsx  # Lifestyle preference selection
│   │   ├── RoommateSearchDropdown.tsx # Filter dropdown for roommate search
│   │   ├── RoommatesPopup.tsx       # Modal popup with grid of roommate cards
│   │   ├── ScrollToTop.tsx          # Scrolls to top on route change
│   │   ├── SearchDropdown.tsx       # Search input with autocomplete
│   │   ├── SearchHistory.tsx        # Recent searches display
│   │   ├── TenantsModal.tsx         # Tenants list modal
│   │   ├── TenantProfileModal.tsx   # Tenant detail with status/payment tracking
│   │   ├── ThemeToggle.tsx          # Dark/light mode switch
│   │   ├── Toast.tsx                # Notification popup with auto-dismiss
│   │   ├── ToastProvider.tsx        # Toast context provider
│   │   ├── UploadModal.tsx          # Drag-and-drop file upload modal
│   │   └── VerificationStep.tsx     # Onboarding step 3 — ID upload
│   │
│   ├── hooks/                       # Custom React hooks (8 hooks)
│   │   ├── useFocusTrap.ts          # Keyboard focus trap for modals
│   │   ├── useIsAnyModalOpen.ts     # MutationObserver-based modal detection
│   │   ├── useListing.ts            # Single listing fetcher by ID
│   │   ├── useListings.ts           # Listings collection fetcher with params
│   │   ├── useListingsFilter.ts     # Client-side filter/sort pipeline
│   │   ├── useListingsFilter.test.ts # Tests for filter hook
│   │   ├── useMediaQuery.ts         # Responsive media query hook
│   │   └── useSearchHistory.ts      # localStorage-backed search history
│   │
│   ├── lib/                         # Core libraries and contexts
│   │   ├── api/                     # API integration layer (mock-backed)
│   │   │   ├── auth.ts              # Authentication operations
│   │   │   ├── listings.ts          # Listing CRUD operations
│   │   │   ├── roommates.ts         # Roommate operations
│   │   │   └── index.ts             # Barrel export
│   │   │
│   │   ├── AuthContext.tsx           # Authentication state provider
│   │   ├── LandlordContext.tsx       # Landlord mode state provider
│   │   ├── ThemeContext.tsx          # Dark/light theme provider
│   │   ├── constants.ts             # App-wide constants
│   │   ├── mapPreloader.ts          # Map SDK singleton preloader
│   │   ├── toastConfig.ts           # Toast notification configuration
│   │   └── utils.ts                 # Utility functions (cn)
│   │
│   ├── mocks/                       # Mock data for development
│   │   ├── listings.ts              # 28 seed listings for Iligan City
│   │   ├── reservations.ts          # 3 mock reservation records
│   │   └── roommates.ts             # 10 mock roommate profiles
│   │
│   ├── pages/                       # Route-level components (13 pages)
│   │   ├── Home.tsx                 # Landing page with search, categories, carousels
│   │   ├── ListingDetail.tsx        # Full property view with booking sidebar
│   │   ├── CategoryListings.tsx     # Filtered listing grid by category
│   │   ├── Maps.tsx                 # Map-based listing discovery
│   │   ├── RoommateFinder.tsx       # Roommate browse and filter
│   │   ├── Profile.tsx              # User account dashboard
│   │   ├── ManageListings.tsx       # Landlord listing dashboard
│   │   ├── LandlordProperties.tsx   # Property statistics table
│   │   ├── LandlordTenants.tsx      # Tenant management table
│   │   ├── LandlordReviews.tsx      # Review management across properties
│   │   ├── ToRate.tsx               # Tenant rating submission
│   │   ├── TermsOfService.tsx       # Static legal terms (10 sections)
│   │   └── PrivacyPolicy.tsx        # Static privacy policy (9 sections)
│   │
│   ├── test/                        # Test infrastructure
│   │   └── setup.ts                 # Vitest setup with @testing-library/jest-dom
│   │
│   ├── App.tsx                      # Root component with routing and providers
│   ├── main.tsx                     # Application entry point
│   ├── index.css                    # Global styles and Tailwind imports
│   ├── types.ts                     # Shared TypeScript type definitions
│   └── vite-env.d.ts               # Vite environment type declarations
│
├── index.html                       # HTML template with meta tags and preconnects
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
├── vite.config.ts                   # Vite + Vitest configuration
├── tailwind.config.ts               # Tailwind CSS theme configuration
├── eslint.config.js                 # ESLint configuration
├── Dockerfile                       # Multi-stage Docker build
├── docker-compose.yml               # Docker Compose configuration
├── .gitignore                       # Git ignore rules
├── .dockerignore                    # Docker ignore rules
├── .env                             # Environment variables (gitignored)
├── README.md                        # User-facing documentation
├── AGENTS.md                        # AI agent instructions
├── Documentations.md                # This file — comprehensive technical docs
└── dist/                            # Production build output
```

---

## 5. Routing

The application uses **HashRouter** (ADR-001) with all page components **lazy-loaded** via `React.lazy()` for code splitting.

| Route | Component | Description |
|---|---|---|
| `/` | `Home` | Landing page with search, categories, and listing carousels |
| `/listing/:id` | `ListingDetail` | Full property view with photo gallery, reviews, map, and booking sidebar |
| `/category/:categoryId` | `CategoryListings` | Listings filtered by category (e.g., "boarding-house", "apartment") |
| `/maps` | `Maps` | Split-panel map view with sidebar listing cards |
| `/roommate` | `RoommateFinder` | Roommate browse with hero search, tag filters, and post creation |
| `/profile` | `Profile` | User dashboard with stats, settings, and landlord/tenant mode toggle |
| `/manage-listings` | `ManageListings` | Landlord dashboard for managing properties |
| `/landlord/properties` | `LandlordProperties` | Property statistics table with occupancy data |
| `/landlord/tenants` | `LandlordTenants` | Tenant management with room filters and contact info |
| `/landlord/reviews` | `LandlordReviews` | Review management across all properties |
| `/to-rate` | `ToRate` | Tenant rating submission with anonymous mode |
| `/terms` | `TermsOfService` | Static Terms of Service page (10 sections) |
| `/privacy` | `PrivacyPolicy` | Static Privacy Policy page (9 sections) |

### Route Protection

There is no formal route guard system. Authentication state is managed via `AuthContext` and components conditionally render based on `user` state. The `ManageListings` page redirects to home if no user is logged in.

---

## 6. Pages

### 6.1 Home Page (`src/pages/Home.tsx` — 258 lines)

The landing page with search, category browsing, and listing carousels.

**Key Sections:**
- **Hero Section**: Full-width banner with integrated search (location, date, budget fields)
- **Search History**: localStorage-backed recent searches (max 5) with add/remove/select
- **Sticky Search Bar**: `IntersectionObserver`-based header that transitions between category tabs and full search bar when scrolled past 70px
- **Category Filter Tabs**: 17 categories + ALL tab — Boarding House, Apartment, Bed Spacer, Dormitory, Room 4 Rent, Condominium, All Males, Shared, All Females, No Pets, Quiet Hours, Free Water, Free Electricity, No Curfew, Gated, Study Area, Near MSU-IIT
- **Listing Carousels**: Three horizontal carousels — "Recommended" (listings 0-21), "Top Listing" (7-28), "Near MSU-IIT" (14-35)
- **Map Preloader**: Hidden off-screen MapTiler container initialized on Home for instant map readiness when user navigates to `/maps`

**Notable Implementation:**
- Uses two `IntersectionObserver` instances for sticky header detection
- Map preloading uses a callback ref pattern for lazy initialization
- Click-outside handler closes sticky dropdowns
- Responsive card widths defined via CSS `calc()` expressions

### 6.2 Listing Detail Page (`src/pages/ListingDetail.tsx` — 728 lines)

Full-featured property detail page with all property information.

**Photo Gallery:**
- **Mobile**: Full-width hero carousel (55vh) with CSS snap scrolling, image indicator badge (`currentIndex / total`), tap to open full gallery
- **Desktop**: 5-image grid (`grid-cols-4 grid-rows-2`) with first image spanning 2x2, hover zoom effect, "Show all photos" button
- Fallback images from Unsplash when gallery has fewer than 5 images

**PhotoCarouselOverlay** (`src/components/PhotoCarouselOverlay.tsx`):
- Full-screen image viewer with backdrop blur
- Left/right arrow navigation buttons
- Keyboard support: ArrowRight, ArrowLeft, Escape
- Image counter badge
- Thumbnail strip at bottom for direct image selection
- Click outside to close

**Content Sections:**
- About This Place — description with `whitespace-pre-wrap`
- Amenities — 2-column grid with circular icon + label (10 amenities); expandable "Show all" / "Show less"
- Pre-contractual Document — PDF download card for lease agreement
- Reviews — 2-column grid of review cards with user avatar, name, verified badge, comment, date, like/share buttons; "Show all N reviews" toggle (first 4 shown)

**ReviewBreakdown** (`src/components/ReviewBreakdown.tsx`):
- Left column: Overall rating with star distribution bar chart (5-star to 1-star percentages)
- Right column: 6-dimension rating grid (Cleanliness, Accuracy, Move-in, Communication, Location, Value) with scores
- Responsive: 2 cols mobile → 3 cols sm → 6 cols lg

**Host Profile Card** (`src/components/HostProfile.tsx`):
- Avatar with verified badge, name, "Landlord" subtitle
- Stats grid: Reviews count, Rating, Hosting Duration, Tenants count
- Info rows: Work, Location with icons
- "Message Landlord" button (triggers auth check if not authenticated)

**Interactive Map:**
- Inline MapTiler map with location marker (540px tall)
- Hover overlay with "Click to Expand" pill
- Full-screen map modal with backdrop blur, location pill with coordinates, close button

**Booking Sidebar** (Desktop, `lg+` breakpoint):
- Sticky positioning at `top-[100px]`
- Price display with rating badge
- Landlord Profile card with avatar, name, verified badge
- Contact section with phone (tel link), email (mailto link), social media icons (Instagram, Facebook, Twitter)
- "Contact Owner" button (opens auth modal for unregistered users)

**Mobile Action Bar:**
- Fixed bottom bar with "Contact Owner" button
- Unregistered users: opens auth modal
- Registered users: shows toast "Message sent to owner!"

### 6.3 Category Listings Page (`src/pages/CategoryListings.tsx` — 91 lines)

Displays listings filtered by the URL parameter `categoryId`.

**Filtering Logic:**
- `recommended` — first 21 listings
- `top-listing` — listings 7-28
- `near-msu-iit` — listings with category "Near MSU-IIT"
- Default — exact kebab-case match against `listing.category`

**Features:**
- Sticky header with back button and dynamic page title
- Responsive listing grid (1-5 columns)
- 12 skeleton cards during loading
- Empty state with "No listings found" message

### 6.4 Maps Page (`src/pages/Maps.tsx` — 767 lines)

Split-panel map-based listing discovery page.

**Layout:**
- Collapsible sidebar (left) + full-width MapTiler map (right)
- Sidebar auto-collapses on mobile (`window.innerWidth < 768`)
- Map auto-resizes after sidebar transition (305ms delay)

**Map Features:**
- Custom SVG pin markers (red pin with white circle) for each listing with lat/lng
- Marker popups: Thumbnail image, title, price on hover/click
- Fly-to animation on marker click (zoom 16, 1500ms duration)
- Deselect on map click, deselect on zoom out (zoom < 15)

**Map Preloader Integration:**
- Takes pre-initialized map from Home page's hidden preloader via `takeMap()`
- Re-parents preloaded container into layout for instant map readiness
- Falls back to creating new map if preloader unavailable
- Resets preloader on unmount via `resetMapPreload()`

**Sidebar:**
- Desktop: Scrollable listing cards with active-state ring highlight synced to selected marker
- Mobile: Bottom overlay with horizontally scrollable listing cards, snap-to-center
- Collapse/expand toggle button with chevron

**Search Bar:**
- Location dropdown (quick-select popular locations)
- Budget dropdown (preset ranges: P1k-P3k, P3k-P5k, P5k+)
- Text search with SearchDropdown autocomplete
- Clear-all-filters button when selections active

### 6.5 Roommate Finder Page (`src/pages/RoommateFinder.tsx` — 911 lines)

Roommate browse and filter with dual posting modes.

**Key Sections:**
- **Roommate Hero**: Full-page hero with search interface
- **Sticky Header**: Toggles between tag pills (15 filter tags) and full search bar
- **Post Creation**: Profile avatar + input that opens `CreatePostModal`; toggle between "Applying as Roommate" and "Finding a roommate"
- **"Finding a roommate" Carousel**: Horizontal scrollable cards of filtered roommates (first 10)
- **"Applying as Roommate" Carousel**: Reversed list of roommates with "Accept as Roommate" action
- **Empty State**: "No roommates found" with clear-filters button

**Filtering:**
- `useMemo`-based pipeline filtering by tag match, name, bio, preferred place, tags, gender, and university
- Tags: ALL, Shared, Bed Spacer, No Curfew, Gated, Condominium, Boarding House, No Pets, Quiet Hours, Free Water, Apartment, Free Electricity, Near MSU-IIT, All Males, All Females

**localStorage Persistence:**
- Custom roommate posts saved to `localStorage` key `custom_roommates`
- Survives page reloads

### 6.6 Profile Page (`src/pages/Profile.tsx` — 1042 lines)

User account dashboard with dual landlord/tenant identity.

**Hero Banner:**
- Full-width background image with gradient overlay
- Profile card overlay with avatar (online/offline status dot), name, school/age/gender details, location
- Editable bio/quote
- Editable personality tags (add/remove with inline input, persisted in localStorage)

**Stat Cards (dual mode):**
- **Landlord Mode**: Properties (4 Listed), Tenants (12 Active) — navigate to dedicated pages
- **Tenant Mode**: Saved (12 Houses), Reservation (2 Houses), Roommate Applications (6), Invitations (0 Received)

**Properties Section:**
- **Landlord**: List of host's listings with image, title, location, rating, amenities, availability badge, price; edit/toggle visibility; context menu (edit/copy link); tenant avatars; "Add Listing" button
- **Tenant**: Reservation cards from mock data

**Settings & Preferences:**
- Landlord mode toggle switch
- Menu items: Notifications, Account Settings, Help Center, Terms of Service, Privacy Policy
- Profile edits require explicit Save button click to persist changes
- Logout button with confirmation modal

**Modals (10+):**
- EditProfileModal, AnnouncementsOverlay, InquiriesModal, ListingDetailModal, CreateListingModal, EditListingModal, StatCardModal, TenantProfileModal, LogoutModal, LandlordSignupModal, PhotoCarouselOverlay

### 6.7 Manage Listings Page (`src/pages/ManageListings.tsx` — 177 lines)

Landlord dashboard for managing properties.

**Features:**
- Loading skeleton (3 cards)
- Empty state
- Listing cards with: thumbnail, title, location, rating badge, amenities, price, "Edit Listing" and "Manage Tenants" buttons
- EditListingModal integration
- Auth guard: redirects to home if not logged in

### 6.8 Landlord Properties Page (`src/pages/LandlordProperties.tsx` — 221 lines)

Property statistics table for landlords.

**Features:**
- "Add Listing" button opening CreateListingModal
- Data table with columns: No., Property, Location, Category, Price, Rating, Status (active/unlisted badge), Vacancy (occupied/total)
- Seeded random occupancy data (deterministic via `Math.sin`)
- Falls back to sample listings when no real listings exist

### 6.9 Landlord Tenants Page (`src/pages/LandlordTenants.tsx` — 279 lines)

Tenant management with room filters and contact info.

**Features:**
- Room filter bar: Horizontally scrollable room tags with "All Rooms" button and dynamic "+ Add Room" inline input
- Tenant table columns: Client, Room No., Balance (Paid/Unpaid toggle), Email (with copy), Phone (with copy), Social (Instagram, X, Facebook icons)
- Add Tenant button opening AddTenantModal
- ConfirmDialog for balance status changes
- 5 mock tenants with full contact info

### 6.10 Landlord Reviews Page (`src/pages/LandlordReviews.tsx` — 347 lines)

Review management across all properties.

**Features:**
- Header with total review count badge
- Property cards with collapsible review sections
- Individual reviews with: user avatar, star rating, date, comment, delete button
- Delete confirmation modal with warning icon
- Delete animation (opacity fade before removal)
- 4 sample listings with 10 total reviews

### 6.11 To Rate Page (`src/pages/ToRate.tsx` — 373 lines)

Tenant rating submission with anonymous mode.

**Features:**
- Property cards from reservation data
- Rating form with three states: collapsed, expanded, submitted
- Identity selector: Real name (from localStorage) or anonymous toggle
- Anonymous name generation using hash-based deterministic algorithm
- Anonymous avatar generation using dicebear API
- 5-star interactive rating with hover states
- Comment textarea
- Submit validation and toast feedback

### 6.12 Terms of Service Page (`src/pages/TermsOfService.tsx` — 98 lines)

Static legal page with 10 numbered sections:
1. Acceptance of Terms
2. Description of Service
3. User Accounts
4. User Responsibilities
5. Listings and Transactions
6. Intellectual Property
7. Limitation of Liability
8. Termination
9. Changes to Terms
10. Contact Us (support@khubo.com)

### 6.13 Privacy Policy Page (`src/pages/PrivacyPolicy.tsx` — 91 lines)

Static legal page with 9 numbered sections:
1. Information We Collect
2. How We Use Your Information
3. Information Sharing
4. Data Security
5. Your Rights
6. Cookies and Tracking
7. Children's Privacy
8. Changes to This Policy
9. Contact Us (privacy@khubo.com)

---

## 7. Components

### Layout Components

| Component | File | Description |
|---|---|---|
| `Navbar` | `Navbar.tsx` | Top navigation with logo, search, and user menu |
| `BottomNav` | `BottomNav.tsx` | Mobile-friendly bottom navigation bar with 5 tabs (Home, Maps, Plus, Roommate, Profile) |
| `Footer` | `Footer.tsx` | Site footer with links and copyright |
| `Hero` | `Hero.tsx` | Landing page hero section with integrated search bar |
| `ScrollToTop` | `ScrollToTop.tsx` | Scrolls to top on route change |

### Listing Components

| Component | File | Description |
|---|---|---|
| `ListingCard` | `ListingCard.tsx` | Card displaying listing preview with image, title, location, price, rating |
| `ListingCardSkeleton` | `ListingCardSkeleton.tsx` | Loading skeleton with pulsing placeholders |
| `ListingCarousel` | `ListingCarousel.tsx` | Horizontal scrollable row of listings with navigation arrows |
| `ListingDetailSkeleton` | `ListingDetailSkeleton.tsx` | Loading skeleton for full detail view |
| `ListingsPopup` | `ListingsPopup.tsx` | Reusable modal popup with grid of listing cards |
| `ListingModal` | `ListingModal.tsx` | Landlord profile modal with contact info, stats, and inquiry actions |
| `ListingDetailModal` | `ListingDetailModal.tsx` | Listing detail for manage dashboard |
| `PhotoCarouselOverlay` | `PhotoCarouselOverlay.tsx` | Full-screen image gallery with keyboard navigation and thumbnails |

### Roommate Components

| Component | File | Description |
|---|---|---|
| `RoommateCard` | `RoommateCard.tsx` | Profile card for roommate candidates |
| `RoommateCardSkeleton` | `RoommateCardSkeleton.tsx` | Loading skeleton for roommate cards |
| `RoommateHero` | `RoommateHero.tsx` | Header section for roommate finder with search |
| `RoommateModal` | `RoommateModal.tsx` | Detailed roommate profile modal |
| `RoommatePreferences` | `RoommatePreferences.tsx` | Wizard step for lifestyle preference selection |
| `RoommateSearchDropdown` | `RoommateSearchDropdown.tsx` | Filter dropdown for roommate search |
| `RoommatesPopup` | `RoommatesPopup.tsx` | Reusable modal popup with grid of roommate cards |

### Profile Components

| Component | File | Description |
|---|---|---|
| `EditProfileModal` | `profile/EditProfileModal.tsx` | Profile edit form with avatar, name, bio, tags |
| `LandlordSignupModal` | `profile/LandlordSignupModal.tsx` | Landlord registration/login modal |
| `LogoutModal` | `profile/LogoutModal.tsx` | Logout confirmation dialog |
| `StatCardModal` | `profile/StatCardModal.tsx` | Stat detail overlay for dashboard cards |

### Onboarding Components

| Component | File | Description |
|---|---|---|
| `OnboardingFlow` | `OnboardingFlow.tsx` | 5-step wizard orchestrator |
| `OnboardingModal` | `OnboardingModal.tsx` | Step 1 — identity, address, profile photo |
| `OccupationStep` | `OccupationStep.tsx` | Step 2 — Student / Professional / Working Student |
| `VerificationStep` | `VerificationStep.tsx` | Step 3 — Government/school ID upload + optional pre-contractual PDF (max 50MB total) |
| `ReviewProfile` | `ReviewProfile.tsx` | Step 4 — Review all data with inline editing |

### Map Components

| Component | File | Description |
|---|---|---|
| `MapTilerView` | `MapTilerView.tsx` | Interactive MapTiler SDK map with markers, popups, fly-to animation |
| `MapPicker` | `MapPicker.tsx` | Interactive location picker for listing creation/editing |

### UI Primitives

| Component | File | Description |
|---|---|---|
| `Modal` | `ui/Modal.tsx` | Reusable animated modal with focus trap, configurable max width |
| `ErrorScreen` | `ui/ErrorScreen.tsx` | Full-page error display with retry/redirect actions |

### Error Handling

| Component | File | Description |
|---|---|---|
| `ErrorBoundary` | `errors/ErrorBoundary.tsx` | Class component for catching render errors with fallback UI |
| `ErrorExample` | `example/ErrorExample.tsx` | Development example for testing error boundaries |

### Utility Components

| Component | File | Description |
|---|---|---|
| `AnnouncementsOverlay` | `AnnouncementsOverlay.tsx` | Modal overlay displaying app news with "New" badges |
| `AuthModal` | `AuthModal.tsx` | Login/signup modal dialog |
| `CameraOverlay` | `CameraOverlay.tsx` | Full-screen camera view with capture, front/rear toggle, native fallback |
| `Categories` | `Categories.tsx` | Horizontal scrollable category selector |
| `CreateListingModal` | `CreateListingModal.tsx` | Form for creating new listings with custom categories and pre-contractual doc upload |
| `CreatePostModal` | `CreatePostModal.tsx` | Form for creating roommate posts |
| `DateScrollPicker` | `DateScrollPicker.tsx` | Custom date selection (Month/Day/Year with snap-to-center) |
| `EditListingModal` | `EditListingModal.tsx` | Form for editing existing listings |
| `Filters` | `Filters.tsx` | Multi-option filter panel |
| `HostProfile` | `HostProfile.tsx` | Host information display card |
| `InquiriesModal` | `InquiriesModal.tsx` | Guest inquiries display with tab filtering |
| `ItemsPopup` | `ItemsPopup.tsx` | Reusable popup with item grid |
| `LandlordListingsModal` | `LandlordListingsModal.tsx` | Landlord's other listings modal |
| `NotificationDialog` | `NotificationDialog.tsx` | Persistent notification history with timestamps |
| `PropertiesModal` | `PropertiesModal.tsx` | Properties overview modal |
| `ReviewBreakdown` | `ReviewBreakdown.tsx` | 6-dimension rating distribution visualization |
| `ReviewProfile` | `ReviewProfile.tsx` | Profile review display |
| `SearchDropdown` | `SearchDropdown.tsx` | Search input with real-time autocomplete |
| `SearchHistory` | `SearchHistory.tsx` | Recent searches display with add/remove |
| `TenantsModal` | `TenantsModal.tsx` | Tenants list modal |
| `TenantProfileModal` | `TenantProfileModal.tsx` | Tenant management with status and payment tracking |
| `ThemeToggle` | `ThemeToggle.tsx` | Dark/light mode switch |
| `Toast` | `Toast.tsx` | Notification popup with 3s auto-dismiss |
| `ToastProvider` | `ToastProvider.tsx` | Toast context provider |
| `UploadModal` | `UploadModal.tsx` | Drag-and-drop file upload with type filtering and size validation |

---

## 8. Custom Hooks

### useFocusTrap (`src/hooks/useFocusTrap.ts`)

Confines keyboard Tab/Shift+Tab within a modal container. Restores focus to the previously focused element on unmount. Accepts an optional `onEscape` callback for close-on-escape behavior.

```ts
useFocusTrap(isActive: boolean, containerRef: RefObject, onEscape?: () => void)
```

### useIsAnyModalOpen (`src/hooks/useIsAnyModalOpen.ts`)

Uses `MutationObserver` to detect if any modal dialog is currently open in the DOM. Checks for `[role="dialog"]`, `.fixed.inset-0.z-50`, and `.fixed.inset-0.z-modal-backdrop` selectors.

```ts
useIsAnyModalOpen(): boolean
```

### useListing (`src/hooks/useListing.ts`)

Fetches a single listing by ID. Returns `{ listing, loading }`. Uses cancellation flag to prevent stale updates.

```ts
useListing(id: string | undefined): { listing: Listing | null, loading: boolean }
```

### useListings (`src/hooks/useListings.ts`)

Fetches all listings with optional filter params (category, search, minPrice, maxPrice). Uses `JSON.stringify(params)` as a stable dependency key for re-fetching.

```ts
useListings(params?: { category?, search?, minPrice?, maxPrice? }): { listings: Listing[], loading: boolean, error: string | null }
```

### useListingsFilter (`src/hooks/useListingsFilter.ts`)

Client-side filter/sort pipeline using `useMemo`. Filter chain: category → price range → min rating → search query → sort. Returns a filtered/sorted copy (never mutates original).

```ts
useListingsFilter(listings: Listing[], filters: FilterState, searchQuery?: string, selectedCategory?: string): Listing[]
```

### useMediaQuery (`src/hooks/useMediaQuery.ts`)

Responsive media query hook. Listens for media query changes and returns current match state.

```ts
useMediaQuery(query: string): boolean
```

### useSearchHistory (`src/hooks/useSearchHistory.ts`)

Manages a list of recent search queries (max 5) persisted in localStorage. Methods: `addSearch` (prepends deduplicated entry), `removeSearch` (filters it out).

```ts
useSearchHistory(): { history: string[], addSearch: (q: string) => void, removeSearch: (q: string) => void }
```

---

## 9. Context Providers

### AuthContext (`src/lib/AuthContext.tsx`)

Provides authentication state globally. Currently uses mock auth — auto-signs in a demo user on mount.

```ts
interface AuthContextType {
  session: MockSession | null;
  user: MockUser | null;
  isLoading: boolean;
  signIn: (email: string) => void;
  signOut: () => Promise<void>;
}

// Mock types
interface MockUser { id?: string; email?: string; }
interface MockSession { user: MockUser; }
```

**Behavior:**
- `signIn(email)`: Sets mock user with provided email
- `signOut()`: Clears session and user to null
- Auto-signs in `demo@khubo.ph` on mount

### ThemeContext (`src/lib/ThemeContext.tsx`)

Provides dark/light theme toggle. Persists preference to localStorage. Respects OS-level `prefers-color-scheme: dark` as default.

```ts
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}
```

**Behavior:**
- Toggles `dark` class on `document.documentElement`
- Stores preference in localStorage key `khubo-theme`
- Default: system preference, fallback to light

### LandlordContext (`src/lib/LandlordContext.tsx`)

Tracks landlord mode toggle state across the application.

```ts
interface LandlordContextType {
  isLandlord: boolean;
  setIsLandlord: (value: boolean) => void;
}
```

### ToastProvider (`src/components/ToastProvider.tsx`)

Manages toast notification state. Portals toasts to document body.

```ts
interface ToastContextType {
  addToast: (toast: ToastProps) => void;
  removeToast: (id: string) => void;
}
```

**Toast Types:** success, error, info, warning — each with distinct icon, background, and text colors (configured in `src/lib/toastConfig.ts`).

---

## 10. API Layer

All API functions use mock data with simulated delays (300-500ms). The API layer is designed to be easily swapped for real HTTP calls.

### API Functions

**`src/lib/api/listings.ts`:**

| Function | Signature | Description |
|---|---|---|
| `getListings` | `(params?) => Promise<{data: Listing[], error: null}>` | Fetch listings with optional category/search/price filters |
| `getListing` | `(id: string) => Promise<{data: Listing \| null, error: null}>` | Fetch single listing by ID |
| `createListing` | `(listing) => Promise<{data: Listing, error: null}>` | Create new listing (mock) |
| `updateListing` | `(id, updates) => Promise<{data: Listing \| null, error: string \| null}>` | Update existing listing |
| `deleteListing` | `(id) => Promise<{data: null, error: null}>` | Delete listing (mock) |

**`src/lib/api/roommates.ts`:**

| Function | Signature | Description |
|---|---|---|
| `getRoommates` | `(params?) => Promise<{data: Roommate[], error: null}>` | Fetch roommates with optional search/gender/university filters |
| `getRoommate` | `(id: string) => Promise<{data: Roommate \| null, error: null}>` | Fetch single roommate by ID |
| `createRoommateRequest` | `(id, message) => Promise<{data: {success: true}, error: null}>` | Create roommate request (mock) |

### Simulated Delays

- `getListings`, `getRoommates`: 500ms delay
- `getListing`, `getRoommate`, `createListing`, `updateListing`, `deleteListing`: 300ms delay

---

## 11. Mock Data

### Listings (`src/mocks/listings.ts`)

- **28 seed listings** for Iligan City with real Unsplash images
- **18 categories** (ALL + 17 specific types)
- Listing IDs: `k1` through `k28`; reviews: `r1` through `r4`; users: `u1` through `u4`
- New listings created via `createListing` generate IDs using `'mock_' + Date.now()`
- Each listing includes: id, title, location, description, price, rating, image, gallery, category, date, amenities, lat/lng, preContractualDoc, reviews, host info, tenant info

### Roommates (`src/mocks/roommates.ts`)

- **10 seed roommate profiles** with DiceBear avatar images
- Each profile includes: name, age, gender, university, location, bio, tags, budget range, preferred place
- Universities: MSU-IIT
- Genders: Male, Female

### Reservations (`src/mocks/reservations.ts`)

- **3 mock reservation records** for tenant view
- Each includes: title, location, image, gallery, price, rating, review count, amenities, availability, tenant avatars

---

## 12. TypeScript Types

### Core Types (`src/types.ts`)

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
  preContractualDoc?: string;
  reviews: Review[];
  host?: HostInfo;
  tenants?: TenantInfo[];
  isActive?: boolean;
}

interface Review {
  id: string;
  userName: string;
  userImage: string;
  date: string;
  comment: string;
  rating: number;
}

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

interface Category {
  label: string;
  icon: string;
  emoji: string;
}

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
  hidePhone?: boolean;
  hideEmail?: boolean;
  hideSocialLinks?: boolean;
}

interface FilterState {
  minPrice: number;
  maxPrice: number;
  minRating: number;
  sortBy: 'relevance' | 'price-low' | 'price-high' | 'rating';
}
```

### Reservation Types (`src/mocks/reservations.ts`)

```ts
interface Tenant {
  name: string;
  image: string;
}

interface Reservation {
  id: string;
  title: string;
  location: string;
  image: string;
  gallery: string[];
  price: number;
  rating: number;
  reviewCount: number;
  amenities: string[];
  available: string;
  tenants: Tenant[];
}
```

---

## 13. Styling & Design System

### Tailwind CSS v4

The project uses **Tailwind CSS v4** with the Vite plugin (`@tailwindcss/vite`). Configuration is split between:
- `tailwind.config.ts` — theme extensions (colors, spacing, shadows, etc.)
- `src/index.css` — CSS-based `@theme` variables and custom utilities

### Color Scheme

| Token | Light Mode | Dark Mode | Usage |
|---|---|---|---|
| Primary | `#17294F` | `#17294F` | Brand color, CTAs, headers |
| Accent | `#2252D6` | `#2252D6` | Secondary actions, focus rings |
| Background | `#FFFFFF` | `#0F172A` | Page backgrounds |
| Surface | `#F8FAFC` | `#1E293B` | Cards, modals |
| Text Primary | `#0F172A` | `#F8FAFC` | Headings, body text |
| Text Secondary | `#64748B` | `#94A3B8` | Subtitles, captions |
| Semantic Success | `#10B981` | - | Success states |
| Semantic Warning | `#F59E0B` | - | Warning states |
| Semantic Error | `#EF4444` | - | Error states |
| Semantic Info | `#3B82F6` | - | Info states |

### Typography

- **Primary Font**: Roboto (sans-serif, 300-900 weights)
- **Secondary Font**: Noto Serif (serif, italic)
- **Loaded via**: Google Fonts in `src/index.css`

### Responsive Breakpoints

| Name | Width | Usage |
|---|---|---|
| `xs` | 375px | Small phones |
| `sm` | 640px | Landscape phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Desktops |
| `xl` | 1280px | Large desktops |
| `2xl` | 1536px | Ultra-wide screens |

### Shadow System

| Token | Usage |
|---|---|
| `shadow-card` | Listing cards, property cards |
| `shadow-card-hover` | Card hover states |
| `shadow-dropdown` | Dropdown menus |
| `shadow-modal` | Modal overlays |
| `shadow-toast` | Toast notifications |
| `shadow-focus` | Focus rings |

### Z-Index Scale

| Token | Value | Usage |
|---|---|---|
| `z-dropdown` | 100 | Dropdown menus |
| `z-sticky` | 200 | Sticky headers |
| `z-modal-backdrop` | 300 | Modal backdrops |
| `z-modal` | 400 | Modal content |
| `z-popover` | 500 | Popovers |
| `z-tooltip` | 600 | Tooltips |
| `z-toast` | 700 | Toast notifications |

### Utility Function

```ts
// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Custom CSS Utilities

```css
/* src/index.css */
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

.listing-thumbnail-popup .maplibregl-popup-content {
  padding: 0; border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25); border: none;
}
```

---

## 14. Animation System

### Library: Motion (Framer Motion)

**Configuration**: `src/lib/animations.ts`

### Easing Curves

```ts
export const EASE_OUT = [0.23, 1, 0.32, 1]; // Custom cubic-bezier
```

### Transition Presets

| Name | Duration | Ease | Use Case |
|---|---|---|---|
| `SPRING` | 0.3s | EASE_OUT | Default interactions |
| `EASE_OUT` | 0.3s | EASE_OUT | Fade ins, slides |
| `EASE_IN_OUT` | 0.3s | easeInOut | Balanced transitions |
| `FAST` | 0.15s | - | Quick feedback |
| `NORMAL` | 0.2s | - | Standard UI updates |
| `SLOW` | 0.4s | EASE_OUT | Major state changes |

### Animation Variants

| Variant | Initial | Animate | Exit |
|---|---|---|---|
| `FADE_IN` | opacity: 0 | opacity: 1 | opacity: 0 |
| `FADE_UP` | opacity: 0, y: 10 | opacity: 1, y: 0 | opacity: 0, y: -10 |
| `SCALE_IN` | opacity: 0, scale: 0.95 | opacity: 1, scale: 1 | opacity: 0, scale: 0.95 |

### Modal Presets (Reusable)

```ts
export const modalBackdrop = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export const modalContent = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 20 }
};

export const dropdownReveal = {
  initial: { opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' },
  animate: { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' },
  exit: { opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }
};
```

### Reduced Motion Support

- `REDUCED_TRANSITIONS` and `REDUCED_VARIANTS` variants for accessibility
- `useReducedMotion` hook for programmatic access
- `MotionConfig` wrapper handles global settings via `reducedMotion="user"`

---

## 15. Map Integration

### MapTiler SDK v4

**Configuration**: `src/lib/mapPreloader.ts`

### API Key

Set via environment variable `VITE_MAPTILER_API_KEY`. Without it, the Maps page shows a "Map unavailable" screen with a link to get an API key.

### Map Preloader Singleton

A singleton service that initializes MapTiler in a hidden off-screen div on the Home page, so the interactive map is fully rendered when the user navigates to `/maps`.

```ts
initMapPreload(container: HTMLDivElement, apiKey: string) // Initialize
isMapReady(): boolean                                     // Check readiness
takeMap(): { container, map } | null                      // Take and clear
resetMapPreload(): void                                   // Reset for next cycle
```

**Flow:**
1. Home page mounts hidden container, calls `initMapPreload()`
2. MapTiler initializes and loads tiles in background
3. User navigates to `/maps`
4. `Maps.tsx` calls `takeMap()` to get pre-initialized map
5. Re-parents container into the page layout
6. On unmount, calls `resetMapPreload()` so Home can re-init on next visit

### Map Features

- Custom SVG pin markers (red pin with white circle)
- Marker popups with thumbnail, title, price
- Fly-to animation (zoom 16, 1500ms duration)
- Full-screen map modal with location pill and coordinates
- Interactive location picker for listing creation (`MapPicker.tsx`)

---

## 16. State Management

### Global State (React Context)

| Context | State | Persistence |
|---|---|---|
| `AuthContext` | user, session, isLoading | None (in-memory) |
| `ThemeContext` | theme | localStorage (`khubo-theme`) |
| `LandlordContext` | isLandlord | None (in-memory) |
| `ToastContext` | toasts[] | None (in-memory) |

### Local State (Component-level)

Most components use `useState` and `useReducer` for local state. Key patterns:

- **Modal state**: Individual `boolean` states per modal (e.g., `isEditProfileOpen`, `isLogoutModalOpen`)
- **Form state**: Controlled inputs with `useState`
- **Filter state**: `FilterState` object with `useState`
- **Loading state**: `boolean` flags with `useState`

### localStorage Keys

| Key | Type | Purpose |
|---|---|---|
| `khubo-theme` | `'light' \| 'dark'` | Theme preference |
| `home_search_history` | `string[]` | Recent search queries (max 5) |
| `user_profile_name` | `string` | User's display name |
| `user_profile_tags` | `string[]` | User's personality tags |
| `custom_roommates` | `Roommate[]` | User-created roommate posts |

---

## 17. Testing

### Framework

**Vitest 4.1** with jsdom environment.

**Configuration** (in `vite.config.ts`):
```ts
test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: ['./src/test/setup.ts'],
}
```

**Setup**: `src/test/setup.ts` imports `@testing-library/jest-dom` matchers.

### Test Files

| File | Description |
|---|---|
| `src/hooks/useListingsFilter.test.ts` | Filter hook pipeline tests |
| `src/lib/utils.test.ts` | Utility function tests |
| `src/lib/api/client.test.ts` | API client tests |

### Testing Libraries

- `@testing-library/react` — Component rendering and queries
- `@testing-library/jest-dom` — Custom matchers (toBeInTheDocument, etc.)
- `@testing-library/user-event` — User interaction simulation
- `jsdom` — Browser environment simulation

### Running Tests

```bash
npm test            # Run all tests (vitest run)
npm run test:watch  # Run tests in watch mode (vitest)
```

---

## 18. Configuration Files

### `package.json`

- **Name**: khubo
- **Version**: 0.0.0
- **Type**: ES modules
- **Scripts**: dev, build, preview, test, test:watch, clean, lint, lint:eslint, typecheck, format

### `tsconfig.json`

- **Target**: ES2022
- **Strict mode**: Enabled
- **Module**: ESNext with bundler resolution
- **Path alias**: `@/*` → `./src/*`
- **JSX**: react-jsx

### `vite.config.ts`

- **Plugins**: React, Tailwind CSS
- **Dev server**: Port 3002, strict port, HMR toggle via `DISABLE_HMR`
- **Path alias**: `@` → `src`
- **Build chunks**: Manual splitting (maptiler, recharts, lucide, motion, vendor)
- **chunkSizeWarningLimit**: 2000KB
- **Test**: Vitest with jsdom

### `tailwind.config.ts`

- **Dark mode**: Class-based (`'class'`)
- **Custom colors**: primary, accent, khubo, semantic, neutral
- **Custom shadows**: card, card-hover, dropdown, modal, toast, focus
- **Custom z-index scale**: dropdown (100) through toast (700)
- **Safelist**: Primary/accent/semantic color utilities

### `eslint.config.js`

- **Extends**: recommended + typescript-eslint
- **Plugins**: react-hooks, react
- **Rules**: no-unused-vars (warn), no-explicit-any (warn), exhaustive-deps (warn)

---

## 19. Docker Setup

### Multi-Stage Build

**Build Stage** (`node:20-alpine`):
1. Copies `package.json` and `package-lock.json`
2. Runs `npm ci --ignore-scripts --no-audit --no-fund`
3. Copies source code
4. Runs `npm run build` to produce `dist/`

**Production Stage** (`nginx:1.27-alpine`):
1. Copies built `dist/` into Nginx container
2. Configures SPA fallback (`try_files $uri $uri/ /index.html`)
3. Static asset caching (6 months)
4. Security headers (X-Frame-Options, X-Content-Type-Options)
5. Health check (wget every 30s)

### Docker Compose

```yaml
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        - VITE_MAPTILER_API_KEY=${VITE_MAPTILER_API_KEY:-}
    container_name: khubo
    restart: unless-stopped
    ports:
      - "8080:80"
    env_file:
      - .env
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:80/"]
      interval: 30s
      timeout: 5s
      start_period: 15s
      retries: 3
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

### Quick Start

```bash
# Create .env with MapTiler API key
echo "VITE_MAPTILER_API_KEY=your_key_here" > .env

# Build and start
docker compose up -d

# Access at http://localhost:8080
```

### Common Commands

| Action | Command |
|---|---|
| Build & start | `docker compose up -d` |
| Stop (keep data) | `docker compose stop` |
| Stop & remove | `docker compose down` |
| View logs | `docker compose logs -f` |
| Rebuild after changes | `docker compose up -d --build` |
| Shell into container | `docker compose exec app sh` |
| Verify health | `docker compose ps` |

---

## 20. Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_MAPTILER_API_KEY` | Yes | MapTiler API key for interactive maps |
| `VITE_API_URL` | No | API base URL (defaults to `/api`) |
| `DISABLE_HMR` | No | Set to `true` to disable Hot Module Replacement |

All `VITE_*` variables are exposed client-side. Do not put secrets in these variables.

---

## 21. Build & Scripts

### Development

```bash
npm run dev    # Starts on http://localhost:3002 with HMR
```

### Production

```bash
npm run build  # Outputs optimized bundle to dist/
npm run preview  # Serves production build locally
```

### Code Quality

```bash
npm run lint        # ESLint + TypeScript checks
npm run lint:eslint # ESLint only
npm run typecheck   # TypeScript type checking only
npm run format      # Prettier formatting
```

### Testing

```bash
npm test            # Run all tests
npm run test:watch  # Watch mode
```

### Cleanup

```bash
npm run clean  # Remove dist/ directory
```

---

## 22. Known Issues & Technical Debt

### Critical Bugs

1. **`Math.random()` During Render** (`src/components/PropertiesModal.tsx:75-76`): React 19 strict mode flags this as impure. Fix: wrap in `useMemo`.

2. **Missing `useEffect` Dependencies**:
   - `PhotoCarouselOverlay.tsx:36-46`: Missing `nextImage`, `prevImage`, `onClose` in deps
   - `MapTilerView.tsx:77`: Missing `apiKey` in deps
   - `Profile.tsx:168`: Missing `checkLandlordAccount` in deps

### Type Safety

- 15+ `any` type usages across the codebase (mocks/supabase.ts, AuthContext, Filters, CreateListingModal, EditListingModal, ListingModal, MapTilerView, Profile, ManageListings, Maps)

### Unused Imports

- ~50 unused import warnings across 20+ files

### Pending Optimizations

- Lazy-load heavy dependencies (MapTiler SDK ~500KB+, Recharts)
- Inline SVG → React components in MapTilerView

### ADR Inconsistency

- ADR-005: Vite `@` alias points to project root (`.`) but tsconfig maps `@/*` → `./src/*` — potential import mismatch

---

## 23. Development Guidelines

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

## 24. Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**
   - Ensure `.env.local` or `.env` is in the project root
   - Restart dev server after adding variables
   - Prefix client-side variables with `VITE_`

2. **Map Not Rendering**
   - Verify MapTiler API key is valid and set in `.env`
   - Check browser console for CORS errors
   - Ensure container has defined height

3. **Authentication Failures**
   - Auth is currently mock-only — no real Supabase integration
   - `AuthContext` auto-signs in a demo user

4. **Build Errors**
   - Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
   - Run `npm run clean` before building

5. **Test Failures**
   - Run `npm run typecheck` to verify types
   - Check `src/test/setup.ts` for missing imports

6. **Docker Issues**
   - Ensure `.env` file exists with `VITE_MAPTILER_API_KEY`
   - Check port 8080 is not in use
   - Run `docker compose up -d --build` for fresh rebuild

---

*Document generated from comprehensive codebase analysis. All file paths are relative to the project root.*

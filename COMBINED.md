# COMBINED DOCUMENTATION

---

# README.md

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Staybnb - Accommodation & Roommate Finder Platform

A modern, full-featured web application designed to help users find short-term accommodations, long-term rentals, and compatible roommates. Built with React, TypeScript, and Tailwind CSS, this platform combines the functionality of accommodation booking services with an intelligent roommate matching system.

## 🌟 Features

### For Travelers & Renters
- **Browse Listings**: Explore a wide variety of accommodations categorized by type (apartments, houses, condos, etc.)
- **Interactive Maps**: View property locations on an interactive map with MapTiler integration
- **Advanced Filtering**: Filter listings by price, date, amenities, and location
- **Detailed Property Views**: Access comprehensive property information including photo galleries, amenities, host details, and reviews
- **Secure Booking Flow**: Streamlined modal-based booking interface
- **Search History**: Track your recent searches for quick access

### For Roommate Seekers
- **Smart Matching**: Find compatible roommates based on university, budget, location preferences, and lifestyle tags
- **Detailed Profiles**: View potential roommates' bios, preferences, and compatibility factors
- **Direct Communication**: Integrated messaging system to connect with potential roommates or hosts

### For Hosts
- **Listing Management**: Create, edit, and manage your property listings through an intuitive dashboard
- **Profile Customization**: Showcase your hosting experience, work background, and property details
- **Review System**: Build trust through authentic guest reviews and ratings

### User Experience
- **Authentication**: Secure sign-up and login functionality via Supabase
- **Dark/Light Mode**: Toggle between themes for comfortable viewing in any environment
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices
- **Smooth Animations**: Polished UI transitions using Motion library with accessibility-conscious reduced motion support
- **Toast Notifications**: Real-time feedback for user actions

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn
- A Gemini API key (for AI features)
- A Supabase project (for authentication and database)
- A MapTiler API key (for maps functionality)

### Installation

1. **Clone the repository**
   git clone <repository-url>

2. **Install dependencies**
   
pm install

3. **Set up environment variables** in .env.local:
   GEMINI_API_KEY=your_gemini_api_key
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_MAPTILER_API_KEY=your_maptiler_api_key

4. **Run the development server**: 
pm run dev

5. Navigate to http://localhost:3000

## 📱 Pages & Routes

| Route | Description |
|-------|-------------|
| / | Home page with featured listings and categories |
| /listing/:id | Detailed view of a specific property |
| /category/:categoryId | Browse listings by category |
| /maps | Interactive map view of all listings |
| /messages | User messaging inbox |
| /roommate | Roommate finder and matching interface |
| /profile | User profile and settings |
| /manage-listings | Host dashboard for managing properties |

## 🛠️ Available Scripts

- 
pm run dev - Start development server
- 
pm run build - Build for production
- 
pm run preview - Preview production build locally
- 
pm run lint - Run ESLint and TypeScript checks
- 
pm run clean - Remove build artifacts

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

---

# README_TECHNICALS.md

# Staybnb - Technical Documentation

Comprehensive technical documentation for the Staybnb accommodation and roommate finder platform.

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
10. [TypeScript Types](#typescript-types)
11. [Development Guidelines](#development-guidelines)

---

## 🛠 Tech Stack

### Frontend Framework
- **React 19** - Latest version with concurrent features and improved hooks
- **React Router DOM 7** - Client-side routing with hash-based navigation
- **TypeScript 5.8** - Static typing for enhanced developer experience and type safety

### Build & Development Tools
- **Vite 6.2** - Next-generation frontend build tool with HMR and fast builds
- **@vitejs/plugin-react** - Official React plugin for Vite
- **Tailwind CSS 4.1** - Utility-first CSS framework with Vite integration
- **PostCSS & Autoprefixer** - CSS processing and vendor prefixing

### UI & Animation Libraries
- **Motion (Framer Motion)** - Production-ready animation library for React
- **Lucide React** - Beautiful, consistent icon set
- **clsx & tailwind-merge** - Conditional className utilities for Tailwind

### Backend & Services
- **Supabase** - Backend-as-a-Service for authentication and database
- **MapTiler SDK 4.0** - Interactive maps and geolocation services
- **Google Generative AI (@google/genai)** - AI-powered features and recommendations

### Utilities
- **date-fns** - Modern JavaScript date utility library
- **dotenv** - Environment variable management

### Code Quality
- **ESLint 9** - JavaScript/TypeScript linting
- **Prettier 3.8** - Code formatting
- **typescript-eslint** - TypeScript-specific linting rules

---

## 🏗 Architecture Overview

### Application Architecture Pattern

The application follows a **Feature-Based Architecture** with the following layers:

Presentation Layer (Pages, Components, Modals, Layouts)
Context Layer (Auth, Theme, Toast Providers)
Hook Layer (Custom Hooks for Data & Logic)
Service Layer (Supabase, MapTiler, Gemini API)
Data Layer (Types, Mock Data, Utils)

### Routing Strategy
- **HashRouter**: Used for static hosting compatibility
- **Lazy Loading**: All pages are code-split using React.lazy() and wrapped in Suspense
- **Route Protection**: Authenticated routes managed via AuthContext

### State Management Strategy
- **Context API**: Global state for authentication, theme, and toast notifications
- **Local State**: Component-level state using useState and useReducer
- **Custom Hooks**: Encapsulated business logic and data fetching

---

## 📁 Project Structure

`
/workspace
├── public/                    # Static assets
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── AuthModal.tsx
│   │   ├── BottomNav.tsx
│   │   ├── Categories.tsx
│   │   ├── CreateListingModal.tsx
│   │   ├── EditListingModal.tsx
│   │   ├── Filters.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── HostProfile.tsx
│   │   ├── ListingCard.tsx
│   │   ├── ListingCardSkeleton.tsx
│   │   ├── ListingDetailSkeleton.tsx
│   │   ├── ListingModal.tsx
│   │   ├── MapTilerView.tsx
│   │   ├── Navbar.tsx
│   │   ├── PhotoCarouselOverlay.tsx
│   │   ├── ReviewBreakdown.tsx
│   │   ├── RoommateCard.tsx
│   │   ├── RoommateCardSkeleton.tsx
│   │   ├── RoommateHero.tsx
│   │   ├── RoommateModal.tsx
│   │   ├── RoommateSearchDropdown.tsx
│   │   ├── SearchDropdown.tsx
│   │   ├── SearchHistory.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── Toast.tsx
│   │   └── ToastProvider.tsx
│   │
│   ├── data/                 # Mock data for development
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Core libraries and contexts
│   ├── pages/                # Route-level components
│   ├── App.tsx               # Root component with routing
│   ├── main.tsx              # Application entry point
│   ├── index.css             # Global styles
│   ├── types.ts              # TypeScript type definitions
│   └── vite-env.d.ts         # Vite environment types
│
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── eslint.config.js          # ESLint configuration
`

---

## ⚙️ Core Features & Implementation

### 1. Authentication System
**Location**: src/lib/AuthContext.tsx
- **Provider**: Wraps the app to provide auth state globally
- **Methods**: signIn(), signUp(), signOut(), user state
- **Integration**: Supabase Auth with email/password and OAuth providers
- **Protected Routes**: Conditional rendering based on auth state

### 2. Theme System (Dark/Light Mode)
**Location**: src/lib/ThemeContext.tsx
- **Persistence**: Theme preference stored in localStorage
- **System Detection**: Respects OS-level dark mode preference
- **Toggle Component**: ThemeToggle component for user control
- **CSS Variables**: Tailwind's dark mode class strategy

### 3. Listing Management
**Components**: ListingCard, ListingModal, CreateListingModal, EditListingModal, ManageListings
**Data Flow**: Page Component → useListings Hook → Supabase/Mock Data → Component State

### 4. Roommate Finder
**Key Components**: RoommateHero, RoommateCard, RoommateModal, RoommateSearchDropdown
**Matching Algorithm**: University affiliation, Budget range compatibility, Location preferences, Lifestyle tags

### 5. Interactive Maps
**Implementation**: src/components/MapTilerView.tsx - MapTiler SDK v4.0 with property markers, cluster visualization, geolocation support, custom map styles

### 6. Search & Filtering
**Components**: SearchDropdown, Filters, SearchHistory, Categories

### 7. Notification System
**Components**: ToastProvider, Toast

---

## 🧩 Component Library

### Layout Components: Navbar, BottomNav, Footer, Hero
### Listing Components: ListingCard, ListingCardSkeleton, ListingModal, ListingDetailSkeleton, PhotoCarouselOverlay
### Roommate Components: RoommateCard, RoommateCardSkeleton, RoommateHero, RoommateModal, RoommateSearchDropdown
### Utility Components: AuthModal, Categories, CreateListingModal, EditListingModal, DateScrollPicker, Filters, HostProfile, MapTilerView, ReviewBreakdown, SearchDropdown, SearchHistory, ThemeToggle, Toast, ToastProvider

---

## 🔮 State Management

### AuthContext
`	sx
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}
`

### ThemeContext
`	sx
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}
`

### ToastContext
`	sx
interface ToastContextType {
  addToast: (toast: ToastProps) => void;
  removeToast: (id: string) => void;
}
`

### Custom Hooks: useListings, useListing, useSearchHistory, useReducedMotion

---

## 🎨 Styling & Design System

**Tailwind CSS v4.x** with Vite plugin.

### Color Scheme
| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| Primary | #17294F | #17294F | Brand color, CTAs |
| Background | #FFFFFF | #0F172A | Page backgrounds |
| Surface | #F8FAFC | #1E293B | Cards, modals |
| Text Primary | #0F172A | #F8FAFC | Headings, body text |
| Text Secondary | #64748B | #94A3B8 | Subtitles, captions |

### Responsive Breakpoints: sm(640px), md(768px), lg(1024px), xl(1280px), 2xl(1536px)

---

## ✨ Animation System

**Library**: Motion (Framer Motion)
**Configuration**: src/lib/animations.ts

### Easing: EASE_OUT = [0.23, 1, 0.32, 1]

| Name | Duration | Ease | Use Case |
|------|----------|------|----------|
| SPRING | 0.3s | EASE_OUT | Default interactions |
| EASE_OUT | 0.3s | EASE_OUT | Fade ins, slides |
| FAST | 0.15s | - | Quick feedback |
| NORMAL | 0.2s | - | Standard UI updates |
| SLOW | 0.4s | EASE_OUT | Major state changes |

### Animation Variants: FADE_IN, FADE_UP, SCALE_IN

### Reduced Motion Support: respects prefers-reduced-motion media query

---

## 🔌 API Integration

### Supabase
**Configuration**: src/lib/supabase.ts
Tables: users, listings, reviews, messages, roommates

### MapTiler
**Usage**: Interactive maps in Maps.tsx and MapTilerView.tsx

### Google Generative AI
**Usage**: AI-powered recommendations and content generation

---

## 📝 TypeScript Types

### Listing: id, title, location, description, price, rating, image, gallery, category, date, amenities, lat/lng, reviews, host
### Roommate: id, name, age, gender, university, location, bio, image, tags, budgetRange, preferredPlace
### Category: label, icon, emoji

---

## 📖 Development Guidelines

**Code Style**: Functional components, destructured props, PascalCase components, camelCase variables
**Best Practices**: Lazy loading, error boundaries, accessibility, performance optimization
**Git Convention**: Conventional commits (feat, fix, docs, style, refactor, test, chore)

---

## 🚀 Build & Deployment

- 
pm run dev - Development server on localhost:3000
- 
pm run build - Production build to dist/
- 
pm run preview - Preview production build
- 
pm run lint - Run ESLint and TypeScript checks

---

---

# KHUBO_DESIGN_SPECIFICATION_diff.md

## Overview

KHUBO is a **modern accommodation and roommate-finding platform** that combines the functionality of property booking services with intelligent matching systems. The design language emphasizes trust, clarity, and approachability through a carefully curated color palette, generous whitespace, and photography-forward layouts.

The visual identity centers on a deep navy blue (#17294F) as the primary brand color, conveying professionalism and reliability. A vibrant accent blue (#2252D6) provides interactive signals and highlights. The interface uses abundant white space, subtle borders, and smooth animations to create a polished, contemporary feel.

**Key Characteristics:**
- Deep navy primary (#17294F) establishes trust and professionalism
- Vibrant accent blue (#2252D6) for all interactive elements and highlights
- Clean, rounded geometry with pill-shaped buttons and soft card corners
- Hero sections feature dramatic photography with dark overlays for text legibility
- Frosted glass effects on floating UI elements (search bars, dropdowns)
- Smooth motion transitions using Motion library with accessibility considerations
- Responsive grid system adapting from mobile-first to wide desktop layouts
- Consistent 80px navbar height across all pages
- Interactive states use scale transforms and color shifts for feedback

## Colors

### Brand & Accent
- **Primary Navy** (#17294F): Core brand color for logos, primary buttons, active states, and key interactive elements
- **Primary Hover** (#1e366a): Hover states on primary-colored elements
- **Accent Blue** (#2252D6): Action color for secondary buttons, icons, focus rings, and highlighted elements
- **Accent Hover** (#1a41b8): Hover states on accent-colored elements

### Surface
- **Pure White** (#ffffff): Dominant canvas for cards, modals, navbars, and content areas
- **Neutral 50** (#fafafa): Hover states on list items and secondary backgrounds
- **Neutral 100** (#f5f5f5): Input field backgrounds, light dividers, and subtle UI elements
- **Neutral 200** (#e5e5e5): Disabled states and secondary borders

### Text
- **Neutral 900** (#171717): Primary text color for headings and body copy
- **Neutral 700** (#404040): Secondary text for less prominent content
- **Neutral 600** (#525252): Body text on white backgrounds
- **Neutral 500** (#737373): Tertiary text, timestamps, and metadata
- **Neutral 400** (#a3a3a3): Placeholder text and muted labels

### Borders & Dividers
- **Border Light** (#ebebeb): Subtle dividers, card borders
- **Border Medium** (#dddddd): Search bars, input fields, elevated cards

### Overlays & Shadows
- **Overlay Dark** (rgba(0,0,0,0.4)): Hero section background overlay
- **Overlay Light** (rgba(255,255,255,0.1)): Frosted glass effect base
- **Shadow SM** (0 1px 2px rgba(0,0,0,0.08)): Small UI elements
- **Shadow MD** (0 4px 12px rgba(0,0,0,0.05)): Cards and dropdowns
- **Shadow LG** (0 20px 40px rgba(0,0,0,0.2)): Modals and overlays
- **Shadow XL** (0 2px 16px rgba(0,0,0,0.12)): Dropdown menus and popovers

## Typography

### Font Families
- **Sans-Serif**: Roboto, ui-sans-serif, system-ui, sans-serif
- **Display**: Roboto, sans-serif
- **Serif**: Noto Serif, serif

### Hierarchy
| Token | Size | Weight | Line Height | Letter Spacing | Use |
|-------|------|--------|-------------|----------------|-----|
| hero-display | 35px | 700 | 1.1 | 0.1em | Main hero title |
| hero-subtitle | 35px | 400 | 1.2 | 0.3em | Hero subtitle (italic) |
| heading-xl | 35px | 700 | 1.1 | 0 | Largest headings |
| heading-lg | 28px | 700 | 1.2 | 0 | Major headings |
| heading-md | 24px | 700 | 1.2 | 0 | Subsection headings |
| heading-sm | 20px | 700 | 1.3 | 0 | Card titles |
| body-lg | 18px | 400 | 1.5 | 0 | Large body copy |
| body | 16px | 400 | 1.5 | 0 | Default body copy |
| body-sm | 14px | 400 | 1.5 | 0 | Secondary text |
| body-xs | 12px | 400 | 1.5 | 0 | Captions, metadata |
| button-label | 14px | 600 | 1.0 | 0 | Button labels |
| label | 12px | 600 | 1.2 | 0 | Form labels, tags |
| caption | 11px | 400 | 1.3 | 0 | Fine print |

### Principles
- Bold headings (700), regular body (400)
- Generous line-height (1.5) for readability
- Letter-spacing for display text
- Consistent sizing scale 35px→11px
- Weight 600 for emphasis on buttons and labels

## Layout

### Spacing System
Base unit: 4px. xxs(4px), xs(8px), sm(12px), md(16px), lg(20px), xl(24px), xxl(32px), xxxl(48px), section(64px).

### Grid & Container
- Max content width: 2520px
- Desktop: 4-5 column grid, Tablet: 2-3 column grid, Mobile: Single column
- Gutters: 24-32px between cards

## Elevation & Depth
| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | No shadow | Base surface, navbar |
| Subtle border | 1px border-light | Section dividers |
| Light shadow | shadow-sm + shadow-md | Search bar |
| Medium shadow | shadow-md | Dropdowns, elevated cards |
| Heavy shadow | shadow-lg | Modals, overlays |
| Extra shadow | shadow-xl | Dropdown menus |

## Shapes

### Border Radius Scale
none(0px), xs(2px), sm(4px), md(6px), lg(8px), xl(12px), 2xl(16px), 3xl(24px), full(9999px)

## Components

### Navigation
- **navbar**: White bg, 80px height, 1px border-light bottom border
- **search-bar**: White bg, border-medium, rounded-full, 48px height, dual-shadow

### Buttons
- **button-primary**: Navy bg, white text, rounded-full, 12x24px padding
- **button-secondary**: Transparent, text-primary text, border-medium border
- **button-icon**: Transparent, 40x40px, rounded-full

### Cards
- **card-listing**: White bg, rounded-xl, no shadow by default

### Inputs & Forms
- **input-field**: Neutral-100 bg, rounded-lg
- **dropdown-menu**: White, rounded-2xl, shadow-xl, border-light

### Overlays
- **hero-overlay**: rgba(0,0,0,0.4), no backdrop blur
- **frosted-glass**: rgba(255,255,255,0.1), blur(12px)

### Specialized Components
search-dropdown, date-scroll-picker, listing-modal, auth-modal, create-listing-modal, filters-overlay, roommate-card, toast-notification, footer, counter-stepper, file-upload-dropzone, image-cropper, rich-text-editor, auto-complete-search, multi-select, toggle-switch, checkbox-group, radio-group, form-error-state, message-banner, loading-skeleton, progress-bar, empty-state, error-boundary, offline-banner, connection-indicator, breadcrumb, pagination, tab-navigation, stepper-indicator, mobile-bottom-nav, sidebar-dashboard, mega-menu, chat-interface, message-templates, typing-indicator, read-receipt, file-attachment, notification-bell, announcement-banner

## Do's and Don'ts

### Do
- Use primary (#17294F) for branding and key interactive components
- Use accent (#2252D6) for secondary actions and focus rings
- Set hero typography with proper letter-spacing
- Maintain 80px navbar height across all breakpoints
- Use rounded-full for pill buttons
- Apply dual-shadow system to search bar
- Use frosted glass on hero search bar
- Ensure visible focus states on all interactive elements
- Use Motion library for accessible animations

### Don't
- Don't introduce additional brand colors beyond navy/accent blue palette
- Don't use sharp corners where rounded is appropriate
- Don't remove dark overlay from hero sections
- Don't make buttons smaller than 44x44px
- Don't use weight 500 for body text
- Don't add shadows to listing cards by default
- Don't use pure black (#000000) for text
- Don't mix border radius values arbitrarily
- Don't forget reduced-motion alternatives

## Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | ≤ 640px | Single-column, hamburger menu, 22vh hero |
| Tablet | 641-1023px | 2-3 column grids |
| Desktop | 1024-1439px | 4-5 column grids, 45vh hero |
| Wide Desktop | ≥ 1440px | Max width 2520px |

### Touch Targets
Minimum 44x44px for all interactive elements.

## Known Gaps
- Dark mode implementation not fully documented
- Error states not comprehensively documented
- Animation durations not standardized as tokens
- Accessibility audit findings vary by component
- Print stylesheets not implemented
- High-contrast mode not addressed
- RTL layouts not documented

---

---

# CODE_ANALYSIS_AND_PLAN.md

# Khubo Codebase Analysis & Implementation Plan

> **Generated:** 2026-06-18
> **Tools run:** 	sc --noEmit (0 errors), eslint . (2 errors, 95 warnings)
> **Files analyzed:** 45+ TypeScript/React files

| Check | Result |
|-------|--------|
| tsc --noEmit | **0 errors** ✅ |
| eslint . (errors) | **2 errors** ❌ |
| eslint . (warnings) | **95 warnings** ⚠️ |

---

## 🔴 Critical Bugs

### Bug 1: Math.random() During Render (React Purity Violation)
**File:** src/components/PropertiesModal.tsx:75-76
**Problem:** Math.random() called directly inside render function. React 19 strict mode flags this as impure.
**Fix:** Move random data generation to useMemo with stable seed.

### Bug 2: Missing useEffect Dependencies (Stale Closures)
**2a.** PhotoCarouselOverlay.tsx:36-46 - Missing: nextImage, prevImage, onClose from deps
**2b.** MapTilerView.tsx:77 - Missing: apiKey from deps
**2c.** Profile.tsx:168 - Missing: checkLandlordAccount from deps

### Bug 3: URL.createObjectURL Memory Leak
**File:** src/pages/Messages.tsx:59-65, 72-85, 90-98
**Problem:** URL.createObjectURL called on every file upload but never revoked on unmount.
**Fix:** Add cleanup effect on unmount and ensure handleSendMessage revokes URLs.

---

## 🧹 Code Cleanup

### Cleanup 1: Remove Unused Imports (~50 warnings)
**Files affected** (20+ files):
AnalyticsModal, AnnouncementsOverlay, CameraOverlay, Filters, Hero, HostProfile, ListingCardSkeleton, ListingModal, ListingDetail, Maps, Messages, Profile, RoommateHero, RoommateModal, RoommateSearchDropdown, SearchDropdown, Toast, Home, CategoryListings, ManageListings, main.tsx, vite.config.ts

### Cleanup 2: Remove Dead ESLint Directive
**File:** src/components/CreatePostModal.tsx:42 - Remove unused eslint-disable-next-line react-hooks/exhaustive-deps

### Cleanup 3: Fix Import Ordering in App.tsx
Move ScrollToTop component to separate file or bottom of file.

---

## ⚡ Optimization

### Optimization 1: Create Reusable Modal Wrapper Component
**Problem:** 10+ components duplicate identical modal backdrop patterns.
**Files affected:** AuthModal, CreateListingModal, CreatePostModal, EditListingModal, ListingModal, PropertiesModal, RoommateModal, AnalyticsModal, TenantsModal, InquiriesModal, Profile (3 modals)
**Fix:** Create src/components/ui/Modal.tsx reducing ~30 lines per modal.

### Optimization 2: Lazy-Load Heavy Dependencies
MapTiler SDK (~500KB+) and Recharts (AnalyticsModal) should use React.lazy with Suspense.

### Optimization 3: Extract Shared Motion Animation Variants
Create shared variants in src/lib/animations.ts: modalBackdrop, modalContent, dropdownReveal.

### Optimization 4: Reduce Messages.tsx Re-render Propagation
Use ThemeContext instead of local isDarkMode state.

### Optimization 5: Inline SVG to React Components
Convert raw SVG in MapTilerView.tsx to HouseMarkerIcon React component.

---

## 🔧 Type Safety Improvements

### 15+ ny Type Usages Across Files
| File | Issue |
|------|-------|
| src/mocks/supabase.ts | export const supabase: any |
| src/lib/AuthContext.tsx | [key: string]: any |
| src/components/Filters.tsx | option.id as any |
| src/components/CreateListingModal.tsx | err: any |
| src/components/EditListingModal.tsx | e: any |
| src/components/ListingModal.tsx | e: any |
| src/components/MapTilerView.tsx | e: any |
| src/pages/Messages.tsx | s any |
| src/pages/Profile.tsx | ny[], err: any |
| src/pages/ManageListings.tsx | ny[], err: any |
| src/pages/Maps.tsx | e: any |

### Recommended Approach for supabase.ts
Create proper MockQueryBuilder, MockFilterBuilder, MockStorageBucket interfaces.

---

## 📋 Priority Execution Plan

| Priority | Category | Task | Est. Effort | Order |
|----------|----------|------|-------------|-------|
| 🔴 Critical | Bug Fix | Fix Math.random() in PropertiesModal.tsx | 15min | 1 |
| 🔴 Critical | Bug Fix | Fix missing useEffect deps in 3 files | 30min | 2 |
| 🔴 Critical | Bug Fix | Fix URL.createObjectURL memory leak | 15min | 3 |
| 🟡 High | Type Safety | Create mock interfaces, remove any types | 1hr | 4 |
| 🟡 High | Optimization | Create reusable Modal wrapper + refactor 10+ modals | 2hr | 5 |
| 🟡 High | Cleanup | Remove unused imports (~50 warnings) | 1hr | 6 |
| 🟢 Medium | Optimization | Extract shared motion animation variants | 30min | 7 |
| 🟢 Medium | Optimization | Lazy-load heavy deps | 20min | 8 |
| 🟢 Medium | Cleanup | Remove dead eslint directive, fix import ordering | 5min | 9 |

**Total estimated effort: ~6 hours**

## Quick Wins
1. Remove unused imports - purely mechanical, batch-fix 20+ files
2. Remove eslint directive - single line deletion
3. Move ScrollToTop - extract to separate file
4. Export animation variants - no behavior change, pure refactor
5. Fix Math.random() - local useMemo change


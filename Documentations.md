# Documentations

---

## Contents

1. [AI Context & Documentation Map](#ai-context--documentation-map)
2. [README_TECHNICALS.md — Technical Documentation](#readme_technicals-md--technical-documentation)
3. [CODE_ANALYSIS_AND_PLAN.md — Codebase Analysis & Implementation Plan](#code_analysis_and_plan-md--codebase-analysis--implementation-plan)

---

## AI Context & Documentation Map

This section maps the 50 AI-friendly code understanding techniques to their locations in the codebase.

### Reference File: `AGENTS.md`

The file `AGENTS.md` in the project root is the primary AI context file. It contains:

| # | Technique | Location in Codebase |
|---|-----------|---------------------|
| 1 | Semantic Code Chunking | `AGENTS.md:§1` — file→purpose table for all 65+ files |
| 2 | Behavioral Contract Mapping | `AGENTS.md:§3` — AuthContext, API Client, Hook contracts |
| 3 | State Transition Documentation | `AGENTS.md:§4` — Auth + Theme state diagrams |
| 4 | Data Flow Visualization | `AGENTS.md:§5` — Listing, Booking, Roommate flows |
| 5 | Error Propagation Matrix | `AGENTS.md:§6` — 6 error sources with recovery |
| 6 | Dependency Injection Mapping | `AGENTS.md:§2` — Full component hierarchy tree |
| 7 | Type Flow Analysis | `AGENTS.md:§9` — Type transformations + domain→UI mapping |
| 8 | Side Effect Manifest | `AGENTS.md:§7` — 9 side effects with conditions |
| 9 | Configuration Context Mapping | `AGENTS.md:§8` — Env vars, build config, feature flags |
| 10 | Test Coverage Mapping | *(no tests exist yet)* |
| 11 | Performance Baseline | `AGENTS.md:§20` — 7 operations with target/current |
| 12 | Migration History Tracker | `AGENTS.md:§15` — ADR-001 through ADR-005 |
| 13 | Integration Point Documentation | `AGENTS.md:§8` (env vars) + `src/lib/api/*.ts` |
| 14 | Security Boundary Mapping | `AGENTS.md:§16` — 4-layer security diagram |
| 15 | Debugging Context Generation | `AGENTS.md:§21` — Troubleshooting guide |
| 16 | Type-Safe API Contracts | `AGENTS.md:§10` — Full API request/response types |
| 17 | Component Interaction Matrix | `AGENTS.md:§2` — Architecture + dependency direction |
| 18 | Configuration Schema Documentation | `AGENTS.md:§8` — All env vars + build settings |
| 19 | Error Code Registry | `AGENTS.md:§12` — 8 error codes with categories |
| 20 | Context-Aware Code Annotations | `AGENTS.md:§19` — Annotation template |
| 21 | File Structure Documentation | `AGENTS.md:§1` + `Documentations.md:README_TECHNICALS.md` §3 |
| 22 | Domain Model Documentation | `AGENTS.md:§11` — 4 entities with relationships |
| 23 | Event Flow Documentation | `AGENTS.md:§17` — 4 event flows (category, search, auth, map) |
| 24 | Cache Strategy Documentation | `AGENTS.md:§13` — 5 caches with key/TTL/invalidation |
| 25 | Database Schema Documentation | `AGENTS.md:§14` — 5 tables with columns + FK |
| 26 | Logging Strategy Documentation | *(not implemented — no logging system)* |
| 27 | CI/CD Pipeline Documentation | *(not implemented)* |
| 28 | Monitoring and Alerting Documentation | *(not implemented)* |
| 29 | Code Review Checklist | *(see ESLint config + `tsconfig.json`)* |
| 30 | Architectural Decision Records | `AGENTS.md:§15` — 5 ADRs with status/consequences |
| 31 | Onboarding Documentation | `README.md` (quick start) + `Documentations.md` |
| 32 | Technical Debt Register | `AGENTS.md:§18` — 10 known issues with severity |
| 33 | Feature Flag Register | `AGENTS.md:§8` (Feature Flags table) |
| 34 | Environment Configuration Matrix | `AGENTS.md:§8` — env vars across environments |
| 35 | Migration and Seed Data Documentation | *(not applicable — all mock data)* |
| 36-39 | Performance/Security/Backup/Compliance | *(not implemented)* |
| 40 | Dependency Management | `package.json` — all deps with versions |
| 41-50 | Code Gen Templates, Refactoring, Troubleshooting | See `AGENTS.md:§21` + `Documentations.md:CODE_ANALYSIS` §5 |

### Quick Navigation

- **All source files**: `src/` directory (see `AGENTS.md:§1`)
- **Routes**: `/` Home, `/listing/:id`, `/category/:categoryId`, `/messages`, `/maps`, `/roommate`, `/profile`, `/manage-listings`
- **State management**: React Context API — Auth, Theme, Toast (see `AGENTS.md:§2`)
- **Data layer**: All mock — `src/mocks/*.ts` with 500ms simulated delay
- **Auth**: Email-only mock, no password, localStorage-backed (see `AGENTS.md:§4`)
- **Animations**: Motion library with centralized presets in `src/lib/animations.ts`
- **Maps**: MapTiler SDK v4, requires `VITE_MAPTILER_API_KEY`
- **AI**: `@google/genai` package installed, not yet integrated

---

# README_TECHNICALS.md — Technical Documentation

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
│  (Supabase, MapTiler, Gemini API)       │
├─────────────────────────────────────────┤
│            Data Layer                   │
│      (Types, Mock Data, Utils)          │
└─────────────────────────────────────────┘
```

### Routing Strategy

- **HashRouter**: Used for static hosting compatibility
- **Lazy Loading**: All pages are code-split using `React.lazy()` and wrapped in `Suspense`
- **Route Protection**: Authenticated routes managed via `AuthContext`

### State Management Strategy

- **Context API**: Global state for authentication, theme, and toast notifications
- **Local State**: Component-level state using `useState` and `useReducer`
- **Custom Hooks**: Encapsulated business logic and data fetching

---

## 📁 Project Structure

```
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
│   │   ├── listings.ts
│   │   └── roommates.ts
│   │
│   ├── hooks/                # Custom React hooks
│   │   ├── useListing.ts
│   │   ├── useListings.ts
│   │   ├── useReducedMotion.ts
│   │   └── useSearchHistory.ts
│   │
│   ├── lib/                  # Core libraries and contexts
│   │   ├── AuthContext.tsx
│   │   ├── ThemeContext.tsx
│   │   ├── animations.ts
│   │   ├── supabase.ts
│   │   └── utils.ts
│   │
│   ├── pages/                # Route-level components
│   │   ├── CategoryListings.tsx
│   │   ├── Home.tsx
│   │   ├── ListingDetail.tsx
│   │   ├── ManageListings.tsx
│   │   ├── Maps.tsx
│   │   ├── Messages.tsx
│   │   ├── Profile.tsx
│   │   └── RoommateFinder.tsx
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
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── eslint.config.js          # ESLint configuration
```

---

## ⚙️ Core Features & Implementation

### 1. Authentication System

**Location**: `src/lib/AuthContext.tsx`

- **Provider**: Wraps the app to provide auth state globally
- **Methods**: `signIn()`, `signUp()`, `signOut()`, `user` state
- **Integration**: Supabase Auth with email/password and OAuth providers
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
- `ListingModal` - Detailed view with booking options
- `CreateListingModal` - Form for adding new listings
- `EditListingModal` - Modify existing listings
- `ManageListings` - Host dashboard page

**Data Flow**:
```
Page Component → useListings Hook → Supabase/Mock Data → Component State
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

**Hook**: `useSearchHistory.ts` manages localStorage persistence

### 7. Notification System

**Components**:
- `ToastProvider` - Context provider for toast management
- `Toast` - Individual notification component

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

### Listing Components
| Component | Description |
|-----------|-------------|
| `ListingCard` | Card displaying listing preview |
| `ListingCardSkeleton` | Loading skeleton for listing cards |
| `ListingModal` | Full-screen modal with listing details |
| `ListingDetailSkeleton` | Loading skeleton for detail view |
| `PhotoCarouselOverlay` | Image gallery with fullscreen mode |

### Roommate Components
| Component | Description |
|-----------|-------------|
| `RoommateCard` | Profile card for roommate candidates |
| `RoommateCardSkeleton` | Loading skeleton for roommate cards |
| `RoommateHero` | Header section for roommate finder |
| `RoommateModal` | Detailed roommate profile modal |
| `RoommateSearchDropdown` | Filter dropdown for roommate search |

### Utility Components
| Component | Description |
|-----------|-------------|
| `AuthModal` | Login/signup modal dialog |
| `Categories` | Horizontal scrollable category selector |
| `CreateListingModal` | Form for creating new listings |
| `EditListingModal` | Form for editing existing listings |
| `DateScrollPicker` | Custom date selection component |
| `Filters` | Multi-option filter panel |
| `HostProfile` | Host information display |
| `MapTilerView` | Interactive map component |
| `ReviewBreakdown` | Rating distribution visualization |
| `SearchDropdown` | Search input with autocomplete |
| `SearchHistory` | Recent searches display |
| `ThemeToggle` | Dark/light mode switch |
| `Toast` | Notification popup |
| `ToastProvider` | Toast context provider |

---

## 🔮 State Management

### Context Providers

#### AuthContext
```tsx
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
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

#### useSearchHistory
- Manages search history in localStorage
- Methods: `addSearch`, `clearHistory`, `getHistory`

#### useReducedMotion
- Detects user's motion preference
- Returns boolean for animation adjustments

---

## 🎨 Styling & Design System

### Tailwind CSS Configuration

**Version**: Tailwind CSS v4.x with Vite plugin

**Custom Configuration** (`tailwind.config.js`):
- Extended color palette matching brand identity
- Custom spacing and sizing scales
- Responsive breakpoints for mobile-first design

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
{
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}
```

#### FADE_UP
```ts
{
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
}
```

#### SCALE_IN
```ts
{
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 }
}
```

### Reduced Motion Support

The app respects the `prefers-reduced-motion` media query:
- Animations are disabled or simplified when requested
- `useReducedMotion` hook provides programmatic access
- `MotionConfig` wrapper handles global settings

### Clip-Path Entrance Animations

Recent refactor replaced translate-based animations with clip-path reveals:
- Smoother visual transitions
- Better performance on low-end devices
- More modern aesthetic

---

## 🔌 API Integration

### Supabase

**Configuration**: `src/lib/supabase.ts`

```ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**Tables** (Expected Schema):
- `users` - User profiles and preferences
- `listings` - Property listings
- `reviews` - User reviews and ratings
- `messages` - User-to-user communication
- `roommates` - Roommate seeker profiles

### MapTiler

**Usage**: Interactive maps in `Maps.tsx` and `MapTilerView.tsx`

```ts
import { maptilerSdk } from '@maptiler/sdk';

maptilerSdk.key = import.meta.env.VITE_MAPTILER_API_KEY;
```

### Google Generative AI

**Usage**: AI-powered recommendations and content generation

```ts
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
```

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
  lat?: number;
  lng?: number;
  reviews: Review[];
  host?: HostInfo;
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

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Supabase Docs](https://supabase.com/docs)
- [MapTiler SDK](https://docs.maptiler.com/sdk-js/)
- [Google AI Studio](https://ai.google.dev)

---

*Last Updated: June 2026*
*Version: 1.0.0*

---

# CODE_ANALYSIS_AND_PLAN.md — Codebase Analysis & Implementation Plan

> **Generated:** 2026-06-18
> **Tools run:** `tsc --noEmit` (0 errors), `eslint .` (2 errors, 95 warnings)
> **Files analyzed:** 45+ TypeScript/React files

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

### Bug 3: `URL.createObjectURL` Memory Leak

**File:** `src/pages/Messages.tsx:59-65, 72-85, 90-98`

**Problem:** `URL.createObjectURL` is called on every file upload but never revoked when attachments are cleared on unmount. Only `removeAttachment` revokes URLs, but the cleanup on component unmount is missing.

```tsx
// Called on every upload — creates blob URLs
url: URL.createObjectURL(file),
```

**Fix:** Add cleanup effect on unmount:

```tsx
useEffect(() => {
  return () => {
    attachments.forEach(a => URL.revokeObjectURL(a.url));
  };
}, []);
```

And ensure `handleSendMessage` revokes URLs after sending:

```tsx
const handleSendMessage = (e: React.FormEvent) => {
  // ... send logic ...
  attachments.forEach(a => URL.revokeObjectURL(a.url));
  setAttachments([]);
};
```

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
| `Messages.tsx` | `useEffect`, `Edit`, `Info`, `ChevronLeft`, `Mic`, `Megaphone`, `Plus`, `Paperclip` |
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

**Problem:** The `ScrollToTop` component is defined inline between imports and the main `App` component, breaking convention.

**Action:** Move `ScrollToTop` to a separate file or to the bottom of the file before the export.

---

## ⚡ Optimization

### Optimization 1: Create Reusable `Modal` Wrapper Component

**Problem:** 10+ components duplicate identical modal backdrop patterns:

```tsx
<div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
  />
  <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95, y: 20 }}
    className="relative w-full max-w-lg bg-white rounded-[2rem] overflow-hidden shadow-2xl z-10"
  >
    {children}
  </motion.div>
</div>
```

**Files affected:** `AuthModal.tsx`, `CreateListingModal.tsx`, `CreatePostModal.tsx`, `EditListingModal.tsx`, `ListingModal.tsx`, `PropertiesModal.tsx`, `RoommateModal.tsx`, `AnalyticsModal.tsx`, `TenantsModal.tsx`, `InquiriesModal.tsx`, Profile.tsx (edit modal), Profile.tsx (signup modal), Profile.tsx (stat modal)

**Fix:** Create `src/components/ui/Modal.tsx`:

```tsx
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
  className?: string;
}
```

This reduces ~30 lines per modal to `<Modal isOpen={...} onClose={...}>`.

---

### Optimization 2: Lazy-Load Heavy Dependencies

**Files affected:**
- `src/components/MapTilerView.tsx` — MapTiler SDK (~500KB+)
- `src/components/AnalyticsModal.tsx` — Recharts library

**Fix:** Use `React.lazy` with `<Suspense>`:

```tsx
const MapTilerView = React.lazy(() => import('./components/MapTilerView'));
const AnalyticsModal = React.lazy(() => import('../components/AnalyticsModal'));
```

---

### Optimization 3: Extract Shared Motion Animation Variants

**Problem:** Every modal duplicates the same `initial/animate/exit` animation values across 10+ files.

**Fix:** Create shared variants in `src/lib/animations.ts`:

```tsx
export const modalBackdrop = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const modalContent = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 20 },
};

export const dropdownReveal = {
  initial: { opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' },
  animate: { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' },
  exit: { opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' },
};
```

Usage: `<motion.div {...modalBackdrop} />` — reduces duplication and centralizes animation tuning.

---

### Optimization 4: Reduce Messages.tsx Re-render Propagation

**Problem:** `isDarkMode` state is thread through the entire Messages component tree. Toggling dark mode causes the entire 480-line component to re-render.

**Fix:** Use the existing `ThemeContext` (from `src/lib/ThemeContext.tsx`) for dark mode instead of local state, or extract the chat area into a memoized sub-component.

---

### Optimization 5: Inline SVG → React Components

**File:** `src/components/MapTilerView.tsx:54-68`

**Problem:** SVG house marker is injected via `el.innerHTML` with raw SVG strings, bypassing React's rendering and making it unoptimizable.

**Fix:** Create a `HouseMarkerIcon` React component and use `ReactDOM.createRoot` to render it into the marker element:

```tsx
const HouseMarkerIcon = () => (
  <svg width="52" height="60" viewBox="0 0 44 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* ... path data ... */}
  </svg>
);
```

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
| `src/pages/Messages.tsx` | 116, 300, 302 | `as any` | Extend mock message type |
| `src/pages/Profile.tsx` | 61, 63, 267 | `any[]`, `err: any` | `Listing[]`, `unknown` |
| `src/pages/ManageListings.tsx` | 12, 14 | `any[]`, `err: any` | `Listing[]`, `unknown` |
| `src/pages/Maps.tsx` | 219 | `e: any` | Proper event type |

### Recommended Approach for `src/mocks/supabase.ts`:

```tsx
interface MockQueryBuilder {
  select: (columns?: string) => MockFilterBuilder;
  insert: (values: Record<string, unknown>) => Promise<{ data: unknown; error: null }>;
  update: (values: Record<string, unknown>) => MockFilterBuilder;
  delete: () => MockFilterBuilder;
}

interface MockFilterBuilder extends MockQueryBuilder {
  eq: (column: string, value: unknown) => MockFilterBuilder;
  order: (column: string, options?: { ascending?: boolean }) => Promise<{ data: unknown[]; error: null }>;
  maybeSingle: () => Promise<{ data: unknown; error: null }>;
}

interface MockStorageBucket {
  upload: (path: string, file: File) => Promise<{ data: unknown; error: null }>;
  getPublicUrl: (path: string) => { data: { publicUrl: string } };
}

export const supabase: {
  auth: { /* ... */ };
  from: (table: string) => MockQueryBuilder;
  storage: { from: (bucket: string) => MockStorageBucket };
};
```

---

## 📋 Priority Execution Plan

| Priority | Category | Task | Est. Effort | Order |
|----------|----------|------|-------------|-------|
| 🔴 Critical | Bug Fix | Fix `Math.random()` in `PropertiesModal.tsx` | 15min | 1 |
| 🔴 Critical | Bug Fix | Fix missing `useEffect` deps in 3 files | 30min | 2 |
| 🔴 Critical | Bug Fix | Fix `URL.createObjectURL` memory leak in `Messages.tsx` | 15min | 3 |
| 🟡 High | Type Safety | Create mock interfaces, remove `any` types | 1hr | 4 |
| 🟡 High | Optimization | Create reusable `Modal` wrapper component + refactor 10+ modals | 2hr | 5 |
| 🟡 High | Cleanup | Remove all unused imports and variables (~50 warnings) | 1hr | 6 |
| 🟢 Medium | Optimization | Extract shared motion animation variants | 30min | 7 |
| 🟢 Medium | Optimization | Lazy-load heavy deps (`MapTilerView`, `AnalyticsModal`) | 20min | 8 |
| 🟢 Medium | Cleanup | Remove dead eslint directive, fix import ordering | 5min | 9 |

**Total estimated effort: ~6 hours**

---

## Quick Wins (Can Be Done in Parallel)

1. **Remove unused imports** — purely mechanical, can batch-fix all 20+ files
2. **Remove eslint directive** — single line deletion
3. **Move `ScrollToTop`** — extract to separate file
4. **Export animation variants** — no behavior change, pure refactor
5. **Fix `Math.random()`** — local `useMemo` change

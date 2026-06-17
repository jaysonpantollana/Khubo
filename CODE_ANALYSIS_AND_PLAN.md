# Khubo Codebase Analysis & Implementation Plan

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

# Khubo Over-Engineering Audit

Codebase analyzed: `Khubo/src/` (~85 files, ~9,500 LOC)
Findings: 30 issues ranked by deletion impact (largest cuts first).

---

## FINDING 1 — SearchContext (327 lines, fully dead)
- **File:** `src/context/SearchContext.tsx:1-327`
- **Tag:** `delete`
- **Details:** A 327-line reducer-based context with 15 action types, 20+ memoized dispatchers, URL synchronization, and localStorage persistence. Grep confirms zero imports from `context/SearchContext` anywhere in the project. Home.tsx and Maps.tsx each maintain their own local search state via `useState`.
- **Cut:** Remove the file and the `src/context/` directory entirely.

## FINDING 2 — ui/Combobox.tsx (524 lines, fully dead)
- **File:** `src/components/ui/Combobox.tsx:1-524`
- **Tag:** `delete`
- **Details:** A 524-line generic combobox with keyboard navigation, type-ahead search, option grouping, multi-select mode, focus trapping, and hidden form input. Also defines `MultiSelect` and `SingleSelect` thin wrappers. No component anywhere imports `Combobox`, `MultiSelect`, or `SingleSelect`.
- **Cut:** Delete the file.

## FINDING 3 — ui/Card.tsx (351 lines, fully dead)
- **File:** `src/components/ui/Card.tsx:1-351`
- **Tag:** `delete`
- **Details:** Exports `Card`, `CardHeader`, `CardContent`, `CardFooter`, `CardMedia`, and a second `ListingCard` variant. None of these sub-components is imported by any page or component. All actual listing card rendering uses the standalone `src/components/ListingCard.tsx`.
- **Cut:** Delete the file.

## FINDING 4 — ui/Modal.tsx (324 lines, mostly dead)
- **File:** `src/components/ui/Modal.tsx:1-324`
- **Tag:** `yagni`
- **Details:** Exports `Modal`, `ModalFooter`, `ConfirmModal`, and `AlertModal`. Only `Modal` itself is consumed (by 3 files: AnalyticsModal, ListingsPopup, RoommatesPopup). `ConfirmModal` and `AlertModal` have zero external consumers. `ModalFooter` is only referenced internally by those two dead components. That is roughly 140 lines of dead exports.
- **Cut:** Remove `ConfirmModal` (~63 lines), `AlertModal` (~55 lines), and `ModalFooter` (~18 lines). Keep the core `Modal` if the 3 consumers need it.

## FINDING 5 — ui/Input.tsx (252 lines, fully dead)
- **File:** `src/components/ui/Input.tsx:1-252`
- **Tag:** `delete`
- **Details:** Four `forwardRef` form components (`Input`, `Textarea`, `Select`, `Label`) with error/hint display, icon slots, and full ARIA wiring. Every form in the application uses raw HTML `<input>`, `<textarea>`, and `<select>` elements instead.
- **Cut:** Delete the file.

## FINDING 6 — ui/Button.tsx (99 lines, fully dead)
- **File:** `src/components/ui/Button.tsx:1-99`
- **Tag:** `delete`
- **Details:** A `forwardRef` button with 6 variant styles, 6 size options, a loading spinner SVG, and left/right icon slots. No file imports `Button` from anywhere. All buttons are plain `<button>` tags with Tailwind classes applied inline.
- **Cut:** Delete the file.

## FINDING 7 — ui/index.ts barrel (14 lines, fully dead)
- **File:** `src/components/ui/index.ts:1-14`
- **Tag:** `delete`
- **Details:** Barrel re-export aggregating all ui/ components. Never imported by any consumer. All imports target individual files.
- **Cut:** Delete the file.

## FINDING 8 — lib/api/index.ts barrel (11 lines, fully dead)
- **File:** `src/lib/api/index.ts:1-11`
- **Tag:** `delete`
- **Details:** Barrel re-export of all API sub-modules. Every caller imports specific files (`api/auth.ts`, `api/listings.ts`, `api/client.ts`) directly.
- **Cut:** Delete the file.

## FINDING 9 — useDropdown hook (114 lines, fully dead)
- **File:** `src/hooks/useDropdown.ts:1-114`
- **Tag:** `delete`
- **Details:** Comprehensive dropdown controller with open/close/toggle, refs, ARIA props, position/align/offset config, escape/scroll/click-outside listeners. Zero components import it. All dropdown behavior is hand-coded locally in Hero, Home, and Maps pages.
- **Cut:** Delete the file.

## FINDING 10 — Full API client layer (~300 lines, YAGNI)
- **File:** `src/lib/api/client.ts:1-125` (+ auth.ts, listings.ts, roommates.ts, types.ts)
- **Tag:** `yagni`
- **Details:** A production-grade HTTP client with retry logic (`executeWithRetry`), abort-signal composition (`combineAbortSignals`), timeout handling, auth header injection from sessionStorage, and typed response wrappers (`ApiResponse<T>`, `PaginatedResponse<T>`, `PaginationParams`, `ApiError`). However, every single API endpoint falls through to mock data on failure — and they always fail because no real API URL is configured. The retry/timeout/auth infrastructure is exercised by zero real network requests.
- **Cut:** Replace the API modules with direct mock-data imports (as `useListing.ts` already demonstrates). Remove `client.ts` (125 lines), `types.ts` (28 lines), and simplify `auth.ts`/`listings.ts`/`roommates.ts` to pure mock lookups without the `fetch()` wrapper.

## FINDING 11 — useBodyScrollLock (23 lines, reinvented stdlib)
- **File:** `src/hooks/useBodyScrollLock.ts:1-23`
- **Tag:** `stdlib`
- **Details:** Reference-counted `document.body.style.overflow = 'hidden'` toggle with a module-level counter. Single consumer: Profile.tsx.
- **Replace with:** Profile.tsx can manage `overflow: hidden` in its own `useEffect` in about 4 lines. The ref-counting abstraction serves a single caller.

## FINDING 12 — useBottomNavHeight + useSafeAreaInsets + useContainerPadding (64 lines, fully dead)
- **File:** `src/hooks/useBottomNavHeight.ts:1-64`
- **Tag:** `delete`
- **Details:** Three hooks: DOM measurement of a bottom nav element, CSS custom property reading for safe-area insets, and dynamic padding computation. None is imported by any component.
- **Cut:** Delete the file.

## FINDING 13 — useReducedMotion (16 lines, fully dead)
- **File:** `src/hooks/useReducedMotion.ts:1-16`
- **Tag:** `delete`
- **Details:** A `prefers-reduced-motion` media query hook with change listener. Zero imports found.
- **Cut:** Delete the file.

## FINDING 14 — useErrorHandler (28 lines, only consumer is dead code)
- **File:** `src/hooks/useErrorHandler.ts:1-28`
- **Tag:** `delete`
- **Details:** Returns a callback that stores errors in state and re-throws during render. The sole consumer is `ErrorExample.tsx` (a demo component not mounted by any route).
- **Cut:** Delete both the hook and the demo component.

## FINDING 15 — ErrorExample component (94 lines, demo-only)
- **File:** `src/components/example/ErrorExample.tsx:1-94`
- **Tag:** `delete`
- **Details:** Annotated `@known-issues: This file is for demo purposes only`. Not referenced by any route or parent component.
- **Cut:** Delete the file and `src/components/example/` directory.

## FINDING 16 — EASE_OUT constant (1 line, fully dead)
- **File:** `src/lib/animations.ts:1`
- **Tag:** `delete`
- **Details:** `export const EASE_OUT = [0.23, 1, 0.32, 1]`. No file imports from `lib/animations`.
- **Cut:** Delete the file.

## FINDING 17 — formatPrice (2 lines, dead export)
- **File:** `src/lib/utils.ts:17-19`
- **Tag:** `delete`
- **Details:** `formatPrice(price: number): string { return "P" + price.toLocaleString() }`. Zero imports. All price rendering uses inline template literals.
- **Cut:** Remove the export from utils.ts.

## FINDING 18 — useAllListings (2 lines, dead export)
- **File:** `src/hooks/useListings.ts:44-46`
- **Tag:** `delete`
- **Details:** `export function useAllListings() { return useListings(); }`. A one-liner wrapper with no callers.
- **Cut:** Remove the function.

## FINDING 19 — useClickOutsideMultiple (30 lines, dead export)
- **File:** `src/hooks/useClickOutside.ts:32-61`
- **Tag:** `delete`
- **Details:** A multi-ref variant of useClickOutside. Exported but never imported anywhere.
- **Cut:** Remove the function from the file.

## FINDING 20 — Duplicate FilterState interface
- **Files:** `src/components/Filters.tsx:22-28` and `src/hooks/useListingsFilter.ts:9-14`
- **Tag:** `shrink`
- **Details:** Both define identical `FilterState` with `minPrice`, `maxPrice`, `minRating`, and `sortBy`. Maps.tsx and Home.tsx import from Filters.tsx; useListingsFilter uses its own copy.
- **Replace with:** Define once in `useListingsFilter.ts` and import in Filters.tsx.

## FINDING 21 — recharts dependency (~400KB for one chart)
- **File:** `package.json:28`, `src/components/AnalyticsModal.tsx:10`
- **Tag:** `yagni`
- **Details:** Full charting library imported for `LineChart`, `Line`, `XAxis`, `ResponsiveContainer` in a single modal with hardcoded 4-point mock revenue data.
- **Replace with:** CSS bar chart or inline SVG `<polyline>` (~20 lines of Tailwind). The data is entirely static.

## FINDING 22 — zod dependency (single use, no error display)
- **File:** `package.json:30`, `src/components/CreateListingModal.tsx:10`
- **Tag:** `yagni`
- **Details:** Imported for a single `z.object()` schema. Validation errors are caught but never rendered to the UI.
- **Replace with:** Inline conditional checks, or defer validation until error display is wired up.

## FINDING 23 — delay() helper (reinvented setTimeout)
- **File:** `src/lib/utils.ts:13-15`
- **Tag:** `stdlib`
- **Details:** A promise-wrapping setTimeout wrapper used only by the mock API layer to fake network latency.
- **Replace with:** Inline `await new Promise(r => setTimeout(r, ms))` at each of the 5 call sites in the api/ files. Removes a public utility for internal-only mock behavior.

## FINDING 24 — combineAbortSignals (reinvented AbortSignal.any)
- **File:** `src/lib/api/client.ts:32-42`
- **Tag:** `stdlib`
- **Details:** Manual abort signal combination via loop + event listener. `AbortSignal.any()` is now supported in all modern browsers.
- **Replace with:** `AbortSignal.any(signals)` in a single line (only relevant if the API client is retained).

## FINDING 25 — Card.tsx asChild prop (always resolves to 'div')
- **File:** `src/components/ui/Card.tsx:42`
- **Tag:** `yagni`
- **Details:** `const Component = asChild ? 'div' : 'div';` — the conditional is a no-op.
- **Cut:** Remove the `asChild` prop and the ternary.

## FINDING 26 — useFocusReturn (single consumer)
- **File:** `src/hooks/useFocusTrap.ts:3-18`
- **Tag:** `yagni`
- **Details:** `useFocusReturn` is exported but consumed only by `Modal.tsx` (the ui/ Modal). Since `useFocusTrap` already handles save/restore internally, the separate export adds a redundant public API.
- **Replace with:** Inline the 6 lines of save/restore logic inside Modal.tsx's useEffect.

## FINDING 27 — Parallel focus trap implementations
- **File:** `src/components/ui/FocusTrap.tsx:1-29` vs `src/components/ui/Modal.tsx:55-58`
- **Tag:** `shrink`
- **Details:** Two independent focus trap mechanisms coexist: `FocusTrap.tsx` (29-line component wrapping `useFocusTrap` hook, used by ~25 ad-hoc modals) and `Modal.tsx` (which calls `useFocusTrap` + `useFocusReturn` directly). Both implement escape handling, ARIA roles, and focus management.
- **Replace with:** Consolidate into a single focus-trap primitive used by both paths.

## FINDING 28 — ManageListings page always shows empty (177 lines of dead logic)
- **File:** `src/pages/ManageListings.tsx:1-177`
- **Tag:** `yagni`
- **Details:** Fetches listings via `setTimeout(() => setListings([]), 1000)` — always returns an empty array. The entire skeleton rendering, listing grid, empty state, and EditListingModal mounting produce zero visible output for the user.
- **Cut:** Either wire to real data or replace with a static placeholder.

## FINDING 29 — ReviewBreakdown hardcoded percentages (97 lines of half-dead code)
- **File:** `src/components/ReviewBreakdown.tsx:34-43`
- **Tag:** `yagni`
- **Details:** The `ratingBars` array has hardcoded percentages `[92, 5, 2, 1, 0]`. The `totalReviews` prop is accepted but never rendered. The left panel and right panel are structurally rigid.
- **Cut:** Either compute percentages from actual review data or remove the prop interface that suggests dynamic behavior.

## FINDING 30 — Card.tsx unused props across the sub-component library
- **File:** `src/components/ui/Card.tsx:1-351`
- **Tag:** `yagni`
- **Details:** Beyond the components being unused (Finding 3), within the Card system: `CardMedia` offers 4 aspect ratios and 3 fit modes, `CardHeader` supports avatar+action slots, `CardFooter` has a `divided` toggle — all configurable but with zero variation since nothing uses them.
- **Cut:** All of this becomes moot when the file is deleted per Finding 3.

---

## Aggregate Impact

| Category | Total lines removable |
|---|---|
| Dead files (delete outright) | ~1,770 |
| Dead exports within live files | ~230 |
| Reinvented stdlib (replace) | ~110 |
| YAGNI abstractions (simplify) | ~200 |
| **Total** | **~2,310** |

Against an estimated 9,500 LOC in `src/`, this represents roughly **24%** of the codebase that can be deleted or simplified without changing any observable behavior.

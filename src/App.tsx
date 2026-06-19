// @context: App root — routing and global layout
// @purpose: HashRouter with lazy-loaded routes for all pages; wraps app in providers (Auth, Theme, Toast, ErrorBoundary)
// @behavior: Route definitions for /, /category/:categoryId, /listing/:id, /messages, /maps, /profile, /manage-listings, /roommate
// @dependencies: react-router-dom, AuthProvider, ThemeProvider, ToastProvider, ErrorBoundary, ScrollToTop
//
// @adr: ADR-001 — HashRouter over BrowserRouter: chosen for static hosting without server URL rewriting
// @adr: ADR-003 — Context API over Redux: only 3 global concerns, no complex state interactions
// @adr: ADR-005 — Vite @ alias → project root: intentional but mismatches tsconfig @/* → src/*
// @adr: ADR-002 — Mock-first data: all API calls fall through to mocks; no real backend needed
//
// @dataflow: User Action → Route Match → Lazy Load Page → Hook Fetch → API Layer → Mock Data → Render
// @dataflow: Listing Search: Home.tsx → useListings({search, category}) → getListings() → MOCK_LISTINGS.filter() → ListingCard[]
// @dataflow: Auth Flow: AuthModal → AuthContext.signIn(email) → {user, session} → Conditional UI render
// @dataflow: Roommate Search: RoommateFinder → client-side filter → RoommateCard[]
// @dataflow: Map View: Maps.tsx → MapTilerView with markers from mock listing coordinates
// @dataflow: Booking: ListingCard → ListingModal → DateScrollPicker → Toast notification (no real booking)
//
// @events: Route change → ScrollToTop effect fires → window.scrollTo(0,0)
// @events: Theme toggle → ThemeContext → setTheme → classList.toggle('dark') on <html>
// @events: Auth signIn → AuthContext → setUser/setSession → all useAuth() consumers re-render
// @events: Toast → ToastProvider.showToast → createPortal → 3s auto-dismiss → AnimatePresence exit
// @events: Error → Component throw → ErrorBoundary.getDerivedStateFromError → ErrorScreen render
//
// @monitoring: All uncaught errors logged via ErrorBoundary.componentDidCatch → console.error
// @monitoring: No structured logging, no metrics, no APM integration
// @logging: No logging strategy defined; errors only surface via console.error and ErrorScreen UI
// @feature-flags: DARK_MODE — toggled via ThemeContext; no backend gating
// @feature-flags: MOCK_AUTH — always on; AuthContext never hits real Supabase
// @feature-flags: MOCK_DATA — all API modules fall through to mocks when real request fails

import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import { MotionConfig } from 'motion/react';
import { ScrollToTop } from './components/ScrollToTop';
import { ThemeProvider } from './lib/ThemeContext';
import { AuthProvider } from './lib/AuthContext';
import { ToastProvider } from './components/ToastProvider';
import ErrorBoundary from './components/errors/ErrorBoundary';
import PageError from './components/ui/ErrorScreen';

// --- Lazy loaded pages (code-split at build time) ---
const Home = lazy(() => import('./pages/Home'));
const ListingDetail = lazy(() => import('./pages/ListingDetail'));
const CategoryListings = lazy(() => import('./pages/CategoryListings'));
const Messages = lazy(() => import('./pages/Messages'));
const Maps = lazy(() => import('./pages/Maps'));
const RoommateFinder = lazy(() => import('./pages/RoommateFinder'));
const Profile = lazy(() => import('./pages/Profile'));
const ManageListings = lazy(() => import('./pages/ManageListings'));

// --- Suspense fallback — skeleton loads immediately, no spinner flash ---
const PageLoader = () => (
  <div className="min-h-screen bg-white animate-pulse">
    {/* Navbar skeleton */}
    <div className="h-16 bg-neutral-100 border-b border-neutral-200 flex items-center px-4 md:px-8 gap-4">
      <div className="w-8 h-8 bg-neutral-200 rounded-full" />
      <div className="h-4 w-32 bg-neutral-200 rounded" />
      <div className="hidden md:flex ml-auto gap-6">
        <div className="h-4 w-16 bg-neutral-200 rounded" />
        <div className="h-4 w-20 bg-neutral-200 rounded" />
        <div className="h-4 w-14 bg-neutral-200 rounded" />
      </div>
    </div>
    {/* Hero skeleton */}
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-16 space-y-6">
      <div className="h-8 w-72 bg-neutral-200 rounded" />
      <div className="h-4 w-96 bg-neutral-200 rounded" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-xl overflow-hidden bg-neutral-100">
            <div className="aspect-[4/3] bg-neutral-200" />
            <div className="p-4 space-y-3">
              <div className="h-4 w-3/4 bg-neutral-200 rounded" />
              <div className="h-3 w-1/2 bg-neutral-200 rounded" />
              <div className="h-3 w-2/3 bg-neutral-200 rounded" />
              <div className="h-5 w-1/3 bg-neutral-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-white focus:text-[#17294F] focus:rounded-full focus:shadow-lg focus:font-bold"
    >
      Skip to main content
    </a>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <MotionConfig reducedMotion="user">
            <Router>
              <SkipLink />
              <ScrollToTop />
              <ErrorBoundary fallback={<PageError />}>
                <Suspense fallback={<PageLoader />}>
                  <div id="main-content">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/listing/:id" element={<ListingDetail />} />
                      <Route path="/category/:categoryId" element={<CategoryListings />} />
                      <Route path="/maps" element={<Maps />} />
                      <Route path="/messages" element={<Messages />} />
                      <Route path="/roommate" element={<RoommateFinder />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/manage-listings" element={<ManageListings />} />
                    </Routes>
                  </div>
                </Suspense>
              </ErrorBoundary>
            </Router>
          </MotionConfig>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

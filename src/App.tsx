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
import React, { Suspense, lazy, useEffect } from 'react';
import { MotionConfig } from 'motion/react';
import { ScrollToTop } from './components/ScrollToTop';
import { ThemeProvider } from './lib/ThemeContext';
import { AuthProvider } from './lib/AuthContext';
import { ToastProvider } from './components/ToastProvider';
import ErrorBoundary from './components/errors/ErrorBoundary';
import PageError from './components/ui/ErrorScreen';
import { startMapPreload } from './lib/mapPreloader';

// --- Lazy loaded pages (code-split at build time) ---
const Home = lazy(() => import('./pages/Home'));
const ListingDetail = lazy(() => import('./pages/ListingDetail'));
const CategoryListings = lazy(() => import('./pages/CategoryListings'));
const Messages = lazy(() => import('./pages/Messages'));
const Maps = lazy(() => import('./pages/Maps'));
const RoommateFinder = lazy(() => import('./pages/RoommateFinder'));
const Profile = lazy(() => import('./pages/Profile'));
const ManageListings = lazy(() => import('./pages/ManageListings'));

// --- Suspense fallback while lazy chunks load ---
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="w-8 h-8 md:w-12 md:h-12 border-4 border-neutral-200 border-t-[#17294F] rounded-full animate-spin"></div>
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
  useEffect(() => {
    const apiKey = import.meta.env.VITE_MAPTILER_API_KEY || "";
    if (apiKey) {
      startMapPreload(apiKey);
    }
  }, []);

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

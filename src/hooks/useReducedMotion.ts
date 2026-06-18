// @context: Accessibility motion preference hook
// @purpose: Reads + watches prefers-reduced-motion media query; gates JS animations
// @behavior: Returns boolean - true when user prefers reduced motion
// @behavior: Initializes from media query on first render; updates on change via event listener
// @behavior: Also handled globally by MotionConfig in App.tsx (reducedMotion="user")
// @performance: No overhead beyond single media query listener; no re-renders from other state
// @side-effects: Registers media query event listener on mount, removes on unmount
// @tests: None — unit tests needed for: initial value from media query, event listener attachment/cleanup
// @dependencies: None
// @owner: Core team
// @config: CSS also disables all animations globally in index.css (overrides this hook's preference)
// @debugging: If animations still play despite reduced motion, check: (1) MotionConfig.reducedMotion prop, (2) CSS global override, (3) browser media query
import { useState, useEffect } from 'react';

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

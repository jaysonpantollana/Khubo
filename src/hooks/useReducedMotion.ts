// @context: Accessibility motion preference
// @purpose: Reads and watches prefers-reduced-motion media query; used to gate animations
// @behavior: Returns boolean - true when user prefers reduced motion
// @behavior: Initializes from media query; updates on change via event listener
// @performance: No overhead beyond media query listener
// @side-effects: Registers media query event listener on mount, removes on unmount
// @dependencies: None
// @config: Also handled globally by MotionConfig in App.tsx (reducedMotion="user")
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

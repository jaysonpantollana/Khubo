// @context: Route change scroll resetter
// @purpose: Scrolls to top of page on every route change (pathname change)
// @behavior: Renders null (no visual output); effect fires on pathname change
// @dependencies: react-router-dom useLocation
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

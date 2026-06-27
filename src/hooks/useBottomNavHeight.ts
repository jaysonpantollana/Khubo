import { useState, useEffect, useCallback } from 'react';

export function useBottomNavHeight(): number {
  const [height, setHeight] = useState(0);

  const measure = useCallback(() => {
    const nav = document.querySelector('[data-bottom-nav]') as HTMLElement;
    if (nav) {
      setHeight(nav.getBoundingClientRect().height);
    }
  }, []);

  useEffect(() => {
    measure();
    const handleResize = () => measure();
    window.addEventListener('resize', handleResize);
    const ro = new ResizeObserver(measure);
    const nav = document.querySelector('[data-bottom-nav]');
    if (nav) ro.observe(nav);
    return () => {
      window.removeEventListener('resize', handleResize);
      ro.disconnect();
    };
  }, [measure]);

  return height;
}

export function useSafeAreaInsets(): { top: number; bottom: number; left: number; right: number } {
  const [insets, setInsets] = useState({ top: 0, bottom: 0, left: 0, right: 0 });

  useEffect(() => {
    const updateInsets = () => {
      const style = getComputedStyle(document.documentElement);
      setInsets({
        top: parseInt(style.getPropertyValue('--sat-top') || '0', 10),
        bottom: parseInt(style.getPropertyValue('--sat-bottom') || '0', 10),
        left: parseInt(style.getPropertyValue('--sat-left') || '0', 10),
        right: parseInt(style.getPropertyValue('--sat-right') || '0', 10),
      });
    };

    updateInsets();
    window.addEventListener('resize', updateInsets);
    window.addEventListener('orientationchange', updateInsets);
    return () => {
      window.removeEventListener('resize', updateInsets);
      window.removeEventListener('orientationchange', updateInsets);
    };
  }, []);

  return insets;
}

export function useContainerPadding(bottomNavHeight: number, safeAreaBottom: number): string {
  const [padding, setPadding] = useState('');

  useEffect(() => {
    const totalBottom = bottomNavHeight + safeAreaBottom + 16;
    setPadding(`pb-[${totalBottom}px]`);
  }, [bottomNavHeight, safeAreaBottom]);

  return padding;
}
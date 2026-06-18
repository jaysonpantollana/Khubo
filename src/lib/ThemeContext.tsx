// @context: Dark/light theme state
// @purpose: Manages theme toggle, persists via localStorage 'theme' key, applies 'dark' class to <html>
// @behavior: State transitions: LIGHT ──toggleTheme()──► DARK ──toggleTheme()──► LIGHT
// @behavior: Initial theme defaults to 'light' (does NOT read OS preference)
// @behavior: On theme change, toggles 'dark' class on document.documentElement (Tailwind dark mode)
// @performance: No re-renders beyond direct consumers
// @side-effects: Writes 'theme' to localStorage on every toggle via state setter
// @dependencies: None
// @known-issues: Does NOT persist initial load from localStorage (always starts 'light')
// @config: Tailwind darkMode: 'class' strategy in tailwind.config.js

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

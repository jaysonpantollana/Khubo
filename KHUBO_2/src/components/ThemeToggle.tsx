// @context: Theme toggle button — dark/light mode switch
// @purpose: Button that toggles between light and dark theme via ThemeContext
// @behavior: Shows Sun or Moon icon based on current theme; calls toggleTheme on click
// @side-effects: Theme changes stored in localStorage via ThemeContext
// @dependencies: ThemeContext (useTheme), lucide-react

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../lib/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={() => {
        toggleTheme();
      }}
      className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Moon size={20} className="text-neutral-800" /> : <Sun size={20} className="text-yellow-400" />}
    </button>
  );
}

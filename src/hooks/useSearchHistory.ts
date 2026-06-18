// @context: Search history hook — localStorage-backed recent searches
// @purpose: Manages a list of recent search queries (max 5) persisted in localStorage
// @behavior: addSearch prepends deduplicated entry; removeSearch filters it out; max 5 items
// @dependencies: react (useState, useEffect), localStorage

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'home_search_history';

export const useSearchHistory = () => {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const addSearch = (query: string) => {
    if (!query.trim()) return;
    setHistory((prev) => {
      const newHistory = [query, ...prev.filter((item) => item !== query)].slice(0, 5);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const removeSearch = (query: string) => {
    setHistory((prev) => {
        const newHistory = prev.filter(item => item !== query);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
        return newHistory;
    })
  }

  return { history, addSearch, removeSearch };
};

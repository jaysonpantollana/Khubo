// @context: Search history cache
// @purpose: Persists 5 most recent unique search queries to localStorage under 'home_search_history' key
// @behavior: addSearch(query): prepends query, removes duplicates, caps at 5, writes to localStorage
// @behavior: removeSearch(query): filters out the query, writes to localStorage
// @behavior: Initializes from localStorage on mount
// @performance: O(n) for add/remove on small array (max 5)
// @side-effects: Writes to localStorage on every addSearch/removeSearch call
// @dependencies: None
// @config: localStorage key: 'home_search_history', max entries: 5
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

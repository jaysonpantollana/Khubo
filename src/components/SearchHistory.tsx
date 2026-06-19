// @context: Search history display — recent search chips
// @purpose: Shows recent search queries as removable chips; each item clickable to re-search
// @behavior: Renders history array as horizontal list of chips with remove (X) button
// @behavior: Empty state (no history) returns null
// @dependencies: motion, lucide-react

import React from 'react';
import { History, X } from 'lucide-react';


interface SearchHistoryProps {
  history: string[];
  onSelect: (query: string) => void;
  onRemove: (query: string) => void;
}

export const SearchHistory: React.FC<SearchHistoryProps> = ({ history, onSelect, onRemove }) => {
  if (history.length === 0) return null;

  return (
    <div className="mt-4 px-2">
      <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 px-2 flex items-center gap-2">
        <History size={14} /> Recent Searches
      </h3>
      <div className="flex flex-wrap gap-2">
          {history.map((query) => (
            <button
              key={query}
              onClick={() => onSelect(query)}
              className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 px-3 py-1.5 rounded-full text-xs font-medium text-neutral-800 dark:text-neutral-200 transition-colors"
            >
              {query}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(query);
                }}
                className="hover:text-red-500 rounded-full"
              >
                <X size={12} />
              </span>
            </button>
          ))}
      </div>
    </div>
  );
};

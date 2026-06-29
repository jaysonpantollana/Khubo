import React, { useMemo } from 'react';
import { Search, TrendingUp } from 'lucide-react';

interface SearchDropdownProps<T> {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onClose: () => void;
  onSelect: (item: T) => void;
  items: T[];
  filterItems: (items: T[], query: string) => T[];
  renderItem: (item: T, onSelect: () => void) => React.ReactNode;
  trendingTags: string[];
  scrollAnchorId: string;
  emptyText?: string;
  trendingTitle?: string;
  resultsTitle?: string;
  resultsIcon?: React.ReactNode;
}

export default function SearchDropdown<T extends { id: string }>({
  searchQuery,
  setSearchQuery,
  onClose,
  onSelect,
  items,
  filterItems,
  renderItem,
  trendingTags,
  scrollAnchorId,
  emptyText = 'No results match your search',
  trendingTitle = 'Trending Searches',
  resultsTitle = 'Matching Results',
  resultsIcon,
}: SearchDropdownProps<T>) {
  const query = searchQuery.trim().toLowerCase();

  const matches = useMemo(() => {
    if (!query) {
      return {
        popular: trendingTags.slice(0, 6),
        results: items.slice(0, 3),
      };
    }

    const matchingTags = trendingTags
      .filter(tag => tag.toLowerCase().includes(query))
      .slice(0, 4);

    const matchingResults = filterItems(items, query).slice(0, 3);

    return {
      popular: matchingTags,
      results: matchingResults,
    };
  }, [query, items, filterItems, trendingTags]);

  const handleSuggestionClick = (text: string) => {
    setSearchQuery(text);
    setTimeout(() => {
      const resultsDiv = document.getElementById(scrollAnchorId) || document.querySelector('main');
      resultsDiv?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    onClose();
  };

  return (
    <div className="absolute top-[100%] mt-2 md:mt-3 left-0 right-0 bg-white rounded-2xl md:rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden z-[99] text-left pointer-events-auto flex flex-col md:flex-row max-h-[60dvh] md:max-h-[360px]">
      {/* Left panel: Trending tags */}
      <div className="flex-1 border-b md:border-b-0 md:border-r border-neutral-100 p-4 sm:p-5 overflow-y-auto">
        <div>
          <h4 className="text-[11px] sm:text-xs font-black uppercase text-neutral-400 tracking-wider flex items-center gap-1.5 mb-3">
            <TrendingUp size={13} className="text-[#2252D6]" />
            {trendingTitle}
          </h4>
          <div className="flex flex-wrap gap-2">
            {matches.popular.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClick(item)}
                className="text-xs sm:text-[13px] font-bold bg-[#17294F]/5 text-[#17294F] hover:bg-[#17294F] hover:text-white px-3 py-1.5 rounded-full transition-all duration-150 flex items-center gap-1.5 cursor-pointer focus-visible:outline-none"
              >
                <Search size={11} />
                {item}
              </button>
            ))}
            {matches.popular.length === 0 && (
              <span className="text-xs text-neutral-400 italic">No matching tags</span>
            )}
          </div>
        </div>
      </div>

      {/* Right panel: Results */}
      <div className="flex-[1.2] bg-neutral-50/50 p-4 sm:p-5 overflow-y-auto flex flex-col gap-4">
        <div>
          <h4 className="text-[11px] sm:text-xs font-black uppercase text-neutral-400 tracking-wider flex items-center gap-1.5 mb-3">
            {resultsIcon}
            {resultsTitle}
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {matches.results.map((item) => (
              <div key={item.id}>
                {renderItem(item, () => {
                  onSelect(item);
                  onClose();
                })}
              </div>
            ))}
            {matches.results.length === 0 && (
              <div className="p-4 bg-white rounded-xl text-center border border-dashed border-neutral-200">
                <p className="text-xs text-neutral-400">{emptyText}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

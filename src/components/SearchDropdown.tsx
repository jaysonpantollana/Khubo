import React, { useMemo } from 'react';
import { Search, TrendingUp } from 'lucide-react';

interface SearchDropdownProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onClose: () => void;
  trendingTags: string[];
  scrollAnchorId: string;
  trendingTitle?: string;
}

export default function SearchDropdown({
  searchQuery,
  setSearchQuery,
  onClose,
  trendingTags,
  scrollAnchorId,
  trendingTitle = 'Trending Searches',
}: SearchDropdownProps) {
  const query = searchQuery.trim().toLowerCase();

  const popular = useMemo(() => {
    if (!query) {
      return trendingTags.slice(0, 6);
    }
    return trendingTags
      .filter(tag => tag.toLowerCase().includes(query))
      .slice(0, 4);
  }, [query, trendingTags]);

  const handleSuggestionClick = (text: string) => {
    setSearchQuery(text);
    setTimeout(() => {
      const resultsDiv = document.getElementById(scrollAnchorId) || document.querySelector('main');
      resultsDiv?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    onClose();
  };

  return (
    <div className="absolute top-[100%] mt-2 md:mt-3 left-0 right-0 bg-white rounded-2xl md:rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden z-[99] text-left pointer-events-auto max-h-[60dvh] md:max-h-[360px] p-4 sm:p-5">
      <div className="flex flex-col gap-2">
        {popular.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleSuggestionClick(item)}
            className="text-xs sm:text-[13px] font-bold text-[#17294F] hover:bg-[#17294F] hover:text-white px-3 py-1.5 rounded-full transition-all duration-150 w-fit flex items-center gap-1.5 cursor-pointer focus-visible:outline-none"
          >
            <Search size={11} />
            {item}
          </button>
        ))}
        {popular.length === 0 && (
          <span className="text-xs text-neutral-400 italic">No matching tags</span>
        )}
      </div>
    </div>
  );
}

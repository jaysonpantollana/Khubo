import React, { useRef, useState, useCallback } from 'react';
import { Search, MapPin, Wallet, ChevronDown, ChevronUp, X } from 'lucide-react';
import { Listing } from '../types';
import SearchDropdown from './SearchDropdown';
import { BARANGAY_LOCATIONS, BUDGET_RANGES } from '../lib/constants';

interface StickySearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isStickySearchActive: boolean;
  setIsStickySearchActive: (active: boolean) => void;
  hideStickyDropdown: boolean;
  setHideStickyDropdown: (hide: boolean) => void;
  stickyActiveDropdown: 'location' | 'budget' | 'general' | null;
  setStickyActiveDropdown: (dropdown: 'location' | 'budget' | 'general' | null) => void;
  selectedStickyLocation: string | null;
  setSelectedStickyLocation: (location: string | null) => void;
  selectedStickyBudget: string | null;
  setSelectedStickyBudget: (budget: string | null) => void;
  listings: Listing[];
  onListingClick: (id: string) => void;
  onSearch: (query: string) => void;
}

export function StickySearchBar({
  searchQuery,
  setSearchQuery,
  isStickySearchActive,
  setIsStickySearchActive,
  hideStickyDropdown,
  setHideStickyDropdown,
  stickyActiveDropdown,
  setStickyActiveDropdown,
  selectedStickyLocation,
  setSelectedStickyLocation,
  selectedStickyBudget,
  setSelectedStickyBudget,
  listings,
  onListingClick,
  onSearch,
}: StickySearchBarProps) {
  const stickyDropdownRef = useRef<HTMLDivElement>(null);
  const budgetScrollRef = React.useRef<HTMLDivElement>(null);
  const locationScrollRef = React.useRef<HTMLDivElement>(null);
  const [budgetAtTop, setBudgetAtTop] = useState(true);
  const [budgetAtBottom, setBudgetAtBottom] = useState(false);
  const [locationAtTop, setLocationAtTop] = useState(true);
  const [locationAtBottom, setLocationAtBottom] = useState(false);

  const handleBudgetScroll = useCallback(() => {
    const el = budgetScrollRef.current;
    if (!el) return;
    setBudgetAtTop(el.scrollTop <= 0);
    setBudgetAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 1);
  }, []);

  const handleLocationScroll = useCallback(() => {
    const el = locationScrollRef.current;
    if (!el) return;
    setLocationAtTop(el.scrollTop <= 0);
    setLocationAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 1);
  }, []);

  return (
    <div className="bg-white sticky top-0 z-40 border-b border-gray-100 shadow-sm">
      <div className="max-w-[2520px] mx-auto xl:px-12 md:px-12 sm:px-4 px-0 flex items-center justify-between min-h-[70px]">
        <div className="flex items-center justify-between w-full py-3 px-2 sm:px-0">
          <div className="hidden md:block flex-1 min-w-0"></div>
          <div
            className="flex justify-center flex-[3] lg:flex-none min-w-0 w-full px-2 sm:px-0 relative"
            ref={stickyDropdownRef}
          >
            {/* Dropdown panels — rendered OUTSIDE the pill so they expand below it */}
            {!isStickySearchActive && stickyActiveDropdown === "location" && (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-full max-w-[340px] sm:max-w-[480px] md:max-w-[650px] lg:max-w-[750px] bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.2)] md:shadow-xl border border-neutral-100 p-2 md:p-4 z-[100] text-left cursor-default pointer-events-auto">
                {!locationAtTop && (
                <button
                  onClick={() => locationScrollRef.current?.scrollBy({ top: -40, behavior: "smooth" })}
                  className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center bg-neutral-100 g-neutral-200 rounded-full transition-all shadow-sm z-10"
                  aria-label="Scroll up"
                >
                  <ChevronUp size={18} strokeWidth={2.5} className="text-neutral-500" />
                </button>
                )}
                {!locationAtBottom && (
                <button
                  onClick={() => locationScrollRef.current?.scrollBy({ top: 40, behavior: "smooth" })}
                  className="absolute bottom-3 right-3 w-10 h-10 flex items-center justify-center bg-neutral-100 g-neutral-200 rounded-full transition-all shadow-sm z-10"
                  aria-label="Scroll down"
                >
                  <ChevronDown size={18} strokeWidth={2.5} className="text-neutral-500" />
                </button>
                )}
                <div
                  ref={locationScrollRef}
                  onScroll={handleLocationScroll}
                  className="max-h-[200px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pr-10"
                >
                  <div className="grid grid-cols-1 gap-1">
                    {BARANGAY_LOCATIONS.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => {
                          setSelectedStickyLocation(loc);
                          setStickyActiveDropdown(null);
                        }}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-transparent g-neutral-100 transition-all text-left w-full"
                      >
                        <MapPin size={12} className="text-[#2252D6] flex-shrink-0" />
                        <span className="font-medium text-neutral-900 text-xs whitespace-nowrap">{loc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {!isStickySearchActive && stickyActiveDropdown === "budget" && (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-full max-w-[340px] sm:max-w-[480px] md:max-w-[650px] lg:max-w-[750px] bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.2)] md:shadow-xl border border-neutral-100 p-2 md:p-4 z-[100] text-left pointer-events-auto">
                {!budgetAtTop && (
                <button
                  onClick={() => budgetScrollRef.current?.scrollBy({ top: -40, behavior: "smooth" })}
                  className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center bg-neutral-100 g-neutral-200 rounded-full transition-all shadow-sm z-10"
                  aria-label="Scroll up"
                >
                  <ChevronUp size={18} strokeWidth={2.5} className="text-neutral-500" />
                </button>
                )}
                {!budgetAtBottom && (
                <button
                  onClick={() => budgetScrollRef.current?.scrollBy({ top: 40, behavior: "smooth" })}
                  className="absolute bottom-3 right-3 w-10 h-10 flex items-center justify-center bg-neutral-100 g-neutral-200 rounded-full transition-all shadow-sm z-10"
                  aria-label="Scroll down"
                >
                  <ChevronDown size={18} strokeWidth={2.5} className="text-neutral-500" />
                </button>
                )}
                <div
                  ref={budgetScrollRef}
                  onScroll={handleBudgetScroll}
                  className="max-h-[200px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pr-10"
                >
                  <div className="grid grid-cols-1 gap-1">
                    {BUDGET_RANGES.map((range) => (
                      <button
                        key={range.label}
                        onClick={() => {
                          setSelectedStickyBudget(range.label);
                          setStickyActiveDropdown(null);
                        }}
                        className="flex flex-col px-3 py-2.5 rounded-lg bg-transparent g-neutral-100 text-left w-full"
                      >
                        <span className="font-medium text-neutral-900 text-xs whitespace-nowrap">{range.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Pill search bar */}
            <div
              id="2nd-search-bar"
              className="bg-white border border-neutral-200 p-1 sm:p-2 md:p-2 flex items-center text-neutral-800 shadow-lg w-[calc(100vw-1.5rem)] max-w-[750px] z-40 rounded-full pointer-events-auto cursor-default relative"
            >
              {isStickySearchActive ? (
                <>
                  <div className="flex-1 flex items-center pl-4 md:pl-5 pr-0 py-0 w-full">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setHideStickyDropdown(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setHideStickyDropdown(true);
                        }
                      }}
                      placeholder="Search rooms, location..."
                      className="w-full bg-transparent border-none outline-none text-xs sm:text-sm font-bold text-neutral-800 placeholder:text-neutral-400 focus:ring-0 p-0"
                      autoFocus
                    />
                    {searchQuery && (
                      <button
                        onClick={() => {
                          setSearchQuery("");
                          setHideStickyDropdown(true);
                        }}
                        className="p-1 g-neutral-100 rounded-full mr-2 flex-shrink-0"
                        aria-label="Clear search"
                      >
                        <X className="w-3.5 h-3.5 text-neutral-500" />
                      </button>
                    )}
                    <button
                      onClick={() => {
                        onSearch(searchQuery);
                        setIsStickySearchActive(false);
                      }}
                      className="bg-[#17294F] p-1.5 sm:p-2.5 rounded-full shadow-md ml-0.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white flex-shrink-0 flex items-center justify-center cursor-pointer"
                      aria-label="Search"
                    >
                      <Search size={14} className="text-white sm:hidden" />
                      <Search size={16} className="text-white hidden sm:block" />
                    </button>
                  </div>
                  {!hideStickyDropdown && (
                    <SearchDropdown
                      searchQuery={searchQuery}
                      setSearchQuery={(val) => {
                        setSearchQuery(val);
                        setHideStickyDropdown(true);
                      }}
                      onClose={() => {
                        setHideStickyDropdown(true);
                        setIsStickySearchActive(false);
                      }}
                      trendingTags={['Near MSU-IIT', 'Solo Room', 'All Female', 'Affordable', 'With Aircon', 'WiFi Included']}
                      scrollAnchorId="search-results-anchor"
                      trendingTitle="Trending Searches"
                    />
                  )}
                </>
              ) : (
                <>
                  {/* Sticky Location Section */}
                  <div className="flex-1 min-w-0">
                    <div
                      role="button"
                      tabIndex={0}
                      aria-label="Location: Location"
                      onClick={() => {
                        setStickyActiveDropdown(
                          stickyActiveDropdown === "location" ? null : "location",
                        );
                      }}
                      onKeyDown={(e) =>
                        (e.key === "Enter" || e.key === " ") &&
                        (e.preventDefault(),
                        setStickyActiveDropdown(
                          stickyActiveDropdown === "location" ? null : "location",
                        ))
                      }
                      className={`w-full flex items-center justify-between px-1 sm:px-3 md:pl-5 md:pr-3 py-1.5 md:py-2 cursor-pointer group select-none focus-visible:outline-none ${
                        stickyActiveDropdown === "location"
                          ? "bg-neutral-100 rounded-full text-[#17294F] relative z-[60] shadow-sm"
                          : "g-neutral-50 rounded-full"
                      }`}
                    >
                      <div className="flex items-center gap-1 md:gap-2.5 min-w-0">
                        <MapPin className="text-[#2252D6] flex-shrink-0 w-2.5 h-2.5 sm:w-4 sm:h-4 md:w-[15px] md:h-[15px]" />
                        <span className="text-[9px] sm:text-sm md:text-sm font-bold truncate md:whitespace-nowrap text-neutral-800">
                          {selectedStickyLocation || "Location"}
                        </span>
                      </div>
                      <ChevronDown
                        className={`flex-shrink-0 opacity-50 text-neutral-500 w-2.5 h-2.5 sm:w-4 sm:h-4 ${stickyActiveDropdown === "location" ? "rotate-180" : ""}`}
                      />
                    </div>

                  </div>

                  <div className="w-[1px] h-2.5 sm:h-4 bg-neutral-200 flex-shrink-0 self-center" />

                  {/* Sticky Budget Section */}
                  <div className="flex-1 min-w-0">
                    <div
                      role="button"
                      tabIndex={0}
                      aria-label="Add budget"
                      onClick={() => {
                        setStickyActiveDropdown(
                          stickyActiveDropdown === "budget" ? null : "budget",
                        );
                      }}
                      onKeyDown={(e) =>
                        (e.key === "Enter" || e.key === " ") &&
                        (e.preventDefault(),
                        setStickyActiveDropdown(
                          stickyActiveDropdown === "budget" ? null : "budget",
                        ))
                      }
                      className={`w-full flex items-center justify-between px-1 sm:px-3 md:pl-5 md:pr-3 py-1.5 md:py-2 cursor-pointer group select-none focus-visible:outline-none ${
                        stickyActiveDropdown === "budget"
                          ? "bg-neutral-100 rounded-full text-[#17294F] relative z-[60] shadow-sm"
                          : "g-neutral-50 rounded-full"
                      }`}
                    >
                      <div className="flex items-center gap-1 md:gap-2.5 min-w-0">
                        <Wallet className="text-[#2252D6] flex-shrink-0 w-2.5 h-2.5 sm:w-4 sm:h-4 md:w-[15px] md:h-[15px]" />
                        <span className="text-[9px] sm:text-sm md:text-sm font-bold truncate md:whitespace-nowrap text-neutral-800">
                          {selectedStickyBudget || "Budget"}
                        </span>
                      </div>
                      <ChevronDown
                        className={`flex-shrink-0 opacity-50 text-neutral-500 w-2.5 h-2.5 sm:w-4 sm:h-4 ${stickyActiveDropdown === "budget" ? "rotate-180" : ""}`}
                      />
                    </div>

                  </div>

                  {/* Search Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const hasSelections = selectedStickyLocation || selectedStickyBudget;
                      if (hasSelections) {
                        const terms = [];
                        if (selectedStickyLocation) terms.push(selectedStickyLocation);
                        if (selectedStickyBudget) terms.push(selectedStickyBudget);
                        setSearchQuery(terms.join(" "));
                        setStickyActiveDropdown(null);
                        const searchAnchor = document.getElementById("search-results-anchor");
                        if (searchAnchor) {
                          searchAnchor.scrollIntoView({ behavior: "smooth" });
                        }
                      } else {
                        onSearch(searchQuery);
                        setSearchQuery("");
                        setIsStickySearchActive(true);
                        setStickyActiveDropdown(null);
                      }
                    }}
                    aria-label="Search"
                    className="bg-[#17294F] p-1.5 sm:p-2.5 rounded-full shadow-md ml-0.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white flex-shrink-0 flex items-center justify-center cursor-pointer"
                  >
                    <Search size={14} className="text-white sm:hidden" />
                    <Search size={16} className="text-white hidden sm:block" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

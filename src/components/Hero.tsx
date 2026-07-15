// @context: Home page hero section — search banner with dropdowns
// @purpose: Full-width hero with background image, search bar, location/date/budget dropdowns, announcements toggle
// @behavior: Search bar toggles between idle and active input states; dropdowns for location, dates, budget
// @behavior: External click closes dropdowns; announcements overlay trigger; responsive layout
// @side-effects: useEffect for click-outside handler and window resize listener
// @dependencies: SearchDropdown, DateScrollPicker, AnnouncementsOverlay, motion, lucide-react
// @known-issues: window.innerWidth initial check not reactive to resize (separate useEffect handles it)

import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  MapPin,
  Megaphone,
  ChevronDown,
  ChevronUp,
  Wallet,
  X,
  Building,
  Star,
} from "lucide-react";

import SearchDropdown from "./SearchDropdown";
import { AnnouncementsOverlay } from "./AnnouncementsOverlay";
import { useListings } from "../hooks/useListings";
import { Listing } from "../types";

interface HeroProps {
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  isSearchActive?: boolean;
  setIsSearchActive?: (active: boolean) => void;
  suppressDropdown?: boolean;
}

export default function Hero({
  searchQuery = "",
  setSearchQuery = () => {},
  isSearchActive = false,
  setIsSearchActive = () => {},
  suppressDropdown = false,
}: HeroProps) {
  const { listings } = useListings();
  const [activeDropdown, setActiveDropdown] = useState<
    "location" | "budget" | "general" | null
  >(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [hideDropdown, setHideDropdown] = useState(false);
  const [isAnnouncementsOpen, setIsAnnouncementsOpen] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const budgetScrollRef = useRef<HTMLDivElement>(null);

  const hasSelections = selectedLocation || selectedBudget;

  const budgetRanges = [
    { label: "less 1k" },
    { label: "₱1k - ₱2k" },
    { label: "₱2k - ₱3k" },
    { label: "₱3k - ₱4k" },
    { label: "₱4k - ₱5k" },
    { label: "₱5k - ₱6k" },
    { label: "₱6k - ₱7k" },
    { label: "₱7k - ₱8k" },
    { label: "₱8k - ₱9k" },
    { label: "₱9k - ₱10k" },
    { label: "10k+" },
  ];

  useEffect(() => {
    if (isSearchActive) {
      setHideDropdown(false);
    }
  }, [isSearchActive]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (suppressDropdown) {
      setActiveDropdown(null);
      setIsSearchActive(false);
    }
  }, [suppressDropdown, setIsSearchActive]);

  const toggleDropdown = (
    dropdown: "location" | "budget" | "general",
  ) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="relative min-h-[440px] md:h-[500px] w-full z-50">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg_1.png')" }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 max-w-[2520px] mx-auto h-full px-4 md:px-12">
        {/* Top bar with Search - Absolute to not affect centering of main content */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between py-4 md:py-6 px-4 md:px-12 gap-4 z-20">
          <button
            aria-label="Home"
            className="flex items-center justify-center overflow-hidden w-10 h-10 md:w-16 md:h-16 transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 rounded-xl"
          >
            <img
              src="/khubo Logo.png"
              alt="Khubo Logo"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </button>

          <button
            aria-label="Announcements"
            onClick={() => setIsAnnouncementsOpen(true)}
            className="flex items-center justify-center w-10 h-10 md:w-16 md:h-16 bg-transparent text-white transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full"
          >
            <Megaphone className="w-5 h-5 md:w-8 md:h-8" />
          </button>
        </div>

        {/* Center Content - Perfectly symmetrical */}
        <div className="flex flex-col items-center justify-center text-center h-full pt-8 md:pt-10">
          <h1
            className="flex flex-row items-center justify-center gap-x-4 md:gap-x-6 text-white px-4"
          >
            <span className="font-noto-serif italic text-xl sm:text-2xl md:text-[35px] tracking-[0.2em] md:tracking-[0.3em] opacity-80 whitespace-nowrap">
              WELCOME TO
            </span>
            <span className="font-roboto font-bold text-2xl sm:text-3xl md:text-[35px] tracking-[0.1em]">
              KHUBO
            </span>
          </h1>

          <div
            className="relative mt-5 md:mt-12 w-full flex justify-center"
            ref={dropdownRef}
          >
            <div
              className="bg-white/10 backdrop-blur-md border border-white/20 p-1.5 md:p-2 rounded-full flex items-center text-white shadow-2xl w-[98%] max-w-[450px] md:max-w-[700px] lg:max-w-[820px] relative z-[95] transition-all duration-300 pointer-events-auto cursor-default"
            >
              {isSearchActive ? (
                <>
                  <div className="flex-1 flex items-center pl-4 md:pl-6 pr-0 py-0 w-full">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setHideDropdown(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setHideDropdown(true);
                        }
                      }}
                      placeholder="what are you looking for?"
                      className="w-full bg-transparent border-none outline-none text-xs sm:text-sm md:text-base font-bold text-white placeholder:text-white/50 focus:ring-0 p-0"
                      autoFocus
                    />
                    {searchQuery && (
                      <button
                        onClick={() => {
                          setSearchQuery("");
                          setHideDropdown(true);
                        }}
                        className="p-1 hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
                        aria-label="Clear search"
                      >
                        <X className="w-4 h-4 text-white/80" />
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setIsSearchActive(false);
                      }}
                      className="bg-[#17294F] p-2 md:p-4 rounded-full transition-all duration-200 shadow-lg ml-0.5 md:ml-1.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white flex-shrink-0 flex items-center justify-center cursor-pointer"
                      aria-label="Search"
                    >
                      <Search
                        size={16}
                        className="text-white group-hover:stroke-[3px] transition-all md:hidden"
                      />
                      <Search
                        size={22}
                        className="text-white group-hover:stroke-[3px] transition-all hidden md:block"
                      />
                    </button>
                  </div>
                  {!suppressDropdown && !hideDropdown && (
                    <SearchDropdown
                      searchQuery={searchQuery}
                      setSearchQuery={(val) => {
                        setSearchQuery(val);
                        setHideDropdown(true);
                      }}
                      onClose={() => {
                        setHideDropdown(true);
                        setIsSearchActive(false);
                      }}
                      onSelect={() => {}}
                      items={listings || []}
                      filterItems={(items, query) =>
                        items.filter(listing =>
                          listing.title.toLowerCase().includes(query) ||
                          listing.location.toLowerCase().includes(query) ||
                          listing.category.toLowerCase().includes(query) ||
                          listing.description.toLowerCase().includes(query)
                        )
                      }
                      renderItem={(listing, onSelect) => (
                        <div
                          onClick={onSelect}
                          className="flex gap-3 bg-white p-2.5 rounded-xl border border-neutral-100 hover:border-[#17294F]/20 hover:shadow-sm transition-all duration-150 cursor-pointer group"
                        >
                          <div className="w-14 h-14 rounded-lg overflow-hidden bg-neutral-200 flex-shrink-0 relative">
                            <img
                              src={listing.image}
                              alt={listing.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute top-1 left-1 bg-[#17294F] text-white text-[8px] sm:text-[9px] font-extrabold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                              <Star size={7} fill="currentColor" stroke="none" />
                              {listing.rating.toFixed(1)}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0 text-left flex flex-col justify-between py-0.5">
                            <div className="min-w-0">
                              <h5 className="text-xs sm:text-sm font-extrabold text-neutral-900 leading-snug truncate group-hover:text-[#2252D6] transition-colors">{listing.title}</h5>
                              <p className="text-[10px] sm:text-xs text-neutral-500 truncate flex items-center mt-1">
                                <MapPin size={10} className="mr-0.5" />
                                {listing.location}
                              </p>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs sm:text-[13px] font-black text-[#17294F]">₱{listing.price.toLocaleString()}/mo</span>
                              <span className="text-[9px] sm:text-[10px] bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded font-semibold font-mono">{listing.category}</span>
                            </div>
                          </div>
                        </div>
                      )}
                      trendingTags={['Near MSU-IIT', 'Solo Room', 'All Female', 'Affordable', 'With Aircon', 'WiFi Included']}
                      scrollAnchorId="search-results-anchor"
                      emptyText="No rooms match your search"
                      trendingTitle="Trending Searches"
                      resultsTitle="Matching Dorms & Rooms"
                      resultsIcon={<Building size={13} className="text-[#2252D6]" />}
                    />
                  )}
                </>
              ) : (
                <>
                  {/* Location Section */}
                  <div className="flex-[1.2] min-w-0">
                    <div
                      role="button"
                      tabIndex={0}
                      aria-label="Location: Location"
                      onClick={() => toggleDropdown("location")}
                      onKeyDown={(e) =>
                        (e.key === "Enter" || e.key === " ") &&
                        (e.preventDefault(), toggleDropdown("location"))
                      }
                      className={`w-full flex items-center justify-between px-1.5 md:pl-6 md:pr-4 py-2.5 md:py-3.5 transition-all cursor-pointer group select-none focus-visible:outline-none ${
                        activeDropdown === "location"
                          ? "bg-white rounded-full text-[#17294F] relative z-[60] shadow-[0_-5px_10px_rgba(0,0,0,0.05)] md:shadow-md"
                          : "hover:bg-white/5 rounded-full"
                      }`}
                    >
                      <div className="flex items-center gap-1 md:gap-3 min-w-0">
                        <MapPin
                          className={`${activeDropdown === "location" ? "text-[#2252D6]" : "text-[#2252D6]"} flex-shrink-0 w-3 h-3 md:w-[16px] md:h-[16px]`}
                        />
                        <span
                          className={`text-[10px] md:text-base font-bold truncate md:whitespace-nowrap ${activeDropdown === "location" ? "text-neutral-900" : "text-white"}`}
                        >
                          {selectedLocation ? selectedLocation : "Location"}
                        </span>
                      </div>
                      <ChevronDown
                        className={`flex-shrink-0 opacity-50 group-hover:opacity-100 transition-all w-3 h-3 md:w-4 md:h-4 ${activeDropdown === "location" ? "rotate-180 text-neutral-900" : ""}`}
                      />
                    </div>

                      {activeDropdown === "location" && (
                        <div
                          className="absolute top-[100%] mt-2 left-0 w-full bg-white rounded-2xl md:rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.2)] md:shadow-xl border border-neutral-100 p-3 md:p-6 z-50 text-left"
                        >
                          <div className="space-y-3 md:space-y-4">
                            <div>
                              <div
                                className="flex items-center px-2.5 py-2 block bg-neutral-100 rounded-xl mb-2 focus-within:ring-2 focus-within:ring-[#2252D6]/20 transition-all cursor-text"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  (
                                    e.currentTarget.querySelector(
                                      "input",
                                    ) as HTMLInputElement
                                  )?.focus();
                                }}
                              >
                                <Search className="w-3.5 h-3.5 md:w-4 md:h-4 text-neutral-400 mr-1.5 flex-shrink-0" />
                                <input
                                  type="text"
                                  placeholder="Search..."
                                  className="w-full bg-transparent border-none outline-none text-xs md:text-sm font-medium text-neutral-900 placeholder:text-neutral-400 p-0 focus:ring-0"
                                />
                              </div>
                              <div className="space-y-1">
                                {["Iligan City"].map((loc) => (
                                  <button
                                    key={loc}
                                    onClick={() => {
                                      setSelectedLocation(loc);
                                      setActiveDropdown(null);
                                    }}
                                    className="w-full flex items-center gap-2 md:gap-3 p-1.5 md:p-2 rounded-xl hover:bg-neutral-50 transition-colors group"
                                  >
                                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-[#2252D6]/10 flex items-center justify-center text-[#2252D6] group-hover:bg-[#2252D6] group-hover:text-white transition-all flex-shrink-0">
                                      <MapPin
                                        size={12}
                                        className="md:w-3.5 md:h-3.5"
                                      />
                                    </div>
                                    <span className="font-medium text-neutral-800 text-xs md:text-sm whitespace-nowrap">
                                      {loc}
                                    </span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                  </div>

                  <div className="w-[1px] h-5 md:h-8 bg-white/20" />

                  {/* Budget Section */}
                  <div className="flex-1 min-w-0">
                    <div
                      role="button"
                      tabIndex={0}
                      aria-label="Add budget"
                      onClick={() => toggleDropdown("budget")}
                      onKeyDown={(e) =>
                        (e.key === "Enter" || e.key === " ") &&
                        (e.preventDefault(), toggleDropdown("budget"))
                      }
                      className={`w-full flex items-center justify-between px-1.5 md:pl-6 md:pr-4 py-2.5 md:py-3.5 transition-all cursor-pointer group select-none focus-visible:outline-none ${
                        activeDropdown === "budget"
                          ? "bg-white rounded-full text-[#17294F] relative z-[60] shadow-[0_-5px_10px_rgba(0,0,0,0.05)] md:shadow-md"
                          : "hover:bg-white/5 rounded-full"
                      }`}
                    >
                      <div className="flex items-center gap-1 md:gap-3 min-w-0">
                        <Wallet className="text-[#2252D6] flex-shrink-0 w-3 h-3 md:w-[16px] md:h-[16px]" />
                        <span
                          className={`text-[10px] md:text-base font-bold truncate md:whitespace-nowrap ${activeDropdown === "budget" ? "text-neutral-900" : "text-white"}`}
                        >
                          {selectedBudget ? selectedBudget : "Budget"}
                        </span>
                      </div>
                      <ChevronDown
                        className={`flex-shrink-0 opacity-50 group-hover:opacity-100 transition-all w-3 h-3 md:w-4 md:h-4 ${activeDropdown === "budget" ? "rotate-180 text-neutral-900" : ""}`}
                      />
                    </div>

                      {activeDropdown === "budget" && (
                        <div
                          className="absolute top-[100%] mt-2 left-0 w-full bg-white rounded-2xl md:rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.2)] md:shadow-xl border border-neutral-100 p-3 md:p-6 z-50 text-left"
                        >
                          <div className="flex gap-2">
                            <div
                              ref={budgetScrollRef}
                              className="flex-1 max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-200"
                            >
                              <div className="grid grid-cols-1 gap-1">
                                {budgetRanges.map((range) => (
                                  <button
                                    key={range.label}
                                    onClick={() => {
                                      setSelectedBudget(range.label);
                                      setActiveDropdown(null);
                                    }}
                                    className="flex flex-col px-3 py-2.5 rounded-lg bg-transparent hover:bg-neutral-100 transition-all text-left w-full"
                                  >
                                    <span className="font-medium text-neutral-900 text-xs md:text-sm">
                                      {range.label}
                                    </span>
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div className="flex flex-col gap-1 flex-shrink-0">
                              <button
                                onClick={() => budgetScrollRef.current?.scrollBy({ top: -40, behavior: "smooth" })}
                                className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-colors"
                                aria-label="Scroll up"
                              >
                                <ChevronUp className="w-4 h-4 text-neutral-600" />
                              </button>
                              <button
                                onClick={() => budgetScrollRef.current?.scrollBy({ top: 40, behavior: "smooth" })}
                                className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-colors"
                                aria-label="Scroll down"
                              >
                                <ChevronDown className="w-4 h-4 text-neutral-600" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (hasSelections) {
                        const terms = [];
                        if (selectedLocation) terms.push(selectedLocation);
                        if (selectedBudget) terms.push(selectedBudget);
                        setSearchQuery(terms.join(" "));
                        setActiveDropdown(null);
                        const searchAnchor = document.getElementById(
                          "search-results-anchor",
                        );
                        if (searchAnchor) {
                          searchAnchor.scrollIntoView({ behavior: "smooth" });
                        }
                      } else {
                        setSearchQuery("");
                        setIsSearchActive(true);
                        setActiveDropdown(null);
                      }
                    }}
                    aria-label="Search"
                    className="bg-[#17294F] p-2 md:p-4 rounded-full transition-all duration-200 shadow-lg ml-0.5 md:ml-1.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white flex-shrink-0 flex items-center justify-center cursor-pointer"
                  >
                    <Search
                      size={16}
                      className="text-white group-hover:stroke-[3px] transition-all md:hidden"
                    />
                    <Search
                      size={22}
                      className="text-white group-hover:stroke-[3px] transition-all hidden md:block"
                    />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <AnnouncementsOverlay
        isOpen={isAnnouncementsOpen}
        onClose={() => setIsAnnouncementsOpen(false)}
      />
    </div>
  );
}



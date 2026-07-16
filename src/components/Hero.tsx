// @context: Home page hero section — search banner with dropdowns
// @purpose: Full-width hero with background image, search bar, location/date/budget dropdowns, announcements toggle
// @behavior: Search bar toggles between idle and active input states; dropdowns for location, dates, budget
// @behavior: External click closes dropdowns; announcements overlay trigger
// @side-effects: useEffect for click-outside handler
// @dependencies: SearchDropdown, AnnouncementsOverlay, lucide-react

import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  MapPin,
  Megaphone,
  ChevronDown,
  ChevronUp,
  Wallet,
  X,
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
    { label: "less ₱1k" },
    { label: "₱1k - ₱2k" },
    { label: "₱2k - ₱3k" },
    { label: "₱3k - ₱4k" },
    { label: "₱4k - ₱5k" },
    { label: "₱5k - ₱6k" },
    { label: "₱6k - ₱7k" },
    { label: "₱7k - ₱8k" },
    { label: "₱8k - ₱9k" },
    { label: "₱9k - ₱10k" },
    { label: "₱10k+" },
  ];

  useEffect(() => {
    if (isSearchActive) {
      setHideDropdown(false);
    }
  }, [isSearchActive]);

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
    <div
      className="relative w-full overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/bg_1.png')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Flow layout — no absolute positioning, no scale hack */}
      <div className="relative z-10 flex flex-col min-h-[420px] sm:min-h-[480px] lg:min-h-[520px]">
        {/* Top bar — padding handles spacing, flex justify-between pins edges */}
        <div className="flex items-center justify-between px-5 sm:px-8 lg:px-12 py-5 sm:py-6">
          <button
            aria-label="Home"
            className="flex items-center justify-center overflow-hidden w-14 h-14 sm:w-16 sm:h-16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-xl"
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
            className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-transparent text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full"
          >
            <Megaphone className="w-8 h-8 sm:w-10 sm:h-10" />
          </button>
        </div>

        {/* Center content — flex-1 + justify-center handles vertical centering */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-5 sm:px-8 lg:px-12 pb-10">
          <h1 className="flex flex-row items-center justify-center gap-x-4 sm:gap-x-6 text-white">
            <span
              className="font-noto-serif italic tracking-[0.3em] opacity-80"
              style={{ fontSize: "clamp(1.1rem, 4.5vw, 2.2rem)" }}
            >
              WELCOME TO
            </span>
            <span
              className="font-roboto font-bold tracking-[0.08em]"
              style={{ fontSize: "clamp(1.25rem, 5vw, 2.2rem)" }}
            >
              KHUBO
            </span>
          </h1>

          <div
            className="relative mt-8 sm:mt-12 w-full max-w-none flex justify-center"
            ref={dropdownRef}
          >
            {/* Dropdown panels */}
            {!isSearchActive && activeDropdown === "location" && (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-[98%] max-w-[700px] lg:max-w-[820px] bg-white rounded-3xl shadow-xl border border-neutral-100 p-6 z-[100] text-left pointer-events-auto">
                <div className="space-y-4">
                  <div>
                    <div
                      className="flex items-center px-2.5 py-2 bg-neutral-100 rounded-xl mb-2 focus-within:ring-2 focus-within:ring-[#2252D6]/20 transition-all cursor-text"
                      onClick={(e) => {
                        e.stopPropagation();
                        (
                          e.currentTarget.querySelector(
                            "input",
                          ) as HTMLInputElement
                        )?.focus();
                      }}
                    >
                      <Search className="w-4 h-4 text-neutral-400 mr-1.5 flex-shrink-0" />
                      <input
                        type="text"
                        placeholder="Search location..."
                        className="w-full bg-transparent border-none outline-none text-sm font-medium text-neutral-900 placeholder:text-neutral-400 p-0 focus:ring-0"
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
                          className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-50 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#2252D6]/10 flex items-center justify-center text-[#2252D6] group-hover:bg-[#2252D6] group-hover:text-white transition-all flex-shrink-0">
                            <MapPin size={14} className="w-3.5 h-3.5" />
                          </div>
                          <span className="font-medium text-neutral-800 text-sm whitespace-nowrap">
                            {loc}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!isSearchActive && activeDropdown === "budget" && (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-[98%] max-w-[700px] lg:max-w-[820px] bg-white rounded-3xl shadow-xl border border-neutral-100 p-6 z-[100] text-left pointer-events-auto">
                <button
                  onClick={() => budgetScrollRef.current?.scrollBy({ top: -40, behavior: "smooth" })}
                  className="absolute top-3 right-3 p-2 rounded-xl bg-neutral-200 hover:bg-[#17294F] hover:text-white transition-all z-10 shadow-sm"
                  aria-label="Scroll up"
                >
                  <ChevronUp className="w-5 h-5" />
                </button>
                <button
                  onClick={() => budgetScrollRef.current?.scrollBy({ top: 40, behavior: "smooth" })}
                  className="absolute bottom-3 right-3 p-2 rounded-xl bg-neutral-200 hover:bg-[#17294F] hover:text-white transition-all z-10 shadow-sm"
                  aria-label="Scroll down"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
                <div
                  ref={budgetScrollRef}
                  className="max-h-[200px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pr-10"
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
                        <span className="font-medium text-neutral-900 text-sm">
                          {range.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Pill search bar */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-full flex items-center text-white shadow-2xl w-full max-w-[800px] relative z-[95] transition-all duration-300 pointer-events-auto cursor-default">
              {isSearchActive ? (
                <>
                  <div className="flex-1 flex items-center pl-6 pr-0 py-0 w-full">
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
                      className="w-full bg-transparent border-none outline-none text-base font-bold text-white placeholder:text-white/50 focus:ring-0 p-0"
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
                      className="bg-[#17294F] p-4 rounded-full transition-all duration-200 shadow-lg ml-1.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white flex-shrink-0 flex items-center justify-center cursor-pointer"
                      aria-label="Search"
                    >
                      <Search
                        size={22}
                        className="text-white group-hover:stroke-[3px] transition-all"
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
                      trendingTags={['Near MSU-IIT', 'Solo Room', 'All Female', 'Affordable', 'With Aircon', 'WiFi Included']}
                      scrollAnchorId="search-results-anchor"
                      trendingTitle="Trending Searches"
                    />
                  )}
                </>
              ) : (
                <>
                  {/* Location Section */}
                  <div className="flex-1 min-w-0">
                    <div
                      role="button"
                      tabIndex={0}
                      aria-label="Location: Location"
                      onClick={() => toggleDropdown("location")}
                      onKeyDown={(e) =>
                        (e.key === "Enter" || e.key === " ") &&
                        (e.preventDefault(), toggleDropdown("location"))
                      }
                      className={`w-full flex items-center justify-between px-3 md:pl-6 md:pr-4 py-3.5 transition-all cursor-pointer group select-none focus-visible:outline-none ${
                        activeDropdown === "location"
                          ? "bg-white rounded-full text-[#17294F] relative z-[60] shadow-md"
                          : "hover:bg-white/5 rounded-full"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <MapPin
                          className={`${activeDropdown === "location" ? "text-[#2252D6]" : "text-[#2252D6]"} flex-shrink-0 w-[16px] h-[16px]`}
                        />
                        <span
                          className={`text-base font-bold ${activeDropdown === "location" ? "text-neutral-900" : "text-white"}`}
                        >
                          {selectedLocation ? selectedLocation : "Location"}
                        </span>
                      </div>
                      <ChevronDown
                        className={`flex-shrink-0 opacity-50 w-4 h-4 ${activeDropdown === "location" ? "rotate-180 text-neutral-900" : ""}`}
                      />
                    </div>
                  </div>

                  <div className="w-[1px] h-8 bg-white/20" />

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
                      className={`w-full flex items-center justify-between px-3 md:pl-6 md:pr-4 py-3.5 transition-all cursor-pointer group select-none focus-visible:outline-none ${
                        activeDropdown === "budget"
                          ? "bg-white rounded-full text-[#17294F] relative z-[60] shadow-md"
                          : "hover:bg-white/5 rounded-full"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Wallet className="text-[#2252D6] flex-shrink-0 w-[16px] h-[16px]" />
                        <span
                          className={`text-base font-bold ${activeDropdown === "budget" ? "text-neutral-900" : "text-white"}`}
                        >
                          {selectedBudget ? selectedBudget : "Budget"}
                        </span>
                      </div>
                      <ChevronDown
                        className={`flex-shrink-0 opacity-50 w-4 h-4 ${activeDropdown === "budget" ? "rotate-180 text-neutral-900" : ""}`}
                      />
                    </div>
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
                    className="bg-[#17294F] p-4 rounded-full transition-all duration-200 shadow-lg ml-1.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white flex-shrink-0 flex items-center justify-center cursor-pointer"
                  >
                    <Search
                      size={22}
                      className="text-white group-hover:stroke-[3px] transition-all"
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

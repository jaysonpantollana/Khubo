import { useState, useRef, useEffect } from "react";
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
import { BUDGET_RANGES } from "../lib/constants";
import { useClickOutside } from "../hooks/useClickOutside";

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
  const [activeDropdown, setActiveDropdown] = useState<
    "location" | "budget" | null
  >(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [hideDropdown, setHideDropdown] = useState(false);
  const [isAnnouncementsOpen, setIsAnnouncementsOpen] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const budgetScrollRef = useRef<HTMLDivElement>(null);

  const hasSelections = selectedLocation || selectedBudget;

  useEffect(() => {
    if (isSearchActive) {
      setHideDropdown(false);
    }
  }, [isSearchActive]);

  useClickOutside(dropdownRef, () => setActiveDropdown(null));

  useEffect(() => {
    if (suppressDropdown) {
      setActiveDropdown(null);
      setIsSearchActive(false);
    }
  }, [suppressDropdown, setIsSearchActive]);

  const toggleDropdown = (
    dropdown: "location" | "budget",
  ) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <div
      className="relative w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/bg_1.png')" }}
    >
      <div className="absolute inset-0 bg-black/40 z-0" />

      <div className="relative flex flex-col min-h-[360px] sm:min-h-[420px] md:min-h-[480px] lg:min-h-[520px]">
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
            className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-transparent text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full"
          >
            <Megaphone className="w-7 h-7 sm:w-8 sm:h-8" />
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center px-3 sm:px-8 lg:px-12 pb-8 sm:pb-10">
          <h1 className="flex flex-col sm:flex-row items-center justify-center gap-y-1 sm:gap-y-0 gap-x-2 sm:gap-x-4 md:gap-x-6 text-white w-full px-2">
            <span
              className="font-noto-serif italic opacity-80 break-words"
              style={{ fontSize: "clamp(0.95rem, 4vw, 2.2rem)", letterSpacing: "clamp(0.05em, 1.5vw, 0.3em)" }}
            >
              WELCOME TO
            </span>
            <span
              className="font-roboto font-bold"
              style={{ fontSize: "clamp(1.1rem, 4.5vw, 2.2rem)", letterSpacing: "clamp(0.02em, 0.5vw, 0.08em)" }}
            >
              KHUBO
            </span>
          </h1>

          <div
            className="relative mt-8 sm:mt-12 w-full max-w-none flex justify-center"
            ref={dropdownRef}
          >
            {!isSearchActive && activeDropdown === "location" && (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-[98%] max-w-[700px] lg:max-w-[820px] bg-white rounded-3xl shadow-xl border border-neutral-100 p-6 z-[100] text-left pointer-events-auto">
                <div>
                  <div
                   <div className="space-y-1">
                    {["Iligan City"].map((loc) => (
                      <button
                        key={loc}
                        onClick={() => {
                          setSelectedLocation(loc);
                          setActiveDropdown(null);
                        }}
                        className="w-full flex items-center gap-3 p-2 rounded-xl g-neutral-50 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#2252D6]/10 flex items-center justify-center text-[#2252D6] group-g-[#2252D6] group-ext-white transition-all flex-shrink-0">
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
            )}

            {!isSearchActive && activeDropdown === "budget" && (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-[98%] max-w-[700px] lg:max-w-[820px] bg-white rounded-3xl shadow-xl border border-neutral-100 p-6 z-[100] text-left pointer-events-auto">
                <button
                  onClick={() => budgetScrollRef.current?.scrollBy({ top: -40, behavior: "smooth" })}
                  className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center bg-neutral-100 g-neutral-200 rounded-full transition-all shadow-sm z-10"
                  aria-label="Scroll up"
                >
                  <ChevronUp size={18} strokeWidth={2.5} className="text-neutral-500" />
                </button>
                <button
                  onClick={() => budgetScrollRef.current?.scrollBy({ top: 40, behavior: "smooth" })}
                  className="absolute bottom-3 right-3 w-10 h-10 flex items-center justify-center bg-neutral-100 g-neutral-200 rounded-full transition-all shadow-sm z-10"
                  aria-label="Scroll down"
                >
                  <ChevronDown size={18} strokeWidth={2.5} className="text-neutral-500" />
                </button>
                <div
                  ref={budgetScrollRef}
                  className="max-h-[200px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pr-10"
                >
                  <div className="grid gap-1">
                    {BUDGET_RANGES.map((range) => (
                      <button
                        key={range.label}
                        onClick={() => {
                          setSelectedBudget(range.label);
                          setActiveDropdown(null);
                        }}
                        className="flex flex-col px-3 py-2.5 rounded-lg bg-transparent g-neutral-100 transition-all text-left w-full"
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
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-0.5 sm:p-1.5 md:p-2 rounded-full flex items-center text-white shadow-2xl w-full max-w-[800px] relative z-[95] transition-all duration-300 pointer-events-auto cursor-default overflow-hidden">
              {isSearchActive ? (
                <>
                  <div className="flex-1 flex items-center pl-3 sm:pl-6 pr-0 py-0 w-full">
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
                      className="w-full bg-transparent border-none outline-none text-sm sm:text-base font-bold text-white placeholder:text-white/50 focus:ring-0 p-0"
                      autoFocus
                    />
                    {searchQuery && (
                      <button
                        onClick={() => {
                          setSearchQuery("");
                          setHideDropdown(true);
                        }}
                        className="p-1 g-white/10 rounded-full transition-colors flex-shrink-0"
                        aria-label="Clear search"
                      >
                        <X className="w-4 h-4 text-white/80" />
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setIsSearchActive(false);
                      }}
                    className="bg-[#17294F] p-1.5 sm:p-3 md:p-3.5 rounded-full transition-all duration-200 shadow-lg ml-0.5 sm:ml-1 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white flex-shrink-0 flex items-center justify-center cursor-pointer"
                      aria-label="Search"
                    >
                      <Search
                        className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white group-troke-[3px] transition-all"
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
                      className={`w-full flex items-center justify-between px-1 sm:px-2.5 md:pl-5 md:pr-3 py-2 sm:py-3 md:py-3 transition-all cursor-pointer group select-none focus-visible:outline-none ${
                        activeDropdown === "location"
                          ? "bg-white rounded-full text-[#17294F] relative z-[60] shadow-md"
                          : "g-white/5 rounded-full"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                        <MapPin
                          className="text-[#2252D6] flex-shrink-0 w-3 h-3 sm:w-4 sm:h-4"
                        />
                        <span
                          className={`text-xs sm:text-base font-bold ${activeDropdown === "location" ? "text-neutral-900" : "text-white"}`}
                        >
                          {selectedLocation || "Location"}
                        </span>
                      </div>
                      <ChevronDown
                        className={`flex-shrink-0 opacity-50 w-4 h-4 ${activeDropdown === "location" ? "rotate-180 text-neutral-900" : ""}`}
                      />
                    </div>
                  </div>

                  <div className="w-px h-4 sm:h-6 bg-white/20 flex-shrink-0" />

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
                      className={`w-full flex items-center justify-between px-1 sm:px-2.5 md:pl-5 md:pr-3 py-2 sm:py-3 md:py-3 transition-all cursor-pointer group select-none focus-visible:outline-none ${
                        activeDropdown === "budget"
                          ? "bg-white rounded-full text-[#17294F] relative z-[60] shadow-md"
                          : "g-white/5 rounded-full"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                        <Wallet className="text-[#2252D6] flex-shrink-0 w-3 h-3 sm:w-4 sm:h-4" />
                        <span
                          className={`text-xs sm:text-base font-bold ${activeDropdown === "budget" ? "text-neutral-900" : "text-white"}`}
                        >
                          {selectedBudget || "Budget"}
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
                    className="bg-[#17294F] p-2.5 sm:p-4 rounded-full transition-all duration-200 shadow-lg ml-1.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white flex-shrink-0 flex items-center justify-center cursor-pointer"
                  >
                    <Search
                      className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] text-white group-troke-[3px] transition-all"
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

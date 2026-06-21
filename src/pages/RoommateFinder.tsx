// @context: Roommate finder page — browse and filter roommate profiles
// @purpose: Full-page roommate discovery with hero search, filter panel, card grid, and detail modal
// @behavior: useMemo filters ROOMMATES by category, gender, budget, and search query; RoommateModal for detail view
// @dependencies: RoommateHero, RoommateCard, RoommateCardSkeleton, RoommateModal, Filters, BottomNav, Footer, ROOMMATES mock, motion

import React, { useState, useMemo, useRef } from "react";
import RoommateHero from "../components/RoommateHero";
import RoommateCard from "../components/RoommateCard";
import RoommateCardSkeleton from "../components/RoommateCardSkeleton";
import BottomNav from "../components/BottomNav";

import Footer from "../components/Footer";
import { ROOMMATES } from "../mocks/roommates";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  MapPin,
  Wallet,
  X,
  UserPlus,
} from "lucide-react";
import RoommateModal from "../components/RoommateModal";
import { Roommate } from "../types";
import RoommateSearchDropdown from "../components/RoommateSearchDropdown";
import CreatePostModal from "../components/CreatePostModal";

const TAGS = [
  "ALL",
  "Near MSU-IIT",
  "All Female",
  "Solo Room",
  "Shared Room",
  "All Male",
  "Affordable",
  "Bed Spacer",
  "Boarding House",
  "Studio",
  "Apartment",
  "Transient",
];

export default function RoommateFinder() {
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [selectedRoommate, setSelectedRoommate] = useState<Roommate | null>(
    null,
  );

  React.useEffect(() => {
    document.title = "Roommate | Khubo";
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [postMode, setPostMode] = useState<"applying" | "finding">("applying");
  const [activeStickyDropdown, setActiveStickyDropdown] = useState<
    "location" | "budget" | "general" | null
  >(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isStickySearchActive, setIsStickySearchActive] = useState(false);
  const [hideStickyDropdown, setHideStickyDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  const [roommates, setRoommates] = useState<Roommate[]>(() => {
    const saved = localStorage.getItem("custom_roommates");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn("Error reloading custom roommates list:", e);
      }
    }
    return ROOMMATES;
  });

  const handlePostCreated = (newPost: Roommate) => {
    const updated = [newPost, ...roommates];
    setRoommates(updated);
    localStorage.setItem("custom_roommates", JSON.stringify(updated));
  };

  React.useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (isStickySearchActive) {
      setHideStickyDropdown(false);
    }
  }, [isStickySearchActive]);

  React.useEffect(() => {
    if (!isSticky || !isStickySearchActive) {
      setActiveStickyDropdown(null);
    }
  }, [isSticky, isStickySearchActive]);

  const openProfile = (roommate: Roommate) => {
    setSelectedRoommate(roommate);
    setIsModalOpen(true);
  };

  const closeProfile = () => {
    setIsModalOpen(false);
  };
  const observerRef = useRef<HTMLDivElement>(null);
  const searchObserverRef = useRef<HTMLDivElement>(null);
  const recommendedRef = useRef<HTMLDivElement>(null);
  const nearMsuIitRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { rootMargin: "-1px 0px 0px 0px", threshold: 1.0 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowSearch(!entry.isIntersecting);
      },
      { rootMargin: "-70px 0px 0px 0px", threshold: 0 },
    );

    if (searchObserverRef.current) {
      observer.observe(searchObserverRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const displaySearch = isMobile ? isSticky && showSearch : isSticky;

  React.useEffect(() => {
    if (displaySearch) {
      setIsSearchActive(false);
    }
  }, [displaySearch]);

  const stickyDropdownRef = useRef<HTMLDivElement>(null);
  const tagsScrollRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        stickyDropdownRef.current &&
        !stickyDropdownRef.current.contains(e.target as Node)
      ) {
        setActiveStickyDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredRoommates = useMemo(() => {
    let result = [...roommates];

    if (selectedTag !== "ALL") {
      result = result.filter(
        (roommate) =>
          roommate.tags.some(
            (tag) => tag.toLowerCase() === selectedTag.toLowerCase(),
          ) ||
          roommate.preferredPlace
            .toLowerCase()
            .includes(selectedTag.toLowerCase()),
      );
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((roommate) => {
        const nameMatch = roommate.name.toLowerCase().includes(q);
        const bioMatch = roommate.bio
          ? roommate.bio.toLowerCase().includes(q)
          : false;
        const placeMatch = roommate.preferredPlace.toLowerCase().includes(q);
        const tagsMatch = roommate.tags.some((tag) =>
          tag.toLowerCase().includes(q),
        );
        const genderMatch = roommate.gender
          ? roommate.gender.toLowerCase().includes(q)
          : false;
        const universityMatch = roommate.university
          ? roommate.university.toLowerCase().includes(q)
          : false;
        return (
          nameMatch ||
          bioMatch ||
          placeMatch ||
          tagsMatch ||
          genderMatch ||
          universityMatch
        );
      });
    }

    return result;
  }, [selectedTag, searchQuery, roommates]);

  const scroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: "left" | "right",
  ) => {
    if (ref.current) {
      const scrollAmount = ref.current.clientWidth * 0.8;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] pb-32">
      <RoommateHero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isSearchActive={isSearchActive}
        setIsSearchActive={setIsSearchActive}
        onSelectRoommate={openProfile}
        suppressDropdown={displaySearch}
      />
      <div id="roommate-results-anchor" />
      <div
        ref={observerRef}
        className="w-full h-[1px] invisible pointer-events-none"
      />

      {/* Sticky Header with Categories & Search */}
      <div className="bg-white sticky top-0 z-40 border-b border-gray-100 shadow-sm transition-all duration-300">
        <div className="max-w-[2520px] mx-auto xl:px-12 md:px-12 sm:px-4 px-0 flex items-center justify-between min-h-[70px]">
          {displaySearch ? (
            <div className="flex items-center justify-between w-full py-3 px-2 sm:px-0">
              <div className="hidden md:block flex-1 min-w-0"></div>
              <div
                className="flex justify-center flex-[3] lg:flex-none min-w-0 w-full px-2 sm:px-0"
                ref={stickyDropdownRef}
              >
                <div className="bg-white border border-neutral-200 p-1.5 sm:p-2 md:p-2 rounded-full flex items-center text-neutral-800 shadow-lg w-full max-w-[340px] sm:max-w-[480px] md:max-w-[650px] lg:max-w-[750px] relative transition-all duration-300 pointer-events-auto cursor-default">
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
                            className="p-1 hover:bg-neutral-100 rounded-full transition-colors flex-shrink-0"
                            aria-label="Clear search"
                          >
                            <X className="w-3.5 h-3.5 text-neutral-500" />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setIsStickySearchActive(false);
                          }}
                          className="bg-[#17294F] p-2.5 sm:p-2 md:p-2.5 rounded-full transition-all duration-200 shadow-md ml-0.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17294F] flex-shrink-0 flex items-center justify-center cursor-pointer"
                        >
                          <Search
                            size={16}
                            className="text-white group-hover:stroke-[3px] transition-all"
                          />
                        </button>
                      </div>
                      {!hideStickyDropdown && (
                        <RoommateSearchDropdown
                          searchQuery={searchQuery}
                          setSearchQuery={(val) => {
                            setSearchQuery(val);
                            setHideStickyDropdown(true);
                          }}
                          onClose={() => {
                            setHideStickyDropdown(true);
                            setIsStickySearchActive(false);
                          }}
                          onSelectRoommate={(roommate) =>
                            openProfile(roommate)
                          }
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
                            setActiveStickyDropdown(
                              activeStickyDropdown === "location"
                                ? null
                                : "location",
                            );
                          }}
                          onKeyDown={(e) =>
                            (e.key === "Enter" || e.key === " ") &&
                            (e.preventDefault(),
                            setActiveStickyDropdown(
                              activeStickyDropdown === "location"
                                ? null
                                : "location",
                            ))
                          }
                          className={`w-full flex items-center justify-between px-2 sm:px-3 md:pl-5 md:pr-3 py-2 md:py-2 transition-all cursor-pointer select-none group focus-visible:outline-none ${
                            activeStickyDropdown === "location"
                              ? "bg-neutral-100 rounded-full text-[#17294F] relative z-[60] shadow-sm"
                              : "hover:bg-neutral-50 rounded-full"
                          }`}
                        >
                          <div className="flex items-center gap-1 md:gap-2.5 min-w-0">
                            <MapPin className="text-[#2252D6] flex-shrink-0 w-4 h-4 sm:w-4 sm:h-4 md:w-[15px] md:h-[15px]" />
                            <span
                              className={`text-xs sm:text-sm md:text-sm font-bold truncate md:whitespace-nowrap text-neutral-800`}
                            >
                              Location
                            </span>
                          </div>
                          <ChevronDown
                            className={`flex-shrink-0 opacity-50 text-neutral-500 group-hover:opacity-100 transition-all w-3.5 h-3.5 sm:w-4 sm:h-4 ${activeStickyDropdown === "location" ? "rotate-180" : ""}`}
                          />
                        </div>

                        {activeStickyDropdown === "location" && (
                          <div className="absolute top-[100%] mt-2 left-0 w-full bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.2)] md:shadow-xl border border-neutral-100 p-3 z-50 text-left">
                            <div className="space-y-3">
                              <div>
                                <div
                                  className="flex items-center px-3 py-2 bg-neutral-100 rounded-xl mb-2 focus-within:ring-2 focus-within:ring-[#2252D6]/20 transition-all cursor-text"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    (
                                      e.currentTarget.querySelector(
                                        "input",
                                      ) as HTMLInputElement
                                    )?.focus();
                                  }}
                                >
                                  <Search className="w-3.5 h-3.5 text-neutral-400 mr-2 flex-shrink-0" />
                                  <input
                                    type="text"
                                    placeholder="Search location..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                      setSearchQuery(e.target.value)
                                    }
                                    className="w-full bg-transparent border-none outline-none text-xs font-semibold text-neutral-900 placeholder:text-neutral-400 p-0 focus:ring-0"
                                  />
                                </div>
                                <div className="space-y-1">
                                  {["MSU-IIT", "Pala-o", "Tibanga"].map(
                                    (loc) => (
                                      <button
                                        key={loc}
                                        onClick={() => {
                                          setSearchQuery(loc);
                                          setActiveStickyDropdown(null);
                                        }}
                                        className="w-full flex items-center gap-2 p-1.5 rounded-lg hover:bg-neutral-50 transition-colors group"
                                      >
                                        <div className="w-6 h-6 rounded bg-[#2252D6]/10 flex items-center justify-center text-[#2252D6] group-hover:bg-[#2252D6] group-hover:text-white transition-all">
                                          <MapPin size={12} />
                                        </div>
                                        <span className="font-medium text-neutral-800 text-xs">
                                          {loc}
                                        </span>
                                      </button>
                                    ),
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="w-[1px] h-3 sm:h-4 bg-neutral-200 flex-shrink-0 self-center" />

                      {/* Sticky Budget Section */}
                      <div className="flex-1 min-w-0">
                        <div
                          role="button"
                          tabIndex={0}
                          aria-label="Add budget"
                          onClick={() => {
                            setActiveStickyDropdown(
                              activeStickyDropdown === "budget"
                                ? null
                                : "budget",
                            );
                          }}
                          onKeyDown={(e) =>
                            (e.key === "Enter" || e.key === " ") &&
                            (e.preventDefault(),
                            setActiveStickyDropdown(
                              activeStickyDropdown === "budget"
                                ? null
                                : "budget",
                            ))
                          }
                          className={`w-full flex items-center justify-between px-2 sm:px-3 md:pl-5 md:pr-3 py-2 md:py-2 transition-all cursor-pointer select-none group focus-visible:outline-none ${
                            activeStickyDropdown === "budget"
                              ? "bg-neutral-100 rounded-full text-[#17294F] relative z-[60] shadow-sm"
                              : "hover:bg-neutral-50 rounded-full"
                          }`}
                        >
                          <div className="flex items-center gap-1 md:gap-2.5 min-w-0">
                            <Wallet className="text-[#2252D6] flex-shrink-0 w-4 h-4 sm:w-4 sm:h-4 md:w-[15px] md:h-[15px]" />
                            <span
                              className={`text-xs sm:text-sm md:text-sm font-bold truncate md:whitespace-nowrap text-neutral-800`}
                            >
                              Budget
                            </span>
                          </div>
                          <ChevronDown
                            className={`flex-shrink-0 opacity-50 text-neutral-500 group-hover:opacity-100 transition-all w-3.5 h-3.5 sm:w-4 sm:h-4 ${activeStickyDropdown === "budget" ? "rotate-180" : ""}`}
                          />
                        </div>

                        {activeStickyDropdown === "budget" && (
                          <div className="absolute top-[100%] mt-2 left-0 w-full bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.2)] md:shadow-xl border border-neutral-100 p-2 md:p-4 z-50 text-left">
                            <div className="space-y-2">
                              <div className="grid grid-cols-1 gap-1">
                                {[
                                  { label: "₱1k - ₱3k", val: "1500" },
                                  { label: "₱3k - ₱5k", val: "4000" },
                                  { label: "₱5k+", val: "6000" },
                                ].map((range) => (
                                  <button
                                    key={range.label}
                                    onClick={() => {
                                      setSearchQuery(range.val);
                                      setActiveStickyDropdown(null);
                                    }}
                                    className="flex flex-col px-3 py-2.5 rounded-lg bg-transparent hover:bg-neutral-100 transition-all text-left w-full"
                                  >
                                    <span className="font-medium text-neutral-900 text-xs">
                                      {range.label}
                                    </span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Search Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (activeStickyDropdown) {
                            setActiveStickyDropdown(null);
                          }
                          if (
                            searchQuery.trim().length > 0 &&
                            !isStickySearchActive
                          ) {
                            const searchAnchor = document.getElementById(
                              "roommate-results-anchor",
                            );
                            if (searchAnchor) {
                              searchAnchor.scrollIntoView({
                                behavior: "smooth",
                              });
                            }
                          } else if (!isStickySearchActive) {
                            setSearchQuery("");
                            setIsStickySearchActive(true);
                            setActiveStickyDropdown(null);
                          } else {
                            const searchAnchor = document.getElementById(
                              "roommate-results-anchor",
                            );
                            if (searchAnchor) {
                              searchAnchor.scrollIntoView({
                                behavior: "smooth",
                              });
                            }
                          }
                        }}
                        aria-label="Search"
                        className="bg-[#17294F] p-2.5 sm:p-2 md:p-2.5 rounded-full transition-all duration-200 shadow-md ml-0.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white flex-shrink-0 flex items-center justify-center cursor-pointer"
                      >
                        <Search
                          size={16}
                          className="text-white group-hover:stroke-[3px] transition-all"
                        />
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="hidden md:flex flex-1 justify-end pl-2 sm:pl-4 min-w-0">
              </div>
            </div>
          ) : (
            <div className="relative bg-white w-full">
              <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

              <button
                onClick={() => scroll(tagsScrollRef, "left")}
                className="absolute left-0 md:left-0 top-1/2 -translate-y-1/2 z-20 w-7 h-7 flex items-center justify-center bg-white border border-neutral-200 rounded-full text-neutral-500 shadow-sm hover:text-neutral-800 hover:border-neutral-300 active:scale-95 transition-all hidden md:flex"
                aria-label="Scroll left"
              >
                <ChevronLeft size={16} strokeWidth={2} />
              </button>

              <button
                onClick={() => scroll(tagsScrollRef, "right")}
                className="absolute right-0 md:right-0 top-1/2 -translate-y-1/2 z-20 w-7 h-7 flex items-center justify-center bg-white border border-neutral-200 rounded-full text-neutral-500 shadow-sm hover:text-neutral-800 hover:border-neutral-300 active:scale-95 transition-all hidden md:flex"
                aria-label="Scroll right"
              >
                <ChevronRight size={16} strokeWidth={2} />
              </button>

              <div className="flex items-center justify-between w-full">
                <div
                  ref={tagsScrollRef}
                  className="flex-1 flex flex-row items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar scroll-smooth pl-4 md:pl-12 py-1 w-full touch-pan-x"
                >
                  {TAGS.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-2.5 py-1 sm:px-4 sm:py-2 rounded-full border text-[10px] sm:text-xs font-bold sm:tracking-wider uppercase transition-all duration-200 whitespace-nowrap flex-shrink-0 active:scale-95 cursor-pointer ${
                        selectedTag === tag
                          ? "bg-neutral-900 text-white border-neutral-900 shadow-sm"
                          : "bg-white text-neutral-700 border-neutral-200 hover:border-neutral-800 hover:text-neutral-900"
                      }`}
                    >
                      {tag.toUpperCase()}
                    </button>
                  ))}
                  <div
                    className="w-4 md:w-12 h-1 flex-shrink-0"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        ref={searchObserverRef}
        className="w-full h-[1px] invisible pointer-events-none"
      />

      <main className="max-w-[2520px] mx-auto xl:px-12 md:px-12 sm:px-4 px-4 pt-10">
        <div className="flex flex-col gap-10 md:gap-16">
          <div className="w-full flex flex-col gap-5 pt-2">
            <div className="flex items-center gap-3 w-full">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"
                alt="Profile"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover shrink-0 shadow-sm border border-neutral-200"
              />
              <input
                type="text"
                className="flex-1 bg-white border border-neutral-200 rounded-full px-5 py-3 md:py-3.5 font-medium text-neutral-800 placeholder:text-neutral-500 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-[#2252D6]/20 focus:border-[#2252D6] transition shadow-sm text-sm md:text-base cursor-pointer"
                placeholder={
                  postMode === "finding"
                    ? "What kind of roommate are you looking for, Micheal?"
                    : "Tell us about yourself, Micheal?"
                }
                readOnly
                onClick={() => setIsCreatePostOpen(true)}
              />
            </div>

            <div className="flex items-center justify-center w-full pb-2 sm:pb-0">
              <div className="inline-flex bg-white rounded-full p-1 shadow-sm border border-neutral-200">
                <button
                  onClick={() => setPostMode("applying")}
                  className={`flex items-center justify-center gap-1.5 sm:gap-2.5 transition-all px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-full whitespace-nowrap ${postMode === "applying" ? "bg-neutral-900 text-white shadow-sm" : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50"}`}
                >
                  <UserPlus
                    size={14}
                    className={`shrink-0 md:w-[18px] md:h-[18px] ${postMode === "applying" ? "text-white" : "text-neutral-400 group-hover:text-neutral-600"}`}
                  />
                  <span className="font-semibold text-[11px] sm:text-[15px]">
                    Applying as Roommate
                  </span>
                </button>
                <button
                  onClick={() => setPostMode("finding")}
                  className={`flex items-center justify-center gap-1.5 sm:gap-2.5 transition-all px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-full whitespace-nowrap ${postMode === "finding" ? "bg-neutral-900 text-white shadow-sm" : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50"}`}
                >
                  <Search
                    size={14}
                    className={`shrink-0 md:w-[18px] md:h-[18px] ${postMode === "finding" ? "text-white" : "text-neutral-400 group-hover:text-neutral-600"}`}
                  />
                  <span className="font-semibold text-[11px] sm:text-[15px]">
                    Finding Roommate
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Recommended Section */}
          {(loading || filteredRoommates.length > 0) && (
            <div className="flex flex-col gap-5 md:gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 group cursor-pointer min-w-0">
                  <h2 className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl text-black whitespace-nowrap truncate">
                    Finding Roommate
                  </h2>
                  <div className="flex items-center gap-1 px-3 py-1 bg-[#17294F] text-white rounded-full ml-1 sm:ml-2 flex-shrink-0">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                      See more
                    </span>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-3">
                  <button
                    onClick={() => scroll(recommendedRef, "left")}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 bg-white hover:border-black hover:bg-neutral-50 transition-all active:scale-90"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => scroll(recommendedRef, "right")}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 bg-white hover:border-black hover:bg-neutral-50 transition-all active:scale-90"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              <div
                ref={recommendedRef}
                className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory scroll-smooth"
                style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
              >
                {loading
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={`skeleton-rec-${i}`}
                        className="flex-none snap-start w-full [@media(max-height:500px)_and_(orientation:landscape)]:w-[calc(50vw-24px)] sm:w-[320px] md:w-[340px] xl:w-[calc((100%-48px)/4)]"
                      >
                        <RoommateCardSkeleton />
                      </div>
                    ))
                  : filteredRoommates.slice(0, 10).map((roommate) => (
                      <div
                        key={roommate.id}
                        className="flex-none snap-start w-full [@media(max-height:500px)_and_(orientation:landscape)]:w-[calc(50vw-24px)] sm:w-[320px] md:w-[340px] xl:w-[calc((100%-48px)/4)]"
                      >
                        <RoommateCard
                          roommate={roommate}
                          onProfileClick={openProfile}
                        />
                      </div>
                    ))}
              </div>
            </div>
          )}

          {/* Near MSU-IIT Section */}
          {(loading || filteredRoommates.length > 0) && (
            <div className="flex flex-col gap-5 md:gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 group cursor-pointer min-w-0">
                  <h2 className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl text-black whitespace-nowrap truncate">
                    Applying as Roommate
                  </h2>
                  <div className="flex items-center gap-1 px-3 py-1 bg-[#17294F] text-white rounded-full ml-1 sm:ml-2 flex-shrink-0">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                      See more
                    </span>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-3">
                  <button
                    onClick={() => scroll(nearMsuIitRef, "left")}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 bg-white hover:border-black hover:bg-neutral-50 transition-all active:scale-90"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => scroll(nearMsuIitRef, "right")}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 bg-white hover:border-black hover:bg-neutral-50 transition-all active:scale-90"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              <div
                ref={nearMsuIitRef}
                className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory scroll-smooth"
                style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
              >
                {loading
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={`skeleton-msu-${i}`}
                        className="flex-none snap-start w-full [@media(max-height:500px)_and_(orientation:landscape)]:w-[calc(50vw-24px)] sm:w-[320px] md:w-[340px] xl:w-[calc((100%-48px)/4)]"
                      >
                        <RoommateCardSkeleton />
                      </div>
                    ))
                  : filteredRoommates
                      .slice()
                      .reverse()
                      .slice(0, 10)
                      .map((roommate) => (
                        <div
                          key={roommate.id}
                          className="flex-none snap-start w-full [@media(max-height:500px)_and_(orientation:landscape)]:w-[calc(50vw-24px)] sm:w-[320px] md:w-[340px] xl:w-[calc((100%-48px)/4)]"
                        >
                          <RoommateCard
                            roommate={roommate}
                            onProfileClick={openProfile}
                            actionLabel="Accept as Roommate"
                          />
                        </div>
                      ))}
              </div>
            </div>
          )}

          {!loading && filteredRoommates.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-white rounded-3xl shadow-sm border border-neutral-100 max-w-4xl mx-auto w-full mt-4 mb-4">
              <div className="bg-neutral-50 p-6 rounded-full mb-4">
                <Search size={32} className="text-neutral-400" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">
                No roommates found
              </h3>
              <p className="text-neutral-500 mb-6 text-sm sm:text-base">
                Try adjusting your filters to find more potential matches.
              </p>
              <button
                onClick={() => {
                  setSelectedTag("ALL");
                  setSearchQuery("");
                }}
                className="px-6 py-3 bg-black text-white rounded-full font-bold hover:bg-neutral-800 transition"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <BottomNav />

      <RoommateModal
        roommate={selectedRoommate}
        isOpen={isModalOpen}
        onClose={closeProfile}
      />

      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        postMode={postMode}
        onPostCreated={handlePostCreated}
      />
    </div>
  );
}

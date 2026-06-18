// @context: Maps page — map-based listing discovery
// @purpose: Sidebar listing panel + MapTiler map view with interactive filtering and card selection
// @behavior: Left panel shows filterable listing cards; map shows markers for visible listings; card hover syncs with map
// @dependencies: useListings, useListingsFilter, ListingCard, MapTilerView, Filters, BottomNav, Footer, lucide-react

import React, { useState, useRef, useEffect } from "react";
import { useListings } from "../hooks/useListings";
import { useListingsFilter } from "../hooks/useListingsFilter";
import ListingCard from "../components/ListingCard";
import ListingCardSkeleton from "../components/ListingCardSkeleton";
import {
  Search,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  X,
  Calendar as CalendarIcon,
  Wallet,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { Listing } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { DateScrollPicker } from "../components/DateScrollPicker";
import SearchDropdown from "../components/SearchDropdown";
import { FilterState } from "../components/Filters";
export default function Maps() {
  const { listings: LISTINGS, loading } = useListings();
  const apiKey = import.meta.env.VITE_MAPTILER_API_KEY || "";
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [selectedListing, setSelectedListing] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
    window.innerWidth < 768,
  );
  const [activeDropdown, setActiveDropdown] = useState<
    "location" | "dates" | "budget" | "general" | null
  >(null);

  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);

  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    document.title = "Maps | Khubo";
  }, []);

  const hasSelections = selectedLocation || selectedDateStr || selectedBudget;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maptilersdk.Map | null>(null);
  const markers = useRef<{ [key: string]: maptilersdk.Marker }>({});
  const markerPins = useRef<{ [key: string]: HTMLElement }>({});
  const filters: FilterState = {
    minPrice: 0,
    maxPrice: 50000,
    sortBy: "relevance",
    minRating: 0,
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
        setIsSearchActive(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (
    dropdown: "location" | "dates" | "budget" | "general",
  ) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleSelectListing = (id: string) => {
    const listing = LISTINGS?.find((l) => l.id === id);
    if (listing) {
      handleListingClick(listing);
    }
    setActiveDropdown(null);
    setIsSearchActive(false);
  };

  const filteredRaw = useListingsFilter(LISTINGS, filters, searchQuery);
  const filteredListings = filteredRaw.filter((l) => l.lat && l.lng);

  const selectedListingRef = useRef(selectedListing);
  useEffect(() => {
    selectedListingRef.current = selectedListing;
  }, [selectedListing]);

  const updateMarkers = React.useCallback(() => {
    if (!map.current) return;

    // Remove existing markers
    (Object.values(markers.current) as maptilersdk.Marker[]).forEach((marker) =>
      marker.remove(),
    );
    markers.current = {};
    markerPins.current = {};

    filteredListings.forEach((listing) => {
      if (listing.lat && listing.lng) {
        const el = document.createElement("div");
        el.className = "custom-marker";

        el.innerHTML = `
          <div class="marker-pin" style="cursor: pointer; transition: transform 0.15s ease-out; transform-origin: center bottom; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3)); display: flex; align-items: center; justify-content: center;">
            <svg width="26" height="34" viewBox="0 0 26 34" fill="none">
              <path d="M13 0C5.8 0 0 5.8 0 13c0 2.5 1 4.8 2.6 6.5L13 34l10.4-14.5C24 17.8 25 15.5 25 13 25 5.8 20.2 0 13 0z" fill="#EA4335"/>
              <circle cx="13" cy="11.5" r="4.25" fill="#fff"/>
            </svg>
          </div>
        `;

        const marker = new maptilersdk.Marker({ element: el, anchor: 'bottom' })
          .setLngLat([listing.lng, listing.lat])
          .addTo(map.current!);

        // Store pin element for zoom-based scaling
        const pinEl = el.querySelector('.marker-pin') as HTMLElement;
        if (pinEl) markerPins.current[listing.id] = pinEl;

        el.addEventListener("click", () => {
          setSelectedListing(listing.id);
          if (window.innerWidth >= 768) {
            const element = document.getElementById(`listing-${listing.id}`);
            element?.scrollIntoView({ behavior: "smooth", block: "center" });
          } else {
            const element = document.getElementById(
              `mobile-listing-${listing.id}`,
            );
            element?.scrollIntoView({
              behavior: "smooth",
              inline: "center",
              block: "nearest",
            });
          }
        });

        markers.current[listing.id] = marker;
      }
    });

    // Apply initial zoom scale to new markers
    const zoom = map.current.getZoom();
    Object.values(markerPins.current).forEach((pin) => {
      const scale = Math.pow(1.25, zoom - 13);
      pin.style.transform = `scale(${Math.min(Math.max(scale, 0.3), 3)})`;
    });
  }, [filteredListings]);

  const updateMarkersRef = useRef(updateMarkers);
  useEffect(() => {
    updateMarkersRef.current = updateMarkers;
  }, [updateMarkers]);

  useEffect(() => {
    if (map.current) return;
    if (!apiKey) return;

    maptilersdk.config.apiKey = apiKey;

    map.current = new maptilersdk.Map({
      container: mapContainer.current!,
      style: maptilersdk.MapStyle.STREETS,
      center: [124.2442, 8.2415],
      zoom: 13,
      navigationControl: false,
      geolocateControl: false,
      fadeDuration: 0,
      transformRequest: (url: string) => {
        if (url.includes('maptiler.com') || url.includes('maptiler')) {
          return { url };
        }
      },
    });

    // Intercept and resolve missing style images to suppress MapTiler road/space warnings in console
    map.current.on("styleimagemissing", (e: { id?: string }) => {
      try {
        if (e && e.id && map.current) {
          const width = 1;
          const height = 1;
          const data = new Uint8Array([0, 0, 0, 0]);
          map.current.addImage(e.id, { width, height, data });
        }
      } catch {
        // ignore any errors adding dummy fallback
      }
    });

    map.current.on("load", () => {
      updateMarkersRef.current();
      setMapLoaded(true);
    });

    // Scale all markers with zoom level
    map.current.on("zoom", () => {
      const zoom = map.current!.getZoom();
      Object.values(markerPins.current).forEach((pin) => {
        const scale = Math.pow(1.25, zoom - 13);
        pin.style.transform = `scale(${Math.min(Math.max(scale, 0.3), 3)})`;
      });
    });
  }, [apiKey]);

  useEffect(() => {
    // If map exists, we need to tell it to resize when sidebar collapses/expands
    if (map.current) {
      setTimeout(() => {
        map.current?.resize();
      }, 305); // slightly more than the transition duration
    }
  }, [isSidebarCollapsed]);

  useEffect(() => {
    updateMarkers();
  }, [updateMarkers]);



  const handleListingClick = (listing: Listing) => {
    setSelectedListing(listing.id);
    if (listing.lat && listing.lng && map.current) {
      map.current.flyTo({
        center: [listing.lng, listing.lat],
        zoom: 16,
        duration: 1500,
      });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white relative">
      <button
        onClick={() => navigate(-1)}
        className="md:hidden absolute top-[76px] left-3 z-30 w-10 h-10 flex items-center justify-center bg-white shadow-md pointer-events-auto active:scale-90 transition-transform rounded-full border border-neutral-100"
        aria-label="Go back"
      >
        <ArrowLeft size={20} className="text-neutral-900" />
      </button>

      {/* Search Header */}
      <div className="flex items-center justify-center md:justify-between px-3 md:px-8 py-2.5 border-b border-neutral-100/50 bg-white/80 backdrop-blur-xl sticky top-0 z-40 shadow-sm gap-2 sm:gap-3">
        {/* Back Button */}
        <div className="hidden md:flex flex-1 justify-start">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-1 md:-ml-2 rounded-full hover:bg-neutral-100 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={24} className="text-neutral-900" />
          </button>
        </div>

        <div className="flex-[3] flex justify-center min-w-0 w-full">
          <div
            ref={dropdownRef}
            className="bg-white border border-neutral-200 p-1.5 sm:p-2 md:p-2 rounded-full flex items-center h-[46px] sm:h-[52px] md:h-[56px] text-neutral-800 shadow-lg w-full sm:max-w-[480px] md:max-w-[650px] lg:max-w-[750px] transition-all relative z-40 pointer-events-auto cursor-default"
          >
            {isSearchActive ? (
              <>
                <div className="flex-1 flex items-center pl-4 md:pl-5 pr-0 py-0 w-full min-w-0">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search rooms, location..."
                    className="w-full bg-transparent border-none outline-none text-xs sm:text-sm font-bold text-neutral-800 placeholder:text-neutral-400 focus:ring-0 p-0"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="p-1 hover:bg-neutral-100 rounded-full transition-colors flex-shrink-0 mr-2"
                      aria-label="Clear search"
                    >
                      <X className="w-3.5 h-3.5 text-neutral-500" />
                    </button>
                  )}
                </div>
                <button
                  onClick={() => {
                    setIsSearchActive(false);
                  }}
                  className="bg-[#17294F] p-2 sm:p-3 md:p-3 rounded-full transition-all duration-200 shadow-md ml-1 sm:ml-2 md:ml-2 group flex-shrink-0 flex items-center justify-center cursor-pointer relative z-[70]"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px] md:w-[18px] md:h-[18px] text-white group-hover:stroke-[3px] transition-all" />
                </button>
                <SearchDropdown
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  onClose={() => setIsSearchActive(false)}
                  onSelectListing={(id) => handleSelectListing(id)}
                />
              </>
            ) : (
              <>
                {/* Location Section */}
                <div className="flex-[1.2] min-w-0">
                  <div
                    role="button"
                    onClick={() => toggleDropdown("location")}
                    className={`w-full min-w-0 flex items-center justify-between px-1.5 sm:px-3 md:pl-5 md:pr-3 py-1.5 md:py-2 transition cursor-pointer group text-black focus-visible:outline-none ${
                      activeDropdown === "location"
                        ? "bg-neutral-100 rounded-full text-[#17294F] shadow-sm relative z-[60]"
                        : "hover:bg-neutral-50 rounded-full"
                    }`}
                  >
                    <div className="flex items-center gap-1 md:gap-3 min-w-0">
                      <MapPin className="w-3.5 h-3.5 md:w-5 md:h-5 text-[#2252D6] flex-shrink-0" />
                      <span className="text-[10px] sm:text-sm md:text-base font-semibold truncate">
                        {selectedLocation ? selectedLocation : "Location"}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-3 h-3 md:w-3.5 md:h-3.5 opacity-40 group-hover:opacity-100 flex-shrink-0 ml-0.5 md:ml-1 transition-all ${activeDropdown === "location" ? "rotate-180 opacity-100" : ""}`}
                    />
                  </div>

                  <AnimatePresence>
                    {activeDropdown === "location" && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          clipPath: "inset(0% 0% 100% 0%)",
                        }}
                        animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
                        exit={{ opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }}
                        transition={{
                          type: "tween",
                          ease: "easeOut",
                          duration: 0.2,
                        }}
                        className="absolute top-[100%] mt-2 left-0 w-full bg-white rounded-2xl md:rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.2)] md:shadow-xl border border-neutral-100 p-4 z-50 text-left"
                      >
                        <div className="space-y-4">
                          <div>
                            <div
                              className="flex items-center px-4 py-2 bg-neutral-100 rounded-xl mb-3 focus-within:ring-2 focus-within:ring-[#2252D6]/20 transition-all cursor-text"
                              onClick={(e) => {
                                e.stopPropagation();
                                (
                                  e.currentTarget.querySelector(
                                    "input",
                                  ) as HTMLInputElement
                                )?.focus();
                              }}
                            >
                              <Search className="w-4 h-4 text-neutral-400 mr-2 flex-shrink-0" />
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
                                  className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-50 transition-colors group/item"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-[#2252D6]/10 flex items-center justify-center text-[#2252D6] group-hover/item:bg-[#2252D6] group-hover/item:text-white transition-all">
                                    <MapPin size={14} />
                                  </div>
                                  <span className="font-bold text-neutral-800 text-sm">
                                    {loc}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="w-[1px] h-5 md:h-6 bg-neutral-300" />

                {/* Dates Section */}
                <div className="flex-1 min-w-0">
                  <div
                    role="button"
                    onClick={() => toggleDropdown("dates")}
                    className={`w-full min-w-0 flex items-center justify-between px-1.5 sm:px-3 md:pl-5 md:pr-3 py-1.5 md:py-2 transition cursor-pointer group text-black focus-visible:outline-none ${
                      activeDropdown === "dates"
                        ? "bg-neutral-100 rounded-full text-[#17294F] shadow-sm relative z-[60]"
                        : "hover:bg-neutral-50 rounded-full"
                    }`}
                  >
                    <div className="flex items-center gap-1 md:gap-3 min-w-0">
                      <CalendarIcon className="w-3.5 h-3.5 md:w-5 md:h-5 text-[#2252D6] flex-shrink-0" />
                      <span className="text-[10px] sm:text-sm md:text-base font-semibold truncate">
                        {selectedDateStr ? selectedDateStr : "Dates"}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-3 h-3 md:w-3.5 md:h-3.5 opacity-40 group-hover:opacity-100 flex-shrink-0 ml-0.5 md:ml-1 transition-all ${activeDropdown === "dates" ? "rotate-180 opacity-100" : ""}`}
                    />
                  </div>

                  <AnimatePresence>
                    {activeDropdown === "dates" && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          clipPath: "inset(0% 0% 100% 0%)",
                        }}
                        animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
                        exit={{ opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }}
                        transition={{
                          type: "tween",
                          ease: "easeOut",
                          duration: 0.2,
                        }}
                        className="absolute top-[100%] mt-2 left-0 w-full bg-white rounded-2xl md:rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.2)] md:shadow-xl border border-neutral-100 overflow-hidden z-50 text-left"
                      >
                        <DateScrollPicker
                          viewportHeight={132}
                          onDateChange={(m, d, y) =>
                            setSelectedDateStr(`${m} ${d}, ${y}`)
                          }
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="w-[1px] h-5 md:h-6 bg-neutral-300" />

                {/* Budget Section */}
                <div className="flex-1 min-w-0">
                  <div
                    role="button"
                    onClick={() => toggleDropdown("budget")}
                    className={`w-full min-w-0 flex items-center justify-between px-1.5 sm:px-3 md:pl-5 md:pr-3 py-1.5 md:py-2 transition cursor-pointer group text-black focus-visible:outline-none ${
                      activeDropdown === "budget"
                        ? "bg-neutral-100 rounded-full text-[#17294F] shadow-sm relative z-[60]"
                        : "hover:bg-neutral-50 rounded-full"
                    }`}
                  >
                    <div className="flex items-center gap-1 md:gap-3 min-w-0">
                      <Wallet className="w-3.5 h-3.5 md:w-5 md:h-5 text-[#2252D6] flex-shrink-0" />
                      <span className="text-[10px] sm:text-sm md:text-base font-semibold truncate">
                        {selectedBudget ? selectedBudget : "Budget"}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-3 h-3 md:w-3.5 md:h-3.5 opacity-40 group-hover:opacity-100 flex-shrink-0 ml-0.5 md:ml-1 transition-all ${activeDropdown === "budget" ? "rotate-180 opacity-100" : ""}`}
                    />
                  </div>

                  <AnimatePresence>
                    {activeDropdown === "budget" && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          clipPath: "inset(0% 0% 100% 0%)",
                        }}
                        animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
                        exit={{ opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }}
                        transition={{
                          type: "tween",
                          ease: "easeOut",
                          duration: 0.2,
                        }}
                        className="absolute top-[100%] mt-2 left-0 w-full bg-white rounded-2xl md:rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.2)] md:shadow-xl border border-neutral-100 p-4 z-50 text-left"
                      >
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 gap-1">
                            {[
                              { label: "₱1k - ₱3k" },
                              { label: "₱3k - ₱5k" },
                              { label: "₱5k+" },
                            ].map((range) => (
                              <button
                                key={range.label}
                                onClick={() => {
                                  setSelectedBudget(range.label);
                                  setActiveDropdown(null);
                                }}
                                className="flex flex-col px-3 py-2.5 rounded-lg bg-transparent hover:bg-neutral-100 transition-all text-left w-full"
                              >
                                <span className="font-bold text-neutral-900 text-sm">
                                  {range.label}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (hasSelections) {
                      const terms = [];
                      if (selectedLocation) terms.push(selectedLocation);
                      if (selectedDateStr) terms.push(selectedDateStr);
                      if (selectedBudget) terms.push(selectedBudget);
                      setSearchQuery(terms.join(" "));
                      setActiveDropdown(null);
                    } else {
                      setSearchQuery("");
                      setIsSearchActive(true);
                      setActiveDropdown(null);
                    }
                  }}
                  className="bg-[#17294F] p-2 sm:p-3 md:p-3 rounded-full transition-all duration-200 shadow-md ml-1 sm:ml-2 md:ml-2 group flex-shrink-0 flex items-center justify-center cursor-pointer relative z-[70]"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px] md:w-[18px] md:h-[18px] text-white group-hover:stroke-[3px] transition-all" />
                </button>
              </>
            )}
          </div>
        </div>


      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Sidebar - Scrollable Listings */}
        <div
          className={`hidden md:block transition-all duration-300 h-full overflow-hidden border-r border-neutral-100 bg-white z-20 flex-shrink-0 ${isSidebarCollapsed ? "w-0" : "md:portrait:w-[330px] md:landscape:w-[420px] lg:w-[480px]"}`}
        >
          <div className="w-full md:portrait:w-[330px] md:landscape:w-[420px] lg:w-[480px] h-full overflow-y-auto p-4 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={`skeleton-map-${i}`}
                    className="transition-all duration-300 rounded-xl"
                  >
                    <ListingCardSkeleton compact={true} />
                  </div>
                ))
              ) : filteredListings.length > 0 ? (
                filteredListings.map((listing) => (
                  <div
                    key={listing.id}
                    id={`listing-${listing.id}`}
                    className={`transition-all duration-300 rounded-xl cursor-pointer ${selectedListing === listing.id ? "ring-2 ring-[#17294F] ring-offset-2" : ""}`}
                    onClick={() => handleListingClick(listing)}
                  >
                    <ListingCard
                      listing={listing}
                      onClick={() => navigate(`/listing/${listing.id}`)}
                      compact={true}
                    />
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                  <div className="bg-neutral-50 p-6 rounded-full mb-4">
                    <Search size={32} className="text-neutral-400" />
                  </div>
                  <h3 className="text-lg font-bold text-black mb-2">
                    No listings here
                  </h3>
                  <p className="text-neutral-500 text-sm mb-6">
                    Try adjusting your filters or area.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                    }}
                    className="px-6 py-3 bg-black text-white rounded-full font-bold hover:bg-neutral-800 transition text-sm"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>

            <div className="h-12" />
          </div>
        </div>

        {/* Desktop Collapse Toggle Button */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className={`hidden md:flex items-center justify-center absolute top-1/2 z-30 bg-white border border-neutral-200 w-6 h-14 rounded-r-xl shadow-md hover:bg-neutral-50 transition-all duration-300 -translate-y-1/2 transform ${isSidebarCollapsed ? "left-0" : "md:portrait:left-[330px] md:landscape:left-[420px] lg:left-[480px]"}`}
        >
          {isSidebarCollapsed ? (
            <ChevronRight size={16} className="text-neutral-500" />
          ) : (
            <ChevronLeft size={16} className="text-neutral-500" />
          )}
        </button>

        {/* Right Map */}
        <div className="flex-1 h-full relative">
          {(!apiKey || !shouldLoadMap) && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-neutral-50">
              <div
                className="absolute inset-0 opacity-20 grayscale-[0.5]"
                style={{
                  backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="relative z-20 flex flex-col items-center gap-4 px-6 text-center">
                {!apiKey ? (
                  <>
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                      <MapPin size={32} className="text-amber-600" />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-800">Map unavailable</h3>
                    <p className="text-sm text-neutral-500 max-w-xs">
                      Add your MapTiler API key to <code className="bg-neutral-200 px-1.5 py-0.5 rounded text-xs font-mono">.env</code> to enable the live map.
                    </p>
                    <a
                      href="https://cloud.maptiler.com/account/keys/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 px-5 py-2.5 bg-[#17294F] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#2252D6] transition-all"
                    >
                      Get a free key
                    </a>
                  </>
                ) : (
                  <button 
                    onClick={() => setShouldLoadMap(true)}
                    className="py-3 px-6 bg-[#17294F] text-white text-sm font-bold rounded-xl hover:bg-[#2252D6] transition-all shadow-xl active:scale-95 flex items-center gap-2"
                  >
                    <MapPin className="w-5 h-5 text-white" />
                    Load Interactive Map
                  </button>
                )}
              </div>
            </div>
          )}
          {!!apiKey && shouldLoadMap && !mapLoaded && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-neutral-50 backdrop-blur-md">
              <span className="loader" />
            </div>
          )}
          <div ref={mapContainer} className="w-full h-full" />

          <div className="hidden md:flex absolute bottom-10 right-10 flex-col gap-2 z-10">
            <div className="bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden divide-y divide-neutral-100 flex flex-col">
              <button
                className="p-3 hover:bg-neutral-50 transition font-bold text-neutral-600"
                onClick={() => map.current?.zoomIn()}
              >
                +
              </button>
              <button
                className="p-3 hover:bg-neutral-50 transition font-bold text-neutral-600"
                onClick={() => map.current?.zoomOut()}
              >
                −
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Horizontal Scrollable Listings Overlay */}
        <div className="md:hidden absolute bottom-6 left-0 right-0 z-40 px-4 pb-0">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {filteredListings.map((listing) => (
              <div
                key={listing.id}
                id={`mobile-listing-${listing.id}`}
                className="snap-center shrink-0 w-full flex justify-center"
                onClick={() => {
                  setSelectedListing(listing.id);
                  if (listing.lat && listing.lng && map.current) {
                    map.current.flyTo({
                      center: [listing.lng, listing.lat],
                      zoom: 16,
                    });
                  }
                }}
              >
                <div
                  className={`w-full [@media(max-height:600px)_and_(orientation:landscape)]:max-w-[340px] transition-all duration-300 rounded-[1.5rem] bg-white shadow-2xl ${selectedListing === listing.id ? "ring-2 ring-[#17294F] scale-[1.02]" : "scale-100"}`}
                >
                  <ListingCard
                    listing={listing}
                    onClick={() => navigate(`/listing/${listing.id}`)}
                    compact={true}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

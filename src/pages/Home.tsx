import Hero from "../components/Hero";
import Categories from "../components/Categories";
import BottomNav from "../components/BottomNav";
import Footer from "../components/Footer";
import { ListingCarousel } from "../components/ListingCarousel";
import { useListings } from "../hooks/useListings";
import { useListingsFilter } from "../hooks/useListingsFilter";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { useSearchHistory } from "../hooks/useSearchHistory";
import { SearchHistory } from "../components/SearchHistory";
import { StickySearchBar } from "../components/StickySearchBar";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { DEFAULT_FILTERS } from "../lib/constants";

const CAROUSEL_ITEM_CLASS =
  "min-w-[calc((100%-12px)/2)] w-[calc((100%-12px)/2)] md:portrait:min-w-[calc((100%-24px)/3)] md:portrait:w-[calc((100%-24px)/3)] md:landscape:min-w-[calc((100%-48px)/5)] md:landscape:w-[calc((100%-48px)/5)] lg:min-w-[calc((100%-48px)/5)] lg:w-[calc((100%-48px)/5)] xl:min-w-[calc((100%-48px)/5)] xl:w-[calc((100%-48px)/5)] snap-center flex-shrink-0";

export default function Home() {
  const { listings: LISTINGS, loading: listingsLoading } = useListings();
  const { history, addSearch, removeSearch } = useSearchHistory();
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isStickySearchActive, setIsStickySearchActive] = useState(false);
  const [hideStickyDropdown, setHideStickyDropdown] = useState(false);

  const [selectedStickyLocation, setSelectedStickyLocation] = useState<string | null>(null);
  const [selectedStickyBudget, setSelectedStickyBudget] = useState<string | null>(null);

  React.useEffect(() => {
    document.title = "Home | Khubo";
  }, []);

  React.useEffect(() => {
    if (isStickySearchActive) {
      setHideStickyDropdown(false);
    }
  }, [isStickySearchActive]);

  const [isSticky, setIsSticky] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const observerRef = useRef<HTMLDivElement>(null);
  const searchObserverRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const [stickyActiveDropdown, setStickyActiveDropdown] = useState<"location" | "budget" | "general" | null>(null);

  React.useEffect(() => {
    if (!isSticky || !isStickySearchActive) {
      setStickyActiveDropdown(null);
    }
  }, [isSticky, isStickySearchActive]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting && entry.boundingClientRect.top <= 0);
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
        setShowSearch(!entry.isIntersecting && entry.boundingClientRect.top <= 70);
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

  const filteredListings = useListingsFilter(LISTINGS, DEFAULT_FILTERS, searchQuery, selectedCategory);

  const handleListingClick = useCallback((id: string) => {
    navigate(`/listing/${id}`);
  }, [navigate]);

  const handleSearch = useCallback((query: string) => {
    addSearch(query);
  }, [addSearch]);

  return (
    <div className="min-h-screen bg-[#F9F9F9] pb-32">
      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isSearchActive={isSearchActive}
        setIsSearchActive={setIsSearchActive}
        suppressDropdown={displaySearch}
      />

      {history.length > 0 && (
        <div className="max-w-[2520px] mx-auto xl:px-12 md:px-12 sm:px-4 px-4 mt-4 mb-4">
          <SearchHistory
            history={history}
            onSelect={(q) => {
              setSearchQuery(q);
              addSearch(q);
            }}
            onRemove={removeSearch}
          />
        </div>
      )}
      <div id="search-results-anchor" />
      <div ref={observerRef} className="w-full h-[1px] invisible pointer-events-none" />

      {displaySearch ? (
        <StickySearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isStickySearchActive={isStickySearchActive}
          setIsStickySearchActive={setIsStickySearchActive}
          hideStickyDropdown={hideStickyDropdown}
          setHideStickyDropdown={setHideStickyDropdown}
          stickyActiveDropdown={stickyActiveDropdown}
          setStickyActiveDropdown={setStickyActiveDropdown}
          selectedStickyLocation={selectedStickyLocation}
          setSelectedStickyLocation={setSelectedStickyLocation}
          selectedStickyBudget={selectedStickyBudget}
          setSelectedStickyBudget={setSelectedStickyBudget}
          listings={LISTINGS || []}
          onListingClick={handleListingClick}
          onSearch={handleSearch}
        />
      ) : (
        <div className="bg-white sticky top-0 z-40 border-b border-gray-100 shadow-sm">
          <div className="max-w-[2520px] mx-auto xl:px-12 md:px-12 sm:px-4 px-0 flex items-center justify-between min-h-16">
            <div className="flex items-center justify-between w-full">
              <div className="flex-1 min-w-0 relative group/cat pl-2 sm:pl-0">
                <Categories selectedCategory={selectedCategory} onSelect={setSelectedCategory} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div ref={searchObserverRef} className="w-full h-[1px] invisible pointer-events-none" />

      <main className="max-w-[2520px] mx-auto xl:px-12 md:px-12 sm:px-4 px-4 pt-10">
        <div className="flex flex-col gap-8">
          {listingsLoading || filteredListings.length > 0 ? (
            <>
              <ListingCarousel title="Recommended" listings={filteredListings} loading={listingsLoading} sliceStart={0} sliceEnd={21} skeletonPrefix="rec" carouselItemClass={CAROUSEL_ITEM_CLASS} onListingClick={handleListingClick} hideHeader />
              <ListingCarousel title="Top Listing" listings={filteredListings} loading={listingsLoading} sliceStart={7} sliceEnd={28} skeletonPrefix="top" carouselItemClass={CAROUSEL_ITEM_CLASS} onListingClick={handleListingClick} hideHeader />
              <ListingCarousel title="Near MSU-IIT" listings={filteredListings} loading={listingsLoading} sliceStart={14} sliceEnd={35} skeletonPrefix="msu" carouselItemClass={CAROUSEL_ITEM_CLASS} onListingClick={handleListingClick} hideHeader />
            </>
          ) : null}
        </div>

        {!listingsLoading && filteredListings.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-white rounded-3xl shadow-sm border border-neutral-100 max-w-4xl mx-auto w-full mt-8 mb-8">
            <div className="bg-neutral-50 p-6 rounded-full mb-4">
              <Search size={32} className="text-neutral-400" />
            </div>
            <h2 className="text-xl font-bold font-display text-black mb-2">No listings found</h2>
            <p className="text-neutral-500 mb-6 text-sm sm:text-base">
              {searchQuery
                ? `We couldn't find any listings matching "${searchQuery}". Try typing another keyword or clearing search filters.`
                : "Try choosing another category."}
            </p>
            <button
              onClick={() => {
                setSelectedCategory("ALL");
                setSearchQuery("");
                setIsSearchActive(false);
                setIsStickySearchActive(false);
                setHideStickyDropdown(true);
              }}
              className="px-6 py-3 bg-black text-white rounded-full font-bold g-neutral-800"
            >
              Clear all filters & search
            </button>
          </div>
        )}
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}

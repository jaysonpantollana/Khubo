// @context: Horizontal listing carousel — scrollable row of ListingCards
// @purpose: Reusable carousel component with title, arrows, and skeleton loading; used on Home page for sections
// @behavior: Renders listings in horizontal scrollable container; uses sliceStart/sliceEnd for chunking
// @behavior: Shows skeleton cards during loading; prev/next scroll buttons for desktop
// @dependencies: ListingCard, ListingCardSkeleton, Listing type, lucide-react
// @code-template: Pattern for adding new listing sections: <ListingCarousel title="..." listings={...} loading={...} />

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Listing } from '../types';
import ListingCard from './ListingCard';
import ListingCardSkeleton from './ListingCardSkeleton';
import { ItemsPopup } from './ItemsPopup';

interface ListingCarouselProps {
  title: string;
  listings: Listing[];
  loading: boolean;
  sliceStart: number;
  sliceEnd: number;
  skeletonPrefix: string;
  carouselItemClass: string;
  onListingClick: (id: string) => void;
  hideHeader?: boolean;
}

const CAROUSEL_SCROLLER_CLASS =
  'grid grid-cols-2 gap-3 pb-4 sm:flex sm:overflow-x-auto sm:no-scrollbar sm:snap-x sm:snap-mandatory sm:scroll-smooth';

export function ListingCarousel({
  title,
  listings,
  loading,
  sliceStart,
  sliceEnd,
  skeletonPrefix,
  carouselItemClass,
  onListingClick,
  hideHeader = false,
}: ListingCarouselProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [showPopup, setShowPopup] = React.useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = ref.current.clientWidth * 0.8;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="flex flex-col gap-2 md:gap-3">
      <div className="flex items-center justify-between">
        {!hideHeader ? (
          <h2
            className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl text-black whitespace-nowrap truncate cursor-pointer"
            onClick={() => setShowPopup(true)}
          >
            {title}
          </h2>
        ) : (
          <div className="hidden md:block" />
        )}

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => scroll('left')}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 order-neutral-400 ext-black transition-all"
            aria-label={`Previous ${title}`}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 order-neutral-400 ext-black transition-all"
            aria-label={`Next ${title}`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div
          ref={ref}
          className={CAROUSEL_SCROLLER_CLASS}
          style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        >
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={`skeleton-${skeletonPrefix}-${i}`} className={carouselItemClass}>
              <ListingCardSkeleton />
            </div>
          ))
        ) : (
          listings.slice(sliceStart, sliceEnd).map((listing) => (
            <div key={listing.id} className={carouselItemClass}>
              <ListingCard
                listing={listing}
                onClick={() => onListingClick(listing.id)}
              />
            </div>
          ))
        )}
      </div>

      <ItemsPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        title={title}
        items={listings.slice(sliceStart, sliceEnd)}
        onItemClick={(listing) => onListingClick(listing.id)}
        renderItem={(listing, onSelect) => (
          <ListingCard listing={listing} onClick={onSelect} />
        )}
        emptyText="No listings available."
      />
    </div>
  );
}

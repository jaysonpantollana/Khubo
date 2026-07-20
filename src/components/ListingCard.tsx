// @context: Listing card — property preview card used in grids and carousels
// @purpose: Displays listing image, title, location, price, rating, amenities, and host badge
// @behavior: Supports compact layout (map sidebar) and full layout (grid); keyboard accessible (Enter/Space)
// @behavior: Entrance animation via motion (opacity + y translate); optional disableInitialAnimation
// @dependencies: Listing type, motion, lucide-react
// @code-template: Pattern for listing display items: forward onClick + keyboard handlers

import React from 'react';
import { Star } from 'lucide-react';
import { Listing } from '../types';

interface ListingCardProps {
  listing: Listing;
  onClick: () => void;
  compact?: boolean;
}

export default React.memo(function ListingCard({ listing, onClick, compact }: ListingCardProps) {
  if (compact) {
    return (
      <div 
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
        tabIndex={0}
        role="button"
        className="col-span-1 cursor-pointer bg-white rounded-xl p-2 sm:p-2.5 shadow-sm border border-gray-100 group outline-none focus-visible:ring-2 focus-visible:ring-[#17294F] flex flex-row gap-3 h-[96px] sm:h-[104px]"
      >
        <div className="aspect-[4/3] h-full relative overflow-hidden rounded-lg flex-shrink-0">
          <img
            src={listing.image}
            alt={listing.title}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800';
            }}
            className="object-cover h-full w-full"
          />
          {listing.date && (
            <div aria-hidden="true" className="absolute bottom-1.5 left-1.5 z-10 px-2 py-0.5 bg-[#4E4F50] text-white text-[7px] font-bold rounded-full uppercase tracking-wider">
              {listing.date}
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0 py-0.5 flex flex-col justify-between">
          <div>
            <h3 className="font-display font-extrabold text-[14px] sm:text-[15px] leading-tight truncate text-[#1a1a1a] mb-0.5">{listing.title}</h3>
            <div className="text-[11px] text-gray-500 font-medium truncate">{listing.location}</div>
          </div>
          
          <div className="flex items-center justify-between mt-auto">
            <div className="flex flex-col">
               <div className="font-display font-extrabold text-[#17294F] text-[14px]">P{listing.price}</div>
            </div>
            
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1 bg-amber-50 px-1 py-0.5 rounded-md text-amber-700">
                <Star size={8} className="fill-amber-400 text-amber-400" />
                <span className="text-[9px] font-bold">{listing.rating.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${listing.title} at ${listing.location}. Price P${listing.price} per month. Rating ${listing.rating.toFixed(2)} stars.`}
      className="col-span-1 h-full cursor-pointer bg-white rounded-2xl p-2 sm:p-3 shadow-md border border-transparent order-gray-100 group outline-none focus-visible:ring-2 focus-visible:ring-[#17294F] focus-visible:ring-offset-2"
    >
      <div className="flex flex-col gap-2 sm:gap-2.5 w-full">
        <div className="aspect-[4/3] relative overflow-hidden rounded-xl">
          <img
            src={listing.image}
            alt={listing.title}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800';
            }}
            className="object-cover h-full w-full"
          />
          <div aria-hidden="true" className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-10 px-2 py-0.5 sm:px-2.5 sm:py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-[8px] sm:text-[10px] font-bold">
            {listing.date}
          </div>
        </div>
        
        <div className="px-1 sm:px-1 flex flex-col gap-0.5">
          <h3 className="font-display font-extrabold text-[13px] sm:text-[16px] leading-snug line-clamp-2 text-[#1a1a1a]">{listing.title}</h3>
          
          <div className="flex items-center gap-1 mt-0.5">
            <div className="text-[10px] sm:text-[12px] text-gray-500 font-medium truncate flex-1 min-w-0">{listing.location}</div>
          </div>

          <div className="flex items-center justify-between mt-0.5 sm:mt-1">
            <div className="flex items-baseline gap-0.5">
               <div className="font-display font-extrabold text-[#17294F] text-[14px] sm:text-[17px]">P{listing.price}</div>
               <div className="text-[9px] sm:text-[11px] text-gray-500 font-medium">/month</div>
            </div>
            <div className="flex items-center gap-0.5">
              <Star size={10} className="fill-amber-400 text-amber-400 sm:w-[13px] sm:h-[13px]" />
              <span className="text-[11px] sm:text-[13px] font-bold text-gray-700">{listing.rating.toFixed(2)}</span>
            </div>
          </div>
          
          <div aria-hidden="true" className="flex items-center mt-1.5 sm:mt-2 pt-1.5 sm:pt-2 border-t border-gray-50">
            <div className="flex gap-1 sm:gap-1.5 flex-wrap">
              {listing.amenities.slice(0, 2).map((amenity, i) => (
                <span key={amenity} className="px-1.5 py-0.5 sm:px-2 bg-gray-50 rounded text-[7px] sm:text-[9px] text-gray-500 border border-gray-100 font-medium">
                  {amenity}
                </span>
              ))}
              {listing.amenities.length > 2 && (
                <span className="px-1.5 py-0.5 sm:px-2 bg-gray-50 rounded text-[7px] sm:text-[9px] text-gray-500 border border-gray-100 font-medium">
                  +{listing.amenities.length - 2}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

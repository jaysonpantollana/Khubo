// @context: Filter panel — price range, rating, sort controls
// @purpose: Portal-based filter modal with min/max price sliders, minimum rating, and sort by dropdown
// @behavior: Opens a floating filter panel on click; has Reset button to restore defaults
// @behavior: Shows active filter indicator when non-default values selected (unless hideIndicator)
// @side-effects: createPortal to document.body for overlay
// @dependencies: motion, lucide-react, cn utility
// @code-template: Pattern for adding filter UIs: define FilterState interface, emit changes via onFilterChange

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { SlidersHorizontal, X } from 'lucide-react';

import { cn } from '../lib/utils';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface FiltersProps {
  onFilterChange: (filters: FilterState) => void;
  currentFilters: FilterState;
  hideIndicator?: boolean;
}

export interface FilterState {
  minPrice: number;
  maxPrice: number;
  minRating: number;
  sortBy: 'relevance' | 'price-low' | 'price-high' | 'rating';
}

export default function Filters({ onFilterChange, currentFilters, hideIndicator }: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  useBodyScrollLock(isOpen);

  const handleReset = () => {
    onFilterChange({
      minPrice: 0,
      maxPrice: 50000,
      minRating: 0,
      sortBy: 'relevance'
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-center w-[46px] h-[46px] sm:w-[50px] sm:h-[50px] rounded-[16px] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)] border border-[#f0f0f0] transition-all relative",
          isOpen && "border-black ring-1 ring-black shadow-[-0_6px_16px_rgba(0,0,0,0.08)]"
        )}
        aria-label="Filters"
      >
        <SlidersHorizontal className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] text-[#484848]" strokeWidth={2} />
        {!hideIndicator && (currentFilters.minPrice !== 0 || currentFilters.maxPrice !== 50000 || currentFilters.minRating !== 0 || currentFilters.sortBy !== 'relevance') && (
          <span className="w-2.5 h-2.5 bg-[#2252D6] rounded-full absolute top-1.5 right-1.5 border-[2px] border-white" />
        )}
      </button>

      {typeof document !== 'undefined' && createPortal(
        <>
          {isOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
              />
              <div
                className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl z-10 overflow-hidden flex flex-col max-h-[90vh]"
              >
                <div className="flex items-center justify-between p-6 border-b border-neutral-100">
                  <h3 className="text-xl font-bold font-display">Filters</h3>
                  <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto space-y-8">
                  {/* Sort By */}
                  <div>
                    <label className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-4 block">Sort By</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'relevance', label: 'Relevance' },
                        { id: 'price-low', label: 'Price: Low' },
                        { id: 'price-high', label: 'Price: High' },
                        { id: 'rating', label: 'Rating' }
                      ].map((option) => (
                        <button
                          key={option.id}
                          onClick={() => onFilterChange({ ...currentFilters, sortBy: option.id as FilterState['sortBy'] })}
                          className={cn(
                            "px-4 py-3 rounded-xl border text-sm font-bold transition-all text-center",
                            currentFilters.sortBy === option.id 
                              ? "bg-black text-white border-black" 
                              : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400"
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-4 block">Price Range (Monthly)</label>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <span className="text-xs text-neutral-400 font-bold block mb-2">MIN</span>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 font-bold">₱</span>
                          <input
                            type="number"
                            value={currentFilters.minPrice}
                            onChange={(e) => onFilterChange({ ...currentFilters, minPrice: Number(e.target.value) })}
                            className="w-full pl-8 pr-4 py-3 border border-neutral-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <span className="text-xs text-neutral-400 font-bold block mb-2">MAX</span>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 font-bold">₱</span>
                          <input
                            type="number"
                            value={currentFilters.maxPrice}
                            onChange={(e) => onFilterChange({ ...currentFilters, maxPrice: Number(e.target.value) })}
                            className="w-full pl-8 pr-4 py-3 border border-neutral-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Minimum Rating */}
                  <div>
                    <label className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-4 block">Minimum Rating</label>
                    <div className="flex items-center justify-between gap-2 bg-neutral-50 p-1.5 rounded-2xl">
                      {[0, 3, 4, 4.5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => onFilterChange({ ...currentFilters, minRating: rating })}
                          className={cn(
                            "flex-1 py-3 rounded-xl text-sm font-bold transition-all",
                            currentFilters.minRating === rating 
                              ? "bg-white shadow-sm text-black ring-1 ring-black/5" 
                              : "text-neutral-500 hover:text-black"
                          )}
                        >
                          {rating === 0 ? 'Any' : `${rating}+`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-neutral-100 flex items-center justify-between bg-white shrink-0">
                  <button 
                    onClick={handleReset}
                    className="text-sm font-bold underline hover:text-neutral-600 transition"
                  >
                    Clear all
                  </button>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="bg-black text-white px-8 py-3.5 rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-transform shadow-md"
                  >
                    Show Results
                  </button>
                </div>
              </div>
            </div>
          )}
        </>,
        document.body
      )}
    </div>
  );
}

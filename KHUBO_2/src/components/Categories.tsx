// @context: Horizontal scrollable category selector
// @purpose: Displays category icons in a horizontal scroll list; tracks click counts for popularity-based reordering
// @behavior: Categories randomize on mount (except "ALL" which stays first); click tracking stored in localStorage
// @behavior: Clicking a category sets it as selected; scrollable with dot indicators
// @side-effects: localStorage read/write for click counts; Math.random during render for shuffle
// @dependencies: lucide-react (dynamic icon), CATEGORIES mock data, cn utility
// @known-issues: Math.random() during render (seed not stable — will re-randomize on re-render)

import React, { useState, useEffect, useMemo } from 'react';
import * as Icons from 'lucide-react';
import { CATEGORIES } from '../mocks/listings';
import { cn } from '../lib/utils';
import { Category } from '../types';

interface CategoriesProps {
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export default function Categories({ selectedCategory, onSelect }: CategoriesProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  
  const [clickCounts, setClickCounts] = useState<Record<string, number>>(() => {
    try {
      return JSON.parse(localStorage.getItem('categoryClickCounts') || '{}');
    } catch {
      return {};
    }
  });

  const [randomOrder, setRandomOrder] = useState<Category[]>([]);

  useEffect(() => {
    const allCat = CATEGORIES.find(c => c.label === 'ALL')!;
    const restCats = CATEGORIES.filter(c => c.label !== 'ALL');
    const shuffled = restCats.sort(() => Math.random() - 0.5);
    setRandomOrder([allCat, ...shuffled]);
  }, []);

  const handleChipClick = (label: string) => {
    onSelect(label);
    if (label === 'ALL') return;
    setClickCounts(prev => {
      const next = { ...prev, [label]: (prev[label] || 0) + 1 };
      localStorage.setItem('categoryClickCounts', JSON.stringify(next));
      return next;
    });
  };

  const displayedCategories = useMemo(() => {
    if (randomOrder.length === 0) return CATEGORIES;
    const allCat = randomOrder[0];
    const restCats = [...randomOrder.slice(1)];
    restCats.sort((a, b) => {
      const act = clickCounts[a.label] || 0;
      const bct = clickCounts[b.label] || 0;
      return bct - act; // Sort descending by clicks
    });
    return [allCat, ...restCats];
  }, [randomOrder, clickCounts]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="py-2 sm:py-4 bg-white w-full relative">
      <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      
      <button 
        onClick={() => scroll('left')}
        className="absolute left-0 md:left-0 top-1/2 -translate-y-1/2 z-20 w-7 h-7 flex items-center justify-center bg-white border border-neutral-200 rounded-full text-neutral-500 shadow-sm hover:text-neutral-800 hover:border-neutral-300 active:scale-95 transition-all hidden md:flex"
        aria-label="Scroll left"
      >
        <Icons.ChevronLeft size={16} strokeWidth={2} />
      </button>

      <button 
        onClick={() => scroll('right')}
        className="absolute right-0 md:right-0 top-1/2 -translate-y-1/2 z-20 w-7 h-7 flex items-center justify-center bg-white border border-neutral-200 rounded-full text-neutral-500 shadow-sm hover:text-neutral-800 hover:border-neutral-300 active:scale-95 transition-all hidden md:flex"
        aria-label="Scroll right"
      >
        <Icons.ChevronRight size={16} strokeWidth={2} />
      </button>

      <div 
        ref={scrollRef}
        className="flex flex-row items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar scroll-smooth pl-4 md:pl-12 py-1 w-full touch-pan-x"
      >
        {displayedCategories.map((category) => {
          const isSelected = selectedCategory === category.label;

          return (
            <button
              key={category.label}
              onClick={() => handleChipClick(category.label)}
              className={cn(
                "px-2.5 py-1 sm:px-4 sm:py-2 rounded-full border text-[10px] sm:text-xs font-bold sm:tracking-wider uppercase transition-all duration-200 whitespace-nowrap flex-shrink-0 active:scale-95 cursor-pointer",
                isSelected 
                   ? "bg-neutral-900 text-white border-neutral-900 shadow-sm" 
                   : "bg-white text-neutral-700 border-neutral-200 hover:border-neutral-800 hover:text-neutral-900"
              )}
            >
              {category.label}
            </button>
          );
        })}
        {/* End Spacer to guarantee the rightmost items can be scrolled into view without clipping */}
        <div className="w-4 md:w-12 h-1 flex-shrink-0" aria-hidden="true" />
      </div>
    </div>
  );
}

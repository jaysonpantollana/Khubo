// @context: Roommate page hero — search banner with location/budget dropdowns
// @purpose: Visual hero section for roommate finder; contains search bar, announcements, and filter dropdowns
// @behavior: Search bar toggles between idle and active states; location/budget dropdowns
// @behavior: Announcements overlay toggle; external event click handling for dropdown close
// @side-effects: useEffect for click-outside handling
// @dependencies: RoommateSearchDropdown, AnnouncementsOverlay, motion, lucide-react, react-router-dom
// @known-issues: window.innerWidth check on render (not reactive without resize listener)

import { Search, MapPin, Megaphone, ChevronDown, ChevronUp, Wallet, X, Users, ShieldCheck } from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import SearchDropdown from './SearchDropdown';
import { Roommate } from '../types';
import { AnnouncementsOverlay } from './AnnouncementsOverlay';
import { ROOMMATES } from '../mocks/roommates';
import { BUDGET_RANGES } from '../lib/constants';

interface BudgetRange {
  min: number;
  max: number;
  label: string;
}

interface RoommateHeroProps {
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  isSearchActive?: boolean;
  setIsSearchActive?: (active: boolean) => void;
  onSelectRoommate?: (roommate: Roommate) => void;
  suppressDropdown?: boolean;
  onBudgetSelect?: (range: BudgetRange | null) => void;
}

export default function RoommateHero({
  searchQuery = '',
  setSearchQuery = () => {},
  isSearchActive = false,
  setIsSearchActive = () => {},
  onSelectRoommate,
  suppressDropdown = false,
  onBudgetSelect
}: RoommateHeroProps) {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState<'location' | 'budget' | 'general' | null>(null);
  const [hideDropdown, setHideDropdown] = useState(false);
  const [isAnnouncementsOpen, setIsAnnouncementsOpen] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const budgetScrollRef = React.useRef<HTMLDivElement>(null);

  const hasSelections = selectedLocation || selectedBudget;

  const budgetRanges = BUDGET_RANGES;

  useEffect(() => {
    if (suppressDropdown) {
      setActiveDropdown(null);
      setIsSearchActive(false);
    }
  }, [suppressDropdown, setIsSearchActive]);

  useEffect(() => {
    if (isSearchActive) {
      setHideDropdown(false);
    }
  }, [isSearchActive]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (dropdown: 'location' | 'budget' | 'general') => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="relative min-h-[440px] md:h-[500px] w-full z-50">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg_3.png')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 max-w-[2520px] mx-auto h-full px-4 md:px-12">
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between py-4 md:py-6 px-4 md:px-12 gap-4 z-20">
          <button 
            aria-label="Home" 
            onClick={() => navigate('/')} 
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
            onClick={() => setIsAnnouncementsOpen(true)}
            className="flex items-center justify-center w-10 h-10 md:w-16 md:h-16 bg-transparent text-white hover:scale-105 active:scale-95 transition-transform"
          >
            <Megaphone className="w-5 h-5 md:w-8 md:h-8" />
          </button>
        </div>

        {/* Center Content */}
        <div className="flex flex-col items-center justify-center text-center h-full pt-8 md:pt-10">
          <div 
            className="flex items-baseline gap-3 md:gap-4"
          >
            <h1 className="font-noto-serif italic text-white text-xl sm:text-2xl md:text-[35px] tracking-tight leading-tight">
              The Smarter Way to Share
            </h1>
            <p className="text-white/70 font-roboto font-bold text-[10px] md:text-base tracking-[0.3em] uppercase">
              by <span className="text-white">KHUBO</span>
            </p>
          </div>

          <div 
            className="mt-5 md:mt-12 w-full flex justify-center relative dropdown-container"
          >
            {/* Dropdown panels — rendered OUTSIDE the pill so they expand below it */}
            {!isSearchActive && activeDropdown === 'location' && (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-[98%] max-w-[450px] md:max-w-[700px] lg:max-w-[820px] bg-white rounded-2xl md:rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.2)] md:shadow-xl border border-neutral-100 p-4 z-[100] text-left pointer-events-auto">
                <div className="space-y-4">
                  <div>
                      <div className="flex items-center px-4 py-2 bg-neutral-100 rounded-xl mb-3 focus-within:ring-2 focus-within:ring-[#2252D6]/20 transition-all cursor-text" onClick={(e) => { e.stopPropagation(); (e.currentTarget.querySelector('input') as HTMLInputElement)?.focus(); }}>
                        <Search className="w-4 h-4 text-neutral-400 mr-2 flex-shrink-0" />
                        <input 
                          type="text"
                          placeholder="Search location..."
                          className="w-full bg-transparent border-none outline-none text-sm font-medium text-neutral-900 placeholder:text-neutral-400 p-0 focus:ring-0"
                        />
                      </div>
                    <div className="space-y-1">
                      {['Iligan City'].map((loc) => (
                        <button 
                          key={loc}
                          onClick={() => { setSelectedLocation(loc); setActiveDropdown(null); }}
                          className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-50 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#2252D6]/10 flex items-center justify-center text-[#2252D6] group-hover:bg-[#2252D6] group-hover:text-white transition-all">
                            <MapPin size={14} />
                          </div>
                          <span className="font-medium text-neutral-800 text-sm">{loc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!isSearchActive && activeDropdown === 'budget' && (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-[98%] max-w-[450px] md:max-w-[700px] lg:max-w-[820px] bg-white rounded-2xl md:rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.2)] md:shadow-xl border border-neutral-100 p-4 z-[100] text-left pointer-events-auto">
                <button
                  onClick={() => budgetScrollRef.current?.scrollBy({ top: -40, behavior: 'smooth' })}
                  className="absolute top-3 right-3 p-2.5 rounded-xl bg-neutral-200 hover:bg-[#17294F] hover:text-white transition-all z-10 shadow-sm"
                  aria-label="Scroll up"
                >
                  <ChevronUp className="w-5 h-5" />
                </button>
                <button
                  onClick={() => budgetScrollRef.current?.scrollBy({ top: 40, behavior: 'smooth' })}
                  className="absolute bottom-3 right-3 p-2.5 rounded-xl bg-neutral-200 hover:bg-[#17294F] hover:text-white transition-all z-10 shadow-sm"
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
                        onClick={() => { setSelectedBudget(range.label); setActiveDropdown(null); onBudgetSelect?.(range); }}
                        className="flex flex-col px-3 py-2.5 rounded-lg bg-transparent hover:bg-neutral-100 transition-all text-left w-full"
                      >
                        <span className="font-medium text-neutral-900 text-sm">{range.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Pill search bar */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-1.5 md:p-2 rounded-full flex items-center text-white shadow-2xl w-[98%] max-w-[450px] md:max-w-[700px] lg:max-w-[820px] relative z-[95] pointer-events-auto cursor-default">
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
                      if (e.key === 'Enter') {
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
                        setSearchQuery('');
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
                    <Search size={16} className="text-white group-hover:stroke-[3px] transition-all md:hidden" />
                    <Search size={22} className="text-white group-hover:stroke-[3px] transition-all hidden md:block" />
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
                    onSelect={(roommate) => onSelectRoommate?.(roommate)}
                    items={ROOMMATES}
                    filterItems={(items, query) =>
                      items.filter(roommate => {
                        const nameMatch = roommate.name.toLowerCase().includes(query);
                        const bioMatch = roommate.bio ? roommate.bio.toLowerCase().includes(query) : false;
                        const placeMatch = roommate.preferredPlace.toLowerCase().includes(query);
                        const tagsMatch = roommate.tags.some(tag => tag.toLowerCase().includes(query));
                        const genderMatch = roommate.gender ? roommate.gender.toLowerCase().includes(query) : false;
                        const universityMatch = roommate.university ? roommate.university.toLowerCase().includes(query) : false;
                        return nameMatch || bioMatch || placeMatch || tagsMatch || genderMatch || universityMatch;
                      })
                    }
                    renderItem={(roommate, onSelect) => (
                      <div
                        onClick={onSelect}
                        className="flex gap-3 bg-white p-2.5 rounded-xl border border-neutral-100 hover:border-[#17294F]/20 hover:shadow-sm transition-all duration-150 cursor-pointer group"
                      >
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-neutral-100 border-2 border-white shadow-sm flex-shrink-0 relative">
                          <img
                            src={roommate.image}
                            alt={roommate.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex-1 min-w-0 text-left flex flex-col justify-between py-0.5">
                          <div className="min-w-0">
                            <div className="flex items-center gap-1">
                              <h5 className="text-xs sm:text-sm font-semibold text-neutral-900 leading-snug truncate group-hover:text-[#2252D6] transition-colors">
                                {roommate.name}
                              </h5>
                              <span className="text-[10px] text-neutral-500 font-medium flex-shrink-0">
                                • {roommate.gender}
                              </span>
                            </div>
                            <p className="text-[9px] sm:text-xs text-neutral-500 truncate flex items-center mt-0.5">
                              <MapPin size={10} className="mr-0.5 text-neutral-400" />
                              Prefers: {roommate.preferredPlace}
                            </p>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs font-semibold text-[#17294F] bg-[#17294F]/5 px-2 py-0.5 rounded">
                              {roommate.budgetRange}
                            </span>
                            <span className="text-[9px] text-[#2252D6] font-semibold flex items-center gap-0.5 bg-[#2252D6]/5 px-1.5 py-0.5 rounded">
                              <ShieldCheck size={10} />
                              {roommate.university}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    trendingTags={['Near MSU-IIT', 'All Female', 'Solo Room', 'Shared Room', 'All Male', 'Affordable', 'Bed Spacer', 'Boarding House', 'Quiet', 'Clean', 'Night owl', 'Introvert']}
                    scrollAnchorId="roommate-results-anchor"
                    emptyText="No roommates match your search"
                    trendingTitle="Roommate Tags & Filters"
                    resultsTitle="Matching Roommates"
                    resultsIcon={<Users size={13} className="text-[#2252D6]" />}
                  />
                )}
              </>
            ) : (
              <>
                <div className="flex-[1.2] min-w-0">
                  <div 
                    role="button" 
                    tabIndex={0} 
                    aria-label="Location: Location"
                    onClick={() => toggleDropdown('location')}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), toggleDropdown('location'))}
                    className={`w-full flex items-center justify-between px-1.5 md:pl-6 md:pr-4 py-2.5 md:py-3.5 transition-all cursor-pointer group focus-visible:outline-none ${
                        activeDropdown === 'location' 
                        ? 'bg-white rounded-full text-[#17294F] relative z-[60] shadow-[0_-5px_10px_rgba(0,0,0,0.05)] md:shadow-md' 
                        : 'hover:bg-white/5 rounded-full'
                      }`}
                  >
                    <div className="flex items-center gap-1 md:gap-3 min-w-0">
                      <MapPin className="text-[#2252D6] flex-shrink-0 w-3 h-3 md:w-[16px] md:h-[16px]" />
                      <span className={`text-[10px] md:text-base font-bold truncate md:whitespace-nowrap ${activeDropdown === 'location' ? 'text-neutral-900' : 'text-white'}`}>
                        {selectedLocation ? selectedLocation : 'Location'}
                      </span>
                    </div>
                    <ChevronDown className={`flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity w-3 h-3 md:w-4 md:h-4 ml-1 ${activeDropdown === 'location' ? 'rotate-180 text-neutral-900' : ''}`} />
                  </div>

                </div>

                <div className="w-[1px] h-5 md:h-8 bg-white/20" />

                <div className="flex-1 min-w-0">
                  <div 
                    role="button" 
                    tabIndex={0} 
                    aria-label="Add budget"
                    onClick={() => toggleDropdown('budget')}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), toggleDropdown('budget'))}
                    className={`w-full flex items-center justify-between px-1.5 md:pl-6 md:pr-4 py-2.5 md:py-3.5 transition-all cursor-pointer group focus-visible:outline-none ${
                        activeDropdown === 'budget' 
                        ? 'bg-white rounded-full text-[#17294F] relative z-[60] shadow-[0_-5px_10px_rgba(0,0,0,0.05)] md:shadow-md' 
                        : 'hover:bg-white/5 rounded-full'
                      }`}
                  >
                    <div className="flex items-center gap-1 md:gap-3 min-w-0">
                      <Wallet className="text-[#2252D6] flex-shrink-0 w-3 h-3 md:w-[16px] md:h-[16px]" />
                      <span className={`text-[10px] md:text-base font-bold truncate md:whitespace-nowrap ${activeDropdown === 'budget' ? 'text-neutral-900' : 'text-white'}`}>
                        {selectedBudget ? selectedBudget : 'Budget'}
                      </span>
                    </div>
                    <ChevronDown className={`flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity w-3 h-3 md:w-4 md:h-4 ml-1 ${activeDropdown === 'budget' ? 'rotate-180 text-neutral-900' : ''}`} />
                  </div>

                </div>

                 <button 
                  aria-label="Search" 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (hasSelections) {
                      const terms = [];
                      if (selectedLocation) terms.push(selectedLocation);
                      setSearchQuery(terms.join(' '));
                      setActiveDropdown(null);
                      const searchAnchor = document.getElementById('roommate-results-anchor');
                      if (searchAnchor) {
                        searchAnchor.scrollIntoView({ behavior: 'smooth' });
                      }
                    } else {
                      setSearchQuery('');
                      setIsSearchActive(true);
                      setActiveDropdown(null);
                    }
                  }}
                  className="bg-[#17294F] p-2 md:p-4 rounded-full transition-all duration-200 shadow-lg ml-0.5 md:ml-1.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white flex-shrink-0 flex items-center justify-center cursor-pointer"
                >
                  <Search size={16} className="text-white group-hover:stroke-[3px] transition-all md:hidden" />
                  <Search size={22} className="text-white group-hover:stroke-[3px] transition-all hidden md:block" />
                </button>
              </>
            )}
            </div>
          </div>
        </div>
      </div>
      <AnnouncementsOverlay isOpen={isAnnouncementsOpen} onClose={() => setIsAnnouncementsOpen(false)} />
    </div>
  );
}

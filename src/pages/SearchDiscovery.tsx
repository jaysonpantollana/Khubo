import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, MapPin, SlidersHorizontal, ChevronRight, Check, X, Shield, 
  Bell, BookOpen, Star, RefreshCw, Eye, Plus, Send, AlertCircle, Info, 
  Trash2, ArrowLeft, Layers, Heart, Sparkles, Compass, HelpCircle, ArrowUpDown, Pin
} from 'lucide-react';
import { useListings } from '../hooks/useListings';
import { Listing } from '../types';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import Footer from '../components/Footer';

// Let's model our Neighborhood Guides data
interface NeighborhoodGuide {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  safetyScore: number; // out of 10
  transitScore: number; // out of 10
  costLevel: '$$' | '$$$' | '$';
  cafesCount: number;
  vibe: string;
  landmarks: string[];
}

const NEIGHBORHOODS_DATA: NeighborhoodGuide[] = [
  {
    id: 'tibanga',
    name: 'Tibanga / MSU-IIT Area',
    tagline: 'The vibrant campus heartbeat',
    description: 'Home of the premier Mindanao State University - Iligan Institute of Technology. Tibanga is buzzing with student energy, academic cafes, printing hubs, and highly affordable food stalls. Highly secure with heavy patrol and active pedestrian lanes.',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600',
    safetyScore: 9.6,
    transitScore: 9.4,
    costLevel: '$',
    cafesCount: 15,
    vibe: 'Academic, energetic, street-food central',
    landmarks: ['MSU-IIT Main Gate', 'Tibanga Highway crossing', 'Kanto Dormitories']
  },
  {
    id: 'poblacion',
    name: 'Poblacion / Downtown',
    tagline: 'The bustling commercial core',
    description: 'The geometric center of business, retail shopping, and public transit terminals in Iligan. Perfect for working professionals, interns, and students who love easy access to central malls, grocery markets, and historic landmarks.',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=600',
    safetyScore: 8.8,
    transitScore: 9.9,
    costLevel: '$$$',
    cafesCount: 22,
    vibe: 'Busy, urban, central destination',
    landmarks: ['Lanao del Norte Capitol', 'City Plaza', 'Gaisano Mall']
  },
  {
    id: 'san_miguel',
    name: 'San Miguel District',
    tagline: 'Quiet, leafy family atmosphere',
    description: 'A serene residential sanctuary situated just behind the university hub. Known for spacious individual boarding houses, private gardens, massive trees, and refreshing afternoon breezes away from heavy highway traffic.',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=600',
    safetyScore: 9.2,
    transitScore: 8.1,
    costLevel: '$$',
    cafesCount: 6,
    vibe: 'Peaceful, green, low-noise',
    landmarks: ['San Miguel Parish', 'Leafy Avenue', 'Lions Club park']
  }
];

export default function SearchDiscovery() {
  const navigate = useNavigate();
  const { listings: LISTINGS, loading } = useListings();

  // Primary navigation tabs
  const [activeTab, setActiveTab] = useState<'listings' | 'map' | 'compare' | 'alerts' | 'guides'>('listings');

  // Search & Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 12000 });
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'relevance' | 'price-low' | 'price-high' | 'rating'>('relevance');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  // Subordinated Features State
  const [comparedIds, setComparedIds] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Listing[]>(() => {
    try {
      const saved = localStorage.getItem('recently_viewed_listings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [priceAlerts, setPriceAlerts] = useState<{
    id: string;
    title: string;
    query: string;
    maxBudget: number;
    location: string;
    subscribedAt: string;
  }[]>(() => {
    try {
      const saved = localStorage.getItem('price_alerts');
      return saved ? JSON.parse(saved) : [
        {
          id: 'alert-1',
          title: 'WiFi Enabled Rooms near MSU-IIT',
          query: 'MSU-IIT Wifi',
          maxBudget: 6000,
          location: 'Iligan City',
          subscribedAt: '2026-06-08'
        }
      ];
    } catch {
      return [];
    }
  });

  // Price Alert Subscription Form Inside Sidebar
  const [alertForm, setAlertForm] = useState({
    title: '',
    maxBudget: 6000,
    showModal: false
  });

  // Selected neighborhood guide details
  const [activeGuideId, setActiveGuideId] = useState<string>('tibanga');

  // Interactive Map Settings (geographical scale viewport simulation)
  const [mapZoom, setMapZoom] = useState<number>(13);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({ lat: 8.2415, lng: 124.2442 });
  const [selectedClusterListing, setSelectedClusterListing] = useState<Listing | null>(null);

  // Live Toast notification array for Price drop simulation!
  const [priceDropNotification, setPriceDropNotification] = useState<{
    id: string;
    message: string;
    oldPrice: number;
    newPrice: number;
    listingId: string;
  } | null>(null);

  // Amenities available to filter
  const ALL_AMENITIES_OPTIONS = [
    'Free Wifi',
    'Electricity',
    'Water',
    'CCTV',
    'Aircon',
    'Kitchen',
    'Laundry',
    'Parking'
  ];

  // Save recently viewed to cache whenever it updates
  useEffect(() => {
    localStorage.setItem('recently_viewed_listings', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  // Save price alerts to cache whenever it updates
  useEffect(() => {
    localStorage.setItem('price_alerts', JSON.stringify(priceAlerts));
  }, [priceAlerts]);

  // Handle viewing a listing
  const handleViewListing = (listing: Listing) => {
    // Add to recently viewed without duplicates
    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item.id !== listing.id);
      return [listing, ...filtered].slice(0, 10); // keep top 10 items
    });
    // Navigate to listing detail
    navigate(`/listing/${listing.id}`);
  };

  // Toggle amenities selection
  const handleToggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  // Toggle listing for comparison
  const handleToggleCompare = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setComparedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        if (prev.length >= 3) {
          alert("You can compare up to 3 listings side-by-side!");
          return prev;
        }
        return [...prev, id];
      }
    });
  };

  // Advanced search results computing based on sidebar filters & query
  const filteredListings = useMemo(() => {
    if (!LISTINGS) return [];
    
    return LISTINGS.filter(listing => {
      // Search Box text query
      const matchQuery = !searchQuery || 
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category label match (ALL or matches field value or classification)
      const matchCategory = selectedCategory === 'ALL' || 
        listing.category?.toLowerCase() === selectedCategory.toLowerCase() ||
        listing.title.toLowerCase().includes(selectedCategory.toLowerCase());

      // Price limit
      const matchPrice = listing.price >= priceRange.min && listing.price <= priceRange.max;

      // Rating limit
      const matchRating = listing.rating >= minRating;

      // Multiple amenities match (AND gate)
      const matchAmenities = selectedAmenities.every(reqAmenity => 
        listing.amenities?.some(hasAmenity => hasAmenity.toLowerCase().includes(reqAmenity.toLowerCase()))
      );

      return matchQuery && matchCategory && matchPrice && matchRating && matchAmenities;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'relevance':
        default:
          return 0; // maintain database output relevance
      }
    });
  }, [LISTINGS, searchQuery, selectedCategory, priceRange, minRating, selectedAmenities, sortBy]);

  // Compute dynamic smart clusters of filtered listing markers geographically
  // Group pins that have distance less than dLatLng
  const geographicalClusters = useMemo(() => {
    const listCopy = [...filteredListings].filter(l => l.lat && l.lng);
    const clusters: {
      id: string;
      centerLat: number;
      centerLng: number;
      listings: Listing[];
      name: string;
    }[] = [];

    const MATCH_THRESHOLD = 0.005; // ~500m radius threshold for clustering

    listCopy.forEach(listing => {
      let foundContainer = false;
      
      for (let i = 0; i < clusters.length; i++) {
        const c = clusters[i];
        const dist = Math.sqrt(
          Math.pow((listing.lat || 0) - c.centerLat, 2) + 
          Math.pow((listing.lng || 0) - c.centerLng, 2)
        );
        if (dist < MATCH_THRESHOLD) {
          c.listings.push(listing);
          // adjust mean center
          c.centerLat = c.listings.reduce((sum, item) => sum + (item.lat || 0), 0) / c.listings.length;
          c.centerLng = c.listings.reduce((sum, item) => sum + (item.lng || 0), 0) / c.listings.length;
          foundContainer = true;
          break;
        }
      }

      if (!foundContainer && listing.lat && listing.lng) {
        clusters.push({
          id: `cluster-${listing.id}`,
          centerLat: listing.lat,
          centerLng: listing.lng,
          listings: [listing],
          name: listing.location.split(',')[0]
        });
      }
    });

    return clusters;
  }, [filteredListings]);

  // Create a customized new Price Alert Subscription
  const handleAddNewAlert = (e: React.FormEvent) => {
    e.preventDefault();
    const newAlert = {
      id: `alert-${Date.now()}`,
      title: alertForm.title || `Alert matching: ${searchQuery || selectedCategory || 'Selected filters'}`,
      query: searchQuery || selectedCategory || 'Applied filters',
      maxBudget: alertForm.maxBudget,
      location: 'Iligan City Area',
      subscribedAt: new Date().toISOString().split('T')[0]
    };
    
    setPriceAlerts(prev => [newAlert, ...prev]);
    setAlertForm({ title: '', maxBudget: 6000, showModal: false });
    
    // Alert confirmation
    alert("Success! You have subscribed to real-time price drops in this range. Notifications will appear when landlords change rates.");
  };

  // Remove subscription
  const handleRemoveAlert = (id: string) => {
    setPriceAlerts(prev => prev.filter(a => a.id !== id));
  };

  // Landlord Price Drop Simulation Event!
  const triggerSimulation = () => {
    if (filteredListings.length === 0) {
      alert("No matching listings to simulate price changes. Try relaxing your filters first!");
      return;
    }
    // Pick a random listing from currently displayed
    const randomIndex = Math.floor(Math.random() * filteredListings.length);
    const chosen = filteredListings[randomIndex];
    const dropPercentage = 10; // 10% drop
    const oldPrice = chosen.price;
    const newPrice = Math.floor(chosen.price * (1 - dropPercentage / 100));

    // Show custom notification drop-down toast
    setPriceDropNotification({
      id: `drop-${Date.now()}`,
      message: `⚡ RENT REDUCTION: Landlord of "${chosen.title}" just dropped the monthly rent!`,
      oldPrice,
      newPrice,
      listingId: chosen.id
    });
  };

  // Neighborhood Guide Details selection helper
  const selectedGuide = useMemo(() => {
    return NEIGHBORHOODS_DATA.find(n => n.id === activeGuideId) || NEIGHBORHOODS_DATA[0];
  }, [activeGuideId]);

  // Neighborhood Accommodation list filtered
  const guideListings = useMemo(() => {
    const isTibanga = selectedGuide.id === 'tibanga';
    const isPoblacion = selectedGuide.id === 'poblacion';
    
    return (LISTINGS || []).filter(l => {
      if (isTibanga) return l.category === 'Near MSU-IIT' || l.location.toLowerCase().includes('iit') || l.price < 6000;
      if (isPoblacion) return l.category === 'Apartment' || l.price >= 6000;
      return l.category === 'Solo Room' || l.category === 'All Female';
    });
  }, [LISTINGS, selectedGuide]);

  const activeGuidePercentage = (listingsLength: number) => {
    return `${Math.min(100, Math.max(30, listingsLength * 17))}%`;
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 pb-24 font-sans selection:bg-[#2252D6]/20">
      <Navbar />

      {/* Hero Header Segment focused on Discovery */}
      <div className="bg-[#17294F] text-white pt-10 pb-16 relative overflow-hidden px-4 md:px-12">
        {/* Subtle geometric grid background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2 bg-[#2252D6]/30 border border-white/10 px-3 py-1 rounded-full w-fit">
              <Sparkles size={14} className="text-[#3b82f6] animate-pulse" />
              <span className="text-xs uppercase tracking-widest font-extrabold text-blue-200">Suite v2.5 Online</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-none mb-3">
              Search &amp; Discovery <span className="font-serif italic font-normal text-blue-300">hub</span>
            </h1>
            <p className="text-sm md:text-base text-blue-100 max-w-xl font-light">
              Compare properties side-by-side, map clusters across Iligan City grid, receive price alert notifications, and view handcrafted local neighborhood safety manuals.
            </p>
          </div>

          {/* Quick Simulation Trigger and Overview KPIs */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={triggerSimulation}
              className="bg-emerald-500 hover:bg-emerald-600 border border-white/10 text-white font-bold text-xs md:text-sm px-4 py-2.5 rounded-full transition-all duration-300 active:scale-95 flex items-center gap-2 shadow-[0_4px_12px_rgba(16,185,129,0.3)] cursor-pointer group"
            >
              <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-700" />
              Simulate Price Drop Event
            </button>
            <div className="bg-[#24355a] border border-white/10 p-3 rounded-2xl flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] text-blue-200 uppercase tracking-widest block font-bold">Matching Places</span>
                <span className="text-lg font-extrabold text-white leading-none">{filteredListings.length} rooms</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Push Notification Drop-Down Toast (Price drop simulator) */}
      <AnimatePresence>
        {priceDropNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4 pointer-events-auto"
          >
            <div className="bg-[#17294F] border-2 border-emerald-500 rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-white relative">
              <button 
                onClick={() => setPriceDropNotification(null)}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition"
              >
                <X size={16} />
              </button>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 border border-emerald-500/30">
                  <Bell size={24} className="animate-bounce" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#3b82f6] text-xs uppercase tracking-widest">Active Search Alert Triggered</h4>
                  <p className="text-sm font-bold text-white mt-1">{priceDropNotification.message}</p>
                  
                  <div className="flex items-center gap-3 mt-3 bg-[#1e366a] px-3.5 py-2 rounded-xl border border-white/5 w-fit">
                    <span className="text-xs text-neutral-400 line-through">₱{priceDropNotification.oldPrice.toLocaleString()} / mo</span>
                    <ChevronRight size={12} className="text-neutral-400" />
                    <span className="text-sm font-black text-emerald-400">₱{priceDropNotification.newPrice.toLocaleString()} / mo</span>
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded">Save 10%</span>
                  </div>

                  <div className="flex gap-2.5 mt-4">
                    <button
                      onClick={() => {
                        const target = LISTINGS?.find(l => l.id === priceDropNotification.listingId);
                        if (target) {
                          handleViewListing(target);
                        }
                        setPriceDropNotification(null);
                      }}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs px-4 py-2 rounded-full cursor-pointer transition-colors duration-200"
                    >
                      View Landlord Deal
                    </button>
                    <button
                      onClick={() => setPriceDropNotification(null)}
                      className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-4 py-2 rounded-full cursor-pointer transition-colors duration-200"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Tabs Horizontal Row */}
      <div className="bg-white border-b border-[#ebebeb] sticky top-[80px] z-30 px-4 md:px-12 shadow-sm">
        <div className="max-w-7xl mx-auto flex overflow-x-auto no-scrollbar gap-2 py-3.5">
          {[
            { id: 'listings', label: 'All Listings Grid', icon: Compass, count: filteredListings.length },
            { id: 'map', label: 'Interactive Clusters', icon: Layers, count: geographicalClusters.length },
            { id: 'compare', label: 'Compare Board', icon: ArrowUpDown, count: comparedIds.length },
            { id: 'alerts', label: 'Saved Price Alerts', icon: Bell, count: priceAlerts.length },
            { id: 'guides', label: 'Neighborhood Manuals', icon: BookOpen, count: NEIGHBORHOODS_DATA.length }
          ].map(tab => {
            const IconComponent = tab.icon;
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setSelectedClusterListing(null);
                }}
                className={`flex items-center gap-2 px-4.5 py-2.5 rounded-full text-sm font-black whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isTabActive 
                    ? 'bg-[#17294F] text-white shadow-md' 
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900 border border-transparent'
                }`}
              >
                <IconComponent size={16} />
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isTabActive ? 'bg-white/20 text-white font-extrabold' : 'bg-[#17294F]/10 text-[#17294F] font-extrabold'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Core Split-Screen Sandbox Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* LEFT COLUMN: Sidebar with Controls and Advanced Filters (Fixed height or sticky context) */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* SEARCH TEXT BOX BAR */}
            <div className="bg-white border border-[#ebebeb] rounded-3xl p-5 shadow-sm space-y-3.5">
              <span className="text-xs font-extrabold text-[#17294F] uppercase tracking-widest block">Text Search</span>
              <div className="flex items-center px-4 py-2.5 bg-neutral-100 rounded-2xl border border-transparent focus-within:border-[#2252D6] focus-within:bg-white transition-all">
                <Search size={16} className="text-[#a3a3a3] mr-2 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. WiFi, Aircon, Tibanga..."
                  className="w-full bg-transparent border-none outline-none text-sm text-neutral-800 placeholder:text-[#a3a3a3] p-0 focus:ring-0 font-medium"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="p-0.5 hover:bg-neutral-200 rounded-full text-[#a3a3a3] hover:text-neutral-800">
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* SIDEBAR ACCORDION: ADVANCED FILTERS */}
            <div className="bg-white border border-[#ebebeb] rounded-3xl p-5 shadow-sm space-y-6 text-left">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={16} className="text-[#17294F]" />
                  <span className="text-sm font-black text-neutral-800">Advanced Filters</span>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('ALL');
                    setPriceRange({ min: 0, max: 12000 });
                    setMinRating(0);
                    setSortBy('relevance');
                    setSelectedAmenities([]);
                  }}
                  className="text-xs text-[#2252D6] hover:underline font-bold transition"
                >
                  Reset All
                </button>
              </div>

              {/* Sorting Criteria */}
              <div>
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-2">Order By</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-2xl px-4 py-2.5 text-xs text-neutral-800 font-bold focus:outline-none focus:ring-2 focus:ring-[#2252D6]/20 transition"
                >
                  <option value="relevance">Recommended Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating: Highest First</option>
                </select>
              </div>

              {/* Price filter limits */}
              <div>
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-2">Monthly Budget Range</span>
                <div className="flex items-center gap-2.5">
                  <div className="flex-1">
                    <span className="text-[10px] text-neutral-400 block mb-1 font-bold">Min Rent (₱)</span>
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: Math.max(0, parseInt(e.target.value) || 0) }))}
                      className="w-full bg-neutral-100 border border-neutral-200 focus:border-[#2252D6]/40 rounded-xl px-2.5 py-1.5 text-xs font-bold text-neutral-800 focus:outline-none focus:ring-0"
                    />
                  </div>
                  <div className="translate-y-2 text-neutral-400 font-bold text-sm">-</div>
                  <div className="flex-1">
                    <span className="text-[10px] text-neutral-400 block mb-1 font-bold">Max Rent (₱)</span>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: Math.max(0, parseInt(e.target.value) || 0) }))}
                      className="w-full bg-neutral-100 border border-neutral-200 focus:border-[#2252D6]/40 rounded-xl px-2.5 py-1.5 text-xs font-bold text-neutral-800 focus:outline-none focus:ring-0"
                    />
                  </div>
                </div>

                <div className="mt-3.5 px-1">
                  <input
                    type="range"
                    min="0"
                    max="12000"
                    step="500"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
                    className="w-full h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#2252D6]"
                  />
                  <div className="flex justify-between text-[9px] text-neutral-400 mt-1 font-mono">
                    <span>₱0</span>
                    <span>₱6k</span>
                    <span>₱12k</span>
                  </div>
                </div>
              </div>

              {/* Categorization selections */}
              <div>
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-2">Space Category</span>
                <div className="flex flex-wrap gap-1.5">
                  {['ALL', 'Boarding House', 'Apartment', 'Solo Room', 'All Female'].map((cat) => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all duration-150 cursor-pointer ${
                          isSelected 
                            ? 'bg-[#2252D6] text-white shadow-sm' 
                            : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Multiple selection Checklist of amenities */}
              <div>
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-2.5">Amenities Requirements</span>
                <div className="space-y-2">
                  {ALL_AMENITIES_OPTIONS.map((amenity) => {
                    const isChecked = selectedAmenities.includes(amenity);
                    return (
                      <button
                        key={amenity}
                        onClick={() => handleToggleAmenity(amenity)}
                        className="w-full flex items-center justify-between p-2 rounded-xl bg-transparent hover:bg-neutral-100/70 transition text-neutral-700 group cursor-pointer text-left"
                      >
                        <span className="text-xs font-bold">{amenity}</span>
                        <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${
                          isChecked ? 'bg-[#2252D6] border-[#2252D6] text-white' : 'border-neutral-300 group-hover:border-neutral-400 bg-white'
                        }`}>
                          {isChecked && <Check size={12} strokeWidth={3} />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Minimum star ratings filter */}
              <div className="pt-2 border-t border-neutral-100">
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-2.5">Minimum User Rating</span>
                <div className="flex gap-1.5">
                  {[0, 3, 4, 5].map((stars) => {
                    const isSelected = minRating === stars;
                    return (
                      <button
                        key={stars}
                        onClick={() => setMinRating(stars)}
                        className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-extrabold transition-all duration-150 cursor-pointer ${
                          isSelected 
                            ? 'bg-[#17294F] text-white shadow-md' 
                            : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-600 border border-neutral-200'
                        }`}
                      >
                        {stars === 0 ? 'Any' : (
                          <>
                            <span>{stars}</span>
                            <Star size={10} className="fill-current text-amber-500" />
                          </>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* QUICK FORM: CREATE PRICE ALERT SUBSCRIPTION IN SIDEBAR */}
            <div className="bg-gradient-to-br from-[#17294F] to-[#2252D6] rounded-[2rem] p-6 text-white shadow-lg space-y-4 text-left">
              <div className="flex gap-2 items-center text-blue-200">
                <Bell size={18} className="animate-bounce" />
                <span className="text-xs uppercase font-extrabold tracking-widest">Subscriber Engine</span>
              </div>
              <div>
                <h3 className="text-lg font-black leading-tight">Create Saved Price Alert Notifications</h3>
                <p className="text-xs text-blue-100 mt-1 font-light">Set a budget watch on your current active search. We will instantly trigger live pop-up mocks and alerts if landlords decrease pricing.</p>
              </div>

              <form onSubmit={handleAddNewAlert} className="space-y-3">
                <div>
                  <span className="text-[10px] text-blue-200 block mb-1 uppercase tracking-wider font-extrabold">Watch Alert Title</span>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Low cost apartments Tibanga"
                    value={alertForm.title}
                    onChange={(e) => setAlertForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-blue-200/50 focus:outline-none focus:bg-white/20 transition-all focus:ring-0"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-blue-200 block mb-1 uppercase tracking-wider font-extrabold">Maximum Upper Budget Limit (₱)</span>
                  <input
                    type="number"
                    required
                    step="500"
                    placeholder="Max ₱"
                    value={alertForm.maxBudget}
                    onChange={(e) => setAlertForm(prev => ({ ...prev, maxBudget: parseInt(e.target.value) || 6000 }))}
                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-blue-200/50 focus:outline-none focus:bg-white/20 transition-all focus:ring-0"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-white text-[#17294F] hover:bg-neutral-100 font-extrabold uppercase tracking-wider text-[11px] py-3 rounded-full transition-all duration-200 active:scale-95 shadow-md text-center cursor-pointer block"
                >
                  Subscribe Watchlist
                </button>
              </form>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive Tab Results Workspace */}
          <div className="lg:col-span-3 space-y-6">

            {/* TAB CONTENT: 1. LISTINGS GRID WITH COMPARE OPT-IN */}
            {activeTab === 'listings' && (
              <div className="space-y-6 text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-[#ebebeb] p-4.5 rounded-3xl shadow-sm">
                  <div>
                    <span className="text-xs text-neutral-400 block font-bold">DISCOVERY RESULTS</span>
                    <h2 className="text-xl font-bold tracking-tight text-neutral-800">
                      Found {filteredListings.length} matching boarding rooms and studio pads
                    </h2>
                  </div>
                  {comparedIds.length > 0 && (
                    <div className="flex items-center gap-2.5 bg-[#2252D6]/10 px-3 py-1.5 rounded-2xl border border-[#2252D6]/20">
                      <span className="text-xs text-[#2252D6] font-black">{comparedIds.length} items checked to compare</span>
                      <button
                        onClick={() => setActiveTab('compare')}
                        className="bg-[#2252D6] hover:bg-[#1a41b8] text-white text-[11px] uppercase font-bold py-1 px-2.5 rounded-lg transition"
                      >
                        Compare Now
                      </button>
                    </div>
                  )}
                </div>

                {filteredListings.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredListings.map((listing) => {
                      const isCompared = comparedIds.includes(listing.id);
                      return (
                        <div
                          key={listing.id}
                          className="group bg-white border border-[#ebebeb] rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 relative flex flex-col h-full"
                          onClick={() => handleViewListing(listing)}
                        >
                          {/* Image and badges */}
                          <div className="aspect-[4/3] w-full bg-neutral-200 relative overflow-hidden shrink-0">
                            <img
                              src={listing.image}
                              alt={listing.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            
                            {/* Compare Checkbox Indicator Absolute layer */}
                            <div className="absolute top-3 left-3 z-10">
                              <button
                                onClick={(e) => handleToggleCompare(listing.id, e)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md shadow-md text-xs font-black transition-all cursor-pointer pointer-events-auto ${
                                  isCompared 
                                    ? 'bg-[#2252D6] border border-[#2252D6] text-white' 
                                    : 'bg-black/45 hover:bg-black/75 border border-white/20 text-white'
                                }`}
                                title="Check to compare side-by-side"
                              >
                                <div className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-all ${
                                  isCompared ? 'bg-white text-[#2252D6] border-white' : 'border-white bg-transparent'
                                }`}>
                                  {isCompared && <Check size={11} strokeWidth={4} />}
                                </div>
                                <span className="text-[10px] tracking-wide">Compare</span>
                              </button>
                            </div>

                            {/* Category price visual badge */}
                            <div className="absolute bottom-3 right-3 bg-[#17294F] text-white font-extrabold text-xs px-2.5 py-1 rounded-lg shadow-md border border-white/10">
                              ₱{listing.price.toLocaleString()} / mo
                            </div>
                          </div>

                          {/* Listing information bodies */}
                          <div className="p-4.5 flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#2252D6]">{listing.category}</span>
                                <div className="flex items-center gap-0.5 text-amber-500 font-extrabold text-xs">
                                  <Star size={11} className="fill-current" />
                                  <span>{listing.rating.toFixed(1)}</span>
                                </div>
                              </div>
                              <h3 className="font-extrabold text-[#17294F] text-base group-hover:text-[#2252D6] transition-colors leading-snug line-clamp-1">{listing.title}</h3>
                              <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1 leading-none">
                                <MapPin size={11} className="text-neutral-400 shrink-0" />
                                <span className="truncate">{listing.location}</span>
                              </p>
                              
                              {/* Short list of icons of amenities */}
                              <div className="flex flex-wrap gap-1 mt-3">
                                {listing.amenities?.slice(0, 3).map((amenity, idx) => (
                                  <span key={idx} className="bg-neutral-50 text-neutral-500 text-[9px] font-bold px-2 py-0.5 rounded-md border border-neutral-200">
                                    {amenity}
                                  </span>
                                ))}
                                {listing.amenities && listing.amenities.length > 3 && (
                                  <span className="text-[9px] text-[#2252D6] font-bold px-1 mt-0.5">
                                    +{listing.amenities.length - 3} more
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center justify-between mt-4.5 pt-3 border-t border-neutral-100 shrink-0">
                              <span className="text-[10px] text-neutral-400 font-bold">{listing.date || 'Available now'}</span>
                              <div className="text-xs text-[#2252D6] font-black flex items-center gap-0.5 group-hover:translate-x-1 transition-transform cursor-pointer">
                                <span>See detail</span>
                                <ChevronRight size={14} />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-white border border-[#ebebeb] rounded-3xl p-16 text-center shadow-sm">
                    <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search size={36} className="text-neutral-400" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-800">No rooms match your specific criteria</h3>
                    <p className="text-neutral-500 text-sm mt-1.5 max-w-sm mx-auto font-light">
                      Try updating your budget scope slider, reducing selected required features checklist, or clearing your text search box.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('ALL');
                        setPriceRange({ min: 0, max: 12000 });
                        setMinRating(0);
                        setSelectedAmenities([]);
                      }}
                      className="mt-6 bg-[#17294F] hover:bg-[#1e366a] text-white text-xs uppercase font-extrabold tracking-wider px-6 py-2.5 rounded-full transition shadow-md cursor-pointer"
                    >
                      Reset Filter Parameters
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: 2. INTERACTIVE GEOGRAPHICALLY CLUSTERED MARKERS MAP */}
            {activeTab === 'map' && (
              <div className="space-y-6 text-left">
                <div className="bg-white border border-[#ebebeb] p-4.5 rounded-3xl shadow-sm">
                  <h2 className="text-xl font-bold tracking-tight text-neutral-800">
                    Slick-Cluster Location Platform <span className="text-xs uppercase tracking-widest bg-blue-100 text-[#2252D6] border border-blue-200/50 px-2 py-0.5 rounded-md font-extrabold ml-2">Sandbox GPS Simulation</span>
                  </h2>
                  <p className="text-xs text-neutral-500 mt-1 font-light">
                    Grouped properties represent local density. Click clusters to scale zoom into individual properties. Hover maps markers for previews.
                  </p>
                </div>

                {/* SVG/CANVAS Interactive Clustered Map Container */}
                <div className="bg-[#1a1b1e] rounded-[2.5rem] border-4 border-[#2d2e32] h-[550px] relative overflow-hidden shadow-2xl flex">
                  
                  {/* Virtual Grid Radar lines (tech design aesthetics) */}
                  <div className="absolute inset-0 bg-[#161719] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
                  
                  {/* Map control widgets overlay */}
                  <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                    <div className="bg-[#242528]/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/10 overflow-hidden divide-y divide-white/5 flex flex-col text-white">
                      <button 
                        onClick={() => setMapZoom(prev => Math.min(16, prev + 1))}
                        className="w-10 h-10 hover:bg-white/10 transition font-black text-sm flex items-center justify-center cursor-pointer"
                      >
                        +
                      </button>
                      <button 
                        onClick={() => {
                          setMapZoom(prev => Math.max(11, prev - 1));
                          setSelectedClusterListing(null);
                        }}
                        className="w-10 h-10 hover:bg-white/10 transition font-black text-sm flex items-center justify-center cursor-pointer"
                      >
                        -
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        setMapZoom(13);
                        setMapCenter({ lat: 8.2415, lng: 124.2442 });
                        setSelectedClusterListing(null);
                        alert("Map viewport restored to Iligan City baseline center.");
                      }}
                      className="bg-[#242528]/95 hover:bg-[#2d2e32] backdrop-blur-md p-3.5 rounded-2xl text-white border border-white/10 shadow-lg cursor-pointer flex items-center justify-center"
                      title="Center Map"
                    >
                      <Layers size={14} />
                    </button>
                  </div>

                  {/* Status Indicator Bar */}
                  <div className="absolute top-4 left-4 z-20 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl px-3 py-1.5 text-[10px] text-green-400 font-mono flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-ping"></span>
                    <span>ACTIVE LOCATIONS VIEWPORT · ZOOM: L{mapZoom}</span>
                  </div>

                  {/* DYNAMIC SCALED LANDMASS & PIN CLUSTERS VIEWSPACE */}
                  <div className="flex-1 h-full relative cursor-grab active:cursor-grabbing flex items-center justify-center overflow-hidden">
                    <svg className="w-full h-full max-w-full absolute inset-0 text-white/5" viewBox="0 0 1000 700">
                      
                      {/* Stylized Simulated Peninsula/Lake shoreline path for Iligan coastline visualization */}
                      <path d="M 50,-50 C 150,200 120,400 350,550 C 500,620 700,580 850,750" fill="none" stroke="rgba(34,82,214,0.15)" strokeWidth="6" strokeLinecap="round" />
                      <path d="M 50,-50 C 150,200 120,400 350,550 C 500,620 700,580 850,750" fill="none" stroke="rgba(34,82,214,0.05)" strokeWidth="24" strokeLinecap="round" />
                      
                      {/* Geographical Sector Grid Names circles */}
                      <circle cx="350" cy="200" r="160" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.02)" strokeWidth="1" strokeDasharray="4 4" />
                      <circle cx="700" cy="450" r="120" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.02)" strokeWidth="1" strokeDasharray="4 4" />
                      
                      {/* Virtual Town labels */}
                      <text x="350" y="200" fill="rgba(255,255,255,0.15)" fontSize="11" fontWeight="bold" textAnchor="middle" letterSpacing="0.2em" transform="rotate(-15, 350, 200)">TIBANGA / UNIV BELT_01</text>
                      <text x="700" y="450" fill="rgba(255,255,255,0.15)" fontSize="11" fontWeight="bold" textAnchor="middle" letterSpacing="0.2em" transform="rotate(10, 700, 450)">POBLACION SECTOR_02</text>
                      <text x="180" y="520" fill="rgba(34,82,214,0.18)" fontSize="14" fontWeight="bold" textAnchor="middle" letterSpacing="0.3em" className="font-serif italic">Iligan Bay Coastline</text>
                    </svg>

                    {/* DYNAMIC REACTIVE CLUSTER RENDERINGS AND ALIGNED PIN LAYOUTS */}
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                      <div className="relative w-full h-full">
                        {/* Map Scale transform calculation based on simulated coordinates */}
                        {geographicalClusters.map((cluster) => {
                          // project GPS lat: 8.23 -- 8.25 and lng: 124.23 -- 124.25 into percentage widths
                          const xPct = ((cluster.centerLng - 124.23) / 0.025) * 100;
                          const yPct = (1 - (cluster.centerLat - 8.23) / 0.022) * 100;
                          
                          // Determine if we show as cluster (multiple items and zoom level not extremely zoomed in)
                          const isGrouped = cluster.listings.length > 1 && mapZoom < 15;

                          return (
                            <div
                              key={cluster.id}
                              style={{ 
                                left: `${xPct}%`, 
                                top: `${yPct}%`,
                                transform: 'translate(-50%, -50%)'
                              }}
                              className="absolute pointer-events-auto transition-all duration-300"
                            >
                              {isGrouped ? (
                                /* MULTIPLE LISTING CHIP CLUSTER */
                                <button
                                  onClick={() => {
                                    setMapZoom(15);
                                    setMapCenter({ lat: cluster.centerLat, lng: cluster.centerLng });
                                    setSelectedClusterListing(cluster.listings[0]);
                                    alert(`Zooming in to Cluster containing ${cluster.listings.length} properties inside ${cluster.name}.`);
                                  }}
                                  className="w-12 h-12 rounded-full bg-[#17294F] border-2 border-[#2252D6] text-white flex items-center justify-center text-xs font-black shadow-[0_8px_20px_rgba(34,82,214,0.45)] hover:scale-110 active:scale-90 transition-transform cursor-pointer relative group"
                                >
                                  {/* Pulsing visual halo */}
                                  <span className="absolute -inset-2 rounded-full border-2 border-[#2252D6]/30 animate-pulse pointer-events-none"></span>
                                  <span>{cluster.listings.length}</span>
                                  
                                  {/* Tooltip Hover popup of items list */}
                                  <div className="absolute top-[120%] left-1/2 -translate-x-1/2 bg-[#2d2e32] border border-white/15 px-3 py-1.5 rounded-xl hidden group-hover:block transition-all shadow-xl z-50 pointer-events-none w-fit min-w-[140px] text-center">
                                    <span className="text-[9px] text-[#2252D6] font-bold block uppercase tracking-wider">Group Density</span>
                                    <span className="text-[10px] text-white font-bold block mt-0.5 line-clamp-1">{cluster.listings.length} places in {cluster.name}</span>
                                  </div>
                                </button>
                              ) : (
                                /* INDIVIDUAL PROPERTY PIN */
                                <div className="relative group">
                                  {cluster.listings.map((singleListing) => (
                                    <button
                                      key={singleListing.id}
                                      onClick={() => setSelectedClusterListing(singleListing)}
                                      className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white border-2 hover:scale-115 active:scale-90 transition-all cursor-pointer shadow-lg ${
                                        selectedClusterListing?.id === singleListing.id 
                                          ? 'bg-[#2252D6] border-white scale-110 shadow-emerald-500/20' 
                                          : 'bg-[#17294F] border-[#2252D6]'
                                      }`}
                                    >
                                      <Pin size={14} className="fill-current text-white Rotate-45" />
                                    </button>
                                  ))}
                                  
                                  {/* Side small overlay showing custom bubble of cost */}
                                  <div className="absolute left-[110%] top-1/2 -translate-y-1/2 bg-[#17294F] text-white text-[10px] sm:text-xs font-black px-2 py-0.5 border border-white/10 rounded-md shadow-md pointer-events-none whitespace-nowrap">
                                    ₱{(cluster.listings[0].price / 1000).toFixed(1)}k
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Left overlay sidebar tray showing focused listing in clustered marker maps */}
                    <AnimatePresence>
                      {selectedClusterListing && (
                        <motion.div
                          initial={{ opacity: 0, x: -100 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          className="absolute bottom-6 left-6 right-6 md:right-auto md:w-80 bg-white/95 backdrop-blur-md p-4 rounded-3xl shadow-[0_25px_50px_rgba(0,0,0,0.5)] border border-neutral-200 text-neutral-900 pointer-events-auto text-left space-y-3 z-20"
                        >
                          <div className="flex justify-between items-start">
                            <span className="text-[10px] uppercase font-bold text-[#2252D6] tracking-wider">{selectedClusterListing.category}</span>
                            <button 
                              onClick={() => setSelectedClusterListing(null)}
                              className="p-1 hover:bg-neutral-100 rounded-full text-neutral-400 hover:text-neutral-900"
                            >
                              <X size={14} />
                            </button>
                          </div>
                          
                          <div className="flex gap-3">
                            <img 
                              src={selectedClusterListing.image} 
                              alt={selectedClusterListing.title} 
                              referrerPolicy="no-referrer"
                              className="w-16 h-16 rounded-xl object-cover"
                            />
                            <div>
                              <h4 className="font-extrabold text-sm text-[#17294F] leading-tight line-clamp-2">{selectedClusterListing.title}</h4>
                              <p className="text-[11px] text-neutral-500 mt-0.5 truncate">{selectedClusterListing.location}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs font-black text-[#2252D6]">₱{selectedClusterListing.price.toLocaleString()}</span>
                                <div className="flex items-center gap-0.5 text-amber-500 text-[10px] font-bold">
                                  <Star size={10} className="fill-current" />
                                  <span>{selectedClusterListing.rating.toFixed(1)}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2.5 pt-2 border-t border-neutral-100">
                            <button
                              onClick={() => handleViewListing(selectedClusterListing)}
                              className="flex-1 bg-[#17294F] hover:bg-[#1e366a] text-white text-[11px] uppercase tracking-wide font-extrabold py-2 rounded-xl text-center cursor-pointer transition-colors"
                            >
                              Open Details
                            </button>
                            <button
                              onClick={(e) => {
                                handleToggleCompare(selectedClusterListing.id, e);
                              }}
                              className={`px-3 py-2 rounded-xl text-[11px] font-bold transition-all ${
                                comparedIds.includes(selectedClusterListing.id)
                                  ? 'bg-emerald-100 border border-emerald-300 text-emerald-800'
                                  : 'bg-neutral-100 border border-neutral-200 text-neutral-700 hover:bg-neutral-200'
                              }`}
                            >
                              {comparedIds.includes(selectedClusterListing.id) ? 'Selected' : '+ Compare'}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: 3. COMPARE SIDE-BY-SIDE INTERACTIVE MATRIX */}
            {activeTab === 'compare' && (
              <div className="space-y-6 text-left">
                <div className="bg-white border border-[#ebebeb] p-5 rounded-3xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-neutral-800">
                      Side-By-Side Comparison Grid
                    </h2>
                    <p className="text-xs text-neutral-500 mt-1 font-light">
                      Analyze security standards, pricing intervals, proximity parameters, and ratings in visual matrices.
                    </p>
                  </div>
                  {comparedIds.length > 0 && (
                    <button
                      onClick={() => {
                        setComparedIds([]);
                      }}
                      className="text-xs bg-neutral-100 hover:bg-neutral-200 text-neutral-600 font-bold px-4 py-2.5 rounded-full transition flex items-center gap-1.5 shrink-0 cursor-pointer border border-neutral-200"
                    >
                      <Trash2 size={13} />
                      Clear Checked List
                    </button>
                  )}
                </div>

                {comparedIds.length > 0 ? (
                  <div className="bg-white border border-[#ebebeb] rounded-[2rem] overflow-hidden shadow-lg">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-neutral-50 border-b border-neutral-200">
                            <th className="p-5 text-xs uppercase text-neutral-400 font-extrabold w-1/4">Criteria Parameters</th>
                            {comparedIds.map(id => {
                              const item = LISTINGS?.find(l => l.id === id);
                              if (!item) return null;
                              return (
                                <th key={id} className="p-5 w-1/4 min-w-[200px] border-l border-neutral-200">
                                  <div className="relative">
                                    <button
                                      onClick={(e) => handleToggleCompare(id, e)}
                                      className="absolute -top-3 -right-3 p-1 rounded-full bg-neutral-100 text-neutral-500 hover:bg-red-100 hover:text-red-600 transition"
                                      title="Remove from comparison list"
                                    >
                                      <X size={14} />
                                    </button>
                                    <img
                                      src={item.image}
                                      alt={item.title}
                                      referrerPolicy="no-referrer"
                                      className="w-full h-32 rounded-2xl object-cover mb-3"
                                    />
                                    <span className="text-[10px] uppercase font-extrabold text-[#2252D6] tracking-wider block">{item.category}</span>
                                    <h4 className="font-extrabold text-[#17294F] text-sm leading-tight line-clamp-2 mt-1">{item.title}</h4>
                                  </div>
                                </th>
                              );
                            })}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 font-medium">
                          
                          {/* Price comparison */}
                          <tr>
                            <td className="p-5 text-xs text-neutral-500 uppercase tracking-wider font-extrabold bg-neutral-50/20">Monthly Rent Fee</td>
                            {comparedIds.map(id => {
                              const item = LISTINGS?.find(l => l.id === id);
                              if (!item) return null;
                              return (
                                <td key={id} className="p-5 text-sm font-black text-[#2252D6] border-l border-neutral-100 bg-neutral-50/5">
                                  ₱{item.price.toLocaleString()} / mo
                                </td>
                              );
                            })}
                          </tr>

                          {/* Ratings comparison */}
                          <tr>
                            <td className="p-5 text-xs text-neutral-500 uppercase tracking-wider font-extrabold bg-neutral-50/20">Guest Star Ratings</td>
                            {comparedIds.map(id => {
                              const item = LISTINGS?.find(l => l.id === id);
                              if (!item) return null;
                              return (
                                <td key={id} className="p-5 text-sm border-l border-neutral-100">
                                  <div className="flex items-center gap-1">
                                    <span className="font-bold text-neutral-800">{item.rating.toFixed(1)} / 5.0</span>
                                    <div className="flex text-amber-500">
                                      <Star size={12} className="fill-current" />
                                    </div>
                                    <span className="text-xs text-neutral-400">({item.reviews?.length || 5} reviews)</span>
                                  </div>
                                </td>
                              );
                            })}
                          </tr>

                          {/* Location details */}
                          <tr>
                            <td className="p-5 text-xs text-neutral-500 uppercase tracking-wider font-extrabold bg-[#fbfafe]/10">Security Guard / Amenities Check</td>
                            {comparedIds.map(id => {
                              const item = LISTINGS?.find(l => l.id === id);
                              if (!item) return null;
                              return (
                                <td key={id} className="p-5 text-xs border-l border-neutral-100">
                                  <div className="flex flex-wrap gap-1">
                                    {item.amenities?.map((am, idx) => (
                                      <span key={idx} className="bg-neutral-100 text-neutral-700 text-[9px] px-2 py-0.5 font-bold rounded-md">
                                        {am}
                                      </span>
                                    ))}
                                  </div>
                                </td>
                              );
                            })}
                          </tr>

                          {/* Host Reputation evaluation */}
                          <tr>
                            <td className="p-5 text-xs text-neutral-500 uppercase tracking-wider font-extrabold bg-neutral-50/20">Security Patrol Availability</td>
                            {comparedIds.map(id => {
                              const item = LISTINGS?.find(l => l.id === id);
                              if (!item) return null;
                              return (
                                <td key={id} className="p-5 text-xs border-l border-neutral-100">
                                  <div className="flex items-center gap-2 text-neutral-600 font-bold">
                                    <Shield size={14} className="text-emerald-500 shrink-0" />
                                    <span>{item.amenities?.includes('CCTV') ? 'CCTV Monitored' : 'Perimeter gated fencing'}</span>
                                  </div>
                                </td>
                              );
                            })}
                          </tr>

                          {/* Action Button Trigger Link */}
                          <tr className="bg-neutral-50/50">
                            <td className="p-5"></td>
                            {comparedIds.map(id => {
                              const item = LISTINGS?.find(l => l.id === id);
                              if (!item) return null;
                              return (
                                <td key={id} className="p-5 border-l border-neutral-100">
                                  <button
                                    onClick={() => handleViewListing(item)}
                                    className="w-full bg-[#17294F] hover:bg-[#1e366a] text-white text-xs uppercase tracking-wider font-extrabold py-2.5 rounded-full transition cursor-pointer"
                                  >
                                    View Pad Detailing
                                  </button>
                                </td>
                              );
                            })}
                          </tr>

                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border border-[#ebebeb] rounded-3xl p-16 text-center shadow-sm">
                    <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ArrowUpDown size={36} className="text-neutral-400" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-800">Your Comparison Clipboard is Empty</h3>
                    <p className="text-neutral-500 text-sm mt-1.5 max-w-sm mx-auto font-light">
                      Check the &quot;Compare&quot; option available on each property thumbnail to populate this side-by-side matrices table.
                    </p>
                    <button
                      onClick={() => setActiveTab('listings')}
                      className="mt-6 bg-[#2252D6] hover:bg-[#1a41b8] text-white text-xs uppercase font-extrabold tracking-wider px-6 py-2.5 rounded-full transition shadow-md cursor-pointer"
                    >
                      Browse Accommodation Pads
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: 4. SAVED PRICE ALERTS AND RECENTLY VIEWED SHELF */}
            {activeTab === 'alerts' && (
              <div className="space-y-10 text-left">
                
                {/* 1. PRICE WATCH ALERT SUBSCRIPTIONS */}
                <div className="space-y-6">
                  <div className="bg-white border border-[#ebebeb] p-4.5 rounded-3xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold tracking-tight text-neutral-800">
                        Active Price Watch Alerts
                      </h2>
                      <p className="text-xs text-neutral-500 mt-1 font-light">
                        Landlords can decrease rates to match budget parameters. Check your watchlists here.
                      </p>
                    </div>
                    <button
                      onClick={triggerSimulation}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs px-4 py-2.5 rounded-full transition flex items-center gap-1.5 shadow-md shrink-0 cursor-pointer"
                    >
                      <RefreshCw size={12} />
                      Simulate Price drop event!
                    </button>
                  </div>

                  {priceAlerts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {priceAlerts.map(alert => (
                        <div
                          key={alert.id}
                          className="bg-white border border-[#ebebeb] rounded-2xl p-5 shadow-sm hover:shadow-md transition relative text-left"
                        >
                          <button
                            onClick={() => handleRemoveAlert(alert.id)}
                            className="absolute top-4 right-4 text-neutral-400 hover:text-red-500 p-1 rounded-full transition"
                            title="Unsubscribe Watch Alert"
                          >
                            <Trash2 size={14} />
                          </button>
                          
                          <div className="flex gap-3 items-center">
                            <div className="w-10 h-10 rounded-xl bg-[#2252D6]/10 text-[#2252D6] flex items-center justify-center">
                              <Bell size={18} />
                            </div>
                            <div>
                              <h4 className="font-extrabold text-neutral-800 text-sm line-clamp-1">{alert.title}</h4>
                              <p className="text-[11px] text-neutral-400 font-medium">Subscribed: {alert.subscribedAt} · Iligan City</p>
                            </div>
                          </div>

                          <div className="mt-4 pt-3.5 border-t border-neutral-100 flex items-center justify-between">
                            <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-extrabold">Watcher Threshold</div>
                            <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">₱{alert.maxBudget.toLocaleString()} Upper Rent limit</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white border border-[#ebebeb] rounded-3xl p-10 text-center">
                      <p className="text-neutral-500 text-xs font-light">No saved price alerts found inside cache.</p>
                    </div>
                  )}
                </div>

                {/* 2. RECENTLY VIEWED SHELF */}
                <div className="space-y-6">
                  <div className="bg-white border border-[#ebebeb] p-4.5 rounded-3xl shadow-sm text-left">
                    <h2 className="text-xl font-bold tracking-tight text-neutral-800">
                      Recently Viewed Listing History
                    </h2>
                    <p className="text-xs text-neutral-500 mt-1 font-light">
                      Your historic local cached navigation trail. Easily recall accommodations you recently analyzed.
                    </p>
                  </div>

                  {recentlyViewed.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {recentlyViewed.map((item) => (
                        <div
                          key={`recent-${item.id}`}
                          onClick={() => handleViewListing(item)}
                          className="bg-white border border-[#ebebeb] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer text-left"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-32 object-cover shrink-0"
                          />
                          <div className="p-3.5 space-y-1.5">
                            <span className="text-[9px] uppercase font-bold tracking-wider text-[#2252D6]-500">{item.category}</span>
                            <h4 className="font-extrabold text-[#17294F] text-sm truncate leading-snug">{item.title}</h4>
                            <div className="flex justify-between items-center pt-2 border-t border-neutral-50">
                              <span className="text-xs font-black text-neutral-800">₱{item.price.toLocaleString()}</span>
                              <div className="flex items-center gap-0.5 text-amber-500 text-[10px] font-bold">
                                <Star size={10} className="fill-current" />
                                <span>{item.rating.toFixed(1)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white border border-[#ebebeb] rounded-3xl p-16 text-center">
                      <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-400">
                        <Eye size={24} />
                      </div>
                      <p className="text-neutral-500 text-xs font-light">No recently viewed listings on this browser session yet.</p>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* TAB CONTENT: 5. HANDCRAFTED LOCAL NEIGHBORHOOD SAFETY MANUALS */}
            {activeTab === 'guides' && (
              <div className="space-y-6 text-left">
                <div className="bg-white border border-[#ebebeb] p-5 rounded-3xl shadow-sm text-left">
                  <h2 className="text-xl font-bold tracking-tight text-neutral-800">
                    Handcrafted Neighborhood Safety Manuals
                  </h2>
                  <p className="text-xs text-neutral-500 mt-1 font-light">
                    Analyzed by local students and security teams. Study safety levels, transit connectivity, and top local boarding options.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Selectors column */}
                  <div className="lg:col-span-1 space-y-2">
                    {NEIGHBORHOODS_DATA.map(g => {
                      const isActive = g.id === activeGuideId;
                      return (
                        <button
                          key={g.id}
                          onClick={() => setActiveGuideId(g.id)}
                          className={`w-full text-left p-4 rounded-3xl transition-all border cursor-pointer ${
                            isActive 
                              ? 'bg-[#17294F] border-[#17294F] text-white shadow-md' 
                              : 'bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-700'
                          }`}
                        >
                          <h4 className="font-extrabold text-sm leading-tight">{g.name}</h4>
                          <span className={`text-[10px] block mt-1 font-light ${isActive ? 'text-blue-200' : 'text-neutral-400'}`}>
                            {g.tagline}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Informational displays body column */}
                  <div className="lg:col-span-2 bg-white border border-[#ebebeb] rounded-3xl overflow-hidden shadow-md flex flex-col">
                    <img 
                      src={selectedGuide.image} 
                      alt={selectedGuide.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-48 object-cover shrink-0"
                    />
                    <div className="p-6 space-y-6 flex-1">
                      
                      <div className="space-y-2">
                        <h3 className="text-2xl font-extrabold text-[#17294F] leading-none">{selectedGuide.name}</h3>
                        <p className="text-sm font-bold text-[#2252D6] italic">&ldquo;{selectedGuide.tagline}&rdquo;</p>
                        <p className="text-xs text-neutral-600 leading-relaxed font-light mt-2">{selectedGuide.description}</p>
                      </div>

                      {/* Vital Statistics indicators */}
                      <div className="grid grid-cols-3 gap-4.5 bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
                        <div className="text-center">
                          <span className="text-[10px] uppercase text-neutral-400 tracking-wider font-extrabold block">Safety Level</span>
                          <span className="text-[#17294F] font-black text-lg block mt-1">{selectedGuide.safetyScore} / 10</span>
                          <span className="text-[9px] text-[#2252D6] uppercase font-bold tracking-widest block font-mono mt-0.5">High Protection</span>
                        </div>
                        <div className="text-center border-x border-neutral-200">
                          <span className="text-[10px] uppercase text-neutral-400 tracking-wider font-extrabold block">Transit Access</span>
                          <span className="text-[#17294F] font-black text-lg block mt-1">{selectedGuide.transitScore} / 10</span>
                          <span className="text-[9px] text-emerald-600 uppercase font-bold tracking-widest block font-mono mt-0.5">Jeepney Central</span>
                        </div>
                        <div className="text-center">
                          <span className="text-[10px] uppercase text-neutral-400 tracking-wider font-extrabold block">Cost Level</span>
                          <span className="text-amber-600 font-extrabold text-lg block mt-1">{selectedGuide.costLevel}</span>
                          <span className="text-[9px] text-neutral-500 uppercase font-bold tracking-widest block font-mono mt-0.5">Average Rent</span>
                        </div>
                      </div>

                      {/* Landmarks lists */}
                      <div className="space-y-2">
                        <span className="text-xs uppercase font-extrabold tracking-widest text-[#17294F]">Vital Campus Landmarks</span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedGuide.landmarks.map((landmark, idx) => (
                            <span key={idx} className="bg-neutral-100 text-neutral-700 text-xs px-3 py-1 rounded-xl border border-neutral-200 font-semibold">
                              📍 {landmark}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Best property accommodation listings in guide area */}
                      <div className="space-y-3 pt-4 border-t border-neutral-100">
                        <span className="text-xs uppercase font-extrabold tracking-widest text-[#17294F] block">Properties matching this manual</span>
                        {guideListings.length > 0 ? (
                          <div className="space-y-2.5">
                            {guideListings.slice(0, 3).map(pad => (
                              <div
                                key={pad.id}
                                onClick={() => handleViewListing(pad)}
                                className="flex items-center justify-between p-3.5 rounded-2xl bg-neutral-50/50 hover:bg-neutral-100 cursor-pointer border border-neutral-200 transition"
                              >
                                <div className="flex items-center gap-3.5">
                                  <img 
                                    src={pad.image} 
                                    alt={pad.title} 
                                    referrerPolicy="no-referrer"
                                    className="w-10 h-10 rounded-lg object-cover"
                                  />
                                  <div>
                                    <h5 className="font-extrabold text-sm text-[#17294F] leading-tight">{pad.title}</h5>
                                    <p className="text-[10px] text-neutral-500 mt-0.5">₱{pad.price.toLocaleString()} / mo · Rating {pad.rating.toFixed(1)} ⭐</p>
                                  </div>
                                </div>
                                <ChevronRight size={16} className="text-neutral-400" />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-neutral-500 text-xs italic font-light">No listings currently added for this neighborhood zone.</p>
                        )}
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      <BottomNav />
    </div>
  );
}

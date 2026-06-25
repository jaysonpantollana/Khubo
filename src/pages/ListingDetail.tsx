// @context: Listing detail page — full property view with booking
// @purpose: Displays gallery, details, amenities, reviews, host profile, map, and booking modal
// @behavior: useListing fetches by ID; gallery grid with photo overlay; booking modal for date selection; inline calendar
// @dependencies: useListing, useToast, ListingModal, PhotoCarouselOverlay, MapTilerView, ReviewBreakdown, HostProfile, lucide-react, motion

import { useListing } from '../hooks/useListing';
import { useToast } from '../components/ToastProvider';
import { X, Star, MapPin, ChevronLeft, ChevronRight, ArrowLeft, Coffee, Utensils, Wifi, Tv, ArrowDownUp, Briefcase, Car, Fence, Refrigerator, Microwave, Cctv, Navigation, Maximize, Heart, BadgeCheck, Repeat2, FileText, Download, Clock, Users, Ban, Moon, VolumeX, Trash2, Instagram, Facebook, Twitter, Phone, Mail } from 'lucide-react';
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { ListingModal } from '../components/ListingModal';
import { PhotoCarouselOverlay } from '../components/PhotoCarouselOverlay';
import MapTilerView from '../components/MapTilerView';
import Footer from '../components/Footer';
import HostProfile from '../components/HostProfile';
import ReviewBreakdown from '../components/ReviewBreakdown';
import { format } from 'date-fns';
import { AuthModal } from '../components/AuthModal';
import ListingDetailSkeleton from '../components/ListingDetailSkeleton';

export default function ListingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { listing, loading } = useListing(id);
  const { showToast } = useToast();

  useEffect(() => {
    if (listing) {
      document.title = `${listing.title} | Khubo`;
    }
  }, [listing]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPhotoGalleryOpen, setIsPhotoGalleryOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [initialGalleryIndex, setInitialGalleryIndex] = useState(0);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [showAllRules, setShowAllRules] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Simulated auth state
  const [selectedReview, setSelectedReview] = useState<{userName: string; userImage: string; comment: string; date: string} | null>(null);
  const [showAllReviewsMobile, setShowAllReviewsMobile] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return <ListingDetailSkeleton />;
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
           <h1 className="text-2xl font-bold">Listing not found</h1>
           <button 
             onClick={() => navigate('/')}
             className="mt-4 text-[#17294F] font-semibold underline"
           >
             Go back home
           </button>
        </div>
      </div>
    );
  }

  const fallbackImages = [
    'https://images.unsplash.com/photo-1555819485-99aaa4aee26b?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800'
  ];

  const actualImages = listing.gallery?.length > 0 ? listing.gallery : [listing.image];
  const images = actualImages.length < 5 
    ? [...actualImages, ...fallbackImages.slice(0, 5 - actualImages.length)] 
    : actualImages;

  const openGallery = (index: number = 0) => {
    setInitialGalleryIndex(index);
    setIsPhotoGalleryOpen(true);
  };

  const defaultHost = {
    name: 'Khubo Resident',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
    reviews: 12,
    rating: 4.95,
    hostingDuration: '3 months',
    work: 'Property Management',
    location: 'Iligan City, Philippines',
    tenantCount: 15
  };
  const displayHost = listing.host || defaultHost;

  return (
    <div className="min-h-screen bg-neutral-50 md:bg-white pb-32 text-neutral-900">
      {/* Desktop Header */}
      <div className="hidden md:block sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-[2520px] mx-auto xl:px-12 md:px-12 sm:px-4 px-4 h-16 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover:bg-neutral-100 p-2 pr-4 -ml-2 rounded-full transition text-neutral-900 cursor-pointer pointer-events-auto"
          >
            <ArrowLeft size={24} />
            <span className="font-semibold text-sm hidden sm:block">Back</span>
          </button>
          <div className="flex items-center gap-4">
          </div>
        </div>
      </div>

      {/* Mobile Floating Buttons */}
      <div className="md:hidden fixed top-6 left-6 right-6 z-50 flex justify-between pointer-events-none">
        <button 
          onClick={() => navigate('/')}
          className="p-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg pointer-events-auto active:scale-90 transition-transform cursor-pointer"
        >
          <ArrowLeft size={24} className="text-neutral-900" />
        </button>
      </div>

      {/* Mobile Header Image */}
      <div className="md:hidden relative h-[55vh] w-full bg-neutral-100">
        <div 
          className="w-full h-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
          onScroll={(e) => {
            const scrollLeft = e.currentTarget.scrollLeft;
            const width = e.currentTarget.clientWidth;
            const newIndex = Math.round(scrollLeft / width);
            if (newIndex !== currentIndex) {
              setCurrentIndex(newIndex);
            }
          }}
        >
          {images.map((img, idx) => (
            <div key={idx} className="w-full h-full shrink-0 snap-center relative">
              <img
                src={img}
                className="w-full h-full object-cover cursor-zoom-in"
                alt={`${listing.title} - ${idx + 1}`}
                referrerPolicy="no-referrer"
                onClick={() => openGallery(idx)}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10 pointer-events-none" />
            </div>
          ))}
        </div>
        
        {/* Mobile Image Indicator */}
        <div className="absolute bottom-14 right-6 z-20 pointer-events-none">
          <div className="bg-black/70 backdrop-blur-md text-white px-3 py-1 rounded-md text-[10px] font-black tracking-widest uppercase shadow-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </div>

      <main className={cn(
        "max-w-[2520px] mx-auto xl:px-12 md:px-12 sm:px-4 px-0 pb-24 md:pb-12",
        "relative md:static mt-0"
      )}>
        <div className="px-4 sm:px-0">
        
        {/* Desktop Gallery Grid */}
        <div className="hidden md:block relative group mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-sm">
            {/* Main Big Image */}
            <div 
              onClick={() => openGallery(0)}
              className="md:col-span-2 md:row-span-2 relative overflow-hidden bg-neutral-100 cursor-zoom-in"
            >
              <img
                src={images[0]}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                alt={`${listing.title} - main`}
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Smaller Images */}
            {images.slice(1, 5).map((img, idx) => (
              <div 
                key={idx} 
                onClick={() => openGallery(idx + 1)}
                className="hidden md:block relative overflow-hidden bg-neutral-100 cursor-zoom-in group-hover:first:opacity-100"
              >
                <img
                  src={img}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  alt={`${listing.title} - gallery ${idx + 1}`}
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>

          <button 
             onClick={() => openGallery(0)}
             className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm border border-neutral-300 px-4 py-1.5 rounded-lg text-sm font-medium shadow-sm transition hover:bg-white hover:border-neutral-400 active:scale-95"
          >
            Show all photos
          </button>
        </div>

        {/* Desktop Title Bar - Now below images */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2 pt-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-neutral-900 tracking-tight leading-tight">{listing.title}</h1>
          <div className="hidden md:flex items-center shrink-0">
            <button 
              onClick={() => {
                setIsSaved(!isSaved);
                if (!isSaved) showToast('Listing saved to your wishlist!');
              }}
              className="flex items-center gap-2 hover:bg-neutral-100 px-4 py-2 rounded-xl transition-colors font-semibold underline decoration-transparent hover:decoration-neutral-900 underline-offset-4"
            >
              <Heart 
                size={20} 
                className={cn(isSaved ? "fill-[#FF385C] text-[#FF385C]" : "text-neutral-900")} 
              />
              <span className="text-base">{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 pb-32">
          {/* Main Info */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center pb-8 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-medium text-neutral-500 mb-0 px-0.5">Entire home in {listing.location}</h2>
              </div>
            </div>

            <div className="py-10 border-b border-gray-100">
              <h3 className="text-2xl font-semibold text-neutral-900 mb-6">About this place</h3>
              <p className="text-neutral-700 leading-relaxed text-lg whitespace-pre-wrap">
                {listing.description}
              </p>
            </div>

            <div className="py-10 border-b border-gray-100">
              <div className="flex items-center gap-2 mb-5">
                <Users size={18} className="text-neutral-600" />
                <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider">Tenants</h3>
              </div>
              <div className="flex items-center">
                {[
                  'https://api.dicebear.com/7.x/avataaars/svg?seed=MariaSantos&backgroundColor=b6e3f4',
                  'https://api.dicebear.com/7.x/avataaars/svg?seed=JuanDelaCruz&backgroundColor=c0aede',
                  'https://api.dicebear.com/7.x/avataaars/svg?seed=AnaReyes&backgroundColor=ffd5dc',
                  'https://api.dicebear.com/7.x/avataaars/svg?seed=CarlosGarcia&backgroundColor=d1d4f9',
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Tenant ${i + 1}`}
                    className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm"
                    style={{ marginLeft: i > 0 ? '-10px' : '0', zIndex: 4 - i }}
                  />
                ))}
                <span
                  className="w-11 h-11 rounded-full bg-[#4E4F50] text-white text-xs font-bold flex items-center justify-center border-2 border-white shadow-sm"
                  style={{ marginLeft: '-10px', zIndex: 0 }}
                >
                  +{(listing.host?.tenantCount || 12) - 4 > 0 ? (listing.host?.tenantCount || 12) - 4 : 8}
                </span>
              </div>
            </div>

            <div className="py-12 border-b border-gray-100">
              <h3 className="text-2xl font-semibold text-neutral-900 mb-8">What this place offers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#17294F] flex items-center justify-center shrink-0 shadow-md">
                    <Utensils size={20} strokeWidth={2} className="text-white" />
                  </div>
                  <span className="text-[16px] text-neutral-800 font-medium">Kitchen</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#17294F] flex items-center justify-center shrink-0 shadow-md">
                    <Wifi size={20} strokeWidth={2} className="text-white" />
                  </div>
                  <span className="text-[16px] text-neutral-800 font-medium">Wifi</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#17294F] flex items-center justify-center shrink-0 shadow-md">
                    <Tv size={20} strokeWidth={2} className="text-white" />
                  </div>
                  <span className="text-[16px] text-neutral-800 font-medium">TV</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#17294F] flex items-center justify-center shrink-0 shadow-md">
                    <ArrowDownUp size={20} strokeWidth={2} className="text-white" />
                  </div>
                  <span className="text-[16px] text-neutral-800 font-medium">Elevator</span>
                </div>
                <div className={cn("items-center gap-4", showAllAmenities ? "flex" : "hidden")}>
                  <div className="w-11 h-11 rounded-full bg-[#17294F] flex items-center justify-center shrink-0 shadow-md">
                    <Fence size={20} strokeWidth={2} className="text-white" />
                  </div>
                  <span className="text-[16px] text-neutral-800 font-medium">Private patio or balcony</span>
                </div>
                <div className={cn("items-center gap-4", showAllAmenities ? "flex" : "hidden")}>
                  <div className="w-11 h-11 rounded-full bg-[#17294F] flex items-center justify-center shrink-0 shadow-md">
                    <Briefcase size={20} strokeWidth={2} className="text-white" />
                  </div>
                  <span className="text-[16px] text-neutral-800 font-medium">Luggage dropoff allowed</span>
                </div>
                <div className={cn("items-center gap-4", showAllAmenities ? "flex" : "hidden")}>
                  <div className="w-11 h-11 rounded-full bg-[#17294F] flex items-center justify-center shrink-0 shadow-md">
                    <Refrigerator size={20} strokeWidth={2} className="text-white" />
                  </div>
                  <span className="text-[16px] text-neutral-800 font-medium">Refrigerator</span>
                </div>
                <div className={cn("items-center gap-4", showAllAmenities ? "flex" : "hidden")}>
                  <div className="w-11 h-11 rounded-full bg-[#17294F] flex items-center justify-center shrink-0 shadow-md">
                    <Microwave size={20} strokeWidth={2} className="text-white" />
                  </div>
                  <span className="text-[16px] text-neutral-800 font-medium">Microwave</span>
                </div>
                <div className={cn("items-center gap-4", showAllAmenities ? "flex" : "hidden")}>
                  <div className="w-11 h-11 rounded-full bg-[#17294F] flex items-center justify-center shrink-0 shadow-md">
                    <Car size={20} strokeWidth={2} className="text-white" />
                  </div>
                  <span className="text-[16px] text-neutral-800 font-medium">Paid parking off premises</span>
                </div>
                <div className={cn("items-center gap-4", showAllAmenities ? "flex" : "hidden")}>
                  <div className="w-11 h-11 rounded-full bg-[#17294F] flex items-center justify-center shrink-0 shadow-md">
                    <Cctv size={20} strokeWidth={2} className="text-white" />
                  </div>
                  <span className="text-[16px] text-neutral-800 font-medium">Exterior security cameras on property</span>
                </div>
              </div>
              <button 
                onClick={() => setShowAllAmenities(!showAllAmenities)}
                className="px-6 py-3 border-2 border-[#17294F] text-[#17294F] rounded-xl font-bold hover:bg-[#17294F]/5 transition active:scale-95 inline-block"
              >
                {showAllAmenities ? 'Show less' : 'Show all'}
              </button>
            </div>

            <div className="py-12 border-b border-gray-100">
              <h3 className="text-2xl font-semibold text-neutral-900 mb-6">House Rules</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mb-6">
                <div className="flex items-center gap-4">
                  <Clock size={24} className="text-[#17294F] shrink-0" />
                  <span className="text-[16px] text-neutral-800">Curfew at 10:00 PM</span>
                </div>
                <div className="flex items-center gap-4">
                  <Users size={24} className="text-[#17294F] shrink-0" />
                  <span className="text-[16px] text-neutral-800">No visitors allowed after 9:00 PM</span>
                </div>
                <div className="flex items-center gap-4">
                  <Ban size={24} className="text-[#17294F] shrink-0" />
                  <span className="text-[16px] text-neutral-800">No smoking indoors</span>
                </div>
                <div className="flex items-center gap-4">
                  <Moon size={24} className="text-[#17294F] shrink-0" />
                  <span className="text-[16px] text-neutral-800">Quiet hours from 10:00 PM - 7:00 AM</span>
                </div>
                
                {showAllRules && (
                  <>
                    <div className="flex items-center gap-4">
                      <Coffee size={24} className="text-[#17294F] shrink-0" />
                      <span className="text-[16px] text-neutral-800">Clean up after cooking in shared kitchen</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <VolumeX size={24} className="text-[#17294F] shrink-0" />
                      <span className="text-[16px] text-neutral-800">No loud music</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Trash2 size={24} className="text-[#17294F] shrink-0" />
                      <span className="text-[16px] text-neutral-800">Dispose garbage properly in designated bins</span>
                    </div>
                  </>
                )}
              </div>
              <button 
                onClick={() => setShowAllRules(!showAllRules)}
                className="px-6 py-3 border-2 border-[#17294F] text-[#17294F] rounded-xl font-bold hover:bg-[#17294F]/5 transition active:scale-95 inline-block"
              >
                {showAllRules ? 'Show less' : 'Show more rules'}
              </button>
            </div>

            <div className="py-12 border-b border-gray-100">
              <h3 className="text-2xl font-semibold text-neutral-900 mb-6">Pre-contractual Document</h3>
              <p className="text-neutral-600 mb-6 leading-relaxed">
                Review the terms and conditions before you proceed with booking. This document outlines the house rules, payment schedules, and other important agreements.
              </p>

              <div className="flex items-center justify-between p-5 border border-neutral-200 rounded-2xl bg-neutral-50 hover:bg-neutral-100 transition-colors cursor-pointer" onClick={() => window.open('#', '_blank')}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-neutral-100 shrink-0">
                    <FileText size={24} className="text-[#17294F]" />
                  </div>
                  <div>
                    <h4 className="text-[16px] font-semibold text-neutral-900">Standard Lease Agreement</h4>
                    <p className="text-[13px] text-neutral-500 mt-0.5">PDF • 2.4 MB</p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-[#17294F] hover:bg-[#17294F] hover:text-white transition-colors border border-neutral-200">
                  <Download size={18} />
                </div>
              </div>
            </div>

            <div className="py-10">
               <div className="flex items-center gap-3 mb-8">
                  <Star size={24} className="fill-amber-400 text-amber-400" />
                  <h3 className="text-2xl font-semibold text-neutral-900">{listing.rating.toFixed(2)} · {listing.reviews.length} reviews</h3>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {listing.reviews.slice(0, showAllReviewsMobile ? undefined : 4).map((rev, idx) => (
                    <div key={idx} className="bg-white border border-neutral-200 rounded-3xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md hover:bg-neutral-50 transition-all cursor-pointer" onClick={() => setSelectedReview(rev)}>
                       <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                             <img src={rev.userImage} className="w-[46px] h-[46px] rounded-full object-cover bg-neutral-100 ring-2 ring-white shadow-sm" alt={rev.userName} />
                             <div className="flex flex-col">
                                <div className="flex items-center gap-1.5">
                                   <span className="font-bold text-neutral-900 text-[15px] leading-tight">{rev.userName}</span>
                                   <BadgeCheck size={16} className="text-[#2252D6]" />
                                </div>
                                <span className="text-neutral-500 text-[13px] font-medium leading-tight mt-0.5">@{rev.userName.toLowerCase().replace(/\s+/g, '_')}</span>
                             </div>
                          </div>
                          <div className="flex items-center gap-1 text-neutral-400">
                          </div>
                       </div>
                       
                       <p className="text-neutral-800 leading-relaxed text-[15px] pt-1">
                          {rev.comment}
                       </p>

                       <div className="flex items-center justify-between mt-auto pt-4 text-neutral-500">
                          <div className="text-[13px] font-medium">
                             {rev.date}
                          </div>
                          <div className="flex items-center gap-5 text-neutral-400">
                             <button className="flex items-center gap-1.5 hover:text-[#2252D6] transition-colors group cursor-pointer pointer-events-auto">
                                <Heart size={16} className="group-hover:fill-current transition-colors" />
                                <span className="text-xs font-semibold">{(idx * 7 + 12) % 40 + 10}</span>
                             </button>
                             <button className="flex items-center gap-1.5 hover:text-green-500 transition-colors cursor-pointer pointer-events-auto">
                                <Repeat2 size={16} />
                                <span className="text-xs font-semibold">{(idx * 3 + 4) % 10 + 1}</span>
                             </button>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>

               {listing.reviews.length > 4 && (
                 <div className="mt-8 flex">
                    <button 
                       onClick={() => setShowAllReviewsMobile(!showAllReviewsMobile)}
                       className="px-6 py-3 border-2 border-[#17294F] text-[#17294F] rounded-xl font-bold hover:bg-[#17294F]/5 transition active:scale-95 flex items-center justify-center"
                    >
                       {showAllReviewsMobile ? 'Show less' : `Show all ${listing.reviews.length} reviews`}
                    </button>
                 </div>
               )}
            </div>

            <div className="py-12 border-t border-gray-100 flex flex-col gap-8 mt-10">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-full bg-[#17294F] flex items-center justify-center shrink-0 shadow-lg">
                  <MapPin size={28} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900">{listing.location}</h3>
                  <p className="text-neutral-500 max-w-lg mt-1">8.2280° N, 124.2452° E</p>
                </div>
              </div>

              {/* Map View */}
              <div 
                className="w-full h-[540px] relative group cursor-pointer"
                onClick={() => setIsMapModalOpen(true)}
              >
                <div className="absolute inset-0 z-20 group-hover:bg-black/5 transition-colors rounded-3xl" />
                <MapTilerView
                  lat={listing.lat || 8.2280}
                  lng={listing.lng || 124.2452}
                  title={listing.title}
                />
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                  <div className="bg-[#17294F] text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl border border-white/20 backdrop-blur-md">
                    <Maximize size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Click to Expand</span>
                  </div>
                </div>
              </div>
            </div>

            <HostProfile 
              name={displayHost.name}
              image={displayHost.image}
              reviews={displayHost.reviews}
              rating={displayHost.rating}
              hostingDuration={displayHost.hostingDuration}
              work={displayHost.work}
              location={displayHost.location}
              tenantCount={displayHost.tenantCount || defaultHost.tenantCount}
              onMessageClick={() => {
                if (!isAuthenticated) {
                  setIsAuthModalOpen(true);
                } else {
                  showToast('Message sent to host successfully!');
                }
              }}
            />
            <ReviewBreakdown 
              rating={listing.rating}
              totalReviews={listing.reviews.length}
              breakdown={{
                cleanliness: 5.0,
                accuracy: 5.0,
                checkIn: 5.0,
                communication: 5.0,
                location: 5.0,
                value: 4.9
              }}
            />
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-[100px] flex flex-col gap-4 max-h-[calc(100vh-120px)]">

               <div className="border border-gray-200 rounded-[2.5rem] py-8 px-8 shadow-2xl flex flex-col gap-5 bg-white overflow-y-auto min-h-0">
                 <div className="flex justify-between items-center bg-neutral-50 px-5 py-4 rounded-[2rem] border border-neutral-100 flex-shrink-0">
                <div className="flex items-baseline gap-1">
                   <span className="text-2xl font-black text-[#17294F]">₱4,700</span>
                   <span className="text-neutral-500 text-[11px] font-bold uppercase tracking-tight">/month</span>
                </div>
                <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-full">
                   <Star size={18} className="fill-amber-400 text-amber-400" />
                   <span className="text-base font-black text-neutral-900">{listing.rating.toFixed(2)}</span>
                </div>
              </div>

              {/* Landlord Profile */}
              <div className="bg-white rounded-[1.5rem] p-5 shadow-[0_4px_30px_rgba(0,0,0,0.04)] border border-neutral-100">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={listing.host?.image || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Layla88'}
                    alt={listing.host?.name || 'Landlord'}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-neutral-100"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-[#17294F] flex items-center gap-1">
                      {listing.host?.name || 'Layla M. Santos'}
                      <BadgeCheck size={14} className="text-[#2252D6]" />
                    </h3>
                    <p className="text-[10px] text-neutral-500 font-medium">Landlord</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-1 mb-3 py-2 border-y border-neutral-100">
                  <div className="text-center">
                    <div className="font-bold text-xs text-[#17294F] flex items-center justify-center gap-0.5">
                      {listing.host?.rating || 5.0} <Star size={8} className="fill-[#17294F] text-[#17294F]" />
                    </div>
                    <span className="text-[7px] font-semibold text-neutral-400 uppercase tracking-wider">Rating</span>
                  </div>
                  <div className="text-center border-x border-neutral-100">
                    <div className="font-bold text-xs text-[#17294F]">{listing.host?.reviews || 35}</div>
                    <span className="text-[7px] font-semibold text-neutral-400 uppercase tracking-wider">Reviews</span>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-xs text-[#17294F]">{listing.host?.tenantCount || 12}</div>
                    <span className="text-[7px] font-semibold text-neutral-400 uppercase tracking-wider">Tenants</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-[8px] font-bold text-neutral-500 uppercase tracking-wider mb-2">Contact</p>
                  <div className="flex gap-1.5">
                    <a href="tel:+639123456789" className="flex items-center gap-1.5 px-2.5 py-1.5 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition">
                      <Phone size={10} className="text-[#17294F]" />
                      <span className="text-[9px] font-bold text-[#17294F]">Phone</span>
                    </a>
                    <a href="mailto:layla@khubo.com" className="flex items-center gap-1.5 px-2.5 py-1.5 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition">
                      <Mail size={10} className="text-[#17294F]" />
                      <span className="text-[9px] font-bold text-[#17294F]">Email</span>
                    </a>
                  </div>
                </div>

                <div>
                  <p className="text-[8px] font-bold text-neutral-500 uppercase tracking-wider mb-2">Social Media</p>
                  <div className="flex gap-1.5">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition">
                      <Instagram size={14} />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 bg-[#1877F2] text-white rounded-lg hover:opacity-90 transition">
                      <Facebook size={14} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 bg-black text-white rounded-lg hover:opacity-90 transition">
                      <Twitter size={14} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-auto">
                <button 
                  onClick={() => {
                    if (startDate) {
                      // Reserve logic
                    } else {
                      setIsModalOpen(true);
                    }
                  }}
                  className="w-full py-3.5 rounded-xl font-black text-[12px] uppercase tracking-widest transition-all active:scale-95 shadow-lg bg-[#17294F] text-white hover:shadow-xl hover:bg-[#1e3466]"
                >
            {startDate ? 'Reserve Now' : 'Contact Owner'}
                </button>

                <div className="text-center text-[9px] font-bold text-neutral-400 uppercase tracking-tight">
                  No charges yet
                </div>

                {startDate && (
                  <div className="flex flex-col gap-2 pt-4 border-t border-neutral-100">
                     <div className="flex justify-between items-center text-neutral-600">
                        <span className="text-[10px] font-bold uppercase tracking-tight">Monthly Rent</span>
                        <span className="font-black text-neutral-900 text-[10px]">₱4,700</span>
                     </div>
                     <div className="flex justify-between items-center text-neutral-600">
                        <span className="text-[10px] font-bold uppercase tracking-tight">Cleaning fee</span>
                        <span className="font-black text-neutral-900 text-[10px]">₱150</span>
                     </div>
                     <div className="flex justify-between items-center text-neutral-600">
                        <span className="text-[10px] font-bold uppercase tracking-tight">Service fee</span>
                        <span className="font-black text-neutral-900 text-[10px]">₱100</span>
                     </div>
                     <div className="pt-3 mt-1 border-t border-neutral-200 flex justify-between items-center text-[#17294F]">
                        <span className="text-[10px] font-black uppercase tracking-widest">Grand Total</span>
                        <span className="text-xl font-black">₱4,950</span>
                     </div>
                  </div>
                )}
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </main>

      {/* Persistent Mobile Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 px-4 py-3 z-[150] shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex gap-3 max-w-md mx-auto">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex-1 py-3.5 rounded-xl font-black text-[12px] uppercase tracking-widest bg-neutral-100 text-[#17294F] transition-all active:scale-95 border border-neutral-200"
          >
            {startDate ? format(startDate, 'MMM d') : 'Set Date'}
          </button>
          <button 
            onClick={() => {
              if (startDate) {
                // Reserve logic
              } else {
                setIsModalOpen(true);
              }
            }}
            className="flex-1 py-3.5 rounded-xl font-black text-[12px] uppercase tracking-widest bg-[#17294F] text-white shadow-lg shadow-blue-900/10 transition-all active:scale-95"
          >
            {startDate ? 'Reserve Now' : 'Contact Owner'}
          </button>
        </div>
      </div>

      <ListingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        host={listing?.host}
        availableRooms={listing ? (listing.date && !listing.date.includes('-') ? parseInt(listing.date) || 0 : 0) : 0}
        onAuthRequired={!isAuthenticated ? () => { setIsModalOpen(false); setIsAuthModalOpen(true); } : undefined}
        onContactOwner={() => showToast('Message sent to owner!')}
      />

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={() => setIsAuthenticated(true)}
      />

      <Footer />

      {/* Full-screen Map Modal */}
      {isMapModalOpen && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-0 md:p-10">
          <div
            onClick={() => setIsMapModalOpen(false)}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          />
          <div
            className="relative w-full h-full md:max-w-6xl md:max-h-[85vh] bg-white md:rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col"
          >
            <div className="absolute top-6 left-6 z-[600]">
              <button 
                onClick={() => setIsMapModalOpen(false)}
                className="p-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg pointer-events-auto active:scale-90 transition-transform"
              >
                <ArrowLeft size={24} className="text-neutral-900" />
              </button>
            </div>

            <div className="flex-1 w-full h-full">
              <MapTilerView
                lat={listing.lat || 8.2280}
                lng={listing.lng || 124.2452}
                title={listing.title}
                loadImmediately={true}
              />
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[600] w-full px-6 flex justify-center">
              <div className="bg-neutral-900/60 backdrop-blur-xl rounded-2xl p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/5 w-fit flex items-center gap-3.5 hover:scale-105 active:scale-95 cursor-default">
                <div className="w-8 h-8 bg-[#2252D6] rounded-xl flex items-center justify-center shadow-lg shrink-0">
                  <Navigation size={16} className="text-white fill-white/20" />
                </div>
                <div className="flex flex-col pr-2">
                  <h4 className="text-xs font-black text-white leading-tight">Pala-o, Iligan City</h4>
                  <p className="text-[8px] font-bold text-white/30 mt-0.5 uppercase tracking-wider">8.2280° N, 124.2452° E</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <PhotoCarouselOverlay 
        isOpen={isPhotoGalleryOpen}
        images={images}
        initialIndex={initialGalleryIndex}
        onClose={() => setIsPhotoGalleryOpen(false)}
      />

      {selectedReview && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4" onClick={() => setSelectedReview(null)}>
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                 <img src={selectedReview.userImage} className="w-[50px] h-[50px] rounded-full object-cover bg-neutral-100 ring-2 ring-white shadow-sm" alt={selectedReview.userName} />
                 <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                       <span className="font-bold text-neutral-900 text-[16px] leading-tight">{selectedReview.userName}</span>
                       <BadgeCheck size={18} className="text-[#2252D6]" />
                    </div>
                    <span className="text-neutral-500 text-[14px] font-medium leading-tight mt-0.5">@{selectedReview.userName.toLowerCase().replace(/\s+/g, '_')}</span>
                 </div>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedReview(null);
                }}
                className="p-2 bg-neutral-100 hover:bg-neutral-200 rounded-full transition-colors focus:outline-none"
              >
                <X size={20} className="text-neutral-600" />
              </button>
            </div>
            
            <p className="text-neutral-800 leading-relaxed text-[16px] md:text-[18px]">
               {selectedReview.comment}
            </p>

            <div className="mt-8 text-neutral-500 text-[14px] font-medium">
               {selectedReview.date}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

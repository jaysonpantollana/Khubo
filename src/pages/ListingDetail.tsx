// @context: Listing detail page — full property view with booking
// @purpose: Displays gallery, details, amenities, reviews, host profile, map, and booking modal
// @behavior: useListing fetches by ID; gallery grid with photo overlay; booking modal for date selection; inline calendar
// @dependencies: useListing, useToast, ListingModal, PhotoCarouselOverlay, MapTilerView, HostProfile, lucide-react, motion

import { useListing } from '../hooks/useListing';
import { useToast } from '../components/ToastProvider';
import { useAuth } from '../lib/AuthContext';
import { useLandlord } from '../lib/LandlordContext';
import { X, Star, MapPin, ArrowLeft, Utensils, Wifi, Tv, ArrowDownUp, Briefcase, Car, Fence, Refrigerator, Microwave, Cctv, Navigation, Maximize, Heart, BadgeCheck, Repeat2, FileText, Download, Users, Trash2, Instagram, Facebook, Twitter, Phone, Mail, Copy, Check } from 'lucide-react';
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { ListingModal } from '../components/ListingModal';
import { LandlordListingsModal } from '../components/LandlordListingsModal';
const PhotoCarouselOverlay = lazy(() => import('../components/PhotoCarouselOverlay').then(m => ({ default: m.PhotoCarouselOverlay })));
const MapTilerView = lazy(() => import('../components/MapTilerView'));
import Footer from '../components/Footer';
import HostProfile from '../components/HostProfile';
import { AuthModal } from '../components/AuthModal';
import ListingDetailSkeleton from '../components/ListingDetailSkeleton';

export default function ListingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { listing: initialListing, loading } = useListing(id);
  const { showToast } = useToast();
  const { isLandlord } = useLandlord();
  const [listing, setListing] = useState(initialListing);

  useEffect(() => {
    setListing(initialListing);
  }, [initialListing]);

  useEffect(() => {
    if (listing) {
      document.title = `${listing.title} | Khubo`;
    }
  }, [listing]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPhotoGalleryOpen, setIsPhotoGalleryOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [initialGalleryIndex, setInitialGalleryIndex] = useState(0);
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { user } = useAuth();
  const isAuthenticated = !!user;
  const [selectedReview, setSelectedReview] = useState<{id: string; userName: string; userImage: string; comment: string; date: string} | null>(null);
  const [showAllReviewsMobile, setShowAllReviewsMobile] = useState(false);
  const [isLandlordListingsOpen, setIsLandlordListingsOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);
  const [copiedContact, setCopiedContact] = useState<string | null>(null);

  const requireAuth = (action: () => void) => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    action();
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedContact(type);
    setTimeout(() => setCopiedContact(null), 1500);
  };

  const handleDeleteReview = (reviewId: string) => {
    if (!listing) return;
    const updatedReviews = listing.reviews.filter((r) => r.id !== reviewId);
    const totalRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
    const newRating = updatedReviews.length > 0 ? totalRating / updatedReviews.length : 0;
    setListing({ ...listing, reviews: updatedReviews, rating: newRating });
    setReviewToDelete(null);
    if (selectedReview?.id === reviewId) {
      setSelectedReview(null);
    }
  };

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
    name: 'Layla M. Santos',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Layla88',
    reviews: 12,
    rating: 4.95,
    hostingDuration: '3 months',
    work: 'Property Management',
    location: 'Iligan City, Philippines',
    tenantCount: 15
  };
  const displayHost = listing.host || defaultHost;
  const hasRealHost = Boolean(listing.host);
  const handleHostProfileClick = hasRealHost
    ? () => navigate(`/landlord/profile/${encodeURIComponent(displayHost.name)}`)
    : undefined;

  return (
    <div className="min-h-screen bg-neutral-50 md:bg-white pb-32 text-neutral-900">
      {/* Desktop Header */}
      <div className="hidden md:block sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-[2520px] mx-auto xl:px-12 md:px-12 sm:px-4 px-4 h-16 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 g-neutral-100 p-2 pr-4 -ml-2 rounded-full transition text-neutral-900 cursor-pointer pointer-events-auto"
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
          className="p-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg pointer-events-auto cursor-pointer"
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
                loading={idx === 0 ? 'eager' : 'lazy'}
                decoding="async"
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

        {/* Save Button - Mobile */}
        <button
          onClick={() => requireAuth(() => {
            setIsSaved(!isSaved);
            if (!isSaved) showToast('Listing saved to your wishlist!');
          })}
          className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-xl shadow-lg g-white transition-all"
        >
          <Heart
            size={24}
            className={cn(isSaved ? "fill-[#FF385C] text-[#FF385C]" : "text-neutral-900")}
          />
          <span className="text-base font-semibold">{isSaved ? 'Saved' : 'Save'}</span>
        </button>
      </div>

      <main className={cn(
        "max-w-[2520px] mx-auto xl:px-12 md:px-12 sm:px-4 px-0 pb-24 md:pb-12",
        "relative md:static mt-0"
      )}>
        <div className="px-4 sm:px-0">
        
        {/* Desktop Gallery Grid */}
        <div className="hidden md:block relative group mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 h-64 md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-sm">
            {/* Main Big Image */}
            <div 
              onClick={() => openGallery(0)}
              className="md:col-span-2 md:row-span-2 relative overflow-hidden bg-neutral-100 cursor-zoom-in"
            >
              <img
                src={images[0]}
                className="w-full h-full object-cover"
                alt={`${listing.title} - main`}
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Smaller Images */}
            {images.slice(1, 5).map((img, idx) => (
              <div 
                key={idx} 
                onClick={() => openGallery(idx + 1)}
                className="hidden md:block relative overflow-hidden bg-neutral-100 cursor-zoom-in group-irst:opacity-100"
              >
                <img
                  src={img}
                  className="w-full h-full object-cover"
                  alt={`${listing.title} - gallery ${idx + 1}`}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>

          {/* Save Button - Desktop */}
          <button
            onClick={() => requireAuth(() => {
              setIsSaved(!isSaved);
              if (!isSaved) showToast('Listing saved to your wishlist!');
            })}
            className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-xl shadow-lg g-white transition-all"
          >
            <Heart
              size={24}
              className={cn(isSaved ? "fill-[#FF385C] text-[#FF385C]" : "text-neutral-900")}
            />
            <span className="text-base font-semibold">{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>

        {/* Desktop Title Bar - Now below images */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2 pt-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-neutral-900 tracking-tight leading-tight">{listing.title}</h1>
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
                    loading="lazy"
                    decoding="async"
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
              <h3 className="text-2xl font-semibold text-neutral-900 mb-8">Amenities</h3>
              {listing.amenities && listing.amenities.length > 0 && (
                <>
                  <div className="flex flex-wrap gap-4 mb-8">
                    {listing.amenities.slice(0, showAllAmenities ? listing.amenities.length : 3).map((amenity, idx) => (
                      <div key={idx} className="px-5 py-3.5 border border-neutral-200 rounded-xl">
                        <span className="text-base text-neutral-800 font-medium">{amenity}</span>
                      </div>
                    ))}
                    {!showAllAmenities && listing.amenities.length > 3 && (
                      <div className="px-5 py-3.5 border border-dashed border-neutral-300 rounded-xl">
                        <span className="text-base text-neutral-800 font-medium">+{listing.amenities.length - 3}</span>
                      </div>
                    )}
                  </div>
                  {listing.amenities.length > 3 && (
                    <button
                      onClick={() => requireAuth(() => setShowAllAmenities(!showAllAmenities))}
                      className="px-6 py-3 border-2 border-[#17294F] text-[#17294F] rounded-xl font-bold g-[#17294F]/5 transition inline-block"
                    >
                      {showAllAmenities ? 'Show less' : 'Show more'}
                    </button>
                  )}
                </>
              )}
            </div>



            <div className="py-12 border-b border-gray-100">
              <h3 className="text-2xl font-semibold text-neutral-900 mb-6">Pre-contractual Document</h3>
              <p className="text-neutral-600 mb-6 leading-relaxed">
                Review the terms and conditions before you proceed with booking. This document outlines the house rules, payment schedules, and other important agreements.
              </p>

              <div className="flex items-center justify-between p-5 border border-neutral-200 rounded-2xl bg-neutral-50 g-neutral-100 transition-colors cursor-pointer" onClick={() => requireAuth(() => window.open('#', '_blank'))}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-neutral-100 shrink-0">
                    <FileText size={24} className="text-[#17294F]" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-neutral-900">Standard Lease Agreement</h4>
                    <p className="text-sm text-neutral-500 mt-0.5">PDF • 2.4 MB</p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-[#17294F] g-[#17294F] ext-white transition-colors border border-neutral-200">
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
                    <div key={rev.id} className="bg-white border border-neutral-200 rounded-3xl p-6 flex flex-col gap-4 shadow-sm cursor-pointer" onClick={() => setSelectedReview(rev)}>
                       <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                              <img src={rev.userImage} loading="lazy" className="w-11 h-11 rounded-full object-cover bg-neutral-100 ring-2 ring-white shadow-sm" alt={rev.userName} />
                             <div className="flex flex-col">
                                <div className="flex items-center gap-1.5">
                                   <span className="font-bold text-neutral-900 text-base leading-tight">{rev.userName}</span>
                                   <BadgeCheck size={16} className="text-[#2252D6]" />
                                </div>
                                <span className="text-neutral-500 text-sm font-medium leading-tight mt-0.5">@{rev.userName.toLowerCase().replace(/\s+/g, '_')}</span>
                             </div>
                          </div>
                          {isLandlord && (
                            <button
                              aria-label="Delete review"
                              onClick={(e) => { e.stopPropagation(); setReviewToDelete(rev.id); }}
                              className="p-1.5 text-neutral-400 ext-red-500 g-red-50 rounded-lg transition-colors cursor-pointer pointer-events-auto"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                       </div>
                       
                       <p className="text-neutral-800 leading-relaxed text-base pt-1">
                          {rev.comment}
                       </p>

                       <div className="flex items-center justify-between mt-auto pt-4 text-neutral-500">
                          <div className="text-sm font-medium">
                             {rev.date}
                          </div>
                       <div className="flex items-center gap-5 text-neutral-400">
                              <button aria-label="Like review" onClick={() => requireAuth(() => {})} className="flex items-center gap-1.5 ext-[#2252D6] transition-colors group cursor-pointer pointer-events-auto">
                                 <Heart size={16} className="group-ill-current transition-colors" />
                                 <span className="text-xs font-semibold">{(idx * 7 + 12) % 40 + 10}</span>
                              </button>
                              <button aria-label="Repeat review" onClick={() => requireAuth(() => {})} className="flex items-center gap-1.5 ext-green-500 transition-colors cursor-pointer pointer-events-auto">
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
                       className="px-6 py-3 border-2 border-[#17294F] text-[#17294F] rounded-xl font-bold g-[#17294F]/5 transition flex items-center justify-center"
                    >
                       {showAllReviewsMobile ? 'Show less' : 'Show all'}
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
                className="w-full h-[60vh] md:h-[540px] relative z-0 group cursor-pointer"
                onClick={() => setIsMapModalOpen(true)}
              >
                <div className="absolute inset-0 z-20 group-g-black/5 transition-colors rounded-3xl" />
                <Suspense fallback={<div className="w-full h-full bg-neutral-100 animate-pulse rounded-3xl" />}>
                  <MapTilerView
                    lat={listing.lat || 8.2280}
                    lng={listing.lng || 124.2452}
                    title={listing.title}
                    hideControls={isLandlordListingsOpen}
                  />
                </Suspense>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
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
              tenantCount={displayHost.tenantCount || defaultHost.tenantCount}
              onClick={handleHostProfileClick}
            />

          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-14 lg:top-20 flex flex-col gap-4 max-h-[calc(100vh-120px)]">

               <div className="border border-gray-200 rounded-[2.5rem] py-8 px-8 shadow-2xl flex flex-col gap-5 bg-white overflow-y-auto min-h-0">
                 <div className="flex justify-between items-center bg-neutral-50 px-5 py-4 rounded-[2rem] border border-neutral-100 flex-shrink-0">
                <div className="flex items-baseline gap-1">
                   <span className="text-2xl font-black text-[#17294F]">₱{listing.price.toLocaleString()}</span>
                   <span className="text-neutral-500 text-[11px] font-bold uppercase tracking-tight">/month</span>
                </div>
                <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-full">
                   <Star size={18} className="fill-amber-400 text-amber-400" />
                   <span className="text-base font-black text-neutral-900">{listing.rating.toFixed(2)}</span>
                </div>
              </div>

              {/* Landlord Profile */}
              <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_4px_30px_rgba(0,0,0,0.04)] border border-neutral-100">
                <div
                  onClick={() => navigate(`/landlord/profile/${encodeURIComponent(listing.host?.name || 'Layla M. Santos')}`)}
                  className="flex items-center gap-3 mb-5 cursor-pointer hover:bg-neutral-50 -mx-2 px-2 py-1.5 rounded-xl transition-colors"
                >
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

                <div className="mb-5">
                  <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-3">Contact</p>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 p-2 bg-neutral-50 rounded-lg">
                      <Phone size={16} className="text-[#17294F]" />
                      <span className="text-sm font-bold text-[#17294F] flex-1">+63 912 345 6789</span>
                      <button
                        onClick={() => requireAuth(() => copyToClipboard('+639123456789', 'Phone'))}
                        className="p-1.5 g-neutral-200 rounded-lg transition-colors text-neutral-500 ext-[#17294F]"
                      >
                        {copiedContact === 'Phone' ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                      </button>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-neutral-50 rounded-lg">
                      <Mail size={16} className="text-[#17294F]" />
                      <span className="text-sm font-bold text-[#17294F] flex-1">layla@khubo.com</span>
                      <button
                        onClick={() => requireAuth(() => copyToClipboard('layla@khubo.com', 'Email'))}
                        className="p-1.5 g-neutral-200 rounded-lg transition-colors text-neutral-500 ext-[#17294F]"
                      >
                        {copiedContact === 'Email' ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-3">Social Media</p>
                  <div className="flex gap-3">
                    <button onClick={() => requireAuth(() => window.open('https://instagram.com', '_blank'))} className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl cursor-pointer">
                      <Instagram size={18} />
                    </button>
                    <button onClick={() => requireAuth(() => window.open('https://facebook.com', '_blank'))} className="flex items-center justify-center w-10 h-10 bg-[#1877F2] text-white rounded-xl cursor-pointer">
                      <Facebook size={18} />
                    </button>
                    <button onClick={() => requireAuth(() => window.open('https://twitter.com', '_blank'))} className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-xl cursor-pointer">
                      <Twitter size={18} />
                    </button>
                  </div>
                </div>
              </div>


            </div>
            </div>
          </div>
        </div>
      </div>
    </main>



      <ListingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        host={listing?.host}
        onAuthRequired={!isAuthenticated ? () => { setIsModalOpen(false); setIsAuthModalOpen(true); } : undefined}
        onContactOwner={() => showToast('Message sent to owner!')}
      />

      <LandlordListingsModal
        isOpen={isLandlordListingsOpen}
        onClose={() => setIsLandlordListingsOpen(false)}
        host={displayHost}
        currentListingId={listing.id}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
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
                className="p-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg pointer-events-auto"
              >
                <ArrowLeft size={24} className="text-neutral-900" />
              </button>
            </div>

            <div className="flex-1 w-full h-full">
              <Suspense fallback={<div className="w-full h-full bg-neutral-100 animate-pulse" />}>
                <MapTilerView
                  lat={listing.lat || 8.2280}
                  lng={listing.lng || 124.2452}
                  title={listing.title}
                  loadImmediately={true}
                  hideControls={isLandlordListingsOpen}
                />
              </Suspense>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[600] w-full px-6 flex justify-center">
              <div className="bg-neutral-900/60 backdrop-blur-xl rounded-2xl p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/5 w-fit flex items-center gap-3.5 cursor-default">
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

      {isPhotoGalleryOpen && (
        <Suspense fallback={<div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center"><div className="text-white animate-pulse">Loading gallery...</div></div>}>
          <PhotoCarouselOverlay 
            isOpen={isPhotoGalleryOpen}
            images={images}
            initialIndex={initialGalleryIndex}
            onClose={() => setIsPhotoGalleryOpen(false)}
          />
        </Suspense>
      )}

      {selectedReview && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4" onClick={() => setSelectedReview(null)}>
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                   <img src={selectedReview.userImage} loading="lazy" className="w-12 h-12 rounded-full object-cover bg-neutral-100 ring-2 ring-white shadow-sm" alt={selectedReview.userName} />
                 <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                       <span className="font-bold text-neutral-900 text-base leading-tight">{selectedReview.userName}</span>
                       <BadgeCheck size={18} className="text-[#2252D6]" />
                    </div>
                    <span className="text-neutral-500 text-sm font-medium leading-tight mt-0.5">@{selectedReview.userName.toLowerCase().replace(/\s+/g, '_')}</span>
                 </div>
              </div>
              <div className="flex items-center gap-2">
                {isLandlord && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setReviewToDelete(selectedReview.id); }}
                    className="p-2 text-neutral-400 ext-red-500 g-red-50 rounded-full transition-colors focus:outline-none cursor-pointer"
                    aria-label="Delete review"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedReview(null);
                  }}
                  className="p-2 bg-neutral-100 g-neutral-200 rounded-full transition-colors focus:outline-none"
                >
                  <X size={20} className="text-neutral-600" />
                </button>
              </div>
            </div>
            
            <p className="text-neutral-800 leading-relaxed text-base md:text-lg">
               {selectedReview.comment}
            </p>

            <div className="mt-8 text-neutral-500 text-sm font-medium">
               {selectedReview.date}
            </div>
          </div>
        </div>
      )}

      {reviewToDelete && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4" onClick={() => setReviewToDelete(null)}>
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">Delete review?</h3>
            <p className="text-neutral-500 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setReviewToDelete(null)}
                className="flex-1 px-4 py-2.5 border border-neutral-200 rounded-xl font-semibold text-neutral-700 g-neutral-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteReview(reviewToDelete)}
                className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-xl font-semibold g-red-600 transition cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

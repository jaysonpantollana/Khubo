// @context: Landlord Reviews page — review management for landlord properties
// @purpose: Shows all reviews across the landlord's listings, grouped by property, with delete capability
// @behavior: Landlords can delete individual review comments from their specific listings
// @dependencies: Listing, Review types, useAuth, useNavigate, BottomNav, lucide-react

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Trash2, MessageSquare, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { Listing, Review } from '../types';
import { useAuth } from '../lib/AuthContext';
import { useToast } from '../components/ToastProvider';
import { Modal } from '../components/ui/Modal';
import BottomNav from '../components/BottomNav';

const sampleListingsWithReviews: Listing[] = [
  {
    id: 'sample-1',
    title: 'Sunset Boarding House',
    location: 'Santiago, Iligan City',
    description: 'A cozy boarding house with modern amenities.',
    price: 4500,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    category: 'Boarding House',
    date: '2026-01-15',
    amenities: ['Wifi', 'Water', 'Electricity'],
    reviews: [
      { id: 'sr1', userName: 'Maria Santos', userImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MariaSantos&backgroundColor=b6e3f4', rating: 5, date: 'May 2025', comment: 'Very clean and well-maintained. The landlord is responsive and helpful.' },
      { id: 'sr2', userName: 'Juan Dela Cruz', userImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JuanDelaCruz&backgroundColor=b6e3f4', rating: 4, date: 'April 2025', comment: 'Good location, quiet neighborhood. WiFi could be faster though.' },
      { id: 'sr3', userName: 'Ana Reyes', userImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AnaReyes&backgroundColor=b6e3f4', rating: 5, date: 'March 2025', comment: 'Best boarding house in the area. Highly recommended!' },
    ],
  },
  {
    id: 'sample-2',
    title: 'City View Studio',
    location: 'Pala-o, Iligan City',
    description: 'Spacious studio apartment with city views.',
    price: 6000,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    category: 'Studio',
    date: '2026-02-01',
    amenities: ['Wifi', 'AC', 'Parking'],
    reviews: [
      { id: 'sr4', userName: 'Carlos Garcia', userImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CarlosGarcia&backgroundColor=b6e3f4', rating: 5, date: 'June 2025', comment: 'Amazing view! The apartment is spacious and well-furnished.' },
      { id: 'sr5', userName: 'Sofia Lim', userImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SofiaLim&backgroundColor=b6e3f4', rating: 4, date: 'May 2025', comment: 'Great place overall. A bit pricey but worth it for the view.' },
    ],
  },
  {
    id: 'sample-3',
    title: 'Student Dorm',
    location: 'Tibanga, Iligan City',
    description: 'Affordable dormitory near the university.',
    price: 2500,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    category: 'Dormitory',
    date: '2026-03-10',
    amenities: ['Wifi', 'Water'],
    reviews: [
      { id: 'sr6', userName: 'Mark Wilson', userImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MarkWilson&backgroundColor=b6e3f4', rating: 4, date: 'July 2025', comment: 'Affordable and close to campus. Perfect for students on a budget.' },
      { id: 'sr7', userName: 'Sarah Connor', userImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahConnor&backgroundColor=b6e3f4', rating: 5, date: 'June 2025', comment: 'Basic but clean. The landlord takes good care of the place.' },
      { id: 'sr8', userName: 'Peter Parker', userImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PeterParker&backgroundColor=b6e3f4', rating: 4, date: 'May 2025', comment: 'Good value for money. Shared kitchen is a nice touch.' },
      { id: 'sr9', userName: 'Gwen Stacy', userImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GwenStacy&backgroundColor=b6e3f4', rating: 5, date: 'April 2025', comment: 'Loved staying here. Great community feel.' },
    ],
  },
  {
    id: 'sample-4',
    title: 'Riverside Apartment',
    location: 'Bulua, Iligan City',
    description: 'Peaceful apartment near the river.',
    price: 7500,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    category: 'Apartment',
    date: '2026-04-05',
    amenities: ['Wifi', 'AC', 'Water', 'Parking'],
    reviews: [
      { id: 'sr10', userName: 'Clark Kent', userImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ClarkKent&backgroundColor=b6e3f4', rating: 5, date: 'July 2025', comment: 'Beautiful apartment with a serene riverside view. Top notch!' },
    ],
  },
];

export default function LandlordReviews() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [displayListings, setDisplayListings] = useState<Listing[]>(sampleListingsWithReviews);
  const [loadingListings, setLoadingListings] = useState(false);
  const [expandedListings, setExpandedListings] = useState<Record<string, boolean>>({});
  const [deletingReview, setDeletingReview] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{ listingId: string; reviewId: string; reviewName: string } | null>(null);

  useEffect(() => {
    document.title = "Reviews | Khubo";
  }, []);

  const fetchMyListings = useCallback(async () => {
    if (!user) return;
    setLoadingListings(true);
    const { getListings } = await import('../lib/api/listings');
    const { data } = await getListings();
    const filtered = (data || []).filter((l) => l.host?.name === user?.email?.split('@')[0]) as Listing[];
    if (filtered.length > 0) {
      setDisplayListings(filtered);
    }
    setLoadingListings(false);
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchMyListings();
    }
  }, [user, fetchMyListings]);

  useEffect(() => {
    if (displayListings.length > 0) {
      const initial: Record<string, boolean> = {};
      displayListings.forEach(l => { initial[l.id] = true; });
      setExpandedListings(initial);
    }
  }, [displayListings.length]);

  const handleDeleteReview = useCallback((listingId: string, reviewId: string) => {
    setDeletingReview(reviewId);
    setTimeout(() => {
      setDisplayListings(prev =>
        prev.map(l =>
          l.id === listingId
            ? { ...l, reviews: l.reviews.filter(r => r.id !== reviewId) }
            : l
        )
      );
      setDeletingReview(null);
      showToast('Review deleted successfully', 'success');
    }, 300);
  }, [showToast]);

  const toggleListing = useCallback((listingId: string) => {
    setExpandedListings(prev => ({ ...prev, [listingId]: !prev[listingId] }));
  }, []);

  const totalReviews = displayListings.reduce((acc, l) => acc + l.reviews.length, 0);

  return (
    <div className="h-screen flex flex-col bg-[#F9F9F9]">
      <div className="bg-white border-b border-neutral-100 shrink-0">
        <div className="max-w-[2520px] mx-auto xl:px-12 md:px-12 sm:px-4 px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/profile')}
            className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-600 hover:text-neutral-900"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-neutral-900">Reviews</h1>
          <span className="ml-auto text-sm font-medium text-neutral-500">
            {totalReviews} review{totalReviews !== 1 ? 's' : ''} across {displayListings.length} properties
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[2520px] mx-auto xl:px-12 md:px-12 sm:px-4 px-4 py-6">
          {loadingListings ? (
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((i) => (
                <div key={`review-skeleton-${i}`} className="bg-white rounded-2xl p-6 animate-pulse">
                  <div className="h-6 bg-neutral-200 rounded-lg w-1/3 mb-4" />
                  <div className="h-4 bg-neutral-200 rounded-lg w-1/4 mb-2" />
                  <div className="h-4 bg-neutral-200 rounded-lg w-1/5" />
                </div>
              ))}
            </div>
          ) : displayListings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <MessageSquare size={48} className="text-neutral-300 mb-4" />
              <h2 className="text-xl font-bold text-neutral-700 mb-2">No Reviews Yet</h2>
              <p className="text-neutral-500 text-sm max-w-md">
                Reviews from tenants will appear here once they rate your properties.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {displayListings.map((listing) => {
                const isExpanded = expandedListings[listing.id] ?? true;
                const reviewCount = listing.reviews.length;
                const avgRating = reviewCount > 0
                  ? listing.reviews.reduce((acc, r) => acc + r.rating, 0) / reviewCount
                  : 0;

                return (
                  <div key={listing.id} className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100 overflow-hidden">
                    {/* Listing Header */}
                    <button
                      onClick={() => toggleListing(listing.id)}
                      className="w-full flex items-center gap-4 p-5 text-left hover:bg-neutral-50/50 transition-colors cursor-pointer"
                    >
                      <img
                        src={listing.image}
                        alt={listing.title}
                        className="w-16 h-16 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-neutral-900 truncate">{listing.title}</h3>
                        <p className="text-xs text-neutral-500 mt-0.5">{listing.location}</p>
                        <div className="flex items-center gap-3 mt-1.5">
                          <div className="flex items-center gap-1">
                            <Star size={12} className="text-yellow-500 fill-yellow-500" />
                            <span className="text-xs font-bold text-neutral-700">{avgRating.toFixed(1)}</span>
                          </div>
                          <span className="text-xs text-neutral-400">·</span>
                          <span className="text-xs text-neutral-500">{reviewCount} review{reviewCount !== 1 ? 's' : ''}</span>
                        </div>
                      </div>
                      <div className="shrink-0 text-neutral-400">
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </button>

                    {/* Reviews List */}
                    {isExpanded && reviewCount > 0 && (
                      <div className="border-t border-neutral-100">
                        {listing.reviews.map((review) => (
                          <div
                            key={review.id}
                            className={`flex gap-3 p-5 border-b border-neutral-50 last:border-b-0 transition-opacity ${deletingReview === review.id ? 'opacity-40' : ''}`}
                          >
                            <img
                              src={review.userImage}
                              alt={review.userName}
                              className="w-10 h-10 rounded-full object-cover shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="text-sm font-bold text-neutral-900 truncate">{review.userName}</span>
                                  <div className="flex items-center gap-0.5 shrink-0">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <Star
                                        key={i}
                                        size={10}
                                        className={i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-neutral-200'}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <span className="text-xs text-neutral-400 shrink-0">{review.date}</span>
                              </div>
                              <p className="text-sm text-neutral-600 mt-1 leading-relaxed">{review.comment}</p>
                            </div>
                            <button
                              onClick={() => setConfirmDelete({ listingId: listing.id, reviewId: review.id, reviewName: review.userName })}
                              disabled={deletingReview === review.id}
                              className="shrink-0 p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors self-start cursor-pointer disabled:cursor-not-allowed"
                              title="Delete review"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Empty State for Listing */}
                    {isExpanded && reviewCount === 0 && (
                      <div className="border-t border-neutral-100 p-8 text-center">
                        <MessageSquare size={24} className="text-neutral-300 mx-auto mb-2" />
                        <p className="text-sm text-neutral-400">No reviews for this property yet.</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <BottomNav />

      <Modal
        isOpen={confirmDelete !== null}
        onClose={() => setConfirmDelete(null)}
        title="Delete Review"
        size="sm"
        showCloseButton={false}
      >
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <AlertTriangle size={24} className="text-red-500" />
          </div>
          <p className="text-neutral-700 text-sm mb-1">
            Are you sure you want to delete the review by <span className="font-bold">{confirmDelete?.reviewName}</span>?
          </p>
          <p className="text-neutral-400 text-xs mb-6">This action cannot be undone.</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setConfirmDelete(null)}
              className="px-5 py-2.5 rounded-xl border border-neutral-200 text-neutral-700 font-semibold text-sm hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (confirmDelete) {
                  handleDeleteReview(confirmDelete.listingId, confirmDelete.reviewId);
                  setConfirmDelete(null);
                }
              }}
              className="px-5 py-2.5 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition-colors cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

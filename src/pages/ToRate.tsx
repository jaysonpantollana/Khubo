// @context: To Rate page — rate properties from "My Living Space"
// @purpose: Allows tenants to add star ratings and comments for properties they are registered in
// @behavior: Shows reservation list with rating form (stars + comment); submitted ratings shown as review cards
// @dependencies: lucide-react, useNavigate, BottomNav, ToastProvider

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Send } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { useToast } from '../components/ToastProvider';

interface RatingData {
  rating: number;
  comment: string;
}

interface Reservation {
  id: string;
  title: string;
  location: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
  amenities: string[];
}

const reservations: Reservation[] = [
  {
    id: 'res-1',
    title: "Layla's Residences & Dorminitory",
    location: 'Iligan City, Lanao del norte 9200',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
    price: 6000,
    rating: 5.0,
    reviewCount: 35,
    amenities: ['Free Wifi', 'Water'],
  },
  {
    id: 'res-2',
    title: 'Sunset Boarding House',
    location: 'Pala-o, Iligan City 9200',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800',
    price: 3500,
    rating: 4.75,
    reviewCount: 22,
    amenities: ['Wifi', 'Water'],
  },
  {
    id: 'res-3',
    title: 'Greenview Apartments',
    location: 'Santiago, Iligan City 9200',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
    price: 4500,
    rating: 4.8,
    reviewCount: 18,
    amenities: ['AC', 'Free Wifi'],
  },
];

export default function ToRate() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [ratings, setRatings] = useState<Record<string, RatingData>>({});
  const [hoveredStar, setHoveredStar] = useState<Record<string, number>>({});

  useEffect(() => {
    document.title = 'To Rate | Khubo';
  }, []);

  const handleRatingChange = (propertyId: string, value: number) => {
    setRatings((prev) => ({
      ...prev,
      [propertyId]: { ...prev[propertyId], rating: value, comment: prev[propertyId]?.comment || '' },
    }));
  };

  const handleCommentChange = (propertyId: string, comment: string) => {
    setRatings((prev) => ({
      ...prev,
      [propertyId]: { ...prev[propertyId], comment, rating: prev[propertyId]?.rating || 0 },
    }));
  };

  const handleSubmit = (propertyId: string, propertyTitle: string) => {
    const data = ratings[propertyId];
    if (!data || data.rating === 0) {
      showToast('Please select a star rating', 'error');
      return;
    }
    showToast(`Rated "${propertyTitle}" — ${data.rating} star${data.rating > 1 ? 's' : ''}`, 'success');
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-neutral-100">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 hover:bg-neutral-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-neutral-700" />
          </button>
          <h1 className="text-xl font-bold text-neutral-900">To Rate</h1>
        </div>
      </div>

      {/* Property list */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
        {reservations.map((res) => {
          const submitted = ratings[res.id]?.rating > 0 && ratings[res.id]?.comment;
          return (
            <div key={res.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-neutral-100">
              {/* Property image & info */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={res.image}
                  alt={res.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h2 className="text-lg font-bold leading-tight">{res.title}</h2>
                  <p className="text-sm text-white/80 flex items-center gap-1 mt-1">
                    <MapPin size={14} className="shrink-0" /> {res.location}
                  </p>
                </div>
              </div>

              <div className="p-5">
                {/* Price & existing rating */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-black text-neutral-900">₱{res.price.toLocaleString()}<span className="text-sm font-medium text-neutral-500">/month</span></span>
                  <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-bold text-amber-700">{res.rating.toFixed(2)}</span>
                    <span className="text-xs text-amber-600">({res.reviewCount})</span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {res.amenities.map((a) => (
                    <span key={a} className="px-3 py-1 bg-neutral-100 rounded-full text-xs font-semibold text-neutral-600">{a}</span>
                  ))}
                </div>

                {/* Rating form */}
                {!submitted && (
                  <div className="border-t border-neutral-100 pt-5">
                    <p className="text-sm font-bold text-neutral-800 mb-3">Rate this property</p>

                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoveredStar((prev) => ({ ...prev, [res.id]: star }))}
                          onMouseLeave={() => setHoveredStar((prev) => ({ ...prev, [res.id]: 0 }))}
                          onClick={() => handleRatingChange(res.id, star)}
                          className="p-0.5 transition-transform hover:scale-110 cursor-pointer"
                        >
                          <Star
                            size={28}
                            className={`transition-colors ${
                              star <= (hoveredStar[res.id] || ratings[res.id]?.rating || 0)
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-neutral-300'
                            }`}
                          />
                        </button>
                      ))}
                      {ratings[res.id]?.rating > 0 && (
                        <span className="ml-2 text-sm font-semibold text-neutral-600">{ratings[res.id].rating}/5</span>
                      )}
                    </div>

                    {/* Comment */}
                    <textarea
                      value={ratings[res.id]?.comment || ''}
                      onChange={(e) => handleCommentChange(res.id, e.target.value)}
                      placeholder="Write a comment about your experience..."
                      rows={3}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#2252D6]/30 focus:border-[#2252D6] resize-none transition-all"
                    />

                    {/* Submit */}
                    <button
                      onClick={() => handleSubmit(res.id, res.title)}
                      className="mt-3 w-full flex items-center justify-center gap-2 px-5 py-3 bg-[#2252D6] text-white text-sm font-bold rounded-2xl hover:bg-[#1a3fa8] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <Send size={16} />
                      Submit Rating
                    </button>
                  </div>
                )}

                {/* Submitted review card */}
                {submitted && (
                  <div className="border-t border-neutral-100 pt-5">
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={16} className={s <= (ratings[res.id]?.rating || 0) ? 'text-amber-400 fill-amber-400' : 'text-neutral-300'} />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-green-800">Your review</span>
                      </div>
                      <p className="text-sm text-green-900">{ratings[res.id]?.comment}</p>
                      <button
                        onClick={() => {
                          setRatings((prev) => {
                            const next = { ...prev };
                            delete next[res.id];
                            return next;
                          });
                        }}
                        className="mt-3 text-xs font-semibold text-green-700 hover:text-green-900 underline cursor-pointer"
                      >
                        Edit review
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
}

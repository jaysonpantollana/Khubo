// @context: To Rate page — rate properties from "My Living Space"
// @purpose: Allows tenants to add star ratings and comments for properties they are registered in
// @behavior: Shows reservation list with rating form (stars + comment); submitted ratings shown as review cards
// @dependencies: lucide-react, useNavigate, BottomNav, ToastProvider, shared reservations

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Send } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { useToast } from '../components/ToastProvider';
import { PhotoCarouselOverlay } from '../components/PhotoCarouselOverlay';
import { reservations, Reservation } from '../mocks/reservations';

interface RatingData {
  rating: number;
  comment: string;
}

export default function ToRate() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [ratings, setRatings] = useState<Record<string, RatingData>>({});
  const [hoveredStar, setHoveredStar] = useState<Record<string, number>>({});
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [galleryIndex, setGalleryIndex] = useState(0);

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

  const handleOpenGallery = (images: string[], index: number) => {
    setGalleryImages(images);
    setGalleryIndex(index);
    setIsGalleryOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-neutral-100">
        <div className="w-full px-4 py-4 flex items-center gap-4">
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
      <div className="w-full px-4 py-6 space-y-5">
        {reservations.slice(0, 1).map((res) => {
          const submitted = ratings[res.id]?.rating > 0 && ratings[res.id]?.comment;
          return (
            <div key={res.id} className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-3 md:p-4 flex flex-col lg:flex-row gap-4 md:gap-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100">
              {/* Image gallery */}
              <div className="w-full lg:w-[380px] h-auto lg:h-[260px] relative bg-white p-[3px] rounded-2xl md:rounded-[1.5rem] overflow-hidden shrink-0 cursor-zoom-in">
                <img
                  src={res.image}
                  alt={res.title}
                  className="absolute inset-0 w-[calc(50%-1.5px)] h-full object-cover rounded-l-2xl md:rounded-l-[1.5rem]"
                  onClick={() => handleOpenGallery([res.image, ...res.gallery], 0)}
                />
                <div className="absolute top-[3px] right-[3px] bottom-[3px] w-[calc(50%-1.5px)] flex flex-col">
                  {res.gallery.slice(0, 2).map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${res.title} ${i + 2}`}
                      className="w-full h-1/2 object-cover"
                      onClick={() => handleOpenGallery([res.image, ...res.gallery], i + 1)}
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-between py-1 px-1 md:py-2 md:px-2 md:pr-4">
                <div>
                  {/* Title + available badge */}
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2 md:gap-4 mb-2">
                    <h2 className="text-lg md:text-2xl font-bold text-neutral-900 tracking-tight leading-tight">{res.title}</h2>
                    <span className="bg-[#4E4F50] text-white text-[9px] md:text-xs font-bold px-2.5 py-1 md:px-3 md:py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap self-start sm:self-auto">
                      {res.available}
                    </span>
                  </div>

                  {/* Location */}
                  <p className="text-neutral-500 text-xs md:text-base mb-3 md:mb-4 flex items-center gap-1">
                    <MapPin size={16} className="shrink-0" /> {res.location}
                  </p>

                  {/* Rating + Amenities */}
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-1 bg-white border border-neutral-100 px-3 py-1 rounded-full shadow-sm">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-bold text-neutral-800">{res.rating.toFixed(2)}</span>
                      <span className="text-sm text-neutral-400">({res.reviewCount})</span>
                    </div>
                    <div className="flex gap-2">
                      {res.amenities.map((amenity) => (
                        <span key={amenity} className="px-4 py-1.5 border border-neutral-200 rounded-full text-xs font-bold text-neutral-700">{amenity}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1 mt-4 pt-4 border-t border-neutral-50 lg:border-t-0 lg:mt-0 lg:pt-0">
                  <span className="text-2xl md:text-[28px] font-black text-black">₱{res.price.toLocaleString()}</span>
                  <span className="text-sm md:text-base font-medium text-neutral-500">/month</span>
                </div>

                {/* Rating form */}
                <div className="mt-4 pt-4 border-t border-neutral-100">
                  {!submitted ? (
                    <>
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
                    </>
                  ) : (
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
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <BottomNav />

      <PhotoCarouselOverlay
        isOpen={isGalleryOpen}
        images={galleryImages}
        initialIndex={galleryIndex}
        onClose={() => setIsGalleryOpen(false)}
      />
    </div>
  );
}

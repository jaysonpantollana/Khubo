// @context: To Rate page — rate properties from "My Living Space"
// @purpose: Allows tenants to add star ratings and comments for properties they are registered in
// @behavior: Shows reservation list with rating form (stars + comment); submitted ratings shown as review cards
// @dependencies: lucide-react, useNavigate, BottomNav, ToastProvider, shared reservations

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Send, Users, ChevronDown } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { useToast } from '../components/ToastProvider';
import { PhotoCarouselOverlay } from '../components/PhotoCarouselOverlay';
import { reservations } from '../mocks/reservations';

interface RatingData {
  rating: number;
  comment: string;
  isAnonymous: boolean;
}

const ANONYMOUS_NAMES = [
  'Anonymous member',
  'Anonymous participant',
  'Group member',
  'Anonymous member 2',
  'Anonymous participant 2',
  'Group member 2',
  'Anonymous member 3',
  'Anonymous participant 3',
  'Group member 3',
  'Anonymous member 4',
  'Anonymous participant 4',
  'Group member 4',
  'Anonymous member 5',
  'Anonymous participant 5',
  'Group member 5',
];

function getAnonymousName(propertyId: string): string {
  let hash = 0;
  for (let i = 0; i < propertyId.length; i++) {
    hash = ((hash << 5) - hash + propertyId.charCodeAt(i)) | 0;
  }
  return ANONYMOUS_NAMES[Math.abs(hash) % ANONYMOUS_NAMES.length];
}

const ANONYMOUS_AVATARS = [
  'Aneka',
  'Felix',
  'Jasmine',
  'Leo',
  'Mia',
  'Oscar',
  'Zoe',
  'Hugo',
  'Luna',
  'Max',
  'Nora',
  'Sam',
];

function getAnonymousAvatar(propertyId: string): string {
  let hash = 0;
  for (let i = 0; i < propertyId.length; i++) {
    hash = ((hash << 5) - hash + propertyId.charCodeAt(i)) | 0;
  }
  const seed = ANONYMOUS_AVATARS[Math.abs(hash) % ANONYMOUS_AVATARS.length];
  return `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc&radius=50`;
}

export default function ToRate() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [ratings, setRatings] = useState<Record<string, RatingData>>({});
  const [hoveredStar, setHoveredStar] = useState<Record<string, number>>({});
  const [isAnonymous, setIsAnonymous] = useState<Record<string, boolean>>({});
  const [isRatingExpanded, setIsRatingExpanded] = useState<Record<string, boolean>>({});
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const realUserName = localStorage.getItem('user_profile_name') || 'Micheal B. Jordan';

  const realAvatarUrl = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200';

  useEffect(() => {
    document.title = 'To Rate | Khubo';
  }, []);

  const handleRatingChange = (propertyId: string, value: number) => {
    setRatings((prev) => ({
      ...prev,
      [propertyId]: {
        ...prev[propertyId],
        rating: value,
        comment: prev[propertyId]?.comment || '',
        isAnonymous: prev[propertyId]?.isAnonymous || false
      },
    }));
  };

  const handleCommentChange = (propertyId: string, comment: string) => {
    setRatings((prev) => ({
      ...prev,
      [propertyId]: {
        ...prev[propertyId],
        comment,
        rating: prev[propertyId]?.rating || 0,
        isAnonymous: prev[propertyId]?.isAnonymous || false
      },
    }));
  };

  const handleAnonymousToggle = (propertyId: string) => {
    setIsAnonymous((prev) => {
      const newValue = !prev[propertyId];
      setRatings((prevRatings) => ({
        ...prevRatings,
        [propertyId]: {
          ...prevRatings[propertyId],
          isAnonymous: newValue,
          rating: prevRatings[propertyId]?.rating || 0,
          comment: prevRatings[propertyId]?.comment || ''
        }
      }));
      return { ...prev, [propertyId]: newValue };
    });
  };

  const handleSubmit = (propertyId: string, propertyTitle: string) => {
    const data = ratings[propertyId];
    if (!data || data.rating === 0) {
      showToast('Please select a star rating', 'error');
      return;
    }
    const anonymityText = data.isAnonymous ? ' (Anonymous)' : '';
    showToast(`Rated "${propertyTitle}" — ${data.rating} star${data.rating > 1 ? 's' : ''}${anonymityText}`, 'success');
    setIsRatingExpanded((prev) => ({ ...prev, [propertyId]: false }));
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
        <div className="max-w-[2520px] mx-auto xl:px-12 md:px-12 sm:px-4 px-4 py-4 flex items-center gap-4">
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
      <div className="max-w-[2520px] mx-auto xl:px-12 md:px-12 sm:px-4 px-4 py-6 space-y-5">
        {reservations.slice(0, 1).map((res) => {
          const submitted = ratings[res.id]?.rating > 0 && ratings[res.id]?.comment;
          const anon = isAnonymous[res.id] || false;
          const displayName = anon ? getAnonymousName(res.id) : realUserName;
          return (
            <div key={res.id} className="space-y-5">
              {/* Listing card */}
              <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-3 md:p-4 flex flex-col lg:flex-row gap-4 md:gap-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100 mx-auto max-w-[340px] md:max-w-none w-full">
                <div className="w-full lg:w-[380px] aspect-[4/3] lg:aspect-auto h-auto lg:h-[260px] relative overflow-hidden rounded-2xl md:rounded-[1.5rem] group cursor-zoom-in shrink-0" onClick={() => handleOpenGallery([res.image, ...res.gallery], 0)}>
                  <img
                    src={res.image}
                    alt={res.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1 px-1 md:py-2 md:px-2 md:pr-4">
                  <div>
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2 md:gap-4 mb-2">
                      <h3 className="text-lg md:text-2xl font-bold text-neutral-900 tracking-tight leading-tight">{res.title}</h3>
                      <span className="bg-[#4E4F50] text-white text-[9px] md:text-xs font-bold px-2.5 py-1 md:px-3 md:py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap self-start sm:self-auto">
                        {res.available}
                      </span>
                    </div>
                    <p className="text-neutral-500 text-xs md:text-base mb-3 md:mb-4 flex items-center gap-1">
                      <MapPin size={16} className="shrink-0" /> {res.location}
                    </p>
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
                    <div className="mt-4 pt-3 border-t border-neutral-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Users size={16} className="text-neutral-600" />
                        <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">Tenants</span>
                      </div>
                      <div className="flex items-center">
                        {res.tenants.slice(0, 4).map((t, i) => (
                          <div
                            key={i}
                            className="w-9 h-9 rounded-full bg-[#b6e3f4] flex items-center justify-center border-2 border-white shadow-sm cursor-pointer hover:ring-2 hover:ring-[#2252D6] hover:ring-offset-1 transition-all overflow-hidden"
                            style={{ marginLeft: i > 0 ? '-8px' : '0', zIndex: res.tenants.length - i }}
                            title={t.name}
                          >
                            <img
                              src={t.image}
                              alt={t.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                        {res.tenants.length > 4 && (
                          <span
                            className="w-9 h-9 rounded-full bg-[#4E4F50] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-sm cursor-pointer hover:bg-[#3a3b3c] transition-colors"
                            style={{ marginLeft: '-8px', zIndex: 0 }}
                          >
                            +{res.tenants.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mt-8 md:mt-0 pt-4 border-t border-neutral-50 lg:border-none lg:pt-0">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl md:text-[28px] font-black text-black">₱{res.price.toLocaleString()}</span>
                      <span className="text-sm md:text-base font-medium text-neutral-500">/month</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rating card */}
              <div className={submitted || isRatingExpanded[res.id] ? 'bg-white rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100' : ''}>
                {submitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={16} className={s <= (ratings[res.id]?.rating || 0) ? 'text-amber-400 fill-amber-400' : 'text-neutral-300'} />
                        ))}
                      </div>
                      <span className="text-sm font-bold text-green-800">
                        {ratings[res.id]?.isAnonymous ? 'Anonymous review' : 'Your review'}
                      </span>
                    </div>
                    <p className="text-sm text-green-900">{ratings[res.id]?.comment}</p>
                    <button
                      onClick={() => {
                        setRatings((prev) => {
                          const next = { ...prev };
                          delete next[res.id];
                          return next;
                        });
                        setIsAnonymous((prev) => {
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
                ) : isRatingExpanded[res.id] ? (
                  <>
                    {/* Header with identity + title + collapse */}
                    <div
                      className="flex items-center justify-between cursor-pointer pb-3 mb-4 border-b border-neutral-100"
                      onClick={() => setIsRatingExpanded((prev) => ({ ...prev, [res.id]: false }))}
                    >
                      <div className="flex items-center gap-2.5">
                        {anon ? (
                          <img src={getAnonymousAvatar(res.id)} alt={displayName} className="w-8 h-8 rounded-full object-cover shrink-0" />
                        ) : (
                          <img src={realAvatarUrl} alt={realUserName} className="w-8 h-8 rounded-full object-cover shrink-0" />
                        )}
                        <span className="text-sm font-semibold text-neutral-800">{displayName}</span>
                        <button
                          role="switch"
                          aria-checked={anon}
                          aria-label="Toggle anonymous posting"
                          onClick={(e) => { e.stopPropagation(); handleAnonymousToggle(res.id); }}
                          className={`relative w-11 h-6 rounded-full transition-colors duration-300 cursor-pointer shrink-0 ${anon ? 'bg-[#4E4F50]' : 'bg-neutral-300'}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300 ${anon ? 'left-6' : 'left-1'}`} />
                        </button>
                      </div>
                      <ChevronDown size={24} className="text-neutral-400 rotate-180 transition-transform mr-4" />
                    </div>

                    <p className="text-sm font-bold text-neutral-800 mt-6 mb-2">Rate your living experience</p>

                    {/* Stars */}
                    <div className="flex items-center gap-1.5 mb-5">
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
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#2252D6]/30 focus:border-[#2252D6] resize-none transition-all mb-4"
                    />

                    {/* Submit */}
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleSubmit(res.id, res.title)}
                        className="flex items-center justify-center gap-2 px-8 py-3 bg-[#2252D6] text-white text-sm font-bold rounded-2xl hover:bg-[#1a3fa8] active:scale-[0.98] transition-all cursor-pointer"
                      >
                        <Send size={16} />
                        Submit Rating
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => setIsRatingExpanded((prev) => ({ ...prev, [res.id]: true }))}
                    className="mx-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#2252D6] text-white rounded-full cursor-pointer hover:bg-[#1a3fa8] transition-colors"
                  >
                    <span className="text-sm font-bold">Add review</span>
                    <ChevronDown size={18} className="transition-transform" />
                  </button>
                )}
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

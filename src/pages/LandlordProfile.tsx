// @context: Landlord profile page — full-page view of a landlord's listings and stats
// @purpose: Shows landlord info (avatar, name, rating, reviews, hosting duration) and all their listings with tenant counts
// @behavior: Fetches all listings, filters by host.name from URL param, computes tenant counts per listing
// @dependencies: react-router-dom, lucide-react, getListings, Listing type, HostInfo type

import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, BadgeCheck, Users, MapPin } from 'lucide-react';
import { Listing, HostInfo } from '../types';
import { getListings } from '../lib/api/listings';
import ListingCard from '../components/ListingCard';

export default function LandlordProfile() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    document.title = name ? `${decodeURIComponent(name)} | Khubo` : 'Landlord | Khubo';
  }, [name]);

  useEffect(() => {
    if (!name) return;
    setLoading(true);
    setNotFound(false);
    const decodedName = decodeURIComponent(name);

    getListings().then(({ data }) => {
      const filtered = (data || []).filter((l) => l.host?.name === decodedName);
      if (filtered.length === 0) {
        setNotFound(true);
      }
      setListings(filtered);
      setLoading(false);
    });
  }, [name]);

  const hostInfo = useMemo(() => {
    if (listings.length === 0) return null;
    const first = listings[0];
    return first.host || null;
  }, [listings]);

  const totalTenants = useMemo(() => {
    return listings.reduce((sum, l) => sum + (l.tenants?.length || 0), 0);
  }, [listings]);

  const tenantCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    listings.forEach((l) => {
      counts[l.id] = l.tenants?.length || 0;
    });
    return counts;
  }, [listings]);

  if (loading) {
    return (
      <div className="h-screen flex flex-col bg-[#F9F9F9]">
        <div className="bg-white border-b border-neutral-100 shrink-0">
          <div className="max-w-[2520px] mx-auto xl:px-12 md:px-12 sm:px-4 px-4 py-4 flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-neutral-900 transition-colors"
            >
              <ArrowLeft size={24} />
              <span className="font-semibold text-sm hidden sm:block">Back</span>
            </button>
            <div className="h-6 bg-neutral-200 rounded-lg w-48 animate-pulse" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[2520px] mx-auto xl:px-12 md:px-12 sm:px-4 px-4 py-8">
            {/* Hero skeleton */}
            <div className="bg-white rounded-2xl p-6 md:p-8 mb-6 animate-pulse">
              <div className="flex items-center gap-5 mb-8">
                <div className="w-20 h-20 rounded-full bg-neutral-200" />
                <div>
                  <div className="h-6 bg-neutral-200 rounded w-40 mb-2" />
                  <div className="h-4 bg-neutral-200 rounded w-16" />
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="h-7 bg-neutral-200 rounded w-12" />
                    <div className="h-3 bg-neutral-200 rounded w-16" />
                  </div>
                ))}
              </div>
            </div>
            {/* Cards skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                  <div className="aspect-[4/3] bg-neutral-200" />
                  <div className="p-4 space-y-3">
                    <div className="h-5 bg-neutral-200 rounded w-3/4" />
                    <div className="h-3 bg-neutral-200 rounded w-1/2" />
                    <div className="h-4 bg-neutral-200 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !hostInfo) {
    return (
      <div className="h-screen flex flex-col bg-[#F9F9F9]">
        <div className="bg-white border-b border-neutral-100 shrink-0">
          <div className="max-w-[2520px] mx-auto xl:px-12 md:px-12 sm:px-4 px-4 py-4 flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-600"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-neutral-900">Landlord Profile</h1>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-neutral-500 text-lg font-medium mb-2">Landlord not found</p>
            <p className="text-neutral-400 text-sm mb-6">This landlord doesn't have any listings yet.</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2.5 bg-[#17294F] text-white rounded-xl font-bold text-sm hover:bg-[#1e3466] transition-colors"
            >
              Go back home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#F9F9F9]">
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Hero Cover */}
        <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden bg-black">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url("/bg_2.webp")', opacity: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* Header overlay */}
          <div className="absolute top-0 left-0 right-0 z-50">
            <div className="max-w-[2520px] mx-auto xl:px-12 md:px-12 sm:px-4 px-4 py-4 flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-white hover:text-white/70 transition-colors font-semibold text-sm"
              >
                <ArrowLeft size={24} />
                <span className="hidden sm:block">Back</span>
              </button>
            </div>
          </div>

          {/* Profile Card Overlay */}
          <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 md:px-12 pb-6">
            <div className="max-w-[2520px] mx-auto">
              <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 max-w-2xl">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <img
                    src={hostInfo.image}
                    alt={hostInfo.name}
                    loading="lazy"
                    decoding="async"
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover bg-neutral-100 ring-4 ring-white/30 shadow-lg"
                  />
                  <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 rounded-full border-[3px] border-white/40" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white font-display truncate">
                      {hostInfo.name}
                    </h1>
                    <BadgeCheck size={22} className="text-[#2252D6] shrink-0" />
                  </div>
                  <div className="flex flex-col gap-1.5 mt-2">
                    <p className="text-white/80 text-sm font-medium flex items-center gap-2">
                      <Users size={14} />
                      Landlord
                    </p>
                    {hostInfo.location && (
                      <p className="text-white/80 text-sm font-medium flex items-center gap-2">
                        <MapPin size={14} />
                        {hostInfo.location}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[2520px] mx-auto xl:px-12 md:px-12 sm:px-4 px-4 py-6 md:py-8">
          {/* Stats */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 mb-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-50">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div className="flex flex-col">
                <span className="font-bold text-xl text-[#17294F]">{hostInfo.reviews}</span>
                <span className="text-xs font-semibold text-neutral-400 mt-1 uppercase tracking-wider">Reviews</span>
              </div>
              <div className="flex flex-col sm:border-l border-neutral-100 sm:pl-6 pt-4 sm:pt-0">
                <span className="font-bold text-xl text-[#17294F] flex items-center gap-1">
                  {hostInfo.rating} <Star size={14} className="fill-[#17294F] text-[#17294F] pb-0.5" />
                </span>
                <span className="text-xs font-semibold text-neutral-400 mt-1 uppercase tracking-wider">Rating</span>
              </div>
              <div className="flex flex-col sm:border-l border-neutral-100 sm:pl-6 pt-4 sm:pt-0">
                <span className="font-bold text-xl text-[#17294F]">{hostInfo.hostingDuration.split(' ')[0]}</span>
                <span className="text-xs font-semibold text-neutral-400 mt-1 uppercase tracking-wider">
                  {hostInfo.hostingDuration.split(' ').slice(1).join(' ')} hosting
                </span>
              </div>
              <div className="flex flex-col sm:border-l border-neutral-100 sm:pl-6 pt-4 sm:pt-0">
                <span className="font-bold text-xl text-[#17294F]">{totalTenants}</span>
                <span className="text-xs font-semibold text-neutral-400 mt-1 uppercase tracking-wider">Tenants</span>
              </div>
            </div>
          </div>

          {/* Listings Section */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-[#17294F]">
                Listings <span className="text-neutral-400 font-normal text-sm">({listings.length})</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
              {listings.map((listing) => {
                const tenantCount = tenantCounts[listing.id] || 0;
                return (
                  <div key={listing.id} className="relative">
                    <ListingCard
                      listing={listing}
                      onClick={() => navigate(`/listing/${listing.id}`)}
                    />
                    {/* Tenant count badge */}
                    <div className="absolute bottom-5 left-5 z-10 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-full shadow-sm border border-neutral-100">
                      <Users size={12} className="text-[#2252D6]" />
                      <span className="text-[11px] font-bold text-[#17294F]">
                        {tenantCount} {tenantCount === 1 ? 'tenant' : 'tenants'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

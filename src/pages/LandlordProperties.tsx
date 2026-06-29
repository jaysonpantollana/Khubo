// @context: Landlord Properties page — full-page property management
// @purpose: Shows property statistics with seeded random status/occupancy data for each listing
// @behavior: Uses seededRandom for deterministic pseudo-random values per listing ID
// @behavior: Shows listing status badge (active/unlisted) and occupancy info
// @performance: useMemo ensures stats are computed only when listings change
// @dependencies: Listing type, lucide-react, useAuth, useNavigate

import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Plus } from 'lucide-react';
import { Listing } from '../types';
import { useAuth } from '../lib/AuthContext';
import BottomNav from '../components/BottomNav';
import { CreateListingModal } from '../components/CreateListingModal';

const sampleListings: Listing[] = [
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
    reviews: [],
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
    reviews: [],
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
    reviews: [],
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
    reviews: [],
  },
];

const statuses = ['active', 'unlisted'];

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

export default function LandlordProperties() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [myListings, setMyListings] = useState<Listing[]>([]);
  const [loadingListings, setLoadingListings] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    document.title = "Properties | Khubo";
  }, []);

  const fetchMyListings = useCallback(async () => {
    if (!user) return;
    setLoadingListings(true);
    const { getListings } = await import('../lib/api/listings');
    const { data } = await getListings();
    setMyListings((data || []).filter((l) => l.host?.name === user?.email?.split('@')[0]) as Listing[]);
    setLoadingListings(false);
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchMyListings();
    }
  }, [user, fetchMyListings]);

  const displayListings = myListings.length === 0 ? sampleListings : myListings;

  const propertyStats = useMemo(() =>
    displayListings.map((_, index) => {
      const occupied = Math.floor(seededRandom(index * 2) * 10);
      const total = occupied + Math.floor(seededRandom(index * 2 + 1) * 5) + 1;
      return { status: statuses[index % 2], occupied, total };
    }),
    [displayListings]
  );

  return (
    <div className="h-screen flex flex-col bg-[#F9F9F9]">
      <div className="bg-white border-b border-neutral-100 shrink-0">
        <div className="max-w-[2520px] mx-auto px-4 md:px-12 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/profile')}
            className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-600 hover:text-neutral-900"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-neutral-900">Properties</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[2520px] mx-auto px-4 md:px-12 py-6">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 bg-[#17294F] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-[#1e3466] transition-colors text-sm"
            >
              <Plus size={18} />
              Add Listing
            </button>
          </div>
          {loadingListings ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={`prop-skeleton-${i}`} className="bg-white rounded-2xl p-6 animate-pulse">
                <div className="h-6 bg-neutral-200 rounded-lg w-1/3 mb-4" />
                <div className="h-4 bg-neutral-200 rounded-lg w-1/4 mb-2" />
                <div className="h-4 bg-neutral-200 rounded-lg w-1/5" />
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse border-spacing-y-2">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50/50">
                  <th className="p-4 pl-6 w-12 text-neutral-500 font-bold text-sm">No.</th>
                  <th className="p-4 text-neutral-500 font-bold text-sm">Property</th>
                  <th className="p-4 text-neutral-500 font-bold text-sm">Location</th>
                  <th className="p-4 text-neutral-500 font-bold text-sm">Category</th>
                  <th className="p-4 text-neutral-500 font-bold text-sm">Price</th>
                  <th className="p-4 text-neutral-500 font-bold text-sm">Rating</th>
                  <th className="p-4 text-neutral-500 font-bold text-sm">Status</th>
                  <th className="p-4 text-neutral-500 font-bold text-sm">Vacancy</th>
                </tr>
              </thead>
              <tbody>
                {displayListings.map((listing, index) => {
                  const { status, occupied, total } = propertyStats[index];

                  return (
                    <tr 
                      key={listing.id} 
                      className={`${index !== displayListings.length - 1 ? 'border-b border-neutral-50' : ''} hover:bg-neutral-50/50 transition-colors`}
                    >
                      <td className="p-4 pl-6 text-neutral-500 font-medium">{index + 1}</td>
                      <td className="p-4 font-bold text-[#0A2B4E] whitespace-nowrap">{listing.title}</td>
                      <td className="p-4 text-neutral-500 font-medium whitespace-nowrap">{listing.location}</td>
                      <td className="p-4 text-neutral-500 font-medium whitespace-nowrap">{listing.category}</td>
                      <td className="p-4 font-medium text-neutral-600 whitespace-nowrap">₱{listing.price.toLocaleString()}</td>
                      <td className="p-4 font-medium whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Star size={14} className="text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-bold text-neutral-700">{listing.rating.toFixed(1)}</span>
                        </div>
                      </td>
                      <td className="p-4 font-medium whitespace-nowrap">
                        <span className={`px-2 py-1 rounded text-xs font-bold capitalize ${
                          status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {status}
                        </span>
                      </td>
                      <td className="p-4 font-medium whitespace-nowrap">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          occupied === total ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {occupied}/{total}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        </div>
      </div>

      <BottomNav />
      <CreateListingModal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
        onSuccess={fetchMyListings}
      />
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import { X, Star, BadgeCheck } from 'lucide-react';
import { Modal } from './ui/Modal';
import { HostInfo, Listing } from '../types';
import { getListings } from '../lib/api/listings';
import { useNavigate } from 'react-router-dom';

interface LandlordListingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  host: HostInfo;
  currentListingId?: string;
}

export const LandlordListingsModal: React.FC<LandlordListingsModalProps> = ({
  isOpen,
  onClose,
  host,
  currentListingId,
}) => {
  const navigate = useNavigate();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    getListings().then(({ data }) => {
      const filtered = (data || []).filter(
        (l) => l.host?.name === host.name
      );
      setListings(filtered);
      setLoading(false);
    });
  }, [isOpen, host.name, currentListingId]);

  const handleListingClick = (id: string) => {
    onClose();
    navigate(`/listing/${id}`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      title="All Listings"
      bodyClassName="p-0"
    >
      {/* Landlord Info */}
      <div className="flex items-center gap-4 px-6 py-5 border-b border-neutral-100">
        <img
          src={host.image}
          alt={host.name}
          loading="lazy"
          decoding="async"
          className="w-14 h-14 rounded-full object-cover ring-3 ring-neutral-100"
        />
        <div className="flex-1">
          <h3 className="text-base font-bold text-[#17294F] flex items-center gap-1.5">
            {host.name} <BadgeCheck size={16} className="text-[#2252D6]" />
          </h3>
          <p className="text-xs text-neutral-500 font-medium">Landlord</p>
        </div>
        <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-full">
          <Star size={14} className="fill-amber-400 text-amber-400" />
          <span className="text-sm font-bold text-neutral-900">{host.rating}</span>
          <span className="text-xs text-neutral-500">({host.reviews})</span>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="px-6 py-5">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] bg-neutral-100 rounded-xl mb-3" />
                <div className="h-4 bg-neutral-100 rounded w-3/4 mb-2" />
                <div className="h-3 bg-neutral-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-neutral-500 text-sm">No other listings from this landlord.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {listings.map((listing) => (
              <div
                key={listing.id}
                onClick={() => handleListingClick(listing.id)}
                className="cursor-pointer bg-white rounded-xl border border-neutral-100 overflow-hidden group"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    loading="lazy"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-sm rounded-full text-white text-[10px] font-bold">
                    {listing.date}
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="font-bold text-sm text-[#17294F] truncate">{listing.title}</h4>
                  <p className="text-xs text-neutral-500 truncate mt-0.5">{listing.location}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-[#17294F]">₱{listing.price.toLocaleString()}<span className="text-neutral-400 font-normal text-xs">/mo</span></span>
                    <div className="flex items-center gap-1">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span className="text-xs font-bold">{listing.rating.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

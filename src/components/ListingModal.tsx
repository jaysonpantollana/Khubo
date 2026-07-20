// @context: Listing modal — landlord profile and contact
// @purpose: Shows landlord info, social media, contact details, and "Contact Owner" button
// @behavior: Replaces calendar with landlord profile section
// @dependencies: lucide-react, HostInfo type

import React, { useState } from 'react';
import { X, Star, BadgeCheck, Instagram, Facebook, Twitter, Phone, Mail, MessageCircle, Copy, Check } from 'lucide-react';
import { HostInfo } from '../types';
import { FocusTrap } from './ui/FocusTrap';

interface ListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  host?: HostInfo;
  onAuthRequired?: () => void;
  onContactOwner?: () => void;
}

export const ListingModal: React.FC<ListingModalProps> = ({
  isOpen,
  onClose,
  host,
  onAuthRequired,
  onContactOwner,
}) => {
  const [copiedContact, setCopiedContact] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedContact(type);
    setTimeout(() => setCopiedContact(null), 1500);
  };

  const handleContact = () => {
    if (onAuthRequired) {
      onAuthRequired();
      return;
    }
    onContactOwner?.();
    onClose();
  };

  const defaultHost: HostInfo = {
    name: 'Layla M. Santos',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Layla88',
    reviews: 35,
    rating: 5.0,
    hostingDuration: '2 years',
    work: 'Property Manager',
    location: 'Iligan City',
    tenantCount: 12,
  };

  const landlord = host || defaultHost;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <FocusTrap
        onClose={onClose}
        ariaLabel="Landlord Profile"
        className="relative bg-white w-full max-w-[380px] md:max-w-[460px] rounded-2xl md:rounded-[2rem] shadow-2xl overflow-hidden p-5 md:p-7 max-h-[85vh] overflow-y-auto"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl md:text-2xl font-extrabold text-[#17294F]">Landlord Profile</h2>
          <button
            onClick={onClose}
            className="p-2 g-neutral-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Landlord Info */}
        <div className="flex items-center gap-4 mb-5">
          <img
            src={landlord.image}
            alt={landlord.name}
            loading="lazy"
            decoding="async"
            className="w-16 h-16 rounded-full object-cover ring-4 ring-neutral-100"
          />
          <div>
            <h3 className="text-lg font-bold text-[#17294F] flex items-center gap-1.5">
              {landlord.name} <BadgeCheck size={16} className="text-[#2252D6]" />
            </h3>
            <p className="text-xs text-neutral-500 font-medium">Landlord</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-5 py-4 border-y border-neutral-100">
          <div className="text-center">
            <div className="font-bold text-lg text-[#17294F] flex items-center justify-center gap-1">
              {landlord.rating} <Star size={12} className="fill-[#17294F] text-[#17294F]" />
            </div>
            <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">Rating</span>
          </div>
          <div className="text-center border-x border-neutral-100">
            <div className="font-bold text-lg text-[#17294F]">{landlord.reviews}</div>
            <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">Reviews</span>
          </div>
          <div className="text-center">
            <div className="font-bold text-lg text-[#17294F]">{landlord.tenantCount || 0}</div>
            <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">Tenants</span>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mb-5">
          <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">Contact</h4>
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-3 p-2.5 bg-neutral-50 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-[#17294F]/10 flex items-center justify-center">
                <Phone size={14} className="text-[#17294F]" />
              </div>
              <span className="text-sm font-bold text-[#17294F] flex-1">+63 912 345 6789</span>
              <button
                onClick={() => copyToClipboard('+639123456789', 'Phone')}
                className="p-1.5 g-neutral-200 rounded-lg transition-colors text-neutral-500 ext-[#17294F]"
              >
                {copiedContact === 'Phone' ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
              </button>
            </div>
            <div className="flex items-center gap-3 p-2.5 bg-neutral-50 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-[#17294F]/10 flex items-center justify-center">
                <Mail size={14} className="text-[#17294F]" />
              </div>
              <span className="text-sm font-bold text-[#17294F] flex-1">layla@khubo.com</span>
              <button
                onClick={() => copyToClipboard('layla@khubo.com', 'Email')}
                className="p-1.5 g-neutral-200 rounded-lg transition-colors text-neutral-500 ext-[#17294F]"
              >
                {copiedContact === 'Email' ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
              </button>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">Social Media</h4>
          <div className="flex gap-2">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-xs font-bold">
              <Instagram size={14} />
              Instagram
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 bg-[#1877F2] text-white rounded-xl text-xs font-bold">
              <Facebook size={14} />
              Facebook
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 bg-black text-white rounded-xl text-xs font-bold">
              <Twitter size={14} />
              Twitter
            </a>
          </div>
        </div>

        {/* Contact Button */}
        <button
          onClick={handleContact}
          className="w-full py-3 bg-[#17294F] text-white text-sm font-bold rounded-xl shadow-lg g-[#1e3566] transition flex items-center justify-center gap-2"
        >
          <MessageCircle size={18} />
          Contact Owner
        </button>
      </FocusTrap>
    </div>
  );
};

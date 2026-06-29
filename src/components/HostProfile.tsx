// @context: Host profile card — displayed on listing detail page
// @purpose: Shows host avatar, name, rating, review count, hosting duration, work, location; message button
// @behavior: Displays host stats inline; "Message host" button triggers onMessageClick callback
// @dependencies: lucide-react (Star, MessageCircle, BadgeCheck)

import React from 'react';
import { Star, BadgeCheck } from 'lucide-react';

interface HostProfileProps {
  name: string;
  image: string;
  reviews: number;
  rating: number;
  hostingDuration: string;
  tenantCount: number;
}

const HostProfile: React.FC<HostProfileProps> = ({
  name,
  image,
  reviews,
  rating,
  hostingDuration,
  tenantCount,
}) => {
  return (
    <div className="py-10 border-t border-neutral-100 mt-6">
      <h2 className="text-2xl font-bold font-display text-[#17294F] mb-8">
        Meet your landlord
      </h2>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        <div className="flex w-full md:w-1/2 flex-col">
          <div className="flex items-center gap-5 mb-8">
              <img src={image} loading="lazy" alt={name} className="w-16 h-16 rounded-full object-cover bg-neutral-100 ring-4 ring-neutral-50 shadow-sm" />
             <div>
                <h3 className="text-xl font-bold text-[#17294F] flex items-center gap-1.5 font-display">
                  {name} <BadgeCheck size={18} className="text-[#2252D6]" />
                </h3>
                <p className="text-[13px] text-neutral-500 font-medium mt-0.5">Landlord</p>
             </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-5 border-y border-neutral-100 mb-8">
             <div className="flex flex-col">
                <span className="font-bold text-xl text-[#17294F]">{reviews}</span>
                <span className="text-xs font-semibold text-neutral-400 mt-1 uppercase tracking-wider">Reviews</span>
             </div>
             <div className="flex flex-col border-l border-neutral-100 pl-4 sm:pl-6">
                <span className="font-bold text-xl text-[#17294F] flex items-center gap-1">{rating} <Star size={14} className="fill-[#17294F] text-[#17294F] pb-0.5" /></span>
                <span className="text-xs font-semibold text-neutral-400 mt-1 uppercase tracking-wider">Rating</span>
             </div>
             <div className="flex flex-col sm:border-l border-neutral-100 sm:pl-6 pt-4 sm:pt-0">
                <span className="font-bold text-xl text-[#17294F]">{hostingDuration.split(' ')[0]}</span>
                <span className="text-xs font-semibold text-neutral-400 mt-1 uppercase tracking-wider">
                  {hostingDuration.split(' ').slice(1).join(' ')} hosting
                </span>
             </div>
             <div className="flex flex-col border-l border-neutral-100 pl-4 sm:pl-6 pt-4 sm:pt-0">
                <span className="font-bold text-xl text-[#17294F]">{tenantCount}</span>
                <span className="text-xs font-semibold text-neutral-400 mt-1 uppercase tracking-wider">Tenants</span>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HostProfile;

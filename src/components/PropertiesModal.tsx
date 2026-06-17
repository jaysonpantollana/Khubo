import React, { useMemo } from 'react';
import { X, Building } from 'lucide-react';
import { Listing } from '../types';
import { Modal } from './ui/Modal';

interface PropertiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  listings: Listing[];
}

const statuses = ['Active', 'Review', 'Maintenance'];

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

export function PropertiesModal({ isOpen, onClose, listings }: PropertiesModalProps) {
  const propertyStats = useMemo(() =>
    listings.map((_, index) => {
      const occupied = Math.floor(seededRandom(index * 2) * 10);
      const total = occupied + Math.floor(seededRandom(index * 2 + 1) * 5) + 1;
      return { status: statuses[index % 3], occupied, total };
    }),
    [listings]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-5xl" className="h-[80vh] flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-neutral-100 shrink-0">
              <h2 className="text-xl font-bold text-neutral-900">Properties</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-500 hover:text-neutral-900"
              >
                <X size={20} />
              </button>
          </div>

          <div className="flex flex-col p-6 flex-1 overflow-hidden h-full">
            <div className="bg-neutral-50 rounded-2xl p-4 md:p-6 mb-6 shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-1">Total Properties</h3>
                  <div className="text-3xl lg:text-4xl font-black tracking-tight text-[#17294F]">
                    {listings.length}
                  </div>
                </div>
                <div className="p-4 bg-white shadow-sm rounded-xl border border-neutral-100">
                  <Building size={32} strokeWidth={1.5} className="text-[#17294F]" />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto w-full h-full bg-white">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-50 bg-white">
                    <th className="py-6 px-4 pl-6 w-12 text-neutral-500 font-bold text-sm whitespace-nowrap">
                      No.
                    </th>
                    <th className="py-6 px-4 text-neutral-500 font-bold text-sm whitespace-nowrap">Property</th>
                    <th className="py-6 px-4 text-neutral-500 font-bold text-sm whitespace-nowrap">Location</th>
                    <th className="py-6 px-4 text-neutral-500 font-bold text-sm whitespace-nowrap">Price</th>
                    <th className="py-6 px-4 text-neutral-500 font-bold text-sm whitespace-nowrap">Status</th>
                    <th className="py-6 px-4 text-neutral-500 font-bold text-sm whitespace-nowrap">Vacancy</th>
                  </tr>
                </thead>
                <tbody>
                  {listings.map((listing, index) => {
                    const { status, occupied, total } = propertyStats[index];
                    
                    return (
                      <tr 
                        key={listing.id} 
                        className={`hover:bg-neutral-50/50 transition-colors border-b border-neutral-50 last:border-0`}
                      >
                        <td className="py-6 px-4 pl-6 text-neutral-500 font-medium whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="py-6 px-4 font-bold text-[#17294F] min-w-[200px] text-base whitespace-nowrap">
                          {listing.title}
                        </td>
                        <td className="py-6 px-4 text-neutral-500 font-medium whitespace-nowrap">
                          {listing.location}
                        </td>
                        <td className="py-6 px-4 font-medium text-neutral-600 whitespace-nowrap">
                          ₱{listing.price.toLocaleString()}
                        </td>
                        <td className="py-6 px-4 font-medium whitespace-nowrap">
                          {status === 'Active' && (
                             <span className="px-2.5 py-1 rounded bg-green-100/80 text-green-700 text-[13px] font-bold tracking-tight">
                               Active
                             </span>
                          )}
                          {status === 'Maintenance' && (
                             <span className="px-2.5 py-1 rounded bg-orange-100/80 text-orange-700 text-[13px] font-bold tracking-tight">
                               Maintenance
                             </span>
                          )}
                          {status === 'Review' && (
                             <span className="px-2.5 py-1 rounded bg-blue-100/80 text-blue-700 text-[13px] font-bold tracking-tight">
                               Review
                             </span>
                          )}
                        </td>
                        <td className="py-6 px-4">
                          <div className="flex items-center gap-2">
                             <span className="px-2.5 py-1 rounded bg-green-100/80 text-green-700 text-[13px] font-bold tracking-tight whitespace-nowrap">
                               {occupied}/{total} Occupied
                             </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {listings.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-12 px-4 text-center text-neutral-400">
                        No properties listed yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
    </Modal>
  );
}

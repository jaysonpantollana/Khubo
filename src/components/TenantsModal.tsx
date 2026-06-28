// @context: Tenants modal — property tenant management
// @purpose: Shows list of current tenants with room, payment status, tenancy status, contact info
// @behavior: Static mock data with status badges (Paid/Review/Pending/Draft) and tenancy status indicators
// @behavior: Each row shows client name, room number, email, payment status, and tenancy status
// @dependencies: motion, lucide-react
// @known-issues: All tenant data is static mock; no edit/action functionality

import React, { useState } from 'react';

import { X, Phone, Plus } from 'lucide-react';
import { FocusTrap } from './ui/FocusTrap';

interface TenantsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const tenants = [
  { id: 1, client: 'North Studio', room: '101', status: 'Active', tenancyStatus: 'Staying', email: 'billing@northstudio.co', phone: '+1 (555) 234-5678', social: { instagram: 'https://instagram.com/northstudio', x: 'https://x.com/northstudio', facebook: 'https://facebook.com/northstudio' } },
  { id: 2, client: 'Atlas Works', room: '102', status: 'Inactive', tenancyStatus: 'Leaving', email: 'accounts@atlasworks.io', phone: '+1 (555) 345-6789', social: { instagram: 'https://instagram.com/atlasworks', x: 'https://x.com/atlasworks', facebook: 'https://facebook.com/atlasworks' } },
  { id: 3, client: 'Paper Trail', room: '201', status: 'Inactive', tenancyStatus: 'Moved out', email: 'hello@papertrail.design', phone: '+1 (555) 456-7890', social: { instagram: 'https://instagram.com/papertrail', x: 'https://x.com/papertrail', facebook: 'https://facebook.com/papertrail' } },
  { id: 4, client: 'Luma Team', room: '205', status: 'Active', tenancyStatus: 'Staying', email: 'finance@luma.team', phone: '+1 (555) 567-8901', social: { instagram: 'https://instagram.com/lumateam', x: 'https://x.com/lumateam', facebook: 'https://facebook.com/lumateam' } },
  { id: 5, client: 'Mono Labs', room: '302', status: 'Active', tenancyStatus: 'Staying', email: 'ops@monolabs.dev', phone: '+1 (555) 678-9012', social: { instagram: 'https://instagram.com/monolabs', x: 'https://x.com/monolabs', facebook: 'https://facebook.com/monolabs' } },
];

const roomTags = [...new Set(tenants.map(t => t.room))];

export function TenantsModal({ isOpen, onClose }: TenantsModalProps) {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [additionalRooms, setAdditionalRooms] = useState<string[]>([]);
  const [isAddingRoom, setIsAddingRoom] = useState(false);
  const [newRoomValue, setNewRoomValue] = useState('');

  const allRoomTags = [...new Set([...roomTags, ...additionalRooms])];

  if (!isOpen) return null;

  const filteredTenants = selectedRoom
    ? tenants.filter(t => t.room === selectedRoom)
    : tenants;

  return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <div onClick={(e) => e.stopPropagation()} className="flex items-center justify-center">
        <FocusTrap
          onClose={onClose}
          ariaLabel="Tenants"
          className="relative w-full max-w-5xl h-[80vh] bg-white rounded-[2rem] overflow-hidden shadow-2xl z-10 flex flex-col"
        >
          <div className="flex items-center justify-between p-6 border-b border-neutral-100 shrink-0">
              <h2 className="text-xl font-bold text-neutral-900">Tenants</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {}}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#17294F] text-white text-xs font-bold rounded-full hover:bg-[#1a3058] transition-colors"
                >
                  <Plus size={16} />
                  Add Tenant
                </button>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-500 hover:text-neutral-900"
                >
                  <X size={20} />
                </button>
              </div>
          </div>

          <div className="p-6 flex-1 overflow-y-auto flex flex-col">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <button
                onClick={() => setSelectedRoom(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  selectedRoom === null
                    ? 'bg-[#17294F] text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                All Rooms
              </button>
              {allRoomTags.map(room => (
                <button
                  key={room}
                  onClick={() => setSelectedRoom(room)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                    selectedRoom === room
                      ? 'bg-[#17294F] text-white'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  Room {room}
                </button>
              ))}
              {isAddingRoom ? (
                <input
                  autoFocus
                  type="text"
                  value={newRoomValue}
                  onChange={(e) => setNewRoomValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newRoomValue.trim()) {
                      const val = newRoomValue.trim();
                      if (!allRoomTags.includes(val)) {
                        setAdditionalRooms(prev => [...prev, val]);
                      }
                      setNewRoomValue('');
                      setIsAddingRoom(false);
                    } else if (e.key === 'Escape') {
                      setNewRoomValue('');
                      setIsAddingRoom(false);
                    }
                  }}
                  onBlur={() => {
                    setNewRoomValue('');
                    setIsAddingRoom(false);
                  }}
                  placeholder="Room #"
                  className="px-3 py-1.5 rounded-full text-xs font-bold border-2 border-[#17294F] outline-none w-24 bg-white text-neutral-700"
                />
              ) : (
                <button
                  onClick={() => setIsAddingRoom(true)}
                  className="px-3 py-1.5 rounded-full text-xs font-bold transition-colors border-2 border-dashed border-neutral-300 text-neutral-500 hover:border-[#17294F] hover:text-[#17294F]"
                >
                  + Add Room
                </button>
              )}
            </div>
            <div className="overflow-x-auto w-full p-1 flex-1">
              <table className="w-full text-left border-collapse border-spacing-y-2">
                <thead>
                  <tr className="border-b border-neutral-100 bg-neutral-50/50">
                    <th className="p-4 pl-6 whitespace-nowrap text-neutral-500 font-bold text-sm">Client</th>
                    <th className="p-4 whitespace-nowrap text-neutral-500 font-bold text-sm">Room No.</th>
                    <th className="p-4 whitespace-nowrap text-neutral-500 font-bold text-sm">Status</th>
                    <th className="p-4 whitespace-nowrap text-neutral-500 font-bold text-sm">Tenancy</th>
                    <th className="p-4 whitespace-nowrap text-neutral-500 font-bold text-sm">Email</th>
                    <th className="p-4 whitespace-nowrap text-neutral-500 font-bold text-sm">Phone</th>
                    <th className="p-4 whitespace-nowrap text-neutral-500 font-bold text-sm">Social</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTenants.length > 0 ? (
                    filteredTenants.map((tenant, index) => (
                      <tr 
                        key={tenant.id} 
                        className={`${index !== filteredTenants.length - 1 ? 'border-b border-neutral-50' : ''} hover:bg-neutral-50/50 transition-colors`}
                      >
                        <td className="p-4 pl-6 whitespace-nowrap font-bold text-[#0A2B4E]">{tenant.client}</td>
                        <td className="p-4 whitespace-nowrap text-neutral-500 font-bold">{tenant.room}</td>
                        <td className="p-4 text-neutral-500 font-medium whitespace-nowrap">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            tenant.status === 'Active' ? 'bg-green-100 text-green-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {tenant.status}
                          </span>
                        </td>
                        <td className="p-4 text-neutral-500 font-medium whitespace-nowrap">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            tenant.tenancyStatus === 'Staying' ? 'bg-green-100 text-green-700' :
                            tenant.tenancyStatus === 'Leaving' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {tenant.tenancyStatus}
                          </span>
                        </td>
                        <td className="p-4 whitespace-nowrap text-neutral-500 font-medium">{tenant.email}</td>
                        <td className="p-4 whitespace-nowrap text-neutral-500 font-medium">
                          <span className="flex items-center gap-1.5">
                            <Phone size={14} className="text-neutral-400" />
                            {tenant.phone}
                          </span>
                        </td>
                        <td className="p-4 whitespace-nowrap font-medium">
                          <div className="flex items-center gap-3">
                            <a href={tenant.social.instagram} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-pink-500 transition-colors">
                              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                            </a>
                            <a href={tenant.social.x} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-black transition-colors">
                              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                            </a>
                            <a href={tenant.social.facebook} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-blue-600 transition-colors">
                              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-neutral-400 font-medium">
                        No tenants found for this room
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </FocusTrap>
        </div>
      </div>
  );
}

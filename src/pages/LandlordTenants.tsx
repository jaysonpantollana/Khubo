// @context: Landlord Tenants page — full-page tenant management
// @purpose: Shows list of current tenants with room, payment status, tenancy status, contact info
// @behavior: Static mock data with status badges (Paid/Unpaid) and tenancy status indicators
// @behavior: Each row shows client name, room number, email, payment status, and tenancy status
// @dependencies: lucide-react, useNavigate

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Copy, Phone, Plus, Check, Pencil } from 'lucide-react';
import { AddTenantModal } from '../components/AddTenantModal';
import { EditTenantModal } from '../components/EditTenantModal';
import type { SocialLink } from '../components/tenantSchemas';
import ConfirmDialog from '../components/ConfirmDialog';

const initialTenants = [
  { id: 1, client: 'North Studio', room: '101', property: 'Main Building', balance: 'Paid', tenancyStatus: 'Staying', email: 'billing@northstudio.co', phone: '+1 (555) 234-5678', social: { instagram: 'https://instagram.com/northstudio', x: 'https://x.com/northstudio', facebook: 'https://facebook.com/northstudio' } },
  { id: 2, client: 'Atlas Works', room: '102', property: 'Main Building', balance: 'Unpaid', tenancyStatus: 'Leaving', email: 'accounts@atlasworks.io', phone: '+1 (555) 345-6789', social: { instagram: 'https://instagram.com/atlasworks', x: 'https://x.com/atlasworks', facebook: 'https://facebook.com/atlasworks' } },
  { id: 3, client: 'Paper Trail', room: '201', property: 'East Wing', balance: 'Unpaid', tenancyStatus: 'Moved out', email: 'hello@papertrail.design', phone: '+1 (555) 456-7890', social: { instagram: 'https://instagram.com/papertrail', x: 'https://x.com/papertrail', facebook: 'https://facebook.com/papertrail' } },
  { id: 4, client: 'Luma Team', room: '205', property: 'East Wing', balance: 'Paid', tenancyStatus: 'Staying', email: 'finance@luma.team', phone: '+1 (555) 567-8901', social: { instagram: 'https://instagram.com/lumateam', x: 'https://x.com/lumateam', facebook: 'https://facebook.com/lumateam' } },
  { id: 5, client: 'Mono Labs', room: '302', property: 'North Tower', balance: 'Paid', tenancyStatus: 'Staying', email: 'ops@monolabs.dev', phone: '+1 (555) 678-9012', social: { instagram: 'https://instagram.com/monolabs', x: 'https://x.com/monolabs', facebook: 'https://facebook.com/monolabs' } },
];

const propertyTags = [...new Set(initialTenants.map(t => t.property))];

export default function LandlordTenants() {
  const navigate = useNavigate();
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [additionalProperties, setAdditionalProperties] = useState<string[]>([]);
  const [isAddingRoom, setIsAddingRoom] = useState(false);
  const [newRoomValue, setNewRoomValue] = useState('');
  const [isAddTenantOpen, setIsAddTenantOpen] = useState(false);
  const [tenants, setTenants] = useState(initialTenants);
  const [confirmBalance, setConfirmBalance] = useState<{ id: number; newStatus: string } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingTenant, setEditingTenant] = useState<typeof initialTenants[number] | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  useEffect(() => {
    document.title = "Tenants | Khubo";
  }, []);

  const allPropertyTags = [...new Set([...propertyTags, ...additionalProperties])];

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
  };

  const toggleBalance = (id: number) => {
    const tenant = tenants.find((t) => t.id === id);
    if (!tenant) return;
    const newStatus = tenant.balance === 'Paid' ? 'Unpaid' : 'Paid';
    setConfirmBalance({ id, newStatus });
  };

  const confirmToggleBalance = () => {
    if (!confirmBalance) return;
    setTenants((prev) =>
      prev.map((t) =>
        t.id === confirmBalance.id ? { ...t, balance: confirmBalance.newStatus } : t
      )
    );
    setConfirmBalance(null);
  };

  const startEditing = (id: number) => {
    const tenant = tenants.find(t => t.id === id);
    if (tenant) setEditingTenant(tenant);
  };

  const saveEditing = (id: number, data: { client: string; room: string; email: string; phone: string; social: { instagram: string; x: string; facebook: string } }) => {
    setTenants(prev => prev.map(t => t.id === id ? { ...t, ...data } : t));
  };

  const handleAddTenant = (data: { name: string; email: string; phone: string; room: string; property: string; socialLinks: SocialLink[] }) => {
    const social = { instagram: '', x: '', facebook: '' };
    data.socialLinks.forEach(link => {
      if (link.platform === 'Instagram') social.instagram = link.url;
      else if (link.platform === 'X') social.x = link.url;
      else if (link.platform === 'Facebook') social.facebook = link.url;
    });
    const newTenant = {
      id: Date.now(),
      client: data.name,
      room: data.room,
      property: data.property,
      balance: 'Unpaid',
      tenancyStatus: 'Staying',
      email: data.email,
      phone: data.phone,
      social,
    };
    setTenants(prev => [...prev, newTenant]);
  };

  const filteredTenants = selectedProperty
    ? tenants.filter(t => t.property === selectedProperty)
    : tenants;

  return (
    <div className="h-screen flex flex-col bg-[#F9F9F9]">
      <div className="bg-white border-b border-neutral-100 shrink-0">
        <div className="max-w-[2520px] mx-auto xl:px-12 md:px-12 sm:px-4 px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/profile')}
            className="p-2 g-neutral-100 rounded-full transition-colors text-neutral-600 ext-neutral-900"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-neutral-900">Tenants</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[2520px] mx-auto xl:px-12 md:px-12 sm:px-4 px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="relative flex items-center flex-1 min-w-0">
              {!isAddTenantOpen && (
                <>
                  <button
                    onClick={scrollLeft}
                    className="absolute left-0 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white/90 border border-neutral-200 shadow-sm g-neutral-50 transition-colors text-neutral-600"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={scrollRight}
                    className="absolute right-0 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white/90 border border-neutral-200 shadow-sm g-neutral-50 transition-colors text-neutral-600"
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}
              <div
                ref={scrollContainerRef}
                className="flex items-center gap-2 overflow-x-auto flex-nowrap no-scrollbar px-10"
              >
                <button
                  onClick={() => setSelectedProperty(null)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors shrink-0 ${
                    selectedProperty === null
                      ? 'bg-[#17294F] text-white'
                      : 'bg-neutral-100 text-neutral-600 g-neutral-200'
                  }`}
                >
                  All Properties
                </button>
                {allPropertyTags.map(prop => (
                  <button
                    key={prop}
                    onClick={() => setSelectedProperty(prop)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors shrink-0 ${
                      selectedProperty === prop
                        ? 'bg-[#17294F] text-white'
                        : 'bg-neutral-100 text-neutral-600 g-neutral-200'
                    }`}
                  >
                    {prop}
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
                        if (!allPropertyTags.includes(val)) {
                          setAdditionalProperties(prev => [...prev, val]);
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
                    placeholder="Property name"
                    className="px-3 py-1.5 rounded-full text-xs font-bold border-2 border-[#17294F] outline-none w-36 bg-white text-neutral-700 shrink-0"
                  />
                ) : (
                  <button
                    onClick={() => setIsAddingRoom(true)}
                    className="px-3 py-1.5 rounded-full text-xs font-bold transition-colors border-2 border-dashed border-neutral-300 text-neutral-500 order-[#17294F] ext-[#17294F] shrink-0"
                  >
                    + Add Property
                  </button>
                )}
              </div>
            </div>
            <button
              onClick={() => setIsAddTenantOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#17294F] text-white text-sm font-bold rounded-full g-[#1a3058] transition-colors shrink-0"
            >
              <Plus size={16} />
              Add Tenant
            </button>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse border-spacing-y-2">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50/50">
                  <th className="p-4 pl-6 whitespace-nowrap text-neutral-500 font-bold text-sm">Client</th>
                  <th className="p-4 whitespace-nowrap text-neutral-500 font-bold text-sm">Room No.</th>
                  <th className="p-4 whitespace-nowrap text-neutral-500 font-bold text-sm">Property</th>
                  <th className="p-4 whitespace-nowrap text-neutral-500 font-bold text-sm">Email</th>
                  <th className="p-4 whitespace-nowrap text-neutral-500 font-bold text-sm">Phone</th>
                  <th className="p-4 whitespace-nowrap text-neutral-500 font-bold text-sm">Social</th>
                  <th className="p-4 whitespace-nowrap text-neutral-500 font-bold text-sm">Actions</th>
                  <th className="p-4 whitespace-nowrap text-neutral-500 font-bold text-sm">Balance</th>
                </tr>
              </thead>
              <tbody>
                {filteredTenants.length > 0 ? (
                  filteredTenants.map((tenant, index) => (
                    <tr 
                      key={tenant.id} 
                      className={`${index !== filteredTenants.length - 1 ? 'border-b border-neutral-50' : ''} hover:bg-neutral-50/50 transition-colors`}
                    >
                      <td className="p-4 pl-6 whitespace-nowrap font-bold text-[#0A2B4E]">
                        {tenant.client}
                      </td>
                      <td className="p-4 whitespace-nowrap text-neutral-500 font-bold">
                        {tenant.room}
                      </td>
                      <td className="p-4 whitespace-nowrap text-neutral-500 font-medium">
                        {tenant.property}
                      </td>
                      <td className="p-4 whitespace-nowrap text-neutral-500 font-medium">
                        <span className="flex items-center gap-1.5">
                          {tenant.email}
                          <button
                            onClick={() => copyToClipboard(tenant.email, `email-${tenant.id}`)}
                            className="p-1 hover:bg-neutral-100 rounded transition-colors text-neutral-400 hover:text-neutral-600"
                          >
                            {copiedId === `email-${tenant.id}` ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                          </button>
                        </span>
                      </td>
                      <td className="p-4 whitespace-nowrap text-neutral-500 font-medium">
                        <span className="flex items-center gap-1.5">
                          <Phone size={14} className="text-neutral-400" />
                          {tenant.phone}
                          <button
                            onClick={() => copyToClipboard(tenant.phone, `phone-${tenant.id}`)}
                            className="p-1 hover:bg-neutral-100 rounded transition-colors text-neutral-400 hover:text-neutral-600"
                          >
                            {copiedId === `phone-${tenant.id}` ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                          </button>
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
                      <td className="p-4 whitespace-nowrap font-medium">
                        <button
                          onClick={() => startEditing(tenant.id)}
                          className="p-1.5 rounded text-neutral-400 hover:text-[#17294F] hover:bg-neutral-100 transition-colors"
                          title="Edit tenant"
                        >
                          <Pencil size={16} />
                        </button>
                      </td>
                      <td className="p-4 text-neutral-500 font-medium whitespace-nowrap">
                        <button
                          onClick={() => toggleBalance(tenant.id)}
                          className={`px-2 py-1 rounded text-xs font-bold cursor-pointer transition-colors ${
                            tenant.balance === 'Paid' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-red-100 text-red-700 hover:bg-red-200'
                          }`}
                        >
                          {tenant.balance}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-neutral-400 font-medium">
                      No tenants found for this property
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddTenantModal
        isOpen={isAddTenantOpen}
        onClose={() => setIsAddTenantOpen(false)}
        onSuccess={handleAddTenant}
      />
      <EditTenantModal
        isOpen={!!editingTenant}
        onClose={() => setEditingTenant(null)}
        tenant={editingTenant}
        onSave={saveEditing}
      />
      <ConfirmDialog
        isOpen={!!confirmBalance}
        onClose={() => setConfirmBalance(null)}
        onConfirm={confirmToggleBalance}
        title="Update Balance"
        message={`Are you sure you want to change this tenant's balance to ${confirmBalance?.newStatus}?`}
      />
    </div>
  );
}
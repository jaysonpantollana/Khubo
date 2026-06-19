// @context: Announcements overlay — app news and updates
// @purpose: Modal overlay displaying MOCK_ANNOUNCEMENTS with title, message, date, and "New" badge
// @behavior: Animated entrance/exit via AnimatePresence; backdrop click to close
// @dependencies: motion, lucide-react

import React from 'react';

import { X, Megaphone } from 'lucide-react';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface AnnouncementsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const MOCK_ANNOUNCEMENTS = [
  {
    id: 1,
    title: "Welcome to Khubo!",
    message: "We are excited to have you on board. Start exploring properties today.",
    date: "2026-06-01",
    isNew: true
  },
  {
    id: 2,
    title: "New feature: Maps Search",
    message: "You can now search for properties and roommates directly on the map view.",
    date: "2026-05-28",
    isNew: false
  }
];

export function AnnouncementsOverlay({ isOpen, onClose }: AnnouncementsOverlayProps) {
  useBodyScrollLock(isOpen);
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <div
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl z-10 overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="flex items-center justify-between p-6 border-b border-neutral-100 shrink-0">
              <h3 className="text-xl font-bold font-display flex items-center gap-2">
                <Megaphone size={24} className="text-black" />
                Announcements
              </h3>
              <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4 bg-neutral-50">
              {MOCK_ANNOUNCEMENTS.map((announcement) => (
                <div key={announcement.id} className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm relative overflow-hidden">
                  {announcement.isNew && (
                    <div className="absolute top-0 right-0">
                       <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg uppercase tracking-wider">New</span>
                    </div>
                  )}
                  <h4 className="text-base font-bold text-neutral-900 mb-1 pr-8">{announcement.title}</h4>
                  <p className="text-neutral-600 text-sm leading-relaxed mb-3">{announcement.message}</p>
                  <p className="text-xs text-neutral-400 font-medium">{new Date(announcement.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

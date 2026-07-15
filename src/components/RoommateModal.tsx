// @context: Roommate profile modal — full detail view
// @purpose: Displays full roommate profile: avatar, name, details, bio, budget, tags, social links
// @behavior: Opens as overlay modal with backdrop; shows all roommate fields
// @behavior: Social media link icons (Instagram, Twitter, Facebook) — currently non-functional
// @dependencies: motion, lucide-react, Roommate type

import React, { useState } from 'react';

import { X, MapPin, GraduationCap, Wallet, ShieldCheck, Instagram, Twitter, Facebook, Zap, Sparkles, Heart, Phone, Mail } from 'lucide-react';
import { Roommate } from '../types';
import { FocusTrap } from './ui/FocusTrap';

interface RoommateModalProps {
  roommate: Roommate | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function RoommateModal({ roommate, isOpen, onClose }: RoommateModalProps) {
  const [isSaved, setIsSaved] = useState(false);

  if (!roommate) return null;

  return (
    <>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] cursor-pointer"
          />

          {/* Modal Container */}
          <FocusTrap
            onClose={onClose}
            ariaLabel="Roommate Profile"
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-auto"
          >
            <div className="bg-[#F9F9F9] w-full max-w-lg md:max-w-3xl pointer-events-auto rounded-[40px] overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.2)] flex flex-col md:flex-row max-h-[90vh] relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-all active:scale-90 shadow-sm"
              >
                <X size={20} />
              </button>

              {/* Left Column: Image Area */}
              <div className="w-full md:w-[42%] h-[320px] md:h-auto relative">
                <img 
                  src={roommate.image} 
                  alt={roommate.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-blue-500 p-0.5 rounded-full">
                      <ShieldCheck size={10} className="text-white" />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest">Verified Resident</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-1.5">{roommate.name}</h2>
                  <div className="flex items-center gap-2.5 text-white/80 font-bold text-xs">
                    <div className="flex items-center gap-1.5">
                      <GraduationCap size={14} />
                      <span>{roommate.university}</span>
                    </div>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span>{roommate.age} yrs</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar bg-white rounded-t-[40px] md:rounded-t-none md:rounded-l-[40px] -mt-10 md:mt-0 relative z-10 p-6 md:p-10">
                <div className="max-w-2xl mx-auto space-y-8">
                  
                  {/* Bio Section */}
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles size={16} className="text-[#17294F]" />
                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#17294F] opacity-40">Personality</h3>
                    </div>
                    <p className="text-xl md:text-2xl font-medium text-neutral-800 leading-tight italic">
                      "{roommate.bio}"
                    </p>
                  </section>

                  {/* Vibe Tags */}
                  <section>
                    <div className="flex flex-wrap gap-1.5">
                      {roommate.tags.map((tag, idx) => (
                        <div 
                          key={idx}
                          className="px-3 py-1.5 sm:px-4 sm:py-2 bg-neutral-50 border border-neutral-100 rounded-full flex items-center gap-2 group hover:border-[#17294F]/30 hover:bg-white transition-all cursor-default whitespace-nowrap"
                        >
                          <Zap size={12} className="text-[#17294F] opacity-30 group-hover:opacity-100" />
                          <span className="text-[11px] sm:text-[13px] font-bold text-neutral-600 group-hover:text-[#17294F] tracking-tight">{tag}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Logistics Grid */}
                  <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-y border-neutral-100">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-red-500" />
                        <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400">Target Area</h4>
                      </div>
                      <p className="text-base font-black text-neutral-900">{roommate.preferredPlace}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Wallet size={16} className="text-green-600" />
                        <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400">Budget Range</h4>
                      </div>
                      <p className="text-base font-black text-neutral-900">{roommate.budgetRange} <span className="text-[10px] font-bold text-neutral-400">/ mo</span></p>
                    </div>
                  </section>

                  {/* Contact Info */}
                  {(roommate.phone || roommate.email) && (
                    <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-y border-neutral-100">
                      {!roommate.hidePhone && roommate.phone && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Phone size={16} className="text-blue-500" />
                            <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400">Phone Number</h4>
                          </div>
                          <p className="text-base font-black text-neutral-900">{roommate.phone}</p>
                        </div>
                      )}

                      {!roommate.hideEmail && roommate.email && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Mail size={16} className="text-purple-500" />
                            <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400">Email</h4>
                          </div>
                          <p className="text-base font-black text-neutral-900">{roommate.email}</p>
                        </div>
                      )}
                    </section>
                  )}

                  {/* Social & Connect */}
                  {!roommate.hideSocialLinks && (
                    <section className="flex flex-col md:flex-row items-center justify-between gap-6 pt-2">
                      <div className="space-y-4 w-full md:w-auto">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 text-center md:text-left">Social Identity</h3>
                        <div className="flex items-center justify-center md:justify-start gap-6">
                          <Instagram size={20} className="text-pink-500 cursor-pointer" />
                          <Twitter size={20} className="text-blue-400 cursor-pointer" />
                          <Facebook size={20} className="text-blue-600 cursor-pointer" />
                        </div>
                      </div>
                    </section>
                  )}

                  {/* Save Button */}
                  <section className="pt-2">
                    <button
                      onClick={() => setIsSaved(!isSaved)}
                      className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-xs uppercase tracking-[0.1em] transition-all shadow-md ${
                        isSaved ? "bg-white border-2 border-[#FF385C] text-[#FF385C]" : "bg-[#17294F] text-white"
                      }`}
                    >
                      <Heart size={16} className={isSaved ? "fill-[#FF385C] text-[#FF385C]" : "text-white"} />
                      <span>{isSaved ? 'Saved' : 'Save'}</span>
                    </button>
                  </section>

                </div>
              </div>
            </div>
          </FocusTrap>
        </>
      )}
    </>
  );
}

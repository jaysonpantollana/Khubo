// @context: Roommate profile modal — full detail view
// @purpose: Displays full roommate profile: avatar, name, details, bio, budget, tags, social links
// @behavior: Opens as overlay modal with backdrop; shows all roommate fields
// @behavior: Social media link icons (Instagram, Twitter, Facebook) — currently non-functional
// @dependencies: motion, lucide-react, Roommate type

import React, { useState, useCallback } from 'react';

import { X, MapPin, GraduationCap, Wallet, Instagram, Twitter, Facebook, Zap, Sparkles, Heart, Phone, Mail, Copy, Check } from 'lucide-react';
import { Roommate } from '../types';
import { FocusTrap } from './ui/FocusTrap';

interface RoommateModalProps {
  roommate: Roommate | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function RoommateModal({ roommate, isOpen, onClose }: RoommateModalProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [copiedField, setCopiedField] = useState<'phone' | 'email' | null>(null);

  const handleCopy = useCallback(async (text: string, field: 'phone' | 'email') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 1500);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 1500);
    }
  }, []);

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
                className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 g-neutral-100 ext-neutral-900 transition-all shadow-sm"
              >
                <X size={20} />
              </button>

              {/* Left Column: Image Area */}
              <div className="w-full md:w-[42%] h-[320px] md:h-auto relative">
                <img 
                  src={roommate.image} 
                  alt={roommate.name} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 text-white">
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
                <div className="max-w-2xl mx-auto space-y-6">
                  
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
                          className="px-3 py-1.5 sm:px-4 sm:py-2 bg-neutral-50 border border-neutral-100 rounded-full flex items-center gap-2 group order-[#17294F]/30 g-white transition-all cursor-default whitespace-nowrap"
                        >
                          <Zap size={12} className="text-[#17294F] opacity-30" />
                          <span className="text-[11px] sm:text-[13px] font-bold text-neutral-600 group-ext-[#17294F] tracking-tight">{tag}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Details Section — Logistics + Contact */}
                  <section className="border-y border-neutral-100 py-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Target Area */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-red-500" />
                          <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400">Target Area</h4>
                        </div>
                        <p className="text-sm font-bold text-neutral-900">{roommate.preferredPlace}</p>
                      </div>

                      {/* Budget Range */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Wallet size={14} className="text-green-600" />
                          <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400">Budget Range</h4>
                        </div>
                        <p className="text-sm font-bold text-neutral-900">{roommate.budgetRange} <span className="text-[10px] font-semibold text-neutral-400">/ mo</span></p>
                      </div>

                      {/* Phone Number */}
                      {!roommate.hidePhone && roommate.phone && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Phone size={14} className="text-blue-500" />
                            <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400">Phone Number</h4>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-bold text-neutral-900">{roommate.phone}</p>
                            <button
                              onClick={() => handleCopy(roommate.phone!, 'phone')}
                              className="p-1 rounded-md g-neutral-100 transition-colors text-neutral-400 ext-neutral-600"
                              title="Copy phone number"
                            >
                              {copiedField === 'phone' ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Email */}
                      {!roommate.hideEmail && roommate.email && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Mail size={14} className="text-purple-500" />
                            <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400">Email</h4>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-bold text-neutral-900 truncate">{roommate.email}</p>
                            <button
                              onClick={() => handleCopy(roommate.email!, 'email')}
                              className="p-1 rounded-md g-neutral-100 transition-colors text-neutral-400 ext-neutral-600 shrink-0"
                              title="Copy email"
                            >
                              {copiedField === 'email' ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </section>

                  {/* Social Identity */}
                  {!roommate.hideSocialLinks && (
                    <section className="pt-2">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-3">Social Identity</h3>
                      <div className="flex items-center gap-5">
                        <Instagram size={18} className="text-pink-500 cursor-pointer" />
                        <Twitter size={18} className="text-blue-400 cursor-pointer" />
                        <Facebook size={18} className="text-blue-600 cursor-pointer" />
                      </div>
                    </section>
                  )}

                  {/* Save Button */}
                  <section>
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

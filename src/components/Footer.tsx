// @context: Site footer — links, newsletter signup, mobile accordion
// @purpose: Footer with newsletter signup, site links (Support, Community, Hosting, Khubo), copyright
// @behavior: Mobile: accordion sections (click to expand/collapse); Desktop: all sections visible inline
// @behavior: Newsletter email input with submit button
// @dependencies: lucide-react (ArrowRight, ChevronDown)

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="bg-[#F7F7F7] border-t border-neutral-200 py-12 md:py-16 md:pb-16 pb-28">
      <div className="max-w-[2520px] mx-auto xl:px-12 md:px-12 sm:px-4 px-4">
        
        {/* Links Grid / Accordion */}
        <div className="mx-auto w-fit grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-40 mt-2 lg:mt-0 border-t border-neutral-200 md:border-t-0">
          
          <div className="flex flex-col md:gap-6 border-b border-neutral-200 md:border-b-0">
            <button 
              onClick={() => toggleSection('support')}
              className="flex justify-between items-center py-4 md:py-0 w-full text-left md:cursor-default focus:outline-none"
            >
              <h4 className="font-bold text-[#17294F] tracking-wide uppercase text-sm">Support</h4>
              <ChevronDown className={`md:hidden text-[#17294F] transition-transform ${openSection === 'support' ? 'rotate-180' : ''}`} size={18} />
            </button>
            <div className={`flex-col gap-4 text-sm text-neutral-600 font-medium pb-4 md:pb-0 ${openSection === 'support' ? 'flex' : 'hidden md:flex'}`}>
              <a href="#" className="hover:text-[#17294F] transition hover:underline">Help Center</a>
              <a href="#" className="hover:text-[#17294F] transition hover:underline">Contact Us</a>
              <a href="#" className="hover:text-[#17294F] transition hover:underline">Report an Issue</a>
            </div>
          </div>

          <div className="flex flex-col md:gap-6 border-b border-neutral-200 md:border-b-0">
            <button 
              onClick={() => toggleSection('community')}
              className="flex justify-between items-center py-4 md:py-0 w-full text-left md:cursor-default focus:outline-none"
            >
              <h4 className="font-bold text-[#17294F] tracking-wide uppercase text-sm">Community</h4>
              <ChevronDown className={`md:hidden text-[#17294F] transition-transform ${openSection === 'community' ? 'rotate-180' : ''}`} size={18} />
            </button>
            <div className={`flex-col gap-4 text-sm text-neutral-600 font-medium pb-4 md:pb-0 ${openSection === 'community' ? 'flex' : 'hidden md:flex'}`}>
              <a href="#" className="hover:text-[#17294F] transition hover:underline">Reviews</a>
              <a href="#" className="hover:text-[#17294F] transition hover:underline">Stories</a>
              <a href="#" className="hover:text-[#17294F] transition hover:underline">Suggest a Feature</a>
            </div>
          </div>

          <div className="flex flex-col md:gap-6 border-b border-neutral-200 md:border-b-0">
            <button 
              onClick={() => toggleSection('hosting')}
              className="flex justify-between items-center py-4 md:py-0 w-full text-left md:cursor-default focus:outline-none"
            >
              <h4 className="font-bold text-[#17294F] tracking-wide uppercase text-sm">Tutorials</h4>
              <ChevronDown className={`md:hidden text-[#17294F] transition-transform ${openSection === 'hosting' ? 'rotate-180' : ''}`} size={18} />
            </button>
            <div className={`flex-col gap-4 text-sm text-neutral-600 font-medium pb-4 md:pb-0 ${openSection === 'hosting' ? 'flex' : 'hidden md:flex'}`}>
              <a href="#" className="hover:text-[#17294F] transition hover:underline">List Your Property</a>
              <a href="#" className="hover:text-[#17294F] transition hover:underline">Host Resources</a>
              <a href="#" className="hover:text-[#17294F] transition hover:underline">Community Forum</a>
              <a href="#" className="hover:text-[#17294F] transition hover:underline">Hosting Tips</a>
            </div>
          </div>

          <div className="flex flex-col md:gap-6 border-b border-neutral-200 md:border-b-0">
            <button 
              onClick={() => toggleSection('legal')}
              className="flex justify-between items-center py-4 md:py-0 w-full text-left md:cursor-default focus:outline-none"
            >
              <h4 className="font-bold text-[#17294F] tracking-wide uppercase text-sm">Legal</h4>
              <ChevronDown className={`md:hidden text-[#17294F] transition-transform ${openSection === 'legal' ? 'rotate-180' : ''}`} size={18} />
            </button>
            <div className={`flex-col gap-4 text-sm text-neutral-600 font-medium pb-4 md:pb-0 ${openSection === 'legal' ? 'flex' : 'hidden md:flex'}`}>
              <a href="#" className="hover:text-[#17294F] transition hover:underline">Fair Use</a>
              <Link to="/terms" className="hover:text-[#17294F] transition hover:underline">Terms of Service</Link>
              <Link to="/privacy" className="hover:text-[#17294F] transition hover:underline">Privacy Policy</Link>
   
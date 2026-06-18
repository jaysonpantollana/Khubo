// @context: Site footer — links, newsletter signup, mobile accordion
// @purpose: Footer with newsletter signup, site links (Support, Community, Hosting, Khubo), copyright
// @behavior: Mobile: accordion sections (click to expand/collapse); Desktop: all sections visible inline
// @behavior: Newsletter email input with submit button
// @dependencies: lucide-react (ArrowRight, ChevronDown)

import React, { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Footer: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="bg-[#F7F7F7] border-t border-neutral-200 py-12 md:py-16 md:pb-16 pb-28">
      <div className="max-w-[2520px] mx-auto xl:px-12 md:px-12 sm:px-4 px-4 flex flex-col lg:flex-row justify-between gap-8 lg:gap-20">
        
        {/* Newsletter Section */}
        <div className="max-w-md w-full lg:w-1/3 flex flex-col gap-6">
          <h3 className="text-xl md:text-2xl font-bold text-[#17294F] tracking-tight leading-snug">
            Keep up to date with our quarterly newsletter, "You've got mail."
          </h3>
          <div className="flex flex-col gap-4">
            <input 
              type="email" 
              placeholder="Enter Your Email"
              className="w-full bg-white border border-neutral-200 text-[#17294F] placeholder:text-neutral-400 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#17294F]/20 focus:border-[#17294F] transition-all font-medium shadow-sm"
            />
            <button className="self-start flex items-center gap-2 bg-[#17294F] text-white hover:bg-[#17294F]/90 px-6 py-3 rounded-full font-medium transition-all shadow-sm active:scale-95">
              <span>Subscribe</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Links Grid / Accordion */}
        <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-4 mt-2 lg:mt-0 border-t border-neutral-200 md:border-t-0">
          
          <div className="flex flex-col md:gap-6 border-b border-neutral-200 md:border-b-0">
            <button 
              onClick={() => toggleSection('solutions')}
              className="flex justify-between items-center py-4 md:py-0 w-full text-left md:cursor-default focus:outline-none"
            >
              <h4 className="font-bold text-[#17294F] tracking-wide uppercase text-sm">Solutions</h4>
              <ChevronDown className={`md:hidden text-[#17294F] transition-transform ${openSection === 'solutions' ? 'rotate-180' : ''}`} size={18} />
            </button>
            <div className={`flex-col gap-4 text-sm text-neutral-600 font-medium pb-4 md:pb-0 ${openSection === 'solutions' ? 'flex' : 'hidden md:flex'}`}>
              <a href="#" className="hover:text-[#17294F] transition hover:underline">Transactional Emails</a>
              <a href="#" className="hover:text-[#17294F] transition hover:underline">Marketing Emails</a>
              <a href="#" className="hover:text-[#17294F] transition hover:underline">Email Automation</a>
              <a href="#" className="hover:text-[#17294F] transition hover:underline">Email Builder</a>
              <a href="#" className="hover:text-[#17294F] transition hover:underline">SMTP</a>
            </div>
          </div>

          <div className="flex flex-col md:gap-6 border-b border-neutral-200 md:border-b-0">
            <button 
              onClick={() => toggleSection('docs')}
              className="flex justify-between items-center py-4 md:py-0 w-full text-left md:cursor-default focus:outline-none"
            >
              <h4 className="font-bold text-[#17294F] tracking-wide uppercase text-sm">Docs</h4>
              <ChevronDown className={`md:hidden text-[#17294F] transition-transform ${openSection === 'docs' ? 'rotate-180' : ''}`} size={18} />
            </button>
            <div className={`flex-col gap-4 text-sm text-neutral-600 font-medium pb-4 md:pb-0 ${openSection === 'docs' ? 'flex' : 'hidden md:flex'}`}>
              <a href="#" className="hover:text-[#17294F] transition hover:underline">Getting Started</a>
              <a href="#" className="hover:text-[#17294F] transition hover:underline">API Reference</a>
              <a href="#" className="hover:text-[#17294F] transition hover:underline">Guides</a>
              <a href="#" className="hover:text-[#17294F] transition hover:underline">Transactional Emails</a>
            </div>
          </div>

          <div className="flex flex-col md:gap-6 border-b border-neutral-200 md:border-b-0">
            <button 
              onClick={() => toggleSection('resources')}
              className="flex justify-between items-center py-4 md:py-0 w-full text-left md:cursor-default focus:outline-none"
            >
              <h4 className="font-bold text-[#17294F] tracking-wide uppercase text-sm">Resources</h4>
              <ChevronDown className={`md:hidden text-[#17294F] transition-transform ${openSection === 'resources' ? 'rotate-180' : ''}`} size={18} />
            </button>
            <div className={`flex-col gap-4 text-sm text-neutral-600 font-medium pb-4 md:pb-0 ${openSection === 'resources' ? 'flex' : 'hidden md:flex'}`}>
              <a href="#" className="hover:text-[#17294F] transition hover:underline">FAQ</a>
              <a href="#" className="hover:text-[#17294F] transition hover:underline">Blog</a>
              <a href="#" className="hover:text-[#17294F] transition hover:underline">Glossary</a>
              <a href="#" className="hover:text-[#17294F] transition hover:underline">Changelog</a>
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
              <a href="#" className="hover:text-[#17294F] transition hover:underline">Terms & Conditions</a>
              <a href="#" className="hover:text-[#17294F] transition hover:underline">Subprocessors</a>
              <a href="#" className="hover:text-[#17294F] transition hover:underline">Privacy Policy</a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;

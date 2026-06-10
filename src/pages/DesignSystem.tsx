import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar as CalendarIcon, Users, UploadCloud, Crop, Type, Search, 
  ChevronDown, CheckSquare, Settings, Check, X, AlertTriangle, 
  Info, CheckCircle, WifiOff, Wifi, ChevronRight, MoreHorizontal, 
  Paperclip, Send, Bell, BellRing, Image as ImageIcon,
  MessageSquare, Loader2, LayoutGrid, LayoutList, Navigation, Megaphone,
  AlignLeft, Bold, Italic, List
} from 'lucide-react';
import Navbar from '../components/Navbar';

export default function DesignSystem() {
  const [activeSegment, setActiveSegment] = useState<'forms' | 'feedback' | 'navigation' | 'communication'>('forms');
  
  // -- Offline / Connection State --
  const [isOffline, setIsOffline] = useState(false);
  
  // -- Global Notifications --
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 pb-24 font-sans selection:bg-[#2252D6]/20">
      <Navbar />

      {/* Connection Status & Offline Banner */}
      <AnimatePresence>
        {isOffline && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-red-500 text-white flex items-center justify-center p-2.5 text-xs font-bold gap-2 overflow-hidden"
          >
            <WifiOff size={14} />
            You are currently offline. Some features may be limited.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Announcement Banner */}
      <AnimatePresence>
        {showAnnouncement && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-r from-[#2252D6] to-[#17294F] text-white px-4 py-3 relative z-40 shadow-md"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-1.5 rounded-lg">
                  <Megaphone size={16} className="text-white" />
                </div>
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-blue-200 block">System Update</span>
                  <p className="text-sm font-medium">Welcome to the new KHUBO Design System Sandbox. Explore interactive components below.</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAnnouncement(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Header */}
      <div className="bg-[#17294F] text-white pt-10 pb-16 relative overflow-hidden px-4 md:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2 bg-[#2252D6]/30 border border-white/10 px-3 py-1 rounded-full w-fit">
              <LayoutGrid size={14} className="text-[#3b82f6]" />
              <span className="text-xs uppercase tracking-widest font-extrabold text-blue-200">Component Library v1.0</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-none mb-3">
              Design <span className="font-serif italic font-normal text-blue-300">System</span>
            </h1>
            <p className="text-sm md:text-base text-blue-100 max-w-xl font-light">
              Interactive playground showcasing forms, feedback, navigation, and communication elements built for scale.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Connection Toggle for testing */}
            <button
              onClick={() => setIsOffline(!isOffline)}
              className={`px-4 py-2 rounded-full text-xs font-bold border cursor-pointer transition flex items-center gap-2 ${
                isOffline ? 'bg-red-500 border-red-400 text-white' : 'bg-transparent border-white/20 text-white hover:bg-white/10'
              }`}
            >
              {isOffline ? <WifiOff size={14} /> : <Wifi size={14} />}
              {isOffline ? 'Simulate Online' : 'Simulate Offline'}
            </button>
            
            {/* Notification Bell */}
            <div className="relative cursor-pointer w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full border border-white/10 transition">
              <BellRing size={16} className="text-white" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#17294F]"></span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 mt-8 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 shrink-0 space-y-2 relative">
          <div className="md:sticky md:top-[100px] bg-white border border-[#ebebeb] rounded-3xl p-3 shadow-sm">
            <h3 className="text-xs font-extrabold text-neutral-400 uppercase tracking-widest mb-3 px-3 pt-2">Library Segments</h3>
            <nav className="flex flex-col space-y-1">
              {[
                { id: 'forms', icon: Settings, label: 'Form Components' },
                { id: 'feedback', icon: AlertTriangle, label: 'Feedback & States' },
                { id: 'navigation', icon: Navigation, label: 'Navigation Systems' },
                { id: 'communication', icon: MessageSquare, label: 'Communication' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveSegment(item.id as any)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                    activeSegment === item.id 
                      ? 'bg-[#17294F] text-white shadow-md' 
                      : 'hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-8 min-w-0">
          {activeSegment === 'forms' && <FormsShowcase />}
          {activeSegment === 'feedback' && <FeedbackShowcase />}
          {activeSegment === 'navigation' && <NavigationShowcase />}
          {activeSegment === 'communication' && <CommunicationShowcase />}
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------------
// SECTION: FORMS & INPUTS
// --------------------------------------------------------------------------------
function FormsShowcase() {
  const [guestCount, setGuestCount] = useState(1);
  const [toggleOn, setToggleOn] = useState(false);
  const [check1, setCheck1] = useState(true);
  const [radioVal, setRadioVal] = useState('opt1');
  const [inputValue, setInputValue] = useState('');
  const [isError, setIsError] = useState(false);
  const [multiSelectOpen, setMultiSelectOpen] = useState(false);
  const [selectedMulti, setSelectedMulti] = useState<string[]>(['Wifi', 'Aircon']);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [richTextValue, setRichTextValue] = useState("Iligan's finest apartment available for rent. Features spacious living areas and a scenic view.");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const amenitiesOptions = ['Wifi', 'Aircon', 'Water', 'Kitchen', 'Laundry'];

  const toggleMulti = (val: string) => {
    setSelectedMulti(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Date Range Picker (Mock UI) */}
      <div className="bg-white border border-[#ebebeb] p-6 rounded-[2rem] shadow-sm">
        <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
          <CalendarIcon size={18} className="text-[#2252D6]" /> Date Range Picker
        </h3>
        <div className="flex flex-col sm:flex-row items-center bg-neutral-50 rounded-2xl border border-neutral-200 p-2 gap-2">
          <div className="flex-1 w-full bg-white px-4 py-3 rounded-xl border border-neutral-200 cursor-pointer hover:border-[#2252D6] transition">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Check In</span>
            <span className="text-sm font-semibold text-neutral-800 tracking-tight">Nov 15, 2026</span>
          </div>
          <div className="h-px w-full sm:h-8 sm:w-px bg-neutral-200"></div>
          <div className="flex-1 w-full bg-white px-4 py-3 rounded-xl border border-neutral-200 cursor-pointer hover:border-[#2252D6] transition">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Check Out</span>
            <span className="text-sm font-semibold text-neutral-800 tracking-tight">Dec 20, 2026</span>
          </div>
        </div>
      </div>

      {/* Guest Counter Stepper */}
      <div className="bg-white border border-[#ebebeb] p-6 rounded-[2rem] shadow-sm">
        <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
          <Users size={18} className="text-[#2252D6]" /> Guest Counter Stepper
        </h3>
        <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-2xl max-w-sm">
          <div>
            <span className="font-bold text-neutral-800 block">Adults</span>
            <span className="text-xs text-neutral-500">Ages 13 or above</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
              disabled={guestCount <= 1}
              className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-500 hover:border-neutral-500 disabled:opacity-30 transition cursor-pointer"
            >
              -
            </button>
            <span className="w-4 text-center font-bold">{guestCount}</span>
            <button 
              onClick={() => setGuestCount(Math.min(10, guestCount + 1))}
              className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-500 hover:border-neutral-500 transition cursor-pointer"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* File Upload Drag & Drop */}
        <div className="bg-white border border-[#ebebeb] p-6 rounded-[2rem] shadow-sm">
          <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
            <UploadCloud size={18} className="text-[#2252D6]" /> Dropzone & Upload
          </h3>
          <div 
            className="border-2 border-dashed border-neutral-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-neutral-50 hover:border-[#2252D6] transition cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}
          >
            <input type="file" className="hidden" ref={fileInputRef} />
            <div className="w-12 h-12 bg-blue-50 text-[#2252D6] rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <UploadCloud size={24} />
            </div>
            <p className="text-sm font-bold text-neutral-800">Click or drag file to this area to upload</p>
            <p className="text-xs text-neutral-500 mt-1">Support for a single or bulk upload. PNG, JPG up to 5MB.</p>
          </div>
        </div>

        {/* Image Cropper Mock */}
        <div className="bg-white border border-[#ebebeb] p-6 rounded-[2rem] shadow-sm">
          <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
            <Crop size={18} className="text-[#2252D6]" /> Image Cropper (Preview)
          </h3>
          <div className="relative w-full aspect-video bg-neutral-900 rounded-2xl overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600" alt="Crop preview" className="w-full h-full object-cover opacity-60" />
            
            {/* Cropper grid overlay */}
            <div className="absolute inset-4 border-2 border-white shadow-[0_0_0_1000px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 left-1/3 w-px h-full bg-white/50"></div>
              <div className="absolute top-0 right-1/3 w-px h-full bg-white/50"></div>
              <div className="absolute left-0 top-1/3 h-px w-full bg-white/50"></div>
              <div className="absolute left-0 bottom-1/3 h-px w-full bg-white/50"></div>
              
              {/* Handles */}
              <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-white"></div>
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white"></div>
              <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-white"></div>
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-white"></div>
            </div>
            
            <div className="absolute bottom-3 right-3 flex gap-2">
              <button className="px-3 py-1 bg-white/20 hover:bg-white text-white hover:text-black text-xs font-bold rounded-lg backdrop-blur-sm transition cursor-pointer">Cancel</button>
              <button className="px-3 py-1 bg-[#2252D6] text-white text-xs font-bold rounded-lg transition cursor-pointer">Apply Crop</button>
            </div>
          </div>
        </div>
      </div>

      {/* Rich Text Editor */}
      <div className="bg-white border border-[#ebebeb] p-6 rounded-[2rem] shadow-sm">
        <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Type size={18} className="text-[#2252D6]" /> Rich Text Editor
          </div>
          <button 
            onClick={() => setIsEditModalOpen(true)}
            className="text-xs px-3 py-1.5 bg-neutral-100 font-bold hover:bg-neutral-200 rounded-full transition text-[#17294F]"
          >
            Open Pop-up Editor
          </button>
        </h3>
        <div className="border border-neutral-200 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-[#2252D6] focus-within:border-transparent transition-all">
          <div className="flex items-center gap-1 bg-neutral-100 p-2 border-b border-neutral-200">
            <button className="p-1.5 hover:bg-neutral-200 rounded text-neutral-600"><Bold size={14} /></button>
            <button className="p-1.5 hover:bg-neutral-200 rounded text-neutral-600"><Italic size={14} /></button>
            <div className="w-px h-4 bg-neutral-300 mx-1"></div>
            <button className="p-1.5 hover:bg-neutral-200 rounded text-neutral-600"><AlignLeft size={14} /></button>
            <button className="p-1.5 hover:bg-neutral-200 rounded text-neutral-600"><List size={14} /></button>
          </div>
          <textarea 
            rows={4}
            value={richTextValue}
            onChange={(e) => setRichTextValue(e.target.value)}
            placeholder="Type your formatted description here..."
            className="w-full p-4 resize-none outline-none text-sm text-neutral-800"
          ></textarea>
        </div>

        {/* Pop-up Overlay Editor */}
        <AnimatePresence>
          {isEditModalOpen && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-[0_10px_40px_rgba(0,0,0,0.2)] overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
                  <h3 className="font-bold text-lg text-[#17294F]">Edit Description</h3>
                  <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-neutral-100 rounded-full cursor-pointer transition">
                    <X size={18} className="text-neutral-500" />
                  </button>
                </div>
                
                <div className="p-6 flex-1 overflow-y-auto">
                  <div className="border border-neutral-200 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-[#2252D6] focus-within:border-transparent transition-all min-h-[300px] flex flex-col">
                    <div className="flex items-center gap-1 bg-neutral-50 p-3 border-b border-neutral-200">
                      <button className="p-1.5 hover:bg-neutral-200 rounded text-neutral-700 bg-white shadow-sm border border-neutral-200"><Bold size={16} /></button>
                      <button className="p-1.5 hover:bg-neutral-200 rounded text-neutral-600"><Italic size={16} /></button>
                      <div className="w-px h-5 bg-neutral-300 mx-2"></div>
                      <button className="p-1.5 hover:bg-neutral-200 rounded text-neutral-600"><AlignLeft size={16} /></button>
                      <button className="p-1.5 hover:bg-neutral-200 rounded text-neutral-600"><List size={16} /></button>
                    </div>
                    <textarea 
                      value={richTextValue}
                      onChange={(e) => setRichTextValue(e.target.value)}
                      placeholder="Type your formatted description here..."
                      className="w-full flex-1 min-h-[250px] p-4 resize-none outline-none text-base text-neutral-800 leading-relaxed"
                    ></textarea>
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-neutral-100 bg-neutral-50 flex justify-end gap-3">
                  <button 
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-5 py-2.5 rounded-full font-bold text-sm bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-5 py-2.5 rounded-full font-bold text-sm bg-[#17294F] text-white hover:bg-[#1e366a] transition shadow-sm cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Form Validation & Inputs */}
      <div className="bg-white border border-[#ebebeb] p-6 rounded-[2rem] shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-neutral-900 mb-4">Inputs, Toggles, & Validation</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {/* Auto-complete */}
            <div>
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-1.5">Auto-complete Location</label>
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input 
                  type="text" 
                  placeholder="Where to?" 
                  className="w-full bg-neutral-100 border border-transparent rounded-xl py-3 pl-10 pr-4 text-sm focus:bg-white focus:border-[#2252D6] focus:ring-2 focus:ring-[#2252D6]/20 transition outline-none"
                />
              </div>
            </div>

            {/* Validation Error State */}
            <div>
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-1.5">Validation Field</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    setIsError(e.target.value.length < 5);
                  }}
                  placeholder="Must be at least 5 chars" 
                  className={`w-full bg-neutral-100 rounded-xl py-3 px-4 text-sm outline-none transition ${isError ? 'border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200 border' : 'border border-transparent focus:bg-white focus:border-[#2252D6] focus:ring-2 focus:ring-[#2252D6]/20'}`}
                />
                {isError && <AlertTriangle size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-red-500" />}
              </div>
              {isError && <p className="text-xs text-red-500 mt-1.5 font-medium flex items-center gap-1"><Info size={12} /> Value is too short.</p>}
            </div>

            {/* Multi-select Dropdown */}
            <div className="relative">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-1.5">Multi-Select Special</label>
              <button 
                onClick={() => setMultiSelectOpen(!multiSelectOpen)}
                className="w-full bg-neutral-100 border border-transparent hover:border-neutral-300 rounded-xl py-3 px-4 text-sm flex items-center justify-between text-neutral-600 transition cursor-pointer"
              >
                <span>{selectedMulti.length ? selectedMulti.join(', ') : 'Select amenities...'}</span>
                <ChevronDown size={16} className={`transition-transform ${multiSelectOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {multiSelectOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-100 shadow-xl rounded-xl z-20 py-2"
                  >
                    {amenitiesOptions.map(opt => (
                      <div 
                        key={opt} 
                        onClick={() => toggleMulti(opt)}
                        className="px-4 py-2 hover:bg-neutral-50 flex items-center gap-2 cursor-pointer text-sm font-medium"
                      >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedMulti.includes(opt) ? 'bg-[#2252D6] border-[#2252D6]' : 'border-neutral-300'}`}>
                          {selectedMulti.includes(opt) && <Check size={10} className="text-white" strokeWidth={3} />}
                        </div>
                        {opt}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="space-y-6">
            {/* Toggle Switch */}
            <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-2xl bg-neutral-50">
              <div>
                <span className="text-sm font-bold text-neutral-800 block">Instant Book</span>
                <p className="text-xs text-neutral-500">Allow spontaneous bookings without approval.</p>
              </div>
              <button
                type="button"
                onClick={() => setToggleOn(!toggleOn)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${toggleOn ? 'bg-emerald-500' : 'bg-neutral-300'}`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out ${toggleOn ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Checkbox Group */}
            <div>
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-2">Checkbox Rules</span>
              <div className="space-y-2">
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <div className={`w-5 h-5 rounded-[4px] border-2 flex items-center justify-center transition-colors ${check1 ? 'bg-[#17294F] border-[#17294F]' : 'border-neutral-300 group-hover:border-[#17294F]'}`}>
                    {check1 && <Check size={12} className="text-white" strokeWidth={3} />}
                  </div>
                  <span className="text-sm font-medium">Allow Pets</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer group opacity-60">
                  <div className="w-5 h-5 rounded-[4px] border-2 border-neutral-300 flex items-center justify-center bg-neutral-100">
                     <Check size={12} className="text-neutral-400" strokeWidth={3} />
                  </div>
                  <span className="text-sm font-medium">Smoking (Disabled)</span>
                </label>
              </div>
            </div>

            {/* Radio Group */}
            <div>
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-2">Radio Type</span>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${radioVal === 'opt1' ? 'border-[#2252D6]' : 'border-neutral-300'}`}>
                    {radioVal === 'opt1' && <div className="w-2.5 h-2.5 rounded-full bg-[#2252D6]" />}
                  </div>
                  <span className="text-sm font-medium">Entire Place</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${radioVal === 'opt2' ? 'border-[#2252D6]' : 'border-neutral-300'}`}>
                    {radioVal === 'opt2' && <div className="w-2.5 h-2.5 rounded-full bg-[#2252D6]" />}
                  </div>
                  <span className="text-sm font-medium">Private Room</span>
                </label>
              </div>
            </div>

          </div>
        </div>

        {/* Message Banners */}
        <div className="pt-4 space-y-3 border-t border-neutral-100">
          <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 p-4 rounded-xl flex items-start gap-3">
            <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={18} />
            <div>
              <h4 className="text-sm font-bold">Listing Saved Successfully</h4>
              <p className="text-xs text-emerald-600 mt-0.5">Your property has been published to the marketplace.</p>
            </div>
          </div>
          <div className="bg-red-50 text-red-800 border border-red-200 p-4 rounded-xl flex items-start gap-3">
            <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={18} />
            <div>
              <h4 className="text-sm font-bold">Failed to Upload Media</h4>
              <p className="text-xs text-red-600 mt-0.5">File size exceeds the 5MB limit. Please compress your image.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

// --------------------------------------------------------------------------------
// SECTION: FEEDBACK & STATES
// --------------------------------------------------------------------------------
function FeedbackShowcase() {
  const [loadingStep, setLoadingStep] = useState(45);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Skeletons */}
      <div className="bg-white border border-[#ebebeb] p-6 rounded-[2rem] shadow-sm">
        <h3 className="text-lg font-bold text-neutral-900 mb-6">Loading Skeletons</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <div className="w-full h-48 bg-neutral-200 animate-pulse rounded-2xl"></div>
            <div className="flex justify-between items-start pt-2">
              <div className="space-y-2 w-3/4">
                <div className="h-4 bg-neutral-200 animate-pulse rounded w-1/3"></div>
                <div className="h-5 bg-neutral-200 animate-pulse rounded w-3/4"></div>
                <div className="h-3 bg-neutral-200 animate-pulse rounded w-1/2"></div>
              </div>
              <div className="w-12 h-6 bg-neutral-200 animate-pulse rounded"></div>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="w-16 h-16 bg-neutral-200 animate-pulse rounded-full shrink-0"></div>
             <div className="space-y-2 w-full">
                <div className="h-5 bg-neutral-200 animate-pulse rounded w-1/2"></div>
                <div className="h-3 bg-neutral-200 animate-pulse rounded w-1/3"></div>
                <div className="h-3 bg-neutral-200 animate-pulse rounded w-3/4"></div>
             </div>
          </div>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="bg-white border border-[#ebebeb] p-6 rounded-[2rem] shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-neutral-900 mb-4">Progress Indicators</h3>
        
        <div>
          <div className="flex justify-between text-xs font-bold mb-2">
            <span className="text-neutral-600">Uploading Images...</span>
            <span className="text-[#2252D6]">{loadingStep}%</span>
          </div>
          <div className="w-full bg-neutral-100 rounded-full h-2.5 overflow-hidden">
            <div className="bg-[#2252D6] h-2.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${loadingStep}%` }}></div>
          </div>
          <button onClick={() => setLoadingStep(prev => Math.min(100, prev + 25))} className="mt-4 text-xs font-bold text-[#2252D6] pb-1 border-b border-[#2252D6] cursor-pointer hover:text-[#1a41b8]">Simulate Progress</button>
        </div>

        <div className="flex items-center gap-3 py-4 border-t border-neutral-100">
          <Loader2 size={24} className="animate-spin text-[#2252D6]" />
          <span className="text-sm font-semibold text-neutral-600">Processing payment verification...</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Empty State */}
        <div className="bg-white border border-[#ebebeb] p-8 rounded-[2rem] shadow-sm flex flex-col items-center justify-center text-center min-h-[300px]">
          <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
            <Search size={32} className="text-neutral-400" />
          </div>
          <h3 className="text-lg font-bold text-neutral-900">No Listings Found</h3>
          <p className="text-sm text-neutral-500 mt-2 max-w-xs">We couldn't find any rooms matching your selected filters. Try broadening your search.</p>
          <button className="mt-6 px-6 py-2.5 bg-[#17294F] text-white text-xs font-extrabold uppercase rounded-full tracking-wider hover:bg-[#1e366a] transition cursor-pointer">Clear Filters</button>
        </div>

        {/* Error Boundary Fallback mockup */}
        <div className="bg-rose-50 border border-rose-200 p-8 rounded-[2rem] flex flex-col items-center justify-center text-center min-h-[300px]">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 text-rose-500 shadow-sm">
            <AlertTriangle size={28} />
          </div>
          <h3 className="text-lg font-bold text-rose-900">Component Crashed</h3>
          <p className="text-sm text-rose-700 mt-2 max-w-xs">An unexpected error occurred while rendering this module. (Error Boundary Fallback UI)</p>
          <div className="mt-6 flex gap-3">
             <button className="px-5 py-2 bg-rose-600 text-white text-xs font-extrabold rounded-full hover:bg-rose-700 transition cursor-pointer">Reload Route</button>
             <button className="px-5 py-2 bg-white text-rose-700 text-xs font-extrabold rounded-full border border-rose-200 hover:bg-rose-100 transition cursor-pointer">Report Issue</button>
          </div>
        </div>
      </div>

    </div>
  );
}

// --------------------------------------------------------------------------------
// SECTION: NAVIGATION
// --------------------------------------------------------------------------------
function NavigationShowcase() {
  const [tab, setTab] = useState('one');
  
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Breadcrumbs */}
      <div className="bg-white border border-[#ebebeb] p-6 rounded-[2rem] shadow-sm">
        <h3 className="text-lg font-bold text-neutral-900 mb-4">Breadcrumb Trail</h3>
        <nav className="flex items-center gap-2 text-sm">
          <a href="#" className="font-medium text-neutral-500 hover:text-[#17294F] transition">Home</a>
          <ChevronRight size={14} className="text-neutral-400" />
          <a href="#" className="font-medium text-neutral-500 hover:text-[#17294F] transition">Iligan City</a>
          <ChevronRight size={14} className="text-neutral-400" />
          <span className="font-bold text-[#17294F]">Tribanga Dormitories</span>
        </nav>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-[#ebebeb] p-6 rounded-[2rem] shadow-sm">
        <h3 className="text-lg font-bold text-neutral-900 mb-4">Horizontal Tabs & Content</h3>
        
        <div className="flex border-b border-neutral-200 pb-px gap-6">
           {['one', 'two', 'three'].map(t => (
             <button 
               key={t}
               onClick={() => setTab(t)}
               className={`pb-3 text-sm font-bold capitalize relative cursor-pointer outline-none ${tab === t ? 'text-[#2252D6]' : 'text-neutral-500 hover:text-neutral-800'}`}
             >
               Tab {t} Segment
               {tab === t && (
                 <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2252D6]" />
               )}
             </button>
           ))}
        </div>
        <div className="pt-6 min-h-[100px] text-sm text-neutral-600">
          {tab === 'one' && <motion.div initial={{opacity:0}} animate={{opacity:1}}>Content for segment one. Clean and simple isolated component.</motion.div>}
          {tab === 'two' && <motion.div initial={{opacity:0}} animate={{opacity:1}}>Segment two focuses on alternate data presentation.</motion.div>}
          {tab === 'three' && <motion.div initial={{opacity:0}} animate={{opacity:1}}>The final segment containing deeper configuration options.</motion.div>}
        </div>
      </div>

      {/* Stepper Wizard */}
      <div className="bg-white border border-[#ebebeb] p-8 rounded-[2rem] shadow-sm">
        <h3 className="text-lg font-bold text-neutral-900 mb-8">Wizard Progress Stepper</h3>
        
        <div className="relative flex justify-between">
           {/* Connecting Line */}
           <div className="absolute top-4 left-0 right-0 h-[2px] bg-neutral-200 -z-10">
              <div className="h-full bg-[#17294F] transition-all duration-500" style={{width: '50%'}}></div>
           </div>
           
           {/* Steps */}
           {[
             { num: 1, label: 'Details', status: 'completed' },
             { num: 2, label: 'Photos', status: 'completed' },
             { num: 3, label: 'Pricing', status: 'active' },
             { num: 4, label: 'Review', status: 'upcoming' },
           ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 bg-white transition-colors duration-300 ${
                   step.status === 'completed' ? 'border-[#17294F] bg-[#17294F] text-white' : 
                   step.status === 'active' ? 'border-[#2252D6] text-[#2252D6] shadow-[0_0_0_4px_rgba(34,82,214,0.1)]' : 
                   'border-neutral-300 text-neutral-400'
                 }`}>
                   {step.status === 'completed' ? <Check size={14} strokeWidth={3} /> : step.num}
                 </div>
                 <span className={`text-xs font-bold ${step.status === 'active' ? 'text-[#2252D6]' : step.status === 'completed' ? 'text-[#17294F]' : 'text-neutral-400'}`}>
                   {step.label}
                 </span>
              </div>
           ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="bg-white border border-[#ebebeb] p-6 rounded-[2rem] shadow-sm">
        <h3 className="text-lg font-bold text-neutral-900 mb-4">Pagination Control</h3>
        <div className="flex items-center gap-1.5">
           <button className="w-9 h-9 flex items-center justify-center rounded-full border border-neutral-200 text-neutral-400 hover:bg-neutral-50 cursor-not-allowed">
             <ChevronRight size={16} className="rotate-180" />
           </button>
           <button className="w-9 h-9 flex items-center justify-center rounded-full bg-[#17294F] text-white font-bold text-sm">1</button>
           <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-neutral-100 font-bold text-sm text-neutral-600 transition">2</button>
           <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-neutral-100 font-bold text-sm text-neutral-600 transition">3</button>
           <div className="w-6 h-9 flex items-center justify-center text-neutral-400"><MoreHorizontal size={16} /></div>
           <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-neutral-100 font-bold text-sm text-neutral-600 transition">8</button>
           <button className="w-9 h-9 flex items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition cursor-pointer">
             <ChevronRight size={16} />
           </button>
        </div>
      </div>
      
    </div>
  );
}

// --------------------------------------------------------------------------------
// SECTION: COMMUNICATION
// --------------------------------------------------------------------------------
function CommunicationShowcase() {
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Real-time Chat Interface Mock */}
      <div className="bg-white border border-[#ebebeb] rounded-[2rem] shadow-sm overflow-hidden flex flex-col h-[500px]">
        {/* Header */}
        <div className="p-4 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50">
          <div className="flex items-center gap-3">
             <div 
                className="relative cursor-pointer"
                onClick={() => setIsOnline(!isOnline)}
                title="Toggle Online Status"
             >
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150" className="w-10 h-10 rounded-full object-cover shadow-sm" alt="Landlord" />
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white transition-colors ${isOnline ? 'bg-emerald-500' : 'bg-neutral-400'}`}></div>
             </div>
             <div>
               <h4 className="font-extrabold text-neutral-900 text-sm leading-tight">Sarah Johnson</h4>
               <p className={`text-xs font-medium tracking-tight ${isOnline ? 'text-emerald-600' : 'text-neutral-500'}`}>
                 {isOnline ? 'Active Now · Typing...' : 'Offline'}
               </p>
             </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-white bg-transparent rounded-full text-neutral-500 transition"><Info size={18} /></button>
          </div>
        </div>

        {/* Chat Body */}
        <div className="flex-1 p-5 overflow-y-auto bg-white flex flex-col gap-4">
           {/* Date Divider */}
           <div className="flex items-center justify-center my-2">
             <span className="text-[10px] font-bold text-neutral-400 bg-neutral-100 px-3 py-1 rounded-full uppercase tracking-wider">Today, 10:42 AM</span>
           </div>
           
           {/* Received Message */}
           <div className="flex gap-3 max-w-[85%]">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150" className="w-8 h-8 rounded-full object-cover shrink-0" alt="Avatar" />
              <div>
                <div className="bg-neutral-100 text-neutral-800 p-3.5 rounded-2xl rounded-tl-sm text-sm font-medium">
                  Hi there! Are you still interested in scheduling a viewing for the apartment in San Miguel?
                </div>
              </div>
           </div>

           {/* Sent Message with Read Receipt */}
           <div className="flex gap-3 max-w-[85%] self-end flex-row-reverse">
              <div>
                <div className="bg-[#2252D6] text-white p-3.5 rounded-2xl rounded-tr-sm text-sm font-medium">
                  Yes, absolutely! Is tomorrow afternoon around 3 PM possible?
                </div>
                <div className="flex items-center justify-end gap-1 mt-1">
                   <span className="text-[10px] font-bold text-neutral-400">10:45 AM</span>
                   {/* Double Check icon representing Read Receipt */}
                   <Check size={12} className="text-[#2252D6]" strokeWidth={3} />
                   <Check size={12} className="text-[#2252D6] -ml-2.5 bg-white rounded-full" strokeWidth={3} />
                </div>
              </div>
           </div>

           {/* Typing Indicator */}
           <div className="flex gap-3 max-w-[85%] items-end mt-2">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150" className="w-8 h-8 rounded-full object-cover shrink-0 opacity-50" alt="Avatar" />
              <div className="bg-neutral-100 p-3 rounded-2xl rounded-bl-sm flex items-center gap-1">
                <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
              </div>
           </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-neutral-100 bg-neutral-50/50">
           {/* Message Templates / Quick Replies */}
           <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar pb-1">
             <button className="shrink-0 bg-white border border-[#2252D6]/30 text-[#2252D6] hover:bg-[#2252D6]/5 text-[11px] font-extrabold px-3 py-1.5 rounded-full transition cursor-pointer">
               Where is the exact location?
             </button>
             <button className="shrink-0 bg-white border border-[#2252D6]/30 text-[#2252D6] hover:bg-[#2252D6]/5 text-[11px] font-extrabold px-3 py-1.5 rounded-full transition cursor-pointer">
               Are pets allowed?
             </button>
           </div>
           
           <div className="flex items-end gap-2 bg-white border border-neutral-200 rounded-2xl p-1.5 shadow-sm focus-within:border-[#2252D6] focus-within:ring-2 focus-within:ring-[#2252D6]/10 transition-all">
             <button className="p-2 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-xl transition cursor-pointer">
               <Paperclip size={18} />
             </button>
             <button className="p-2 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-xl transition cursor-pointer">
               <ImageIcon size={18} />
             </button>
             
             <textarea 
               rows={1}
               placeholder="Type a message..."
               className="flex-1 max-h-32 min-h-[40px] resize-none py-2.5 px-2 outline-none text-sm text-neutral-800 bg-transparent"
             ></textarea>
             
             <button className="p-2.5 bg-[#17294F] text-white hover:bg-[#1e366a] rounded-xl transition cursor-pointer shrink-0">
               <Send size={16} />
             </button>
           </div>
        </div>
      </div>
      
    </div>
  );
}

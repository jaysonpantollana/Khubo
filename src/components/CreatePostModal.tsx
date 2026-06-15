import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Image as ImageIcon, User, Smile, MapPin, MoreHorizontal, ChevronDown } from 'lucide-react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  postMode: 'applying' | 'finding';
}

export default function CreatePostModal({ isOpen, onClose, postMode }: CreatePostModalProps) {
  const [content, setContent] = useState('');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-200 relative">
            <h2 className="text-xl font-bold text-neutral-900 text-center w-full">Create post</h2>
            <button
              onClick={onClose}
              className="absolute right-4 p-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-4 flex flex-col gap-4">
            {/* User Info */}
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-neutral-900 text-[15px]">Micheal Doe</span>
                <button className="flex items-center gap-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-medium px-2 py-1 rounded-md transition-colors mt-0.5 w-fit">
                  <User size={12} className="text-neutral-600" />
                  <span>Friends</span>
                  <ChevronDown size={14} className="ml-0.5" />
                </button>
              </div>
            </div>

            {/* Input form */}
            <div className="min-h-[140px]">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={postMode === 'finding' ? 'What kind of roommate are you looking for, Micheal?' : "What's on your mind, Micheal?"}
                className="w-full bg-transparent text-xl md:text-2xl text-neutral-900 placeholder-neutral-500 resize-none outline-none overflow-y-auto max-h-[250px]"
                rows={4}
                autoFocus
              />
            </div>

            {/* Extra options */}
            <div className="flex items-center justify-between">
              <button className="w-8 h-8 rounded-lg flex items-center justify-center p-0 overflow-hidden outline-none">
                <div className="w-full h-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 rounded-lg flex items-center justify-center text-white font-bold font-serif text-sm border-2 border-white">Aa</div>
              </button>
              <button className="p-2 text-neutral-400 hover:bg-neutral-100 rounded-full transition-colors mr-1">
                <Smile size={24} />
              </button>
            </div>

            {/* Add to your post */}
            <div className="border border-neutral-300 rounded-xl p-3 flex items-center justify-between shadow-sm">
              <span className="font-medium text-neutral-900 ml-1">Add to your post</span>
              <div className="flex items-center gap-1">
                <button className="p-2 text-[#45BD62] hover:bg-neutral-100 rounded-full transition-colors">
                  <ImageIcon size={24} />
                </button>
                <button className="p-2 text-[#1877F2] hover:bg-neutral-100 rounded-full transition-colors">
                  <User size={24} />
                </button>
                <button className="p-2 text-[#F7B928] hover:bg-neutral-100 rounded-full transition-colors">
                  <Smile size={24} />
                </button>
                <button className="p-2 text-[#F5533D] hover:bg-neutral-100 rounded-full transition-colors">
                  <MapPin size={24} />
                </button>
                <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                  <MoreHorizontal size={24} className="text-neutral-500" />
                </button>
              </div>
            </div>

            {/* Post button */}
            <button 
              disabled={!content.trim()}
              className={`w-full py-2.5 rounded-lg font-semibold text-[15px] transition-colors mt-2 ${
                content.trim() 
                  ? 'bg-[#2252D6] text-white hover:bg-[#1B43B0]' 
                  : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
              }`}
            >
              Post
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

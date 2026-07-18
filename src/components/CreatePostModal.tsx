// @context: Create roommate post modal — form for roommate listing
// @purpose: Form to create roommate post (applying or finding mode); includes personality traits/tags selection
// @behavior: Loads user profile tags from localStorage; lets user write description and select traits
// @behavior: Custom tag input with add functionality; creates Roommate-compatible post object
// @side-effects: Reads localStorage for user_profile_tags; calls onPostCreated with new Roommate
// @dependencies: Roommate type, motion, lucide-react
// @known-issues: New post ID uses Math.random() (not stable stable for SSR)

import React, { useState } from 'react';

import { X, Phone, Mail, Instagram, Twitter, Facebook } from 'lucide-react';
import { Roommate } from '../types';
import { FocusTrap } from './ui/FocusTrap';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  postMode: 'applying' | 'finding';
  onPostCreated?: (newPost: Roommate) => void;
}

export default function CreatePostModal({ isOpen, onClose, postMode, onPostCreated }: CreatePostModalProps) {
  const [content, setContent] = useState('');
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTagInput, setNewTagInput] = useState('');
  const [hidePhone, setHidePhone] = useState(false);
  const [hideEmail, setHideEmail] = useState(false);
  const [hideSocialLinks, setHideSocialLinks] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [socialLinks, setSocialLinks] = useState<{ platform: string; url: string }[]>([]);

  const loadProfileData = () => {
    // Load personality tags
    const savedTags = localStorage.getItem('user_profile_tags');
    if (savedTags) {
      try {
        const parsed = JSON.parse(savedTags);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSelectedTraits(parsed.slice(0, 5));
        } else {
          setSelectedTraits(['Introvert', 'Pet-friendly', 'Night owl', 'Studious', 'Non-smoker'].slice(0, 5));
        }
      } catch (e) {
        console.warn('Error reading profile tags:', e);
        setSelectedTraits(['Introvert', 'Pet-friendly', 'Night owl', 'Studious', 'Non-smoker'].slice(0, 5));
      }
    } else {
      setSelectedTraits(['Introvert', 'Pet-friendly', 'Night owl', 'Studious', 'Non-smoker'].slice(0, 5));
    }

    // Load contact info from profile
    const savedPhone = localStorage.getItem('user_profile_phone');
    const savedEmail = localStorage.getItem('user_profile_email');
    const savedSocial = localStorage.getItem('user_profile_social_links');
    
    setPhoneNumber(savedPhone || '+63 912 345 6789');
    setEmailAddress(savedEmail || 'micheal.doe@email.com');
    
    if (savedSocial) {
      try {
        const parsed = JSON.parse(savedSocial);
        if (Array.isArray(parsed)) {
          setSocialLinks(parsed);
        } else {
          setSocialLinks([
            { platform: 'Instagram', url: 'https://instagram.com/micheal' },
            { platform: 'X', url: 'https://x.com/micheal' },
            { platform: 'Facebook', url: 'https://facebook.com/micheal' }
          ]);
        }
      } catch (e) {
        setSocialLinks([
          { platform: 'Instagram', url: 'https://instagram.com/micheal' },
          { platform: 'X', url: 'https://x.com/micheal' },
          { platform: 'Facebook', url: 'https://facebook.com/micheal' }
        ]);
      }
    } else {
      setSocialLinks([
        { platform: 'Instagram', url: 'https://instagram.com/micheal' },
        { platform: 'X', url: 'https://x.com/micheal' },
        { platform: 'Facebook', url: 'https://facebook.com/micheal' }
      ]);
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      loadProfileData();
    }
  }, [isOpen]);

  const handlePostSubmit = () => {
    if (!content.trim()) return;

    if (onPostCreated) {
      const newPost: Roommate = {
        id: `rm-${Date.now()}`,
        name: 'Micheal Doe',
        age: 20,
        gender: 'Male',
        university: 'MSU-IIT',
        location: 'Tibanga, Iligan City',
        bio: content.trim(),
        image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
        tags: selectedTraits.length > 0 ? selectedTraits : ['Clean', 'Quiet'],
        budgetRange: 'P2500-P3000',
        preferredPlace: postMode === 'finding' ? "Nathan's Female Boarders" : "Tibanga Boardhouse",
        hidePhone,
        hideEmail,
        hideSocialLinks
      };
      onPostCreated(newPost);
    }

    // Reset local state
    setContent('');
    setSelectedTraits([]);
    setHidePhone(false);
    setHideEmail(false);
    setHideSocialLinks(false);
    setPhoneNumber('');
    setEmailAddress('');
    setSocialLinks([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        <FocusTrap
          onClose={onClose}
          ariaLabel="Create Post"
          className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-200 relative shrink-0">
            <h2 className="text-xl font-bold text-neutral-900 text-center w-full">Create post</h2>
            <button
              onClick={onClose}
              className="absolute right-4 p-2 bg-neutral-100 g-neutral-200 text-neutral-600 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-4 flex flex-col gap-4 overflow-y-auto">
            {/* User Info */}
            <div className="flex items-center gap-3 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
              <div className="flex flex-col justify-center">
                <span className="font-semibold text-neutral-900 text-[15px]">Micheal Doe</span>
              </div>
            </div>

            {/* Input form */}
            <div className="min-h-[100px] shrink-0">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={postMode === 'finding' ? 'What kind of roommate are you looking for, Micheal?' : "What's on your mind, Micheal?"}
                className="w-full bg-transparent text-lg md:text-xl text-neutral-900 placeholder-neutral-500 resize-none outline-none overflow-y-auto max-h-[160px]"
                rows={3}
                autoFocus
              />
            </div>

            {/* Your Personality or Preference section loaded from profile */}
            <div className="flex flex-col gap-2 border-t border-neutral-100 pt-3 mt-1 shrink-0">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                {postMode === 'finding' ? 'Your preference' : 'Your Personality'}
              </span>
              <div className="flex flex-wrap gap-1.5 items-center">
                {selectedTraits.map((trait) => (
                  <span
                    key={trait}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-100 border border-neutral-200 text-neutral-800 rounded-full text-xs font-semibold"
                  >
                    <span>{trait}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = selectedTraits.filter((t) => t !== trait);
                        setSelectedTraits(updated);
                        localStorage.setItem('user_profile_tags', JSON.stringify(updated));
                      }}
                      className="g-neutral-250 p-0.5 rounded-full transition-colors flex items-center justify-center shrink-0 text-neutral-400 ext-neutral-700"
                      title={`Remove ${trait}`}
                    >
                      <X size={10} className="stroke-[3]" />
                    </button>
                  </span>
                ))}
                
                {isAddingTag ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const trimmed = newTagInput.trim();
                      if (trimmed) {
                        if (!selectedTraits.includes(trimmed)) {
                          const updated = [...selectedTraits, trimmed];
                          setSelectedTraits(updated);
                          localStorage.setItem('user_profile_tags', JSON.stringify(updated));
                        }
                      }
                      setNewTagInput('');
                      setIsAddingTag(false);
                    }}
                    className="inline-flex"
                  >
                    <input
                      autoFocus
                      type="text"
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      onBlur={() => {
                        const trimmed = newTagInput.trim();
                        if (trimmed) {
                          if (!selectedTraits.includes(trimmed)) {
                            const updated = [...selectedTraits, trimmed];
                            setSelectedTraits(updated);
                            localStorage.setItem('user_profile_tags', JSON.stringify(updated));
                          }
                        }
                        setNewTagInput('');
                        setIsAddingTag(false);
                      }}
                      placeholder="Add tag..."
                      className="px-3 py-1 bg-neutral-100 border border-neutral-300 text-neutral-800 rounded-full text-xs font-semibold outline-none w-24 focus:border-neutral-500 transition-colors"
                    />
                  </form>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsAddingTag(true)}
                    className="inline-flex items-center justify-center px-3 py-1 bg-neutral-50 g-neutral-100 border border-dashed border-neutral-300 order-neutral-400 text-neutral-650 ext-neutral-800 rounded-full text-xs font-semibold cursor-pointer shrink-0 transition-colors"
                  >
                    + Add tag
                  </button>
                )}
                {selectedTraits.length === 0 && !isAddingTag && (
                  <span className="text-xs text-neutral-400 italic">
                    {postMode === 'finding' ? 'No preference tags set.' : 'No traits set on profile.'}
                  </span>
                )}
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="flex flex-col gap-3 border-t border-neutral-100 pt-3 mt-1 shrink-0">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                Privacy Settings
              </span>
              <div className="flex flex-col gap-2">
                {/* Phone Number */}
                <label className="flex items-center justify-between cursor-pointer group py-1">
                  <div className="flex items-center gap-2.5">
                    <Phone size={16} className="text-neutral-400" />
                    <span className="text-sm text-neutral-700 group-ext-neutral-900 transition-colors font-medium">{phoneNumber}</span>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={hidePhone}
                      onChange={(e) => setHidePhone(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-neutral-200 rounded-full peer peer-checked:bg-neutral-900 transition-colors"></div>
                    <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm peer-checked:translate-x-4 transition-transform"></div>
                  </div>
                </label>
                
                {/* Email */}
                <label className="flex items-center justify-between cursor-pointer group py-1">
                  <div className="flex items-center gap-2.5">
                    <Mail size={16} className="text-neutral-400" />
                    <span className="text-sm text-neutral-700 group-ext-neutral-900 transition-colors font-medium">{emailAddress}</span>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={hideEmail}
                      onChange={(e) => setHideEmail(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-neutral-200 rounded-full peer peer-checked:bg-neutral-900 transition-colors"></div>
                    <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm peer-checked:translate-x-4 transition-transform"></div>
                  </div>
                </label>
                
                {/* Social Links */}
                <label className="flex items-center justify-between cursor-pointer group py-1">
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-2">
                      {socialLinks.map((link, idx) => {
                        if (link.platform === 'Instagram') return <Instagram key={idx} size={16} className="text-pink-500" />;
                        if (link.platform === 'X') return <Twitter key={idx} size={16} className="text-neutral-800" />;
                        if (link.platform === 'Facebook') return <Facebook key={idx} size={16} className="text-blue-600" />;
                        return null;
                      })}
                    </div>
                    <span className="text-sm text-neutral-700 group-ext-neutral-900 transition-colors font-medium">Social links</span>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={hideSocialLinks}
                      onChange={(e) => setHideSocialLinks(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-neutral-200 rounded-full peer peer-checked:bg-neutral-900 transition-colors"></div>
                    <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm peer-checked:translate-x-4 transition-transform"></div>
                  </div>
                </label>
              </div>
            </div>

            {/* Post button */}
            <button 
              onClick={handlePostSubmit}
              disabled={!content.trim()}
              className={`w-full py-2.5 rounded-lg font-bold text-[15px] transition-colors mt-2 shrink-0 ${
                content.trim() 
                  ? 'bg-neutral-900 text-white g-neutral-800' 
                  : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
              }`}
            >
              Post
            </button>
          </div>
        </FocusTrap>
      </div>
  );
}

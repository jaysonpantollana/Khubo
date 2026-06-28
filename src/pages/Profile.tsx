// @context: Profile page — user account and settings
// @purpose: Displays user avatar, name, details, stats (saved/reservations/roommate/invitations), and action modals
// @behavior: Opens EditProfileModal, LandlordSignupModal, LogoutModal, PropertiesModal, InquiriesModal, TenantsModal, StatCardModal
// @dependencies: useAuth, BottomNav, EditProfileModal, LandlordSignupModal, LogoutModal, PropertiesModal, InquiriesModal, TenantsModal, StatCardModal, motion, lucide-react

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { Listing, TenantInfo } from '../types';
import {
  Megaphone, GraduationCap, MapPin, Edit2, ArrowUpRight, Star,
  Settings, HelpCircle, LogOut, Bell, Building, Check, X,
  MoreVertical, Copy, Users, FileText, Shield,
} from 'lucide-react';
import BottomNav from '../components/BottomNav';
import Footer from '../components/Footer';
import { useAuth } from '../lib/AuthContext';
import { useToast } from '../components/ToastProvider';
import { updateListing } from '../lib/api/listings';
import { EditListingModal } from '../components/EditListingModal';
import { CreateListingModal } from '../components/CreateListingModal';
import { PhotoCarouselOverlay } from '../components/PhotoCarouselOverlay';
import { AnnouncementsOverlay } from '../components/AnnouncementsOverlay';

import { TenantsModal } from '../components/TenantsModal';
import { PropertiesModal } from '../components/PropertiesModal';
import { InquiriesModal } from '../components/InquiriesModal';
import { ListingDetailModal } from '../components/ListingDetailModal';
import EditProfileModal from '../components/profile/EditProfileModal';
import LogoutModal from '../components/profile/LogoutModal';
import LandlordSignupModal from '../components/profile/LandlordSignupModal';
import StatCardModal from '../components/profile/StatCardModal';
import TenantProfileModal from '../components/TenantProfileModal';

export default function Profile() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { showToast } = useToast();
  const [isLandlord, setIsLandlord] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const [isTenantsModalOpen, setIsTenantsModalOpen] = useState(false);
  const [isPropertiesModalOpen, setIsPropertiesModalOpen] = useState(false);
  const [isInquiriesModalOpen, setIsInquiriesModalOpen] = useState(false);
  const [selectedListingDetail, setSelectedListingDetail] = useState<Listing | null>(null);
  const [selectedTenants, setSelectedTenants] = useState<TenantInfo[]>([]);

  useEffect(() => {
    document.title = "Profile | Khubo";
  }, []);

  const menuItems = [
    { title: 'Notifications', icon: Bell, action: () => setIsAnnouncementsOpen(true) },
    { title: 'Account settings', icon: Settings, action: () => showToast('Account settings clicked', 'info') },
    { title: 'Help Center', icon: HelpCircle, action: () => showToast('Help Center clicked', 'info') },
    { title: 'Terms of Service', icon: FileText, action: () => navigate('/terms') },
    { title: 'Privacy Policy', icon: Shield, action: () => navigate('/privacy') },
  ];

  const [myListings, setMyListings] = useState<Listing[]>([]);
  const [loadingListings, setLoadingListings] = useState(false);
  const [editingListing, setEditingListing] = useState<Listing | null>(null);
  const [isCreateListingOpen, setIsCreateListingOpen] = useState(false);
  const [listingVisibility, setListingVisibility] = useState<Record<string, boolean>>({});
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const [profileName, setProfileName] = useState('Micheal B. Jordan');
  const [profileDetails, setProfileDetails] = useState('MSU-IIT | 20yrs old | Female');
  const [profileLocation, setProfileLocation] = useState('Tibanga, Iligan City');
  const [profileBio, setProfileBio] = useState('"Clean and organized. Looking for a place near the city center. I cook often and enjoy a shared meal!"');
  const [profileTags, setProfileTags] = useState<string[]>(() => {
    const saved = localStorage.getItem('user_profile_tags');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.warn('Error loading tags in profile:', e);
      }
    }
    return ['Introvert', 'Pet-friendly', 'Night owl', 'Studious', 'Non-smoker'];
  });

  useEffect(() => {
    localStorage.setItem('user_profile_tags', JSON.stringify(profileTags));
  }, [profileTags]);
  const [isEditingTags, setIsEditingTags] = useState(false);
  const [newTagInput, setNewTagInput] = useState('');
  const [selectedStatModal, setSelectedStatModal] = useState<string | null>(null);

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [tempIsOnline, setTempIsOnline] = useState(true);
  const [tempName, setTempName] = useState('');
  const [tempDetails, setTempDetails] = useState('');
  const [tempLocation, setTempLocation] = useState('');
  const [tempBio, setTempBio] = useState('');

  const handleOpenEditProfile = () => {
    setTempName(profileName);
    setTempDetails(profileDetails);
    setTempLocation(profileLocation);
    setTempBio(profileBio);
    setTempIsOnline(isOnline);
    setIsEditProfileOpen(true);
  };

  const handleSaveProfile = () => {
    setProfileName(tempName);
    setProfileDetails(tempDetails);
    setProfileLocation(tempLocation);
    setProfileBio(tempBio);
    setIsOnline(tempIsOnline);
    setIsEditProfileOpen(false);
  };

  const [isPhotoGalleryOpen, setIsPhotoGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [isAnnouncementsOpen, setIsAnnouncementsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [showAllProperties, setShowAllProperties] = useState(false);

  const checkLandlordAccount = useCallback(async () => {
    if (!user) return;
    setIsLandlord(true);
  }, [user]);

  useEffect(() => {
    checkLandlordAccount();
  }, [checkLandlordAccount]);

  const MOCK_TENANTS: TenantInfo[] = [
    { id: 't1', name: 'Maria Santos', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MariaSantos&backgroundColor=b6e3f4', email: 'maria@email.com', phone: '09171234567', moveInDate: '2025-01-15', status: 'active', paymentStatus: 'paid' },
    { id: 't2', name: 'Juan Dela Cruz', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JuanDelaCruz&backgroundColor=b6e3f4', email: 'juan@email.com', phone: '09181234567', moveInDate: '2025-02-01', status: 'active', paymentStatus: 'paid' },
    { id: 't3', name: 'Ana Reyes', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AnaReyes&backgroundColor=b6e3f4', email: 'ana@email.com', phone: '09191234567', moveInDate: '2025-03-10', status: 'leaving', paymentStatus: 'pending' },
    { id: 't4', name: 'Carlos Garcia', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CarlosGarcia&backgroundColor=b6e3f4', email: 'carlos@email.com', phone: '09201234567', moveInDate: '2025-04-01', status: 'active', paymentStatus: 'paid' },
    { id: 't5', name: 'Sofia Lim', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SofiaLim&backgroundColor=b6e3f4', email: 'sofia@email.com', phone: '09211234567', moveInDate: '2025-05-15', status: 'moved_out', paymentStatus: 'overdue' },
  ];

  const getTenantsForListing = useCallback((listingId: string): TenantInfo[] => {
    const hash = listingId.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const count = (hash % 4) + 2;
    return MOCK_TENANTS.slice(0, Math.min(count, MOCK_TENANTS.length));
  }, []);

  const handleOpenGallery = (listing: Listing | null, fallbackSrc: string = '') => {
    const fallbackImages = [
      'https://images.unsplash.com/photo-1555819485-99aaa4aee26b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
    ];
    let imgs: string[] = [];
    if (listing?.gallery && Array.isArray(listing.gallery) && listing.gallery.length > 0) {
      imgs = listing.gallery;
    } else if (listing?.image) {
      imgs = [listing.image];
    } else if (fallbackSrc) {
      imgs = [fallbackSrc];
    }
    if (imgs.length < 4) {
      imgs = [...imgs, ...fallbackImages.slice(0, 4 - imgs.length)];
    }
    setGalleryImages(imgs);
    setIsPhotoGalleryOpen(true);
  };

  const isAnyModalOpen = useMemo(() =>
    isCreateListingOpen || showSignupModal ||
    isTenantsModalOpen || isPropertiesModalOpen || isInquiriesModalOpen ||
    isEditProfileOpen || selectedStatModal !== null || editingListing !== null ||
    isPhotoGalleryOpen || isAnnouncementsOpen || isLogoutModalOpen ||
    selectedListingDetail !== null,
    [isCreateListingOpen, showSignupModal, isTenantsModalOpen,
     isPropertiesModalOpen, isInquiriesModalOpen, isEditProfileOpen, selectedStatModal,
     editingListing, isPhotoGalleryOpen, isAnnouncementsOpen, isLogoutModalOpen,
     selectedListingDetail]
  );

  useBodyScrollLock(isAnyModalOpen);

  useEffect(() => {
    if (myListings.length > 0) {
      const initial: Record<string, boolean> = {};
      myListings.forEach(l => { initial[l.id] = l.isActive !== false; });
      setListingVisibility(initial);
    }
  }, [myListings]);

  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    if (openMenuId) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openMenuId]);

  const handleToggleListing = useCallback(async (listingId: string) => {
    const currentVisible = listingVisibility[listingId] !== false;
    const newVisible = !currentVisible;
    setListingVisibility(prev => ({ ...prev, [listingId]: newVisible }));
    setMyListings(prev => prev.map(l => l.id === listingId ? { ...l, isActive: newVisible } : l));
    const { error } = await updateListing(listingId, { isActive: newVisible });
    if (error) {
      setListingVisibility(prev => ({ ...prev, [listingId]: currentVisible }));
      setMyListings(prev => prev.map(l => l.id === listingId ? { ...l, isActive: currentVisible } : l));
      showToast('Failed to update listing', 'error');
    } else {
      showToast(newVisible ? 'Listing is now active' : 'Listing hidden from search', 'success');
    }
  }, [listingVisibility, showToast, setListingVisibility, setMyListings]);

  const fetchMyListings = useCallback(async () => {
    if (!user) return;
    setLoadingListings(true);
    const { getListings } = await import('../lib/api/listings');
    const { data } = await getListings();
    setMyListings((data || []).filter((l) => l.host?.name === user?.email?.split('@')[0]) as Listing[]);
    setLoadingListings(false);
  }, [user, setLoadingListings, setMyListings]);

  useEffect(() => {
    if (user && isLandlord) {
      fetchMyListings();
    }
  }, [user, isLandlord, fetchMyListings]);

  const statCards = isLandlord
    ? [
        { title: 'Properties', count: '4', sub: 'Listed' },
        { title: 'Tenants', count: '12', sub: 'Active' },
      ]
    : [
        { title: 'Houses', count: '12', sub: 'Saved' },
        { title: 'Roommate', count: '6', sub: 'Saved' },
        { title: 'Invitation', count: '0', sub: 'Received' },
      ];

  const mockListed = listingVisibility['mock-listing'] ?? true;

  const handleStatClick = (title: string) => {
    if (title === 'Tenants') setIsTenantsModalOpen(true);
    else if (title === 'Properties') setIsPropertiesModalOpen(true);
    else setSelectedStatModal(title);
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] pb-32 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative min-h-[440px] md:h-[500px] w-full bg-black flex flex-col justify-end">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/bg_2.png")', opacity: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

        <div className="absolute top-0 left-0 right-0 flex items-center justify-end py-4 md:py-6 px-4 md:px-12 gap-4 z-50 text-white pointer-events-none">
          <button
            aria-label="Announcements"
            onClick={() => setIsAnnouncementsOpen(true)}
            className="flex items-center justify-center w-10 h-10 md:w-16 md:h-16 bg-transparent text-white hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full pointer-events-auto cursor-pointer"
          >
            <Megaphone className="w-5 h-5 md:w-8 md:h-8" />
          </button>
        </div>

        <div className="relative md:absolute md:inset-0 max-w-[2520px] mx-auto px-4 md:px-12 xl:px-20 flex flex-col md:flex-row items-center justify-between z-10 pt-16 pb-2 md:pt-24 md:pb-12 gap-4 md:gap-0">
          <div className="bg-black/30 backdrop-blur-md border border-white/20 rounded-[2rem] p-6 md:p-8 w-full md:w-[60%] lg:w-[45%] text-white shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
              <div className="relative shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"
                  alt="Profile"
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover bg-white shadow-md"
                />
                <div
                  className={`absolute bottom-0.5 right-0.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full border-[3px] border-[#161616] ${
                    isOnline ? 'bg-emerald-500' : 'bg-neutral-400'
                  } shadow-lg transition-colors duration-300`}
                  title={isOnline ? 'Online' : 'Offline'}
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-3">
                  <h1 className="text-2xl md:text-[28px] font-bold tracking-tight text-white">
                    {profileName || 'Your Name'}
                  </h1>
                  <button onClick={handleOpenEditProfile} className="hover:bg-white/20 p-1.5 rounded-full transition cursor-pointer" title="Edit Profile Details">
                    <Edit2 className="w-4 h-4 text-white" />
                  </button>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-3 text-sm text-white/90">
                  <GraduationCap className="w-4 h-4 shrink-0 text-white" />
                  <span>{profileDetails}</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-1.5 text-sm text-white/90">
                  <MapPin className="w-4 h-4 shrink-0 text-white" />
                  <span>{profileLocation}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
              {profileTags.map(tag => (
                <span key={tag} className="px-4 py-1.5 rounded-full border border-white/50 text-[11px] md:text-xs font-semibold bg-transparent text-white hover:bg-white/10 transition cursor-default group relative">
                  {tag}
                  <button
                    onClick={() => setProfileTags(profileTags.filter(t => t !== tag))}
                    className="absolute -top-1 -right-1 bg-neutral-800 text-white rounded-full w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={10} />
                  </button>
                </span>
              ))}
              {isEditingTags ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newTagInput.trim() && !profileTags.includes(newTagInput.trim())) {
                      setProfileTags([...profileTags, newTagInput.trim()]);
                    }
                    setNewTagInput('');
                    setIsEditingTags(false);
                  }}
                  className="inline-flex"
                >
                  <input
                    autoFocus
                    type="text"
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    onBlur={() => {
                      if (newTagInput.trim() && !profileTags.includes(newTagInput.trim())) {
                        setProfileTags([...profileTags, newTagInput.trim()]);
                      }
                      setNewTagInput('');
                      setIsEditingTags(false);
                    }}
                    placeholder="Add tag..."
                    className="px-4 py-1.5 rounded-full border border-white/50 text-[11px] md:text-xs font-semibold bg-white/20 text-white outline-none w-24 placeholder:text-neutral-400"
                  />
                </form>
              ) : (
                <button
                  onClick={() => setIsEditingTags(true)}
                  className="px-4 py-1.5 rounded-full border border-white/50 border-dashed text-[11px] md:text-xs font-semibold bg-black/40 text-white hover:bg-black/60 transition cursor-pointer"
                >
                  + Add tag
                </button>
              )}
            </div>
          </div>

          <div className="w-full md:w-[45%] lg:w-[40%] text-white/80 md:text-white text-sm md:text-xl lg:text-2xl font-normal md:font-semibold leading-relaxed drop-shadow-sm px-2 pb-0 pt-0 md:p-6 group text-center md:text-left mt-0">
            <div className="relative cursor-pointer hover:bg-white/10 p-2 rounded-xl transition" onClick={handleOpenEditProfile} title="Edit Quote/Bio">
              <span className="italic">{profileBio}</span>
              <button className="absolute -top-4 right-0 opacity-0 group-hover:opacity-100 transition p-1 hover:bg-white/20 rounded-full cursor-pointer md:block hidden">
                <Edit2 size={16} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-[2520px] mx-auto px-4 md:px-12 xl:px-20 relative z-20 mt-2 md:mt-8">
        {/* Stat Cards */}
        <div className={`grid ${isLandlord ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'} gap-4 md:gap-6 drop-shadow-sm`}>
          {statCards.map((stat) => (
            <div
              key={stat.title}
              onClick={() => handleStatClick(stat.title)}
              className="bg-white rounded-[1.5rem] p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100 flex flex-col relative group cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute top-5 right-5 md:top-6 md:right-6">
                <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-neutral-900" />
              </div>
              <h3 className="text-base md:text-lg font-bold text-neutral-900 mb-2 md:mb-4 pr-6">{stat.title}</h3>
              <div className="flex items-baseline gap-2 mt-auto">
                <span className="text-3xl md:text-[40px] font-bold text-[#17294F] leading-none">{stat.count}</span>
                <span className="text-sm md:text-base text-neutral-500 font-medium">{stat.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Properties Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-12 mb-6 px-1 gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-black">
            {isLandlord ? 'My Properties' : 'My Living Space'}
          </h2>
          {isLandlord && (
            <button
              onClick={() => setIsCreateListingOpen(true)}
              className="px-6 py-2.5 bg-[#17294F] text-white rounded-full font-bold hover:bg-[#1e3466] shadow-md transition text-sm md:text-base whitespace-nowrap"
            >
              + Add Listing
            </button>
          )}
        </div>

        {isLandlord ? (
          loadingListings ? (
            <div className="flex flex-col gap-6 mb-16">
              {[1, 2].map((i) => (
                <div key={`prop-skeleton-${i}`} className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-3 md:p-4 flex flex-col lg:flex-row gap-4 md:gap-6 border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mx-auto max-w-[340px] md:max-w-none w-full animate-pulse text-left">
                  <div className="w-full lg:w-[380px] aspect-[4/3] lg:aspect-auto h-auto lg:h-[260px] bg-neutral-200 rounded-2xl md:rounded-[1.5rem] shrink-0" />
                  <div className="flex-1 flex flex-col justify-between py-1 px-1 md:py-2 md:px-2 md:pr-4">
                    <div>
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                        <div className="h-7 bg-neutral-200 rounded-lg w-1/2" />
                        <div className="h-6 bg-neutral-200 rounded-full w-24 shrink-0" />
                      </div>
                      <div className="h-4 bg-neutral-200 rounded-md w-1/3 mb-4" />
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="h-6 bg-neutral-200 rounded-full w-12" />
                        <div className="h-6 bg-neutral-200 rounded-full w-16" />
                        <div className="h-6 bg-neutral-200 rounded-full w-16" />
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mt-8 md:mt-0 pt-4 border-t border-neutral-50 lg:border-none lg:pt-0">
                      <div><div className="h-8 bg-neutral-200 rounded-md w-28" /></div>
                      <div className="flex gap-3 w-full md:w-auto">
                        <div className="h-11 bg-neutral-200 rounded-full w-20" />
                        <div className="h-11 bg-neutral-200 rounded-full w-32" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : myListings.length === 0 ? (
            <>
            <div className={`bg-white rounded-[1.5rem] md:rounded-[2rem] p-3 md:p-4 flex flex-col lg:flex-row gap-4 md:gap-6 border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mx-auto max-w-[340px] md:max-w-none w-full text-left relative overflow-hidden transition-colors mb-6 ${!mockListed ? 'opacity-60' : ''}`}>
              <img
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800"
                alt="Mock listing"
                className="w-full lg:w-[380px] aspect-[4/3] lg:aspect-auto h-auto lg:h-[260px] object-cover rounded-2xl md:rounded-[1.5rem] shrink-0"
              />
              <div className="flex-1 flex flex-col justify-between py-1 px-1 md:py-2 md:px-2 md:pr-4">
                <div>
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2 md:gap-4 mb-2">
                    <h3 className="text-lg md:text-2xl font-bold text-neutral-900 tracking-tight leading-tight line-clamp-1">Premium Apartment</h3>
                    <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                      <span className="bg-[#4E4F50] text-white text-[9px] md:text-xs font-bold px-2.5 py-1 md:px-3 md:py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                        6 Available
                      </span>
                      <span className={`text-white text-[9px] md:text-xs font-bold px-2.5 py-1 md:px-3 md:py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap ${mockListed ? 'bg-[#4E4F50]' : 'bg-neutral-400'}`}>
                        {mockListed ? 'Active Listing' : 'Unlisted'}
                      </span>
                      <div className="relative" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setOpenMenuId(openMenuId === 'mock-listing' ? null : 'mock-listing')}
                          className="p-2 hover:bg-neutral-100 rounded-full transition cursor-pointer"
                        >
                          <MoreVertical size={18} className="text-neutral-600" />
                        </button>
                        {openMenuId === 'mock-listing' && (
                          <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-neutral-100 py-1 z-50 min-w-[160px]">
                            <button
                              onClick={() => {
                                setEditingListing({
                                  id: 'mock-listing',
                                  title: 'Premium Apartment',
                                  description: 'A beautiful apartment in Tibanga, Iligan City.',
                                  price: 5000,
                                  location: 'Tibanga, Iligan City',
                                  category: 'apartment',
                                  amenities: ['Wifi', 'AC'],
                                  image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
                                  gallery: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800'],
                                  rating: 5,
                                  reviews: [],
                                  date: '2026-01-01',
                                });
                                setOpenMenuId(null);
                              }}
                              className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition"
                            >
                              <Edit2 size={14} /> Edit
                            </button>
                            <div className="h-px bg-neutral-100 my-1" />
                            <button
                              onClick={() => { navigator.clipboard.writeText(window.location.href); showToast('Link copied!', 'success'); setOpenMenuId(null); }}
                              className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition"
                            >
                              <Copy size={14} /> Copy link
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-neutral-500 text-xs md:text-base mb-3 md:mb-4 flex items-center gap-1">
                    <MapPin size={16} className="shrink-0" /> Tibanga, Iligan City
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-1 bg-white border border-neutral-100 px-3 py-1 rounded-full shadow-sm">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-bold text-neutral-800">5.00</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-4 py-1.5 border border-neutral-200 rounded-full text-xs font-bold text-neutral-700">Wifi</span>
                      <span className="px-4 py-1.5 border border-neutral-200 rounded-full text-xs font-bold text-neutral-700">AC</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-neutral-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Users size={16} className="text-neutral-600" />
                      <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">Tenants</span>
                    </div>
                    <div className="flex items-center">
                      {MOCK_TENANTS.slice(0, 4).map((t, i) => (
                        <div
                          key={t.id}
                          className="w-10 h-10 rounded-full bg-[#b6e3f4] flex items-center justify-center border-2 border-white shadow-sm cursor-pointer hover:ring-2 hover:ring-[#2252D6] hover:ring-offset-1 transition-all overflow-hidden"
                          style={{ marginLeft: i > 0 ? '-8px' : '0', zIndex: MOCK_TENANTS.length - i }}
                          onClick={(e) => { e.stopPropagation(); setSelectedTenants(MOCK_TENANTS); }}
                        >
                          <img
                            src={t.image}
                            alt={t.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      {MOCK_TENANTS.length > 4 && (
                        <span
                          className="w-10 h-10 rounded-full bg-[#4E4F50] text-white text-[11px] font-bold flex items-center justify-center border-2 border-white shadow-sm cursor-pointer hover:bg-[#3a3b3c] transition-colors"
                          style={{ marginLeft: '-8px', zIndex: 0 }}
                          onClick={(e) => { e.stopPropagation(); setSelectedTenants(MOCK_TENANTS); }}
                        >
                          +{MOCK_TENANTS.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mt-8 md:mt-0 pt-4 border-t border-neutral-50 lg:border-none lg:pt-0">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl md:text-[28px] font-black text-black">₱5,000</span>
                    <span className="text-sm md:text-base font-medium text-neutral-500">/month</span>
                  </div>
                  <div className="relative flex items-center" onClick={(e) => e.stopPropagation()}>
                    <button
                      role="switch"
                      aria-checked={mockListed}
                      aria-label="Toggle listing visibility"
                      onClick={() => setListingVisibility(prev => ({ ...prev, 'mock-listing': !mockListed }))}
                      className={`relative w-11 h-6 rounded-full transition-colors duration-300 cursor-pointer ${mockListed ? 'bg-[#4CAF50]' : 'bg-neutral-300'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300 ${mockListed ? 'left-6' : 'left-1'}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {showAllProperties && (
            <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-3 md:p-4 flex flex-col lg:flex-row gap-4 md:gap-6 border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mx-auto max-w-[340px] md:max-w-none w-full text-left relative overflow-hidden transition-colors mb-6">
              <img
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800"
                alt="Mock listing"
                className="w-full lg:w-[380px] aspect-[4/3] lg:aspect-auto h-auto lg:h-[260px] object-cover rounded-2xl md:rounded-[1.5rem] shrink-0"
              />
              <div className="flex-1 flex flex-col justify-between py-1 px-1 md:py-2 md:px-2 md:pr-4">
                <div>
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2 md:gap-4 mb-2">
                    <h3 className="text-lg md:text-2xl font-bold text-neutral-900 tracking-tight leading-tight line-clamp-1">Sunset Boarding House</h3>
                    <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                      <span className="bg-[#4E4F50] text-white text-[9px] md:text-xs font-bold px-2.5 py-1 md:px-3 md:py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                        3 Available
                      </span>
                      <span className={`text-white text-[9px] md:text-xs font-bold px-2.5 py-1 md:px-3 md:py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap ${(listingVisibility['mock-listing-2'] ?? false) ? 'bg-[#4E4F50]' : 'bg-neutral-400'}`}>
                        {(listingVisibility['mock-listing-2'] ?? false) ? 'Active Listing' : 'Unlisted'}
                      </span>
                      <div className="relative" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setOpenMenuId(openMenuId === 'mock-listing-2' ? null : 'mock-listing-2')}
                          className="p-2 hover:bg-neutral-100 rounded-full transition cursor-pointer"
                        >
                          <MoreVertical size={18} className="text-neutral-600" />
                        </button>
                        {openMenuId === 'mock-listing-2' && (
                          <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-neutral-100 py-1 z-50 min-w-[160px]">
                            <button
                              onClick={() => {
                                setEditingListing({
                                  id: 'mock-listing-2',
                                  title: 'Sunset Boarding House',
                                  description: 'A cozy boarding house in Pala-o, Iligan City.',
                                  price: 3500,
                                  location: 'Pala-o, Iligan City',
                                  category: 'boarding house',
                                  amenities: ['Wifi', 'Water'],
                                  image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800',
                                  gallery: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800'],
                                  rating: 4.75,
                                  reviews: [],
                                  date: '2026-03-01',
                                });
                                setOpenMenuId(null);
                              }}
                              className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition"
                            >
                              <Edit2 size={14} /> Edit
                            </button>
                            <div className="h-px bg-neutral-100 my-1" />
                            <button
                              onClick={() => { navigator.clipboard.writeText(window.location.href); showToast('Link copied!', 'success'); setOpenMenuId(null); }}
                              className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition"
                            >
                              <Copy size={14} /> Copy link
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-neutral-500 text-xs md:text-base mb-3 md:mb-4 flex items-center gap-1">
                    <MapPin size={16} className="shrink-0" /> Pala-o, Iligan City
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-1 bg-white border border-neutral-100 px-3 py-1 rounded-full shadow-sm">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-bold text-neutral-800">4.75</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-4 py-1.5 border border-neutral-200 rounded-full text-xs font-bold text-neutral-700">Wifi</span>
                      <span className="px-4 py-1.5 border border-neutral-200 rounded-full text-xs font-bold text-neutral-700">Water</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mt-8 md:mt-0 pt-4 border-t border-neutral-50 lg:border-none lg:pt-0">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl md:text-[28px] font-black text-black">₱3,500</span>
                    <span className="text-sm md:text-base font-medium text-neutral-500">/month</span>
                  </div>
                   <div className="relative flex items-center" onClick={(e) => e.stopPropagation()}>
                    {(() => {
                      const mockListed2 = listingVisibility['mock-listing-2'] ?? false;
                      return (
                        <button
                          role="switch"
                          aria-checked={mockListed2}
                          aria-label="Toggle listing visibility"
                          onClick={() => setListingVisibility(prev => ({ ...prev, 'mock-listing-2': !mockListed2 }))}
                          className={`relative w-11 h-6 rounded-full transition-colors duration-300 cursor-pointer ${mockListed2 ? 'bg-[#4CAF50]' : 'bg-neutral-300'}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300 ${mockListed2 ? 'left-6' : 'left-1'}`} />
                        </button>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
            )}
              <div className="flex justify-center mb-8">
              <button
                onClick={() => setShowAllProperties(!showAllProperties)}
                className="px-6 py-2.5 border-[1.5px] border-neutral-300 text-neutral-600 rounded-full font-bold hover:bg-neutral-100 transition active:scale-95 text-sm"
              >
                {showAllProperties ? 'Show Less' : 'Show All'}
              </button>
            </div>
            </>
          ) : (
            <div className="flex flex-col gap-6 mb-6">
              {(showAllProperties ? myListings : myListings.slice(0, 1)).map(listing => {
                const isListed = listingVisibility[listing.id] ?? true;
                return (
                <div key={listing.id} onClick={() => setSelectedListingDetail(listing)} className={`bg-white rounded-[1.5rem] md:rounded-[2rem] p-3 md:p-4 flex flex-col lg:flex-row gap-4 md:gap-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100 mx-auto max-w-[340px] md:max-w-none w-full cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 ${!isListed ? 'opacity-60' : ''}`}>
                  <div className="w-full lg:w-[380px] aspect-[4/3] lg:aspect-auto h-auto lg:h-[260px] shrink-0 relative overflow-hidden rounded-2xl md:rounded-[1.5rem] group">
                    <img
                      src={listing.image || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800'}
                      alt={listing.title}
                      className="w-full h-full object-cover shrink-0 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1 px-1 md:py-2 md:px-2 md:pr-4">
                    <div>
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-2 md:gap-4 mb-2">
                        <h3 className="text-lg md:text-2xl font-bold text-neutral-900 tracking-tight leading-tight line-clamp-1">{listing.title}</h3>
                        <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                          <span className="bg-[#4E4F50] text-white text-[9px] md:text-xs font-bold px-2.5 py-1 md:px-3 md:py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                            {listing.date || '6 Available'}
                          </span>
                          <span className={`text-white text-[9px] md:text-xs font-bold px-2.5 py-1 md:px-3 md:py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap ${isListed ? 'bg-[#4E4F50]' : 'bg-neutral-400'}`}>
                            {isListed ? 'Active Listing' : 'Unlisted'}
                          </span>
                          <div className="relative" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => setOpenMenuId(openMenuId === listing.id ? null : listing.id)}
                              className="p-2 hover:bg-neutral-100 rounded-full transition cursor-pointer"
                            >
                              <MoreVertical size={18} className="text-neutral-600" />
                            </button>
                            {openMenuId === listing.id && (
                              <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-neutral-100 py-1 z-50 min-w-[160px]">
                                <button
                                  onClick={() => { setEditingListing(listing); setOpenMenuId(null); }}
                                  className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition"
                                >
                                  <Edit2 size={14} /> Edit
                                </button>
                                <div className="h-px bg-neutral-100 my-1" />
                                <button
                                  onClick={() => { navigator.clipboard.writeText(window.location.href); showToast('Link copied!', 'success'); setOpenMenuId(null); }}
                                  className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition"
                                >
                                  <Copy size={14} /> Copy link
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <p className="text-neutral-500 text-xs md:text-base mb-3 md:mb-4 flex items-center gap-1">
                        <MapPin size={16} className="shrink-0" /> {listing.location}
                      </p>
                      <p className="text-neutral-500 text-xs md:text-sm mb-3 line-clamp-2 leading-relaxed">{listing.description}</p>
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-neutral-50 border border-neutral-100 rounded-full text-xs font-bold text-neutral-600">{listing.category}</span>
                        <span className="px-3 py-1 bg-neutral-50 border border-neutral-100 rounded-full text-xs font-bold text-neutral-600">{listing.date}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4">
                        {listing.rating > 0 && (
                          <div className="flex items-center gap-1 bg-white border border-neutral-100 px-3 py-1 rounded-full shadow-sm">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-bold text-neutral-800">{listing.rating.toFixed(1)}</span>
                            <span className="text-xs text-neutral-400">({listing.reviews.length})</span>
                          </div>
                        )}
                        <div className="flex flex-wrap gap-2">
                          {listing.amenities?.slice(0, 4).map((amenity: string, idx: number) => (
                            <span key={idx} className="px-3 py-1 border border-neutral-200 rounded-full text-xs font-bold text-neutral-700">{amenity}</span>
                          ))}
                          {listing.amenities && listing.amenities.length > 4 && (
                            <span className="px-3 py-1 border border-neutral-200 rounded-full text-xs font-bold text-neutral-400">+{listing.amenities.length - 4}</span>
                          )}
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-neutral-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Users size={16} className="text-neutral-600" />
                          <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">Tenants</span>
                        </div>
                        {(() => {
                          const listingTenants = getTenantsForListing(listing.id);
                          const visible = listingTenants.slice(0, 4);
                          const remaining = listingTenants.length - 4;
                          return (
                            <div className="flex items-center">
                              {visible.map((tenant, i) => (
                                <div
                                  key={tenant.id}
                                  className="w-10 h-10 rounded-full bg-[#b6e3f4] flex items-center justify-center border-2 border-white shadow-sm cursor-pointer hover:ring-2 hover:ring-[#2252D6] hover:ring-offset-1 transition-all overflow-hidden"
                                  style={{ marginLeft: i > 0 ? '-8px' : '0', zIndex: listingTenants.length - i }}
                                  title={tenant.name}
                                  onClick={(e) => { e.stopPropagation(); setSelectedTenants(listingTenants); }}
                                >
                                  <img
                                    src={tenant.image}
                                    alt={tenant.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ))}
                              {remaining > 0 && (
                                <span
                                  className="w-10 h-10 rounded-full bg-[#4E4F50] text-white text-[11px] font-bold flex items-center justify-center border-2 border-white shadow-sm cursor-pointer hover:bg-[#3a3b3c] transition-colors"
                                  style={{ marginLeft: '-8px', zIndex: 0 }}
                                  onClick={(e) => { e.stopPropagation(); setSelectedTenants(listingTenants); }}
                                >
                                  +{remaining}
                                </span>
                              )}
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mt-8 md:mt-0 pt-4 border-t border-neutral-50 lg:border-none lg:pt-0">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl md:text-[28px] font-black text-black">₱{listing.price.toLocaleString()}</span>
                        <span className="text-sm md:text-base font-medium text-neutral-500">/month</span>
                      </div>
                      <div className="flex flex-wrap items-center justify-end gap-3 w-full md:w-auto">
                        <button onClick={(e) => { e.stopPropagation(); setEditingListing(listing); }} className="flex-1 md:flex-none px-6 py-3 border-[1.5px] border-neutral-600 text-neutral-700 rounded-full font-bold hover:bg-neutral-50 transition active:scale-95 text-sm md:text-base whitespace-nowrap flex items-center justify-center gap-2">
                          <Edit2 size={16} className="text-neutral-600" /> Edit
                        </button>
                        <div className="relative flex items-center" onClick={(e) => e.stopPropagation()}>
                          <button
                            role="switch"
                            aria-checked={isListed}
                            aria-label="Toggle listing visibility"
                            onClick={() => handleToggleListing(listing.id)}
                            className={`relative w-11 h-6 rounded-full transition-colors duration-300 cursor-pointer ${isListed ? 'bg-[#4CAF50]' : 'bg-neutral-300'}`}
                          >
                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300 ${isListed ? 'left-6' : 'left-1'}`} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
              })}
            <div className="flex justify-center mb-8">
                <button
                  onClick={() => setShowAllProperties(!showAllProperties)}
                  className="px-6 py-2.5 border-[1.5px] border-neutral-300 text-neutral-600 rounded-full font-bold hover:bg-neutral-100 transition active:scale-95 text-sm"
                >
                  {showAllProperties ? 'Show Less' : 'Show All'}
                </button>
              </div>
            </div>
          )
        ) : (() => {
          const reservations = [
            {
              id: 'res-1',
              title: "Layla's Residences & Dorminitory",
              location: 'Iligan City, Lanao del norte 9200',
              image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
              price: 6000,
              rating: 5.0,
              reviews: 35,
              amenities: ['Free Wifi', 'Water'],
              available: '6 available',
              tenants: MOCK_TENANTS.slice(0, 5),
            },
            {
              id: 'res-2',
              title: 'Sunset Boarding House',
              location: 'Pala-o, Iligan City 9200',
              image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800',
              price: 3500,
              rating: 4.75,
              reviews: 22,
              amenities: ['Wifi', 'Water'],
              available: '3 available',
              tenants: MOCK_TENANTS.slice(1, 5),
            },
            {
              id: 'res-3',
              title: 'Greenview Apartments',
              location: 'Santiago, Iligan City 9200',
              image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
              price: 4500,
              rating: 4.8,
              reviews: 18,
              amenities: ['AC', 'Free Wifi'],
              available: '2 available',
              tenants: MOCK_TENANTS.slice(0, 4),
            },
          ];

          return (
            <div className="flex flex-col gap-6 mb-6">
              {reservations.slice(0, 1).map((res) => (
                <div key={res.id} className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-3 md:p-4 flex flex-col lg:flex-row gap-4 md:gap-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100 mx-auto max-w-[340px] md:max-w-none w-full">
                  <div className="w-full lg:w-[380px] aspect-[4/3] lg:aspect-auto h-auto lg:h-[260px] relative overflow-hidden rounded-2xl md:rounded-[1.5rem] group cursor-zoom-in shrink-0" onClick={() => handleOpenGallery(null, res.image)}>
                    <img
                      src={res.image}
                      alt={res.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1 px-1 md:py-2 md:px-2 md:pr-4">
                    <div>
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-2 md:gap-4 mb-2">
                        <h3 className="text-lg md:text-2xl font-bold text-neutral-900 tracking-tight leading-tight">{res.title}</h3>
                        <span className="bg-[#4E4F50] text-white text-[9px] md:text-xs font-bold px-2.5 py-1 md:px-3 md:py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap self-start sm:self-auto">
                          {res.available}
                        </span>
                      </div>
                      <p className="text-neutral-500 text-xs md:text-base mb-3 md:mb-4 flex items-center gap-1">
                        <MapPin size={16} className="shrink-0" /> {res.location}
                      </p>
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-1 bg-white border border-neutral-100 px-3 py-1 rounded-full shadow-sm">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-bold text-neutral-800">{res.rating.toFixed(2)}</span>
                          <span className="text-sm text-neutral-400">({res.reviews})</span>
                        </div>
                        <div className="flex gap-2">
                          {res.amenities.map((amenity) => (
                            <span key={amenity} className="px-4 py-1.5 border border-neutral-200 rounded-full text-xs font-bold text-neutral-700">{amenity}</span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-neutral-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Users size={16} className="text-neutral-600" />
                          <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">Tenants</span>
                        </div>
                        <div className="flex items-center">
                          {res.tenants.slice(0, 4).map((t, i) => (
                            <div
                              key={t.id}
                              className="w-10 h-10 rounded-full bg-[#b6e3f4] flex items-center justify-center border-2 border-white shadow-sm cursor-pointer hover:ring-2 hover:ring-[#2252D6] hover:ring-offset-1 transition-all overflow-hidden"
                              style={{ marginLeft: i > 0 ? '-8px' : '0', zIndex: res.tenants.length - i }}
                              title={t.name}
                              onClick={(e) => { e.stopPropagation(); setSelectedTenants(res.tenants); }}
                            >
                              <img
                                src={t.image}
                                alt={t.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                          {res.tenants.length > 4 && (
                            <span
                              className="w-10 h-10 rounded-full bg-[#4E4F50] text-white text-[11px] font-bold flex items-center justify-center border-2 border-white shadow-sm cursor-pointer hover:bg-[#3a3b3c] transition-colors"
                              style={{ marginLeft: '-8px', zIndex: 0 }}
                              onClick={(e) => { e.stopPropagation(); setSelectedTenants(res.tenants); }}
                            >
                              +{res.tenants.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mt-8 md:mt-0 pt-4 border-t border-neutral-50 lg:border-none lg:pt-0">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl md:text-[28px] font-black text-black">₱{res.price.toLocaleString()}</span>
                        <span className="text-sm md:text-base font-medium text-neutral-500">/month</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })()}

        {/* Settings & Preferences */}
        <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-neutral-100 mb-16">
          <div className="flex flex-col gap-6 md:gap-7 my-2 pl-2">
            <div className="flex items-center justify-between w-full group cursor-pointer" onClick={() => setIsLandlord(!isLandlord)}>
              <div className="flex items-center gap-5">
                <div className={`transition-colors duration-200 ${isLandlord ? 'text-[#2252D6]' : 'text-neutral-800 group-hover:text-[#2252D6]'}`}>
                  <Building className="w-6 h-6 stroke-[1.8]" />
                </div>
                <span className={`text-lg font-medium transition-colors duration-200 ${isLandlord ? 'text-neutral-950' : 'text-neutral-800 group-hover:text-neutral-950'}`}>
                  Landlord Mode
                </span>
              </div>
              <div className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${isLandlord ? 'bg-[#2252D6]' : 'bg-neutral-300'}`}>
                <div
                  className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm flex items-center justify-center"
                >
                  {isLandlord && <Check className="w-3 h-3 text-[#2252D6]" strokeWidth={3} />}
                </div>
              </div>
            </div>

            {menuItems.map((item) => (
              <button key={item.title} onClick={item.action} className="flex items-center gap-5 text-left w-full group cursor-pointer">
                <div className="text-neutral-800 group-hover:text-[#2252D6] transition-colors duration-200">
                  <item.icon className="w-6 h-6 stroke-[1.8]" />
                </div>
                <span className="text-lg font-medium text-neutral-800 group-hover:text-neutral-950 transition-colors duration-200">
                  {item.title}
                </span>
              </button>
            ))}

            <div className="h-px bg-neutral-100 my-2" />

            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="flex items-center gap-5 text-left w-full group cursor-pointer"
            >
              <div className="text-red-500 group-hover:text-red-600 transition-colors duration-200">
                <LogOut className="w-6 h-6 stroke-[1.8]" />
              </div>
              <span className="text-lg font-semibold text-red-500 group-hover:text-red-600 transition-colors duration-200">
                Log out
              </span>
            </button>
          </div>
        </div>
      </div>

      <Footer />
      <BottomNav />

      {/* Modals */}
      <LandlordSignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSuccess={() => { setIsLandlord(true); }}
      />

      {editingListing && (
        <EditListingModal
          isOpen={true}
          listing={editingListing}
          onClose={() => setEditingListing(null)}
          onSuccess={() => { fetchMyListings(); setEditingListing(null); }}
        />
      )}

      {isCreateListingOpen && (
        <CreateListingModal
          isOpen={isCreateListingOpen}
          onClose={() => setIsCreateListingOpen(false)}
          onSuccess={() => { fetchMyListings(); setIsCreateListingOpen(false); }}
        />
      )}

      <StatCardModal title={selectedStatModal} onClose={() => setSelectedStatModal(null)} />

      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        tempName={tempName}
        tempDetails={tempDetails}
        tempLocation={tempLocation}
        tempBio={tempBio}
        tempIsOnline={tempIsOnline}
        onTempNameChange={setTempName}
        onTempDetailsChange={setTempDetails}
        onTempLocationChange={setTempLocation}
        onTempBioChange={setTempBio}
        onTempIsOnlineChange={setTempIsOnline}
        onSave={handleSaveProfile}
      />

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={() => { signOut(); setIsLogoutModalOpen(false); navigate('/'); }}
      />

      <PhotoCarouselOverlay
        isOpen={isPhotoGalleryOpen}
        images={galleryImages}
        initialIndex={0}
        onClose={() => setIsPhotoGalleryOpen(false)}
      />
      <AnnouncementsOverlay isOpen={isAnnouncementsOpen} onClose={() => setIsAnnouncementsOpen(false)} />
      <TenantsModal isOpen={isTenantsModalOpen} onClose={() => setIsTenantsModalOpen(false)} />
      <PropertiesModal
        isOpen={isPropertiesModalOpen}
        onClose={() => setIsPropertiesModalOpen(false)}
        listings={myListings}
        onAddListing={() => {
          setIsPropertiesModalOpen(false);
          setIsCreateListingOpen(true);
        }}
      />
      <InquiriesModal isOpen={isInquiriesModalOpen} onClose={() => setIsInquiriesModalOpen(false)} />
      {selectedListingDetail && (
        <ListingDetailModal
          isOpen={true}
          onClose={() => setSelectedListingDetail(null)}
          listing={selectedListingDetail}
        />
      )}
      <TenantProfileModal
        tenants={selectedTenants}
        isOpen={selectedTenants.length > 0}
        onClose={() => setSelectedTenants([])}
      />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Listing } from '../types';
import { 
  ChevronLeft, 
  Megaphone,
  GraduationCap,
  MapPin,
  Edit2,
  ArrowUpRight,
  Star,
  Settings,
  Shield,
  HelpCircle,
  LogOut,
  Bell,
  Globe,
  Building,
  Check,
  Loader2,
  X,
  Eye,
  EyeOff,
  Lock,
  Chrome,
  Facebook,
  Mail,
  TrendingUp
} from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { useAuth } from '../lib/AuthContext';
import { supabase } from '../mocks/supabase';
import { EditListingModal } from '../components/EditListingModal';
import { CreateListingModal } from '../components/CreateListingModal';
import { PhotoCarouselOverlay } from '../components/PhotoCarouselOverlay';
import { AnnouncementsOverlay } from '../components/AnnouncementsOverlay';
import { AnalyticsModal } from '../components/AnalyticsModal';
import { TenantsModal } from '../components/TenantsModal';

export default function Profile() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isLandlord, setIsLandlord] = useState(false);
  const [hasLandlordAccount, setHasLandlordAccount] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  const [isTenantsModalOpen, setIsTenantsModalOpen] = useState(false);

  
  const menuItems = [
    { title: 'Notifications', icon: Bell, action: () => alert('Notifications clicked') },
    { title: 'Account settings', icon: Settings, action: () => alert('Account settings clicked') },
    { title: 'Help Center', icon: HelpCircle, action: () => alert('Help Center clicked') },
  ];
  
  const [myListings, setMyListings] = useState<any[]>([]);
  const [loadingListings, setLoadingListings] = useState(false);
  const [editingListing, setEditingListing] = useState<any | null>(null);
  const [isCreateListingOpen, setIsCreateListingOpen] = useState(false);

  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isLandlordLogin, setIsLandlordLogin] = useState(true);
  const [landlordEmail, setLandlordEmail] = useState('');
  const [landlordPassword, setLandlordPassword] = useState('');
  const [showLandlordPassword, setShowLandlordPassword] = useState(false);

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

  // Edit Profile Pop-up Overlay State
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
  
  const handleOpenGallery = (listing: Listing | null, fallbackSrc: string = '') => {
    const fallbackImages = [
      'https://images.unsplash.com/photo-1555819485-99aaa4aee26b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800'
    ];
    let imgs: string[] = [];
    if (listing?.gallery && Array.isArray(listing.gallery) && listing.gallery.length > 0) {
      imgs = listing.gallery;
    } else if (listing?.image) {
      imgs = [listing.image];
    } else if (fallbackSrc) {
      imgs = [fallbackSrc];
    }
    
    // Fallbacks just in case we only have 1 image but want to show a gallery anyway for styling (like how the listing detail does it)
    if (imgs.length < 4) {
      imgs = [...imgs, ...fallbackImages.slice(0, 4 - imgs.length)];
    }
    
    setGalleryImages(imgs);
    setIsPhotoGalleryOpen(true);
  };

  const checkLandlordAccount = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('landlord_profiles')
      .select('id')
      .eq('user_id', user.id)
      .maybeSingle();
      
    if (!error && data) {
      setHasLandlordAccount(true);
    }
  };

  useEffect(() => {
    checkLandlordAccount();
  }, [user]);

  useEffect(() => {
    const isAnyModalOpen = 
      isCreateListingOpen || 
      showSignupModal || 
      isAnalyticsModalOpen || 
      isTenantsModalOpen || 
      isEditProfileOpen || 
      selectedStatModal !== null || 
      editingListing !== null || 
      isPhotoGalleryOpen || 
      isAnnouncementsOpen ||
      isLogoutModalOpen;

    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [
    isCreateListingOpen,
    showSignupModal,
    isAnalyticsModalOpen,
    isTenantsModalOpen,
    isEditProfileOpen,
    selectedStatModal,
    editingListing,
    isPhotoGalleryOpen,
    isAnnouncementsOpen,
    isLogoutModalOpen,
  ]);

  const handleSignupAsLandlord = async () => {
    setIsSigningUp(true);
    
    try {
      if (isLandlordLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: landlordEmail,
          password: landlordPassword,
        });

        if (error) {
          alert('Login failed: ' + error.message);
          setIsSigningUp(false);
          return;
        }

        // Check if they have a landlord profile
        if (data?.user) {
          const { data: existing } = await supabase
            .from('landlord_profiles')
            .select('id')
            .eq('user_id', data.user.id)
            .maybeSingle();

          if (existing) {
            setHasLandlordAccount(true);
            setIsLandlord(true);
            setShowSignupModal(false);
          } else {
            alert('This account is not registered as a landlord.');
          }
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: landlordEmail,
          password: landlordPassword,
        });

        if (error) {
          alert('Signup failed: ' + error.message);
          setIsSigningUp(false);
          return;
        }

        if (data?.user) {
          const { error: insertError } = await supabase
            .from('landlord_profiles')
            .insert([{ user_id: data.user.id }]);

          if (insertError) {
             console.error("Error creating landlord profile", insertError);
          }

          setHasLandlordAccount(true);
          setIsLandlord(true);
          setShowSignupModal(false);
        }
      }
    } catch (e: any) {
      alert(e.message);
    }

    setIsSigningUp(false);
  };

  const fetchMyListings = React.useCallback(async () => {
    if (!user) return;
    setLoadingListings(true);
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('host_id', user.id)
      .order('created_at', { ascending: false });

    if (!error) {
      setMyListings(data || []);
    }
    setLoadingListings(false);
  }, [user]);

  useEffect(() => {
    if (user && isLandlord) {
      fetchMyListings();
    }
  }, [user, isLandlord, fetchMyListings]);

  return (
    <div className="min-h-screen bg-[#F9F9F9] pb-32 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative min-h-[440px] md:h-[500px] w-full bg-black flex flex-col justify-end">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/bg_2.png")', opacity: 0.6 }}
        />
        {/* Dark Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-end py-4 md:py-6 px-4 md:px-12 gap-4 z-50 text-white pointer-events-none">
          <button 
            aria-label="Announcements"
            onClick={() => setIsAnnouncementsOpen(true)}
            className="flex items-center justify-center w-10 h-10 md:w-16 md:h-16 bg-transparent text-white transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full pointer-events-auto cursor-pointer"
          >
             <Megaphone className="w-5 h-5 md:w-8 md:h-8" />
          </button>
        </div>

        {/* Content Container */}
        <div className="relative md:absolute md:inset-0 max-w-[2520px] mx-auto px-4 md:px-12 xl:px-20 flex flex-col md:flex-row items-center justify-between z-10 pt-16 pb-2 md:pt-24 md:pb-12 gap-4 md:gap-0">
          
          {/* Left Card: Profile Info */}
          <div className="bg-black/30 backdrop-blur-md border border-white/20 rounded-[2rem] p-6 md:p-8 w-full md:w-[60%] lg:w-[45%] text-white shadow-2xl">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
                 <div className="relative shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" 
                      alt="Profile" 
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover bg-white shadow-md" 
                    />
                    {/* Online status small circle */}
                    <div 
                      className={`absolute bottom-0.5 right-0.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full border-[3px] border-[#161616] ${
                        isOnline ? 'bg-emerald-500' : 'bg-neutral-400'
                      } shadow-lg transition-colors duration-300`}
                      title={isOnline ? 'Online' : 'Offline'}
                    />
                 </div>
                 <div className="flex-1 text-center sm:text-left">
                     <div className="flex items-center justify-center sm:justify-start gap-3">
                       <h1 className="text-2xl md:text-[28px] font-bold tracking-tight text-white">{profileName || 'Your Name'}</h1>
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
              {/* Tags */}
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

          {/* Right Quote */}
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
        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 drop-shadow-sm">
           {(isLandlord ? [
             { title: 'Properties', count: '4', sub: 'Listed' },
             { title: 'Tenants', count: '12', sub: 'Active' },
             { title: 'Inquiries', count: '8', sub: 'Pending' },
             { title: 'Revenue', count: 'P42k', sub: 'This Month' }
           ] : [
             { title: 'Saved', count: '12', sub: 'Houses' },
             { title: 'Reservation', count: '2', sub: 'Houses' },
             { title: 'Roommate', count: '6', sub: 'Applications' },
             { title: 'Invitation', count: '0', sub: 'Received' }
           ]).map((stat, i) => (
             <motion.div 
               key={stat.title}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               onClick={() => {
                 if (stat.title === 'Revenue') {
                   setIsAnalyticsModalOpen(true);
                 } else if (stat.title === 'Tenants') {
                   setIsTenantsModalOpen(true);
                 } else {
                   setSelectedStatModal(stat.title);
                 }
               }}
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
             </motion.div>
           ))}
        </div>

        {/* Section Title */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-12 mb-6 px-1 gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-black">
            {isLandlord ? 'My Properties' : 'My Reservation'}
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

        {/* Reservation / Property Card */}
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
                      <div>
                        <div className="h-8 bg-neutral-200 rounded-md w-28" />
                      </div>
                      <div className="flex gap-3 w-full md:w-auto">
                        <div className="h-11 bg-neutral-200 rounded-full w-20" />
                        <div className="h-11 bg-neutral-200 rounded-full w-32" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-6 mb-16">
              {myListings.length === 0 ? (
                 <div
                   className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-3 md:p-4 flex flex-col lg:flex-row gap-4 md:gap-6 border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mx-auto max-w-[340px] md:max-w-none w-full text-left relative overflow-hidden transition-colors"
                 >
                   <img 
                     src={'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800'} 
                     alt={"Mock Title"} 
                     className="w-full lg:w-[380px] aspect-[4/3] lg:aspect-auto h-auto lg:h-[260px] object-cover rounded-2xl md:rounded-[1.5rem] shrink-0" 
                   />
                   <div className="flex-1 flex flex-col justify-between py-1 px-1 md:py-2 md:px-2 md:pr-4">
                     <div>
                       <div className="flex flex-col sm:flex-row justify-between items-start gap-2 md:gap-4 mb-2">
                          <h3 className="text-lg md:text-2xl font-bold text-neutral-900 tracking-tight leading-tight line-clamp-1">Premium Apartment</h3>
                          <span className="bg-[#4E4F50] text-white text-[9px] md:text-xs font-bold px-2.5 py-1 md:px-3 md:py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap self-start sm:self-auto shrink-0">
                            Active Listing
                          </span>
                       </div>
                       <p className="text-neutral-500 text-xs md:text-base mb-3 md:mb-4 flex items-center gap-1">
                         <MapPin size={16} className="shrink-0"/> Tibanga, Iligan City
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
                     </div>
 
                     <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mt-8 md:mt-0 pt-4 border-t border-neutral-50 lg:border-none lg:pt-0">
                       <div>
                         <div className="flex items-baseline gap-1">
                           <span className="text-2xl md:text-[28px] font-black text-black">₱5,000</span>
                           <span className="text-sm md:text-base font-medium text-neutral-500">/month</span>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
              ) : myListings.map(listing => (
                  <div key={listing.id} className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-3 md:p-4 flex flex-col lg:flex-row gap-4 md:gap-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100 mx-auto max-w-[340px] md:max-w-none w-full">
                  <div className="w-full lg:w-[380px] aspect-[4/3] lg:aspect-auto h-auto lg:h-[260px] shrink-0 relative overflow-hidden rounded-2xl md:rounded-[1.5rem] group cursor-zoom-in" onClick={() => handleOpenGallery(listing)}>
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
                         <span className="bg-[#4E4F50] text-white text-[9px] md:text-xs font-bold px-2.5 py-1 md:px-3 md:py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap self-start sm:self-auto shrink-0">
                           Active Listing
                         </span>
                      </div>
                      <p className="text-neutral-500 text-xs md:text-base mb-3 md:mb-4 flex items-center gap-1">
                        <MapPin size={16} className="shrink-0"/> {listing.location}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4">
                        {listing.rating > 0 && (
                          <div className="flex items-center gap-1 bg-white border border-neutral-100 px-3 py-1 rounded-full shadow-sm">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-bold text-neutral-800">{listing.rating.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="flex flex-wrap gap-2">
                           {listing.amenities?.slice(0, 3).map((amenity: string, idx: number) => (
                             <span key={idx} className="px-4 py-1.5 border border-neutral-200 rounded-full text-xs font-bold text-neutral-700">{amenity}</span>
                           ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mt-8 md:mt-0 pt-4 border-t border-neutral-50 lg:border-none lg:pt-0">
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl md:text-[28px] font-black text-black">₱{listing.price.toLocaleString()}</span>
                          <span className="text-sm md:text-base font-medium text-neutral-500">/month</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center justify-end gap-3 w-full md:w-auto">
                        <button onClick={() => setEditingListing(listing)} className="flex-1 md:flex-none px-6 py-3 border-[1.5px] border-neutral-600 text-neutral-700 rounded-full font-bold hover:bg-neutral-50 transition active:scale-95 text-sm md:text-base whitespace-nowrap flex items-center justify-center gap-2">
                          <Edit2 size={16} className="text-neutral-600" /> Edit
                        </button>
                        <button className="flex-1 md:flex-none px-8 py-3 bg-[#4CAF50] text-white rounded-full font-bold hover:bg-[#43A047] shadow-lg shadow-[#4CAF50]/30 transition active:scale-95 text-sm md:text-base whitespace-nowrap">
                          Manage Tenants
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-3 md:p-4 flex flex-col lg:flex-row gap-4 md:gap-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100 mx-auto max-w-[340px] md:max-w-none mb-16">
            <div className="w-full lg:w-[380px] aspect-[4/3] lg:aspect-auto h-auto lg:h-[260px] relative overflow-hidden rounded-2xl md:rounded-[1.5rem] group cursor-zoom-in shrink-0" onClick={() => handleOpenGallery(null, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800')}>
              <img 
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800" 
                alt="Property" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
            </div>
            <div className="flex-1 flex flex-col justify-between py-1 px-1 md:py-2 md:px-2 md:pr-4">
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2 md:gap-4 mb-2">
                   <h3 className="text-lg md:text-2xl font-bold text-neutral-900 tracking-tight leading-tight">Layla's Residences & Dorminitory</h3>
                   <span className="bg-[#4E4F50] text-white text-[9px] md:text-xs font-bold px-2.5 py-1 md:px-3 md:py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap self-start sm:self-auto">
                     6 available
                   </span>
                </div>
                <p className="text-neutral-500 text-xs md:text-base mb-3 md:mb-4">Iligan City, Lanao del norte 9200</p>
                
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1 bg-white border border-neutral-100 px-3 py-1 rounded-full shadow-sm">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-bold text-neutral-800">5.00</span>
                    <span className="text-sm text-neutral-400">(35)</span>
                  </div>
                  <div className="flex gap-2">
                     <span className="px-4 py-1.5 border border-neutral-200 rounded-full text-xs font-bold text-neutral-700">Free Wifi</span>
                     <span className="px-4 py-1.5 border border-neutral-200 rounded-full text-xs font-bold text-neutral-700">Water</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mt-8 md:mt-0">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl md:text-[28px] font-black text-black">P6000</span>
                    <span className="text-sm md:text-base font-medium text-neutral-500">/month</span>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-3 w-full md:w-auto">
                  <button className="flex-1 md:flex-none px-6 py-3 border-[1.5px] border-neutral-600 text-neutral-700 rounded-full font-bold hover:bg-neutral-50 transition active:scale-95 text-sm md:text-base whitespace-nowrap">
                    Cancel Reservation
                  </button>
                  <button className="flex-1 md:flex-none px-8 py-3 bg-[#4CAF50] text-white rounded-full font-bold hover:bg-[#43A047] shadow-lg shadow-[#4CAF50]/30 transition active:scale-95 text-sm md:text-base whitespace-nowrap">
                    Apply now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings & Preferences Section */}
        <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-neutral-100 mb-16">
          <div className="flex flex-col gap-6 md:gap-7 my-2 pl-2">

            {/* Landlord Toggle */}
            <div className="flex items-center justify-between w-full group cursor-pointer" onClick={() => {
              setIsLandlord(!isLandlord);
            }}>
              <div className="flex items-center gap-5">
                <div className={`transition-colors duration-200 ${isLandlord ? 'text-[#2252D6]' : 'text-neutral-800 group-hover:text-[#2252D6]'}`}>
                  <Building className="w-6 h-6 stroke-[1.8]" />
                </div>
                <span className={`text-lg font-medium transition-colors duration-200 ${isLandlord ? 'text-neutral-950' : 'text-neutral-800 group-hover:text-neutral-950'}`}>
                  Landlord Mode
                </span>
              </div>
              
              {/* Toggle Switch */}
              <div className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${isLandlord ? 'bg-[#2252D6]' : 'bg-neutral-300'}`}>
                <motion.div 
                  className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm flex items-center justify-center"
                  animate={{ x: isLandlord ? 24 : 0 }}
                  transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
                >
                  {isLandlord && <Check className="w-3 h-3 text-[#2252D6]" strokeWidth={3} />}
                </motion.div>
              </div>
            </div>
            
            {/* Notifications, Account, Language, Help */}
            {menuItems.map((item) => (
              <button
                key={item.title}
                onClick={item.action}
                className="flex items-center gap-5 text-left w-full group cursor-pointer"
              >
                <div className="text-neutral-800 group-hover:text-[#2252D6] transition-colors duration-200">
                  <item.icon className="w-6 h-6 stroke-[1.8]" />
                </div>
                <span className="text-lg font-medium text-neutral-800 group-hover:text-neutral-950 transition-colors duration-200">
                  {item.title}
                </span>
              </button>
            ))}

            {/* Separator before Log out */}
            <div className="h-px bg-neutral-100 my-2" />

            {/* Log out */}
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
      
      <BottomNav />

      {/* Landlord Sign Up Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             onClick={() => setShowSignupModal(false)}
             className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
             initial={{ opacity: 0, scale: 0.95, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.95, y: 20 }}
             className="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl z-10"
          >
            <button 
               onClick={() => setShowSignupModal(false)}
               className="absolute top-4 right-4 p-2 hover:bg-neutral-100 rounded-full transition-colors z-20"
            >
               <X size={20} className="text-neutral-500" />
            </button>
            
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold font-display text-[#17294F] mb-2">{isLandlordLogin ? "Welcome back" : "Create Landlord Account"}</h2>
                <p className="text-sm text-neutral-500 font-medium">
                  {isLandlordLogin ? "Sign in to manage your properties." : "Sign up to start listing properties."}
                </p>
              </div>
              
              <form onSubmit={(e) => { e.preventDefault(); handleSignupAsLandlord(); }} className="flex flex-col gap-4">
                 <div className="flex flex-col gap-3">
                   <div className="relative">
                     <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                       <Mail size={18} />
                     </div>
                     <input 
                       type="email" 
                       placeholder="Email" 
                       value={landlordEmail}
                       onChange={(e) => setLandlordEmail(e.target.value)}
                       required
                       className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#17294F] focus:border-transparent transition-all bg-neutral-50 hover:bg-neutral-100 focus:bg-white text-sm font-medium"
                     />
                   </div>
                   <div className="relative">
                     <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                       <Lock size={18} />
                     </div>
                     <input 
                       type={showLandlordPassword ? "text" : "password"} 
                       placeholder="Password"
                       value={landlordPassword}
                       onChange={(e) => setLandlordPassword(e.target.value)}
                       required
                       minLength={6}
                       className="w-full pl-10 pr-12 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#17294F] focus:border-transparent transition-all bg-neutral-50 hover:bg-neutral-100 focus:bg-white text-sm font-medium"
                     />
                     <button 
                       type="button" 
                       onClick={() => setShowLandlordPassword(!showLandlordPassword)}
                       className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 focus:outline-none p-1"
                     >
                       {showLandlordPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                     </button>
                   </div>
                 </div>
                 
                 <button 
                   type="submit"
                   disabled={isSigningUp}
                   className="w-full bg-[#2252D6] text-white py-3 rounded-xl font-bold text-sm tracking-wide mt-2 hover:bg-[#1a41aa] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                 >
                   {isSigningUp ? 'Processing...' : (isLandlordLogin ? 'Sign in to dashboard' : 'Create account')}
                 </button>
              </form>
              
              <div className="flex items-center gap-4 mt-8 mb-6">
                <div className="h-[1px] bg-neutral-200 flex-1"></div>
                <span className="text-xs font-semibold text-neutral-400">or continue with</span>
                <div className="h-[1px] bg-neutral-200 flex-1"></div>
              </div>
  
              <div className="grid grid-cols-3 gap-3">
                <button className="flex items-center justify-center p-3 border border-neutral-200 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors text-[#17294F]">
                  <Chrome size={20} />
                </button>
                <button className="flex items-center justify-center p-3 border border-neutral-200 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors text-[#17294F]">
                  <Facebook size={20} />
                </button>
                <button className="flex items-center justify-center p-3 border border-neutral-200 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors text-[#17294F]">
                  <Globe size={20} />
                </button>
              </div>
            </div>
            
            <div className="bg-neutral-50/50 p-6 flex flex-col items-center justify-center gap-2 text-sm text-neutral-500 font-medium border-t border-neutral-100">
              <div className="flex items-center gap-2">
                {isLandlordLogin ? "Need access?" : "Already have an account?"}
                <button 
                   onClick={() => setIsLandlordLogin(!isLandlordLogin)}
                   className="font-bold text-[#2252D6] hover:underline"
                >
                  {isLandlordLogin ? 'Request an account' : 'Sign in'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {editingListing && (
        <EditListingModal 
          isOpen={true} 
          listing={editingListing}
          onClose={() => setEditingListing(null)}
          onSuccess={() => {
            fetchMyListings();
            setEditingListing(null);
          }}
        />
      )}

      {isCreateListingOpen && (
        <CreateListingModal
          isOpen={isCreateListingOpen}
          onClose={() => setIsCreateListingOpen(false)}
          onSuccess={() => {
            fetchMyListings();
            setIsCreateListingOpen(false);
          }}
        />
      )}

      {/* Stat Card Modal */}
      {selectedStatModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             onClick={() => setSelectedStatModal(null)}
             className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
             initial={{ opacity: 0, scale: 0.95, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.95, y: 20 }}
             className="relative w-full max-w-5xl h-[80vh] bg-white rounded-[2rem] overflow-hidden shadow-2xl z-10 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-neutral-100 shrink-0">
                <h2 className="text-xl font-bold text-neutral-900">{selectedStatModal}</h2>
                <button 
                  onClick={() => setSelectedStatModal(null)}
                  className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-500 hover:text-neutral-900"
                >
                  <X size={20} />
                </button>
            </div>
            <div className="p-6 flex-1 overflow-y-auto">
              <div className="flex flex-col items-center justify-center h-full text-center text-neutral-500 space-y-4">
                 <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center">
                    <ArrowUpRight className="w-8 h-8 text-neutral-400" />
                 </div>
                 <p className="text-lg">Detailed view for <strong>{selectedStatModal}</strong> is currently empty.</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Edit Profile Pop-up Overlay Modal */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             onClick={() => setIsEditProfileOpen(false)}
             className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
             initial={{ opacity: 0, scale: 0.95, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.95, y: 20 }}
             className="relative w-full max-w-lg bg-white rounded-[2rem] overflow-hidden shadow-2xl z-10 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-100 bg-neutral-50/50">
               <div className="flex items-center gap-3">
                 <div className="p-2 bg-[#2252D6]/10 rounded-xl text-[#2252D6]">
                   <Edit2 size={20} />
                 </div>
                 <div className="text-left">
                   <h2 className="text-xl font-bold text-neutral-900">Edit Profile Text</h2>
                   <p className="text-xs text-neutral-500 font-medium">Update your public student card & description</p>
                 </div>
               </div>
               <button 
                 onClick={() => setIsEditProfileOpen(false)}
                 className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-400 hover:text-neutral-900 cursor-pointer"
               >
                 <X size={20} />
               </button>
            </div>

            {/* Fields Container */}
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              
              {/* Profile Name Field */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-[#17294F] uppercase tracking-wider block">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    required
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2252D6] focus:border-transparent transition-all bg-neutral-50 hover:bg-neutral-100 focus:bg-white text-sm font-medium text-neutral-800"
                  />
                </div>
              </div>

              {/* Profile Details Field */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-[#17294F] uppercase tracking-wider block">School, Age, & Gender</label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                    <GraduationCap size={18} />
                  </div>
                  <input
                    type="text"
                    value={tempDetails}
                    onChange={(e) => setTempDetails(e.target.value)}
                    placeholder="e.g. MSU-IIT | 20yrs old | Female"
                    className="w-full pl-11 pr-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2252D6] focus:border-transparent transition-all bg-neutral-50 hover:bg-neutral-100 focus:bg-white text-sm font-medium text-neutral-800"
                  />
                </div>
              </div>

              {/* Location Field */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-[#17294F] uppercase tracking-wider block">Living Location</label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                    <MapPin size={18} />
                  </div>
                  <input
                    type="text"
                    value={tempLocation}
                    onChange={(e) => setTempLocation(e.target.value)}
                    placeholder="e.g. Tibanga, Iligan City"
                    className="w-full pl-11 pr-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2252D6] focus:border-transparent transition-all bg-neutral-50 hover:bg-neutral-100 focus:bg-white text-sm font-medium text-neutral-800"
                  />
                </div>
              </div>

              {/* Bio/Quote Field */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-[#17294F] uppercase tracking-wider block">Quote / Bio text</label>
                <div>
                  <textarea
                    rows={4}
                    value={tempBio}
                    onChange={(e) => setTempBio(e.target.value)}
                    placeholder="Add a bio or personal housing quote..."
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2252D6] focus:border-transparent transition-all bg-neutral-50 hover:bg-neutral-100 focus:bg-white text-sm font-medium text-neutral-800 resize-none"
                  />
                </div>
              </div>

              {/* Online Availability Toggle */}
              <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-2xl bg-neutral-50 hover:bg-neutral-100/70 transition-all text-left">
                <div>
                  <span className="text-xs font-bold text-[#17294F] uppercase tracking-wider block">Online Status</span>
                  <p className="text-xs text-neutral-500 font-medium mt-0.5">Show roommates whether you are currently active</p>
                </div>
                <button
                  type="button"
                  onClick={() => setTempIsOnline(!tempIsOnline)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${tempIsOnline ? 'bg-emerald-500' : 'bg-neutral-300'}`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${tempIsOnline ? 'translate-x-5' : 'translate-x-0'}`}
                  />
                </button>
              </div>

            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-neutral-100 bg-neutral-50/50">
               <button
                 type="button"
                 onClick={() => setIsEditProfileOpen(false)}
                 className="px-6 py-2.5 border-[1.5px] border-neutral-200 hover:border-neutral-300 text-neutral-600 font-bold rounded-full transition text-sm cursor-pointer"
               >
                 Cancel
               </button>
               <button
                 type="button"
                 onClick={handleSaveProfile}
                 className="px-8 py-2.5 bg-[#2252D6] hover:bg-[#1a41aa] text-white font-bold rounded-full transition text-sm shadow-md shadow-[#2252D6]/20 cursor-pointer"
               >
                 Save Changes
               </button>
            </div>
         </motion.div>
        </div>
      )}

      {/* Log out Pop-up Overlay Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             onClick={() => setIsLogoutModalOpen(false)}
             className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
             initial={{ opacity: 0, scale: 0.95, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.95, y: 20 }}
             className="relative w-full max-w-[400px] bg-white p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl z-10 flex flex-col"
          >
             <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mb-2">Are you absolutely sure?</h2>
             <p className="text-neutral-500 mb-8 text-sm md:text-base">
               This action cannot be undone. This will permanently log you out of your account and remove your active session from our servers.
             </p>
             <div className="flex gap-3 mt-auto">
               <button 
                 onClick={() => setIsLogoutModalOpen(false)}
                 className="flex-1 py-3 px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 rounded-xl font-bold transition-colors"
               >
                 Cancel
               </button>
               <button 
                 onClick={() => {
                   signOut();
                   setIsLogoutModalOpen(false);
                   navigate('/');
                 }}
                 className="flex-1 py-3 px-4 bg-[#0A2B4E] hover:bg-[#153a66] text-white rounded-xl font-bold transition-colors"
               >
                 Continue
               </button>
             </div>
          </motion.div>
        </div>
      )}

      <PhotoCarouselOverlay 
        isOpen={isPhotoGalleryOpen}
        images={galleryImages}
        initialIndex={0}
        onClose={() => setIsPhotoGalleryOpen(false)}
      />
      <AnnouncementsOverlay isOpen={isAnnouncementsOpen} onClose={() => setIsAnnouncementsOpen(false)} />
      <AnalyticsModal isOpen={isAnalyticsModalOpen} onClose={() => setIsAnalyticsModalOpen(false)} />
      <TenantsModal isOpen={isTenantsModalOpen} onClose={() => setIsTenantsModalOpen(false)} />
    </div>
  );
}

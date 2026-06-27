// @context: Create listing modal — form for new property listing
// @purpose: Multi-field form (title, description, price, category, image, amenities); submits to supabase mock
// @behavior: Fields include title, description, price, category select, image upload, amenity checkboxes
// @behavior: Image upload via URL input; form validation on required fields; loading spinner during submit
// @side-effects: Calls supabase.from('listings').insert() on submit; creates portal-based modal
// @dependencies: supabase mock, useAuth, motion, lucide-react
// @known-issues: Mock supabase insert returns success without actual persistence

import React, { useState, useRef, useEffect } from 'react';
import { z } from 'zod';

import { X, Upload, XCircle, Loader2, ChevronDown } from 'lucide-react';
import { supabase } from '../mocks/supabase';
import { useAuth } from '../lib/AuthContext';
import MapPicker from './MapPicker';
import { FocusTrap } from './ui/FocusTrap';

const listingSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'Price must be a positive number'),
  location: z.string().min(1, 'Location is required'),
  category: z.string().min(1, 'Category is required'),
});

interface CreateListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const CATEGORIES = ["boarding", "apartment", "pad", "condo", "shared"];
const AMENITIES = ["Wifi", "Kitchen", "AC", "Washer", "Free parking", "Pool", "Gym", "Private bathroom"];

export function CreateListingModal({ isOpen, onClose, onSuccess }: CreateListingModalProps) {
  const { user } = useAuth();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [availableAmenities, setAvailableAmenities] = useState<string[]>(AMENITIES);
  const [isAddingAmenity, setIsAddingAmenity] = useState(false);
  const [newAmenityInput, setNewAmenityInput] = useState('');
  const [advancePaymentMonths, setAdvancePaymentMonths] = useState<number>(1);
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const monthDropdownRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<File[]>([]);
  const [pinLat, setPinLat] = useState<number | null>(null);
  const [pinLng, setPinLng] = useState<number | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (monthDropdownRef.current && !monthDropdownRef.current.contains(event.target as Node)) {
        setIsMonthDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (images.length + newFiles.length > 5) {
        setError('Maximum 5 images allowed');
        return;
      }
      setImages(prev => [...prev, ...newFiles]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to create a listing.');
      return;
    }

    const result = listingSchema.safeParse({ title, description, price, location, category });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      if (images.length === 0) {
        throw new Error('Please upload at least one image.');
      }

      const imageUrls: string[] = [];

      // 1. Upload images to Supabase Storage
      for (const file of images) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('listing-images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('listing-images')
          .getPublicUrl(filePath);

        imageUrls.push(publicUrl);
      }

      // 2. Save Listing to Supabase Database
      const newListing = {
        title,
        description,
        price: parseFloat(price),
        location,
        category,
        amenities: selectedAmenities,
        advance_payment_months: advancePaymentMonths,
        image: imageUrls[0], // Main image
        gallery: imageUrls,
        rating: 0,
        host_id: user.id,
        lat: pinLat,
        lng: pinLng,
      };

      const { error: dbError } = await supabase
        .from('listings')
        .insert(newListing);

      if (dbError) throw dbError;

      if (onSuccess) onSuccess();
      onClose();
      
      // Reset form
      setTitle('');
      setDescription('');
      setPrice('');
      setLocation('');
      setCategory(CATEGORIES[0]);
      setSelectedAmenities([]);
      setAdvancePaymentMonths(1);
      setImages([]);
      setPinLat(null);
      setPinLng(null);

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred while creating listing.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
        <div 
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />
        
        <FocusTrap
          onClose={onClose}
          ariaLabel="Create Listing"
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          <div className="flex items-center justify-between p-6 border-b border-neutral-100">
            <h2 className="text-xl font-bold text-neutral-800">Add new listing</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-500"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 overflow-y-auto no-scrollbar">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl">
                {error}
              </div>
            )}

            <form id="create-listing-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-semibold text-neutral-800 mb-2">Photos (Max 5)</label>
                <div className="flex flex-wrap gap-4">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative w-24 h-24 rounded-lg overflow-hidden border border-neutral-200">
                      <img src={URL.createObjectURL(img)} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
                      <button 
                        type="button" 
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 bg-white rounded-full p-0.5 shadow hover:scale-110 transition text-red-500"
                      >
                        <XCircle size={16} />
                      </button>
                    </div>
                  ))}
                  
                  {images.length < 5 && (
                    <label className="w-24 h-24 rounded-lg border-2 border-dashed border-neutral-300 flex flex-col items-center justify-center text-neutral-500 cursor-pointer hover:bg-neutral-50 transition">
                      <Upload size={24} className="mb-1" />
                      <span className="text-xs font-medium">Add Photo</span>
                      <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                  )}
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-800 mb-2">Title</label>
                  <input required value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder="e.g. Cozy Boarding House Room" className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#17294F]"/>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-800 mb-2">Price (₱ / month)</label>
                  <input required value={price} onChange={e => setPrice(e.target.value)} type="number" min="0" step="0.01" placeholder="e.g. 2500" className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#17294F]"/>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-neutral-800 mb-2">Location</label>
                  <input required value={location} onChange={e => setLocation(e.target.value)} type="text" placeholder="e.g. Tibanga, Iligan City" className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#17294F]"/>
                </div>

                {/* Map Pin Location */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-neutral-800 mb-2">Pin Exact Location</label>
                  <MapPicker
                    lat={pinLat}
                    lng={pinLng}
                    onLocationSelect={(lat, lng) => {
                      setPinLat(lat);
                      setPinLng(lng);
                    }}
                  />
                </div>

                {/* Months of Advance Payment */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-neutral-800 mb-2">Months of Advance Payment</label>
                  <div className="relative" ref={monthDropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2252D6] focus:border-transparent transition-all bg-neutral-50 hover:bg-neutral-100 focus:bg-white text-sm font-medium text-neutral-800 cursor-pointer flex items-center justify-between"
                    >
                      <span>{advancePaymentMonths} {advancePaymentMonths === 1 ? 'month' : 'months'}</span>
                      <ChevronDown size={16} className={`text-neutral-400 transition-transform ${isMonthDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isMonthDropdownOpen && (
                      <div className="absolute z-50 mt-1 w-full bg-white border border-neutral-200 rounded-xl shadow-lg overflow-hidden">
                        {[1, 2, 3, 6, 12].map(months => (
                          <button
                            key={months}
                            type="button"
                            onClick={() => {
                              setAdvancePaymentMonths(months);
                              setIsMonthDropdownOpen(false);
                            }}
                            className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                              advancePaymentMonths === months
                                ? 'bg-[#2252D6] text-white'
                                : 'text-neutral-800 hover:bg-neutral-50'
                            }`}
                          >
                            {months} {months === 1 ? 'month' : 'months'}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-neutral-800 mb-2">Description</label>
                  <textarea required value={description} onChange={e => setDescription(e.target.value)} rows={4} placeholder="Describe the listing..." className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#17294F] resize-none" />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-neutral-800 mb-2">Category</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition ${category === cat ? 'bg-[#17294F] text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <label className="block text-sm font-semibold text-neutral-800 mb-2">Amenities</label>
                <div className="flex flex-wrap gap-2">
                  {availableAmenities.map(amenity => (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => toggleAmenity(amenity)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition border ${selectedAmenities.includes(amenity) ? 'border-[#17294F] bg-blue-50 text-[#17294F]' : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'}`}
                    >
                      {amenity}
                    </button>
                  ))}
                  {isAddingAmenity ? (
                     <div className="flex items-center gap-2">
                       <input 
                         autoFocus
                         type="text" 
                         value={newAmenityInput} 
                         onChange={(e) => setNewAmenityInput(e.target.value)}
                         onKeyDown={(e) => {
                           if (e.key === 'Enter') {
                             e.preventDefault();
                             if (newAmenityInput.trim() && !availableAmenities.includes(newAmenityInput.trim())) {
                               setAvailableAmenities([...availableAmenities, newAmenityInput.trim()]);
                               setSelectedAmenities([...selectedAmenities, newAmenityInput.trim()]);
                             }
                             setNewAmenityInput('');
                             setIsAddingAmenity(false);
                           } else if (e.key === 'Escape') {
                             setIsAddingAmenity(false);
                           }
                         }}
                         className="px-3 py-[7px] border border-neutral-300 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#17294F] w-32"
                         placeholder="New..."
                         onBlur={() => {
                             if (newAmenityInput.trim() && !availableAmenities.includes(newAmenityInput.trim())) {
                               setAvailableAmenities([...availableAmenities, newAmenityInput.trim()]);
                               setSelectedAmenities([...selectedAmenities, newAmenityInput.trim()]);
                             }
                             setNewAmenityInput('');
                             setIsAddingAmenity(false);
                         }}
                       />
                     </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsAddingAmenity(true)}
                      className="px-4 py-2 rounded-full text-sm font-medium transition border border-dashed border-neutral-300 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50"
                    >
                      + Add
                    </button>
                  )}
                </div>
              </div>

            </form>
          </div>

          <div className="p-6 border-t border-neutral-100 flex justify-end">
            <button
              type="submit"
              form="create-listing-form"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 bg-[#17294F] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#1e3466] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} />
                  Creating...
                </>
              ) : (
                'Create Listing'
              )}
            </button>
          </div>
        </FocusTrap>
      </div>
  );
}

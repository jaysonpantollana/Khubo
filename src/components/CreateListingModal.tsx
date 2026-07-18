// @context: Create listing modal — form for new property listing
// @purpose: Multi-field form (title, description, price, category, image, amenities); submits to mock
// @behavior: Fields include title, description, price, category select, image upload, amenity checkboxes
// @behavior: Image upload via URL input; form validation on required fields; loading spinner during submit
// @side-effects: Calls createListing on submit; creates portal-based modal
// @dependencies: useAuth, motion, lucide-react

import React, { useState } from 'react';
import { z } from 'zod';

import { X, Upload, XCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import MapPicker from './MapPicker';
import { FocusTrap } from './ui/FocusTrap';

const listingSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'Price must be a positive number'),
  city: z.string().min(1, 'City is required'),
  barangay: z.string().min(1, 'Barangay is required'),
  street: z.string().min(1, 'Street is required'),
  category: z.string().min(1, 'Category is required'),
});

interface CreateListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const DEFAULT_CATEGORIES = ["boarding", "apartment", "pad", "condo", "shared"];
const AMENITIES = ["Wifi", "Kitchen", "AC", "Washer", "Free parking", "Pool", "Gym", "Private bathroom"];

export function CreateListingModal({ isOpen, onClose, onSuccess }: CreateListingModalProps) {
  const { user } = useAuth();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [city, setCity] = useState('');
  const [barangay, setBarangay] = useState('');
  const [street, setStreet] = useState('');
  const [category, setCategory] = useState(DEFAULT_CATEGORIES[0]);
  const [availableCategories, setAvailableCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryInput, setNewCategoryInput] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [availableAmenities, setAvailableAmenities] = useState<string[]>(AMENITIES);
  const [isAddingAmenity, setIsAddingAmenity] = useState(false);
  const [newAmenityInput, setNewAmenityInput] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [preContractualDoc, setPreContractualDoc] = useState<File | null>(null);
  const [pinLat, setPinLat] = useState<number | null>(null);
  const [pinLng, setPinLng] = useState<number | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPreContractualDoc(e.target.files[0]);
    }
  };

  const removeDoc = () => setPreContractualDoc(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to create a listing.');
      return;
    }

    const result = listingSchema.safeParse({ title, description, price, city, barangay, street, category });
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

      // 1. Mock image upload
      for (const file of images) {
        imageUrls.push(URL.createObjectURL(file));
      }

      // 2. Mock document upload
      const docUrl = preContractualDoc ? URL.createObjectURL(preContractualDoc) : undefined;

      // 3. Save listing via API
      const location = `${street}, ${barangay}, ${city}`;
      const newListing = {
        title,
        description,
        price: parseFloat(price),
        location,
        category,
        amenities: selectedAmenities,
        image: imageUrls[0], // Main image
        gallery: imageUrls,
        rating: 0,
        host_id: user.id,
        lat: pinLat ?? undefined,
        lng: pinLng ?? undefined,
        preContractualDoc: docUrl,
      };

      const { error: dbError } = await import('../lib/api/listings').then(m =>
        m.createListing(newListing)
      );

      if (dbError) throw new Error(dbError);

      if (onSuccess) onSuccess();
      onClose();
      
      // Reset form
      setTitle('');
      setDescription('');
      setPrice('');
      setCity('');
      setBarangay('');
      setStreet('');
      setCategory(DEFAULT_CATEGORIES[0]);
      setAvailableCategories(DEFAULT_CATEGORIES);
      setSelectedAmenities([]);
      setImages([]);
      setPreContractualDoc(null);
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
              className="p-2 g-neutral-100 rounded-full transition-colors text-neutral-500"
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
                <div className="flex flex-wrap gap-4 justify-center">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative w-32 h-32 rounded-lg overflow-hidden border border-neutral-200">
                      <img src={URL.createObjectURL(img)} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
                      <button 
                        type="button" 
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 bg-white rounded-full p-0.5 shadow text-red-500"
                      >
                        <XCircle size={16} />
                      </button>
                    </div>
                  ))}
                  
                  {images.length < 5 && (
                    <label className="w-32 h-32 rounded-lg border-2 border-dashed border-neutral-300 flex flex-col items-center justify-center text-neutral-500 cursor-pointer g-neutral-50 transition">
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-neutral-500 mb-1">City</label>
                      <select required value={city} onChange={e => setCity(e.target.value)} className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#17294F] bg-white">
                        <option value="">Select City</option>
                        <option value="Iligan City">Iligan City</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-500 mb-1">Barangay</label>
                      <select required value={barangay} onChange={e => setBarangay(e.target.value)} className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#17294F] bg-white">
                        <option value="">Select Barangay</option>
                        <option value="Abuno">Abuno</option>
                        <option value="Acmac">Acmac</option>
                        <option value="Bagong Silang">Bagong Silang</option>
                        <option value="Bonbonon">Bonbonon</option>
                        <option value="Bunawan">Bunawan</option>
                        <option value="Buru-un">Buru-un</option>
                        <option value="Dalipuga">Dalipuga</option>
                        <option value="Del Carmen">Del Carmen</option>
                        <option value="Digkilaan">Digkilaan</option>
                        <option value="Ditucalan">Ditucalan</option>
                        <option value="Dulag">Dulag</option>
                        <option value="Hinaplanon">Hinaplanon</option>
                        <option value="Hindang">Hindang</option>
                        <option value="Kabacsanan">Kabacsanan</option>
                        <option value="Kalilangan">Kalilangan</option>
                        <option value="Kiwalan">Kiwalan</option>
                        <option value="Lanipao">Lanipao</option>
                        <option value="Luinab">Luinab</option>
                        <option value="Mahayahay">Mahayahay</option>
                        <option value="Mainit">Mainit</option>
                        <option value="Mandulog">Mandulog</option>
                        <option value="Maria Cristina">Maria Cristina</option>
                        <option value="Palao">Palao</option>
                        <option value="Panoroganan">Panoroganan</option>
                        <option value="Poblacion">Poblacion</option>
                        <option value="Puga-an">Puga-an</option>
                        <option value="Rogongon">Rogongon</option>
                        <option value="San Miguel">San Miguel</option>
                        <option value="San Roque">San Roque</option>
                        <option value="Santa Elena">Santa Elena</option>
                        <option value="Santa Filomena">Santa Filomena</option>
                        <option value="Santiago">Santiago</option>
                        <option value="Santo Rosario">Santo Rosario</option>
                        <option value="Saray">Saray</option>
                        <option value="Suarez">Suarez</option>
                        <option value="Tambacan">Tambacan</option>
                        <option value="Tibanga">Tibanga</option>
                        <option value="Tipanoy">Tipanoy</option>
                        <option value="Tomas L. Cabili">Tomas L. Cabili</option>
                        <option value="Tubod">Tubod</option>
                        <option value="Ubaldo Laya">Ubaldo Laya</option>
                        <option value="Upper Hinaplanon">Upper Hinaplanon</option>
                        <option value="Upper Tominobo">Upper Tominobo</option>
                        <option value="Villa Verde">Villa Verde</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-500 mb-1">Street</label>
                      <input required value={street} onChange={e => setStreet(e.target.value)} type="text" placeholder="e.g. Tibanga Highway" className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#17294F]"/>
                    </div>
                  </div>
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

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-neutral-800 mb-2">Description</label>
                  <textarea required value={description} onChange={e => setDescription(e.target.value)} rows={4} placeholder="Describe the listing..." className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#17294F] resize-none" />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-neutral-800 mb-2">Category</label>
                <div className="flex flex-wrap gap-2">
                  {availableCategories.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition ${category === cat ? 'bg-[#17294F] text-white' : 'bg-neutral-100 text-neutral-600 g-neutral-200'}`}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                  {isAddingCategory ? (
                    <input
                      autoFocus
                      type="text"
                      value={newCategoryInput}
                      onChange={(e) => setNewCategoryInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (newCategoryInput.trim() && !availableCategories.includes(newCategoryInput.trim().toLowerCase())) {
                            const val = newCategoryInput.trim().toLowerCase();
                            setAvailableCategories([...availableCategories, val]);
                            setCategory(val);
                          }
                          setNewCategoryInput('');
                          setIsAddingCategory(false);
                        } else if (e.key === 'Escape') {
                          setIsAddingCategory(false);
                        }
                      }}
                      onBlur={() => {
                        if (newCategoryInput.trim() && !availableCategories.includes(newCategoryInput.trim().toLowerCase())) {
                          const val = newCategoryInput.trim().toLowerCase();
                          setAvailableCategories([...availableCategories, val]);
                          setCategory(val);
                        }
                        setNewCategoryInput('');
                        setIsAddingCategory(false);
                      }}
                      className="px-3 py-[7px] border border-neutral-300 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#17294F] w-32"
                      placeholder="New..."
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsAddingCategory(true)}
                      className="px-4 py-2 rounded-full text-sm font-medium transition border border-dashed border-neutral-300 text-neutral-500 ext-neutral-700 g-neutral-50"
                    >
                      + Add
                    </button>
                  )}
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
                      className={`px-4 py-2 rounded-full text-sm font-medium transition border ${selectedAmenities.includes(amenity) ? 'border-[#17294F] bg-blue-50 text-[#17294F]' : 'border-neutral-200 text-neutral-600 order-neutral-300'}`}
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
                      className="px-4 py-2 rounded-full text-sm font-medium transition border border-dashed border-neutral-300 text-neutral-500 ext-neutral-700 g-neutral-50"
                    >
                      + Add
                    </button>
                  )}
                </div>
              </div>

              {/* Pre-Contractual Document */}
              <div>
                <label className="block text-sm font-semibold text-neutral-800 mb-2">Pre-Contractual Document (optional)</label>
                <p className="text-xs text-neutral-500 mb-3">Upload the contract or agreement tenants will review before signing.</p>
                {preContractualDoc ? (
                  <div className="flex items-center gap-3 px-4 py-3 bg-neutral-50 rounded-xl border border-neutral-200">
                    <svg className="w-5 h-5 text-[#17294F] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    <span className="text-sm text-neutral-700 truncate flex-1">{preContractualDoc.name}</span>
                    <button type="button" onClick={removeDoc} className="text-neutral-400 ext-red-500 transition-colors">
                      <XCircle size={16} />
                    </button>
                  </div>
                ) : (
                  <label className="w-32 h-32 rounded-lg border-2 border-dashed border-neutral-300 flex flex-col items-center justify-center text-neutral-500 cursor-pointer g-neutral-50 transition">
                    <Upload size={24} className="mb-1" />
                    <span className="text-xs font-medium text-center px-1">Add Document</span>
                    <input type="file" accept=".pdf,.doc,.docx" onChange={handleDocChange} className="hidden" />
                  </label>
                )}
              </div>

            </form>
          </div>

          <div className="p-6 border-t border-neutral-100 flex justify-end">
            <button
              type="submit"
              form="create-listing-form"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 bg-[#17294F] text-white px-8 py-3.5 rounded-xl font-bold g-[#1e3466] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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

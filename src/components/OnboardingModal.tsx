import { useState, useRef } from 'react';
import { X, Camera, MapPin, ChevronDown, User, Mail, Phone, BookOpen } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const PHILIPPINE_CITIES = [
  'Iligan City',
  'Cagayan de Oro City',
  'Marawi City',
  'Ozamiz City',
  'Davao City',
  'Manila',
  'Quezon City',
  'Cebu City'
];

const BARANGAYS_ILIGAN: Record<string, string[]> = {
  'Iligan City': [
    'Tibanga', 'Pala-o', 'San Miguel', 'Hinaplanon',
    'Suarez', 'Tambacan', 'Barrio Castilla', 'Mahayahay',
    'Ulog', 'Del Carmen', 'Sabay', 'Bagong Silang',
    'Sta. Filomena', 'Sta. Elena', 'Tominobo', 'Digkilaan'
  ],
  'Cagayan de Oro City': [
    'Carmen', 'Lapasan', 'Cogon', 'Puntod',
    'Macasandig', 'Balulang', 'Gusa', 'Bugo'
  ],
  'Marawi City': [
    'Banga', 'Bubong', 'Datu sa Dansalan', 'Mipantao',
    'Moncado', 'Pacalundo', 'Poblacion', 'Sagonsongan'
  ]
};

const MAP_STYLE = {
  container: {
    position: 'relative' as const,
    width: '100%',
    height: '220px',
    borderRadius: '16px',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #e8f0fe 0%, #d4e4fc 50%, #c7daf8 100%)',
    border: '1.5px solid #e2e8f0',
  },
  grid: {
    position: 'absolute' as const,
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(34, 82, 214, 0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(34, 82, 214, 0.06) 1px, transparent 1px)
    `,
    backgroundSize: '40px 40px',
  },
  road: (top: string, left: string, width: string, angle: string) => ({
    position: 'absolute' as const,
    top,
    left,
    width,
    height: '3px',
    background: 'rgba(255,255,255,0.7)',
    transform: `rotate(${angle})`,
    borderRadius: '2px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  }),
  building: (top: string, left: string, size: string, opacity: number) => ({
    position: 'absolute' as const,
    top,
    left,
    width: size,
    height: size,
    background: 'rgba(255,255,255,0.6)',
    borderRadius: '3px',
    opacity,
  }),
  park: (top: string, left: string) => ({
    position: 'absolute' as const,
    top,
    left,
    width: '48px',
    height: '32px',
    background: 'rgba(76, 175, 80, 0.2)',
    borderRadius: '8px',
  }),
};

export function OnboardingModal({ isOpen, onClose, onComplete }: OnboardingModalProps) {
  const [step] = useState(1);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [city, setCity] = useState('');
  const [barangay, setBarangay] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showBarangayDropdown, setShowBarangayDropdown] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [isDraggingPin, setIsDraggingPin] = useState(false);
  const [pinPosition, setPinPosition] = useState({ x: 50, y: 50 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setProfilePhoto(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handlePinMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingPin(true);
  };

  const handleMapMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingPin || !mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPinPosition({
      x: Math.max(5, Math.min(95, x)),
      y: Math.max(5, Math.min(95, y)),
    });
  };

  const handleMapMouseUp = () => setIsDraggingPin(false);

  const handleContinue = () => {
    onComplete();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <div
        className="relative w-full max-w-3xl bg-white rounded-[2rem] overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]"
        onMouseUp={handleMapMouseUp}
        onMouseLeave={handleMapMouseUp}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 hover:bg-neutral-100 rounded-full transition-colors z-20 cursor-pointer"
        >
          <X size={20} className="text-neutral-500" />
        </button>

        <div className="px-8 pt-8 pb-0">
          <div className="flex items-center gap-1.5 mb-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  s <= step ? 'bg-[#2252D6]' : 'bg-neutral-200'
                } ${s === step ? 'flex-1' : 'w-6'}`}
              />
            ))}
          </div>
        </div>

        <div className="px-8 pt-5 pb-6 overflow-y-auto">
          <div className="mb-6">
            <p className="text-xs font-bold text-[#2252D6] tracking-[0.15em] uppercase mb-1">
              Step {step} of 5: Your Identity
            </p>
            <h2 className="text-2xl font-bold text-[#17294F]">Your Identity</h2>
            <p className="text-sm text-neutral-500 font-medium mt-1">
              Let people know who you are
            </p>
          </div>

          <div className="flex flex-col items-center mb-8">
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <div className="w-24 h-24 rounded-full overflow-hidden bg-neutral-100 border-[3px] border-white shadow-lg ring-2 ring-[#2252D6]/20 group-hover:ring-[#2252D6]/40 transition-all">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2252D6]/5 to-[#17294F]/10">
                    <User size={32} className="text-neutral-400" />
                  </div>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#2252D6] rounded-full flex items-center justify-center shadow-md border-2 border-white group-hover:bg-[#1a41aa] transition-colors">
                <Camera size={14} className="text-white" />
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </div>
            <p className="text-xs text-neutral-400 font-medium mt-2">Profile Photo</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#17294F] uppercase tracking-wider block">
                Username / Nickname
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. juan_delacruz"
                  className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2252D6] focus:border-transparent transition-all bg-neutral-50 hover:bg-neutral-100 focus:bg-white text-sm font-medium text-neutral-800"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#17294F] uppercase tracking-wider block">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. juan@email.com"
                  className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2252D6] focus:border-transparent transition-all bg-neutral-50 hover:bg-neutral-100 focus:bg-white text-sm font-medium text-neutral-800"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#17294F] uppercase tracking-wider block">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                  <Phone size={16} />
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +63 912 345 6789"
                  className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2252D6] focus:border-transparent transition-all bg-neutral-50 hover:bg-neutral-100 focus:bg-white text-sm font-medium text-neutral-800"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#17294F] uppercase tracking-wider block">
                Gender
              </label>
              <div className="relative">
                <select
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2252D6] focus:border-transparent transition-all bg-neutral-50 hover:bg-neutral-100 focus:bg-white text-sm font-medium text-neutral-800 appearance-none cursor-pointer"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-[#17294F] uppercase tracking-wider block">
                Short Bio
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-3.5 text-neutral-400">
                  <BookOpen size={16} />
                </div>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us a bit about yourself — your interests, what you're looking for in a place, and what kind of roommate you are..."
                  className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2252D6] focus:border-transparent transition-all bg-neutral-50 hover:bg-neutral-100 focus:bg-white text-sm font-medium text-neutral-800 resize-none"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-[#2252D6] rounded-full" />
              <h3 className="text-base font-bold text-[#17294F]">Current Address</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="space-y-1.5 relative">
                <label className="text-xs font-bold text-[#17294F] uppercase tracking-wider block">
                  City
                </label>
                <div
                  className="relative cursor-pointer"
                  onClick={() => { setShowCityDropdown(!showCityDropdown); setShowBarangayDropdown(false); }}
                >
                  <input
                    type="text"
                    readOnly
                    value={city}
                    placeholder="Select city"
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2252D6] focus:border-transparent transition-all bg-neutral-50 text-sm font-medium text-neutral-800 cursor-pointer"
                  />
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
                    <ChevronDown size={16} />
                  </div>
                </div>
                {showCityDropdown && (
                  <div className="absolute z-30 top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-xl shadow-lg overflow-hidden">
                    {PHILIPPINE_CITIES.map((c) => (
                      <button
                        key={c}
                        type="button"
                        className={`w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-[#2252D6]/5 transition-colors ${
                          city === c ? 'bg-[#2252D6]/10 text-[#2252D6]' : 'text-neutral-700'
                        }`}
                        onClick={() => { setCity(c); setBarangay(''); setShowCityDropdown(false); }}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-1.5 relative">
                <label className="text-xs font-bold text-[#17294F] uppercase tracking-wider block">
                  Barangay
                </label>
                <div
                  className="relative cursor-pointer"
                  onClick={() => { setShowBarangayDropdown(!showBarangayDropdown); setShowCityDropdown(false); }}
                >
                  <input
                    type="text"
                    readOnly
                    value={barangay}
                    placeholder={city ? 'Select barangay' : 'Select city first'}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2252D6] focus:border-transparent transition-all bg-neutral-50 text-sm font-medium text-neutral-800 cursor-pointer disabled:opacity-50"
                  />
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
                    <ChevronDown size={16} />
                  </div>
                </div>
                {showBarangayDropdown && city && (
                  <div className="absolute z-30 top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-xl shadow-lg overflow-hidden max-h-48 overflow-y-auto">
                    {(BARANGAYS_ILIGAN[city] || ['Poblacion', 'Barangay 1', 'Barangay 2', 'Barangay 3']).map((b) => (
                      <button
                        key={b}
                        type="button"
                        className={`w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-[#2252D6]/5 transition-colors ${
                          barangay === b ? 'bg-[#2252D6]/10 text-[#2252D6]' : 'text-neutral-700'
                        }`}
                        onClick={() => { setBarangay(b); setShowBarangayDropdown(false); }}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#17294F] uppercase tracking-wider block">
                  Street Address
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                    <MapPin size={16} />
                  </div>
                  <input
                    type="text"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder="e.g. 123 Rizal St."
                    className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2252D6] focus:border-transparent transition-all bg-neutral-50 hover:bg-neutral-100 focus:bg-white text-sm font-medium text-neutral-800"
                  />
                </div>
              </div>
            </div>

            <div
              ref={mapRef}
              style={MAP_STYLE.container}
              onMouseMove={handleMapMouseMove}
              className="select-none"
            >
              <div style={MAP_STYLE.grid} />
              <div style={MAP_STYLE.road('30%', '0%', '60%', '0deg')} />
              <div style={MAP_STYLE.road('55%', '20%', '70%', '-15deg')} />
              <div style={MAP_STYLE.road('75%', '10%', '55%', '8deg')} />
              <div style={MAP_STYLE.road('15%', '50%', '3px', '90deg')} />
              <div style={MAP_STYLE.road('40%', '65%', '3px', '90deg')} />
              <div style={MAP_STYLE.road('65%', '35%', '3px', '80deg')} />
              <div style={MAP_STYLE.building('12%', '15%', '20px', 0.5)} />
              <div style={MAP_STYLE.building('35%', '8%', '28px', 0.4)} />
              <div style={MAP_STYLE.building('60%', '18%', '22px', 0.45)} />
              <div style={MAP_STYLE.building('20%', '78%', '18px', 0.5)} />
              <div style={MAP_STYLE.building('50%', '72%', '30px', 0.35)} />
              <div style={MAP_STYLE.building('70%', '60%', '24px', 0.4)} />
              <div style={MAP_STYLE.building('10%', '55%', '16px', 0.45)} />
              <div style={MAP_STYLE.building('80%', '80%', '20px', 0.5)} />
              <div style={MAP_STYLE.building('45%', '45%', '15px', 0.6)} />
              <div style={MAP_STYLE.park('68%', '78%')} />

              <div
                className="absolute cursor-grab active:cursor-grabbing transition-transform hover:scale-110"
                style={{
                  left: `${pinPosition.x}%`,
                  top: `${pinPosition.y}%`,
                  transform: 'translate(-50%, -100%)',
                  zIndex: 10,
                }}
                onMouseDown={handlePinMouseDown}
              >
                <svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.268 21.732 0 14 0z" fill="#2252D6" />
                  <path d="M14 4C9.582 4 6 7.582 6 12c0 7 8 14 8 14s8-7 8-14c0-4.418-3.582-8-8-8z" fill="white" />
                  <circle cx="14" cy="12" r="3" fill="#2252D6" />
                </svg>
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-neutral-400 font-medium flex items-center gap-1.5">
                <MapPin size={12} className="text-[#2252D6]" />
                Drag the pin to precisely mark your location
              </p>
              <button
                type="button"
                onClick={() => setPinPosition({ x: 50, y: 50 })}
                className="text-xs font-bold text-[#2252D6] hover:underline"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-8 py-5 border-t border-neutral-100 bg-neutral-50/50">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 border-[1.5px] border-neutral-200 hover:border-neutral-300 text-neutral-600 font-bold rounded-full transition text-sm cursor-pointer"
          >
            Cancel
          </button>
          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-400 font-medium">1 of 5</span>
            <button
              type="button"
              onClick={handleContinue}
              className="px-8 py-2.5 bg-[#2252D6] hover:bg-[#1a41aa] text-white font-bold rounded-full transition text-sm shadow-md shadow-[#2252D6]/20 cursor-pointer"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

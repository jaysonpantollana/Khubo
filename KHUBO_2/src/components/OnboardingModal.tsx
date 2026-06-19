import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Camera, MapPin, ChevronDown, User, Mail, Phone, BookOpen, GraduationCap, Briefcase, Clock, AlertCircle } from 'lucide-react';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { cn } from '../lib/utils';

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

const STEP_TITLES = [
  { title: 'Your Identity', subtitle: 'Let people know who you are' },
  { title: 'Occupation', subtitle: 'What do you do?' },
  { title: 'Roommate Preferences', subtitle: "Tell us what you're looking for" },
  { title: 'Verification', subtitle: 'Prove you are real' },
  { title: 'Almost Done!', subtitle: 'Review your information' },
];

const occupations = [
  { id: 'student', icon: GraduationCap, title: 'Student', subtext: 'Currently enrolled in school or university' },
  { id: 'professional', icon: Briefcase, title: 'Professional', subtext: 'Full-time or part-time employee' },
  { id: 'working-student', icon: Clock, title: 'Working Student', subtext: 'Balancing work and studies' },
];

const idTypes = ['School ID', 'National ID (PhilSys)', "Driver's License", 'Passport'];

export function OnboardingModal({ isOpen, onClose, onComplete }: OnboardingModalProps) {
  useBodyScrollLock(isOpen);
  const [step, setStep] = useState(1);
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
  const [occupation, setOccupation] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setProfilePhoto(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const current = STEP_TITLES[step - 1];

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
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
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
              </div>
              <p className="text-xs text-neutral-400 font-medium mt-2">Profile Photo</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#17294F] uppercase tracking-wider block">Username / Nickname</label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"><User size={16} /></div>
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="e.g. juan_delacruz" className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2252D6] focus:border-transparent transition-all bg-neutral-50 hover:bg-neutral-100 focus:bg-white text-sm font-medium text-neutral-800" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#17294F] uppercase tracking-wider block">Email Address</label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"><Mail size={16} /></div>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g. juan@email.com" className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2252D6] focus:border-transparent transition-all bg-neutral-50 hover:bg-neutral-100 focus:bg-white text-sm font-medium text-neutral-800" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#17294F] uppercase tracking-wider block">Phone Number</label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"><Phone size={16} /></div>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. +63 912 345 6789" className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2252D6] focus:border-transparent transition-all bg-neutral-50 hover:bg-neutral-100 focus:bg-white text-sm font-medium text-neutral-800" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#17294F] uppercase tracking-wider block">Gender</label>
                <div className="relative">
                  <select className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2252D6] focus:border-transparent transition-all bg-neutral-50 hover:bg-neutral-100 focus:bg-white text-sm font-medium text-neutral-800 appearance-none cursor-pointer">
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"><ChevronDown size={16} /></div>
                </div>
              </div>
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-[#17294F] uppercase tracking-wider block">Short Bio</label>
                <div className="relative">
                  <div className="absolute left-3.5 top-3.5 text-neutral-400"><BookOpen size={16} /></div>
                  <textarea rows={3} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell us a bit about yourself..." className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2252D6] focus:border-transparent transition-all bg-neutral-50 hover:bg-neutral-100 focus:bg-white text-sm font-medium text-neutral-800 resize-none" />
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
                  <label className="text-xs font-bold text-[#17294F] uppercase tracking-wider block">City</label>
                  <div className="relative cursor-pointer" onClick={() => { setShowCityDropdown(!showCityDropdown); setShowBarangayDropdown(false); }}>
                    <input type="text" readOnly value={city} placeholder="Select city" className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2252D6] focus:border-transparent transition-all bg-neutral-50 text-sm font-medium text-neutral-800 cursor-pointer" />
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"><ChevronDown size={16} /></div>
                  </div>
                  {showCityDropdown && (
                    <div className="absolute z-30 top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-xl shadow-lg overflow-hidden">
                      {PHILIPPINE_CITIES.map((c) => (
                        <button key={c} type="button" className={`w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-[#2252D6]/5 transition-colors ${city === c ? 'bg-[#2252D6]/10 text-[#2252D6]' : 'text-neutral-700'}`} onClick={() => { setCity(c); setBarangay(''); setShowCityDropdown(false); }}>{c}</button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="space-y-1.5 relative">
                  <label className="text-xs font-bold text-[#17294F] uppercase tracking-wider block">Barangay</label>
                  <div className="relative cursor-pointer" onClick={() => { setShowBarangayDropdown(!showBarangayDropdown); setShowCityDropdown(false); }}>
                    <input type="text" readOnly value={barangay} placeholder={city ? 'Select barangay' : 'Select city first'} className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2252D6] focus:border-transparent transition-all bg-neutral-50 text-sm font-medium text-neutral-800 cursor-pointer disabled:opacity-50" />
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"><ChevronDown size={16} /></div>
                  </div>
                  {showBarangayDropdown && city && (
                    <div className="absolute z-30 top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-xl shadow-lg overflow-hidden max-h-48 overflow-y-auto">
                      {(BARANGAYS_ILIGAN[city] || ['Poblacion', 'Barangay 1', 'Barangay 2', 'Barangay 3']).map((b) => (
                        <button key={b} type="button" className={`w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-[#2252D6]/5 transition-colors ${barangay === b ? 'bg-[#2252D6]/10 text-[#2252D6]' : 'text-neutral-700'}`} onClick={() => { setBarangay(b); setShowBarangayDropdown(false); }}>{b}</button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#17294F] uppercase tracking-wider block">Street Address</label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"><MapPin size={16} /></div>
                    <input type="text" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} placeholder="e.g. 123 Rizal St." className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2252D6] focus:border-transparent transition-all bg-neutral-50 hover:bg-neutral-100 focus:bg-white text-sm font-medium text-neutral-800" />
                  </div>
                </div>
              </div>

            </div>
          </>
        );

      case 2:
        return (
          <div className="space-y-3">
            <p className="text-xs text-neutral-400 leading-relaxed mb-6">
              This helps landlords and roommates understand your schedule and lifestyle.
            </p>
            {occupations.map((occ, i) => {
              const isSelected = occupation === occ.id;
              const Icon = occ.icon;
              return (
                <motion.button
                  key={occ.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                  type="button"
                  onClick={() => setOccupation(occ.id)}
                  className={cn(
                    'w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer text-left group',
                    isSelected
                      ? 'border-[#2252D6]/60 bg-[#2252D6]/5 shadow-sm shadow-[#2252D6]/10'
                      : 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50 hover:shadow-sm'
                  )}
                >
                  <div
                    className={cn(
                      'w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200',
                      isSelected ? 'bg-[#2252D6]/10' : 'bg-neutral-100'
                    )}
                  >
                    <Icon
                      size={22}
                      className={cn(
                        'transition-colors duration-200',
                        isSelected ? 'text-[#2252D6]' : 'text-neutral-500'
                      )}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className={cn(
                        'text-sm font-bold transition-colors duration-200',
                        isSelected ? 'text-[#17294F]' : 'text-neutral-800'
                      )}
                    >
                      {occ.title}
                    </p>
                    <p className="text-xs text-neutral-400 mt-0.5">{occ.subtext}</p>
                  </div>

                  <div
                    className={cn(
                      'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200',
                      isSelected ? 'border-[#2252D6]' : 'border-neutral-300'
                    )}
                  >
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                          className="w-2.5 h-2.5 rounded-full bg-[#2252D6]"
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
              );
            })}
          </div>
        );

      case 3:
        return (
          <div className="space-y-3">
            <p className="text-xs text-neutral-400 leading-relaxed">
              Tell us about your ideal roommate and living preferences.
            </p>
            <div className="bg-neutral-50 rounded-2xl p-8 text-center border border-neutral-200">
              <p className="text-sm text-neutral-500 font-medium">Roommate preferences coming soon</p>
            </div>
          </div>
        );

      case 4:
        return (
          <>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 mb-6">
              <div className="flex-shrink-0 mt-0.5"><AlertCircle size={20} className="text-amber-600" /></div>
              <div>
                <p className="text-sm font-bold text-amber-800">Why do we ask for this?</p>
                <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
                  Khubo verifies real users to protect both tenants and landlords. Your ID is only used for one-time verification and is never shared publicly.
                </p>
              </div>
            </div>
            <p className="text-xs font-bold text-neutral-400 tracking-[0.15em] uppercase mb-3">Select ID Type</p>
            <div className="grid grid-cols-2 gap-3">
              {idTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  className="w-full py-4 px-4 rounded-xl border-2 transition-all duration-200 cursor-pointer text-center"
                  style={{
                    borderColor: type === email ? '#2252D6' : '#e5e5e5',
                    backgroundColor: type === email ? 'rgba(34,82,214,0.05)' : 'white',
                  }}
                >
                  <span className="text-sm font-bold text-neutral-800">{type}</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-neutral-400 text-center mt-6">
              You can also skip this step and verify later from your Profile settings.
            </p>
          </>
        );

      case 5:
        return (
          <div className="space-y-4 text-center py-4">
            <div className="w-16 h-16 bg-[#2252D6]/10 rounded-full flex items-center justify-center mx-auto">
              <User size={28} className="text-[#2252D6]" />
            </div>
            <p className="text-sm text-neutral-500 font-medium">
              You're all set! Review your information and click Finish to complete your profile.
            </p>
            <div className="bg-neutral-50 rounded-2xl p-6 text-left border border-neutral-200 space-y-3">
              <div className="flex justify-between text-sm"><span className="text-neutral-500">Username</span><span className="font-medium text-neutral-800">{username || '—'}</span></div>
              <div className="flex justify-between text-sm"><span className="text-neutral-500">Email</span><span className="font-medium text-neutral-800">{email || '—'}</span></div>
              <div className="flex justify-between text-sm"><span className="text-neutral-500">Phone</span><span className="font-medium text-neutral-800">{phone || '—'}</span></div>
              <div className="flex justify-between text-sm"><span className="text-neutral-500">City</span><span className="font-medium text-neutral-800">{city || '—'}</span></div>
            </div>
          </div>
        );
    }
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
              <button
                key={s}
                type="button"
                onClick={() => setStep(s)}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer border-none ${
                  s <= step ? 'bg-[#2252D6]' : 'bg-neutral-200'
                } ${s === step ? 'flex-1' : 'w-6'}`}
              />
            ))}
          </div>
        </div>

        <div className="px-8 pt-5 pb-6 overflow-y-auto">
          <div className="mb-6">
            <p className="text-xs font-bold text-[#2252D6] tracking-[0.15em] uppercase mb-1">
              Step {step} of 5: {current.title}
            </p>
            <h2 className="text-2xl font-bold text-[#17294F]">{current.title}</h2>
            <p className="text-sm text-neutral-500 font-medium mt-1">
              {current.subtitle}
            </p>
          </div>
          {renderStepContent()}
        </div>

        <div className="flex items-center justify-between px-8 py-5 border-t border-neutral-100 bg-neutral-50/50">
          <button
            type="button"
            onClick={step > 1 ? () => setStep(step - 1) : onClose}
            className="px-6 py-2.5 border-[1.5px] border-neutral-200 hover:border-neutral-300 text-neutral-600 font-bold rounded-full transition text-sm cursor-pointer"
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </button>
          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-400 font-medium">{step} of 5</span>
            <button
              type="button"
              disabled={step === 2 && !occupation}
              onClick={() => {
                if (step < 5) {
                  setStep(step + 1);
                } else {
                  onComplete();
                  onClose();
                }
              }}
              className={cn(
                'px-8 py-2.5 font-bold rounded-full transition text-sm shadow-md cursor-pointer',
                step === 2 && !occupation
                  ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed shadow-none'
                  : 'bg-[#2252D6] hover:bg-[#1a41aa] text-white shadow-[#2252D6]/20'
              )}
            >
              {step < 5 ? 'Continue' : 'Finish'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

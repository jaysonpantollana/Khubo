import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, AlertCircle, Upload, Trash2, Image as ImageIcon } from 'lucide-react';
import { cn } from '../lib/utils';

const idTypes = [
  'School ID',
  'National ID (PhilSys)',
  "Driver's License",
  'Passport',
];

interface VerificationStepProps {
  onBack?: () => void;
  onClose?: () => void;
  onContinue?: (idType: string) => void;
}

export function VerificationStep({ onBack, onClose, onContinue }: VerificationStepProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target?.result as string);
      reader.readAsDataURL(f);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const isReady = selected && file;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <div className="relative w-full max-w-3xl bg-white rounded-[2rem] overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 hover:bg-neutral-100 rounded-full transition-colors z-20 cursor-pointer"
        >
          <X size={20} className="text-neutral-500" />
        </button>

        <div className="px-8 pt-8 pb-0 pr-16">
          <div className="flex items-center gap-1.5 mb-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={cn(
                  'h-1.5 rounded-full flex-1 transition-all duration-500',
                  s <= 4 ? 'bg-[#2252D6]' : 'bg-neutral-200'
                )}
              />
            ))}
          </div>
        </div>

        <div className="px-8 pt-5 pb-6 overflow-y-auto">
          <div className="mb-6">
            <p className="text-xs font-bold text-[#2252D6] tracking-[0.15em] uppercase mb-1">
              STEP 4 OF 5: Verification
            </p>
            <h2 className="text-2xl font-bold text-[#17294F]">Verification</h2>
            <p className="text-sm text-neutral-500 font-medium mt-1">
              Prove you are real
            </p>
          </div>

          <div className="bg-amber-50/80 border border-amber-200/70 rounded-2xl p-4 flex items-start gap-3 mb-6">
            <div className="flex-shrink-0 mt-0.5">
              <AlertCircle size={20} className="text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-amber-800">Why do we ask for this?</p>
              <p className="text-xs text-amber-700/90 mt-0.5 leading-relaxed">
                Khubo verifies real users to protect both tenants and landlords. Your ID is only
                used for one-time verification and is never shared publicly.
              </p>
            </div>
          </div>

          <p className="text-xs font-bold text-neutral-400 tracking-[0.15em] uppercase mb-3">
            SELECT ID TYPE
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {idTypes.map((type, i) => {
              const isSelected = selected === type;
              return (
                <motion.button
                  key={type}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                  type="button"
                  onClick={() => { setSelected(type); if (type !== selected) { setFile(null); setPreview(null); } }}
                  className={cn(
                    'w-full py-4 px-4 rounded-xl border-2 transition-all duration-200 cursor-pointer text-center',
                    isSelected
                      ? 'border-[#2252D6]/60 bg-[#2252D6]/5'
                      : 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50'
                  )}
                >
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="w-2 h-2 bg-[#2252D6] rounded-full mx-auto mb-1.5"
                      />
                    )}
                  </AnimatePresence>
                  <span
                    className={cn(
                      'text-sm font-bold transition-colors duration-200',
                      isSelected ? 'text-[#17294F]' : 'text-neutral-800'
                    )}
                  >
                    {type}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="mb-6"
            >
              <p className="text-xs font-bold text-neutral-400 tracking-[0.15em] uppercase mb-3">
                UPLOAD YOUR {selected.toUpperCase().replace(/\s*\(.*?\)\s*/g, ' ').trim()}
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={handleFileUpload}
              />

              {!file ? (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-neutral-300 hover:border-[#2252D6]/50 rounded-2xl p-8 transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-neutral-100 group-hover:bg-[#2252D6]/10 flex items-center justify-center transition-colors duration-200">
                      <Upload size={22} className="text-neutral-400 group-hover:text-[#2252D6] transition-colors duration-200" />
                    </div>
                    <p className="text-sm font-bold text-neutral-600 group-hover:text-[#2252D6] transition-colors duration-200">
                      Click to upload
                    </p>
                    <p className="text-xs text-neutral-400">
                      Upload a clear photo or scan of your ID (JPG, PNG, or PDF)
                    </p>
                  </div>
                </button>
              ) : (
                <div className="border border-neutral-200 rounded-2xl overflow-hidden">
                  <div className="relative bg-neutral-50 flex items-center justify-center p-4 max-h-48 overflow-hidden">
                    {preview && (
                      <img
                        src={preview}
                        alt="ID preview"
                        className="max-h-40 object-contain rounded-lg"
                      />
                    )}
                  </div>
                  <div className="flex items-center justify-between px-4 py-3 border-t border-neutral-100 bg-white">
                    <div className="flex items-center gap-2 min-w-0">
                      <ImageIcon size={16} className="text-neutral-400 flex-shrink-0" />
                      <span className="text-sm font-medium text-neutral-700 truncate">
                        {file.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="p-1.5 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                    >
                      <Trash2 size={16} className="text-red-400 hover:text-red-500 transition-colors" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          <p className="text-xs text-neutral-400 text-center mt-6">
            You can also skip this step and verify later from your Profile settings.
          </p>
        </div>

        <div className="flex items-center justify-between px-8 py-5 border-t border-neutral-100 bg-neutral-50/50">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2.5 border-[1.5px] border-neutral-200 hover:border-neutral-300 text-neutral-600 font-bold rounded-full transition text-sm cursor-pointer"
          >
            Back
          </button>
          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-400 font-medium">4 of 5</span>
            <button
              type="button"
              onClick={() => isReady && onContinue?.(selected)}
              disabled={!isReady}
              className={cn(
                'px-8 py-2.5 font-bold rounded-full transition text-sm cursor-pointer',
                isReady
                  ? 'bg-[#2252D6] hover:bg-[#1a41aa] text-white shadow-md shadow-[#2252D6]/20'
                  : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
              )}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

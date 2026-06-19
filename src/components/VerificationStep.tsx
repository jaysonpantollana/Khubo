import { useState } from 'react';
import { motion } from 'motion/react';
import { AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

const idTypes = [
  'School ID',
  'National ID (PhilSys)',
  "Driver's License",
  'Passport',
];

interface VerificationStepProps {
  onBack?: () => void;
  onContinue?: (idType: string) => void;
}

export function VerificationStep({ onBack, onContinue }: VerificationStepProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-lg"
      >
        <div className="mb-1">
          <span className="text-xs font-bold text-[#2252D6]/60 tracking-[0.15em] uppercase">
            Step 4 of 5
          </span>
        </div>

        <h1 className="text-2xl font-bold text-[#17294F] mt-1">Verification</h1>
        <p className="text-sm text-neutral-500 font-medium mt-1">
          Prove you are real
        </p>

        <div className="flex items-center gap-1.5 mt-6 mb-6">
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

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 mb-6">
          <div className="flex-shrink-0 mt-0.5">
            <AlertCircle size={20} className="text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-amber-800">Why do we ask for this?</p>
            <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
              Khubo verifies real users to protect both tenants and landlords. Your ID is only
              used for one-time verification and is never shared publicly.
            </p>
          </div>
        </div>

        <p className="text-xs font-bold text-neutral-400 tracking-[0.15em] uppercase mb-3">
          Select ID Type
        </p>

        <div className="grid grid-cols-2 gap-3">
          {idTypes.map((type, i) => {
            const isSelected = selected === type;
            return (
              <motion.button
                key={type}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i, duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                type="button"
                onClick={() => setSelected(type)}
                className={cn(
                  'w-full py-4 px-4 rounded-xl border-2 transition-all duration-200 cursor-pointer text-center',
                  isSelected
                    ? 'border-[#2252D6]/60 bg-[#2252D6]/5'
                    : 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50'
                )}
              >
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

        <p className="text-xs text-neutral-400 text-center mt-6">
          You can also skip this step and verify later from your Profile settings.
        </p>

        <div className="flex items-center justify-between mt-8">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2.5 border-[1.5px] border-neutral-200 hover:border-neutral-300 text-neutral-600 font-bold rounded-full transition text-sm cursor-pointer"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => selected && onContinue?.(selected)}
            disabled={!selected}
            className={cn(
              'px-8 py-2.5 font-bold rounded-full transition text-sm cursor-pointer',
              selected
                ? 'bg-[#2252D6] hover:bg-[#1a41aa] text-white shadow-md shadow-[#2252D6]/20'
                : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
            )}
          >
            Continue
          </button>
        </div>
      </motion.div>
    </div>
  );
}

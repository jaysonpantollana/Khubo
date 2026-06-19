import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Briefcase, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

interface OccupationOption {
  id: string;
  icon: typeof GraduationCap;
  title: string;
  subtext: string;
}

const occupations: OccupationOption[] = [
  {
    id: 'student',
    icon: GraduationCap,
    title: 'Student',
    subtext: 'Currently enrolled in school or university',
  },
  {
    id: 'professional',
    icon: Briefcase,
    title: 'Professional',
    subtext: 'Full-time or part-time employee',
  },
  {
    id: 'working-student',
    icon: Clock,
    title: 'Working Student',
    subtext: 'Balancing work and studies',
  },
];

interface OccupationStepProps {
  onBack?: () => void;
  onContinue?: (occupation: string) => void;
}

export function OccupationStep({ onBack, onContinue }: OccupationStepProps) {
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
            STEP 2 OF 5
          </span>
        </div>

        <h1 className="text-2xl font-bold text-[#17294F] mt-1">Occupation</h1>
        <p className="text-sm text-neutral-500 font-medium mt-1">
          What do you do?
        </p>

        <div className="flex items-center gap-1.5 mt-6 mb-6">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={cn(
                'h-1.5 rounded-full flex-1 transition-all duration-500',
                s <= 2 ? 'bg-[#2252D6]' : 'bg-neutral-200'
              )}
            />
          ))}
        </div>

        <p className="text-xs text-neutral-400 leading-relaxed mb-6">
          This helps landlords and roommates understand your schedule and lifestyle.
        </p>

        <div className="space-y-3">
          {occupations.map((occ, i) => {
            const isSelected = selected === occ.id;
            const Icon = occ.icon;
            return (
              <motion.button
                key={occ.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i, duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                type="button"
                onClick={() => setSelected(occ.id)}
                className={cn(
                  'w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 cursor-pointer text-left',
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

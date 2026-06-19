import { useState } from 'react';
import { motion } from 'motion/react';
import { OnboardingModal } from './OnboardingModal';
import { OccupationStep } from './OccupationStep';
import { VerificationStep } from './VerificationStep';

interface OnboardingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

function PlaceholderStep({
  step,
  title,
  subtitle,
  onBack,
  onContinue,
}: {
  step: number;
  title: string;
  subtitle: string;
  onBack?: () => void;
  onContinue?: () => void;
}) {
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
            Step {step} of 5
          </span>
        </div>
        <h1 className="text-2xl font-bold text-[#17294F] mt-1">{title}</h1>
        <p className="text-sm text-neutral-500 font-medium mt-1">{subtitle}</p>
        <div className="flex items-center gap-1.5 mt-6 mb-6">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full flex-1 transition-all duration-500 ${
                s <= step ? 'bg-[#2252D6]' : 'bg-neutral-200'
              }`}
            />
          ))}
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
            onClick={onContinue}
            className="px-8 py-2.5 bg-[#2252D6] hover:bg-[#1a41aa] text-white font-bold rounded-full transition text-sm shadow-md shadow-[#2252D6]/20 cursor-pointer"
          >
            Continue
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function FullPageOverlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[1000] overflow-y-auto">
      {children}
    </div>
  );
}

export function OnboardingFlow({ isOpen, onClose, onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(1);

  const handleFlowComplete = () => {
    onComplete();
    onClose();
    setStep(1);
  };

  if (!isOpen) return null;

  switch (step) {
    case 1:
      return (
        <OnboardingModal
          isOpen={true}
          onClose={onClose}
          onComplete={() => setStep(2)}
        />
      );
    case 2:
      return (
        <FullPageOverlay>
          <OccupationStep
            onBack={() => setStep(1)}
            onContinue={() => setStep(3)}
          />
        </FullPageOverlay>
      );
    case 3:
      return (
        <FullPageOverlay>
          <PlaceholderStep
            step={3}
            title="Roommate Preferences"
            subtitle="Tell us what you're looking for"
            onBack={() => setStep(2)}
            onContinue={() => setStep(4)}
          />
        </FullPageOverlay>
      );
    case 4:
      return (
        <FullPageOverlay>
          <VerificationStep
            onBack={() => setStep(3)}
            onContinue={() => setStep(5)}
          />
        </FullPageOverlay>
      );
    case 5:
      return (
        <FullPageOverlay>
          <PlaceholderStep
            step={5}
            title="Almost Done!"
            subtitle="Review your information"
            onBack={() => setStep(4)}
            onContinue={handleFlowComplete}
          />
        </FullPageOverlay>
      );
    default:
      return null;
  }
}

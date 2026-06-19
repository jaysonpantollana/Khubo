import { useState } from 'react';
import { X } from 'lucide-react';
import { OnboardingModal } from './OnboardingModal';
import { OccupationStep } from './OccupationStep';
import { VerificationStep } from './VerificationStep';
import { ReviewProfile } from './ReviewProfile';

interface OnboardingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

function AlmostDoneStep({ onBack, onClose, onComplete }: { onBack?: () => void; onClose?: () => void; onComplete?: () => void }) {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
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
                className={`h-1.5 rounded-full flex-1 transition-all duration-500 ${
                  s <= 5 ? 'bg-[#2252D6]' : 'bg-neutral-200'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="px-8 pt-5 pb-6 overflow-y-auto text-center">
          <div className="mb-6">
            <p className="text-xs font-bold text-[#2252D6] tracking-[0.15em] uppercase mb-1">
              STEP 5 OF 5: Almost Done
            </p>
            <h2 className="text-2xl font-bold text-[#17294F]">Almost Done!</h2>
            <p className="text-sm text-neutral-500 font-medium mt-1">
              You're all set.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-20 h-20 rounded-full bg-[#2252D6]/10 flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-[#2252D6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-neutral-500 font-medium max-w-md">
              Your profile is set up! Click finish to start exploring properties and finding your perfect roommate.
            </p>
          </div>
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
            <span className="text-xs text-neutral-400 font-medium">5 of 5</span>
            <button
              type="button"
              onClick={onComplete}
              className="px-8 py-2.5 bg-[#2252D6] hover:bg-[#1a41aa] text-white font-bold rounded-full transition text-sm shadow-md shadow-[#2252D6]/20 cursor-pointer"
            >
              Finish
            </button>
          </div>
        </div>
      </div>
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
        <OccupationStep
          onBack={() => setStep(1)}
          onClose={onClose}
          onContinue={() => setStep(3)}
        />
      );
    case 3:
      return (
        <ReviewProfile
          onBack={() => setStep(2)}
          onClose={onClose}
          onContinue={() => setStep(4)}
        />
      );
    case 4:
      return (
        <VerificationStep
          onBack={() => setStep(3)}
          onClose={onClose}
          onContinue={() => setStep(5)}
        />
      );
    case 5:
      return (
        <AlmostDoneStep
          onBack={() => setStep(4)}
          onClose={onClose}
          onComplete={handleFlowComplete}
        />
      );
    default:
      return null;
  }
}

import { OnboardingModal } from './OnboardingModal';

interface OnboardingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export function OnboardingFlow({ isOpen, onClose, onComplete }: OnboardingFlowProps) {
  if (!isOpen) return null;

  return (
    <OnboardingModal
      isOpen={true}
      onClose={onClose}
      onComplete={onComplete}
    />
  );
}

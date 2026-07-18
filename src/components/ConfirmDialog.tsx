import { FocusTrap } from './ui/FocusTrap';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export default function ConfirmDialog({ isOpen, onClose, onConfirm, title, message }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <FocusTrap
        onClose={onClose}
        ariaLabel={title}
        className="relative w-full max-w-[400px] bg-white p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl z-10 flex flex-col"
      >
        <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mb-2">{title}</h2>
        <p className="text-neutral-500 mb-8 text-sm md:text-base">{message}</p>
        <div className="flex gap-3 mt-auto">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-neutral-100 g-neutral-200 text-neutral-900 rounded-xl font-bold transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 px-4 bg-[#0A2B4E] g-[#153a66] text-white rounded-xl font-bold transition-colors"
          >
            Confirm
          </button>
        </div>
      </FocusTrap>
    </div>
  );
}

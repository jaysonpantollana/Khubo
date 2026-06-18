// @context: Reusable modal wrapper
// @purpose: Standard modal backdrop + content with animation presets from lib/animations.ts
// @purpose: Eliminates ~30 lines of duplicate code across 10+ modal components
// @behavior: Shows/hides with AnimatePresence; backdrop click closes modal
// @behavior: Props: isOpen, onClose, children, maxWidth (default max-w-lg), className
// @performance: Returns null when not open (no DOM overhead)
// @dependencies: motion (AnimatePresence), lib/animations.ts (modalBackdrop, modalContent)
import { motion, AnimatePresence } from 'motion/react';
import { modalBackdrop, modalContent } from '../../lib/animations';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
  className?: string;
}

export function Modal({ isOpen, onClose, children, maxWidth = 'max-w-lg', className = '' }: ModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
        <motion.div
          {...modalBackdrop}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        <motion.div
          {...modalContent}
          transition={{ type: 'spring', duration: 0.5, bounce: 0 }}
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full ${maxWidth} bg-white rounded-[2rem] overflow-hidden shadow-2xl z-10 ${className}`}
        >
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

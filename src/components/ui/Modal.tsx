//   <Modal isOpen={isOpen} onClose={handleClose} maxWidth="max-w-md">
//     <div className="p-6">{content}</div>
//   </Modal>
// @dependencies: motion (AnimatePresence), lib/animations.ts (modalBackdrop, modalContent)
// @owner: Core team
import { motion, AnimatePresence } from 'motion/react';
import { modalBackdrop, modalContent } from '../../lib/animations';
import { useFocusTrap } from '../../hooks/useFocusTrap';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
  className?: string;
}

export function Modal({ isOpen, onClose, children, maxWidth = 'max-w-lg', className = '' }: ModalProps) {
  const focusTrapRef = useFocusTrap(isOpen);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-label="Modal dialog"
      >
        <motion.div
          {...modalBackdrop}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        <motion.div
          ref={focusTrapRef}
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

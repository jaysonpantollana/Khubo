import { X } from 'lucide-react';
import { TOAST_CONFIG } from '../lib/toastConfig';

export type ToastType = 'success' | 'info' | 'error' | 'warning';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

export const Toast = ({ message, type, onClose }: ToastProps) => {
  const { icon: Icon, bg, iconColor, textColor } = TOAST_CONFIG[type];
  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-xl shadow-lg border ${bg} ${textColor}`}
    >
      <Icon size={20} className={iconColor} />
      <p className="text-sm font-medium">{message}</p>
      <button onClick={onClose} className="p-1 hover:bg-neutral-100 rounded-full ml-auto">
        <X size={16} />
      </button>
    </div>
  );
};

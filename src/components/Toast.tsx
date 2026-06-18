import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Info, AlertTriangle, XCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'info' | 'error' | 'warning';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

const config: Record<ToastType, { icon: typeof CheckCircle; bg: string; iconColor: string; textColor: string }> = {
  success: { icon: CheckCircle, bg: 'bg-white border-green-100', iconColor: 'text-green-500', textColor: 'text-green-800' },
  info: { icon: Info, bg: 'bg-white border-blue-100', iconColor: 'text-blue-500', textColor: 'text-blue-800' },
  warning: { icon: AlertTriangle, bg: 'bg-white border-amber-100', iconColor: 'text-amber-500', textColor: 'text-amber-800' },
  error: { icon: XCircle, bg: 'bg-white border-red-100', iconColor: 'text-red-500', textColor: 'text-red-800' },
};

export const Toast = ({ message, type, onClose }: ToastProps) => {
  const { icon: Icon, bg, iconColor, textColor } = config[type];
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className={`flex items-center gap-3 p-4 rounded-xl shadow-lg border ${bg} ${textColor}`}
    >
      <Icon size={20} className={iconColor} />
      <p className="text-sm font-medium">{message}</p>
      <button onClick={onClose} className="p-1 hover:bg-neutral-100 rounded-full ml-auto">
        <X size={16} />
      </button>
    </motion.div>
  );
};

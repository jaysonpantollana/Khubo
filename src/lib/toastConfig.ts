import { CheckCircle, Info, AlertTriangle, XCircle } from 'lucide-react';
import type { ToastType } from '../components/Toast';

export const TOAST_CONFIG: Record<ToastType, {
  icon: typeof CheckCircle;
  bg: string;
  iconColor: string;
  textColor: string;
  label: string;
}> = {
  success: {
    icon: CheckCircle,
    bg: 'bg-white border-green-100',
    iconColor: 'text-green-500',
    textColor: 'text-green-800',
    label: 'Success',
  },
  info: {
    icon: Info,
    bg: 'bg-white border-blue-100',
    iconColor: 'text-blue-500',
    textColor: 'text-blue-800',
    label: 'Info',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-white border-amber-100',
    iconColor: 'text-amber-500',
    textColor: 'text-amber-800',
    label: 'Warning',
  },
  error: {
    icon: XCircle,
    bg: 'bg-white border-red-100',
    iconColor: 'text-red-500',
    textColor: 'text-red-800',
    label: 'Error',
  },
};

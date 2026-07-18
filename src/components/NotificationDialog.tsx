import { Bell, Clock } from 'lucide-react';
import { ToastType } from './Toast';
import type { NotificationItem } from './ToastProvider';
import { Modal } from './ui/Modal';
import { TOAST_CONFIG } from '../lib/toastConfig';

interface NotificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onClear: () => void;
}

export function NotificationDialog({ isOpen, onClose, notifications, onClear }: NotificationDialogProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-lg"
      className="flex flex-col max-h-[70vh]"
      showCloseButton={false}
      bodyClassName="p-0 overflow-y-auto flex-1"
    >
      <div className="flex items-center justify-between p-5 border-b border-neutral-100 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
            <Bell size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-neutral-900">Notifications</h2>
            <p className="text-xs text-neutral-500">{notifications.length} notification{notifications.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-neutral-400 gap-3">
          <Bell size={40} strokeWidth={1.5} />
          <p className="text-sm font-medium">No notifications yet</p>
        </div>
      ) : (
        <div className="divide-y divide-neutral-50">
          {notifications.map((n) => {
            const { icon: Icon, iconColor, label } = TOAST_CONFIG[n.type];
            return (
              <div key={n.id} className="flex items-start gap-3 p-4 g-neutral-50 transition-colors">
                <div className={`p-1.5 rounded-full bg-neutral-100 shrink-0 ${iconColor}`}>
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-800">{n.message}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className={`text-[10px] font-semibold uppercase tracking-wider ${iconColor}`}>
                      {label}
                    </span>
                    <span className="text-[10px] text-neutral-400 flex items-center gap-0.5">
                      <Clock size={10} />
                      {formatTime(n.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {notifications.length > 0 && (
        <div className="p-4 border-t border-neutral-100 shrink-0">
          <button
            onClick={onClear}
            className="w-full py-2.5 text-sm font-semibold text-red-500 g-red-50 rounded-xl transition-colors"
          >
            Clear all notifications
          </button>
        </div>
      )}
    </Modal>
  );
}

function formatTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

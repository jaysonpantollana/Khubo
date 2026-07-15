import React from 'react';
import { X } from 'lucide-react';
import { Modal } from './ui/Modal';

interface ItemsPopupProps<T> {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  items: T[];
  renderItem: (item: T, onSelect: () => void) => React.ReactNode;
  onItemClick: (item: T) => void;
  emptyText?: string;
}

export function ItemsPopup<T extends { id: string }>({
  isOpen,
  onClose,
  title,
  items,
  renderItem,
  onItemClick,
  emptyText = 'No items available.',
}: ItemsPopupProps<T>) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-5xl" className="h-[85vh] flex flex-col" showCloseButton={false} hideTitle={true} bodyClassName="p-0">
      <div className="flex items-center justify-between px-6 py-3 border-b border-neutral-100 shrink-0">
        <h2 className="text-xl font-bold text-neutral-900">{title}</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-500 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-3">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-neutral-500 text-sm">{emptyText}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <div key={item.id}>
                {renderItem(item, () => {
                  onItemClick(item);
                  onClose();
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}

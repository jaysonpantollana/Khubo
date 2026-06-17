import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface TenantsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const tenants = [
  { id: 1, client: 'North Studio', status: 'Paid', email: 'billing@northstudio.co', amount: '$1,240.00' },
  { id: 2, client: 'Atlas Works', status: 'Review', email: 'accounts@atlasworks.io', amount: '$540.00' },
  { id: 3, client: 'Paper Trail', status: 'Pending', email: 'hello@papertrail.design', amount: '$920.00' },
  { id: 4, client: 'Luma Team', status: 'Paid', email: 'finance@luma.team', amount: '$1,580.00' },
  { id: 5, client: 'Mono Labs', status: 'Draft', email: 'ops@monolabs.dev', amount: '$310.00' },
];

export function TenantsModal({ isOpen, onClose }: TenantsModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl h-[80vh] bg-white rounded-[2rem] overflow-hidden shadow-2xl z-10 flex flex-col"
        >
          <div className="flex items-center justify-between p-6 border-b border-neutral-100 shrink-0">
              <h2 className="text-xl font-bold text-neutral-900">Tenants</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-500 hover:text-neutral-900"
              >
                <X size={20} />
              </button>
          </div>

          <div className="p-6 flex-1 overflow-y-auto">
            <div className="overflow-x-auto w-full p-1 h-full">
              <table className="w-full text-left border-collapse border-spacing-y-2">
                <thead>
                  <tr className="border-b border-neutral-100">
                    <th className="p-4 pl-6 w-12">
                      <div className="w-4 h-4 rounded border border-neutral-300 bg-transparent"></div>
                    </th>
                    <th className="p-4 text-neutral-500 font-bold text-sm">Client</th>
                    <th className="p-4 text-neutral-500 font-bold text-sm">Status</th>
                    <th className="p-4 text-neutral-500 font-bold text-sm">Email</th>
                    <th className="p-4 text-neutral-500 font-bold text-sm text-right pr-6">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {tenants.map((tenant, index) => (
                    <tr 
                      key={tenant.id} 
                      className={`${index !== tenants.length - 1 ? 'border-b border-neutral-50' : ''} hover:bg-neutral-50/50 transition-colors`}
                    >
                      <td className="p-4 pl-6">
                        <div className="w-4 h-4 rounded border border-neutral-300 bg-transparent"></div>
                      </td>
                      <td className="p-4 font-bold text-[#0A2B4E]">{tenant.client}</td>
                      <td className="p-4 text-neutral-500 font-medium">{tenant.status}</td>
                      <td className="p-4 text-neutral-500 font-medium">{tenant.email}</td>
                      <td className="p-4 text-right pr-6 font-bold text-[#0A2B4E]">{tenant.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

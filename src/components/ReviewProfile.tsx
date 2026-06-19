import { X, Pencil, AlertCircle, User, Mail, Phone, BookOpen, MapPin, Briefcase, Moon, Users, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import type { OnboardingData } from './OnboardingFlow';

interface ReviewProfileProps {
  data: OnboardingData;
  onBack?: () => void;
  onClose?: () => void;
  onContinue?: () => void;
  onEditStep?: (step: number) => void;
}

interface FieldRowProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

function FieldRow({ label, value, icon }: FieldRowProps) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-0.5">
        {icon && <span className="text-neutral-400">{icon}</span>}
        <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">{label}</span>
      </div>
      <span className="text-sm font-semibold text-[#17294F]">{value || '—'}</span>
    </div>
  );
}

function SectionCard({ title, onEdit, children }: { title: string; onEdit?: () => void; children: React.ReactNode }) {
  return (
    <div className="border border-neutral-200 rounded-2xl bg-white overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-100">
        <h3 className="text-sm font-bold text-[#17294F]">{title}</h3>
        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="p-1.5 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
          >
            <Pencil size={14} className="text-neutral-400 hover:text-[#2252D6] transition-colors" />
          </button>
        )}
      </div>
      <div className="p-5">
        {children}
      </div>
    </div>
  );
}

export function ReviewProfile({ onBack, onClose, onContinue }: ReviewProfileProps) {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <div className="relative w-full max-w-3xl bg-white rounded-[2rem] overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 hover:bg-neutral-100 rounded-full transition-colors z-20 cursor-pointer"
        >
          <X size={20} className="text-neutral-500" />
        </button>

        <div className="px-8 pt-8 pb-0 pr-16">
          <div className="flex items-center gap-1.5 mb-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={cn(
                  'h-1.5 rounded-full flex-1 transition-all duration-500',
                  s <= 4 ? 'bg-[#2252D6]' : 'bg-neutral-200'
                )}
              />
            ))}
          </div>
        </div>

        <div className="px-8 pt-5 pb-6 overflow-y-auto">
          <div className="mb-6">
            <p className="text-xs font-bold text-[#2252D6] tracking-[0.15em] uppercase mb-1">
              STEP 4 OF 5: Preview & Review
            </p>
            <h2 className="text-2xl font-bold text-[#17294F]">Review Details</h2>
            <p className="text-sm text-neutral-500 font-medium mt-1">
              Double check your details before proceeding.
            </p>
          </div>

          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-neutral-100 border-[3px] border-white shadow-lg ring-2 ring-[#2252D6]/20 mb-3">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2252D6]/5 to-[#17294F]/10">
                <User size={28} className="text-neutral-400" />
              </div>
            </div>
            <p className="text-sm font-bold text-[#17294F]">juan_delacruz</p>
            <p className="text-xs text-neutral-400 font-medium">juan@email.com</p>

            <div className="w-full bg-amber-50/80 border border-amber-200/70 rounded-2xl p-3 flex items-center gap-2.5 mt-4">
              <AlertCircle size={16} className="text-amber-600 flex-shrink-0" />
              <p className="text-xs font-medium text-amber-800">
                Verification pending – add ID later
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <SectionCard title="Identity & Location" onEdit={() => {}}>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <FieldRow label="Username" value="juan_delacruz" icon={<User size={13} />} />
                <FieldRow label="Email" value="juan@email.com" icon={<Mail size={13} />} />
                <FieldRow label="Phone" value="+63 912 345 6789" icon={<Phone size={13} />} />
                <FieldRow label="Gender" value="Male" />
              </div>
              <div className="mt-4">
                <FieldRow label="Short Bio" value="Looking for a quiet place near the university. I enjoy reading and playing video games on weekends." icon={<BookOpen size={13} />} />
              </div>
              <div className="mt-4">
                <FieldRow label="Address" value="Tibanga, Iligan City — 123 Rizal St." icon={<MapPin size={13} />} />
              </div>
            </SectionCard>

            <SectionCard title="Occupation" onEdit={() => {}}>
              <FieldRow label="Status" value="Student" icon={<Briefcase size={13} />} />
            </SectionCard>

            <SectionCard title="Lifestyle Preferences" onEdit={() => {}}>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <FieldRow label="Sleep Schedule" value="Night Owl" icon={<Moon size={13} />} />
                <FieldRow label="Lifestyle" value="Quiet & Focused" icon={<Sparkles size={13} />} />
                <FieldRow label="Social Preference" value="Low-key" icon={<Users size={13} />} />
                <FieldRow label="Cleanliness" value="Tidy" />
              </div>
            </SectionCard>
          </div>
        </div>

        <div className="flex items-center justify-between px-8 py-5 border-t border-neutral-100 bg-neutral-50/50">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2.5 border-[1.5px] border-neutral-200 hover:border-neutral-300 text-neutral-600 font-bold rounded-full transition text-sm cursor-pointer"
          >
            Back
          </button>
          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-400 font-medium">4 of 5</span>
            <button
              type="button"
              onClick={onContinue}
              className="px-8 py-2.5 bg-[#2252D6] hover:bg-[#1a41aa] text-white font-bold rounded-full transition text-sm shadow-md shadow-[#2252D6]/20 cursor-pointer"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

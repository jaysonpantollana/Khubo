import React, { useState } from 'react';
import { z } from 'zod';
import { User, Mail, Phone, Home, Loader2, Link2, Plus, X } from 'lucide-react';
import { Modal } from './ui/Modal';

const SOCIAL_PLATFORMS = ['Instagram', 'X', 'Facebook'] as const;
type SocialPlatform = typeof SOCIAL_PLATFORMS[number];

interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

const tenantSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  room: z.string().min(1, 'Room number is required'),
});

interface AddTenantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (tenant: { name: string; email: string; phone: string; room: string; socialLinks: SocialLink[] }) => void;
}

export function AddTenantModal({ isOpen, onClose, onSuccess }: AddTenantModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [room, setRoom] = useState('');
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const usedPlatforms = socialLinks.map((l) => l.platform);
  const availablePlatforms = SOCIAL_PLATFORMS.filter((p) => !usedPlatforms.includes(p));
  const canAddMore = socialLinks.length < 3;

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setRoom('');
    setSocialLinks([]);
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const addSocialLink = () => {
    if (!canAddMore || availablePlatforms.length === 0) return;
    setSocialLinks((prev) => [...prev, { platform: availablePlatforms[0], url: '' }]);
  };

  const removeSocialLink = (index: number) => {
    setSocialLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const updateSocialLink = (index: number, field: keyof SocialLink, value: string) => {
    setSocialLinks((prev) =>
      prev.map((link, i) => (i === index ? { ...link, [field]: value } : link))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = tenantSchema.safeParse({ name, email, phone, room });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSubmitting(false);

    onSuccess?.({ name, email, phone, room, socialLinks });
    resetForm();
    onClose();
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 pl-11 rounded-xl border text-sm font-medium transition-colors outline-none ${
      errors[field]
        ? 'border-red-400 bg-red-50 text-red-700 focus:ring-2 focus:ring-red-200'
        : 'border-neutral-200 bg-neutral-50 text-neutral-800 focus:ring-2 focus:ring-[#17294F]/20 focus:border-[#17294F]'
    }`;

  const iconClass = (field: string) =>
    `absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${
      errors[field] ? 'text-red-400' : 'text-neutral-400'
    }`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add Tenant"
      description="Register a new tenant to your property"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <User className={iconClass('name')} />
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass('name')}
          />
          {errors.name && <p className="mt-1 text-xs text-red-500 font-medium">{errors.name}</p>}
        </div>

        <div className="relative">
          <Mail className={iconClass('email')} />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass('email')}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500 font-medium">{errors.email}</p>}
        </div>

        <div className="relative">
          <Phone className={iconClass('phone')} />
          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass('phone')}
          />
          {errors.phone && <p className="mt-1 text-xs text-red-500 font-medium">{errors.phone}</p>}
        </div>

        <div className="relative">
          <Home className={iconClass('room')} />
          <input
            type="text"
            placeholder="Room number"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className={inputClass('room')}
          />
          {errors.room && <p className="mt-1 text-xs text-red-500 font-medium">{errors.room}</p>}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-neutral-700">Social Links</label>
            <span className="text-xs text-neutral-400">{socialLinks.length}/3</span>
          </div>

          {socialLinks.map((link, index) => (
            <div key={index} className="flex items-center gap-2">
              <select
                value={link.platform}
                onChange={(e) => updateSocialLink(index, 'platform', e.target.value as SocialPlatform)}
                className="px-3 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-sm font-medium text-neutral-800 outline-none focus:ring-2 focus:ring-[#17294F]/20 focus:border-[#17294F] transition-colors"
              >
                {SOCIAL_PLATFORMS.map((p) => (
                  <option key={p} value={p} disabled={usedPlatforms.includes(p) && p !== link.platform}>
                    {p}
                  </option>
                ))}
              </select>
              <div className="relative flex-1">
                <Link2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="url"
                  placeholder={`${link.platform} URL`}
                  value={link.url}
                  onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                  className="w-full px-4 py-3 pl-11 rounded-xl border border-neutral-200 bg-neutral-50 text-sm font-medium text-neutral-800 outline-none focus:ring-2 focus:ring-[#17294F]/20 focus:border-[#17294F] transition-colors"
                />
              </div>
              <button
                type="button"
                onClick={() => removeSocialLink(index)}
                className="p-2.5 rounded-xl text-neutral-400 ext-red-500 g-red-50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          {canAddMore && (
            <button
              type="button"
              onClick={addSocialLink}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-[#17294F] border-2 border-dashed border-neutral-300 order-[#17294F] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Social Link
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 px-4 py-3 rounded-xl border border-neutral-200 text-sm font-bold text-neutral-600 g-neutral-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#17294F] text-white text-sm font-bold g-[#1a3058] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Adding...
              </>
            ) : (
              'Add Tenant'
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}

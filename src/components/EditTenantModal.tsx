import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, Phone, Home, Loader2, Link2, Plus, X } from 'lucide-react';
import { Modal } from './ui/Modal';
import { editTenantSchema, isSafeSocialUrl, SOCIAL_PLATFORMS, type SocialLink, type SocialPlatform } from './tenantSchemas';

interface TenantData {
  id: number;
  client: string;
  room: string;
  email: string;
  phone: string;
  social: { instagram: string; x: string; facebook: string };
}

interface EditTenantModalProps {
  isOpen: boolean;
  onClose: () => void;
  tenant: TenantData | null;
  onSave: (id: number, data: { client: string; room: string; email: string; phone: string; social: { instagram: string; x: string; facebook: string } }) => void;
}

export function EditTenantModal({ isOpen, onClose, tenant, onSave }: EditTenantModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [room, setRoom] = useState('');
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const cancelSubmissionRef = useRef(false);

  useEffect(() => {
    if (tenant) {
      setName(tenant.client);
      setEmail(tenant.email);
      setPhone(tenant.phone);
      setRoom(tenant.room);
      const links: SocialLink[] = [];
      if (tenant.social.instagram) links.push({ platform: 'Instagram', url: tenant.social.instagram });
      if (tenant.social.x) links.push({ platform: 'X', url: tenant.social.x });
      if (tenant.social.facebook) links.push({ platform: 'Facebook', url: tenant.social.facebook });
      setSocialLinks(links);
    }
  }, [tenant]);

  const usedPlatforms = socialLinks.map((l) => l.platform);
  const availablePlatforms = SOCIAL_PLATFORMS.filter((p) => !usedPlatforms.includes(p));
  const canAddMore = socialLinks.length < 3;

  const handleClose = () => {
    if (isSubmitting) {
      cancelSubmissionRef.current = true;
      return;
    }
    cancelSubmissionRef.current = false;
    setErrors({});
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
    if (field === 'url' && !isSafeSocialUrl(value) && value.trim() !== '') {
      setErrors((prev) => ({ ...prev, socialLinks: 'Social links must use http:// or https:// URLs' }));
      return;
    }

    setErrors((prev) => {
      const nextErrors = { ...prev };
      delete nextErrors.socialLinks;
      return nextErrors;
    });

    setSocialLinks((prev) =>
      prev.map((link, i) => (i === index ? { ...link, [field]: value } : link))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenant) return;

    cancelSubmissionRef.current = false;
    setErrors({});

    const result = editTenantSchema.safeParse({ name, email, phone, room });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const invalidSocialLink = socialLinks.find((link) => !isSafeSocialUrl(link.url));
    if (invalidSocialLink) {
      setErrors((prev) => ({ ...prev, socialLinks: 'Social links must use http:// or https:// URLs' }));
      return;
    }

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));
    if (cancelSubmissionRef.current) {
      setIsSubmitting(false);
      return;
    }

    const social = { instagram: '', x: '', facebook: '' };
    socialLinks.forEach((link) => {
      if (link.platform === 'Instagram') social.instagram = link.url;
      else if (link.platform === 'X') social.x = link.url;
      else if (link.platform === 'Facebook') social.facebook = link.url;
    });

    onSave(tenant.id, { client: name, room, email, phone, social });
    setIsSubmitting(false);
    setErrors({});
    onClose();
  };

  const inputClass =
    'w-full px-4 py-3 pl-11 rounded-xl border border-neutral-200 bg-neutral-50 text-sm font-medium text-neutral-800 outline-none focus:ring-2 focus:ring-[#17294F]/20 focus:border-[#17294F] transition-colors';

  const iconClass = 'absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400';

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Edit Tenant"
      description="Update tenant information"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <User className={iconClass} />
          <input
            type="text"
            name="client"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="relative">
          <Mail className={iconClass} />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="relative">
          <Phone className={iconClass} />
          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="relative">
          <Home className={iconClass} />
          <input
            type="text"
            name="room"
            placeholder="Room number"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className={inputClass}
          />
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
                name={`social-platform-${index}`}
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
                  name={`social-url-${index}`}
                  placeholder={`${link.platform} URL`}
                  value={link.url}
                  onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                  className="w-full px-4 py-3 pl-11 rounded-xl border border-neutral-200 bg-neutral-50 text-sm font-medium text-neutral-800 outline-none focus:ring-2 focus:ring-[#17294F]/20 focus:border-[#17294F] transition-colors"
                />
              </div>
              <button
                type="button"
                onClick={() => removeSocialLink(index)}
                className="p-2.5 rounded-xl text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          {canAddMore && (
            <button
              type="button"
              onClick={addSocialLink}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-[#17294F] border-2 border-dashed border-neutral-300 hover:border-[#17294F] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Social Link
            </button>
          )}
          {errors.socialLinks && <p className="mt-1 text-xs text-red-500 font-medium">{errors.socialLinks}</p>}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="flex-1 px-4 py-3 rounded-xl border border-neutral-200 text-sm font-bold text-neutral-600 hover:bg-neutral-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#17294F] text-white text-sm font-bold hover:bg-[#1a3058] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}

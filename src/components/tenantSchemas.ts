import { z } from 'zod';

export const SOCIAL_PLATFORMS = ['Instagram', 'X', 'Facebook'] as const;
export type SocialPlatform = typeof SOCIAL_PLATFORMS[number];

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

export const tenantCoreSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  room: z.string().min(1, 'Room number is required'),
});

export const addTenantSchema = tenantCoreSchema.extend({
  property: z.string().min(1, 'Property name is required'),
});

export const editTenantSchema = tenantCoreSchema;

export function isSafeSocialUrl(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return true;

  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

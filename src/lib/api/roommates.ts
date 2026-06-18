// @context: Roommate API
// @purpose: getRoommates (with search/gender/university filters), getRoommate, createRoommateRequest
// @behavior: All functions try real API first; fall back to mock with 300-500ms simulated delay
// @behavior: Mock filtering is client-side on the ROOMMATES array from mocks/roommates.ts
// @behavior: createRoommateRequest has no mock fallback (will return real API error)
// @performance: 6 mock roommate entries; filtering is O(n) on small dataset
// @side-effects: None
// @dependencies: types.ts (Roommate), mocks/roommates.ts, client.ts

import { Roommate } from '../../types';
import { apiGet, apiPost } from './client';
import { ROOMMATES as MOCK_ROOMMATES } from '../../mocks/roommates';
import { delay } from '../utils';

export async function getRoommates(params?: {
  search?: string;
  gender?: string;
  university?: string;
}) {
  const { data, error } = await apiGet<Roommate[]>('/roommates', params as Record<string, string>);
  if (error) {
    await delay(500);
    let filtered = [...MOCK_ROOMMATES];
    if (params?.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.bio.toLowerCase().includes(q) ||
          r.university.toLowerCase().includes(q),
      );
    }
    if (params?.gender) {
      filtered = filtered.filter((r) => r.gender === params.gender);
    }
    if (params?.university) {
      filtered = filtered.filter((r) =>
        r.university.toLowerCase().includes(params.university!.toLowerCase()),
      );
    }
    return { data: filtered, error: null };
  }
  return { data: data || [], error };
}

export async function getRoommate(id: string) {
  const { data, error } = await apiGet<Roommate>(`/roommates/${id}`);
  if (error) {
    await delay(300);
    const roommate = MOCK_ROOMMATES.find((r) => r.id === id) || null;
    return { data: roommate, error: null };
  }
  return { data, error };
}

export async function createRoommateRequest(roommateId: string, message: string) {
  return apiPost<{ success: boolean }>('/roommates/request', { roommateId, message });
}

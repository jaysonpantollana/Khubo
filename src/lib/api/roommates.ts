import { ROOMMATES as MOCK_ROOMMATES } from '../../mocks/roommates';

export async function getRoommates(params?: {
  search?: string;
  gender?: string;
  university?: string;
}) {
  await new Promise((r) => setTimeout(r, 500));
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

export async function getRoommate(id: string) {
  await new Promise((r) => setTimeout(r, 300));
  const roommate = MOCK_ROOMMATES.find((r) => r.id === id) || null;
  return { data: roommate, error: null };
}

export async function createRoommateRequest(_roommateId: string, _message: string) {
  await new Promise((r) => setTimeout(r, 300));
  return { data: { success: true }, error: null };
}

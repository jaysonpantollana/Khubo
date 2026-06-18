import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiRequest, apiGet, apiPost } from './client';

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('apiRequest', () => {
  it('returns data on successful response', async () => {
    const mockData = { id: 1, name: 'test' };
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await apiRequest('/test');
    expect(result.data).toEqual(mockData);
    expect(result.error).toBeNull();
  });

  it('returns error on failed response', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      json: () => Promise.resolve({ message: 'Not found' }),
    });

    const result = await apiRequest('/test');
    expect(result.data).toBeNull();
    expect(result.error).toBe('Not found');
  });

  it('returns error message on network failure', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    const result = await apiRequest('/test');
    expect(result.data).toBeNull();
    expect(result.error).toBe('Network error');
  });
});

describe('apiGet', () => {
  it('appends query params', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    });

    await apiGet('/listings', { category: 'rooms' });
    const calledUrl = (globalThis.fetch as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(calledUrl).toContain('category=rooms');
  });
});

describe('apiPost', () => {
  it('sends JSON body', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    await apiPost('/create', { title: 'Test' });
    const options = (globalThis.fetch as ReturnType<typeof vi.fn>).mock.calls[0][1];
    expect(options.method).toBe('POST');
    expect(options.body).toBe(JSON.stringify({ title: 'Test' }));
  });
});

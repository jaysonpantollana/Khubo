// @context: Generic HTTP API client
// @purpose: Provides typed GET/POST/PUT/DELETE wrappers around fetch() with Bearer auth
// @purpose: All API modules (auth, listings, messages, roommates) delegate to this client
// @behavior: Returns ApiResponse<T> with either data or error string; never throws
// @behavior: On HTTP error, attempts to parse JSON body for error message; falls back to status text
// @behavior: On network error, returns generic message
// @security: Auth token read from sessionStorage('auth_token'); no CSRF protection
// @performance: No caching, no retry logic, no timeout
// @dependencies: types.ts (ApiResponse, ApiError)
// @config: BASE_URL from VITE_API_URL env var, defaults to '/api'
// @known-issues: No request timeout, no retry on failure, no cancellation support

import { ApiResponse, ApiError } from './types';

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

function getAuthHeaders(): Record<string, string> {
  const token = sessionStorage.getItem('auth_token');
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const url = `${BASE_URL}${endpoint}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
    ...(options.headers as Record<string, string>),
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      const apiError: ApiError = {
        message: errorBody?.message || `Request failed with status ${response.status}`,
        status: response.status,
        code: errorBody?.code,
      };
      return { data: null as T, error: apiError.message };
    }

    const data = await response.json();
    return { data: data as T, error: null };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'An unexpected error occurred';
    return { data: null as T, error: message };
  }
}

export function apiGet<T>(endpoint: string, params?: Record<string, string>) {
  const searchParams = params ? '?' + new URLSearchParams(params).toString() : '';
  return apiRequest<T>(`${endpoint}${searchParams}`, { method: 'GET' });
}

export function apiPost<T>(endpoint: string, body: unknown) {
  return apiRequest<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export function apiPut<T>(endpoint: string, body: unknown) {
  return apiRequest<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

export function apiDelete<T>(endpoint: string) {
  return apiRequest<T>(endpoint, { method: 'DELETE' });
}

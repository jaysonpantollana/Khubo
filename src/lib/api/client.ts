// @context: HTTP API client — fetch wrapper with retry, timeout, and auth headers
// @purpose: Provides apiRequest (generic), apiGet, apiPost, apiPut, apiDelete helpers
// @behavior: Retries on 429/5xx up to MAX_RETRIES; combines abort signals; injects Bearer token from sessionStorage
// @dependencies: ApiResponse, ApiError (types)

import { ApiResponse, ApiError } from './types';

const BASE_URL = import.meta.env.VITE_API_URL || '/api';
const DEFAULT_TIMEOUT = 15000;
const MAX_RETRIES = 2;

interface RequestOptions extends RequestInit {
  signal?: AbortSignal;
  timeout?: number;
}

function getAuthHeaders(): Record<string, string> {
  const token = sessionStorage.getItem('auth_token');
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
}

function fetchWithTimeout(url: string, options: RequestOptions, timeout: number): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  const signal = options.signal ? combineAbortSignals(options.signal, controller.signal) : controller.signal;
  return fetch(url, { ...options, signal }).finally(() => clearTimeout(timeoutId));
}

function combineAbortSignals(...signals: AbortSignal[]): AbortSignal {
  const controller = new AbortController();
  for (const signal of signals) {
    if (signal.aborted) {
      controller.abort();
      return controller.signal;
    }
    signal.addEventListener('abort', () => controller.abort(), { once: true });
  }
  return controller.signal;
}

function shouldRetry(status: number): boolean {
  return status === 429 || status >= 500;
}

async function executeWithRetry<T>(
  fn: () => Promise<ApiResponse<T>>,
  retries: number,
): Promise<ApiResponse<T>> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const result = await fn();
    if (result.data !== null || !result.error) return result;
    if (attempt < retries && shouldRetry(0)) {
      await new Promise((r) => setTimeout(r, Math.pow(2, attempt) * 200));
      continue;
    }
    return result;
  }
  return { data: null as T, error: 'Max retries exceeded' };
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<ApiResponse<T>> {
  const url = `${BASE_URL}${endpoint}`;
  const timeout = options.timeout ?? DEFAULT_TIMEOUT;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
    ...(options.headers as Record<string, string>),
  };

  return executeWithRetry(async () => {
    try {
      const response = await fetchWithTimeout(url, { ...options, headers }, timeout);

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
      if (err instanceof DOMException && err.name === 'AbortError') {
        return { data: null as T, error: 'Request was cancelled' };
      }
      const message =
        err instanceof Error ? err.message : 'An unexpected error occurred';
      return { data: null as T, error: message };
    }
  }, MAX_RETRIES);
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

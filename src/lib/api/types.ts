// @context: API response contracts
// @purpose: Standardized response wrappers for all API calls; consumed by client.ts and all api/* modules
// @security: ApiError.code could leak internal error codes if not sanitized
// @dependencies: None
export interface ApiResponse<T> {
  data: T;
  error: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

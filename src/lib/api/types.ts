// @context: API type definitions — shared response/pagination types
// @purpose: Defines ApiResponse<T>, PaginatedResponse<T>, PaginationParams, and ApiError interfaces
// @behavior: Pure type exports — no runtime code
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

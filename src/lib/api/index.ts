// @context: API barrel export
// @purpose: Re-exports all API functions and types from a single entry point
// @behavior: Consumers import from '@/lib/api' instead of individual modules
export { apiGet, apiPost, apiPut, apiDelete, apiRequest } from './client';
export { getListings, getListing, createListing, updateListing, deleteListing } from './listings';
export { signIn, signUp, signOut, getSession } from './auth';
export type { AuthUser, AuthSession } from './auth';
export { getRoommates, getRoommate, createRoommateRequest } from './roommates';
export { getConversations, getMessages, sendMessage } from './messages';
export type { Message, Conversation } from './messages';
export type { ApiResponse, PaginatedResponse, PaginationParams, ApiError } from './types';

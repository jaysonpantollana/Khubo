// @context: API barrel export — re-exports all API modules
// @purpose: Central export point for API client, auth, listings, messages, and roommates
// @behavior: Re-exports functions and types from client, auth, listings, messages, roommates, and types
// @dependencies: All API sub-modules

export { apiGet, apiPost, apiPut, apiDelete, apiRequest } from './client';
export { getListings, getListing, createListing, updateListing, deleteListing } from './listings';
export { signIn, signUp, signOut, getSession } from './auth';
export type { AuthUser, AuthSession } from './auth';
export { getRoommates, getRoommate, createRoommateRequest } from './roommates';
export { getConversations, getMessages, sendMessage } from './messages';
export type { Message, Conversation } from './messages';
export type { ApiResponse, PaginatedResponse, PaginationParams, ApiError } from './types';

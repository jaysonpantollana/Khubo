// @context: Auth API functions — sign in, sign up, sign out, get session
// @purpose: Provides mock authentication with localStorage-backed users and SHA-256 hashed passwords
// @behavior: Falls back to mock if API call fails; stores user credentials in localStorage
// @dependencies: apiPost, apiGet (client), delay (utils)

import { apiPost, apiGet } from './client';
import { delay } from '../utils';
export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  role?: 'tenant' | 'landlord' | 'admin';
}

export interface AuthSession {
  user: AuthUser;
  token: string;
}

interface MockSessionData {
  user: { id: string; email: string };
}

const MOCK_CREDENTIALS_KEY = 'khubo_mock_users';

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'khubo-salt');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

interface StoredUser {
  passwordHash: string;
  user: AuthUser;
}

function getMockUsers(): Record<string, StoredUser> {
  try {
    return JSON.parse(localStorage.getItem(MOCK_CREDENTIALS_KEY) || '{}');
  } catch {
    return {};
  }
}

async function saveMockUser(email: string, password: string, user: AuthUser) {
  const users = getMockUsers();
  users[email] = { passwordHash: await hashPassword(password), user };
  localStorage.setItem(MOCK_CREDENTIALS_KEY, JSON.stringify(users));
}

export async function signIn(email: string, password: string) {
  const { data, error } = await apiPost<AuthSession>('/auth/login', { email, password });
  if (error) {
    await delay(300);
    const users = getMockUsers();
    const record = users[email];
    if (!record || record.passwordHash !== (await hashPassword(password))) {
      return { data: null as AuthSession | null, error: 'Invalid email or password' };
    }
    const session: AuthSession = { user: record.user, token: 'mock_token_' + Date.now() };
    sessionStorage.setItem('auth_token', session.token);
    return { data: session, error: null };
  }
  if (data) {
    sessionStorage.setItem('auth_token', data.token);
  }
  return { data, error };
}

export async function signUp(email: string, password: string, name?: string) {
  const { data, error } = await apiPost<AuthSession>('/auth/signup', { email, password, name });
  if (error) {
    await delay(300);
    const users = getMockUsers();
    if (users[email]) {
      return { data: null as AuthSession | null, error: 'Email already registered' };
    }
    const newUser: AuthUser = {
      id: 'user_' + Date.now(),
      email,
      name: name || email.split('@')[0],
      role: 'tenant',
    };
    await saveMockUser(email, password, newUser);
    const session: AuthSession = { user: newUser, token: 'mock_token_' + Date.now() };
    sessionStorage.setItem('auth_token', session.token);
    return { data: session, error: null };
  }
  if (data) {
    sessionStorage.setItem('auth_token', data.token);
  }
  return { data, error };
}

export async function signOut() {
  await apiPost<void>('/auth/logout', {});
  sessionStorage.removeItem('auth_token');
}

export async function getSession() {
  const { data, error } = await apiGet<MockSessionData>('/auth/session');
  if (error) {
    const token = sessionStorage.getItem('auth_token');
    if (token) {
      return { data: { user: { id: 'mock_user', email: 'user@example.com' } }, error: null };
    }
    return { data: null, error: null };
  }
  return { data, error };
}



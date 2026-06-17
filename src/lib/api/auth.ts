import { apiPost, apiGet } from './client';
import { ApiResponse } from './types';

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

function getMockUsers(): Record<string, { password: string; user: AuthUser }> {
  try {
    return JSON.parse(localStorage.getItem(MOCK_CREDENTIALS_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveMockUser(email: string, password: string, user: AuthUser) {
  const users = getMockUsers();
  users[email] = { password, user };
  localStorage.setItem(MOCK_CREDENTIALS_KEY, JSON.stringify(users));
}

export async function signIn(email: string, password: string) {
  const { data, error } = await apiPost<AuthSession>('/auth/login', { email, password });
  if (error) {
    await delay(300);
    const users = getMockUsers();
    const record = users[email];
    if (!record || record.password !== password) {
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
    saveMockUser(email, password, newUser);
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

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// @context: Authentication context — mock auth state provider
// @purpose: Provides session, user, signIn, signOut, and isLoading via React context
// @behavior: signIn sets mock user from email; signOut clears state; no real API call
// @dependencies: React (createContext, useContext, useState)

import React, { createContext, useContext, useState } from 'react';

export interface MockUser {
  id?: string;
  email?: string;
}

export interface MockSession {
  user: MockUser;
}

interface AuthContextType {
  session: MockSession | null;
  user: MockUser | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  signIn: (email: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Auto-sign-in a mock user on mount so pages like ManageListings don't redirect
  const [session, setSession] = useState<MockSession | null>({ user: { id: 'mock-user-id', email: 'demo@khubo.ph' } });
  const [user, setUser] = useState<MockUser | null>({ id: 'mock-user-id', email: 'demo@khubo.ph' });
  const [isLoading] = useState(false);

  const signOut = async () => {
    setSession(null);
    setUser(null);
  };
  
  const signIn = (email: string) => {
    setSession({user: {id: 'mock-user-id', email}});
    setUser({id: 'mock-user-id', email});
  };

  return (
    <AuthContext.Provider value={{ session, user, isLoading, signOut, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

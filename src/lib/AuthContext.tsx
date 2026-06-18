// @context: Authentication state
// @purpose: Provides mock auth context with session/user state, signIn (email-only), signOut
// @purpose: No real authentication - all state is ephemeral React state
// @behavior: State transitions:
// @behavior:   ANONYMOUS (user=null) ──signIn(email)──► AUTHENTICATED (user={email})
// @behavior:   AUTHENTICATED ──signOut()──► ANONYMOUS
// @behavior: signIn sets user + session with email only; no password validation
// @performance: No side effects from auth state changes
// @security: NO REAL AUTH - mock only. User identity is just {email} stored in React state
// @security: No tokens, no password, no session persistence across page reloads
// @dependencies: None
// @known-issues: signIn from api/auth.ts (password-based) is NOT wired to UI; UI uses this context's signIn(email) directly
// @known-issues: setIsLoading is assigned but never referenced

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
  const [session, setSession] = useState<MockSession | null>(null);
  const [user, setUser] = useState<MockUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const signOut = async () => {
    setSession(null);
    setUser(null);
  };
  
  const signIn = (email: string) => {
    setSession({user: {email}});
    setUser({email});
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


"use client"

import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/firebase/config';

interface AuthState {
  user: User | null;
  loading: boolean;
  isAnonymous: boolean;
}

const defaultAuthState: AuthState = {
    user: null,
    loading: true,
    isAnonymous: true,
};

export function useAuth(): AuthState {
  const [authState, setAuthState] = useState<AuthState>(defaultAuthState);

  useEffect(() => {
    // Check if Firebase auth is available
    if (!auth) {
      console.warn('Firebase auth not available. Please check your environment variables.');
      setAuthState({ user: null, loading: false, isAnonymous: true });
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAuthState({
            user,
            loading: false,
            isAnonymous: user.isAnonymous,
        });
      } else {
        // This case should be handled by the anonymous sign-in,
        // but we keep it for completeness.
        setAuthState({ user: null, loading: false, isAnonymous: true });
      }
    });

    return () => unsubscribe();
  }, []);

  return authState;
}

import React, { createContext, useContext, useEffect, useState } from 'react';
import { loginApi, meApi, logoutApi, registerApi } from '../api/hooks';

const AuthContext = createContext(null);

/**
 * PUBLIC_INTERFACE
 * Provides user, login, logout, register actions across the app.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Attempt to load session
  useEffect(() => {
    (async () => {
      try {
        const me = await meApi();
        setUser(me);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (credentials) => {
    await loginApi(credentials);
    const me = await meApi();
    setUser(me);
  };

  const logout = async () => {
    await logoutApi();
    setUser(null);
  };

  const register = async (payload) => {
    await registerApi(payload);
    // Optionally auto-login or direct to login page
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * PUBLIC_INTERFACE
 * useAuth hook to get user session and auth actions
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

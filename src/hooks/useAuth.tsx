import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { AuthUser, RegisterFormData } from '@/types';
import { CURRENT_USER_ID } from '@/data/mockData';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (data: RegisterFormData) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('salesconnect_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('salesconnect_user');
      }
    }
  }, []);

  const login = useCallback((email: string, _password: string): boolean => {
    const storedUsers = JSON.parse(localStorage.getItem('salesconnect_users') || '[]');
    const found = storedUsers.find((u: AuthUser) => u.email === email);
    if (found) {
      setUser(found);
      localStorage.setItem('salesconnect_user', JSON.stringify(found));
      return true;
    }
    return false;
  }, []);

  const register = useCallback((data: RegisterFormData): boolean => {
    const existing = JSON.parse(localStorage.getItem('salesconnect_users') || '[]');
    if (existing.some((u: AuthUser) => u.email === data.email)) {
      return false;
    }

    const newUser: AuthUser = {
      id: `${CURRENT_USER_ID}-${Date.now()}`,
      fullName: data.fullName,
      email: data.email,
      companyName: data.companyName,
      jobTitle: data.jobTitle,
      industry: data.industry,
      avatar: data.fullName.split(' ').map(n => n[0]).join('').toUpperCase(),
    };

    const updated = [...existing, newUser];
    localStorage.setItem('salesconnect_users', JSON.stringify(updated));
    localStorage.setItem('salesconnect_user', JSON.stringify(newUser));
    setUser(newUser);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('salesconnect_user');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

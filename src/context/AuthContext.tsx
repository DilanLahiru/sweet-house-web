import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  createdAt?: string;
}

interface AuthContextValue {
  user: AdminUser | null;
  token: string | null;
  login: (user: AdminUser, token: string) => void;
  logout: () => void;
  updateUser: (user: AdminUser) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AdminUser | null>(() => {
    try {
      const stored = localStorage.getItem('admin_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('admin_token')
  );

  const login = (userData: AdminUser, jwt: string) => {
    setUser(userData);
    setToken(jwt);
    localStorage.setItem('admin_user', JSON.stringify(userData));
    localStorage.setItem('admin_token', jwt);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('admin_user');
    localStorage.removeItem('admin_token');
  };

  const updateUser = (userData: AdminUser) => {
    setUser(userData);
    localStorage.setItem('admin_user', JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateUser, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

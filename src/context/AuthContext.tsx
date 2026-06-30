import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { API_BASE_URL } from '../config';

export interface User {
  userId: string;
  email: string;
  fullName: string;
  roleCode: string;
  roleName: string;
  roleLevel: number;
  phone?: string;
}

interface AuthContextType {
  currentUser: User | null;
  token: string | null;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('rivoramart_user');
    const storedToken = localStorage.getItem('rivoramart_token');

    if (storedUser && storedToken) {
      try {
        setCurrentUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch (error) {
        console.error('Failed to parse stored user session:', error);
        localStorage.removeItem('rivoramart_user');
        localStorage.removeItem('rivoramart_token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        const { user, token: userToken } = result.data;
        setCurrentUser(user);
        setToken(userToken);
        localStorage.setItem('rivoramart_user', JSON.stringify(user));
        localStorage.setItem('rivoramart_token', userToken);
        return { success: true, message: result.message || 'Đăng nhập thành công!' };
      } else {
        return { success: false, message: result.message || 'Email hoặc mật khẩu không chính xác' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.' };
    }
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem('rivoramart_user');
    localStorage.removeItem('rivoramart_token');
  }, []);

  const isAdmin = currentUser ? currentUser.roleLevel >= 80 : false;
  const isSuperAdmin = currentUser ? currentUser.roleLevel >= 100 : false;

  const value: AuthContextType = {
    currentUser,
    token,
    isAdmin,
    isSuperAdmin,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

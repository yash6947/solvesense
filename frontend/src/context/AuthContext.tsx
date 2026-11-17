'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiRequest } from '@/lib/api';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  targetExam: string;
  targetYear: number;
  academicLevel: string;
  preferredSubjects: string[];
  dailyGoalQuestions: number;
  currentStreak: number;
  longestStreak: number;
  problemSolvingIndex: number;
}

interface AuthContextType {
  user: User | null;
  profile: StudentProfile | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const initAuth = async () => {
    try {
      const storedToken = localStorage.getItem('zenith_token');
      if (storedToken) {
        setToken(storedToken);
        const data = await apiRequest<{ user: User; profile: StudentProfile }>('/auth/me');
        setUser(data.user);
        setProfile(data.profile);
      }
    } catch (err) {
      console.warn('Session expired or invalid:', err);
      localStorage.removeItem('zenith_token');
      setUser(null);
      setProfile(null);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await apiRequest<{ user: User; profile: StudentProfile; token: string }>(
      '/auth/login',
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }
    );

    localStorage.setItem('zenith_token', data.token);
    setToken(data.token);
    setUser(data.user);
    setProfile(data.profile);
  };

  const register = async (formData: any) => {
    const data = await apiRequest<{ user: User; profile: StudentProfile; token: string }>(
      '/auth/register',
      {
        method: 'POST',
        body: JSON.stringify(formData),
      }
    );

    localStorage.setItem('zenith_token', data.token);
    setToken(data.token);
    setUser(data.user);
    setProfile(data.profile);
  };

  const logout = () => {
    localStorage.removeItem('zenith_token');
    setUser(null);
    setProfile(null);
    setToken(null);
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login';
    }
  };

  const refreshProfile = async () => {
    if (!token) return;
    try {
      const data = await apiRequest<{ user: User; profile: StudentProfile }>('/auth/me');
      setUser(data.user);
      setProfile(data.profile);
    } catch (err) {
      console.error('Failed to refresh profile:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        token,
        isLoading,
        login,
        register,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

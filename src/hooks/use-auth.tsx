'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from './use-toast';
import Loading from '@/app/loading';

// In a real app, you wouldn't store users in memory like this.
// This is a temporary solution to avoid a database dependency.
const users: { [email: string]: string } = {};

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, pass: string) => Promise<void>;
  signUp: (email: string, pass: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is in session storage
    try {
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error('Could not parse user from session storage', e);
      sessionStorage.removeItem('user');
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, pass: string) => {
    setLoading(true);
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (users[email] && users[email] === pass) {
          const newUser = { email };
          setUser(newUser);
          sessionStorage.setItem('user', JSON.stringify(newUser));
          setLoading(false);
          resolve();
        } else {
          setLoading(false);
          reject(new Error('Invalid email or password.'));
        }
      }, 500);
    });
  };

  const signUp = async (email: string, pass: string) => {
    setLoading(true);
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (users[email]) {
          setLoading(false);
          reject(new Error('An account with this email already exists.'));
        } else if (!email || !pass) {
          setLoading(false);
          reject(new Error('Email and password cannot be empty.'));
        }
        else {
          users[email] = pass;
          const newUser = { email };
          setUser(newUser);
          sessionStorage.setItem('user', JSON.stringify(newUser));
          setLoading(false);
          resolve();
        }
      }, 500);
    });
  };

  const signOut = () => {
    setUser(null);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('meetingHistory');
    // We can't use router here, so we redirect with window
    window.location.href = '/login';
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

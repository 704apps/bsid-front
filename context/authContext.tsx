'use client'

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextProps {
  user: any;
  token: string | null;
  email: string;
  password: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  login: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  
  const login = async () => {
    try {
      const response = await axios.post('https://api.bsid.com.br/auth/login', {
        email,
        password,
      });

      localStorage.setItem('user', JSON.stringify({ email }));
      localStorage.setItem('token', response.data.access_token);
      setUser(email);
      setToken(response.data.access_token);
      // Add token to session cookie
      document.cookie = `token=${response.data.access_token}`;
      router.push('/painel'); // Redirect to /painel after login
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // Remove token from session cookie
    document.cookie = 'token=';
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{
      email,
      password,
      token,
      user,
      login,
      logout,
      setEmail,
      setPassword
    }}>
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

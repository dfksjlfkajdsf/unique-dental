import { createContext, useContext, useState, useCallback } from 'react';
import api from '../lib/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('dental_user')); }
    catch { return null; }
  });

  const login = useCallback(async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('dental_token', data.data.token);
    localStorage.setItem('dental_user', JSON.stringify(data.data.user));
    setUser(data.data.user);
    return data.data.user;
  }, []);

  const register = useCallback(async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    localStorage.setItem('dental_token', data.data.token);
    localStorage.setItem('dental_user', JSON.stringify(data.data.user));
    setUser(data.data.user);
    return data.data.user;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('dental_token');
    localStorage.removeItem('dental_user');
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    const { data } = await api.get('/auth/profile');
    localStorage.setItem('dental_user', JSON.stringify(data.data.user));
    setUser(data.data.user);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, refreshUser, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};

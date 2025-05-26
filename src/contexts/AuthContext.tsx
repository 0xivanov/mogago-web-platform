import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, role: 'business' | 'admin') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Utility functions for role checking
export const isBusinessUser = () => Boolean(localStorage.getItem('businessToken'));
export const isAdminUser = () => Boolean(localStorage.getItem('adminToken'));

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for existing tokens on mount
    const hasValidToken = Boolean(
      localStorage.getItem('businessToken') || 
      localStorage.getItem('adminToken')
    );
    setIsAuthenticated(hasValidToken);
  }, []);

  const login = (token: string, role: 'business' | 'admin') => {
    const tokenKey = role === 'business' ? 'businessToken' : 'adminToken';
    localStorage.setItem(tokenKey, token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('businessToken');
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated,
      login, 
      logout 
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
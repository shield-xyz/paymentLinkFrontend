'use client';

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  console.log('AuthProvider rendered with token:', token);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useToken must be used within an AuthProvider');
  }
  console.log('useToken hook called with context:', context);
  return context;
};

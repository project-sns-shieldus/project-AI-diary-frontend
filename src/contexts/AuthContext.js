import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);  // 초기값을 undefined로 설정
  const [email, setEmail] = useState('');
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const email = localStorage.getItem('email');
    
    if (token && email) {
      setAccessToken(token);
      setEmail(email);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const login = (token, email) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('email', email);
    setAccessToken(token);
    setEmail(email);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('email');
    setAccessToken('');
    setEmail('');
    setIsLoggedIn(false);
  };

  if (isLoggedIn === undefined) {
    return <div>Loading...</div>;  // 초기 로딩 상태 추가
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, email, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

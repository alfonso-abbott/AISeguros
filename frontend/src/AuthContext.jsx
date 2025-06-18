import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const register = async (data) => {
    const res = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (res.ok) {
      setUser(json.user);
    }
    return json;
  };

  const login = async (data) => {
    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (res.ok) {
      setUser(json.user);
      setToken(json.token);
    }
    return json;
  };

  const fetchProfile = async () => {
    const res = await fetch('http://localhost:5000/api/profile');
    return res.json();
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

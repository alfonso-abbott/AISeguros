import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  async function register(username, password) {
    setError(null);
    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Error de registro');
      }
      const data = await res.json();
      setUser(data.user);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }

  async function login(username, password) {
    setError(null);
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Error de login');
      }
      const data = await res.json();
      setUser(data.user);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }

  const value = { user, error, register, login };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

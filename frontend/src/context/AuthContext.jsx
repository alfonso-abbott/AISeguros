import { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const storedToken = localStorage.getItem('token');
  const storedName = localStorage.getItem('name');
  const [token, setToken] = useState(storedToken);
  const [userName, setUserName] = useState(storedName);

  const login = (tk, name) => {
    setToken(tk);
    setUserName(name);
    localStorage.setItem('token', tk);
    localStorage.setItem('name', name);
  };

  const logout = () => {
    setToken(null);
    setUserName(null);
    localStorage.removeItem('token');
    localStorage.removeItem('name');
  };

  return (
    <AuthContext.Provider value={{ token, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

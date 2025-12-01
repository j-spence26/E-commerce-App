import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);


  useEffect(() => {
    fetch("http://localhost:3000/auth/me", 
        { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        if (data.user) setUser(data.user);
      })
      .catch(() => {});
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      credentials: "include"
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

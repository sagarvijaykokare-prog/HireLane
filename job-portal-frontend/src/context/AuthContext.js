"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { TOKEN_STORAGE_KEY } from "@/config/endpoints";
import { loginRequest, registerRequest } from "@/services/authService";
import { isTokenExpired, userFromToken } from "@/utils/jwt";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expired, setExpired] = useState(false);

  const clear = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setToken(null);
    setUser(null);
  }, []);

  // Restore session on first load
  useEffect(() => {
    const saved = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (saved) {
      if (isTokenExpired(saved)) { clear(); setExpired(true); }
      else { setToken(saved); setUser(userFromToken(saved)); }
    }
    setLoading(false);
    const onExpired = () => { clear(); setExpired(true); };
    window.addEventListener("auth:expired", onExpired);
    return () => window.removeEventListener("auth:expired", onExpired);
  }, [clear]);

  const login = async (credentials) => {
    const t = await loginRequest(credentials);
    const u = userFromToken(t);
    if (!u) throw new Error("Received a token that could not be read.");
    localStorage.setItem(TOKEN_STORAGE_KEY, t);
    setToken(t); setUser(u); setExpired(false);
    return u;
  };

  const register = (data) => registerRequest(data);
  const logout = () => { clear(); setExpired(false); };

  return (
    <AuthContext.Provider value={{ token, user, loading, expired, isAuthenticated: !!token, isAdmin: !!user?.isAdmin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};

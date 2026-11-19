import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { api } from "./api";
import type { User } from "./types";

type AuthContextValue = { user: User | null; token: string | null; login: (email: string, password: string) => Promise<void>; register: (name: string, email: string, password: string) => Promise<void>; logout: () => void };
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("schemeta_token"));
  const [user, setUser] = useState<User | null>(null);
  const accept = (data: { access_token: string; user: User }) => {
    localStorage.setItem("schemeta_token", data.access_token);
    setToken(data.access_token);
    setUser(data.user);
  };
  const login = async (email: string, password: string) => accept((await api.post("/api/auth/login", { email, password })).data);
  const register = async (name: string, email: string, password: string) => accept((await api.post("/api/auth/register", { name, email, password })).data);
  const logout = () => { localStorage.removeItem("schemeta_token"); setToken(null); setUser(null); };
  const value = useMemo(() => ({ user, token, login, register, logout }), [user, token]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
}

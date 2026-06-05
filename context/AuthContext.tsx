"use client";
import { createContext, useContext, useState } from "react";

export type User = { name: string; email: string };

type AuthCtx = {
  user: User | null;
  login: (email: string, password: string) => string | null;
  signup: (name: string, email: string, password: string) => string | null;
  logout: () => void;
};

const Ctx = createContext<AuthCtx>({} as AuthCtx);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accounts, setAccounts] = useState<{ name: string; email: string; password: string }[]>([]);

  function signup(name: string, email: string, password: string): string | null {
    if (accounts.find(a => a.email === email)) return "An account with this email already exists.";
    setAccounts(prev => [...prev, { name, email, password }]);
    setUser({ name, email });
    return null;
  }

  function login(email: string, password: string): string | null {
    const account = accounts.find(a => a.email === email && a.password === password);
    if (!account) return "Invalid email or password.";
    setUser({ name: account.name, email: account.email });
    return null;
  }

  function logout() { setUser(null); }

  return <Ctx.Provider value={{ user, login, signup, logout }}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);

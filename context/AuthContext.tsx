"use client";
import { createContext, useContext, useEffect, useState } from "react";

export type User = { name: string; email: string };

type AuthCtx = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  signup: (name: string, email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
};

const Ctx = createContext<AuthCtx>({} as AuthCtx);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("luxeplay_user");
      if (saved) setUser(JSON.parse(saved));
    } catch {}
    setLoading(false);
  }, []);

  async function signup(name: string, email: string, password: string): Promise<string | null> {
    if (!name.trim()) return "Please enter your name.";
    if (!email.trim()) return "Please enter your email.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    try {
      const accounts = JSON.parse(localStorage.getItem("luxeplay_accounts") || "[]");
      if (accounts.find((a: { email: string }) => a.email.toLowerCase() === email.toLowerCase())) {
        return "An account with this email already exists.";
      }
      accounts.push({ name, email: email.toLowerCase(), password });
      localStorage.setItem("luxeplay_accounts", JSON.stringify(accounts));
      const u = { name, email: email.toLowerCase() };
      localStorage.setItem("luxeplay_user", JSON.stringify(u));
      setUser(u);
    } catch {
      return "Something went wrong. Please try again.";
    }
    return null;
  }

  async function login(email: string, password: string): Promise<string | null> {
    try {
      const accounts = JSON.parse(localStorage.getItem("luxeplay_accounts") || "[]");
      const match = accounts.find(
        (a: { email: string; password: string }) =>
          a.email.toLowerCase() === email.toLowerCase() && a.password === password
      );
      if (!match) return "Invalid email or password.";
      const u = { name: match.name, email: match.email };
      localStorage.setItem("luxeplay_user", JSON.stringify(u));
      setUser(u);
    } catch {
      return "Something went wrong. Please try again.";
    }
    return null;
  }

  async function logout() {
    localStorage.removeItem("luxeplay_user");
    setUser(null);
  }

  return <Ctx.Provider value={{ user, loading, login, signup, logout }}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);

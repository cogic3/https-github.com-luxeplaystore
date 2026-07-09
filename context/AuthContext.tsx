"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  type User as FirebaseUser,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

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
    const unsub = onAuthStateChanged(auth, (u: FirebaseUser | null) => {
      setUser(u ? { name: u.displayName ?? u.email?.split("@")[0] ?? "User", email: u.email ?? "" } : null);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  async function signup(name: string, email: string, password: string): Promise<string | null> {
    if (!name.trim()) return "Please enter your name.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    try {
      const { user: u } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(u, { displayName: name });
      setUser({ name, email: u.email ?? "" });
      return null;
    } catch (e: unknown) {
      const code = (e as { code?: string }).code;
      if (code === "auth/email-already-in-use") return "An account with this email already exists.";
      if (code === "auth/invalid-email") return "Invalid email address.";
      if (code === "auth/weak-password") return "Password must be at least 6 characters.";
      return "Something went wrong. Please try again.";
    }
  }

  async function login(email: string, password: string): Promise<string | null> {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return null;
    } catch {
      return "Invalid email or password.";
    }
  }

  async function logout() {
    await signOut(auth);
  }

  return <Ctx.Provider value={{ user, loading, login, signup, logout }}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);

"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type Props = { onClose: () => void };

export default function AuthModal({ onClose }: Props) {
  const { login, signup } = useAuth();
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const err = tab === "signin"
      ? await login(email, password)
      : await signup(name, email, password);
    setLoading(false);
    if (err) { setError(err); return; }
    // Show referral discount if applicable
    const refDiscount = localStorage.getItem("luxeplay_referral_discount");
    if (tab === "signup" && refDiscount) {
      localStorage.removeItem("luxeplay_referral_discount");
      alert(`🎉 Welcome! Use code ${refDiscount} for 10% off your first order!`);
    }
    onClose();
  }

  function switchTab(t: "signin" | "signup") {
    setTab(t);
    setError("");
    setName(""); setEmail(""); setPassword("");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md" onClick={onClose}>
      <div className="card w-full max-w-sm p-7 relative" style={{ border: "1px solid rgba(232,121,249,0.2)" }}
        onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-5 text-white/30 hover:text-white transition-colors">
          <X size={18} />
        </button>

        <p className="gradient-text font-bold text-xl mb-6">LuxePlay</p>

        <div className="flex gap-2 mb-6">
          {(["signin", "signup"] as const).map(t => (
            <button key={t} onClick={() => switchTab(t)}
              className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all ${tab === t ? "btn-primary" : "text-white/40 hover:text-white"}`}
              style={tab !== t ? { background: "rgba(255,255,255,0.05)" } : {}}>
              {t === "signin" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {tab === "signup" && (
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" required
              className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(232,121,249,0.15)" }} />
          )}
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address" required
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(232,121,249,0.15)" }} />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(232,121,249,0.15)" }} />

          {error && <p className="text-xs" style={{ color: "#f43f8f" }}>{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-sm mt-1 disabled:opacity-50">
            {loading ? "Please wait..." : tab === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="text-white/25 text-xs text-center mt-4">
          {tab === "signin" ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => switchTab(tab === "signin" ? "signup" : "signin")}
            className="hover:text-white transition-colors" style={{ color: "#e879f9" }}>
            {tab === "signin" ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}

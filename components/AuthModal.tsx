"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

type Props = { onClose: () => void };

export default function AuthModal({ onClose }: Props) {
  const { login, signup } = useAuth();
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [step, setStep] = useState<"form" | "verify">("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (tab === "signin") {
      const err = await login(email, password);
      setLoading(false);
      if (err) { setError(err); return; }
      onClose();
    } else {
      const err = await signup(name, email, password);
      setLoading(false);
      if (err === "__confirm__") {
        setStep("verify");
      } else if (err) {
        setError(err);
      } else {
        onClose();
      }
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "signup",
    });
    setLoading(false);
    if (error) { setError("Invalid or expired code. Please try again."); return; }
    onClose();
  }

  function switchTab(t: "signin" | "signup") {
    setTab(t);
    setStep("form");
    setError("");
    setCode("");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md" onClick={onClose}>
      <div className="card w-full max-w-sm p-7 relative" style={{ border: "1px solid rgba(232,121,249,0.2)" }}
        onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-5 text-white/30 hover:text-white transition-colors">
          <X size={18} />
        </button>

        <p className="gradient-text font-bold text-xl mb-6">LuxePlay</p>

        {step === "form" && (
          <>
            {/* Tabs */}
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

              {error && <p className="text-xs" style={{ color: error.startsWith("✅") ? "#34d399" : "#f43f8f" }}>{error}</p>}

              <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-sm mt-1 disabled:opacity-50">
                {loading ? "Please wait..." : tab === "signin" ? "Sign In" : "Send Verification Code"}
              </button>
            </form>

            <p className="text-white/25 text-xs text-center mt-4">
              {tab === "signin" ? "Don't have an account? " : "Already have an account? "}
              <button onClick={() => switchTab(tab === "signin" ? "signup" : "signin")}
                className="hover:text-white transition-colors" style={{ color: "#e879f9" }}>
                {tab === "signin" ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </>
        )}

        {step === "verify" && (
          <>
            <div className="text-center mb-6">
              <p className="text-3xl mb-3">📧</p>
              <h2 className="text-white font-bold text-lg mb-1">Check your email</h2>
              <p className="text-white/40 text-sm leading-relaxed">
                We sent a 6-digit code to <span style={{ color: "#e879f9" }}>{email}</span>. Enter it below to verify your account.
              </p>
            </div>

            <form onSubmit={handleVerify} className="flex flex-col gap-3">
              <input value={code} onChange={e => setCode(e.target.value)} placeholder="Enter 6-digit code"
                maxLength={6} required
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none text-center tracking-[0.5em] font-bold text-lg"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(232,121,249,0.15)" }} />

              {error && <p className="text-xs text-center" style={{ color: "#f43f8f" }}>{error}</p>}

              <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-sm disabled:opacity-50">
                {loading ? "Verifying..." : "Verify & Create Account"}
              </button>
            </form>

            <button onClick={() => { setStep("form"); setError(""); setCode(""); }}
              className="block w-full text-center text-white/30 text-xs mt-4 hover:text-white transition-colors">
              ← Back
            </button>
          </>
        )}
      </div>
    </div>
  );
}

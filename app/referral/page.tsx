"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Copy, Check, Gift, Users, Star } from "lucide-react";
import Link from "next/link";

export default function ReferralPage() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const refCode = user ? user.name.split(" ")[0].toLowerCase().replace(/[^a-z0-9]/g, "") + "10" : null;
  const refLink = refCode ? `${typeof window !== "undefined" ? window.location.origin : "https://luxeplay.store"}/?ref=${refCode}` : null;

  function copyLink() {
    if (!refLink) return;
    navigator.clipboard.writeText(refLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-24 px-4 md:px-6 max-w-3xl mx-auto">
      <p className="text-xs uppercase tracking-[0.4em] mb-2" style={{ color: "#e879f9" }}>Earn Rewards</p>
      <h1 className="text-4xl md:text-5xl font-bold mb-4"><span className="gradient-text">Refer & Earn</span></h1>
      <p className="text-sm md:text-base leading-relaxed mb-12" style={{ color: "var(--color-text-50)" }}>
        Share LuxePlay with friends. When they sign up using your link, they get 10% off their first order — and you earn store credit.
      </p>

      {/* How it works */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
        {[
          { icon: <Gift size={24} />, step: "01", title: "Share Your Link", desc: "Copy your unique referral link and share it with friends." },
          { icon: <Users size={24} />, step: "02", title: "Friend Signs Up", desc: "They create an account using your link and get 10% off." },
          { icon: <Star size={24} />, step: "03", title: "You Earn Credit", desc: "For every friend who orders, you earn $10 store credit." },
        ].map(s => (
          <div key={s.step} className="card p-6 text-center">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: "rgba(232,121,249,0.1)", border: "1px solid rgba(232,121,249,0.2)", color: "#e879f9" }}>
              {s.icon}
            </div>
            <p className="text-xs font-bold mb-1" style={{ color: "#e879f9" }}>Step {s.step}</p>
            <h3 className="font-bold mb-2" style={{ color: "var(--color-text)" }}>{s.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-50)" }}>{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Referral link box */}
      {user && refLink ? (
        <div className="card p-7 mb-10">
          <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: "#e879f9" }}>Your Referral Link</p>
          <div className="flex gap-2 mb-4">
            <div className="flex-1 px-4 py-3 rounded-xl text-sm font-mono overflow-hidden text-ellipsis whitespace-nowrap"
              style={{ background: "var(--color-surface)", border: "1px solid var(--border)", color: "var(--color-text-60)" }}>
              {refLink}
            </div>
            <button onClick={copyLink}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all shrink-0"
              style={{
                background: copied ? "rgba(52,211,153,0.15)" : "rgba(232,121,249,0.12)",
                color: copied ? "#34d399" : "#e879f9",
                border: `1px solid ${copied ? "rgba(52,211,153,0.3)" : "rgba(232,121,249,0.25)"}`,
              }}>
              {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy</>}
            </button>
          </div>
          <p className="text-xs" style={{ color: "var(--color-text-30)" }}>Share this link on social media, WhatsApp, or anywhere you like.</p>
        </div>
      ) : (
        <div className="card p-8 text-center mb-10">
          <p className="text-3xl mb-3">🔐</p>
          <h2 className="text-xl font-bold mb-2" style={{ color: "var(--color-text)" }}>Sign in to get your referral link</h2>
          <p className="text-sm mb-6" style={{ color: "var(--color-text-50)" }}>Create a free account to access your unique referral link and start earning.</p>
          <Link href="/shop" className="btn-primary px-10 py-3 text-sm inline-block">Sign In / Sign Up</Link>
        </div>
      )}

      {/* Rewards table */}
      <div className="card overflow-hidden mb-10">
        <div className="px-6 py-4 border-b" style={{ borderColor: "var(--color-border-soft)" }}>
          <h2 className="font-bold" style={{ color: "var(--color-text)" }}>Reward Tiers</h2>
        </div>
        {[
          { referrals: "1 referral", reward: "$10 store credit", badge: "" },
          { referrals: "3 referrals", reward: "$35 store credit", badge: "🔥 Popular" },
          { referrals: "5 referrals", reward: "$60 store credit + VIP code", badge: "⭐ VIP" },
          { referrals: "10 referrals", reward: "$150 store credit + free product", badge: "👑 Elite" },
        ].map((r, i) => (
          <div key={i} className="flex items-center justify-between px-6 py-4 border-b last:border-0"
            style={{ borderColor: "var(--color-border-soft)", background: i % 2 === 0 ? "transparent" : "var(--color-section-bg)" }}>
            <span className="text-sm" style={{ color: "var(--color-text-70)" }}>{r.referrals}</span>
            <span className="gradient-text font-bold text-sm">{r.reward}</span>
            {r.badge && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ background: "rgba(232,121,249,0.1)", color: "#e879f9" }}>{r.badge}</span>
            )}
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-sm mb-4" style={{ color: "var(--color-text-35)" }}>Questions about the referral program?</p>
        <a href="https://t.me/luxeplay10" target="_blank" rel="noopener noreferrer"
          className="btn-primary px-10 py-3 text-sm inline-block">
          Message Us on Telegram
        </a>
      </div>
    </div>
  );
}

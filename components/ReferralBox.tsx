"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Copy, Check, Gift } from "lucide-react";

export default function ReferralBox() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [referralCount, setReferralCount] = useState(0);

  const referralCode = user ? "LUXE-" + user.email.split("@")[0].toUpperCase().slice(0, 6) : "";
  const referralLink = typeof window !== "undefined" ? `${window.location.origin}?ref=${referralCode}` : "";

  useEffect(() => {
    const count = Number(localStorage.getItem(`luxeplay_referrals_${referralCode}`) || "0");
    setReferralCount(count);
  }, [referralCode]);

  function handleCopy() {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!user) return null;

  return (
    <div className="card p-6" style={{ border: "1px solid rgba(232,121,249,0.2)" }}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "rgba(232,121,249,0.15)", border: "1px solid rgba(232,121,249,0.2)" }}>
          <Gift size={18} style={{ color: "#e879f9" }} />
        </div>
        <div>
          <p className="text-white font-bold text-sm">Refer a Friend</p>
          <p className="text-white/40 text-xs">Earn $10 credit for every friend who signs up</p>
        </div>
      </div>

      <div className="rounded-xl p-3 mb-3 flex items-center justify-between gap-2"
        style={{ background: "rgba(232,121,249,0.06)", border: "1px solid rgba(232,121,249,0.15)" }}>
        <p className="text-xs font-mono truncate" style={{ color: "#e879f9" }}>{referralLink}</p>
        <button onClick={handleCopy} className="shrink-0 flex items-center gap-1 text-xs px-3 py-1.5 rounded-full transition-all"
          style={{ background: copied ? "rgba(52,211,153,0.2)" : "rgba(232,121,249,0.15)", color: copied ? "#34d399" : "#e879f9" }}>
          {copied ? <><Check size={11} /> Copied</> : <><Copy size={11} /> Copy</>}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl p-3 text-center" style={{ background: "rgba(232,121,249,0.06)", border: "1px solid rgba(232,121,249,0.1)" }}>
          <p className="gradient-text font-black text-2xl">{referralCount}</p>
          <p className="text-white/40 text-xs mt-0.5">Friends Referred</p>
        </div>
        <div className="rounded-xl p-3 text-center" style={{ background: "rgba(232,121,249,0.06)", border: "1px solid rgba(232,121,249,0.1)" }}>
          <p className="gradient-text font-black text-2xl">${referralCount * 10}</p>
          <p className="text-white/40 text-xs mt-0.5">Credits Earned</p>
        </div>
      </div>

      <p className="text-white/25 text-xs mt-3 text-center">Your code: <span className="font-bold" style={{ color: "#e879f9" }}>{referralCode}</span></p>
    </div>
  );
}

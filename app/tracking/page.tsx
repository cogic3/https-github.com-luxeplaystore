"use client";
import { useState } from "react";
import { Search } from "lucide-react";

export default function Tracking() {
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (username.trim()) setSubmitted(true);
  }

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-24 px-4 md:px-6 max-w-xl mx-auto">
      <p className="text-xs uppercase tracking-[0.4em] mb-2" style={{ color: "#e879f9" }}>Where&apos;s My Order?</p>
      <h1 className="text-4xl md:text-5xl font-bold mb-4"><span className="gradient-text">Track Order</span></h1>
      <p className="text-white/50 mb-12">Enter your Telegram username and we&apos;ll look up your order status.</p>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="card p-8 flex flex-col gap-4"
          style={{ border: "1px solid rgba(232,121,249,0.15)" }}>
          <label className="text-sm text-white/60">Your Telegram Username</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">@</span>
            <input value={username} onChange={e => setUsername(e.target.value)}
              placeholder="yourusername"
              className="w-full pl-8 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none"
              style={{ background: "rgba(232,121,249,0.05)", border: "1px solid rgba(232,121,249,0.15)" }} />
          </div>
          <button type="submit" className="btn-primary py-3 text-sm flex items-center justify-center gap-2">
            <Search size={14} /> Track My Order
          </button>
        </form>
      ) : (
        <div className="card p-8 text-center" style={{ border: "1px solid rgba(232,121,249,0.15)" }}>
          <p className="text-4xl mb-4">📦</p>
          <h2 className="text-xl font-bold text-white mb-2">We&apos;re checking your order</h2>
          <p className="text-white/50 text-sm mb-6 leading-relaxed">
            We&apos;ve received your request for <span style={{ color: "#e879f9" }}>@{username}</span>.
            Our team will message you on Telegram with your order status shortly.
          </p>
          <a href="https://t.me/luxeplayadmin" target="_blank" rel="noopener noreferrer"
            className="btn-primary px-8 py-3 text-sm inline-block">
            Message Us on Telegram
          </a>
          <button onClick={() => { setSubmitted(false); setUsername(""); }}
            className="block mx-auto mt-4 text-white/30 text-xs hover:text-white transition-colors">
            Try a different username
          </button>
        </div>
      )}

      <div className="mt-10 grid grid-cols-3 gap-4 text-center">
        {[
          { icon: "✅", label: "Order Confirmed", desc: "Payment received" },
          { icon: "🔄", label: "Processing", desc: "Being prepared" },
          { icon: "🚚", label: "Shipped", desc: "On the way" },
        ].map(s => (
          <div key={s.label} className="card p-4">
            <p className="text-2xl mb-2">{s.icon}</p>
            <p className="text-white text-xs font-bold mb-1">{s.label}</p>
            <p className="text-white/30 text-[10px]">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

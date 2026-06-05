"use client";
import { useAuth } from "@/context/AuthContext";
import { useStore } from "@/context/StoreContext";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { Heart, ShoppingBag, Package, LogOut } from "lucide-react";

export default function Profile() {
  const { user, logout } = useAuth();
  const { wishlist } = useStore();
  const { count } = useCart();

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
        <p className="text-5xl">🔐</p>
        <h2 className="text-2xl font-bold text-white/80">You&apos;re not signed in</h2>
        <p className="text-white/40 text-sm">Sign in to view your profile, wishlist, and orders.</p>
        <Link href="/" className="btn-primary px-8 py-3 text-sm mt-2">Go Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-24 px-4 md:px-6 max-w-2xl mx-auto">
      <p className="text-xs uppercase tracking-[0.4em] mb-2" style={{ color: "#e879f9" }}>Your Account</p>
      <h1 className="text-4xl font-bold mb-10"><span className="gradient-text">My Profile</span></h1>

      {/* Avatar + info */}
      <div className="card p-7 flex items-center gap-6 mb-6" style={{ border: "1px solid rgba(232,121,249,0.2)" }}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shrink-0"
          style={{ background: "linear-gradient(135deg,#e879f9,#f43f8f)" }}>
          {user.name[0].toUpperCase()}
        </div>
        <div className="flex-1">
          <p className="text-white font-bold text-xl">{user.name}</p>
          <p className="text-white/40 text-sm">{user.email}</p>
        </div>
        <button onClick={logout}
          className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300 transition-colors px-4 py-2 rounded-xl"
          style={{ background: "rgba(244,63,143,0.08)", border: "1px solid rgba(244,63,143,0.15)" }}>
          <LogOut size={13} /> Sign Out
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { icon: <Heart size={20} />, label: "Wishlist", value: wishlist.length, href: "/wishlist" },
          { icon: <ShoppingBag size={20} />, label: "Cart Items", value: count, href: "/cart" },
          { icon: <Package size={20} />, label: "Orders", value: 0, href: "/tracking" },
        ].map(s => (
          <Link key={s.label} href={s.href} className="card p-5 text-center hover:border-pink-500/30 transition-colors">
            <div className="flex justify-center mb-2" style={{ color: "#e879f9" }}>{s.icon}</div>
            <p className="gradient-text font-bold text-2xl">{s.value}</p>
            <p className="text-white/40 text-xs mt-1">{s.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div className="card p-6">
        <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: "#e879f9" }}>Quick Links</p>
        <div className="flex flex-col divide-y" style={{ borderColor: "rgba(232,121,249,0.08)" }}>
          {[
            { label: "Browse Shop", href: "/shop", emoji: "🛍️" },
            { label: "My Wishlist", href: "/wishlist", emoji: "❤️" },
            { label: "Track My Order", href: "/tracking", emoji: "📦" },
            { label: "Gift Cards", href: "/giftcards", emoji: "🎁" },
            { label: "FAQ", href: "/faq", emoji: "❓" },
            { label: "Contact Us", href: "/contact", emoji: "💬" },
          ].map(l => (
            <Link key={l.label} href={l.href}
              className="flex items-center justify-between py-3.5 text-sm text-white/60 hover:text-white transition-colors">
              <span className="flex items-center gap-3"><span>{l.emoji}</span>{l.label}</span>
              <span className="text-white/20">→</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

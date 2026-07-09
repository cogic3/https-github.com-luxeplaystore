"use client";
import { useAuth } from "@/context/AuthContext";
import { useStore } from "@/context/StoreContext";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import Link from "next/link";
import { Heart, ShoppingBag, Package, LogOut, Star } from "lucide-react";
import ReferralBox from "@/components/ReferralBox";
import { useEffect, useState } from "react";

type Order = { id: string; date: string; items: string; total: number; status: string };

export default function Profile() {
  const { user, logout } = useAuth();
  const { wishlist } = useStore();
  const { count } = useCart();
  const { format } = useCurrency();
  const [orders, setOrders] = useState<Order[]>([]);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("luxeplay_orders");
      if (saved) setOrders(JSON.parse(saved));
      const pts = localStorage.getItem("luxeplay_points");
      if (pts) setPoints(Number(pts));
    } catch {}
  }, []);

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

  const tier = points >= 500 ? "Gold" : points >= 200 ? "Silver" : "Bronze";
  const tierColor = tier === "Gold" ? "#facc15" : tier === "Silver" ? "#94a3b8" : "#fb923c";
  const nextTier = tier === "Bronze" ? 200 : tier === "Silver" ? 500 : null;
  const progress = tier === "Bronze" ? (points / 200) * 100 : tier === "Silver" ? ((points - 200) / 300) * 100 : 100;

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

      {/* Loyalty Points */}
      <div className="card p-6 mb-6" style={{ border: "1px solid rgba(232,121,249,0.2)" }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Star size={16} style={{ color: tierColor }} fill={tierColor} />
            <p className="font-bold text-white">Loyalty Points</p>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${tierColor}22`, color: tierColor }}>{tier}</span>
          </div>
          <p className="gradient-text font-black text-2xl">{points} pts</p>
        </div>
        {nextTier && (
          <>
            <div className="w-full h-2 rounded-full mb-2" style={{ background: "rgba(255,255,255,0.06)" }}>
              <div className="h-2 rounded-full transition-all" style={{ width: `${Math.min(progress, 100)}%`, background: "linear-gradient(90deg,#e879f9,#f43f8f)" }} />
            </div>
            <p className="text-white/40 text-xs">{nextTier - points} points to {tier === "Bronze" ? "Silver" : "Gold"}</p>
          </>
        )}
        {!nextTier && <p className="text-white/40 text-xs">You&apos;ve reached the highest tier! 🎉</p>}
        <p className="text-white/30 text-xs mt-3">Earn 1 point per $1 spent. Redeem 100 pts = $5 off.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { icon: <Heart size={20} />, label: "Wishlist", value: wishlist.length, href: "/wishlist" },
          { icon: <ShoppingBag size={20} />, label: "Cart Items", value: count, href: "/cart" },
          { icon: <Package size={20} />, label: "Orders", value: orders.length, href: "#orders" },
        ].map(s => (
          <Link key={s.label} href={s.href} className="card p-5 text-center hover:border-pink-500/30 transition-colors">
            <div className="flex justify-center mb-2" style={{ color: "#e879f9" }}>{s.icon}</div>
            <p className="gradient-text font-bold text-2xl">{s.value}</p>
            <p className="text-white/40 text-xs mt-1">{s.label}</p>
          </Link>
        ))}
      </div>

      {/* Order History */}
      <div id="orders" className="card p-6 mb-6">
        <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: "#e879f9" }}>Order History</p>
        {orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-3xl mb-3">📦</p>
            <p className="text-white/40 text-sm">No orders yet.</p>
            <Link href="/shop" className="btn-primary px-6 py-2 text-xs inline-block mt-4">Start Shopping</Link>
          </div>
        ) : (
          <div className="flex flex-col divide-y" style={{ borderColor: "rgba(232,121,249,0.08)" }}>
            {orders.map(o => (
              <div key={o.id} className="py-4 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{o.items}</p>
                  <p className="text-white/40 text-xs mt-0.5">{o.date}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="gradient-text font-bold text-sm">{format(o.total)}</p>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(52,211,153,0.15)", color: "#34d399" }}>{o.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Referral */}
      <div className="mb-6"><ReferralBox /></div>

      {/* Quick links */}
      <div className="card p-6">
        <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: "#e879f9" }}>Quick Links</p>
        <div className="flex flex-col divide-y" style={{ borderColor: "rgba(232,121,249,0.08)" }}>
          {[
            { label: "Browse Shop", href: "/shop", emoji: "🛍️" },
            { label: "My Wishlist", href: "/wishlist", emoji: "❤️" },
            { label: "Track My Order", href: "/tracking", emoji: "📦" },
            { label: "Shipping Info", href: "/shipping", emoji: "🚚" },
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

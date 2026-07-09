"use client";
import Link from "next/link";
import { useState } from "react";
import { products } from "@/lib/products";
import { useStore } from "@/context/StoreContext";
import { useCurrency } from "@/context/CurrencyContext";
import { Star, Heart } from "lucide-react";
import Image from "next/image";
import SaleTimer from "@/components/SaleTimer";

const featured = products.slice(0, 4);
const bestSellers = products.filter(p => p.badge === "Best Seller" || p.rating >= 4.8);
const newArrivals = products.filter(p => p.isNew).slice(0, 4);
const bundles = products.filter(p => p.category === "bundles");

const testimonials = [
  { name: "Ashley R.", text: "Packaging was so discreet, my roommates had no idea. Product was amazing!", rating: 5 },
  { name: "Jordan M.", text: "Fast shipping and exactly as described. Will definitely order again.", rating: 5 },
  { name: "Taylor S.", text: "Great quality and the customer support on Telegram was super helpful.", rating: 5 },
];

export default function Home() {
  const { recentlyViewed, wishlist, toggleWishlist } = useStore();
  const { format } = useCurrency();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  }

  function ProductCard({ p }: { p: typeof products[0] }) {
    const isWished = wishlist.includes(p.id);
    return (
      <Link href={`/shop/${p.id}`} className="card p-4 flex flex-col group">
        <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3"
          style={{ background: "rgba(232,121,249,0.05)" }}>
          {p.badge && (
            <span className="absolute top-2 left-2 z-10 text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
              style={{ background: "linear-gradient(90deg,#e879f9,#f43f8f)" }}>{p.badge}</span>
          )}
          {p.isNew && (
            <span className="absolute top-2 right-2 z-10 text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
              style={{ background: "linear-gradient(90deg,#34d399,#059669)" }}>NEW</span>
          )}
          <Image src={p.image} alt={p.name} fill className="object-cover" />
          <button onClick={e => { e.preventDefault(); toggleWishlist(p.id); }}
            className="absolute bottom-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
            style={{ background: isWished ? "rgba(244,63,143,0.3)" : "rgba(0,0,0,0.4)" }}>
            <Heart size={12} fill={isWished ? "#f43f8f" : "none"} className={isWished ? "text-pink-400" : "text-white/60"} />
          </button>
        </div>
        <h3 className="font-bold text-sm mb-1 text-white">{p.name}</h3>
        <div className="flex items-center gap-1 mb-2">
          {[1,2,3,4,5].map(i => <Star key={i} size={9} fill={i <= Math.round(p.rating) ? "#facc15" : "none"} className={i <= Math.round(p.rating) ? "text-yellow-400" : "text-white/20"} />)}
          <span className="text-[10px] text-white/40">({p.reviews})</span>
        </div>
        <div className="flex items-center gap-2 mt-auto">
          <p className="gradient-text font-bold text-sm">{format(p.salePrice ?? p.price)}</p>
          {p.salePrice && <p className="text-white/30 text-xs line-through">{format(p.price)}</p>}
        </div>
        {p.salePrice && <SaleTimer />}
      </Link>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-36 pb-20 md:pt-44 md:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(232,121,249,0.25) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(244,63,143,0.2) 0%, transparent 50%), radial-gradient(ellipse at 80% 60%, rgba(251,146,60,0.1) 0%, transparent 40%)" }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(rgba(232,121,249,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(232,121,249,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <span className="text-xs uppercase tracking-[0.5em] font-semibold mb-4 px-4 py-1.5 rounded-full inline-block"
          style={{ color: "#e879f9", background: "rgba(232,121,249,0.1)", border: "1px solid rgba(232,121,249,0.2)" }}>
          Premium Adult Boutique
        </span>
        <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
          Pleasure, <span className="gradient-text">Elevated.</span>
        </h1>
        <p className="max-w-lg mb-8 text-base md:text-lg text-white/60">
          Discreet shipping. Body-safe quality. Everything you need, delivered to your door.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs sm:max-w-none justify-center">
          <Link href="/shop" className="btn-primary px-10 py-3.5 text-sm w-full sm:w-auto text-center">Shop Now</Link>
          <a href="https://t.me/luxeplayadmin" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-all hover:scale-105 w-full sm:w-auto"
            style={{ background: "rgba(232,121,249,0.08)", border: "1px solid rgba(232,121,249,0.2)", color: "#e879f9" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 13.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z"/></svg>
            Contact Us
          </a>
        </div>
      </section>

      {/* Stats section */}
      <section className="border-y py-12 px-6" style={{ borderColor: "rgba(232,121,249,0.1)", background: "rgba(232,121,249,0.02)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.4em] font-semibold mb-4" style={{ color: "#e879f9" }}>Our Reach</p>
          <p className="text-white font-bold text-xl md:text-2xl mb-10 max-w-xl mx-auto leading-relaxed">
            Premium adult boutique — discreet shipping, body-safe products, and real customer support.
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-24">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-3"
                style={{ background: "rgba(232,121,249,0.1)", border: "1px solid rgba(232,121,249,0.2)" }}>🛍️</div>
              <p className="gradient-text font-black text-5xl md:text-6xl tracking-tight">2.4K+</p>
              <p className="text-white/50 text-sm font-semibold mt-2 uppercase tracking-widest">Happy Customers</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-3"
                style={{ background: "rgba(232,121,249,0.1)", border: "1px solid rgba(232,121,249,0.2)" }}>🌍</div>
              <p className="gradient-text font-black text-5xl md:text-6xl tracking-tight">35+</p>
              <p className="text-white/50 text-sm font-semibold mt-2 uppercase tracking-widest">Countries Served</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-3"
                style={{ background: "rgba(232,121,249,0.1)", border: "1px solid rgba(232,121,249,0.2)" }}>⭐</div>
              <p className="gradient-text font-black text-5xl md:text-6xl tracking-tight">4.9</p>
              <p className="text-white/50 text-sm font-semibold mt-2 uppercase tracking-widest">Avg Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-y py-6" style={{ borderColor: "rgba(232,121,249,0.1)" }}>
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[{ icon: "📦", label: "Discreet Packaging" }, { icon: "🔒", label: "100% Private" }, { icon: "✅", label: "Body-Safe Materials" }, { icon: "💬", label: "24/7 Support" }].map(b => (
            <div key={b.label} className="flex flex-col items-center gap-1">
              <span className="text-2xl">{b.icon}</span>
              <span className="text-xs text-white/50 font-medium">{b.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-14 md:py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] mb-2" style={{ color: "#e879f9" }}>🏆 Top Rated</p>
            <h2 className="text-3xl font-bold text-white">Best Sellers</h2>
          </div>
          <Link href="/shop" className="text-sm font-semibold hover:text-white transition-colors" style={{ color: "#e879f9" }}>View All →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {bestSellers.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* Bundles promo banner */}
      {bundles.length > 0 && (
        <section className="mx-3 md:mx-6 mb-8 rounded-2xl p-6 md:p-10 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(232,121,249,0.15), rgba(244,63,143,0.1))", border: "1px solid rgba(232,121,249,0.25)" }}>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] mb-2" style={{ color: "#e879f9" }}>🎁 Save More</p>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Bundle & Save Up To 30%</h2>
                <p className="text-white/50 text-sm">Curated sets handpicked to work together. Get more, spend less.</p>
              </div>
              <div className="flex gap-4 shrink-0">
                {bundles.slice(0, 2).map(p => (
                  <Link key={p.id} href={`/shop/${p.id}`} className="card p-3 w-28 flex flex-col items-center text-center">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden mb-2" style={{ background: "rgba(232,121,249,0.08)" }}>
                      <Image src={p.image} alt={p.name} fill className="object-cover" />
                    </div>
                    <p className="text-white text-[10px] font-bold leading-tight mb-1">{p.name}</p>
                    <p className="gradient-text font-bold text-xs">{format(p.salePrice ?? p.price)}</p>
                    {p.salePrice && <p className="text-white/30 text-[10px] line-through">{format(p.price)}</p>}
                  </Link>
                ))}
              </div>
              <Link href="/shop" className="btn-primary px-8 py-3 text-sm shrink-0">Shop Bundles →</Link>
            </div>
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 md:px-6 pb-14 md:pb-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] mb-2" style={{ color: "#e879f9" }}>✨ Just Dropped</p>
              <h2 className="text-3xl font-bold text-white">New Arrivals</h2>
            </div>
            <Link href="/shop" className="text-sm font-semibold hover:text-white transition-colors" style={{ color: "#e879f9" }}>View All →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {newArrivals.map(p => <ProductCard key={p.id} p={p} />)}
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-14 md:pb-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] mb-2" style={{ color: "#e879f9" }}>Handpicked For You</p>
            <h2 className="text-3xl font-bold text-white">Featured Products</h2>
          </div>
          <Link href="/shop" className="text-sm font-semibold hover:text-white transition-colors" style={{ color: "#e879f9" }}>View All →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {featured.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <p className="text-xs uppercase tracking-[0.4em] mb-2" style={{ color: "#e879f9" }}>Your History</p>
          <h2 className="text-3xl font-bold text-white mb-10">Recently Viewed</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {recentlyViewed.map(p => <ProductCard key={p.id} p={p} />)}
          </div>
        </section>
      )}

      {/* How it works */}
      <section className="py-14 md:py-20 px-4 md:px-6" style={{ background: "rgba(232,121,249,0.03)", borderTop: "1px solid rgba(232,121,249,0.08)", borderBottom: "1px solid rgba(232,121,249,0.08)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.4em] mb-2" style={{ color: "#e879f9" }}>Simple Process</p>
          <h2 className="text-3xl font-bold text-white mb-14">How It Works</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { step: "01", icon: "🛍️", title: "Browse & Pick", desc: "Choose from our curated collection." },
              { step: "02", icon: "📝", title: "Fill Details", desc: "Enter shipping info — kept private." },
              { step: "03", icon: "💳", title: "Pay Securely", desc: "Bitcoin or any gift card." },
              { step: "04", icon: "📦", title: "Receive Discreetly", desc: "Plain box, no labels." },
            ].map(s => (
              <div key={s.step} className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: "rgba(232,121,249,0.1)", border: "1px solid rgba(232,121,249,0.2)" }}>{s.icon}</div>
                <p className="text-xs font-bold mb-1" style={{ color: "#e879f9" }}>Step {s.step}</p>
                <h3 className="font-bold text-white mb-2">{s.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 py-14 md:py-20">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.4em] mb-2" style={{ color: "#e879f9" }}>Why Us</p>
          <h2 className="text-3xl font-bold text-white">Why Choose LuxePlay?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: "🔒", title: "Total Privacy", desc: "Plain box, generic return address, zero traces. Your order is your secret." },
            { icon: "✅", title: "Body-Safe Guaranteed", desc: "Every product is vetted for medical-grade, body-safe materials. No cheap knockoffs." },
            { icon: "💬", title: "Real Human Support", desc: "Message us on Telegram and a real person replies — fast, friendly, no judgment." },
            { icon: "🌍", title: "Ships Worldwide", desc: "We deliver to 35+ countries. Wherever you are, we'll get it to you discreetly." },
            { icon: "⭐", title: "Curated Collection", desc: "Every product is handpicked. We only sell what we'd use ourselves." },
            { icon: "🎁", title: "Loyalty Rewards", desc: "Earn points on every order. Redeem them for discounts on future purchases." },
          ].map(w => (
            <div key={w.title} className="card p-6 flex gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                style={{ background: "rgba(232,121,249,0.1)", border: "1px solid rgba(232,121,249,0.2)" }}>{w.icon}</div>
              <div>
                <h3 className="font-bold text-white mb-1">{w.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 py-14 md:py-20">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.4em] mb-2" style={{ color: "#e879f9" }}>Happy Customers</p>
          <h2 className="text-3xl font-bold text-white">What People Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <div key={t.name} className="card p-6">
              <div className="flex gap-0.5 mb-4">{Array.from({ length: t.rating }).map((_, i) => <span key={i} className="text-yellow-400 text-sm">★</span>)}</div>
              <p className="text-white/60 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
              <p className="font-bold text-white text-sm">{t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Security badges */}
      <section className="max-w-4xl mx-auto px-4 md:px-6 pb-12 md:pb-16">
        <p className="text-xs uppercase tracking-[0.4em] mb-6 text-center" style={{ color: "#e879f9" }}>Safe & Secure</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "🔐", title: "SSL Encrypted", desc: "All data is encrypted" },
            { icon: "🛡️", title: "Safe Checkout", desc: "Secure payment process" },
            { icon: "🕵️", title: "Anonymous", desc: "No traces left behind" },
            { icon: "✅", title: "Verified Store", desc: "Trusted by thousands" },
          ].map(b => (
            <div key={b.title} className="card p-5 text-center">
              <div className="text-3xl mb-2">{b.icon}</div>
              <p className="font-bold text-white text-xs mb-1">{b.title}</p>
              <p className="text-white/35 text-[11px]">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Telegram App section */}
      <section className="mx-3 md:mx-6 mb-12 md:mb-16 rounded-2xl p-6 md:p-10 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, rgba(232,121,249,0.1), rgba(244,63,143,0.08))", border: "1px solid rgba(232,121,249,0.2)" }}>
        <div className="max-w-2xl mx-auto flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          <div className="text-7xl shrink-0">📱</div>
          <div className="flex-1">
            <p className="text-xs uppercase tracking-[0.4em] mb-2" style={{ color: "#e879f9" }}>Stay Connected</p>
            <h2 className="text-2xl font-bold text-white mb-2">Shop via Telegram</h2>
            <p className="text-white/50 text-sm mb-6 leading-relaxed">Get exclusive deals, track your orders, and chat with us directly on Telegram. Fast, private, and easy.</p>
            <a href="https://t.me/luxeplayadmin" target="_blank" rel="noopener noreferrer" className="btn-primary px-8 py-3 text-sm inline-flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 13.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z"/></svg>
              Open Telegram
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-xl mx-auto px-4 md:px-6 pb-16 md:pb-20 text-center">
        <p className="text-xs uppercase tracking-[0.4em] mb-2" style={{ color: "#e879f9" }}>Stay Updated</p>
        <h2 className="text-2xl font-bold text-white mb-3">Get Exclusive Deals</h2>
        <p className="text-white/40 text-sm mb-8">Subscribe for promo codes, new arrivals, and members-only discounts.</p>
        {!subscribed ? (
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-full text-sm text-white placeholder-white/30 outline-none"
              style={{ background: "rgba(232,121,249,0.05)", border: "1px solid rgba(232,121,249,0.2)" }} />
            <button type="submit" className="btn-primary px-6 py-3 text-sm shrink-0">Subscribe</button>
          </form>
        ) : (
          <div className="card p-6" style={{ border: "1px solid rgba(232,121,249,0.2)" }}>
            <p className="text-2xl mb-2">🎉</p>
            <p className="text-white font-semibold">You&apos;re subscribed!</p>
            <p className="text-white/40 text-sm mt-1">Use code <span className="font-bold" style={{ color: "#e879f9" }}>LUXE10</span> for 10% off your next order.</p>
          </div>
        )}
      </section>

      {/* CTA Banner */}
      <section className="mx-3 md:mx-6 mb-14 md:mb-20 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, rgba(232,121,249,0.15), rgba(244,63,143,0.1))", border: "1px solid rgba(232,121,249,0.2)" }}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to explore?</h2>
        <p className="text-white/50 mb-8 max-w-md mx-auto">Browse our full collection and find exactly what you&apos;re looking for.</p>
        <Link href="/shop" className="btn-primary px-12 py-4 text-base inline-block">Shop the Collection</Link>
      </section>
    </div>
  );
}

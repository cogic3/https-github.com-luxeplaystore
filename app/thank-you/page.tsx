"use client";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

export default function ThankYou() {
  const { items, total, discountedTotal, discount, promoCode, shipping, items: cartItems } = useCart();
  const { format } = useCurrency();
  const [orderRef] = useState(() => "LXP-" + Math.random().toString(36).substring(2, 8).toUpperCase());

  // Estimate delivery: 2–4 weeks from today
  const deliveryFrom = new Date(Date.now() + 14 * 86400000).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const deliveryTo = new Date(Date.now() + 28 * 86400000).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-24 px-4 md:px-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
          <CheckCircle size={56} style={{ color: "#34d399" }} />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">Order Received!</h1>
        <p className="text-white/50 text-sm">Reference: <span className="text-white font-mono font-bold">{orderRef}</span></p>
      </div>

      {/* Order items */}
      {cartItems.length > 0 && (
        <div className="card p-6 mb-5">
          <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: "#e879f9" }}>Your Order</p>
          <div className="flex flex-col gap-4 mb-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0"
                  style={{ background: "rgba(232,121,249,0.06)" }}>
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">{item.name}</p>
                  <p className="text-white/40 text-xs">Qty: {item.qty}</p>
                </div>
                <p className="gradient-text font-bold text-sm">{format(item.price * item.qty)}</p>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 flex flex-col gap-2" style={{ borderColor: "rgba(232,121,249,0.1)" }}>
            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Discount ({promoCode})</span>
                <span style={{ color: "#34d399" }}>-{discount}%</span>
              </div>
            )}
            <div className="flex justify-between font-bold">
              <span className="text-white">Total Paid</span>
              <span className="gradient-text text-lg">{format(discountedTotal || total)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Shipping info */}
      {shipping && (
        <div className="card p-6 mb-5">
          <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: "#e879f9" }}>Shipping To</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {[["Name", shipping.fullName], ["Email", shipping.email], ["Phone", shipping.phone], ["Address", shipping.address], ["City", shipping.city], ["Country", shipping.country]].map(([k, v]) => (
              <div key={k}>
                <p className="text-white/30 text-xs">{k}</p>
                <p className="text-white font-medium">{v}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Estimated delivery */}
      <div className="card p-6 mb-5" style={{ border: "1px solid rgba(52,211,153,0.2)" }}>
        <p className="text-xs uppercase tracking-[0.4em] mb-3" style={{ color: "#34d399" }}>📦 Estimated Delivery</p>
        <p className="text-white font-bold text-lg">{deliveryFrom} – {deliveryTo}</p>
        <p className="text-white/40 text-xs mt-1">Plain, discreet packaging. No brand names or labels.</p>
      </div>

      {/* Next steps */}
      <div className="card p-6 mb-8">
        <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: "#e879f9" }}>What Happens Next</p>
        <div className="flex flex-col gap-4">
          {[
            { icon: "💬", title: "Message us on Telegram", desc: "Send your order reference and payment confirmation to @luxeplayadmin." },
            { icon: "✅", title: "We confirm your order", desc: "We'll verify payment and confirm your order within a few hours." },
            { icon: "📦", title: "We pack & ship", desc: "Your order is packed discreetly and dispatched within 1–3 business days." },
            { icon: "🚪", title: "Delivered to your door", desc: "Plain box, no labels. We'll update you via Telegram when it ships." },
          ].map((s, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-xl shrink-0">{s.icon}</span>
              <div>
                <p className="text-white font-semibold text-sm">{s.title}</p>
                <p className="text-white/40 text-xs leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3">
        <a href="https://t.me/luxeplayadmin" target="_blank" rel="noopener noreferrer"
          className="btn-primary py-3.5 text-sm text-center block">
          💬 Message Us on Telegram
        </a>
        <Link href="/tracking"
          className="py-3 text-sm rounded-full text-white/50 hover:text-white transition-colors text-center"
          style={{ background: "rgba(255,255,255,0.05)" }}>
          Track My Order
        </Link>
        <Link href="/shop" className="text-white/30 text-sm hover:text-white transition-colors text-center mt-1">
          Continue Shopping →
        </Link>
      </div>
    </div>
  );
}

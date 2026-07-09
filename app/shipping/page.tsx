"use client";
import Link from "next/link";

const zones = [
  { region: "United States", time: "7–14 business days", icon: "🇺🇸" },
  { region: "United Kingdom", time: "7–12 business days", icon: "🇬🇧" },
  { region: "Canada", time: "10–16 business days", icon: "🇨🇦" },
  { region: "Australia", time: "10–18 business days", icon: "🇦🇺" },
  { region: "Europe", time: "8–14 business days", icon: "🇪🇺" },
  { region: "Rest of World", time: "14–25 business days", icon: "🌍" },
];

const faqs = [
  { q: "Will anyone know what's inside?", a: "Never. All orders ship in plain, unmarked boxes with no brand names, logos, or hints of the contents on the outside." },
  { q: "What does the return address say?", a: "The return address shows a generic business name — nothing that could identify the contents or our store." },
  { q: "Do you ship to PO boxes?", a: "Yes, we ship to PO boxes in most countries. Just enter your PO box address at checkout." },
  { q: "Can I track my order?", a: "Yes. Once your order ships, you'll receive a tracking number via Telegram or email. Use our Track Order page to follow it." },
  { q: "What if my order doesn't arrive?", a: "Contact us on Telegram. If your order is lost in transit, we'll reship or refund — no questions asked." },
];

export default function ShippingPage() {
  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-24 px-4 md:px-6 max-w-4xl mx-auto">
      <p className="text-xs uppercase tracking-[0.4em] mb-2" style={{ color: "#e879f9" }}>Delivery Info</p>
      <h1 className="text-4xl md:text-5xl font-bold mb-6"><span className="gradient-text">Shipping</span></h1>
      <p className="text-white/60 text-base leading-relaxed mb-14 max-w-2xl">
        Every order ships in a plain, discreet box — no brand names, no labels. We ship worldwide and take your privacy seriously.
      </p>

      {/* Key points */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
        {[
          { icon: "📦", title: "Plain Packaging", desc: "Unmarked box, generic return address. Nobody will know." },
          { icon: "🌍", title: "Ships Worldwide", desc: "We deliver to 35+ countries across every continent." },
          { icon: "🔍", title: "Full Tracking", desc: "Every order comes with a tracking number so you always know where it is." },
        ].map(b => (
          <div key={b.title} className="card p-6 text-center">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4"
              style={{ background: "rgba(232,121,249,0.1)", border: "1px solid rgba(232,121,249,0.2)" }}>{b.icon}</div>
            <h3 className="font-bold text-white mb-2">{b.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </div>

      {/* Delivery times */}
      <p className="text-xs uppercase tracking-[0.4em] mb-3" style={{ color: "#e879f9" }}>Estimated Delivery</p>
      <h2 className="text-2xl font-bold text-white mb-6">Delivery Times by Region</h2>
      <div className="card overflow-hidden mb-14">
        {zones.map((z, i) => (
          <div key={z.region} className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: i < zones.length - 1 ? "1px solid rgba(232,121,249,0.08)" : "none" }}>
            <div className="flex items-center gap-3">
              <span className="text-xl">{z.icon}</span>
              <span className="text-white font-medium text-sm">{z.region}</span>
            </div>
            <span className="text-sm font-semibold" style={{ color: "#e879f9" }}>{z.time}</span>
          </div>
        ))}
      </div>

      {/* Processing */}
      <div className="card p-6 mb-14" style={{ border: "1px solid rgba(232,121,249,0.2)" }}>
        <p className="text-xs uppercase tracking-[0.4em] mb-3" style={{ color: "#e879f9" }}>Processing Time</p>
        <p className="text-white font-bold text-lg mb-2">1–3 Business Days</p>
        <p className="text-white/50 text-sm leading-relaxed">
          Orders are processed within 1–3 business days after payment is confirmed. You&apos;ll receive your tracking number via Telegram or email once your order ships.
        </p>
      </div>

      {/* FAQ */}
      <p className="text-xs uppercase tracking-[0.4em] mb-3" style={{ color: "#e879f9" }}>Common Questions</p>
      <h2 className="text-2xl font-bold text-white mb-6">Shipping FAQ</h2>
      <div className="flex flex-col gap-4 mb-14">
        {faqs.map(f => (
          <div key={f.q} className="card p-6">
            <p className="font-bold text-white mb-2">{f.q}</p>
            <p className="text-white/55 text-sm leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/tracking" className="btn-primary px-8 py-3 text-sm text-center">Track My Order</Link>
        <a href="https://t.me/luxeplayadmin" target="_blank" rel="noopener noreferrer"
          className="px-8 py-3 text-sm rounded-full font-semibold text-center transition-all hover:scale-105"
          style={{ background: "rgba(232,121,249,0.08)", border: "1px solid rgba(232,121,249,0.2)", color: "#e879f9" }}>
          Contact Us on Telegram
        </a>
      </div>
    </div>
  );
}

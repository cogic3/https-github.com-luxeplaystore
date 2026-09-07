import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Info — LuxePlay",
  description: "Discreet worldwide shipping. Plain packaging, no labels. Delivery times by region.",
};

const regions = [
  { region: "United States", flag: "🇺🇸", time: "2–3 weeks", cost: "$12", note: "USPS standard" },
  { region: "United Kingdom", flag: "🇬🇧", time: "2–4 weeks", cost: "$15", note: "Royal Mail" },
  { region: "Canada", flag: "🇨🇦", time: "3–4 weeks", cost: "$15", note: "Canada Post" },
  { region: "Australia", flag: "🇦🇺", time: "3–5 weeks", cost: "$18", note: "Australia Post" },
  { region: "Europe (EU)", flag: "🇪🇺", time: "2–4 weeks", cost: "$15", note: "Standard courier" },
  { region: "West Africa", flag: "🌍", time: "3–5 weeks", cost: "$20", note: "DHL / courier" },
  { region: "East Africa", flag: "🌍", time: "3–5 weeks", cost: "$20", note: "DHL / courier" },
  { region: "Middle East", flag: "🌏", time: "2–4 weeks", cost: "$18", note: "Aramex" },
  { region: "Asia Pacific", flag: "🌏", time: "3–5 weeks", cost: "$20", note: "Standard courier" },
  { region: "Rest of World", flag: "🌐", time: "4–6 weeks", cost: "$22", note: "International post" },
];

export default function ShippingPage() {
  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-24 px-4 md:px-6 max-w-4xl mx-auto">
      <p className="text-xs uppercase tracking-[0.4em] mb-2" style={{ color: "#e879f9" }}>Delivery Info</p>
      <h1 className="text-4xl md:text-5xl font-bold mb-4"><span className="gradient-text">Shipping Info</span></h1>
      <p className="text-white/50 mb-12 text-base leading-relaxed max-w-xl">
        Every order ships in a plain, unmarked box with no indication of the contents. The return address uses a generic business name.
      </p>

      {/* Key promises */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
        {[
          { icon: "📦", title: "Plain Box", desc: "No brand names or labels" },
          { icon: "🔒", title: "100% Discreet", desc: "Generic return address" },
          { icon: "🌍", title: "35+ Countries", desc: "Worldwide delivery" },
          { icon: "📍", title: "Tracked", desc: "Updates via Telegram" },
        ].map(b => (
          <div key={b.title} className="card p-5 text-center">
            <p className="text-3xl mb-2">{b.icon}</p>
            <p className="font-bold text-white text-sm mb-1">{b.title}</p>
            <p className="text-white/40 text-xs">{b.desc}</p>
          </div>
        ))}
      </div>

      {/* Delivery table */}
      <p className="text-xs uppercase tracking-[0.4em] mb-3" style={{ color: "#e879f9" }}>Estimated Delivery Times</p>
      <h2 className="text-2xl font-bold text-white mb-6">By Region</h2>
      <div className="card overflow-hidden mb-14">
        <div className="grid grid-cols-4 px-5 py-3 text-xs uppercase tracking-widest text-white/30 border-b"
          style={{ borderColor: "rgba(232,121,249,0.1)" }}>
          <span>Region</span>
          <span>Est. Time</span>
          <span>Shipping</span>
          <span className="hidden md:block">Carrier</span>
        </div>
        {regions.map((r, i) => (
          <div key={r.region}
            className="grid grid-cols-4 px-5 py-4 text-sm items-center border-b last:border-0"
            style={{ borderColor: "rgba(232,121,249,0.06)", background: i % 2 === 0 ? "transparent" : "rgba(232,121,249,0.02)" }}>
            <span className="text-white font-medium flex items-center gap-2">{r.flag} {r.region}</span>
            <span className="text-white/60">{r.time}</span>
            <span className="gradient-text font-bold">{r.cost}</span>
            <span className="hidden md:block text-white/35 text-xs">{r.note}</span>
          </div>
        ))}
      </div>

      {/* Process */}
      <p className="text-xs uppercase tracking-[0.4em] mb-3" style={{ color: "#e879f9" }}>How It Works</p>
      <h2 className="text-2xl font-bold text-white mb-8">Order Process</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-14">
        {[
          { step: "01", icon: "💳", title: "Pay", desc: "Send Bitcoin or gift card payment." },
          { step: "02", icon: "✅", title: "Confirm", desc: "We confirm via Telegram within hours." },
          { step: "03", icon: "📦", title: "Pack & Ship", desc: "Packed discreetly and dispatched." },
          { step: "04", icon: "🚪", title: "Delivered", desc: "Plain box arrives at your door." },
        ].map(s => (
          <div key={s.step} className="card p-5 text-center">
            <p className="text-xs font-bold mb-2" style={{ color: "#e879f9" }}>Step {s.step}</p>
            <p className="text-3xl mb-3">{s.icon}</p>
            <p className="font-bold text-white text-sm mb-1">{s.title}</p>
            <p className="text-white/40 text-xs leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="card p-8 mb-10" style={{ border: "1px solid rgba(232,121,249,0.15)" }}>
        <h2 className="font-bold text-white text-lg mb-6">Common Questions</h2>
        <div className="flex flex-col gap-5">
          {[
            { q: "Will my package look suspicious?", a: "No. It ships in a plain brown or white box with no brand names, logos, or any indication of the contents." },
            { q: "What if my order doesn't arrive?", a: "Contact us on Telegram with your order details. We'll investigate and reship if necessary." },
            { q: "Can I get a faster delivery?", a: "Express shipping may be available for some regions. Message us on Telegram before ordering to check." },
            { q: "Do you ship to PO boxes?", a: "Yes, we can ship to PO boxes in most countries." },
          ].map(item => (
            <div key={item.q} className="border-b pb-5 last:border-0 last:pb-0" style={{ borderColor: "rgba(232,121,249,0.08)" }}>
              <p className="font-semibold text-white text-sm mb-1">{item.q}</p>
              <p className="text-white/50 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <p className="text-white/40 text-sm mb-4">Still have questions about shipping?</p>
        <a href="https://t.me/luxeplayadmin" target="_blank" rel="noopener noreferrer"
          className="btn-primary px-10 py-3 text-sm inline-block">
          Message Us on Telegram
        </a>
      </div>
    </div>
  );
}
